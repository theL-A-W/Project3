const { Profile }  = require('../models');

const getAllProfiles = async (req, res) => {
    try {
        const Profiles = await Profile.find()
        res.json(Profiles)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneProfile(req, res) {
    try {
        const id = req.params.id
        const Profile = await Profile.findById(id)
        if (Profile) {
            return res.json(Profile)
        }
        return res.status(404).send('Profile with this id doesnt exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createProfile(req,res) {
    try {
        const Profile = await new Profile (req.body)
        await Profile.save()
        return res.status(201).json({
            Profile
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function updateProfile(req,res) {
    try {
        const id = req.params.id
        const Profile = await Profile.findByIdAndUpdate(id, req.body, {new: true})
        if (Profile) {
            return res.status(200).json(Profile)
        }
        throw new Error('Profile not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function deleteProfile(req,res) {
    try {
        const id = req.params.id
        const Profile =  await Profile.findByIdAndDelete(id)
        if (Profile) {
            return res.status(200).json(Profile)
        }
        throw new Error('Profile not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

module.exports = {
    getAllProfiles,
    getOneProfile,
    createProfile,
    updateProfile,
    deleteProfile
}