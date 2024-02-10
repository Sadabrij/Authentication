const User = require("../model/auth-model")
const bcrypt = require("bcryptjs")

const login = async(req, res) =>{

    const {email, password } = req.body

    try {

        const user = await User.findOne({email})

        if(!user) {

            res
                .status(400)
                .json({message:"User not exist...."})

            return;
        }

        const valid = await bcrypt.compare(password, user.password)

        if(valid){

            res
                .status(200)
                .json({user})

            return;
        }

        res
            .status(200)
            .json({message:`invalid credential...`})
        
    } catch (error) {
        console.log( "autt controller | ", error.message)
    }

}

const register = async(req, res) =>{

    const {username, email, phone, password, isAdmin} = req.body

    try {

        const isExist = await User.findOne({email})

        if(isExist) {

            res
                .status(400)
                .json({message:"User alredy exist...."})

            return;
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({username, email, phone, password:hash, isAdmin})
        
        res
            .status(200)
            .json({message:`user created with username : ${username}`})

        
    } catch (error) {
        console.log( "auth controller | ", error.message)
    }

}

module.exports = {login, register}