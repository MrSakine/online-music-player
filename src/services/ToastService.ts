import { Bounce, toast } from "react-toastify";

const TOAST_OPTIONS = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Bounce,
};

export class ToastService {
  static success(message: string) {
    toast.success(message, TOAST_OPTIONS);
  }

  static error(message: string) {
    toast.error(message, TOAST_OPTIONS);
  }

  static info(message: string) {
    toast.info(message, TOAST_OPTIONS);
  }

  static warning(message: string) {
    toast.warning(message, TOAST_OPTIONS);
  }
}
