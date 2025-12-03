const TokenKey = 'Admin-Token'

export function getToken() {
  try {
      const value = uni.getStorageSync(TokenKey);
	  return value;
  } catch (e) {
      // error
  }
}

export function setToken(token) {
  try {
      uni.setStorageSync(TokenKey, token);
  } catch (e) {
      // error
  }
}

export function removeToken() {
  try {
      uni.removeStorageSync(TokenKey);
  } catch (e) {
      // error
  }
}

// 用户信息
export function getUser() {
  try {
      const value = uni.getStorageSync('User');
	  return value;
  } catch (e) {
      // error
  }
}

export function setUser(info) {
  try {
      uni.setStorageSync("User", info);
	  setToken(info.en_user_id);
  } catch (e) {
      // error
  }
}

export function removeUser() {
  try {
      uni.removeStorageSync("User");
	  uni.removeStorageSync(TokenKey);
  } catch (e) {
      // error
  }
}

