exports.run = (con, user, client, message, args) => {
        con.query(`SELECT * FROM userdata WHERE id = '${user}'`, (err, rows) => {
            if (err) throw err;
            if (!rows[0]) return message.channel.send("You don't have any points!");
            let points = rows[0].points;
            message.channel.send(points);

        });
    }
