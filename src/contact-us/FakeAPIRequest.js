/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const fakeAPIRequest = (ms) => {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve()
        }, ms)
    })
}