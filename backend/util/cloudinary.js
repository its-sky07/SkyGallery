

// Configuration



const uploadOnCloudinary = async (avatarLocalPath) => {
    try {
        if (!avatarLocalPath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(avatarLocalPath);
        // Handle success response
        console.log((result.url));
        if (fs.existsSync(avatarLocalPath)) {
            fs.unlinkSync(avatarLocalPath);
        }
        return result.url;
    } catch (error) {
        // Handle error response
        console.error(error);
        if (fs.existsSync(avatarLocalPath)) {
            fs.unlinkSync(avatarLocalPath);
        }
        return null;
        ;
    }


};

export default uploadOnCloudinary;
