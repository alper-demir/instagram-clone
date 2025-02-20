import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../../services/userService";
import { FaPlay } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { current } from "@reduxjs/toolkit";

const Posts = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const [postList, setPostList] = useState([]);

  const fetch = async () => {
    const response = await getUserProfile(username);
    setPostList(response.user.posts);
  };

  useEffect(() => {
    fetch();
  }, [username]);

  return (
    <div className="flex flex-wrap gap-0.5">
      {postList.length > 0 ? (
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
              <img src={post.media[0]} alt="Post" className="w-full object-cover min-h-[274.55px]" />
            )}
          </Link>
        ))
      ) : (
        currentUser && currentUser.username !== username ? (
          <p className="mb-4">Bu kullanıcının henüz bir gönderisi yok.</p>
        ) : (
          <Link to="/post/create" className="mx-auto mt-5 text-center">
            <p className="mb-4">Henüz bir gönderin yok.</p>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 text-white font-semibold transition-colors cursor-pointer"
            >
              Oluştur
            </button>
          </Link >
        )
      )
      }
    </div >
  );
};

export default Posts;