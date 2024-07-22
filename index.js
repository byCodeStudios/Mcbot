require('./server.js');

const { createClient } = require('bedrock-protocol');

const options = {
    host: 'survicialpriv.aternos.me', // Cambia esto a la IP de tu servidor
    port: 47993, // Puerto por defecto de Bedrock
    username: 'Nokillme' // Nombre de tu bot
};

const client = createClient(options);

client.on('join', () => {
    console.log('Bot joined the game!');
});

client.on('text', (packet) => {
    if (packet.type === 'chat') {
        console.log(`[${packet.source_name}]: ${packet.message}`);
    }
});

client.on('disconnect', (packet) => {
    console.log('Bot disconnected:', packet);
});

client.on('error', (err) => {
    console.error('Error:', err);
});
