import { filter } from "lodash"; 
import { STATUS_TO_SHOW } from "../constants";

export const getSenatorsByStatus = (allSenators) => (
    allSenators.reduce((acc, cur) => {
        const statusKey = cur[STATUS_TO_SHOW]
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
        return filter(allSenators, (senator) => {
            return senator[filterKey].toLowerCase() === filterValue.toLowerCase()
        })
        
    }
    return allSenators;
}