import { BaseResponse } from "./BaseResponse";

export interface TokenResponse extends BaseResponse {
  accessToken: string;
}