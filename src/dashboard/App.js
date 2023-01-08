require("./login/discord");

const express = require("express")
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const { DASHBOARD, BOT, DATABASE } = require("../Settings/Config")
const { error, info, success, warn } = require("../helpers/Logger/Log");
const login = require("./login/login");
const mainRouter = require("./routers/MainRouter")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app
.use(express.static(__dirname + '/views/public'))
.use(express.json())
.engine("html", require("ejs").renderFile)
.set("view engine", "ejs")
.set("views", path.join(__dirname, "/views"))

app.use(session({
  secret: DASHBOARD.AUTH.sessionSecret,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DATABASE.mongooseConnection })
}));


app.use(passport.initialize())
app.use(passport.session())

app.use('/login', login)
app.use('/', mainRouter)


if(DASHBOARD.enabled) {
    app.listen(DASHBOARD.port, () => {
        success("Dashboard Enabled.")
    })
} else {
    warn("Dashboard Not Started.")
}
