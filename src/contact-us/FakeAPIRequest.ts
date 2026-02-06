/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const fakeAPIRequest = (ms: number): Promise<void> => {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve()
        }, ms)
    })
}