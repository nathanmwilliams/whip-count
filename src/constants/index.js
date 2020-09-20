export const STATUS_TYPES = [
    "1. Do not consider nominee until new Congress in 2021", 
    "2. Consider nominee but only after Election", 
    "3. Consider new nominee", 
    "4. Not on record", 
    "5. Other status",
]

export const STATUS_MAP = {
    1: "Do not consider nominee until new Congress in 2021",
    2: "Consider nominee but only after Election",
    3: "Consider new nominee",
    4: "Not on record",
    5: "Other status",
}

export const STATUS_DISPLAY = STATUS_TYPES.map((status) => {
    return {
        value: status.split('. ')[0],
        text: status.split('. ')[1],
    }
})