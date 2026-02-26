import 'dotenv/config'

const API_URL = 'https://ben820-evmessage.hf.space'

async function measurePing(name, url, options = {}) {
    const start = Date.now()
    try {
        const res = await fetch(url, options)
        await res.text() // consume body
        const end = Date.now()
        console.log(`[${name}] OK - ${end - start}ms (HTTP ${res.status})`)
    } catch (err) {
        const end = Date.now()
        console.log(`[${name}] ERROR - ${end - start}ms - ${err.message}`)
    }
}

async function runTest() {
    console.log(`Targeting backend: ${API_URL}`)
    console.log('---')

    // 1. Network Ping (hitting cached /health endpoint)
    await measurePing('Network Ping (/health)', `${API_URL}/health`)

    // 2. DB Ping (hitting a route that strictly hits the DB: login attempt)
    await measurePing('DB Ping (/api/auth/login)', `${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'latency-test@example.com', password: 'fakepassword' })
    })
}

runTest()
