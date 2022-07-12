export function mapRankData(dataArray) {
    // Maps DB date to local time, filters null elements
    if (dataArray && dataArray.length > 0) {
        return dataArray.map((dataItem) => {
            if (dataItem.date && dataItem.rank) {
                return {
                    ...dataItem,
                    date: getDateLocalized(dataItem.date)
                }
            }
            return null
        }).filter(item => item)
    } else return []
}

// TODO: handle duplicate activity names gracefully
export function mapActivityData(dataArray) {
    let mappedActivitiesByDate = [];
    if (dataArray && dataArray.length > 0) {
        dataArray.forEach((dataItem) => {
            mappedActivitiesByDate = combineNewActivityData(dataItem, mappedActivitiesByDate)
        })
    }
    return mappedActivitiesByDate
}

export function combineNewActivityData(newData, existingActivityData) {
    let mappedActivitiesByDate = existingActivityData

    if (newData.timesAllotted && newData.timesAllotted.length > 0) {
        newData.timesAllotted.forEach((timeItem) => {
            const dateKey = getDateLocalized(timeItem.date);
            const idx = mappedActivitiesByDate.findIndex(e => e.date === dateKey)
            /* Index is -1 if dateKey is not in array */
            if (idx !== -1) {
                mappedActivitiesByDate[idx][`${newData.name}`] = timeItem.time
            } else {
                mappedActivitiesByDate.push({
                    date: dateKey,
                    [`${newData.name}`]: timeItem.time,
                })
            }
        })
    }
    return mappedActivitiesByDate
}

function getDateLocalized(d) {
    return new Date(d).toLocaleDateString()
}