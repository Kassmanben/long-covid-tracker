const {Rank, Activity} = require('./schemas.js');

const newRank = (rank, note) => {
    const rankToSave = {
        rank,
        note
    }
    const rankObj = new Rank(rankToSave)
    return rankObj.save()
}

const getRank = () => {
    return Rank.find()
}

const newActivity = (name, timesAllotted) => {
    const activityToSave = {
        name,
        timesAllotted
    }
    const activityObj = new Activity(activityToSave)
    return activityObj.save()
}

//TODO: For recharts reasons, there should be a get method that returns an array of dates with the activities and time allotted per activity per day
/*
* const data = [
  {
    date: 6/12/22,
    ActivityA: 10,
    ActivityB: 2
  },
  * ....
]
* */
const getActivity = () => {
    return Activity.find()
}


module.exports = {newRank: newRank, getRank: getRank, newActivity: newActivity, getActivity: getActivity}