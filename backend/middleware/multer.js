import multer from "multer"

const storage = multer.memoryStorage()

// single upload
export const singleUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}).single("file")

// multiple upload
export const mutltipleUplaod = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
}).array("files", 5)