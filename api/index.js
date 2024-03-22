const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const User = require("./models/User.js")
const Place = require("./models/Place.js")
const Booking = require("./models/Booking.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const upload = multer({ dest: "uploads/" })

const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)

const jwtSecret = "kdsajffadafwe"

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      resolve(userData)
    })
  })
}

mongoose.connect(process.env.MONGO_URL)

app.use(express.json(), cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
  } catch (err) {
    console.log(err)
    res.status(422).json(e)
  } finally {
    res.json(userDoc)
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password)
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res
            .cookie("token", token)
            .json({ name: user.name, email: user.email, id: user._id })
        }
      )
    } else {
      res.status(422)
    }
  } else {
    res.status(422).json()
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id: id } = await User.findById(userData.id)
      res.json({ name, email, id })
    })
  } else {
    res.json(null)
  }
  // res.json("userInfo")
})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json()
})

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body
  const newName = "photo" + Date.now() + ".jpg"
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  })
  res.json(newName)
})

app.post("/upload", upload.array("photos", 5), (req, res) => {
  const uploadedFiles = []
  for (const key in req.files) {
    const { path: filePath, originalname } = req.files[key]
    const newPath = filePath + path.extname(originalname)
    fs.renameSync(filePath, newPath)
    uploadedFiles.push(newPath.replace("uploads/", ""))
  }
  // console.log(req.files)
  res.json(uploadedFiles)
})

app.post("/add-place", (req, res) => {
  const { token } = req.cookies
  let id = null
  // console.log(req)
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const placeDoc = await Place.create({
        owner: userData.id,
        title: req.body.title,
        address: req.body.address,
        photos: req.body.addedPhotos,
        description: req.body.description,
        perks: req.body.perks,
        extraInfo: req.body.extraInfo,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        maxGuests: req.body.maxGuests,
        pricePerNight: req.body.price,
      })
      res.json(placeDoc)
    })
  } else {
    res.json(null)
  }
})

app.get("/user-places", (req, res) => {
  const { token } = req.cookies
  let id = null
  // console.log(req)
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { id } = userData
      res.json(await Place.find({ owner: id }))
    })
  }
})

app.get("/places/:id", async (req, res) => {
  const { id } = req.params
  res.json(await Place.findOne({ _id: id }))
})

app.get("/edit-place/:id", (req, res) => {
  const { token } = req.cookies
  const { id } = req.params
  let userId = null
  // console.log(req)
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { id: userId } = userData
      res.json(await Place.findOne({ owner: userId, _id: id }))
    })
  }
})

app.put("/edit-place", (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const placeDoc = await Place.findById(req.body.id)
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title: req.body.title,
        address: req.body.address,
        photos: req.body.addedPhotos,
        description: req.body.description,
        perks: req.body.perks,
        extraInfo: req.body.extraInfo,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        maxGuests: req.body.maxGuests,
        pricePerNight: req.body.price,
      })
      await placeDoc.save()
      res.json("ok")
    }
  })
})

app.get("/places", async (req, res) => {
  res.json(await Place.find())
})

app.get("/bookings", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL)
  const userData = await getUserDataFromReq(req)
  res.json(await Booking.find({ user: userData.id }).populate("place"))
})

app.post("/bookings", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL)
  const userData = await getUserDataFromReq(req)
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      throw err
    })
})

app.listen(4000)
