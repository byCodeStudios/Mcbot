const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalBlock, GoalNear } = goals;
const Vec3 = require('vec3');

require('./server.js');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'survicialpriv.aternos.me', // Cambia esto por la IP de tu servidor
    port: 27659,       // Cambia esto si tu servidor usa un puerto diferente
    username: 'Nokillme', // Nombre del bot
    version: '1.20',     // Versión de Minecraft
    auth: 'offline'      // Permite la conexión a servidores no premium
  });

  bot.loadPlugin(pathfinder);

  bot.on('login', () => {
    console.log('Bot conectado');
    randomWalk(); // Inicia el movimiento aleatorio
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(`Hola ${username}, has dicho: ${message}`);
  });

  bot.on('error', (err) => {
    console.error('Error:', err);
  });

  bot.on('end', () => {
    console.log('Bot desconectado. Intentando reconectar en 10 segundos...');
    setTimeout(createBot, 10000); // Intenta reconectar después de 10 segundos
  });
}

function randomWalk() {
  const range = 20; // Define el rango en el que el bot caminará aleatoriamente

  function walk() {
    const x = bot.entity.position.x + (Math.random() * range * 2 - range);
    const z = bot.entity.position.z + (Math.random() * range * 2 - range);
    const y = bot.entity.position.y;

    bot.pathfinder.setGoal(new GoalNear(x, y, z, 1)); // Meta cercana para evitar caminos largos

    setTimeout(walk, 10000); // Después de alcanzar la meta, espera 10 segundos antes de moverse de nuevo
  }

  walk(); // Inicia el primer movimiento
}

// Inicializa el bot por primera vez
createBot();
