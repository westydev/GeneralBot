const Punish = require("./Loggers/Punish")
const Server = require("./Server");
const User = require("./User");
const RoleLog = require("./Loggers/RoleLog")
const JoinLogger = require("./Alt/Join-Quit");
const Otorole = require("./Alt/Otorole");


module.exports = { Server, User, Punish, RoleLog, JoinLogger, Otorole };