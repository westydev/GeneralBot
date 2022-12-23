const router = require("express").Router();
const client = global.client;
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { DASHBOARD } = require("../../Settings/Config");
const Punish = require("../../database/Punish");
const Server = require("../../database/Server");
const { checkOwner } = require("../../helpers/Check/Check")

const moment = require("moment")

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
};

router.get("/", async (req, res) => {
    res.render("index", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      ownerEnabled: checkOwner,
    });
})

router.get("/dashboard", (req, res) => {
    if(!req.isAuthenticated() || !req.user)
    return res.redirect("/?error=" + encodeURIComponent("Login first please!"))
    if(!req.user.guilds)
    return res.redirect("/?error=" + encodeURIComponent("Cannot get your Guilds"))
    res.render("guildlist", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      Permissions: PermissionsBitField,
      ownerEnabled: checkOwner,
    });
})

router.get("/dashboard/:guildID", (req, res) => {
    if(!req.isAuthenticated() || !req.user)
    return res.redirect("/?error=" + encodeURIComponent("Login first please!"));
    if(!req.user.guilds)
    return res.redirect("/?error=" + encodeURIComponent("Cannot get your Guilds"));
    const guildID = req.params.guildID;
    const guild = client.guilds.cache.get(guildID)

    if(!guild) return res.redirect("/dashboard")

    res.render("dashboard", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      settingList: DASHBOARD.settingList,
      guild: guild,
      ownerEnabled: checkOwner,
    });
})

router.get("/dashboard/:guildID/punish-list", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID)

    if(!guild)
    return res.redirect("/?error=" + encodeURIComponent("I am not in this Guild yet, please add me before!"))
    let member = guild.members.cache.get(req.user.id);
    if(!member) {
        try{
            member = await guild.members.fetch(req.user.id);
        } catch{

        }
    }
    if(!member)
    return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!member.permissions.has(PermissionFlagsBits.ManageGuild))
    return res.redirect("/?error=" + encodeURIComponent("You are not allowed to do that"))

    const punishs = await Punish.find({ guildID: guild.id });
    let ListPunish = punishs.sort((a, b) => b.Date - a.Date);

    res.render("settings/punish-list", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      bot: client,
      punishs: ListPunish,
      moment: moment,
      ownerEnabled: checkOwner,
    });
})

router.get("/dashboard/:guildID/lang-settings", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID)

    if(!guild)
    return res.redirect("/?error=" + encodeURIComponent("I am not in this Guild yet, please add me before!"))
    let member = guild.members.cache.get(req.user.id);
    if(!member) {
        try{
            member = await guild.members.fetch(req.user.id);
        } catch{

        }
    }
    if(!member)
    return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!member.permissions.has(PermissionFlagsBits.ManageGuild))
    return res.redirect("/?error=" + encodeURIComponent("You are not allowed to do that"))    

    res.render("settings/lang-settings", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      bot: client,
      ownerEnabled: checkOwner,
    });
})

router.post("/dashboard/:guildID/lang-settings", checkAuth, async (req, res) => {
   const guild = client.guilds.cache.get(req.params.guildID)
    if(!guild)
    return res.redirect("/?error=" + encodeURIComponent("I am not in this Guild yet, please add me before!"))
    let member = guild.members.cache.get(req.user.id);
    if(!member) {
        try{
            member = await guild.members.fetch(req.user.id);
        } catch{

        }
    }
    if(!member)
    return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!member.permissions.has(PermissionFlagsBits.ManageGuild))
    return res.redirect("/?error=" + encodeURIComponent("You are not allowed to do that"))

    if(req.body.langs) await Server.findOneAndUpdate({ id: guild.id }, { lang: req.body.langs });

    res.render("settings/lang-settings", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      bot: client,
      ownerEnabled: checkOwner,
    });
})

router.get("/admin", async (req, res) => {
    let user = client.users.cache.get(req.user.id);
   
    if(!user) return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!checkOwner(user.id)) return res.redirect("/?error=" + encodeURIComponent("You Are Not Admin."));
    res.render("admin", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      ownerEnabled: checkOwner,
    });
})

router.get("/admin/guildlist", async (req, res) => {
    let user = client.users.cache.get(req.user.id);
   
    if(!user) return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!checkOwner(user.id)) return res.redirect("/?error=" + encodeURIComponent("You Are Not Admin."));
    res.render("settingsadmin/guildlist", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      ownerEnabled: checkOwner,
    });
})

router.post("/admin/guildlist", async (req, res) => {
    let user = client.users.cache.get(req.user.id);
   if(!req.user) return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!user) return res.redirect("/?error=" + encodeURIComponent("Login first please! / Join the Guild again!"))
    if(!checkOwner(user.id)) return res.redirect("/?error=" + encodeURIComponent("You Are Not Admin."));

    if (req.body.guildid && req.body.guildtype) {
      if(checkOwner(user.id)) {
        const guild = client.guilds.cache.get(req.body.guildid);
        if(!guild) {
           return res.redirect("/admin/guildlist");
        }
        const typt = req.body.guildtype;
       switch (typt) {
         case "leaveguild":
           await guild.leave();
           break;
         case "premiumguild":
           await Server.findOneAndUpdate({ id: guild.id }, { premium: true })
           break;
         case "blacklistguild":
           await Server.findOneAndUpdate({ id: guild.id }, { blacklist: true });
           break;
         case "unpremiumguild":
           await Server.findOneAndUpdate({ id: guild.id }, { premium: false })
           break;
         case "unblacklistguild":
           await Server.findOneAndUpdate(
             { id: guild.id },
             { blacklist: false }
           );
           break;
         default:
           break;
       }

      } else {
        return res.redirect("/?error=" + encodeURIComponent("You Are Not Admin."));
      }
    }

      res.render("settingsadmin/guildlist", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        bot: client,
        ownerEnabled: checkOwner,
      });
})


module.exports = router;