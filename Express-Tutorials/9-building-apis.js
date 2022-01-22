const express = require('express');
const { people } = require('./data');
const app = express();

app.listen(3000, (req, res) => {
    console.log('server is listening at port 3000...');
})

app.use(express.static('./methods-public'));

// To send the data in json format we need to use another middleware called `json`. The data send from the javascript.html
// is in JSON format so to parse that we nee the express.json() middleware 
app.use(express.json());

app.get('/api/people', (req, res) => {

    res.status(200).json({ success: true, data: people });
})

app.post('/api/people', (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({ success: false, msg: "Please provide name" });

    return res.status(201).json({ success: true, person: name });
})

// We send the id as route parameter and data as request body
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => {
        return person.id === Number(id);
    })
    if (!person) {
        return res.status(404).json({ success: false, msg: "Can't find the person" });
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    })

    return res.status(200).json({ success: true, data: newPeople });
})

app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const person = people.find((person) => {
        return person.id === Number(id);
    })

    if (!person) {
        return res.status(404).json({ success: false, msg: "Can't find the person" });
    }

    const newPeople = people.filter((person) => {
        return person.id !== Number(id);
    })

    return res.status(200).json({ success: false, data: newPeople });
})

