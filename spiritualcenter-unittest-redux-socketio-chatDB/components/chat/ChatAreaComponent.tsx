'use client'

import { socket } from '@/app/socket'
import { IChatAreaProps } from "@/lib/helpers/interfaces"
import { useAppSelector } from "@/lib/store/hooks"
import { ArrowLeftCircle, SendHorizontalIcon } from "lucide-react"
import moment from "moment"
import RenderImage from "../common/RenderImage"
import Loader from '../common/Loader'

const ChatAreaComponent: React.FC<IChatAreaProps> = ({ headerData, messages, handleSubmit, inputValue, setInputValue, setShowChatArea }) => {

    const { loggedInUser } = useAppSelector((state) => state.user);
    const { loading, error } = useAppSelector((state) => state.chat)

    const generateMessageCSS = (username: string) => {
        if (username === 'ADMIN') { return 'self-center px-6 py-3 rounded border border-black text-gray-200 gap-3 m-1' }
        if (username === loggedInUser?.split("-").slice(2).join("-")) {
            return 'self-end px-6 py-3 rounded-md bg-blue-300 max-w-xs lg:max-w-md text-gray-200 gap-3 m-1'
        }
        else if (username !== loggedInUser?.split("-").slice(2).join("-")) {
            return 'self-start px-6 py-3 rounded-md bg-gray-300 max-w-xs lg:max-w-md text-gray-200 gap-3 m-1'
        }
    }

    const handleBackButton = () => {
        socket.emit('leaveChat', (error: any) => {
            if (error) {
                console.error(error)
            }
        })
        return setShowChatArea(false)
    }

    return (
        <div className="flex flex-col h-full">
            <article id="chat-header" className="h-20 border">
                <section className="flex bg-slate-200 h-full items-center justify-evenly pl-1 gap-3">
                    <div onClick={handleBackButton}
                        className="sm:hidden bg-slate-300 px-3 py-2 rounded-xl hover:bg-slate-400 hover:transition">
                        <ArrowLeftCircle size={35} />
                    </div>
                    <div className="flex items-center gap-3">
                        <div id="user-image">
                            <RenderImage users={headerData.profilePic} css="h-14 w-14 rounded-full" />
                        </div>
                        <div id="user-name">
                            <h2 className="lg:text-2xl text-lg uppercase text-stone-700">{headerData.fullName}</h2>
                        </div>
                    </div>
                </section>
            </article>
            <article id="chat-area" className="flex flex-col flex-1 border overflow-scroll scrollers">
                {error && (<h2 id="error" className="text-center text-2xl text-amber-700 tracking-wide uppercase"> {error} </h2>)}
                {loading ? <Loader text="Fetching Messages" /> :
                    <>
                        {messages && messages.length > 0 ? messages.map((message) => (
                            < div key={message.createdAt} id='message-box' className={generateMessageCSS(message.username)}>
                                <div className="flex gap-3">
                                    <p className="text-stone-800 text-sm md:text-base" style={{ overflowWrap: 'anywhere' }}>{message.text}</p>
                                    <p className="text-sm text-stone-600 text-end place-self-end ">{moment(+(message.createdAt)).format('h:mm a')}</p>
                                </div>
                            </div>
                        )) : <p>Message To Start Conversation</p>
                        }
                    </>
                }
            </article >
            <article id="chat-input" >
                <form onSubmit={handleSubmit} className="h-20 flex items-center gap-2 m-1">
                    <input className="ml-2 flex-1" autoComplete="off" placeholder="Message.." required value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button className="px-4 py-1 disabled:cursor-not-allowed" disabled={loading}><SendHorizontalIcon /></button>
                </form>
            </article>
        </div >
    )
}

export default ChatAreaComponent