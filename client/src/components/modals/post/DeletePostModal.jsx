import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { deletePost } from "../../../services/postService";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const DeletePostModal = ({ isOpen, close, modalData }) => {

    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        const { message } = await deletePost(modalData.postId)
        if (message) { showToast(message, "success") }
        close();
        navigate("/")
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 text-light-text-primary dark:text-dark-text-primary">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-2xl bg-light-bg dark:bg-dark-bg p-6 shadow-xl ring-1 ring-white/10 transform transition-all duration-300 ease-out scale-100 opacity-100"
                >
                    <DialogTitle as="h3" className="text-lg font-semibold border-b pb-3 mb-4 text-center">
                        Delete Post
                    </DialogTitle>
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={close}
                            className="px-4 py-2 rounded-lg transition-all cursor-pointer text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeletePost}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-lg hover:bg-red-700 transition-all cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default DeletePostModal;
