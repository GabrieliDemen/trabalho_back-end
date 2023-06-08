const express = require("express");
const router = express.Router();
const auth =require("../middle/auth");
const { addReceita, getReceitas, deleteReceita, updateReceita } = require("../db/receita");
const { z } = require("zod");

const receitaSchema = z.object({
    name: z.string().min(3),
    descricao: z.string().min(6),
    tempo: z.string(),
})

router.get("/receita", auth, async (req, res) => {
    const tasks = await getReceitas(req.userId);
    res.json({
      tasks,
    });
  });

router.put("/receita/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const receita=req.body;
    const tasks = await updateReceita(id,receita);
    res.json({
        tasks
    });
  });

router.delete("/receita/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const tasks = await deleteReceita(id);
    res.json({
      status:"ok"
    });
  });

router.post("/receita",auth,async(req,res)=>{
    try {
        const receita = receitaSchema.parse(req.body);
        console.log(receita)
        const receitaNew = await addReceita(receita,req.userId);
        res.status(201).json(receitaNew);
    } catch (error) {
        console.log(error);
        if(error instanceof z.ZodError) return res.status(422).json({message:error.error});
        res.status(500).json({message:error.error});
    }
})

module.exports=router;