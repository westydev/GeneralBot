const router = require("express").Router();
const passport = require("passport");
const { DASHBOARD } = require("../../Settings/Config")     

router.get('/', passport.authenticate('discord'));

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.redirect(DASHBOARD.main);
})

module.exports = router;