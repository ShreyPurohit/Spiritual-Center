'use client'

import ChatAreaComponent from "@/components/chat/ChatAreaComponent";
import ChatSideBarComponent from "@/components/chat/ChatSideBarComponent";
import { IUserChat } from "@/lib/helpers/interfaces";
import { addMessageToDB, fetchCurrentRoomMessages, getChatUsersList, makeGroupInDB } from "@/lib/store/features/Chats/fetchChatsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {

    const { loggedInUser } = useAppSelector((state) => state.user);
    const { userlist, currentRoom, messages } = useAppSelector((state) => state.chat)
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState("")
    const [messagesFromUI, setMessages] = useState<IUserChat[]>([])
    const [headerData, setHeaderData] = useState({
        profilePic: '',
        fullName: 'Select A Contact To Chat'
    })
    const [showChatArea, setShowChatArea] = useState<boolean>(false)

    useEffect(() => {
        setMessages(messages)
    }, [messages])

    useEffect(() => {
        dispatch(getChatUsersList())
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message])
        })
        return () => {
            socket.off('message')
        }
    }, [socket]);

    const generateRoom = (senderID: string, recieverID: string) => {
        return senderID.concat(recieverID).split('').sort().join('')
    }

    const joinRoomHandler = (name: string, username: string, photo: string) => {
        console.log('joined room with ' + name);
        const decodedUsername = loggedInUser?.split("-").slice(2).join("-") as string
        const room = generateRoom(decodedUsername, username)

        socket.emit('join', { username: decodedUsername, room }, (error: any) => {
            if (error) {
                console.error(error)
                return
            }
        })
        dispatch(makeGroupInDB({ roomID: room }))
        dispatch(fetchCurrentRoomMessages({ currentRoom: room }))
        setHeaderData({ profilePic: photo, fullName: name })
        setMessages([])
        setShowChatArea(true)
    }

    const handleBroadcast = () => {
        socket.emit('join', { username: loggedInUser?.split("-").slice(2).join("-"), room: "broadcastroom" }, (error: any) => {
            if (error) {
                console.error(error)
                return
            }
        })
        setHeaderData({ profilePic: "", fullName: "Broadcast Group" })
        dispatch(makeGroupInDB({ roomID: 'broadcastroom' }))
        dispatch(fetchCurrentRoomMessages({ currentRoom: 'broadcastroom' }))
        setMessages([])
        setShowChatArea(true)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const decodedUsername = loggedInUser?.split("-").slice(2).join("-") as string
        const messageData = { roomID: currentRoom!, text: inputValue, username: decodedUsername, createdAt: new Date().getTime() }
        dispatch(addMessageToDB(messageData))
        socket.emit('sendMessage', inputValue, (error: any) => {
            if (error) {
                console.error(error)
            }
            console.log("Message Delivered");
        })
        setInputValue('')
    }

    return (
        <main className="w-full m-auto flex flex-row h-screen overflow-hidden">
            <section id="side-bar" className={`sm:basis-1/4 ${showChatArea ? 'hidden sm:block' : 'block w-full'}`}>
                <ChatSideBarComponent chatList={userlist} handleBroadcast={handleBroadcast} joinRoomHandler={joinRoomHandler} />
            </section>
            <section id="chat" className={`sm:basis-3/4 ${showChatArea ? 'block w-full' : 'hidden sm:block'}`}>
                <ChatAreaComponent handleSubmit={handleSubmit} headerData={headerData} inputValue={inputValue} messages={messagesFromUI} setInputValue={setInputValue} setShowChatArea={setShowChatArea} />
            </section>
        </main>
    );
}