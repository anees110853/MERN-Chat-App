import {useState, useEffect, useMemo} from 'react'
import {io} from 'socket.io-client'

const App = () => {

  const [message, setMessage] = useState();
  const [room, setRoom] = useState();
  const [socketId, setSocketId] = useState();

  const socket = useMemo(()=>io('http://localhost:4000'),[])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', {room:room, message:message})
  }

  const handleMessage = (e) =>{
    e.preventDefault();
    socket.emit('send',({room:room, message:message}))

    setMessage(e.target.value)
  }

  const handleRoom = (e) =>{
    e.preventDefault();
    setRoom(e.target.value)
  }


  useEffect(()=>{

    socket.on('connect',(data)=>{
      setSocketId(socket.id)
    })

    socket.on('all-chat',(data)=>{
      console.log(data)
    })

  },[])


  return (
    <>
    <p>{socketId}</p>
    <input type='text' onChange={(e)=> handleMessage(e)}/>
    <input type='text' onChange={(e)=> handleRoom(e)}/>
    <button onClick={(e)=>handleSubmit(e)}>Submit</button>
    </>
  )
}

export default App