//import necessary dependencies
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//register user
exports.registerProvider = async (req, res) => {
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
  const { first_name, last_name, farm_name, farm_size, email, password, phone_number, country, state, LGA, address, terms } = req.body; //fetching the input parameter from the request body
  ;
  try {
    //checking if a user exist in database
    const [provider] = await db.execute("SELECT email FROM providers WHERE email = ?", [
      email,
    ]);

    //statement to check if the email exist
    if (provider.length > 0) {
      //if user exist
      return res
        .status(400)
        .json({ status: 400, success: false, message: "User already exist" });
    }

    //if user does not exist
    //proceed to hash password
    const password_hash = await bcrypt.hash(password, 10); //10 is the number of rounds for the salt
    //salt - random characters added to the password during the hashing process to make it more secure

    //insert the user record to the database
    const sql = "INSERT INTO providers (first_name, last_name, farm_name, farm_size, email, password, phone_number, country, state, LGA, address, terms, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const value = [first_name, last_name, farm_name, farm_size, email, password_hash, phone_number, country, state, LGA, address, terms, 'Active'];
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
exports.loginProvider = async (req, res) => {
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
    const [provider] = await db.execute("SELECT * FROM providers WHERE email = ?", [
      email,
    ]);

    //statement to check if the email exist
    if (!provider.length > 0) {
      //if user does not exist
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist exist",
      });
    }

    //if providers account is disabled
    if (provider[0].status === 'Disabled'){
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Account disabled",
      });
    }

    //if user exist
    //proceed to compare password
    const isMatch = await bcrypt.compare(password, provider[0].password); //to compare the password

    if (!isMatch) {
      //if password does not match
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });
    }

    //if password match
    req.session.provider = provider[0]; //user session object to hold users data
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
exports.getProvider = (req, res) => {
  //check if a user is logged in
  if (!req.session.provider) {
    //if user is not logged in
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Unauthorised! user not logged in",
    });
  }
  //if user is not logged in
  const provider = {
    provider_id: req.session.provider.provider_id,
    first_name: req.session.provider.first_name,
    last_name: req.session.provider.last_name,
    farm_name: req.session.provider.farm_name,
    farm_size: req.session.provider.farm_size,
    email: req.session.provider.email,
    phone_number: req.session.provider.phone_number,
    country: req.session.provider.country,
    state: req.session.provider.state,
    LGA: req.session.provider.LGA,
    address: req.session.provider.address,
    terms: req.session.provider.terms,
  };

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Data retrieved successfully!",
    provider: provider,
  });
};

//edit user information
exports.editProvider = async (req, res) => {
  //check if user is logged in
  if (!req.session.provider) {
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
  const { first_name, last_name, farm_name, farm_size, email, phone_number, country, state, LGA, address} = req.body; //fetching the input parameter from the request body

  try {
    //checking if a user exist in database
    const [provider] = await db.execute("SELECT * FROM providers WHERE provider_id = ?", [
      req.session.provider.provider_id,
    ]);

    //statement to check if the email exist
    if (!provider.length > 0) {
      //if user does not exist
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User does not exist exist",
      });
    }

    await db.execute(
      "UPDATE providers SET first_name = ?, last_name =?, email = ?, phone_number = ?, country = ?, state = ?, LGA =?, address = ? WHERE provider_id = ?",
      [first_name, last_name, email, phone_number, country, state, LGA, address, req.session.provider.provider_id]
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
exports.logoutProvider = (req, res) => {
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