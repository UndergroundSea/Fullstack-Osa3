const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://TropicalIsland:${password}@cluster0.71gwk.mongodb.net/Phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {

    const person = new Person({
        id: 100,
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}

/*{
person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})
}*/


