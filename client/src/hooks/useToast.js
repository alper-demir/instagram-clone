import { toast } from 'react-hot-toast';

const useToast = () => {
    const showToast = (message, type = 'success', options = {}) => {
        const toastOptions = {
            duration: 3000,
            position: 'top-right',
            ...options,
        };

        switch (type) {
            case 'success':
                toast.success(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            case 'info':
                toast(message, { ...toastOptions, icon: 'ℹ️' });
                break;
            case 'warning':
                toast(message, { ...toastOptions, icon: '⚠️' });
                break;
            default:
                toast(message, toastOptions);
        }
    };

    return { showToast };
};

export default useToast;