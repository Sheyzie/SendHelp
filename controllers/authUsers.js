//importing packages
const db = require('../config/database')
const bcrypt = require('bcryptjs')

//function to register user
exports.registerUser = async (req, res) => {
  const {first_name, last_name, email, phone_number, emergency_contact_one, emergency_contact_two, emergency_contact_three, password} = req.body

  try{
    //check if user exist in database
    const [row] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
    if(row.length > 0) {
      return res.status(400).json({status: 400, success: false, message: 'User already exist!'})
    }

    //hash the password
    const password_hash = await bcrypt.hash(password, 10)

    //insert record into database
    await db.execute('INSERT INTO users (first_name, last_name, email, phone_number,emergency_contact_one, emergency_contact_two, emergency_contact_three, password_hash) VALUES (?, ?, ?)', [first_name, last_name, email, phone_number,emergency_contact_one, emergency_contact_two, emergency_contact_three, password_hash])
    res.status(201).json({status: 201, success: true, message: 'User registered successfuly'})
  }catch{
    console.error(error)
    res.status(500).json({status: 400, success: false, message: 'Internal server error', error: error})
  }
}
