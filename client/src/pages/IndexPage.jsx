import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const IndexPage = () => {
  const [places, setPlaces] = useState("")

  useEffect(() => {
    axios.get("places").then(({ data }) => {
      setPlaces([...data])
    })
  })

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {places.length > 0 &&
        places.map(place => {
          return (
            <Link key={place._id} to={"/places/" + place._id}>
              <div className="">
                <div className="bg-cyan-700 rounded-2xl mb-2">
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                    className=" object-cover w-full h-full rounded-2xl aspect-square"
                  />
                </div>
                <h2 className="text-sm font-semibold truncate">
                  {place.title}
                </h2>
                <h3 className="text-xs text-gray-500 truncate">
                  {place.address}
                </h3>
                <div className="mt-1 text-sm">
                  <span className=" text-xs font-semibold">
                    ${place.pricePerNight}
                  </span>{" "}
                  per night
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}

export default IndexPage
