const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://snake-demo:snake123123@snakef8.9wmiu.mongodb.net/?retryWrites=true&w=majority')
   
    console.log('Connect successfully')
  } catch (error) {
    console.log('Connect failed: ' + error)
  }
}

module.exports = { connect }
