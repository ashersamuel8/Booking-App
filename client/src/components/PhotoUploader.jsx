import axios from "axios"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

export default function PhotoUploader(props) {
  console.log(props)
  const { addedPhotos, onChange } = props

  const [photoLink, setPhotoLink] = useState("")
  // const { action: placeId } = useParams()

  async function addPhotoByLink(event) {
    event.preventDefault()
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    })
    onChange(prev => [...prev, filename])
    setPhotoLink("")
  }

  function uploadPhoto(event) {
    const files = event.target.files
    const data = new FormData()

    for (const key in files) {
      data.append("photos", files[key])
    }

    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        const { data: filenames } = response
        onChange(prev => [...prev, ...filenames])
        // console.log(response.data)
      })
  }
  function deletePhoto(event, link) {
    event.preventDefault()

    // console.log(addedPhotos)
    // addedPhotos.pop()
    onChange([...addedPhotos.filter(photo => photo !== link)])
  }

  useEffect(() => {
    console.log(addedPhotos)
  })

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using link ..... jpeg"
          value={photoLink}
          onChange={e => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-grey px-4 my-2 h-auto rounded-xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <span className="text-xs font-light">
        Or upload images from your local device
      </span>
      <div className="my-2 flex gap-2 flex-wrap items-center">
        {addedPhotos.length > 0 &&
          // eslint-disable-next-line react/jsx-key
          addedPhotos.map(link => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div key={link} className="relative">
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                  className="rounded-md z-0 w-fit max-h-32"
                />
                <label
                  onClick={e => deletePhoto(e, link)}
                  className="cursor-pointer absolute -top-2 -right-2 text-white bg-transparent z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="grey"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:fill-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
              </div>
            )
          })}
        <div className="flex w-32 items-center justify-center">
          <label className="cursor-pointer mx-4 flex justify-center gap-2 border bg-transparent rounded-2xl p-4 w-full">
            <input
              type="file"
              accept="image/*, image/heic"
              className="hidden"
              onChange={uploadPhoto}
              multiple
            />
            <span>+</span>
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
        </div>
      </div>
    </>
  )
}

PhotoUploader.propTypes = {
  addedPhotos: PropTypes.array,
  onChange: PropTypes.func,
}
