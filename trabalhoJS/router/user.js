const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../db/user");
const router = express.Router();

const UserPrisma = z.object({
    name: z.string().min(3),
    senha: z.string().min(6),
    email: z.string().email(),
})

const LoginPrisma = z.object({
    email: z.string().email(),
    senha: z.string()
})

router.post("/login", async (req,res)=>{
    try {
        const data = LoginPrisma.parse(req.body);
        const user =await findUserByEmail(data.email);
        if(!user) return res.status(401).json({message:"Not Authorized!"});
        const isSenha =bcrypt.compareSync(data.senha,user.senha);
        if(!isSenha) return res.status(401).json({message:"Not Authorized!"});
        const payload = {
            userId: user.id,
            userName: user.name 
        }
        const token = jwt.sign(payload,process.env.SECRET);
        res.json({token})
    } catch (error) {
        if(error instanceof z.ZodError) return res.status(422).json({message:error.error})
        res.status(500).json({message:error.error});
    }
})

router.post("/user", async (req, res) => {
    try {
        const user = UserPrisma.parse(req.body);
        const isExist = await findUserByEmail(user.email);
        if(isExist) return res.status(400).json("email ja existe!");
        const senhaHash = bcrypt.hashSync(user.senha,10);
        user.senha=senhaHash;
        const savedUser = await createUser(user);
        delete savedUser.senha;
        res.json({savedUser: savedUser});
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) return res.status(422).json({ message: error});
        return res.status(500).json({ message: error});
    }
});

module.exports = router;