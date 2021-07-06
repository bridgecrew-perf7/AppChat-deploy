class User {
  constructor(phone, password, username = null) {
    this.phone = phone;
    this.password = password;
    this.username = username ? username.trim() : username;
  }
}

export default User;
