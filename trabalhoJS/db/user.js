const prisma = require("./prisma");

const findUserByEmail = (email)=>{
    return prisma.user.findFirst({
        where:{email}
    });
}

const createUser = (user) =>{
    return prisma.user.create({
        data: user
    }); 
};


module.exports= {
    findUserByEmail,
    createUser
}
