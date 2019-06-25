const localStorage = window.localStorage
const USER_KEY = 'user_message'
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
export function setUser (data) {
  return localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export function removeUser () {
  return localStorage.removeItem(USER_KEY)
}
