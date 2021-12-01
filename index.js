require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Phonebook App</h1><p>Go to api/persons for json data</p>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  /*{
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    }*/
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/*{
app.get('/info', (req, res) => {
    const people = notes.length
    const time = new Date()
    console.log(time)
    res.send('<p>Phonebook has info for ' + people + ' people</p>' + '<p>' + time + '</p>')
})
}*/

app.delete('/api/persons/:id', (req, res, next) => {
  /*{
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    }*/
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    console.log(savedPerson)

  })
    .catch(error => next(error))
})

/*{
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Note.findByIdAndUpdate(request.params.id, person, { new: person.number })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})
}*/

const errorHandler = (error, request, response, next) => {
  console.error(error.message, 'HELLLLOOOOOOOO', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})