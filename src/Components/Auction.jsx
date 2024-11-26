import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RunningBids from './RunningBids'
import { socket } from './socket'
var C = console.log

const Auction = (props) => {
  const [bid, setBid] = useState(0);
  const [lastbidData, setlastbidData] = useState({ newBid: 0, time: 'NOT START' });
  const [bidamount, setBidAmount] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(3);
  const [startTimer, setStartTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(true);
  const [bidHistory, setBidHistory] = useState([]);
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000));  // Generate a random username

  useEffect(() => {
    socket.emit('user', { username },'con63
    ');
  }, []);

  useEffect(() => {
    let intervalId;
    if (startTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTimer]);

  useEffect(() => {
    if (timer === 0) {
      setStartTimer(false);
      setTimer(10); // Reset timer to 10 seconds after it reaches 0
    }
  }, [timer]);

  useEffect(() => {
    socket.on('bid', (data) => {
      setBid(data.newBid);
      setlastbidData(data); // Update lastbidData with the latest bid
      setBidHistory([data, ...bidHistory]);
    });

    socket.on('start', (data) => {
      setStartTime(data.time);
      setStartTimer(data.start);
      setStopTimer(data.stop);
    });

    socket.on('stop', (data) => {
      setStartTimer(data.start);
      setStopTimer(data.stop);
    });
  }, []);

  const sendBid = () => {
    let newBid = bid + bidamount;
    socket.emit('bid', { username, newBid });
    setBid(newBid);
  };

  return (
    <div>
      {stopTimer ?
        <><h3>Auction not started yet</h3></> :
        startTimer ?
          <h3>Auction starts in {timer} sec</h3> :
          <>
            <h3>{bid}</h3>
            <button onClick={sendBid}>Bid +{bidamount}</button>
            <div>
              <h2>Recent Bids:</h2>
              {bidHistory.map((bidItem, index) => (
                <div key={index}>
                  <p>{`U${bidItem.username}----${bidItem.newBid}-----${bidItem.time}`}</p>
                </div>
              ))}
            </div>
          </>
      }
    </div>
  );
};

export default Auction;
