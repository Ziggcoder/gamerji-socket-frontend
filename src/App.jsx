import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auction from './Components/Auction'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
     <div style={{display:'flex',flexDirection:'column',height:'100vh',width:'100vw',
     padding:"10vh",backgroundColor:"AppWorkspace"}}>
     <Auction />

     </div>
     
    </>
  )
}

export default App
