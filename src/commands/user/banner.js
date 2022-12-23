const { EmbedBuilder, SlashCommandBuilder, Permissions, Guild } = require('discord.js')

const fetch = require("node-fetch")
module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription(`Shows User's Banner`)
    .addUserOption(option => option.setName('user').setDescription('User to Show Banner')),
  async execute (interaction) {
    const user = interaction.options.getUser('user')
    if(user) {
         uid = user.id
    }
    if(!user) {
        uid = interaction.user.id
    }


    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${interaction.client.token}`
        }
    })

    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']
                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${interaction.client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
            })
        }
    })

    setTimeout(() => {
        if (!receive) return interaction.reply({ content: "Bu kullanıcının banneri bulunamadı!", ephemeral: true})
        let embed = new EmbedBuilder()
            .setColor("Random")
            .setImage(banner)
       interaction.reply({ embeds: [embed], ephemeral: true })
    }, 1000)
 }
}
