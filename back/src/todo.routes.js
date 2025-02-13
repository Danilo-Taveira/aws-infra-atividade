const express = require('express')
const todosRoutes = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// C
todosRoutes.post('/todos', async (request, response) => {
  const { name } = request.body
  const todo = await prisma.todo.create({
    data: {
      name: name
    }
  })
  return response.status(201).json(todo)
})

// R
todosRoutes.get('/todos', async (request, response) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  return response.status(200).json(todos)
})

// U
todosRoutes.put('/todos', async (request, response) => {
  const { name, id, status } = request.body

  if (!id) {
    return response.status(400).json({ error: 'ID não informado' })
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: {
      id: id
    }
  })

  if (!todoAlreadyExist) {
    return response.status(404).json({ error: 'Todo não encontrado' })
  }
  const todo = await prisma.todo.update({
    where: {
      id: id
    },
    data: {
      name: name,
      status: status
    }
  })
  return response.status(200).json(todo)
})

// D
todosRoutes.delete('/todos/:id', async (request, response) => {
  const { id } = request.params

  const intId = parseInt(id)

  if (!intId) {
    return response.status(400).json({ error: 'ID não informado' })
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: {
      id: intId
    }
  })

  if (!todoAlreadyExist) {
    return response.status(404).json({ error: 'Todo não encontrado' })
  }
  await prisma.todo.delete({
    where: {
      id: intId
    }
  })
  return response.status(200).send()
})

module.exports = todosRoutes
