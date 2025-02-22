import { useEffect, useState } from "react";
import useToast from "../hooks/useToast";
import { followAndUnfollowUser, getFollowStatus, getUserProfile } from "../services/userService";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import Loading from "../components/Loading";
import { startConversation } from "../services/chatService";
import { useSelector } from "react-redux";

const ProfileLayout = () => {

    const { username } = useParams();
    const [user, setUser] = useState();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const userId = useSelector(state => state.user.user._id);

    const [followStatus, setFollowStatus] = useState(null);
    const [followButtonLoading, setFollowButtonLoading] = useState(false)
    const [mediaLoading, setMediaLoading] = useState(true);

    const fetchUser = async () => {
        setMediaLoading(true)
        const { message, type, user } = await getUserProfile(username);
        if (type === "error") {
            showToast(message, type);
            navigate("/");
        }
        setUser(user);
        setMediaLoading(false)
        console.log(user);
    }

    const fetchFollowStatus = async () => {
        if (!user?._id || !currentUser?._id) return;
        const { status } = await getFollowStatus(user._id, currentUser._id);
        setFollowStatus(status);
    };


    const toggleFollow = async () => {
        // takip et takipten çık.
        setFollowButtonLoading(true)
        const data = await followAndUnfollowUser(user._id, currentUser._id);
        console.log(data);
        fetchFollowStatus()
        setFollowButtonLoading(false)
    }

    useEffect(() => { fetchUser(); fetchFollowStatus(); }, [username]);
    useEffect(() => {
        if (user?._id) {
            fetchFollowStatus();
        }
    }, [user]);

    const sendMessage = async () => { // Önce bir conversation oluşturulmalı
        if (!user?._id || !userId) return;
        const { conversation } = await startConversation(userId, user._id);
        if (!conversation) { return; }
        navigate(`/direct/t/${conversation._id}`);
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 h-screen">
            <div className="mt-3 flex flex-col sm:flex-row gap-x-6 items-center border-b-[1px] border-light-border dark:border-dark-border p-10 pb-12 w-full">
                <div className="flex-shrink-0">
                    <img src={user && user.profilePicture} alt="" className="w-36 h-36 object-cover rounded-full" />
                </div>
                <div className="flex flex-col gap-y-5 sm:ml-20 sm:-mt-14 mt-6">
                    <div className="flex flex-col sm:flex-row gap-x-6 justify-evenly items-center">
                        <div>{user && user.username}</div>
                        <div className="flex gap-x-2 items-center mt-4 sm:mt-0">
                            {
                                currentUser && currentUser.username === username ? (
                                    <>
                                        <div><Link to="/accounts/edit" className="dark:bg-dark-button-bg dark:hover:bg-dark-button-hover rounded-lg bg-light-button-bg hover:bg-light-button-bg-hover px-4 py-1 text-sm font-semibold cursor-pointer">Profili düzenle</Link></div>
                                        <div><button className="dark:bg-dark-button-bg dark:hover:bg-dark-button-hover rounded-lg bg-light-button-bg hover:bg-light-button-bg-hover px-4 py-1 text-sm font-semibold cursor-pointer">Arşivi gör</button></div>
                                    </>
                                ) : (
                                    <>
                                        <div><button onClick={toggleFollow} className="dark:bg-dark-button-bg dark:hover:bg-dark-button-hover rounded-lg bg-light-button-bg hover:bg-light-button-bg-hover px-4 py-1 text-sm font-semibold cursor-pointer">
                                            {
                                                followButtonLoading ? (<Loading />) : (
                                                    followStatus && followStatus === "pending" ? (<>İstek gönderildi</>) : followStatus === "accepted" ? (<>Takipten çık</>) : (<>Takip et</>)
                                                )
                                            }
                                        </button></div>
                                        <div><button onClick={sendMessage} className="dark:bg-dark-button-bg dark:hover:bg-dark-button-hover rounded-lg bg-light-button-bg hover:bg-light-button-bg-hover px-4 py-1 text-sm font-semibold cursor-pointer">Mesaj gönder</button></div>
                                    </>
                                )
                            }


                            <div>
                                <svg aria-label="Seçenekler" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Seçenekler</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-10 items-center">
                        <div className="flex gap-x-1"><span className="font-semibold">{user && user.posts.length}</span><span>gönderi</span></div>
                        <div className="flex gap-x-1"><span className="font-semibold">{user && user.followers.length}</span><span>takipçi</span></div>
                        <div className="flex gap-x-1"><span className="font-semibold">{user && user.followings.length}</span><span>takip</span></div>
                    </div>
                    <div>
                        {user?.bio && <span>{user.bio}</span>}
                    </div>
                </div>
            </div>



            {
                currentUser && currentUser.username !== username && user?.privacy === "private" && !user?.followers?.includes(currentUser?._id) ? (
                    <p className="mt-2">Bu hesap gizli. Gönderileri görmek için takip et.</p>
                ) : mediaLoading ? (<div className="flex justify-center items-center mt-10" ><Loading /></div>) : (
                    (
                        <>
                            <div className="flex gap-x-14 max-md:gap-x-2 justify-center items-center text-sm  sm:mt-0">
                                <NavLink end to="" className={({ isActive }) => isActive ? "border-t-2 pt-4 font-semibold" : "pt-4"}>GÖNDERİLER</NavLink>
                                {
                                    currentUser && currentUser.username === username ? (
                                        <NavLink to="saved" className={({ isActive }) => isActive ? "border-t-2 pt-4 font-semibold" : "pt-4"}>KAYDEDİLENLER</NavLink>
                                    ) : (<></>)
                                }
                                <NavLink to="tagged" className={({ isActive }) => isActive ? "border-t-2 pt-4 font-semibold" : "pt-4"}>ETİKETLENENLER</NavLink>
                            </div>
                            <div className="mt-4">
                                <Outlet />
                            </div>
                        </>
                    )
                )
            }

            {currentUser && currentUser.username === username ? (<div>KULLANICININ KENDİ PROFİLİ</div>) : (<div>BAŞKA PROFİL</div>)}
        </div>
    )
}

export default ProfileLayout;