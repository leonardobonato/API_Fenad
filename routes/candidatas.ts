import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()


// INÍCIO DO CRUD ---------------------------------------

router.get("/", async (req, res) => {
  try {
    const candidatas = await prisma.candidata.findMany()
    res.status(200).json(candidatas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, clube, idade, sonho } = req.body

  if (!nome || !clube || !idade) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }
  try {
    const candidatas = await prisma.candidata.create({
      data: { nome, clube, idade, sonho }
    })
    res.status(201).json(candidatas)
  } catch (error) {
    res.status(400).json(error)
  }

})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const candidatas = await prisma.candidata.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(candidatas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, clube, idade, sonho } = req.body

  if (!nome || !clube || !idade) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  try {
    const candidatas = await prisma.candidata.update({
      where: { id: Number(id) },
      data: { nome, clube, idade, sonho }
    })
    res.status(200).json(candidatas)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router