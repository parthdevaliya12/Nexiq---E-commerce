import userModel from "../models/userModel.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { verifyEmail } from "../emailVerify/verifyEmail.js"
import sessionModel from "../models/sessionModel.js"
import { sendOtpMail } from "../emailVerify/sendOtpMail.js"
import cloudinary from "../utils/cloudinary.js"
import { OAuth2Client } from "google-auth-library"
import crypto from "crypto"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "8008835197-4dk9abl4itouvi276fbsa4sjevk8c8m8.apps.googleusercontent.com")

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All field are required", success: false })
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.", success: false })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exits", success: false })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ firstname, lastname, email, password: hashPassword })
        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" })
        verifyEmail(token, email) //sent email for verification
        newUser.token = token
        await newUser.save()
        return res.status(200).json({ message: "Registration success", success: true, user: newUser })

    } catch (error) {
        console.error('register error:', error)
        return res.status(500).json({ message: error.message || "Internal server error", success: false, error: error.message })
    }
}

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header missing", success: false })
        }
        const token = authHeader.split(" ")[1] // Extract the token from the "Bearer <token>" format
        let decoded
        try {
            decoded = await jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({ message: "Registration token has expired", success: false })

            }
            return res.status(400).json({ message: "Token verification failed", success: false })
        }
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })

        }
        user.token = null
        user.isVerified = true
        await user.save()
        return res.status(200).json({ message: "Email verified successfully", success: true })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const reVerify = async (req, res) => {
    try {

        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" })
        verifyEmail(token, email) //sent email for verification
        user.token = token
        await user.save()
        return res.status(200).json({ message: "Verification email sent successfully", success: true, token: user.token })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All field are required", success: false })
        }
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: "User not exits", success: false })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false })
        }
        if (existingUser.isVerified === false) {
            return res.status(400).json({ message: "Please verify your email before login", success: false })
        }

        const accessToken = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "10d" })
        const refreshToken = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })

        existingUser.isLoggedIn = true
        await existingUser.save()


        //check exisiting session and delete if exist to create new session
        const existingSession = await sessionModel.findOne({ userId: existingUser._id })

        if (existingSession) {
            await sessionModel.deleteOne({ userId: existingUser._id })
        }

        //create new session
        await sessionModel.create({ userId: existingUser._id })
        return res.status(200).json({ message: `Welcome back! ${existingUser.firstname}`, success: true, accessToken, refreshToken, user: existingUser })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}


export const logout = async (req, res) => {
    try {
        const userId = req.id

        await sessionModel.deleteMany({ userId: userId })
        await userModel.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({ message: "Logout success", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}


export const forgetPassword = async (req, res) => {
    try {

        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })

        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes 
        user.otp = otp
        user.otpExpiry = otpExpire
        await user.save()
        await sendOtpMail(otp, email)

        return res.status(200).json({ message: "OTP sent to email successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const verifyOtp = async (req, res) => {
    try {

        const { otp } = req.body
        const email = req.params.email
        if (!otp) {
            return res.status(400).json({ message: "OTP is required", success: false })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })

        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "OTP is not generated or already verified", success: false })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP has expired, please generate a new one", success: false })
        }
        if (otp !== user.otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false })
        }
        user.otp = null
        user.otpExpiry = null
        await user.save()
        return res.status(200).json({ message: "OTP verified successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const checkPassword = async (req, res) => {
    try {

        const { newPassword, confirmPassword } = req.body
        const { email } = req.params
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })

        }
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All field are required", success: false })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password does not match", success: false })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword
        await user.save()
        return res.status(200).json({ message: "Password updated successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const allUsers = async (req, res) => {
    try {

        const users = await userModel.find()
        return res.status(200).json({ message: "Users retrieved successfully", success: true, data: users })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await userModel.findById(userId).select("-password -otp -otpExpiry -token")
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })
        }
        return res.status(200).json({ message: "User retrieved successfully", success: true, data: user })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}


// export const updateUser = async (req, res) => {
//     try {
//         const userIdToUpdate = req.params.id //id to update user
//         if (!mongoose.Types.ObjectId.isValid(userIdToUpdate)) {
//             return res.status(400).json({ message: "Invalid user id", success: false })
//         }
//         const loggedUser = req.user //get user from isAuthenticate middleware 
//         const { firstname, lastname, email, city, address, zipcode, phoneNo, role } = req.body

//         if (loggedUser._id.toString() !== userIdToUpdate && loggedUser.role !== "admin") {
//             return res.status(403).json({ message: "You are not allowed to update this profile", success: false })
//         }

//         let user = await userModel.findById(userIdToUpdate)
//         if (!user) {
//             return res.status(404).json({ message: "User not found", success: false })
//         }

