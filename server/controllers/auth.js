import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });
       
        if (isUsed) {
           return res.json({
                message: "Користувач с таким ім'ям вже існує"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        })
       

         const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "30d"},
            
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: "Реєстрація пройшла успішно"
        })
        
    } catch (error) {
        res.json({
            message: "Помилка при створюванні користувача"
        })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });      
       

        if (!user) {
            return res.json({
                message: "Такого користувача не існує"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (!isPasswordCorrect) {
            return res.json({
                message: "Невірний пароль"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "30d"},
            
        )

        res.json({
            token,
            user,
            message: "Ви увійшли в акаунт"
        })
        
    } catch (error) {
         res.json({
            message: "Помилка авторизації"
        })
    }
}

// Current user

export const current = async (req, res) => {
    try {
       const user = await User.findById(req.userId)
        if (!user) {
            res.json({
               message: "Такого користувача не існує"
           })
        }
        
          const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "30d"},
            
        )

        res.json({
            token,
            user,
            
        })
        
    } catch (error) {
          res.json({
               message: "Помилка доступу"
           })
    }
}