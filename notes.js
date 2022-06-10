const fs = require('fs')

const createNotes = (title, body) => {
    const data = loadNotes()
    const duplicateNotes = data.filter((note) => note.title === title )

    if (duplicateNotes.length === 0) {
        data.push({
            title: title,
            body: body
        })
    
        saveNotes(data)
        console.log("New note added!")
    }else{
        console.log("Note title taken!")
    }
}

const removeNotes = (title) => {
    const data = loadNotes()
    const notesToKeep = data.filter((note) => note.title !== title)

    if(data.length === notesToKeep.length){
        console.log("The note doesn't exist!")
    }else{
        saveNotes(notesToKeep)
        console.log("The note has been removed!")
    }
}

const listNotes = () => {
    const data = loadNotes()
    data.forEach(element => {
        console.log(element.title)
    });
}

const readNote = (title) => {
    const data = loadNotes()
    const note = data.find((note) => note.title === title)

    if (note) {
        console.log(note.title + ' ' +note.body)
    }else {
        console.log("Note not found!")
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

module.exports = {
    createNotes: createNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}