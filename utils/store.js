const userKey = 'userKey'

export function setUser(params) {
  const user = JSON.stringify(params)
  localStorage.setItem(userKey, user)
}
export function getUser() {
  const user = localStorage.getItem(userKey)
  return user ? JSON.parse(user) : null
}
export function clearUser() {
  localStorage.removeItem(userKey)
}
