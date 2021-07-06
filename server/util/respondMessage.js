class resMess {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

module.exports = { resMess };
