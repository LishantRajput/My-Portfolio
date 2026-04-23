const cloudinary = require('../utils/cloudinary.config');
const fs = require('fs');


const uploadFileOnCloud = async (localPath) => {
    
    try {
        if (!localPath) return "err";
        // Upload the file to Cloudinary
        
        const result = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto", // Automatically determine the resource type
            folder: "UiTemplate", // Specify the folder in Cloudinary
        });
        // Remove the local file after upload
        
        await fs.unlinkSync(localPath);

        console.log("File uploaded successfully:", result.secure_url);
        return {
            url: result.secure_url,
            public_id: result.public_id
        }; // Use secure_url for HTTPS
    } catch (error) {
        console.log("catch block through")
        await fs.unlinkSync(localPath);
        console.log("Error in uploadOnCloudinary:", error);
        return null;
    }
}

const deleteoncloud = async (public_id, localPath) => {
    await cloudinary.uploader.destroy(public_id)
    await fs.unlinkSync(localPath);
    return "Upload fail"
}
module.exports = { uploadFileOnCloud, deleteoncloud }