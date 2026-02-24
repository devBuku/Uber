const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    socketId: {
        type: String,
    },
});

userSchema.pre("save", async function () {
    try {
        if (!this.isModified("password")) {
            return;
        }
        const hash = await bcrypt.hash(
            this.password,
            Number(process.env.SALT_ROUND),
        );
        this.password = hash;
        return;
    } catch (error) {
        console.log(`Error in User Model hashing password: ${error}`);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
