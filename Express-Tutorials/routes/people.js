const express = require('express');
// Making a router
const router = express.Router();
const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
} = require('../controllers/people');

/*
    `people.js` file is still cluttered. To solve this problem, we can put all the functions inside people.js file
    inside the controller folder 
*/

// replace app with router
router.get('/', getPeople);

router.post('/', createPerson)

// We send the id as route parameter and data as request body
router.put('/:id', updatePerson)

router.delete('/:id', deletePerson)

// or Chainig method (Choice of preference)
/* 
router.route('/').get(getPeople).post(createPerson);
router.route('/:id').put(updatePerson).delete(deletePerson);
*/

module.exports = router;