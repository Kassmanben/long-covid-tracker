const { Data } = require('./schemas.js');

const newData = (rank, note) => {
  const dataObject = {
    rank,
    note
  }
  const data = new Data(dataObject)
  return data.save()
}

const getData = () => {
  return Data.find()
}


module.exports = { newData, getData }