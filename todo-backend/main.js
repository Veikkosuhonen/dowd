import express from "express"

const PORT = process.env.PORT

const app = express()
app.use(express.json())

let todos = [
    {
        id: 1,
        title: "Todo 1",
        completed: false
    },
    {
        id: 2,
        title: "Todo 2",
        completed: false
    },
    {
        id: 3,
        title: "Todo 3",
        completed: false
    }
]

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})
