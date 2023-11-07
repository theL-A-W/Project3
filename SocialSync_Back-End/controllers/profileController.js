const { Profile } = require('../models');

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneProfile(req, res) {
    try {
        const id = req.params.id;
        const profile = await Profile.findById(id);
        if (profile) {
            return res.json(profile);
        }
        return res.status(404).send("Profile with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createProfile(req, res) {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        return res.status(201).json({
            profile
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateProfile(req, res) {
    try {
        const id = req.params.id;
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (profile) {
            return res.status(200).json(profile);
        }
        throw new Error('Profile not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteProfile(req, res) {
    try {
        const id = req.params.id;
        const profile = await Profile.findByIdAndDelete(id);
        if (profile) {
            return res.status(200).json(profile);
        }
        throw new Error('Profile not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllProfiles,
    getOneProfile,
    createProfile,
    updateProfile,
    deleteProfile
}
