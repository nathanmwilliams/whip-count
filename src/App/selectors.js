import { filter } from "lodash"; 

export const getSenatorsByStatus = (allSenators) => (
    allSenators.reduce((acc, cur) => {
        const statusKey = cur.status
        if (!acc[statusKey]) {
            acc[statusKey] = [cur]
        } else {
            acc[statusKey].push(cur)
        }
        return acc;
    }, {})
)



export const getFilteredSenators = (allSenators, filterKey, filterValue) => {
    if (filterKey && filterValue) {
        return filter(allSenators, (senator) => senator[filterKey].toLowerCase() === filterValue)
    }
    return allSenators;
}