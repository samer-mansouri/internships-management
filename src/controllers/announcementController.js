const {
    createAnnouncement,
    getAnnouncement,
    getAnnouncementsList,
    updateAnnouncement,
    deleteAnnouncement
} = require('../services/announcementService');

const { sendResponse } = require('../helpers/responseHelper');

const addAnnouncement = async (req, res) => {
    try {
        const announcementData = req.body;
        const announcement = await createAnnouncement(announcementData);
        return sendResponse(res, 201, true, 'Announcement created successfully', announcement);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getAnnouncementById = async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcement = await getAnnouncement(announcementId);
        if (!announcement) {
            return sendResponse(res, 404, false, 'Announcement not found');
        }
        return sendResponse(res, 200, true, 'Announcement retrieved successfully', announcement);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await getAnnouncementsList();
        return sendResponse(res, 200, true, 'Announcements retrieved successfully', announcements);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const updateAnnouncementById = async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcementData = req.body;

        const updatedAnnouncement = await updateAnnouncement(announcementId, announcementData);
        return sendResponse(res, 200, true, 'Announcement updated successfully', updatedAnnouncement);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}

const removeAnnouncement = async (req, res) => {
    try {
        const announcementId = req.params.id;
        await deleteAnnouncement(announcementId);
        return sendResponse(res, 200, true, 'Announcement deleted successfully');
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
}


module.exports = {
    addAnnouncement,
    getAnnouncementById,
    getAnnouncements,
    updateAnnouncementById,
    removeAnnouncement
}
