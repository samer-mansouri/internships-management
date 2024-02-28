/**
 * Send a standardized HTTP response.
 * @param {Object} res - The response object from Express.
 * @param {number} statusCode - The HTTP status code.
 * @param {boolean} success - Indicates if the request was successful.
 * @param {Object} payload - The payload to send in the response body, typically data or error message.
 * @param {string} [message] - Optional message to include in the response.
 */
const sendResponse = (res, statusCode, success, payload, message = '') => {
    const body = { success };
  
    if (message) body.message = message;
    if (success) {
      body.data = payload;
    } else {
      body.error = payload;
    }
  
    res.status(statusCode).json(body);
};
  

module.exports = {
    sendResponse
}