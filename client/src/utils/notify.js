class Notify {
  constructor(message) {
    this.message = message;
    message ? (this.error = true) : (this.error = false);
    this.errUsername = false;
    this.errPhone = false;
    this.errPassword = false;
    this.errConfirmPass = false;
  }
  errorUsername() {
    this.errUsername = true;
    return this;
  }
  errorPhone() {
    this.errPhone = true;
    return this;
  }
  errorPassword() {
    this.errPassword = true;
    return this;
  }
  errorConfirmPass() {
    this.errPassword = true;
    this.errConfirmPass = true;
    return this;
  }
  errorAll() {
    this.errUsername = true;
    this.errPhone = true;
    this.errPassword = true;
    this.errConfirmPass = true;
    return this;
  }
  OTPsent() {
    this.notify = true;
    this.error = false;
    return this;
  }
  Loading() {
    this.loading = true;
    this.error = false;
    return this;
  }
}

export default Notify;
