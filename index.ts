import express from 'express'
import candidatasRoutes from './routes/candidatas'
import clientesRoutes from './routes/clientes'
import votosRoutes from './routes/votos'

const app = express()
// const port = 3000
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use("/candidatas", candidatasRoutes)
app.use("/clientes", clientesRoutes)
app.use("/votos", votosRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de Controle de votos Rainha da Fenadoce!')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})