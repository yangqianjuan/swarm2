import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(name) {
  return Cookies.set('username', name)
}

export function removeUserName() {
  return Cookies.remove('username')
}

export function getUserName() {
  return Cookies.get('username')
}

export function getRoles() {
  return Cookies.get('roles')
}

export function setRoles(roles) {
  return Cookies.set('roles', roles)
}

export function removeRoles() {
  return Cookies.remove('roles')
}

export function setAvatar(roles) {
  return Cookies.set('avatar', roles)
}

export function getAvatar() {
  return Cookies.get('avatar')
}

export function removeAvatar() {
  return Cookies.remove('avatar')
}
