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

  static getAlbums() {
    return `${this.getBase()}/music/albums`;
  }

  static getSingles() {
    return `${this.getBase()}/music/singles`;
  }
}