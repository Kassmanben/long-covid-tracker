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

const newActivity = (name, timeAllotted) => {
    const activityToSave = {
        name,
        timeAllotted
    }
    const activityObj = new Activity(activityToSave)
    return activityObj.save()
}

const getActivity = () => {
    return Activity.find()
}


module.exports = {newRank: newRank, getRank: getRank, newActivity: newActivity, getActivity: getActivity}