import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RunningBids from './RunningBids'
import {socket } from './socket'


const Auction = (props) => {
  const [bid, setBid] = useState(0);
  const [bidamount, setBidAmount] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(10);
  const [startTimer, setStartTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(true);
  const [bidHistory, setBidHistory] = useState([]);
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000));  // Generate a random username

  useEffect(() => {
    socket.emit('user',{username}); 
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
      setBid(data.newBid)
      const updatedHistory = [data,...bidHistory];
        setBidHistory([data,...bidHistory]);
        console.log('Updated History:', updatedHistory);
      }); 
      
      socket.on('start', (data) => {
        console.log('Start Auction:', data);
        setStartTime(data.time)
        setStartTimer(data.start)
        setStopTimer(data.stop)
        });
        socket.on('stop', (data) => {
          console.log('Start Auction:', data);
          setStartTimer(data.start)
          setStopTimer(data.stop)
          });
  }, [bidHistory,bid]);

  const sendBid = () => {
    let newBid=bid+bidamount
    socket.emit('bid', { username, newBid }); 
    setBid(newBid) // Use the random username
  };
  

  return (
    <div>
      {stopTimer ? <> <h3>Auction not Start yet</h3></> : 
      startTimer ? <h3>Auction Start in {timer} sec</h3>
      :<>
      <h3>{bid}</h3>
      <button onClick={sendBid}>Bid {`+${bidamount}`}</button>
      <div>
      <h2>Recent Bids</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Bid Amount</th>
            <th>time stemp</th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((data, index) => (
            <tr key={index}>
              <td><strong>{data.username}</strong></td>
              <td>{data.newBid}</td>
              <td>{data.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </>}
    </div>
  
)};

export default Auction;