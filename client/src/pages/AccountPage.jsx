import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"
import axios from "axios"
import MyPlacesPage from "./MyPlacesPage"

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext)
  let { subpage } = useParams()
  const navigate = useNavigate()

  async function Logout() {
    await axios.post("/logout")
    setUser(null)
    navigate("/")
  }

  if (!ready) {
    return <>Loading...</>
  }

  if (ready && !user) {
    return <Navigate to="/login" />
  }

  subpage ? "" : (subpage = "profile")

  function active(link = null) {
    return link === subpage
      ? "py-2 px-6 bg-primary text-white rounded-full gap-2 flex shadow-sm"
      : "py-2 px-6 gap-2 flex border rounded-full shadow-sm"
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 mb-8 gap-4">
        <Link className={active("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={active("bookings")} to={"/account/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
          My Bookings
        </Link>
        <Link className={active("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged In as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <MyPlacesPage />}
    </div>
  )
}

export default AccountPage
