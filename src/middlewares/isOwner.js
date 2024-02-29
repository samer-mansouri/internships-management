//check if the user is the owner of the resource
// const isOwner = (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const resourceId = req.params.id;
//
//         if (userId !== resourceId) {
//             return sendResponse(res, 403, false, 'You are not allowed to perform this action');
//         }
//         next();
//     } catch (error) {
//         return sendResponse(res, 500, false, error.message);
//     }
// }
//