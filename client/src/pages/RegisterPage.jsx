import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function registerUser(event) {
    event.preventDefault()
    try {
      await axios.post("/register", {
        name: firstName + " " + lastName,
        email,
        password,
      })
      alert("User Registered, Go to the login page to signin")
    } catch (err) {
      console.log(err)
    } finally {
      setLastName("")
      setFirstName("")
      setPassword("")
      setEmail("")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button type="submit" className="primary">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member? Go to{" "}
            <Link className="underline text-black" to={"/login"}>
              {" "}
              Login{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
