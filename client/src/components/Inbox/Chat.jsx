import { Link, useParams } from "react-router-dom"
import { getOneConversationData, getOneConversationMessages } from "../../services/chatService";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const Chat = () => {
    const { conversationId } = useParams();

    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState();
    const [otherParticipant, setOtherParticipant] = useState({}); // Chat sistemi şuan 2 kişilik ileride grup chat için yapıyı değiştirmek gerekir.
    const userId = useSelector(state => state.user.user._id);

    const getConversationMessages = async () => {
        const { messages, type } = await getOneConversationMessages(conversationId);
        type === "success" && setMessages(messages);
    }

    const getConversationData = async () => {
        const { conversation, type } = await getOneConversationData(conversationId);
        type === "success" && setConversation(conversation);
        console.log(conversation);

        const otherUser = conversation.participants.filter(p => p._id !== userId);
        setOtherParticipant(otherUser[0]);

    }

    useEffect(() => { getConversationData(); getConversationMessages(); }, [conversationId])

    return (

        <div className="flex flex-col w-full">
            {/* Chat Header */}
            <div className="p-4 py-5 flex justify-between border-b-[1px] border-light-border dark:border-dark-border">
                {/* Sol taraf */}
                <div className="flex gap-x-3 items-center">
                    <div><Link to={`/${otherParticipant.username}`}><img src={otherParticipant.profilePicture} alt="Avatar" className="w-11 h-11 rounded-full object-cover" /></Link></div>
                    <div><Link to={`/${otherParticipant.username}`}>{otherParticipant.username}</Link></div>
                </div>
                {/* Sağ taraf ikonlar*/}
                <div className="flex gap-x-4 items-center">
                    <div className="cursor-pointer">
                        <svg aria-label="Sesli Arama" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Sesli Arama</title><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
                    </div>
                    <div className="cursor-pointer">
                        <svg aria-label="Görüntülü arama" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Görüntülü arama</title><rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </div>
                    <div className="cursor-pointer">
                        <svg aria-label="Konuşma Bilgileri" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Konuşma Bilgileri</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                    </div>
                </div>
            </div>

            {/* Chat kısmı */}
            <div className="overflow-y-scroll h-screen">

                <div className="h-[80vh] break-all p-4">


                    {
                        messages && messages.map(message => {
                            //Mevcut kullanıcının mesajları (sağda)
                            return message.sender._id === userId ? (
                                <>
                                    <div className="flex justify-end my-2">
                                        <div className="max-w-[65%] bg-[#3797F0] text-white p-3 rounded-l-2xl rounded-r-sm shadow-sm">
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs block mt-1 text-right">
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                    </span>
                                </>
                            ) : (
                                //Diğer katılımcının mesajları (solda)
                                <>
                                    <div className="flex justify-start my-2">
                                        <div className="max-w-[65%] bg-light-border dark:bg-dark-border p-3 rounded-r-2xl rounded-l-sm shadow-sm">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non et earum laboriosam nemo, ipsam tempora omnis dolorem accusamus quisquam porro.</p>

                                        </div>
                                    </div>
                                    <span className="text-xs flex justify-normal mt-1 text-right">
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                    </span>
                                </>
                            )

                        })
                    }

                </div>

                <div className="flex items-center mx-5 relative">
                    <input placeholder="Mesaj..." type="text" className="!text-sm !rounded-full flex-1 !pl-5 !pr-20 border-[1px] !py-3 border-light-border dark:border-dark-border" />
                    <span className="absolute right-3 bottom-[1.2rem] text-sm">Gönder</span>
                </div>
            </div>
        </div>
    )
}

export default Chat