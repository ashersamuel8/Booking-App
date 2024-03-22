import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  let i = 1

  console.log(`BEFORE \nuser: ${JSON.stringify(user)}, ready: ${ready}`)

  useEffect(() => {
    console.log(`useEffect called ${i} time(s)`)
    i++
    axios.get("/profile").then(async ({ data }) => {
      setUser(data)
      setReady(true)
    })
  }, [])
  console.log(`AFTER\nuser: ${JSON.stringify(user)}, ready: ${ready}`)

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  )
}
