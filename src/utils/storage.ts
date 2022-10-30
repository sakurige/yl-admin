class Storage {
  private instance = localStorage;

  getItem(key: string) {
    const value = this.instance.getItem(key);
    if (value) {
      return value;
    }
    return "";
  }

  setItem(key: string, value: unknown) {
    if (typeof value === "string") {
      this.instance.setItem(key, value);
    } else {
      this.instance.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string) {
    this.instance.removeItem(key);
  }
}

export default new Storage();
