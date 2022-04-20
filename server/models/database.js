const { Data } = require('./schemas.js');

const newData = text => {
  const dataObject = {
    text,
  }
  const data = new Data(dataObject)
  return data.save()
}

const getData = () => {
  return Data.find()
}


module.exports = { newData, getData }