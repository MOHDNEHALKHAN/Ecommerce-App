import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import '../index.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { token, login } = useAuth()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (res.ok && data.token) {
        login(data.token)
        navigate('/')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      alert('Error logging in')
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}
