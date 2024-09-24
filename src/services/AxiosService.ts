import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ToastService } from "./ToastService";
import { BaseResponse } from "../responses/BaseResponse";

export default class AxiosService {
  public instance: AxiosInstance;

  constructor() {
    this.instance = this.setup();
  }

  setup() {
    const instance = axios.create();

    instance.interceptors.request.use(
      (req) => this.requestInterceptor(req),
      (error) => this.requestErrorInterceptor(error)
    );

    instance.interceptors.response.use(
      (res) => this.responseInterceptor(res),
      (error) => this.responseErrorInterceptor(error)
    );

    return instance;
  }

  requestInterceptor(data: InternalAxiosRequestConfig<unknown>) {
    return data;
  }

  requestErrorInterceptor(error: unknown) {
    return Promise.reject(error);
  }

  responseInterceptor(data: AxiosResponse<unknown, unknown>) {
    return data;
  }

  responseErrorInterceptor(error: AxiosError) {
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        const data = error.response.data as BaseResponse;
        ToastService.error(data.message);
      }
    } else {
      ToastService.error("Something went wrong");
    }
    return Promise.reject(error);
  }
}
