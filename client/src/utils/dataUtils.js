export function dbDataToChartItem(dataItem) {
    return ({
        ...dataItem,
        id: dataItem._id,
        date: new Date(dataItem.date).toLocaleDateString()
    });
}