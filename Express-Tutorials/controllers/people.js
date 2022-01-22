const express = require('express');
const { people } = require('../data');
// req and res work because of express
const getPeople = (req, res) => {

    res.status(200).json({ success: true, data: people });
}

const createPerson = (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({ success: false, msg: "Please provide name" });

    return res.status(201).json({ success: true, person: name });
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
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
}

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
}