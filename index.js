require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

/*{
const url =
    `mongodb+srv://TropicalIsland:<password>@cluster0.71gwk.mongodb.net/Phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Person = mongoose.model('Person', personSchema)
}*/

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
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    /*{
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    }*/
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

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
    const id = Math.floor(Math.random() * 1000000)

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

    const person = new Person({
        id: id,
        name: body.name,
        number: body.number,
    })

    /*{
    if (persons.map(p => p.name).includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    }*/

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    /*{
    const person = request.body
    person.id = id

    persons = persons.concat(person)
    console.log(person)
    console.log(request.body)
    response.json(person)
    }*/
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})