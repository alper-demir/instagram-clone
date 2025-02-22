import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTimelinePosts, likePost, savePost } from "../services/postService";
import InfiniteScroll from "react-infinite-scroll-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaComment, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/dateUtils";
import Loading from "../components/Loading";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const { response } = await getTimelinePosts(user._id, page);
      if (!response) return;

      if (response.data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching timeline posts:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { updatedPost } = await likePost(postId, user._id);
      setPosts((prevPosts) => prevPosts.map(post => post._id === postId ? updatedPost : post));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleSave = async (postId) => {
    try {
      const { updatedPost } = await savePost(postId, user._id);
      setPosts((prevPosts) => prevPosts.map(post => post._id === postId ? updatedPost : post));
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto overflow-x-hidden p-10 text-wrap break-all min-h-screen mt-10">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<p style={{ textAlign: "center" }}>No more posts to show</p>}
      >
        {posts.map(post => (
          <div key={post._id} className="border rounded-lg shadow-md mb-5 p-4">
            {/* User Info */}
            <div className="flex items-center mb-2">
              <Link to={`/${post.userId.username}`}>
                <img src={post.userId.profilePicture} alt={post.userId.username} className="w-10 h-10 rounded-full mr-3" />
              </Link>

              <Link to={`/${post.userId.username}`}><span className="font-semibold">{post.userId.username}</span></Link>
            </div>

            {/* Media */}
            {post.media.length > 0 && (
              <Swiper modules={[Navigation]} navigation className="w-full lg:h-96 mb-2">
                {post.media.map((media, index) => (
                  <SwiperSlide key={index}>
                    {media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".ogg") ? (
                      <video controls className="w-full h-full object-cover">
                        <source src={media} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                      </video>
                    ) : (
                      <img src={media} alt="post media" className="w-full h-full object-cover" />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Caption */}
            <p className="mb-2">{post.caption}</p>

            {/* Post Actions */}
            <div className="flex justify-between items-center py-2">
              <div className="flex gap-4 text-lg">
                <button onClick={() => handleLike(post._id)} className="hover:text-red-500 transition cursor-pointer">
                  {post.likes.includes(user._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                </button>
                <Link to={`/post/${post._id}`} className="hover:text-gray-500 transition">
                  <FaComment />
                </Link>
              </div>
              <button onClick={() => handleSave(post._id)} className="hover:text-gray-500 transition">
                {post.savedBy.includes(user._id) ? <FaBookmark className="text-black dark:text-white" /> : <FaRegBookmark />}
              </button>
            </div>

            {/* Like & Comment Count */}
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {post.likes.length} beğenme • {post.comments.length} yorum
            </div>

            {/* 📌 Post Zamanı & Kaydedilme Sayısı */}
            <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-400" />
                <span>{timeAgo(post.createdAt)}</span>
              </div>
              {post.savedBy.length === 0 ? (<></>) : (<span>{post.savedBy.length} kişi kaydetti</span>)}
            </div>

          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;