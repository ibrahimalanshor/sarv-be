export interface TaskOverview {
    countAll: number
    countDone: number
    countInProgress: number
    countActive: number
}

export interface GetTaskOverviewOptions {
    filter?: Record<string, any>
}