const prisma = require("./prisma");

const getReceitas = (userId)=>{
    return prisma.receita.findMany(
        {
            where: {userId}
        }
    );
}

const addReceita=(receita,userId)=>{
    return prisma.receita.create({
        data: {
        name: receita.name,
        descricao:receita.descricao,
        tempo:receita.tempo,
        userId:userId
    }})
}

const deleteReceita=(id)=>{
    return prisma.receita.delete({
        where: {
        id:id
    }})
}

const updateReceita=(id,receita)=>{
    return prisma.receita.update({
        where: {
        id:id
    },data:receita})
}

module.exports = {
    addReceita,
    updateReceita,
    getReceitas,
    deleteReceita
}