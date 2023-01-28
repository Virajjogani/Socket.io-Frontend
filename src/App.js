import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Chat from './component/Chat';


const socket = io.connect('http://localhost:3001')

function App() {

  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showchat, setShowchat] = useState(false)


  const joinroom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      alert("Join room sucessfully")
      setShowchat(true)
    }
  }


  return (
    <div className="App">
      {!showchat ?
        (<div className='joinChatContainer'>
          <h3>Join chat</h3>
          <input type="text" placeholder='John Doe...' onChange={(e) => { setUserName(e.target.value) }} />
          <input type="text" placeholder='Room ID...' onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinroom}>Join A Room</button>
        </div>) : (<Chat socket={socket} username={userName} room={room} />)}


    </div>
  );
}

export default App;
