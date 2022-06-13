export function mapRankData(dataArray) {
    // Maps DB date to local time, filters null elements
    if (dataArray && dataArray.length > 0) {
        return dataArray.map((dataItem) => {
            if (dataItem.date && dataItem.rank) {
                return getDateLocalized(dataItem)
            }
            return null
        }).filter(item => item)
    } else return []
}

export function mapActivityData(dataArray) {
    // Maps DB date to local time, filters null elements
    if (dataArray && dataArray.length > 0) {
        return dataArray.map((dataItem) => {
            if (dataItem.name && dataItem.timesAllotted) {
                return {
                    name: dataItem.name,
                    timesAllotted: dataItem.timesAllotted.map((t) => {
                        return getDateLocalized(t)
                    }).filter(item => item)
                }
            }
            return null
        }).filter(item => item)
    } else return []
}

function getDateLocalized(dataItem) {
    return ({
        ...dataItem,
        date: new Date(dataItem.date).toLocaleDateString()
    });
}