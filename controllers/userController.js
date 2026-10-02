import user from "../models/user.js";

// adding new user
const addUser = async (req, res) => {
    try {
        const { cleark_id , first_name , last_name , email } = req.body;

        if(!cleark_id || !first_name || !last_name || !email){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const userData  = {
            cleark_id,
            first_name,
            last_name,
            email
        }

        const newUser = new user(userData);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding user",
            error: error.message
        });
    }
}



export { addUser };