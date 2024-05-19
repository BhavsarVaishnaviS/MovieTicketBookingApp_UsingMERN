import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        admin=new Admin({email,password:hashedPassword});
        admin = await admin.save();
    }catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        return res.status(200).json({ message: "Authentication Complete", token, id: existingAdmin._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json({ admins });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};