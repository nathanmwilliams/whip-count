export const STATUS_TYPES_LIST = [
    "Do not consider nominee - winner of 2020 Election should choose",
    "Consider nominee but only after Election", 
    "Not on record", 
    "Consider new nominee", 
    "Other status",
    "Unknown"
];

export const STATUS_COLORS = {
    1: "#5e3c99",
    2: "#b2abd2",
    3: "#7a7688",
    4: "#e66101",
}

export const STATUS_TYPES = STATUS_TYPES_LIST.reduce((acc, status, index, array) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_DISPLAY = STATUS_TYPES_LIST.map((status, index) => {
    return {
        value: index + 1,
        text: status,
    }
})