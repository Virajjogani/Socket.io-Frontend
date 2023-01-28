import React, { useEffect, useState } from 'react'

function Chat({ socket, username, room }) {

    const [currentmessage, setCurrentmessage] = useState("")
    const [messageList, setmessageList] = useState([])

    const sendMessage = async () => {
        if (currentmessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

            }
            await socket.emit('send_message', messageData)
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setmessageList((list) => [...list, data])
        })
    }, [])


    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                {messageList?.map((message) => (
                    <div className='message' id={username === message.author ? "you" : "other"}>
                        <div>
                            <div className="message-content">
                                <p>{message.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{message.time}</p>
                                <p>{message.author}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder='Type something...' onChange={(e) => { setCurrentmessage(e.target.value) }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>

    )
}

export default Chat
