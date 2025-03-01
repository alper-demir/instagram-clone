import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserListModal = ({ isOpen, close, modalData }) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 text-light-text-primary dark:text-dark-text-primary">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-2xl bg-light-bg dark:bg-dark-bg p-6 shadow-xl ring-1 ring-white/10 transform transition-all duration-300 ease-out scale-100 opacity-100"
                >
                    <DialogTitle as="h3" className="text-lg font-semibold border-b pb-3 mb-4">
                        {modalData.title}
                    </DialogTitle>

                    <div className="max-h-80 overflow-y-auto">
                        {modalData.list?.length > 0 ? (
                            modalData.list.map((user) => (
                                <Link
                                    to={`/${user.username}`}
                                    onClick={close}
                                    key={user._id}
                                    className="flex items-center gap-3 p-3 hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg cursor-pointer transition-all"
                                >
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <FaUserCircle className="w-10 h-10 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{user.username}</span>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No users found</p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={close}
                            className="px-4 py-2 rounded-lg transition-all cursor-pointer text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default UserListModal;