import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackEndData] = useState([{}]);
  const [rWins, setRWins] = useState([]);
  const [rData, setRData] = useState([]);
  const [crWins, setCrWins] = useState([]);
  const [crData, setCrData] = useState([]);
  const [mxWins, setMxWins] = useState([]);
  const [mxData, setMxData] = useState([]);
  const MINUTE_MS = 60000;
  function fetchEverything() {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackEndData(data);
        setRWins(data.RGWins);
        setRData(data.RGData);
        setCrWins(data.CrWins);
        setCrData(data.CrData);
        setMxWins(data.MxWins);
        setMxData(data.MxData);
      });
  }
  useEffect(() => {
    document.querySelector(".matchHistory1").style.visibility = "hidden";
    document.querySelector(".matchHistory2").style.visibility = "hidden";
    document.querySelector(".matchHistory3").style.visibility = "hidden";
  }, []);
  useEffect(() => {
    fetchEverything();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEverything();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  function testThing() {
    var newArray = [];
    for (let i = 0; i < rWins.length; i++) {
      if (rWins[i] === "win") {
        newArray.push("win ");
      } else {
        newArray.push("loss ");
      }
    }
    return newArray.map((victory) => <li>{victory}</li>);
  }
  function testThing2() {
    var newArray2 = [];
    for (let i = 0; i < crWins.length; i++) {
      if (crWins[i] === "win") {
        newArray2.push("win ");
      } else {
        newArray2.push("loss ");
      }
    }
    return newArray2.map((victory) => <li>{victory}</li>);
  }
  function testThing3() {
    var newArray3 = [];
    for (let i = 0; i < mxWins.length; i++) {
      if (crWins[i] === "win") {
        newArray3.push("win ");
      } else {
        newArray3.push("loss ");
      }
    }
    return newArray3.map((victory) => <li>{victory}</li>);
  }
  var RiconURL =
    "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" +
    rData[1] +
    ".png";

  var RiconURL2 =
    "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" +
    crData[1] +
    ".png";
  var RiconURL3 =
    "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" +
    mxData[1] +
    ".png";
  window.addEventListener("click", (event) => {
    function displayMatchhistory(x) {
      if (event.target === document.querySelector(`.matchHistoryButton${x}`)) {
        if (
          document.querySelector(`.matchHistory${x}`).style.visibility ===
          "hidden"
        ) {
          setTimeout(() => {
            document.querySelector(`.matchHistory${x}`).style.visibility =
              "visible";
            for (let i = 0; i < document.querySelectorAll("li").length; i++) {
              if (document.querySelectorAll("li")[i].innerText === "loss") {
                document.querySelectorAll("li")[i].style.backgroundColor =
                  "blue";
              } else if (
                document.querySelectorAll("li")[i].innerText === "win"
              ) {
                document.querySelectorAll("li")[i].style.backgroundColor =
                  "red";
              }
            }
            return;
          }, 200);
        } else if (
          document.querySelector(`.matchHistory${x}`).style.visibility ===
          "visible"
        ) {
          setTimeout(() => {
            document.querySelector(`.matchHistory${x}`).style.visibility =
              "hidden";
            return;
          }, 200);
        }
      }
    }
    displayMatchhistory(1);
    displayMatchhistory(2);
    displayMatchhistory(3);
  });
  return (
    <>
      <div className="profile">
        <>
          {rData.length < 1 ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="profilePic">
                <img src={RiconURL}></img>
              </div>
              <div className="notThePicture">
                <h2>
                  SummonerName:{rData[0]} | Level:{rData[2]}
                </h2>
                <p>
                  Wielding an understanding of a deep champion pool fit for one,{" "}
                  {rData[0]} is one of the most fundamentally skilled players on
                  the Rift.
                </p>
                <button className="matchHistoryButton1">
                  Show/Hide Match History
                </button>
              </div>
            </>
          )}
        </>

        <div className="matchHistory1">
          <>{rWins.length < 1 ? <p>Loading...</p> : <ol>{testThing()}</ol>}</>
        </div>
      </div>
      <div className="profile">
        <div className="matchHistory2">
          {crWins.length < 1 ? <p>Loading...</p> : <ol>{testThing2()}</ol>}
        </div>
        <>
          {crData.length < 1 ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="notThePicture">
                <h2>
                  Summoner Name:{crData[0]} | Level:{crData[2]}
                </h2>
                <p>
                  Master of anything with paws and a tail, {crData[0]} is brings
                  his knowledge of all things of the jungle and stuff of that
                  nature to do jungling and things of that nature.
                </p>
                <button className="matchHistoryButton2">
                  Show/Hide Match History
                </button>
              </div>
              <div className="profilePic">
                <img src={RiconURL2}></img>
              </div>
            </>
          )}
        </>
      </div>
      <div className="profile">
        <>
          {mxData.length < 1 ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="profilePic">
                <img src={RiconURL3}></img>
              </div>
              <div className="notThePicture">
                <h2>
                  SummonerName:{mxData[0]} | Level:{mxData[2]}
                </h2>
                <p>
                  Great minds reproduced over and over and over again over
                  centuries to birth the one and only, {mxData[0]}. This is his
                  world, and we are simply living in it.
                </p>
                <button className="matchHistoryButton3">
                  Show/Hide Match History
                </button>
              </div>
            </>
          )}
        </>

        <div className="matchHistory3">
          <>{mxWins.length < 1 ? <p>Loading...</p> : <ol>{testThing3()}</ol>}</>
        </div>
      </div>
    </>
  );
}

export default App;
