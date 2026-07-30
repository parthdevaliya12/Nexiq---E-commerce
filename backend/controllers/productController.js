import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js"
import productModel from "../models/productModel.js";


// export const addProduct = async (req, res) => {
//     try {
//         const { productName, productDesc, productPrice, category, brand } = req.body
//         const userId = req.id
//         if (!productName || !productDesc || !productPrice || !category || !brand) {
//             return res.status(400).json({ success: false, message: "All field are required", error: error.message })

//         }
//         let productImg = [];
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 const fileUri = getDataUri(file)
//                 const result = await cloudinary.uploader.upload(fileUri, { folder: "products_images" })
//                 productImg.push({ url: result.secure_url, public_id: result.public_id })
//             }
//         }
//         const newProduct = await productModFel.create({
//             userId,
//             productName,
//             productDesc,
//             productPrice,
//             category,
//             brand,
//             productImg
//         })
//         return res.status(200).json({ success: true, message: "Product added successfully", product: newProduct })

//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal server error", error: error.message })
//     }
// }


export const addProduct = async (req, res) => {
    try {
        const {
            productName,
            productDesc,
            productPrice,
            category,
            brand
        } = req.body;

        const userId = req.id;

        if (
            !productName ||
            !productDesc ||
            !productPrice ||
            !category ||
            !brand
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let productImg = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileUri = getDataUri(file);

                const result = await cloudinary.uploader.upload(
                    fileUri,
                    {
                        folder: "products_images"
                    }
                );

                productImg.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        const newProduct = await productModel.create({
            userId,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.log("PRODUCT ERROR =>", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find()
        if (!products) {
            return res.status(500).json({ success: false, message: "No product available", products: [] })
        }
        return res.status(200).json({ success: true, message: "Product retrieve", product: products })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
}



export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        //delete images from cloudinary
        if (product.productImg && product.productImg.length > 0) {
            for (let img of product.productImg) {
                const result = await cloudinary.uploader.destroy(img.public_id)
            }
        }

        //delete product from mongoDB
        await productModel.findByIdAndDelete(productId)

        return res.status(201).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.log("PRODUCT ERROR =>", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const {
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            existingImages
        } = req.body;

        const { productId } = req.params

        const userId = req.id;

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let updatedImages = []


        if (existingImages) {
            const keepImg = JSON.parse(existingImages)
            updatedImages = product.productImg.filter((img) => keepImg.includes(img.public_id))
            const removedImages = product.productImg.filter((img) => !keepImg.includes(img.public_id))

            for (let img of removedImages) {
                await cloudinary.uploader.destroy(img.public_id)
            }
        } else {
            updatedImages = product.productImg // keep all if nothing sent
        }

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri, { folder: "products_images" })
                updatedImages.push({
                    uri: result.secure_url,
                    public_id: result.public_id
                })

            }
        }

        product.productName = productName || product.productName
        product.productDesc = productDesc || product.productDesc
        product.productPrice = productPrice || product.productPrice
        product.category = category || product.category
        product.brand = brand || product.brand
        product.productImg = updatedImages

        await product.save()

        return res.status(201).json({
            success: true,
            message: "Product updated successfully",
            product: product
        });

    } catch (error) {
        console.log("PRODUCT ERROR =>", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};