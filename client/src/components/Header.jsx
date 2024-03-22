import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"

const Header = () => {
  const { user, ready } = useContext(UserContext)

  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center gap-1">
        <object
          type="image/svg+xml"
          data="../../public/logo.svg"
          className="w-8 h-8"
        >
          Your browser does not support SVG
        </object>

        <span className="font-bold text-xl">RentHub</span>
      </Link>
      <div className="flex gap-2 border border-grey-300 rounded-full py-2 px-4 shadow-md shadow-grey-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div>Guests</div>
        <button className="bg-primary text-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="items-center flex gap-2 border border-grey-300 rounded-full py-2 px-4">
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link
          to={ready ? (user ? "/account" : "/login") : ""}
          className="flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 bg-primary text-white rounded-full border border-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          {ready ? user ? <div>{user.name}</div> : "Login" : ""}
        </Link>
      </div>
    </header>
  )
}

export default Header
