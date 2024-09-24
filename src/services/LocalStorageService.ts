const TOKEN_KEY = "accessToken";

class LocalStorageService {
  static saveToken(value: string) {
    window.localStorage.setItem(TOKEN_KEY, value);
  }

  static getToken() {
    window.localStorage.getItem(TOKEN_KEY);
  }
}

export { TOKEN_KEY, LocalStorageService };
