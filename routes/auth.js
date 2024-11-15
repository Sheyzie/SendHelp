//importing dependencies
const express = require('express')
const {registerUser, loginUser, logoutUser, userEdits} = require('../controllers/authUsers')
const router = express.Router()

//route to register user
router.post('/register', registerUser)

//route to log in user
router.post('/login', loginUser)

//route to view profile
router.get('/edit-user', editUser)

//route to log out user
router.post('/login', logoutUser)