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

async function getProfile(pid, token="") {
  const resp = await fetch(`${api}/profiles/${pid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  if (!resp.ok) {
    throw new Error(`failed to fetch profile: ${resp.statusText}`)
  }
  let body = await resp.json()
  body.address = {
    street: '',
    zip: '1000',
    city: 'Brussels',
    country: 'Belgium',
  }
  body.technicals = Object.values(groupBy(body.technicals, 'category'))
  return body
}

function groupBy(xs, key) {
  return [...xs].reduce(function(rv, x) {
    if (!rv[x[key]]) {
      rv[x[key]] = {category: x[key], skills: []}
    }
    rv[x[key]].skills.push(x)
    return rv
  }, {});
}

export { authenticate, getProfile }
