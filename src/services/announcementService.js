const { getRepository } = require('typeorm');
const Announcement = require('../models/Announcement');


let createAnnouncement = async (data) => {
    try {
        const announcementRepository = getRepository(Announcement);
        let announcement = announcementRepository.create(data);
        return await announcementRepository.save(announcement);
    } catch (error) {
        throw new Error(error);
    }
}

let getAnnouncement = async (id) => {
    try {
        const announcementRepository = getRepository(Announcement);
        return await announcementRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let getAnnouncementsList = async () => {
    try {
        const announcementRepository = getRepository(Announcement);
        return await announcementRepository.find();
    } catch (error) {
        throw new Error(error);
    }
}

let updateAnnouncement = async (id, data) => {
    try {
        const announcementRepository = getRepository(Announcement);
        await announcementRepository.update(id, data);
        return await announcementRepository.findOne({ where: { id } });
    } catch (error) {
        throw new Error(error);
    }
}

let deleteAnnouncement = async (id) => {
    try {
        const announcementRepository = getRepository(Announcement);
        await announcementRepository.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createAnnouncement,
    getAnnouncement,
    getAnnouncementsList,
    updateAnnouncement,
    deleteAnnouncement
};

