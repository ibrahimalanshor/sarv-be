export interface GetAllOptions<Context = {}> {
    sort: {
        column: string
        direction: 'asc' | 'desc'
    }
    page: {
        number: number
        size: number
    },
    filter: Record<string, any>,
    include?: string[],
    context?: Context
}

export interface StoreOptions {
    values: Record<string, any>
}

export interface GetOneOptions<Context = {}> {
    filter: Record<string, any>,
    include?: string[],
    context?: Context
}

export interface UpdateOneOptions<Context = {}> {
    filter: Record<string, any>
    values: Record<string, any>
    context?: Context
}

export interface DeleteOneOptions<Context = {}> {
    filter: Record<string, any>
    context?: Context
}