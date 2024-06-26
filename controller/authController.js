import userModel from "../models/userModel.js";

const registerController = async (req, res, next) => {
    const { name, email, password, lastName } = req.body
    //validate
    if (!name) {
        next('name is required')

    }
    if (!email) {
        next('email is required')
    }
    if (!password) {
        next('password is required')

    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.status(200).send({
            success: false,
            message: 'Email already register please login'
        })
    }
    const user = await userModel.create({ name, email, password, lastName });
    //token
    const token = user.createJWT()
    res.status(201).send({
        success: true,
        massage: 'user created successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location

        },
        token
    })
};



export default registerController;


export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    //valdation
    if (!email || !password) {
        next('please provide all fields')
    }

    //find user
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next('Invalid username or password')
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid username or password')
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json(
        {
            success: true,
            message: 'login successfully',
            user,
            token,
        }
    )
}


