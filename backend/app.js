// import the library:
const express = require('express')
// import valiation library
const { param, body, validationResult } = require('express-validator')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');


// create the express server
const app = express()
let port = 3000
// Middleware to read the body:
app.use(express.json())

// Middleware for cors: 
const corsHeaders = (req,res,next) => {
  // change wildcard * to real address of client once we have it!
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", 'Origin, x-Requested-With, Content-Type, Accept, Authorization')
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE")
  res.status(200)
  next()

}
app.use(corsHeaders)



app.get('/', (req, res) => {
  console.log('a get request');
  res.send('A response from the server!')
})

app.get('/demo', (req, res) => {
  res.send('A response from the path /demo')
})

app.get('/info', (req, res) => {
  res.send('A response from /info')
})

app.get('/todos', (req, res) => {
  // send some data back
  res.status(200).json({
    success: true,
    my_data: [ { task: 'learn express', status: 'open', id: uuidv4() }, { task: 'learn node', status: 'open', id: uuidv4() }, { task: 'learn react', status: 'open', id: uuidv4() } ]
  })
})
// Structure of a valid task:

const validTask = [
  body('task')
    .notEmpty()
    .withMessage('Cannot be empty')
    .trim()
    .escape(),
  body('status')
    .isIn(['open', 'done'])
    .withMessage('Can only be "open" or "done"')
    .trim()
    .escape(),
  body('id')
    .isUUID()
    .withMessage('Id needs to be a UUID')
    .trim()
    .escape(),
]

app.post('/todos', validTask, (req, res) => {
  // here we check the body: WIP
  console.log(req.body);
  // Validation and sanitization
  let resultOfValidation = validationResult(req)
  console.log(resultOfValidation);

  if (resultOfValidation.isEmpty()) {
    // Now it is safe to store in the db
    // send response back:
    res.status(201).json({
      success: true,
      message: 'Data was saved!'
    })
  } else {
    res.status(500).send({ 
      errors: resultOfValidation.array()
    })
  }
})

app.put('/todos/:id', param('id').isUUID(), validTask, (req, res) => {
  // update the data: WIP 
  let resultOfValidation = validationResult(req)
  if (resultOfValidation.isEmpty()) {
    // Update the db
    // response: 
    res.status(200).json({
    success: true,
    message: 'Data was updated'
  })
  } else {
    res.status(500).send({ 
      errors: resultOfValidation.array()
    })
  }
  
})

app.delete('/todos/:id', param('id').isUUID() , (req, res) => {
  console.log('in del', req.params);
  let resultOfValidation = validationResult(req)
  if (resultOfValidation.isEmpty()) {
      // delete the data: WIP
    // send response
    res.status(200).json({
      message: `Data was deleted ${req.params.id}`
  })
  } else {
    res.status(500).send({ 
      errors: resultOfValidation.array()
    })
  }
})
// Errors: 
// Create a error for the missing paths
app.use('*', (req, res, next) => {
  if(req.method === 'OPTIONS'){
    // Don't send an error back on a OPTIONS request
    next()
  } else {
  // create an error
  let my_error = new Error('There is no path here!')
  my_error.statusCode = 404
  // pass it to the next function:
  next(my_error)}
})
// Function to send error messages back:
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something is wrong on the server'
  })
})

// always at the end!
app.listen(port, () => {
  console.log('Server is running on:', port);
})