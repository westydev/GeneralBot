const Punish = require("./Loggers/Punish")
const Server = require("./Server");
const User = require("./User");
const RoleLog = require("./Loggers/RoleLog")
const JoinLogger = require("./Alt/Join-Quit");
const Otorole = require("./Alt/Otorole");
const Modlog = require("./Loggers/Modlog")


module.exports = { Server, User, Punish, RoleLog, JoinLogger, Otorole, Modlog };