export const todoStatus = {
    "OPEN": {
        displayText: "New",
        jsonValue: "OPEN",
        hasNexStatus: true,
        nextStatus: "IN_PROGRESS"
    },
    "IN_PROGRESS": {
        displayText: "Doing",
        jsonValue: "IN_PROGRESS",
        hasNexStatus: true,
        nextStatus: "DONE"
    },
    "DONE": {
        displayText: "Done",
        jsonValue: "DONE",
        hasNexStatus: false,
        nextStatus: "DONE"
    }
} as const

export type ServerStatus = "OPEN" | "IN_PROGRESS" | "DONE";
// export type SingleStatus = {
//     displayText: string,
//     jsonValue: ServerStatus,
//     hasNextStatus: boolean,
//     nextStatus: ServerStatus
// }
export type SingleStatus = typeof todoStatus[ServerStatus]