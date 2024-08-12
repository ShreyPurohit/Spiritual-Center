'use client'

import { IChatSideBarProps } from '@/lib/helpers/interfaces'
import { useAppSelector } from '@/lib/store/hooks'
import { ArrowLeftSquareIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const RenderImage = dynamic(() => import('../common/RenderImage'))

const ChatSideBarComponent: React.FC<IChatSideBarProps> = ({ handleBroadcast, joinRoomHandler, chatList }) => {
    const { loggedInUser } = useAppSelector((state) => state.user);
    const { error } = useAppSelector((state) => state.chat)

    const navigate = useRouter()
    const [sideSearch, setSideSearch] = useState<string>('')
    const handleBackToHome = () => {
        return navigate.push(`/${loggedInUser?.split('-')[1]}`)
    }

    const filterChatList = chatList.filter((user) => {
        return user.fullName
            ?
            user.fullName.firstName.toLowerCase().includes(sideSearch.toLowerCase())
            :
            user.username.toLowerCase().includes(sideSearch.toLowerCase())
    })

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center text-xl m-3 border justify-center p-3 gap-2 hover:bg-slate-200 hover:transition hover:cursor-pointer"
                onClick={handleBackToHome}>
                <ArrowLeftSquareIcon size={30} /> Back To Home
            </div>
            <h1 className="uppercase">All Contacts</h1>
            <div className="overflow-scroll scrollers">
                <article id="user-list" className="flex flex-1 flex-col">
                    <input type="text" id="search-user" placeholder="Search Users" value={sideSearch}
                        onChange={(e) => setSideSearch(e.target.value)}
                        className="w-3/4 self-center py-3 mb-3"
                    />
                    <div id="brodcastgroup" className="flex h-16 gap-3 border border-slate-400 items-center m-1 p-1 rounded bg-slate-100 hover:bg-slate-200 hover:transition hover:cursor-pointer" onClick={handleBroadcast}>
                        <div id="user-pic" >
                            <RenderImage users='' css='h-10 w-10 rounded-full' />
                        </div>
                        <div id="broadcast-name">
                            <p className="text-xs md:text-lg text-slate-600">Broadcast Group</p>
                        </div>
                    </div>
                    {chatList && filterChatList.filter((user) => user.username !== loggedInUser?.split("-").slice(2).join("-")).map((usercard) => (
                        <div className="flex h-16 gap-3 border border-slate-400 items-center m-1 p-1 rounded bg-slate-100 hover:bg-slate-200 hover:transition hover:cursor-pointer" key={usercard._id} onClick={() => joinRoomHandler(usercard.fullName ? usercard.fullName.firstName : usercard.username, usercard.username, usercard.photo)}>
                            <div id="user-pic" className='relative w-10 h-10 rounded-full'>
                                <RenderImage users={usercard.photo} css='rounded-full' />
                            </div>
                            <div id="user" className='flex items-center gap-4'>
                                <p className="text-sm md:text-lg text-slate-600">{usercard.fullName ? usercard.fullName.firstName : usercard.username}</p>
                                <span className="text-xs text-slate-400">({usercard.username})</span>
                            </div>
                        </div>
                    ))}
                </article>
            </div>
            {error && (<h2 id="error" className="text-center text-2xl text-amber-700 tracking-wide uppercase"> {error} </h2>)}
        </div>
    )
}
export default ChatSideBarComponent