import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auction from './Components/Auction'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Gamerji-Auction</h1>
     <div style={{display:'flex',flexDirection:'column',height:'80vh',width:'100vw'}}>
     <Auction />

     </div>
     
    </>
  )
}

export default App
