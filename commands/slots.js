exports.run = (con, user, client, message, args) => {


        let content = message.content;
        let bet = args[0];
        var betNum = parseFloat(bet);

        var slots;
        var multiplier;
        var slotArray = ranArray(3,0,9);
        var slotOne = blobArray[slotArray[0]];
        var slotTwo = blobArray[slotArray[1]];
        var slotThree = blobArray[slotArray[2]];

        var winMsg;

        var chanceThreeInRow = 10;
        var chanceTwoInRow = 35;
        var chanceTwoInRowAlt = 60;
        var chanceResults;
        var winResults;

        var slotMachine = function() {

            chanceResults = ranNum(0, 100);
            if (chanceResults >= 0 && chanceResults < chanceThreeInRow) {
                multiplier = 10;
                winResults = true;
                slots = (slotOne + slotOne + slotOne);
                console.log(slotOne);
                return slots;
            } else if (chanceResults >= chanceThreeInRow && chanceResults < chanceTwoInRow) {
                multiplier = 2;
                winResults = true;
                slots = (slotOne + slotOne + slotTwo);
                console.log(slotOne);
                console.log(slotTwo);
                return slots;

            } else if (chanceResults >= chanceTwoInRow && chanceResults < chanceTwoInRowAlt) {
                multiplier = 2;
                winResults = true;
                slots = (slotOne + slotTwo + slotTwo);
                console.log(slotOne);
                console.log(slotTwo);
                return slots;

            } else {
                multiplier = -1;
                winResults = false;
                slots = (slotOne + slotTwo + slotThree);
                console.log(slotOne);
                console.log(slotTwo);
                console.log(slotThree);
                return slots;
            }
        }


        if (betNum % 1 === 0 && betNum > 0) {



            con.query(`SELECT * FROM userdata WHERE id = '${user}'`, (err, rows) => {
                if (err) throw err;
                if (!rows[0]) return message.channel.send("You don't have any points!");
                var currentPoints = rows[0].points

                if (currentPoints < betNum) {

                    message.channel.send("You don't have enough points")

                } else {
                    slotMachine();
                    var winnings = betNum * multiplier;

                    if (winResults === true) {
                        winMsg = (" " + multiplier + "x multiplier! You won " + winnings + " points!");
                    } else {
                        winMsg = (" You lost " + (winnings * -1) + " points!");
                    }




                    let sql = `UPDATE userdata SET points = ${currentPoints + winnings} WHERE id = '${user}'`;
                    message.channel.send(slots + winMsg);

                    con.query(sql, console.log);
                }
            });
        } else {
            message.channel.send("Invalid bet");
        }

    }



//SLOTS TEST

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

var ranArray = function (n, min, max){
        var values = [], i = max;
        while(i >= min) values.push(i--);
        var results = [];
        var maxIndex = max;
        for(i=1; i <= n; i++){
            maxIndex--;
            var index = Math.floor(maxIndex * Math.random());
            results.push(values[index]);
            values[index] = values[maxIndex];
        }
        return results;
    }
