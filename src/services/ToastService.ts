import { Bounce, toast } from "react-toastify";

const TOAST_OPTIONS = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  theme: "light",
  transition: Bounce,
};

export class ToastService {
  static success(message: string, id: number) {
    toast.success(message, { ...TOAST_OPTIONS, toastId: id });
  }

  static error(message: string, id: number) {
    toast.error(message, { ...TOAST_OPTIONS, toastId: id });
  }

  static info(message: string) {
    toast.info(message, TOAST_OPTIONS);
  }

  static warning(message: string) {
    toast.warning(message, TOAST_OPTIONS);
  }
}
