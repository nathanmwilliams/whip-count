export const STATUS_TYPES_LIST = [
    "Do not consider nominee - winner of 2020 Election should choose",
    "Consider nominee but only after Election",
    "Not on record",
    "Consider new nominee",
    "Other status",
    "Unknown"
];

export const NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against confirmation",
    "Leaning against confirmation",
    "Undecided or not on record",
    "Leaning to confirm",
    "Will vote to confirm",
]
export const SHORT_NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against Barrett",
    "Leaning against",
    "Not yet on record",
    "Leaning to confirm",
    "Will confirm Barrett",
];

export const SHORT_STATUS_TYPES_LIST = [
    "Wait until 2021",
    "Wait until after election",
    "Not yet on record",
    "Consider nominee now",
    "Other",
    "Unknown"
];


export const STATUS_COLORS = {
    1: "#5e3c99",
    2: "#af90ea",
    3: "#c3c3c3",
    4: "#fdb863",
    5: "#e66101",
}

export const STATUS_COLORS_PROGRESS = {
    1: "#5e3c99",
    2: "#af90ea",
    3: "#c3c3c3",
    4: "#fdb863",
    5: "#e66101",
}

export const SHORT_STATUS_TYPES = SHORT_NOMINEE_STATUS_TYPES_LIST.reduce((acc, status, index) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_TYPES = NOMINEE_STATUS_TYPES_LIST.reduce((acc, status, index, array) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_DISPLAY = NOMINEE_STATUS_TYPES_LIST.map((status, index) => {
    return {
        value: index + 1,
        text: status,
    }
})