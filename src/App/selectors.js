import {
    filter
} from "lodash";
import {
    STATUS_MAPPING
} from "../constants";

export const getSenatorsByStatus = (allSenators, selectedStatus) => {
    if (!selectedStatus) {
        return {}
    }

    return allSenators.reduce((acc, cur) => {
        const statusKey = cur[selectedStatus]
        if (!acc[statusKey]) {
            acc[statusKey] = [cur]
        } else {
            acc[statusKey].push(cur)
        }
        return acc;
    }, {})
}

export const getShortStatusText = (issue) => {
    if (!issue) {
        return {}
    }
    return STATUS_MAPPING[issue].shortStatus.reduce((acc, status, index) => {
        acc[index + 1] = status;
        return acc;
    }, {})
}

export const getLongStatusText = (issue) => {
    if (!issue) {
        return {}
    }
    return STATUS_MAPPING[issue].longStatus.reduce((acc, status, index, array) => {
        acc[index + 1] = status;
        return acc;
    }, {})
}

export const getStatusTypes = (issue) => {
    return STATUS_MAPPING[issue].longStatus.reduce((acc, status, index, array) => {
        acc[index + 1] = status;
        return acc;
    }, {})
}

export const getStatusDisplay = (issue) => {
    const statusDisplay = STATUS_MAPPING[issue].longStatus
        .map((status, index) => {

            return {
                value: index + 1,
                text: status,
            }
        })
        .filter((ele) => !!ele.text)
    return statusDisplay
}

export const getFilteredSenators = (allSenators, filterKey, filterValue) => {
    if (filterKey && filterValue) {
        return filter(allSenators, (senator) => {
            return senator[filterKey].toLowerCase() === filterValue.toLowerCase()
        })

    }
    return allSenators;
}