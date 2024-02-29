const { sendResponse } = require('../helpers/responseHelper');

const {
    validateUser,
    initializeUser,
    extractUserDataFromRequest,
    verifyEmailAddresUniqueness,
    assignModelBasedOnRole
} = require('../helpers/authHelper');

const {
    createUser,
    getUser,
    // saveUserRefreshToken,
    // checkForUserRefreshTokenAndRemoveIt,
    // getUserWithIdAndRefreshToken,
    updateUserRelatedRoleId,
    returnUserWithItsRelatedRole
} = require('../services/authService');

const {
    hashPassword,
    comparePassword
} = require('../helpers/encryptionHelper');

const {
    generateAccessToken,
    // generateRefreshToken,
    // isTokenExpired,
    // verifyToken
} = require('../helpers/tokenHelper');

const signupUser = async (req, res) => {
    try {
        const userData = extractUserDataFromRequest(req);
        const { error } = validateUser(userData);
        if (error) {
            return sendResponse(res, 400, false, error.details[0].message);
        }

        const isEmailUnique = await verifyEmailAddresUniqueness(userData.email);
        if (!isEmailUnique) {
            return sendResponse(res, 400, false, 'Email already exists');
        }

        // Initialize user and hash password directly in the object to avoid re-assignment
        let user = {
            ...initializeUser(userData),
            password: await hashPassword(userData.password)
        };

        user = await createUser(user);

        // Simplify role handling and assignment model creation
        if (user.role !== "admin") {
            const assignedModel = await assignModelBasedOnRole(user.role, user.id);
            console.log(assignedModel);

            // Only update the user if an assigned model is created
            if (assignedModel) {
                user = await updateUserRelatedRoleId(user.id, assignedModel.id);
            }
        }

        user = await returnUserWithItsRelatedRole(user.id, user.role);
        delete user.password; // Ensure password is not returned

        return sendResponse(res, 201, true, 'User created successfully', user);
    } catch (err) {
        console.error(err); // Use console.error for errors
        return res.status(500).send({"Error": "Internal Server Error"});
    }
};

let loginUser = async (req, res) => {
    try {
        let user = await getUser(req.body.email);
        if (!user) {
            return sendResponse(res, 400, false, 'Invalid email or password');
        }

        const validPassword = await comparePassword(req.body.password, user.password);
        if (!validPassword) {
            return sendResponse(res, 400, false, 'Invalid email or password');
        }

        const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(user);

        // user = await saveUserRefreshToken(user._id, refreshToken);

        return sendResponse(res, 200, true, { accessToken }, 'User logged in successfully');
    } catch (err) {
        console.log(err)
        res.status(500).send({"Error": "Internal Server Error"})
    }
}


// let logoutUser = async (req, res) => {
//     try {
//         const user = req.user;
//         const refreshToken = req.body.refreshToken;

//         console.log(user._id, refreshToken)

//         let t = await checkForUserRefreshTokenAndRemoveIt(user._id, refreshToken);
//         console.log(t)

//         return sendResponse(res, 200, true, null, 'User logged out successfully');
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({"Error": "Internal Server Error"})
//     }
// }


// let handleRefreshAccessToken = async (req, res) => {
//     try {
//         const refreshToken = req.body.refreshToken;

//         if (!refreshToken) {
//             return sendResponse(res, 400, false, 'Refresh token is required');
//         }

//         if (isTokenExpired(refreshToken)) {
//             return sendResponse(res, 400, false, 'Refresh token has expired');
//         }

//         const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//         const user = decoded.UserInfo;

//         const userWithToken = await getUserWithIdAndRefreshToken(user._id, refreshToken);
//         if (!userWithToken) {
//             return sendResponse(res, 400, false, 'Invalid refresh token');
//         }

//         const accessToken = generateAccessToken(userWithToken);

//         return sendResponse(res, 200, true, { accessToken }, 'Access token refreshed successfully');
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({"Error": "Internal Server Error"})
//     }
// }

let testIsAdmin = async (req, res) => {
    return sendResponse(res, 200, true, null, 'User is admin');
}

let testIsFormer = async (req, res) => {
    return sendResponse(res, 200, true, null, 'User is former');
}




module.exports = {
    signupUser,
    loginUser,
    // logoutUser,
    // handleRefreshAccessToken,
    testIsAdmin,
    testIsFormer
}