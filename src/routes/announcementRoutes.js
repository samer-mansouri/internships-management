const express = require('express');
var router = express.Router();

const  {
    addAnnouncement,
    getAnnouncementById,
    getAnnouncements,
    updateAnnouncementById,
    removeAnnouncement
} = require('../controllers/announcementController');

router.post(`/announcements`, addAnnouncement);
router.get(`/announcements/:id`, getAnnouncementById);
router.get(`/announcements`, getAnnouncements);
router.put(`/announcements/:id`, updateAnnouncementById);
router.delete(`/announcements/:id`, removeAnnouncement);

module.exports = router;