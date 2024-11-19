//fetch input field
const form = document.getElementById("registerForm");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const phoneNumber = document.getElementById("phone-number");
const country = document.getElementById("country");
const state = document.getElementById("state");
const LGA = document.getElementById("LGA");
const address = document.getElementById("address");
const message = document.getElementById('message');

//fetch errorSpan
const firstNameError = document.getElementById("first-nameError");
const lastNameError = document.getElementById("last-nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirm-passwordError");
const phoneNumberError = document.getElementById("phone-numberError");
const countryError = document.getElementById("countryError");
const stateError = document.getElementById("stateError");
const LGAError = document.getElementById("LGAError");
const addressError = document.getElementById("addressError");

//valiidate input fields
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const terms = confirm('By clicking submit you have accepted our terms and condition')
  
  if(!terms){
    return false;
  }
  //validate first name field
  if (firstName.value === null || firstName.value === "") {
    displayError("firstName", "First name cannot be empty");
  } else if (firstName.value.length < 2) {
    displayError("firstName", "First name cannot be less than 2");
  }else if(!isNaN(firstName.value)){
    displayError("firstName", "First name cannot be number");
  } else {
    setSuccess(firstName);
  }

  //validate last name field
  if (lastName.value === null || lastName.value === "") {
    displayError("lastName", "Last name cannot be empty");
  } else if (lastName.value.length < 2) {
    displayError("lastName", "Last name cannot be less than 2");
  }else if(!isNaN(lastName.value)){
    displayError("lastName", "Last name cannot be number");
  } else {
    setSuccess(lastName);
  }

  //validate email field
  if (email.value === null || email.value === "") {
    displayError("email", "Email cannot be empty");
  } else if(!isNaN(email.value)){
    displayError("email", "Email cannot be number");
  } else {
    setSuccess(email);
  }

  //validate password field
  if (password.value === null || password.value === "") {
    displayError("password", "Password cannot be empty");
  } else if (password.value.length < 6) {
    displayError("password", "Password cannot be less than 6 characters");
  } else {
    setSuccess(password);
  }

  //validate confirm password field
  if (confirmPassword.value === null || confirmPassword.value === "") {
    displayError("confirmPassword", "Confirm password cannot be empty");
  } else if (confirmPassword.value.length < 6) {
    displayError(
      "confirmPassword",
      "Password cannot be less than 6 characters"
    );
  } else if (confirmPassword.value != password.value) {
    displayError("confirmPassword", "Passwords do not match");
  } else {
    setSuccess(confirmPassword);
  }

  //validate phone number
  if (phoneNumber.value === null || phoneNumber.value === "") {
    displayError("phoneNumber", "Phone number cannot be empty");
  } else if (isNaN(phoneNumber.value)) {
    displayError("phoneNumber", "Phone number can only be number");
  } else {
    setSuccess(phoneNumber);
  }

  //validate country
  if (country.value === null || country.value === "") {
    displayError("country", "Country cannot be empty");
  } else if (country.value.length < 2) {
    displayError("country", "Country cannot be less than 2");
  } else if(!isNaN(country.value)){
    displayError("country", "Country cannot be number");
  } else {
    setSuccess(country);
  }

  //validate state field
  if (state.value === null || state.value === "") {
    displayError("state", "State cannot be empty");
  } else if (state.value.length < 2) {
    displayError("state", "State cannot be less than 2");
  } else if(!isNaN(state.value)){
    displayError("state", "State cannot be number");
  } else {
    setSuccess(state);
  }

  //validate LGA field
  if (LGA.value === null || LGA.value === "") {
    displayError("LGA", "LGA cannot be empty");
  } else if (LGA.value.length < 2) {
    displayError("LGA", "LGA cannot be less than 2");
  } else if(!isNaN(LGA.value)){
    displayError("LGA", "LGA cannot be number");
  } else {
    setSuccess(LGA);
  }

  //validate address field
  if (address.value === null || address.value === "") {
    displayError("address", "Address cannot be empty");
  } else if (address.value.length < 2) {
    displayError("address", "Address cannot be less than 2");
  } else if(!isNaN(address.value)){
    displayError("address", "Address cannot be number");
  } else {
    setSuccess(address);
  }
});

//indicate that input is inserted
firstName.addEventListener("input", () => {
  verifyInput(firstName, firstNameError);
});

lastName.addEventListener("input", () => {
  verifyInput(lastName, lastNameError);
});

email.addEventListener("input", () => {
  verifyInput(email, emailError);
});

password.addEventListener("input", () => {
  verifyInput(password, passwordError);
});

confirmPassword.addEventListener("input", () => {
  verifyInput(confirmPassword, confirmPasswordError);
});

phoneNumber.addEventListener("input", () => {
  verifyInput(phoneNumber, phoneNumberError);
});

country.addEventListener("input", () => {
  verifyInput(country, countryError);
});

state.addEventListener("input", () => {
  verifyInput(state, stateError);
});

LGA.addEventListener("input", () => {
  verifyInput(LGA, LGAError);
});

address.addEventListener("input", () => {
  verifyInput(address, addressError);
});

function verifyInput(field, Error) {
  Error.innerHTML = "";
  field.style.backgroundColor = "pink";
}

