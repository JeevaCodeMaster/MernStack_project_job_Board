import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
//schema
// const Schema = mongoose.Schema;
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'name is required'],
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         validate: validator.isEmail,
//     },
//     password: {
//         type: String,
//         required: [true, 'password is requied'],
//         minlength: [8, 'please provide atleast 8 characters'],
//         select: true
//     },
//     location: {
//         type: String,
//         default: 'india',
//     },
// },
//     { timestamps: true });
// //middleware
// userSchema.pre('save', async function () {
//     if (!this.isModified) return;
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt);
// })

// //compare password
// userSchema.methods.comparePassword = async function (userPassword) {
//     const isMatch = await bcrypt.compare(userPassword, this.password)
//     return isMatch;

// }
// //jsonwebtoken

// userSchema.methods.createJWT = function () {
//     return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
// }
// export default mongoose.model("User", userSchema);


// import mongoose from 'mongoose';
// import validator from 'validator';
// import bcrypt from 'bcryptjs';
// import JWT from 'jsonwebtoken';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Please provide at least 8 characters'],
        select: true, // Password should not be selected by default
    },
    location: {
        type: String,
        default: 'India',
    },
}, {
    timestamps: true,
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//doc id


// Compare password method
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

// Create JWT method
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default mongoose.model("User", userSchema);
