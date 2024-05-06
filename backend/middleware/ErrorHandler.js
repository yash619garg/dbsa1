const asyncHandler = (fn) => (req, res, next) => {

    Promise.resolve(fn(req, res, next)).catch((error) => {
        return res.json({ error: error.message })
    });
}

// export default asyncHandler;

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);

//     } catch (error) {
//         return res.json({ error: error.message })
//     }
// }

export default asyncHandler;