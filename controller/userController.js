import userModel from "../models/userModel.js"; // Adjust the path as needed

export const updateUserController = async (req, res, next) => {
    try {
        const { name, lastName, email, location } = req.body;
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user by ID and update
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        user.name = name || user.name;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.location = location || user.location;

        // Save updated user
        const updatedUser = await user.save();

        // console.log('User updated with ID:', userId);

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        next(error);
    }
};


//get user data


export const getUserController = async (req, res, next) => {
    try {
        const user = await userModel.findById({ _id: req.body.user.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "User Not Found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
            error: error.message,
        });
    }
};