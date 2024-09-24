const TOKEN_KEY = "accessToken";

class LocalStorageService {
  static saveToken(value: string) {
    window.localStorage.setItem(TOKEN_KEY, value);
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  static deleteToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export { TOKEN_KEY, LocalStorageService };
