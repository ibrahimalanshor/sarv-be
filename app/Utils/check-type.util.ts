export function isNullOrUndefined(val: any, options?: { reverse: boolean }): boolean {
    const res = typeof val === 'undefined' || val === null

    return options?.reverse ? !res : res 
}