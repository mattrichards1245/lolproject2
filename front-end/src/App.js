import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackEndData] = useState([{}]);
  const [rWins, setRWins] = useState([]);
  const [rData, setRData] = useState([]);
  const [crWins, setCrWins] = useState([]);
  const [crData, setCrData] = useState([]);
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
      });
  }
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
    return newArray.map((victory) => <p>{victory}</p>);
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
    return newArray2.map((victory) => <p>{victory}</p>);
  }
  var RiconURL =
    "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" +
    rData[1] +
    ".png";

  var RiconURL2 =
    "http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/" +
    crData[1] +
    ".png";
  return (
    <>
      <div className="profile">
        <div>
          <>
            {rData.length < 1 ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2>Summoner Name:{rData[0]}</h2>
                <h2>Level:{rData[2]}</h2>
                <img src={RiconURL}></img>
              </>
            )}
          </>
        </div>
        <div>
          <h1>Match History</h1>
          <>{rWins.length < 1 ? <p>Loading...</p> : <p>{testThing()}</p>}</>
        </div>
      </div>
      <div className="profile">
        <div>
          <>
            {crData.length < 1 ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2>Summoner Name:{crData[0]}</h2>
                <h2>Level:{crData[2]}</h2>
                <img src={RiconURL2}></img>
              </>
            )}
          </>
        </div>
        <div>
          <h1>Match History</h1>
          <>{crWins.length < 1 ? <p>Loading...</p> : <p>{testThing2()}</p>}</>
        </div>
      </div>
    </>
  );
}

export default App;
