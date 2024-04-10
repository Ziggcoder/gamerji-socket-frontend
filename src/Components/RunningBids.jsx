import React, { useState, useEffect } from 'react';
import {socket } from './socket'
 // Connect to your backend server

const RunningBids = (props) => {
  const [bid, setBid] = useState(0);
  const [player, setPlayer] = useState('');
  const [bidamount, setBidAmount] = useState(100);
  const [bidHistory, setBidHistory] = useState([]);
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000));  // Generate a random username


  return (
    <div>
      <h2>Recent Bids</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Bid Amount</th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.map((data, index) => (
            <tr key={index}>
              <td><strong>{data.username}</strong></td>
              <td>{data.newBid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RunningBids;