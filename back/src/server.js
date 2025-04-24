const express = require('express')
const todosRoutes = require('./todo.routes')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(todosRoutes)

app.get('/health', (req, res) => {
  res.send('Olá mundo!')
})

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333')
})
