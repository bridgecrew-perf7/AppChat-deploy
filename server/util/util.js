function isVietnamesePhoneNumber(number) {
  const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return regex.test(number);
}

function passValid(password) {
  // 8 ký tự, chữ hoa, và số
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}

function checkCharacter(character) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(character);
}

function checkValid(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

module.exports = {
  isVietnamesePhoneNumber,
  passValid,
  checkCharacter,
  checkValid,
};
