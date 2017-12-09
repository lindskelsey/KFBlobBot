exports.run = (con, user, client, message, args) => {
  con.query(`SELECT * FROM userdata WHERE id = '${user}'`, (err, rows) => {
      if (err) throw err;
      if (!rows[0]) return message.channel.send("You don't exist");
      if(rows[0].lucky === "unassigned") {
          let luckyBlob = blobArray[ranNum(0,9)];
          let sql = `UPDATE userdata SET lucky = '${luckyBlob}' WHERE id = '${user}'`;
          message.channel.send("Your lucky blob is " + luckyBlob);
          con.query(sql, console.log);
      } else if(rows[0] !== "unassigned") {
        message.channel.send("You already have a lucky blob: " + rows[0].lucky);
      }
    });
  }

  var blobOne = '<:doggoblob:387321438077714432>';
  var blobTwo = '<:blobuwu:387321938261049347>';
  var blobThree = '<:blobthinkingcool:387321897693609995>';
  var blobFour = '<:blobteefs:387321494448898048>';
  var blobFive = '<:blobparty:387321470659067905>';
  var blobSix = '<:blobnomcookie:387321537444839425>';
  var blobSeven = '<:blobnom:387322059858116608>';
  var blobEight = '<:blobderpy:387321865850322946>';
  var blobNine = '<:blobblush:387321756509274112>';
  var blobTen = '<:blobaww:387321376190758916>';

  var blobArray = [blobOne, blobTwo, blobThree, blobFour, blobFive, blobSix, blobSeven, blobEight, blobNine, blobTen];

  var ranNum = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
