//import necessary dependencies
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//register user
exports.registerUser = async (req, res) => {
  //configure the variable to hold the errors
  const errors = validationResult(req); //validation will be carried out on the route

  //check if any error is present in validation
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please correct input errors",
      errors: errors.array(),
    });
  }

  //if no error is present in validation
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    phone_number,
    country,
    state,
    LGA,
    address,
    terms,
  } = req.body; //fetching the input parameter from the request body
  console.log(req.body)
  try {
    //checking if a user exist in database
    const [user] = await db.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    //statement to check if the email exist
    if (user.length > 0) {
      //if user exist
      console.log('user: ', user)
      return res
        .status(400)
        .json({ status: 400, success: false, message: "User already exist" });
    }

    //if user does not exist
    //proceed to hash password
    const password_hash = await bcrypt.hash(password, 10); //10 is the number of rounds for the salt
    //salt - random characters added to the password during the hashing process to make it more secure

    //insert the user record to the database
    const sql =
      "INSERT INTO users (first_name, last_name, email, password_hash, phone_number, country, state, LGA, address, terms, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const value = [
      first_name,
      last_name,
      email,
      password_hash,
      phone_number,
      country,
      state,
      LGA,
      address,
      'Accepted',
      "Active",
    ];
    await db.execute(sql, value);
    return res.status(201).json({
      status: 201,
      success: true,
      message: "New user registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error registering user",
      error: error,
    });
  }
};

//log in user
exports.loginUser = async (req, res) => {
  //configure the variable to hold the errors
  const errors = validationResult(req); //validation will be carried out on the route

  //check if any error is present in validation
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please correct input errors",
      errors: errors.array(),
    });
  }

  //if no error is present in validation
  const { email, password } = req.body; //fetching the input parameter from the request body

  try {
    //checking if a user exist in database
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    //statement to check if the email exist
    if (!user.length > 0) {
      //if user does not exist
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist exist",
      });
    }

    //if user account is disabled by admin
    if (user[0].status === "Disabled") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account disabled",
      });
    }

    //if user exist
    //proceed to compare password
    const isMatch = await bcrypt.compare(password, user[0].password); //to compare the password

    if (!isMatch) {
      //if password does not match
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });
    }

    //if password match
    req.session.user = user[0]; //user session object to hold users data
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error logging user",
      error: error,
    });
  }
};

//get user information
exports.getUser = (req, res) => {
  //check if a user is logged in
  if (!req.session.user) {
    //if user is not logged in
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Unauthorised! user not logged in",
    });
  }
  //if user is not logged in
  const user = {
    user_id: req.session.user.user_id,
    first_name: req.session.user.first_name,
    last_name: req.session.user.last_name,
    email: req.session.user.email,
    phone_number: req.session.user.phone_number,
    country: req.session.user.country,
    state: req.session.user.state,
    LGA: req.session.user.LGA,
    address: req.session.user.address,
    terms: req.session.user.terms,
  };

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Data retrieved successfully!",
    user: user,
  });
};

//edit user information
exports.editUser = async (req, res) => {
  //check if user is logged in
  if (!req.session.user) {
    //if user is not logged in
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Unauthorised! user not logged in",
    });
  }

  //configure the variable to hold the server side validation errors
  const errors = validationResult(req); //validation will be carried out on the route

  //check if any error is present in validation
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please correct input errors",
      errors: errors.array(),
    });
  }

  //if no error is present in validation ans user is logged in
  const {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    state,
    LGA,
    address,
  } = req.body; //fetching the input parameter from the request body

  try {
    //checking if a user exist in database
    const [user] = await db.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [req.session.user.user_id]
    );

    //statement to check if the email exist
    if (!user.length > 0) {
      //if user does not exist
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist exist",
      });
    }

    await db.execute(
      "UPDATE users SET first_name = ?, last_name =?, email = ?, phone_number = ?, country = ?, state = ?, LGA =?, address = ? WHERE user_id = ?",
      [
        first_name,
        last_name,
        email,
        phone_number,
        country,
        state,
        LGA,
        address,
        req.session.user.user_id,
      ]
    );

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Details updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error updating details",
      error: error,
    });
  }
};

//log out user
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error logging out user",
        error: err,
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "logout successful!",
    });
  });
};
