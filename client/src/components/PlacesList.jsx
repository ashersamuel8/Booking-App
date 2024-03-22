import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function PlacesList() {
  const [places, setPlaces] = useState("")

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data)
    })

    return () => {}
  }, [])

  return (
    <div className="p-4 m-4">
      {places.length > 0 &&
        places.map(place => {
          return (
            <Link
              to={"/account/places/" + place._id}
              className="flex justify-start items-start cursor-pointer gap-4 p-4 my-2 rounded-2xl border shadow-md"
              key={place._id}
            >
              <div className="flex w-1/4 flex-wrap gap-2 ">
                {place.photos.length > 0 &&
                  place.photos.map((photo, index) => {
                    if (index === 0) {
                      return (
                        <div key={photo} className="w-full h-full">
                          <img
                            src={"http://localhost:4000/uploads/" + photo}
                            alt=""
                            className="object-cover w-full h-full rounded transform hover:scale-110 transition-transform"
                          />
                        </div>
                      )
                    } else if (index < 3) {
                      return (
                        <div
                          key={photo}
                          className="w-1/3 flex-grow flex-shrink"
                        >
                          <img
                            src={"http://localhost:4000/uploads/" + photo}
                            alt=""
                            className="object-cover w-full h-full rounded transform hover:scale-110  transition-transform"
                          />
                        </div>
                      )
                    }
                  })}
              </div>
              <div className="w-3/4">
                <h2 className="text-xl text-start">{place.title}</h2>
                <p className="text-sm mt-2 text-start">{place.description}</p>
              </div>
            </Link>
          )
        })}
    </div>
  )
}
