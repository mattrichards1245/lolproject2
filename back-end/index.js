const http = require("http");
const fs = require("fs");
const port = 4000;
const axios = require("axios");
const readline = require("readline");
const express = require("express");
const app = express();
const cors = require("cors");

const RonaldGlover =
  "CjmLonfVCBX18A6FD6uZg2nBpHH5xcfOJral0nqRntSfeMGa4zGmfo0CLGarbxsSDckLM97wW8Gyfw";

const Chris =
  "GjI46PaQEYwzeMvd_dV6Ihfmvp_Ri5XWbbP03vtd0UbAReLCirSWftW5jVNVe84Zw3U4nkpiOpEGxg";

const Max =
  "djxAN43qn5KUUnVhj7LTagMniA_8hIMKEYNNC8-qTZbRywOKzbxN5KQ_8qUmNYcmh0vyWURXP4oIUg";

const Carlos =
  "B69z9SJ7Ak8vl-EGS4wsIcTHcxa-tHzzQo7PSJ8tL3-9LVEu5HlFTzC_y7jkYpTswcxLfJxCW6CSsQ";

const Devyn =
  "C-sVWI7MNZpBnKZi_vFl2ArWySbxpcN6no7OuwEsF3jkkRCrAxZ87Shjxcr_k6maIOU07oNosXF9Xg";
var win = [];
var matches = [];
var pdata = [];
let matchListFile = [];
let winsFile = [];
let dataFile = [];
matchListFile[RonaldGlover] = "RGMatchList.txt";
winsFile[RonaldGlover] = "RGWins.txt";
dataFile[RonaldGlover] = "RGData.txt";
matchListFile[Chris] = "CRMatchList.txt";
winsFile[Chris] = "CRWins.txt";
dataFile[Chris] = "CRData.txt";
matchListFile[Max] = "MXMatchList.txt";
winsFile[Max] = "MXWins.txt";
dataFile[Max] = "MXData.txt";
function getThing(userID, x) {
  win[x] = [];
  matches[x] = [];
  pdata[x] = [];

  const API_KEY = "";
  var matchID = "";
  let matchesURL =
    "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
    userID +
    "/ids?start=0&count=10" +
    "&api_key=" +
    API_KEY;
  let matchDetailsURL =
    "https://americas.api.riotgames.com/lol/match/v5/matches/" +
    matchID +
    "?api_key=" +
    API_KEY;
  let dataURL =
    "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" +
    userID +
    "?api_key=" +
    API_KEY;
  async function getData() {
    let profileData = await axios.get(dataURL);
    var file = fs.createWriteStream(`./${dataFile[userID]}`);
    pdata[x].push(profileData.data["name"]);
    pdata[x].push(profileData.data["profileIconId"]);
    pdata[x].push(profileData.data["summonerLevel"]);

    file.on("error", function (err) {
      /* error handling */
    });
    pdata[x].forEach((value) => file.write(`${value}\n`));
    file.end();
  }
  getData();
  async function getMatches() {
    let matchList = await axios.get(matchesURL);
    var file = fs.createWriteStream(`./${matchListFile[userID]}`);
    matches[x] = matchList.data;

    file.on("error", function (err) {
      /* error handling */
    });
    matches[x].forEach((value) => file.write(`${value}\n`));
    file.end();
  }
  getMatches();

  setTimeout(continueExecution, 10000);
  function continueExecution() {
    async function processLineByLine() {
      let fileStream = fs.createReadStream(`./${matchListFile[userID]}`);
      matches[x] = [];
      let rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in input.txt as a single line break.

      for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.

        matches[x].push(line);
      }
    }
    //Loop through matches
    async function continueprocessing() {
      await processLineByLine().then((response) => {
        console.log("matches[x] = " + matches[x]);
      });
      for (let i = 0; i < matches[x].length; i++) {
        matchID = matches[x][i];

        matchDetailsURL =
          "https://americas.api.riotgames.com/lol/match/v5/matches/" +
          matches[x][i] +
          "?api_key=" +
          API_KEY;

        let loopthrough = axios
          .get(matchDetailsURL)
          .then((response) => {
            // Loop through participants to find participant ID
            for (
              let j = 0;
              j < response.data["metadata"]["participants"].length;
              j++
            ) {
              //Check if game was won
              if (userID === response.data["metadata"]["participants"][j]) {
                win[x].push(
                  `${response.data["info"]["participants"][j]["win"]}`
                );

                var file = fs.createWriteStream(`./${winsFile[userID]}`);

                file.on("error", function (err) {
                  /* error handling */
                });
                win[x].forEach((value) => file.write(`${value}\n`));
                file.end();
              }
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              return;
            }
          });
        //Check if loop is at the last iteration
        await loopthrough;
      }
    }
    continueprocessing();
  }
  console.log(matchListFile[userID]);
  console.log(dataFile[userID]);
}

