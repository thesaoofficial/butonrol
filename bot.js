const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!roller') {
        const roleIDs = [
            '1182882374275584000',
            '1182882375760351293',
            '1182882376372727853',
            '1182882378813821028',
            '1182882377765232640',
            '1182882380231475271',
            '1182882381808554014',
            '1182882382529970240',
            '1182882383729532968',
            '1182882385155608576',
            '1182882386401312848',
            '1182882387378573323'
        ];

        const roles = roleIDs.map(roleID => {
            const role = message.guild.roles.cache.get(roleID);
            return role ? role.name : null;
        }).filter(roleName => roleName !== null);

        const selectMenu = new MessageSelectMenu()
            .setCustomId('rol_select')
            .setPlaceholder('Rol seç')
            .addOptions(
                roles.map(roleName => ({
                    label: roleName,
                    value: roleName,
                }))
            );

        const row = new MessageActionRow().addComponents(selectMenu);

        await message.reply({
            content: 'Aşağıdan bir rol seçin:',
            components: [row],
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    const selectedRole = interaction.values[0];
    const role = interaction.guild.roles.cache.find(r => r.name === selectedRole);

    if (role) {
        const member = interaction.guild.members.cache.get(interaction.user.id);
        member.roles.add(role);
        await interaction.reply(`Rol seçimi başarılı! ${role.name} rolü eklendi.`);
    } else {
        await interaction.reply('Belirtilen rol bulunamadı.');
    }
});

// Botu başlat
client.login('');
