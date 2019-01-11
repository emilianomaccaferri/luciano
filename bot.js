const nodeogram = require(`nodeogram`);
const net       = require(`net`);
const Handler   = require(`./Handler`);

const client    = new net.Socket();
const bot       = new nodeogram.Bot(`657893238:AAHUFdi5OLMNVtDb65Oo5xmlS6bQQNytW4k`);
const handler   = new Handler();

client.connect(7777, 'laluce.ddns.net', () => {

	console.log('Client started and connected!');

});

client.on('data', (data) => {

  var recv = data.toString('utf-8');

  console.log(recv);

	handler.handle(recv)

});

client.on('close', () => {

	console.log('Closed connection');

});


bot.init();

bot.command('status', 'Spegne la luce', false, (args, message) => {

  message.reply("Richiedo lo stato...");
  client.write('r');

  handler.on('bad-data', () => {

    message.reply(`Risposta malformata, c'è stato probabilmente un errore server-side...`);

  });

  handler.on('status', (code) => {

    if(code === "0")
      return message.reply(`La lampadina è spenta`);

    if(code === "1")
      return message.reply(`La lampadina è accesa`);

  });

});

bot.command('spegni', 'Spegne la luce', false, (args, message) => {

  message.reply("Sto spegnendo la lampadina...");
  client.write('s');

  handler.on('bad-data', () => {

    message.reply(`Risposta malformata, c'è stato probabilmente un errore server-side...`);

  });

  handler.on('isOff', () => {

    message.reply(`La lampadina è ora spenta!`);

  });

});

bot.command('accendi', 'Accende la luce', false, (args, message) => {

  message.reply("Sto accendendo la lampadina...");
  client.write('a');

  handler.on('bad-data', () => {

    message.reply(`Risposta malformata, c'è stato probabilmente un errore server-side...`);

  });

  handler.on('isOn', () => {

    message.reply(`La lampadina è ora accesa!`);

  });

});
