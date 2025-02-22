import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { getConversations } from "../services/chatService"
import { timeAgo } from './../utils/dateUtils';

const MesagesLayout = () => {

    const userId = useSelector(state => state.user.user._id)

    const [conversations, setConversations] = useState([])

    const fetchConversations = async () => {
        const { conversations, type } = await getConversations(userId);
        console.log(conversations);
        type === "success" && (setConversations(conversations))

    }

    useEffect(() => {
        fetchConversations();
    }, [])

    return (
        <div className="w-full h-screen">
            <div className="flex h-screen">
                {/* Sol taraf: Chat geçmişi */}
                <div className="border-r-[1px] border-light-border dark:border-dark-border 
                    w-1/5 min-w-[250px] max-w-[300px]">
                    {conversations.length > 0 && conversations.map(conversation => {
                        const otherParticipant = conversation.participants.find(participant => participant._id !== userId);

                        return (
                            conversation.lastMessage !== null && otherParticipant && (
                                <div key={conversation._id} className="hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer">
                                    <Link to={`t/${conversation._id}`}>
                                        <div className="flex items-center gap-x-2 p-3">
                                            <div>
                                                <img src={otherParticipant.profilePicture} alt="Avatar"
                                                    className="w-12 h-12 min-h-12 min-w-12 rounded-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-sm">{otherParticipant.username}</div>
                                                <div className="text-xs truncate max-w-[180px]" title={conversation.lastMessage.message}>
                                                    <span>Sen: </span> <span>{conversation.lastMessage.message}</span> · <span>{timeAgo(conversation.lastMessage.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        );
                    })}
                </div>

                {/* Main chat kısmı */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default MesagesLayout