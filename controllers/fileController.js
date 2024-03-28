const File = require('./../models/fileModel')
const APIFeatures = require('./../utils/apiFeatures')
const AppError = require('./../utils/appError')
const catchAsync = require('./../utils/catchAsync')

exports.getAllFiles = catchAsync(async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(File.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const files = await features.query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: files.length,
      data: {
        files,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
})

exports.getFile = catchAsync(async (req, res, next) => {
  const file = await File.findOne({ name: req.query.search })

  if (!file) {
    res.status(404).json({
      status: 'No file found with that name',
    })
    // return next(new AppError('No file found with that name', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      file,
    },
  })
})

exports.createFile = catchAsync(async (req, res, next) => {
  const newFile = await File.create(req.body)

  if (!file) {
    return next(new AppError('No file found with that name', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      file: newFile,
    },
  })
})

exports.updateFile = catchAsync(async (req, res, next) => {
  const file = await File.findOneAndUpdate(req.params.name, req.body, {
    new: true,
    runValidators: true,
  })

  if (!file) {
    return next(new AppError('No file found with that name', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      file,
    },
  })
})

exports.deleteFile = catchAsync(async (req, res, next) => {
  await File.findOneAndDelete(req.params.name)

  if (!tour) {
    return next(new AppError('No file found with that ID', 404))
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
