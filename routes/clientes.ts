import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()


// INÍCIO DO CRUD ---------------------------------------

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany()
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, email, cidade, dataNasc } = req.body

  if (!nome || !email || !cidade || !dataNasc) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }
  try {
    const clientes = await prisma.cliente.create({
      data: { nome, email, cidade, dataNasc: new Date(dataNasc) }
    })
    res.status(201).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }

})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const clientes = await prisma.cliente.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, email, cidade, dataNasc } = req.body

  if (!nome || !email || !cidade || !dataNasc) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  try {
    const clientes = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nome, email, cidade, dataNasc: new Date(dataNasc) }
    })
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router