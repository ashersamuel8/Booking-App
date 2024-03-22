import { useParams, useNavigate } from "react-router-dom"
import Perks from "./Perks"
import { useState, useEffect } from "react"
import axios from "axios"
import PhotoUploader from "./PhotoUploader"
export default function PlaceForm() {
  const { subpage } = useParams()
  const { action: id } = useParams()
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState("")
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(0)
  const [formReady, setFormReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id === "new" || id === undefined) {
      setFormReady(true)
      return
    } else {
      axios.get("edit-place/" + id).then(({ data }) => {
        //   console.log(data)

        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxGuests)
        setFormReady(true)
        setPrice(data.pricePerNight)
      })
    }

    return () => {}
  }, [id])

  if (!formReady) {
    return <>Loading...</>
  }

  function inputHeader(text) {
    return <h2 className="text-xl mt-4 required">{text}</h2>
  }

  function inputDescription(text) {
    return (
      <p className="-mb-1 text-grey-500 text-xs italic font-light">{text}</p>
    )
  }

  function inputLabel(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  function addNewPlace(event) {
    event.preventDefault()
    axios.post("/add-place", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    })
    navigate("/account/" + subpage)
  }
  function editPlace(event) {
    event.preventDefault()
    axios
      .put("/edit-place", {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      })
      .then(res => {
        console.log(res)
        navigate("/account/places")
      })
  }

  return (
    <div>
      <form
        disabled
        action=""
        onSubmit={id === "new" ? addNewPlace : editPlace}
      >
        {inputLabel("Title", "Title for you location")}
        <input
          type="text"
          placeholder="Example: Charming Beachfront Bungalow with Ocean Views"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {inputLabel("Address", "Address to this place")}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {inputLabel(
          "Photos",
          "Upload photos of your location. Uploading more photos attracts more customers."
        )}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {inputLabel("Description", "Provide a short description of the place")}
        <textarea
          placeholder="Example: Welcome to our cozy beachfront bungalow, a hidden gem nestled along the pristine shoreline of [Location Name]. This charming retreat offers a perfect blend of modern comfort and coastal charm, making it an ideal choice for couples, families, and solo travelers."
          className="w-full border border-zinc-500 rounded-md h-32 mt-2 p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {inputLabel("Perks", "Select all the perks of your place")}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-2 gap-1">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {inputLabel(
          "Extra Info",
          " House rules, Safety Features, Cleaning Procedures, Communication, etc."
        )}
        <textarea
          className=" border border-zinc-500 w-full rounded-md h-16 mt-2 p-2"
          value={extraInfo}
          onChange={e => setExtraInfo(e.target.value)}
        />
        {inputLabel(
          "Check In-Out Times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 text-base">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-base">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-base">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={e => setMaxGuests(e.target.value)}
              className="border"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-base">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              className="border"
            />
          </div>
        </div>
        <div className="flex justify-center m-4">
          <button className="primary m-4 !max-w-sm">Save</button>
        </div>
      </form>
    </div>
  )
}
