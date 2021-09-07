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
