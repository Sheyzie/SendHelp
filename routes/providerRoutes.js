//import necessary dependencies
const express = require("express");
const {
  registerProvider,
  loginProvider,
  getProvider,
  editProvider,
  logoutProvider,
} = require("../controllers/providerController");
const { check } = require("express-validator"); //for server side validation
const router = express.Router(); //helps to set up routes

//register user route
router.post(
  "/register",
  [
    check("first_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("last_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("farm_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("farm_size", "Name is required").not().isEmpty(), //checking that name is not empty
    check("email", "Please provide a valid email").isEmail(), //checking if email is valid
    check("password", "Password must be 6 charcters or more").isLength({
      min: 6,
      
    }), //checking password length
    check("phone_number", "Phone number is required").not().isEmpty(), //checking that name is not empty
    check("coutry", "Country is required").not().isEmpty(), //checking that name is not empty
    check("state", "State is required").not().isEmpty(), //checking that name is not empty
    check("LGA", "LGA is required").not().isEmpty(), //checking that name is not empty
    check("address", "Address is required").not().isEmpty(), //checking that name is not empty
  ],
  registerProvider
);

//login user route
router.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(), //checking if email is valid
    check("password", "Password must be 6 charcters or more").isLength({
      min: 6,
      
    }), //checking password length
  ],
  loginProvider
);

//get user info for edit route
router.get("/profile/info", getProvider);

//edit user info
router.put(
  "/profile/edit",
  [
    check("first_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("last_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("farm_name", "Name is required").not().isEmpty(), //checking that name is not empty
    check("farm_size", "Name is required").not().isEmpty(), //checking that name is not empty
    check("phone_number", "Phone number is required").not().isEmpty(), //checking that name is not empty
    check("coutry", "Country is required").not().isEmpty(), //checking that name is not empty
    check("state", "State is required").not().isEmpty(), //checking that name is not empty
    check("LGA", "LGA is required").not().isEmpty(), //checking that name is not empty
    check("address", "Address is required").not().isEmpty(), //checking that name is not empty
  ],
  editProvider
);

//log out user
router.get("/logout", logoutProvider);

module.exports = router;