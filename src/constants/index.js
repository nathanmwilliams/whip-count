export const STATUS_TYPES = [
    "Do not consider nominee until new Congress in 2021", 
    "Consider nominee but only after Election", 
    "Consider new nominee", 
    "Not on record", 
    "Other status",
    "Unknown"
]

export const STATUS_MAP = {
    1: "Do not consider nominee until new Congress in 2021",
    2: "Consider nominee but only after Election",
    3: "Consider new nominee",
    4: "Not on record",
    5: "Other status",
    6: "Unknown"
}

export const STATUS_DISPLAY = STATUS_TYPES.map((status, index) => {
    return {
        value: index,
        text: status,
    }
})