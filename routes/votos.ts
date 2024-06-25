import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//Quando consultar um voto, vou ter os dados do voto, da candidata e de quem votou nela
router.get("/", async (req, res) => {
  try {
    const votos = await prisma.voto.findMany({
        include: {
            candidata: true,
            cliente: true
        }
    });
    res.status(200).json(votos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
    const { candidataId, clienteId, justificativa } = req.body;
  
    if (!candidataId || !clienteId) {
      res.status(400).json({ "erro": "Informe todos os dados" });
      return;
    }
  
    try {
      const [votos, candidata] = await prisma.$transaction([
        // inclui na tabela de votos
        prisma.voto.create({
          data: { 
            candidataId, 
            clienteId, 
            justificativa 
          }
        }), 
  
        // update na tabela de candidatas aumentando os votos delas com o increment 1
        prisma.candidata.update({
          where: { id: candidataId },
          data: { numVotos: { increment: 1 } }
        }) 
      ]);
      
      res.status(201).json({ votos, candidata });
    } catch (error) {
      res.status(400).json({error});
    }
  });
  

export default router;
