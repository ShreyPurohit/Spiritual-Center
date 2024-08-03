'use client'

import ChatAreaComponent from "@/components/chat/ChatAreaComponent";
import ChatSideBarComponent from "@/components/chat/ChatSideBarComponent";
import { IUserChat } from "@/lib/helpers/interfaces";
import { addMessageToDB, getChatUsersList, joinRoomHandlerThunk } from "@/lib/store/features/Chats/fetchChatsApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
        fetchChatUserList()
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message])
        })
        return () => {
            socket.off('message')
        }
    }, [socket]);

    const fetchChatUserList = async () => {
        const resultAction = await dispatch(getChatUsersList())
        if (getChatUsersList.fulfilled.match(resultAction)) {
            console.log("User List Fetched Successfully")
        } else {
            throw new Error("Failed Fetching Payments")
        }
    }

    const generateRoom = (senderID: string, recieverID: string) => {
        const compare = (a: string, b: string) => {
            return a < b ? -1 : 1
        }
        const sortedID = [senderID, recieverID].sort(compare)
        return sortedID.join('')
    }

    const joinRoomHandler = (name: string, username: string, photo: string) => {
        console.log('joined room with ' + name);
        const decodedUsername = loggedInUser?.split("-").slice(2).join("-") as string
        const room = generateRoom(decodedUsername, username)
        console.log(room);
        socket.emit('join', { username: decodedUsername, room }, (error: any) => {
            if (error) { return toast.error(error) }
        })
        dispatch(joinRoomHandlerThunk(room))
        setHeaderData({ profilePic: photo, fullName: name })
        setMessages([])
        setShowChatArea(true)
    }

    const handleBroadcast = () => {
        socket.emit('join', { username: loggedInUser?.split("-").slice(2).join("-"), room: "broadcastroom" }, (error: any) => {
            if (error) { return error }
        })
        setHeaderData({ profilePic: "", fullName: "Broadcast Group" })
        dispatch(joinRoomHandlerThunk('broadcast'))
        setMessages([])
        setShowChatArea(true)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const decodedUsername = loggedInUser?.split("-").slice(2).join("-") as string
        if (!currentRoom) { return }
        const messageData = { roomID: currentRoom, text: inputValue, username: decodedUsername, createdAt: new Date().getTime() }
        dispatch(addMessageToDB(messageData))
        socket.emit('sendMessage', inputValue, (error: any) => {
            if (error) { return toast.error(error) }
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