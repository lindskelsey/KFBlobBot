"use strict";

const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ping = require("./commands/ping.js");
const points = require("./commands/points.js");
const lucky = require("./commands/lucky.js");
const slots = require("./commands/slots.js");
const credentials = require('./credentials');
const mysql = require('mysql');


const con = mysql.createConnection({
    host: credentials.HOST,
    user: credentials.USER,
    password: credentials.PASSWORD,
    database: credentials.DATABASE
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const user = message.author.id;

  con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
      if (err) throw err;
      let sql;
      if (rows.length < 1) {
          sql = `INSERT INTO userdata (id, username, points, lucky) VALUES ('${message.author.id}', '${message.author.username}', 2, "unassigned")`
      } else {
          let username = rows[0].username;
          if (username !== message.author.username) {
              let points = rows[0].points;
              sql = `UPDATE userdata SET points = ${points + 2}, username = '${message.author.username}' WHERE id = '${message.author.id}'`;
          } else {
              let points = rows[0].points;
              sql = `UPDATE userdata SET points = ${points + 2} WHERE id = '${message.author.id}'`;
          }
      }
      con.query(sql, console.log);
  });


  if(message.content.startsWith(config.prefix + "ping")) {
      ping.run(client, message, args);
  }

  if(message.content.startsWith(config.prefix + "slots")) {
    slots.run(con, user, client, message, args);
  }

  if(message.content.startsWith(config.prefix + "points")) {
    points.run(con, user, client, message, args);
  }

  if(message.content.startsWith(config.prefix + "lucky")) {
    lucky.run(con, user, client, message, args);
  }

});

client.login(config.token);
