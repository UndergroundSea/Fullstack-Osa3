const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phonebook App</h1><p>Go to api/persons for json data</p>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const people = notes.length
    const time = new Date()
    console.log(time)
    res.send('<p>Phonebook has info for ' + people + ' people</p>' + '<p>' + time + '</p>')
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = Math.floor(Math.random() * 1000)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.map(p => p.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = request.body
    person.id = id

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)