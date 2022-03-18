function getPayload(token) {
  const arr = token.split('.')
  return JSON.parse(atob(arr[1]))
}

export { getPayload }
