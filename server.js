//importing dependencies
const db = require("./config/database"); //for databse connection
const express = require("express"); //for the web server
const bodyParser = require("body-parser"); //for capturing form data
const session = require("express-session"); //for session management
const MySQLStore = require("express-mysql-session")(session); //for storage of session mangement
const dotenv = require("dotenv"); //manage envionment variables
const path = require("path");

//configuring dotenv to initialize environmental variables
dotenv.config();

//initialize express
const app = express();

//setting up middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configure session store
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //1 hour => 3600s
    },
  })
);

//configure routes
app.use("/sendhelp/api/users", require("./routes/userRoutes"));
app.use("/sendhelp/api/provider", require("./routes/providerRoutes"));
app.use("/sendhelp/api/admin", require("./routes/adminRoutes"));

//configure request routes
// app.use("/sendhelp/api/req/users", require("./routes/userReqRoutes"));
// app.use("/sendhelp/api/req/provider", require("./routes/providerReqRoutes"));
// app.use("/sendhelp/api/req/admin", require("./routes/adminReqRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
//start up the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://127.0.0.1:${process.env.PORT}`);
});
