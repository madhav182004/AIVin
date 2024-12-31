import userModel from "../models/user.model.js";
import * as userService from "../sevices/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../sevices/redis.service.js";

export const createUserController = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    try
    {
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        res.status(201).json({ user, token });
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        res.status(400).json( { errors: errors.array() });
    }

    try
    {
        const { email, password } = req.body;

        //since we have added password as "select:false" in the userSchema so we need to add "select('+password')" condition while finding th user
        const user = await userModel.findOne({ email }).select('+password');

        if(!user)
        {
            return res.status(401).json({
                errors: 'Invalid Credentials'
            })
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch)
        {
            return res.status(401).json({
                errors: 'Invalid Credentials'
            }) 
        }

        const token = await user.generateJWT();

        res.status(200).json({ user, token});

    }catch(err){
        res.status(400).send(err.message);
    }

}

export const profileController = async (req, res) => {
    console.log(req.user);

    res.status(200).json({
        user: req.user
    });
}

export const logoutController = async (req, res) => {
    try{

        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

        res.status(200).json({
            message: 'Logged out Succesfully'
        });
        
    }catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}