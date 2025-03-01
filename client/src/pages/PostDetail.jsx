import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment, getPostById, likeComment, likePost, savePost } from "../services/postService";
import useToast from './../hooks/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { timeAgo } from './../utils/dateUtils';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MdDelete, MdEdit } from "react-icons/md";
import { openModal } from "../store/modalStore";

const PostDetail = () => {
    const { postId } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const commentsEndRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const dispatch = useDispatch();

    const [post, setPost] = useState();
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const userId = useSelector(state => state.user.user._id);
    const currentUser = useSelector(state => state.user.user);


    const handleLike = async () => {
        const response = await likePost(post._id, userId);
        if (response.type === "success") {
            setLiked(!liked);
            fetchPost()
        }
    };

    const handleSave = async () => {
        const response = await savePost(post._id, userId);
        if (response.type === "success") {
            setSaved(response.isSaved);  // Backend'den dönen değeri kullan
        }
    };


    const fetchPost = async () => {
        const { post, type, message, isSaved } = await getPostById(postId, userId);
        if (type === "error") {
            showToast(message, type);
            navigate("/");
        }
        setPost(post);
        let lk = post.likes.filter(user => user._id === currentUser._id);
        setLiked(lk.length > 0);
        setSaved(isSaved)
    };

    let isModalOpen = useSelector(state => state.modal.isOpen);
    const prevIsOpen = useRef(isModalOpen);

    useEffect(() => {
        if (prevIsOpen.current && !isModalOpen) {
            fetchPost();  // Sadece modal kapatıldığında çalışır
        }
        prevIsOpen.current = isModalOpen;
    }, [isModalOpen]);

    useEffect(() => {
        fetchPost();
    }, [postId, currentUser]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        const { type, message } = await createComment(postId, comment, userId);
        if (type === "error") {
            showToast(message, type);
        } else {
            scrollToBottom();
            setComment("");
            fetchPost();
        }
    };

    const handleCommentLike = async (commentId) => {
        const response = await likeComment(commentId, userId);
        if (response.type !== "error") {
            fetchPost()
        }
    };


    const scrollToBottom = () => {
        commentsContainerRef.current?.scrollTo({
            top: commentsContainerRef.current.scrollHeight,
            behavior: "smooth"
        });
    };

    const handleOpenEditModal = () => {
        dispatch(openModal({ modalType: "UpdatePostModal", modalData: { caption: post.caption, postId } }))
    }

    const handleOpenLikesModal = () => {
        dispatch(openModal({ modalType: "UserListModal", modalData: { list: post.likes, title: "Gönderiyi beğenenler" } }))
    }

    const handleOpenCommentLikesModal = (commentLikes) => {
        dispatch(openModal({ modalType: "UserListModal", modalData: { list: commentLikes, title: "Yorumu beğenenler" } }))
    }

    const handleOpenDeleteModal = () => {
        dispatch(openModal({ modalType: "DeletePostModal", modalData: { postId } }))
    }

    useEffect(() => {
        scrollToBottom();
    }, [post]);

    return (
        post && (
            <div className="flex justify-center items-center h-screen p-4 max-md:my-20">
                <div className="rounded-lg shadow-lg overflow-hidden max-w-5xl h-fit w-[90%]">
                    <div className="flex flex-col md:flex-row">
                        {/* Media Swiper */}
                        <div className="md:w-2/3">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                //pagination={{ clickable: true }}
                                className="w-full h-full"
                            >
                                {post.media.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".ogg") ? (
                                            <video controls className="w-full h-full">
                                                <source src={media} type="video/mp4" />
                                                Tarayıcınız video etiketini desteklemiyor.
                                            </video>
                                        ) : (
                                            <img src={media} alt="post media" className="w-full h-full object-cover" />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Post Details */}
                        <div className="w-full md:w-1/3 flex flex-col">
                            {/* User Info */}
                            <div className="flex items-center mb-4 p-3 relative">
                                <Link to={`/${post.userId.username}`}>
                                    <img
                                        src={post.userId.profilePicture}
                                        alt={post.userId.username}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                </Link>
                                <Link to={`/${post.userId.username}`}><span className="font-semibold">{post.userId.username}</span></Link>

                                {/* menu elemanı div render etmiyor dolayısıyla classname almıyor */}
                                <Menu>
                                    <MenuButton className="absolute top-0 right-0 p-1 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer transition duration-300">
                                        <HiOutlineDotsHorizontal className="text-2xl" />
                                    </MenuButton>

                                    {
                                        post.userId._id === userId && (
                                            <MenuItems
                                                transition
                                                anchor="top end"
                                                className="w-52 origin-top-right rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg-secondary p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-lg dark:text-dark-text-primary text-light-text-primary"
                                            >
                                                <MenuItem>
                                                    <button onClick={handleOpenEditModal} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-light-hover dark:data-[focus]:bg-dark-dropdown-bg-hover cursor-pointer">
                                                        <MdEdit />
                                                        Edit
                                                    </button>
                                                </MenuItem>

                                                <MenuItem>
                                                    <button onClick={handleOpenDeleteModal} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-light-hover dark:data-[focus]:bg-dark-dropdown-bg-hover cursor-pointer">
                                                        <MdDelete />
                                                        Delete
                                                    </button>
                                                </MenuItem>

                                            </MenuItems>
                                        )
                                    }

                                </Menu>

                            </div>

                            {/* Caption */}
                            <div className="mb-4 p-3">
                                <p className="text-sm">{post.caption}</p>
                            </div>

                            {/* Comments */}
                            <div ref={commentsContainerRef} className="flex-1 overflow-y-scroll mb-4 max-h-[26rem] relative px-3 break-all">
                                {post.comments.map((comment, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <div className="flex items-center">
                                                <Link to={`/${comment.userId.username}`}>
                                                    <img
                                                        src={comment.userId.profilePicture}
                                                        alt={comment.userId.username}
                                                        className="w-8 h-8 rounded-full mr-2 object-cover"
                                                    />
                                                </Link>
                                                <Link to={`/${comment.userId.username}`} className="font-semibold text-sm">{comment.userId.username}</Link>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm ml-10">{comment.text}</p>
                                                <button
                                                    className="text-lg hover:text-red-500 transition cursor-pointer"
                                                    onClick={() => handleCommentLike(comment._id)}
                                                >
                                                    {comment.likes?.some(like => like._id === userId) ? (
                                                        <FaHeart className="text-red-500" />
                                                    ) : (
                                                        <FaRegHeart />
                                                    )}

                                                </button>
                                            </div>
                                            <div className="ml-10 text-xs text-gray-500">
                                                {timeAgo(comment.createdAt)} - <button onClick={() => handleOpenCommentLikesModal(comment.likes)}>{comment.likes.length} beğenme</button>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={commentsEndRef} />
                            </div>
                            <div className="border-t border-light-border dark:border-dark-border py-2 px-3 flex flex-col text-sm">
                                {/* Butonlar */}
                                <div className="flex justify-between py-2">
                                    <div className="flex gap-4 text-lg">
                                        {/* Beğeni Butonu */}
                                        <button onClick={handleLike} className="hover:text-red-500 transition cursor-pointer">
                                            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                        </button>

                                        {/* Yorum Butonu */}
                                        <button className="hover:text-gray-500 transition cursor-pointer">
                                            <FaComment />
                                        </button>

                                        {/* Paylaşım Butonu */}
                                        <button className="hover:text-gray-500 transition cursor-pointer">
                                            <FaShare />
                                        </button>
                                    </div>
                                    {/* post saved kısmına veritabanında ekleniyor fakat react tarafında kontrolü sağlanmadı */}
                                    {/* Kaydetme Butonu */}
                                    <button onClick={handleSave} className="hover:text-gray-500 transition cursor-pointer">
                                        {saved ? (
                                            <FaBookmark className="text-black dark:text-white" />
                                        ) : (
                                            <FaRegBookmark />
                                        )}
                                    </button>
                                </div>

                                {/* Beğeni Sayısı */}
                                <div className="font-semibold py-1"><button className="cursor-pointer" onClick={handleOpenLikesModal}>{post.likes.length} beğenme</button></div>

                                {/* Tarih */}
                                <div className="text-gray-500 text-xs">{timeAgo(post.createdAt)}</div>
                            </div>
                            {/* Comment Input */}
                            <div className="mt-2 flex gap-x-1 items-center px-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="p-2 text-sm border rounded flex-1"
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                                <button
                                    className={`p-1 text-sm rounded-md ${comment ? 'text-blue-500 hover:text-blue-700 cursor-pointer font-semibold' : 'cursor-not-allowed font-semibold'}`}
                                    disabled={!comment}
                                    onClick={handleCommentSubmit}
                                >
                                    Paylaş
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default PostDetail;