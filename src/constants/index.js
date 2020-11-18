
const ELECTION_STATUS_KEY = "electionAcknowledgmentStatus";
const SCOTUS_STATUS_KEY = "status";
const NOMINEE_STATUS_KEY = "nomineeStatus";
export const STATUS_TO_SHOW = ELECTION_STATUS_KEY;

const ELECTION_STATUS_TYPE_LIST = [
    "Acknowledges President-Elect Biden",
    "Calls to begin transition processes",
    "Calls for Biden to receive Security Briefings",
    "No comment or vague comments",
    "Challenging or disputing election results"
]

const SHORT_ELECTION_STATUS_TYPE_LIST = [
    "Acknowledges President-Elect Biden",
    "Calls for transition processes",
    "Calls for security briefings",
    "No comment or vague comments",
    "Disputing election results"
]

const STATUS_TYPES_LIST = [
    "Do not consider nominee - winner of 2020 Election should choose",
    "Consider nominee but only after Election",
    "Not on record",
    "Consider new nominee",
    "Other status",
    "Unknown"
];

const NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against confirmation",
    "Leaning against confirmation",
    "Undecided or unknown",
    "Leaning to confirm",
    "Will vote to confirm",
]
const SHORT_NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against Barrett",
    "Leaning against",
    "Undecided or unknown",
    "Leaning to confirm",
    "Will confirm Barrett",
];

const SHORT_STATUS_TYPES_LIST = [
    "Wait until 2021",
    "Wait until after election",
    "Not yet on record",
    "Consider nominee now",
    "Other",
    "Unknown"
];

const STATUS_MAPPING = {
    [ELECTION_STATUS_KEY]: {
        shortStatus: SHORT_ELECTION_STATUS_TYPE_LIST,
        longStatus: ELECTION_STATUS_TYPE_LIST
    },
    [NOMINEE_STATUS_KEY]: {
        shortStatus: SHORT_NOMINEE_STATUS_TYPES_LIST,
        longStatus: NOMINEE_STATUS_TYPES_LIST
    },
    [SCOTUS_STATUS_KEY]:{
        shortStatus: SHORT_STATUS_TYPES_LIST,
        longStatus: STATUS_TYPES_LIST
    }
}

const DARK_PURPLE = "#542788"
const MED_PURPLE = "#998ec3"
const LIGHT_PURPLE = "#c8afdf";
const GRAY = "#c3c3c3"
const LIGHT_ORANGE = "#fee0b6"
const MED_ORANGE = "#f1a340"
const DARK_ORANGE = "#e66101"

export const STATUS_COLORS = {
    1: DARK_PURPLE,
    2: MED_PURPLE,
    3: LIGHT_PURPLE,
    4: GRAY,
    5: DARK_ORANGE,
}

export const STATUS_COLORS_PROGRESS = {
    1: DARK_PURPLE,
    2: MED_PURPLE,
    3: LIGHT_PURPLE,
    4: GRAY,
    5: DARK_ORANGE,
}

export const SHORT_STATUS_TYPES = STATUS_MAPPING[STATUS_TO_SHOW].shortStatus.reduce((acc, status, index) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_TYPES = STATUS_MAPPING[STATUS_TO_SHOW].longStatus.reduce((acc, status, index, array) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_DISPLAY = STATUS_MAPPING[STATUS_TO_SHOW].longStatus.map((status, index) => {
    return {
        value: index + 1,
        text: status,
    }
})