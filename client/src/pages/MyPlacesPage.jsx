import { Link, useParams } from "react-router-dom"
import PlacesList from "../components/PlacesList"
import PlaceForm from "../components/PlaceForm"

export default function MyPlacesPage() {
  const { action } = useParams()

  return (
    <div>
      {action === undefined ? (
        <div className="text-center">
          <br></br>
          <Link
            className="inline-flex gap-2 bg-primary text-white py-2 px-4 rounded-full"
            to={"/account/places/new"}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add New Palce</span>
          </Link>
          <PlacesList />
        </div>
      ) : (
        <PlaceForm />
      )}
    </div>
  )
}

// : action === "new" ? (
//         <AddPlaceForm />
//       ) : (
//         <EditPlaceForm />
//       )