getThing(RonaldGlover, 1);
setTimeout(function () {
  console.log("Starting next get");
  getThing(Chris, 2);
  setTimeout(function () {
    console.log("Starting next get");
    getThing(Max, 3);
    // do stuff
  }, 35000);
  // do stuff
}, 30000);

setTimeout(function () {
  setInterval(function () {
    getThing(RonaldGlover, 1);
    setTimeout(function () {
      console.log("Starting next get");
      getThing(Chris, 2);
      setTimeout(function () {
        console.log("Starting next get");
        getThing(Max, 3);
        // do stuff
      }, 35000);
      // do stuff
    }, 30000);
  }, 120000);
}, 120000);
async function getRGMatches() {
  async function processLineByLine() {
    let fileStream = fs.createReadStream(`./RGMatchList.txt`);
    let matches1 = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      matches1.push(line);
    }
    return matches1;
  }

  return processLineByLine();
}

async function getRGData() {
  async function processLineByLine() {
    let pdataa = [];
    const fileStream = fs.createReadStream(`./RGData.txt`);
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      pdataa.push(line);
    }
    return pdataa;
  }

  return processLineByLine();
}
async function getRGWins() {
  async function processLineByLine() {
    const fileStream = fs.createReadStream(`./RGWins.txt`);
    let winHistory1 = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if (line === "true") {
        winHistory1.push("win");
      } else if (line === "false") {
        winHistory1.push("loss");
      }
    }
    return winHistory1;
  }

  return await processLineByLine();
}
//////////////////////////////////////////////////////////
async function getCRMatches() {
  async function processLineByLine() {
    const fileStream = fs.createReadStream(`./CRMatchList.txt`);
    let matches1 = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      matches1.push(line);
    }
    return matches1;
  }
  return await processLineByLine();
}

async function getCRData() {
  async function processLineByLine() {
    let pdataa = [];
    const fileStream = fs.createReadStream(`./CRData.txt`);
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      pdataa.push(line);
    }
    return pdataa;
  }

  return processLineByLine();
}
async function getCRWins() {
  async function processLineByLine() {
    const fileStream = fs.createReadStream(`./CRWins.txt`);
    let winHistory = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if (line === "true") {
        winHistory.push("win");
      } else if (line === "false") {
        winHistory.push("loss");
      }
    }
    return winHistory;
  }

  return await processLineByLine();
}
/////////////////////////////////////////////////////////////
async function getMXMatches() {
  async function processLineByLine() {
    let fileStream = fs.createReadStream(`./MXMatchList.txt`);
    let matches2 = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      matches2.push(line);
    }
    return matches2;
  }

  return processLineByLine();
}

async function getMXData() {
  async function processLineByLine() {
    let pdataa1 = [];
    const fileStream = fs.createReadStream(`./MXData.txt`);
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      pdataa1.push(line);
    }
    return pdataa1;
  }

  return processLineByLine();
}
async function getMXWins() {
  async function processLineByLine() {
    const fileStream = fs.createReadStream(`./MXWins.txt`);
    let winHistory12 = [];
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if (line === "true") {
        winHistory12.push("win");
      } else if (line === "false") {
        winHistory12.push("loss");
      }
    }
    return winHistory12;
  }

  return await processLineByLine();
}
/////////////////////////////////////////////////////////
app.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error);
    return;
  }
  console.log("Server is listening on port " + port);
});

app.get("/api", async (req, res) => {
  res.json({
    RGWins: await getRGWins(),
    RGMatches: await getRGMatches(),
    RGData: await getRGData(),
    CrWins: await getCRWins(),
    CrMatches: await getCRMatches(),
    CrData: await getCRData(),
    MxWins: await getMXWins(),
    MxMatches: await getMXMatches(),
    MxData: await getMXData(),
  });
});
