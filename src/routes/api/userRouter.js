const { Router } = require("express");
const { userModel } = require("../../models/usersModel.js");

const router = Router();

router.get('/',  async (req, res)=>{
    try {
        const users = await userModel.find()
        res.send({status: 'success', data: users})
        
    } catch (error) {
        console.log(error)
    }
})
