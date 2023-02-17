export const todoStatus = {
    "OPEN": {
        displayText: "New",
        jsonValue: "OPEN",
        nextStatus: "IN_PROGRESS"
    },
    "IN_PROGRESS": {
        displayText: "Doing",
        jsonValue: "IN_PROGRESS",
        nextStatus: "DONE"
    },
     "DONE": {
        displayText: "Done",
        jsonValue: "DONE",
        nextStatus: null
    }
} as const


export type SingleStatus = typeof todoStatus["OPEN" | "IN_PROGRESS" | "DONE"]