//         let profilePicUrl = user.profilePic;
//         let profilePicPublicId = user.profilePicPublicId

//         // if new file uploaded
//         if (req.file) {
//             try {
//                 if (profilePicPublicId) {
//                     await cloudinary.uploader.destroy(profilePicPublicId)
//                 }

//                 if (!req.file.buffer) {
//                     return res.status(400).json({ message: "Uploaded file has no buffer", success: false })
//                 }

//                 if (!cloudinary || !cloudinary.uploader || !cloudinary.uploader.upload_stream) {
//                     throw new Error("Cloudinary uploader is not configured")
//                 }

//                 const uploadResult = await new Promise((resolve, reject) => {
//                     const stream = cloudinary.uploader.upload_stream({ folder: "profiles" }, (error, result) => {
//                         if (error) reject(error)
//                         else resolve(result)
//                     })
//                     stream.end(req.file.buffer)
//                 })
//                 profilePicUrl = uploadResult.secure_url
//                 profilePicPublicId = uploadResult.public_id
//             } catch (uploadErr) {
//                 console.error('Cloudinary upload error:', uploadErr)
//                 return res.status(500).json({ message: `Image upload failed: ${uploadErr.message || uploadErr}`, success: false, error: uploadErr.message })
//             }
//         }

//         user.firstname = firstname || user.firstname
//         user.lastname = lastname || user.lastname
//         user.city = city || user.city
//         user.email = email || user.email
//         user.address = address || user.address
//         user.zipcode = zipcode || user.zipcode
//         user.phoneNo = phoneNo || user.phoneNo
//         user.role = role
//         user.profilePic = profilePicUrl
//         user.profilePicPublicId = profilePicPublicId

//         const updateUser = await user.save()

//         return res.status(200).json({ message: "Profile updated successfully", success: true, data: updateUser })

//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
//     }
// }



export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // console.log("BODY =>", req.body);
        // console.log("FILE =>", req.file);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id",
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let profilePic = user.profilePic;
        let profilePicPublicId = user.profilePicPublicId;

        if (req.file) {
            try {
                // delete old image
                if (profilePicPublicId) {
                    await cloudinary.uploader.destroy(profilePicPublicId);
                }

                let result;
                if (req.file.path) {
                    result = await cloudinary.uploader.upload(req.file.path, {
                        folder: "profiles",
                        resource_type: "image",
                    });
                } else if (req.file.buffer) {
                    result = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            {
                                folder: "profiles",
                                resource_type: "image",
                            },
                            (error, uploadResult) => {
                                if (error) reject(error)
                                else resolve(uploadResult)
                            },
                        )
                        stream.end(req.file.buffer)
                    })
                } else {
                    throw new Error("Uploaded file is not available for Cloudinary")
                }

                profilePic = result.secure_url;
                profilePicPublicId = result.public_id;

                console.log("UPLOAD SUCCESS =>", result.secure_url);

            } catch (error) {
                console.log("CLOUDINARY ERROR =>", error);

                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }

        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;
        user.phoneNo = req.body.phoneNo || user.phoneNo;
        user.address = req.body.address || user.address;
        user.city = req.body.city || user.city;
        user.zipcode = req.body.zipcode || user.zipcode;

        user.profilePic = profilePic;
        user.profilePicPublicId = profilePicPublicId;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Google token is required", success: false });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "8008835197-4dk9abl4itouvi276fbsa4sjevk8c8m8.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture, sub } = payload;

        let user = await userModel.findOne({ email });

        if (user) {
            // User exists, log them in
            if (!user.googleId) {
                user.googleId = sub;
                if (!user.profilePic) user.profilePic = picture;
                await user.save();
            }
        } else {
            // User does not exist, create a new one
            const randomPassword = crypto.randomBytes(16).toString("hex");
            const hashPassword = await bcrypt.hash(randomPassword, 10);
            
            user = await userModel.create({
                firstname: given_name || "Google",
                lastname: family_name || "User",
                email: email,
                password: hashPassword,
                profilePic: picture,
                googleId: sub,
                isVerified: true
            });
        }

        const accessToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        const refreshToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        user.isLoggedIn = true;
        await user.save();

        const existingSession = await sessionModel.findOne({ userId: user._id });
        if (existingSession) {
            await sessionModel.deleteOne({ userId: user._id });
        }
        await sessionModel.create({ userId: user._id });

        return res.status(200).json({ 
            message: `Welcome! ${user.firstname}`, 
            success: true, 
            accessToken, 
            refreshToken, 
            user 
        });

    } catch (error) {
        console.error('Google auth error:', error);
        return res.status(500).json({ message: "Internal server error during Google Authentication", success: false, error: error.message });
    }
};