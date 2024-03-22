import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function handleLoginSubmit(event) {
    event.preventDefault()
    try {
      const response = await axios.post("/login", { email, password })
      setUser(response.data)
      navigate("/")
    } catch (err) {
      alert("Login unsuccesful, try again.")
      setPassword("")
      console.log(err)
    }
  }

  // const loginForm = document.getElementById("loginForm")
  // if (user) {
  //   loginForm.disabled = true
  // } else {
  //   loginForm.disabled = false
  // }

  useEffect(() => {
    const loginFieldset = document.getElementById("loginFieldset")
    const loginHeader = document.getElementById("loginHeader")
    if (user) {
      loginFieldset.disabled = true
      loginHeader.classList.add("text-gray-300")
    } else {
      loginFieldset.removeAttribute("disabled")
      loginHeader.classList.remove("text-gray-300")
    }
  }, [user])

  console.log("login render")

  function onHomepageClick() {
    navigate("/")
  }
  async function onLogoutClick() {
    await axios.post("/logout")
    setUser(null)
    navigate("/login")
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      {user && (
        <div className=" absolute z-10 top-1/4 border-amber-500 border-2 rounded-xl h-50 w-96 backdrop-blur-lg p-4 text-center">
          <h1 className="text-md font-light">
            You&apos;re Already Logged In! <br />
            Would you like to return to the Homepage or Logout?
          </h1>
          <div className="flex gap-10 mt-10">
            <button className="primary" onClick={onLogoutClick}>
              Logout
            </button>
            <button className="primary" onClick={onHomepageClick}>
              Go to Homepage
            </button>
          </div>
        </div>
      )}
      <div id="loginDiv" className="mb-64 z-0">
        <fieldset id="loginFieldset">
          <h1 id="loginHeader" className="text-4xl text-center mb-4">
            Login
          </h1>
          <form
            className="max-w-md mx-auto"
            action=""
            onSubmit={handleLoginSubmit}
            id="loginForm"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              id="loginButton"
              type="submit"
              className="primary disabled:bg-gray-300"
            >
              Login
            </button>
            <div className="text-center py-2 text-gray-500">
              Don&apos;t have an account yet?{" "}
              <Link
                className="underline text-black"
                to={user ? "" : "/register"}
              >
                {" "}
                Register Now{" "}
              </Link>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}

export default LoginPage
