import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { updatePost } from '../../../services/postService';

const UpdatePostModal = ({ isOpen, close, modalData }) => {
    console.log(modalData);

    const [caption, setCaption] = useState("");

    useEffect(() => { setCaption(modalData.caption) }, [])

    const handleUpdate = async () => {
        // Update caption
        await updatePost(modalData.postId, caption);
        close();
    }

    return (
        <div>
            <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 text-light-text-primary dark:text-dark-text-primary">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-2xl bg-light-bg dark:bg-dark-bg p-6 shadow-xl ring-1 ring-white/10 transform transition-all duration-300 ease-out scale-100 opacity-100"
                    >
                        <DialogTitle as="h3" className="text-lg font-semibold">
                            Update Post
                        </DialogTitle>

                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="mt-4 !w-full rounded-lg border border-gray-700 p-3  outline-none"
                            placeholder="Enter new caption..."
                            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                        />

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={close}
                                className="px-4 py-2 rounded-lg transition-all cursor-pointer text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-all cursor-pointer"
                            >
                                Update
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>

    )
}

export default UpdatePostModal