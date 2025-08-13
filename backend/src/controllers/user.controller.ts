import { Request, Response } from "express";
import User from '../models/user.model';



export const profile =async(req:Request, res:Response)=>{
try{
    const userId =req.params.id;
    const userProfile = await User.findById(userId);
    res.json(userProfile)
}
catch(error){
    console.log("error fetcching Profile:",error)
}
}