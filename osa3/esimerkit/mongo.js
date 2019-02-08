
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const mongoose = require('mongoose')

const url =
  `mongodb://testikayttaja:${password}@ds121861.mlab.com:21861/esimerkit`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/* 
const note = new Note({
  content: 'Mitä tähän nyt kirjoittaisi',
  date: new Date(),
  important: true,
})

note.save().then(response => {
  console.log('note saved!');
  mongoose.connection.close();
})
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})