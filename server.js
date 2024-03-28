const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { promisify } = require('util')
const File = require('./models/fileModel')
const User = require('./models/userModel')
const fileController = require('./controllers/fileController')
const AppError = require('./utils/appError')
const jwt = require('jsonwebtoken')
const globalErrorHandler = require('./controllers/errorController')
const APIFeatures = require('./utils/apiFeatures')
const authController = require('./controllers/authController')
const catchAsync = require('./utils/catchAsync')
const userRouter = require('./routes/userRoutes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const server = createServer(app)
const io = new Server(server)

dotenv.config({ path: './config.env' })
app.use(express.static(join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './views')

//Use for socket server
io.on('connection', (socket) => {
  // const userId = 'Dang'
  // if (userId === 'Dang') {
  //   socket.id = '9rnFUQz1FPnEi1LBAAAB'
  // }
  socket.on('sender-join', (data) => {
    socket.join(data.uid)
  })

  socket.on('receiver-join', (data) => {
    socket.join(data.uid)
    socket.to(data.sender_uid).emit('init', data.uid)
  })

  // socket.on('file-meta', (data) => {
  //   socket.to(data.uid).emit('fs-meta', data.metadata)
  // })
  socket.on('file-meta', (data) => {
    socket.broadcast.emit('fs-meta', data.metadata)
  })

  socket.on('fs-start', (data) => {
    socket.to(data.uid).emit('fs-share', {})
  })

  // socket.on('file-raw', (data) => {
  //   socket.to(data.uid).emit('fs-share', data.buffer)
  // })
  socket.on('file-raw', (data) => {
    socket.broadcast.emit('fs-share', data.buffer)
  })
  // console.log('co ng ket noi: ' + socket.id)
})

//Use for database connection
const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))

// const testFile = new File({
//   name: 'test14',
//   length: 20,
//   info: {
//     username: 'test1234',
//     gmail: 'test1234@gmail',
//   },
// })

// testFile
//   .save()
//   .then((doc) => {})
//   .catch((err) => {
//     console.log('ERROR', err)
//   })

//function use for command line
const publish = async (username, lname, fname) => {
  let filename = fname
  const length = 20
  const user = await User.findOneAndUpdate(
    { name: username },
    {
      $push: {
        myfiles: { filename, length },
      },
    },
    {
      new: true,
    }
  )
  const username1 = user.name
  const gmail1 = user.email
  const testFile = new File({
    name: filename,
    length: 20,
    info: {
      username: username1,
      gmail: gmail1,
    },
  })

  testFile
    .save()
    .then((doc) => {})
    .catch((err) => {
      console.log('ERROR', err)
    })

  if (!user) {
    console.log('Failure')
  }
  let size = user.myfiles.length - 1
  console.log(user.myfiles[size])
}

const fetch = async (username, fname) => {
  let filename = fname
  const length = 20
  const user = await User.findOneAndUpdate(
    { name: username },
    {
      $push: {
        myfiles: { filename, length },
      },
    },
    {
      new: true,
    }
  )
  if (!user) {
    console.log('Failure')
  }
  console.log(user)
}

const discover = async (hostname) => {
  try {
    let username = hostname
    const user = await User.findOne({ name: username })
    let files = user.myfiles
    if (files.length === 0) {
      console.log('No file found with that name')
    } else {
      files.forEach((file) => {
        console.log(file.filename)
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const ping = async (hostname) => {
  try {
    const user = await User.findOne({ name: hostname })
    if (user.length === 0) {
      console.log('No user found with that name')
    } else {
      console.log(user)
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = { publish, fetch, discover, ping }
// --------------------------------------------------
// --------------------------------------------------
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.cookies)
  next()
})

app.get('/', async (req, res) => {
  const features = new APIFeatures(File.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const files = await features.query
  res.render('overview', {
    files: files,
  })
})
app.get('/myfiles', authController.protect, async (req, res) => {
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }
  let user = currentUser
  res.status(200).render('myfiles', {
    user,
    files: user.myfiles,
  })
})

app.get('/myfiles/:username', authController.protect, async (req, res) => {
  const files = await File.find({ 'info.username': req.params.username })
  if (!files) {
    res.status(404).json({
      status: 'No file found with that name',
    })
  }
  res.status(200).render('myfiles', {
    files: files,
  })
})
app.patch('/publish/:name', async (req, res) => {
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  let filename = req.params.name
  const length = 20
  const user = await User.findByIdAndUpdate(
    decoded.id,
    {
      $push: {
        myfiles: { filename, length },
      },
    },
    {
      new: true,
    }
  )
  const username = user.name
  const gmail = user.email
  const testFile = new File({
    name: filename,
    length: 20,
    info: {
      username: username,
      gmail: gmail,
    },
  })

  testFile
    .save()
    .then((doc) => {})
    .catch((err) => {
      console.log('ERROR', err)
    })

  if (!user) {
    return res.status(404).json({
      status: 'failure',
      message: 'User not found with that name',
    })
  }

  return res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

app.get('/search', async (req, res) => {
  const file = await File.findOne({ name: req.query.search })
  if (!file) {
    res.status(404).json({
      status: 'No file found with that name',
    })
  }
  res.status(200).render('Search', {
    title: 'Search',
    file: file,
  })
})

app.get('/sender', authController.protect, (req, res) => {
  res.status(200).render('sender', {
    title: 'Receiver',
  })
})

app.get('/command', (req, res) => {
  res.status(200).render('command')
})

app.get('/receiver', authController.protect, (req, res) => {
  res.status(200).render('receiver', {
    title: 'Receiver',
  })
})

app.get('/login', (req, res) => {
  res.status(200).render('login')
})

app.get(
  '/server',
  // authController.restrictTo('admin'),
  fileController.getAllFiles
)

app.use('/api/v1/users', userRouter)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

server.listen(4000, () => {})