function displayError(field, message) {
  switch (field) {
    case "firstName":
      firstNameError.innerHTML = "";
      firstNameError.style.fontSize = "15px";
      firstNameError.style.color = "red";
      firstNameError.style.display = "block";
      firstNameError.style.textAlign = "center";
      firstNameError.innerHTML = message;
      break;
    case "lastName":
      lastNameError.innerHTML = "";
      lastNameError.style.fontSize = "15px";
      lastNameError.style.color = "red";
      lastNameError.style.display = "block";
      lastNameError.style.textAlign = "center";
      lastNameError.innerHTML = message;
      break;
    case "email":
      emailError.innerHTML = "";
      emailError.style.fontSize = "15px";
      emailError.style.color = "red";
      emailError.style.display = "block";
      emailError.style.textAlign = "center";
      emailError.innerHTML = message;
      break;
    case "password":
      passwordError.innerHTML = "";
      passwordError.style.fontSize = "15px";
      passwordError.style.color = "red";
      passwordError.style.display = "block";
      passwordError.style.textAlign = "center";
      passwordError.innerHTML = message;
      break;
    case "confirmPassword":
      confirmPasswordError.innerHTML = "";
      confirmPasswordError.style.fontSize = "15px";
      confirmPasswordError.style.color = "red";
      confirmPasswordError.style.display = "block";
      confirmPasswordError.style.textAlign = "center";
      confirmPasswordError.innerHTML = message;
      break;
    case "phoneNumber":
      phoneNumberError.innerHTML = "";
      phoneNumberError.style.fontSize = "15px";
      phoneNumberError.style.color = "red";
      phoneNumberError.style.display = "block";
      phoneNumberError.style.textAlign = "center";
      phoneNumberError.innerHTML = message;
      break;
    case "country":
      countryError.innerHTML = "";
      countryError.style.fontSize = "15px";
      countryError.style.color = "red";
      countryError.style.display = "block";
      countryError.style.textAlign = "center";
      countryError.innerHTML = message;
      break;
    case "state":
      stateError.innerHTML = "";
      stateError.style.fontSize = "15px";
      stateError.style.color = "red";
      stateError.style.display = "block";
      stateError.style.textAlign = "center";
      stateError.innerHTML = message;
      break;
    case "LGA":
      LGAError.innerHTML = "";
      LGAError.style.fontSize = "15px";
      LGAError.style.color = "red";
      LGAError.style.display = "block";
      LGAError.style.textAlign = "center";
      LGAError.innerHTML = message;
      break;
    case "address":
      addressError.innerHTML = "";
      addressError.style.fontSize = "15px";
      addressError.style.color = "red";
      addressError.style.display = "block";
      addressError.style.textAlign = "center";
      addressError.innerHTML = message;
      break;
    default:
      firstNameError.innerHTML = "";
      lastNameError.innerHTML = "";
      emailError.innerHTML = "";
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";
      phoneNumberError.innerHTML = "";
      countryError.innerHTML = "";
      stateError.innerHTML = "";
      LGAError.innerHTML = "";
      addressError.innerHTML = "";
  }
}
let isFirstName = false;
let islastName = false;
let isEmail = false;
let isPassword = false;
let isConfirmPassword = false;
let isPhoneNumber = false;
let isCountry = false;
let isState = false;
let isLGA = false;
let isAddress = false

//indicate input with right values
function setSuccess(field){
  switch (field.name) {
    case "first_name":
      firstNameError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isFirstName = true
      break;
    case "last_name":
      lastNameError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      islastName = true;
      break;
    case "email":
      emailError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isEmail = true;
      break;
    case "password":
      passwordError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isPassword = true;
      break;
    case "confirm_password":
      confirmPasswordError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isConfirmPassword = true;
      break;
    case "phone_number":
      phoneNumberError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isPhoneNumber = true
      break;
    case "country":
      countryError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isCountry = true
      break;
    case "state":
      stateError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isState = true;
      break;
    case "LGA":
      LGAError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isLGA = true;
      break;
    case "address":
      addressError.innerHTML = "";
      field.style.backgroundColor = "lightgreen";
      isAddress = true;
      break;
    default:
      firstNameError.innerHTML = "";
      lastNameError.innerHTML = "";
      emailError.innerHTML = "";
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";
      phoneNumberError.innerHTML = "";
      countryError.innerHTML = "";
      stateError.innerHTML = "";
      LGAError.innerHTML = "";
      addressError.innerHTML = "";
  }

  isValidated()
}

async function isValidated (){
  const validate = await getValidation()
  console.log(validate)
  if(!validate){
    return false;
  }

  //if all inputs are valid, submit form
  const fd = new FormData(form);
  const fdObj = Object.fromEntries(fd);

  //submit form to server
  try{
    const response = await fetch('/sendhelp/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fdObj)
    })
    const data = await response.json()
    // show success message
    displayResponse(data.success, data.message)
    console.log(data.message)
    
  } catch (error){
    console.log(error)
  }
  
}

//check if inputs a validated
async function getValidation() {
  if (isFirstName && islastName && isEmail && isPassword && isConfirmPassword && isPhoneNumber && isCountry && isState && isLGA && isAddress){
    return true;
  }
}

function displayResponse(success, text){
  console.log(success)
  if(success){
    message.style.display = 'block'
    message.style.color = 'green'
    message.style.backgroundColor = 'lightgreen'
    message.innerHTML = text
    setTimeout(() => {
      message.innerHTML = ''
      message.style.display = 'none'
    }, 5000) //set delay for 5secs
  }else{
    message.style.display = 'block'
    message.style.color ='red'
    message.style.backgroundColor = 'pink'
    message.innerHTML = text
    setTimeout(() => {
      message.innerHTML = ''
      message.style.display = 'none'
    }, 5000) //set delay for 5secs
  }
}