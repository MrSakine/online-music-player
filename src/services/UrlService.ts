export class UrlService {
  static getBase() {
    return import.meta.env.VITE_API;
  }

  static getLogin() {
    return `${this.getBase()}/login`;
  }

  static getSignUp() {
    return `${this.getBase()}/signup`;
  }
}