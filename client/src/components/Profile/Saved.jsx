import { Link, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { getSavedPosts } from "../../services/userService";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

const Saved = () => {

    const { username } = useParams();
    const { currentUser } = useAuth();
    const [postList, setPostList] = useState([]);

    const fetch = async () => {
        const { savedPosts } = await getSavedPosts(username);
        setPostList(savedPosts);
    };

    useEffect(() => {
        fetch();
    }, [username]);

    return (
        <div>
            Kendi profili değilse gösterme, kontorlünü yap.
            {currentUser && currentUser.username === username ? (
                <div className="flex flex-wrap gap-0.5">
                    {postList &&
                        postList.map((post) => (
                            <Link to={`/post/${post._id}`} key={post._id} className="w-[33%] max-md:w-full relative">
                                {post && (post.media[0].endsWith(".mp4") || post.media[0].endsWith(".webm") || post.media[0].endsWith(".ogg")) ? (
                                    <div className="relative h-full">
                                        <video src={post.media[0]} className="w-full h-full object-cover min-h-[274.55px]" muted />
                                        <div className="absolute top-2 left-2 p-1">
                                            <FaPlay className="text-white text-sm" />
                                        </div>
                                    </div>
                                ) : (
                                    <img src={post.media[0]} alt="Post" className="w-full h-full object-cover min-h-[274.55px]" />
                                )}
                            </Link>
                        ))}
                </div>
            ) : (
                <div>SAYFAYA ERİŞİMİ YOK</div>
            )}
        </div>
    )
}

export default Saved