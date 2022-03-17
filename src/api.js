const api = "http://localhost:3001"

async function authenticate(email, pass) {
  const resp = await fetch(`${api}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, pass })
  })
  if (!resp.ok) {
    throw new Error(`authentication failed: ${resp.statusText}`)
  }
  return resp.json()
}

export { authenticate }
