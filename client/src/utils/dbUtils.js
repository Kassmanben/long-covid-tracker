export function dBDataToChartItems(dataArray) {
    // Maps DB date to local time, filters null elements
    if (dataArray && dataArray.length > 0) {
        return dataArray.map((dataItem) => {
            return mapDBData(dataItem)
        }).filter(item => item)
    } else return []
}

function mapDBData(dataItem) {
    if (dataItem.date && dataItem.rank) {
        return ({
            ...dataItem,
            id: dataItem._id,
            date: new Date(dataItem.date).toLocaleDateString()
        });
    } else return null
}