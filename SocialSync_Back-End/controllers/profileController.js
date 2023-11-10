const { User, Profile } = require('../models');

const getAllProfiles = async (req, res) => {
    try {
        const events = await Profile.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Helper function to get user by Auth0 ID
const getUserByAuth0Id = async (auth0Id) => {
    return await User.findOne({ auth0Id: auth0Id });
};

async function getOneProfile(req, res) {
    try {
    
        const auth0UserId = req.params.id;
        console.log("Help", auth0UserId)
        const user = await getUserByAuth0Id(auth0UserId);
        console.log(user)
        if (!user) {
            return res.status(404).send("User with the specified Auth0 ID doesn't exist");
        }
        const profile = await Profile.findOne({ userID: user._id });
        if (profile) {
            return res.json(profile);
        }
        else{
            try {
                const user = await getUserByAuth0Id(auth0UserId);
                if (!user) {
                    return res.status(404).send("User with the specified Auth0 ID doesn't exist");
                }
                const profileData = {
                    ...req.body,
                    userID: user._id,
                    firstName: req.body.firstName || '',
                    lastName: req.body.lastName || '',
                    dateOfBirth: req.body.dateOfBirth || null,
                    profileImage: req.body.profileImage || '',
                  };
              
                const profile = new Profile(profileData);
                await profile.save();
                return res.status(201).json(profile);
            } catch (e) {
                console.log(e)
                return res.status(500).json({ error: e.message });
            }
        
    }
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createProfile(req, res) {
    try {
        const auth0UserId = req.user.sub;
        const user = await getUserByAuth0Id(auth0UserId);
        if (!user) {
            return res.status(404).send("User with the specified Auth0 ID doesn't exist");
        }
        const profileData = {
            ...req.body,
            userId: user._id,
            firstName: req.body.firstName || '',
            lastName: req.body.lastName || '',
            dateOfBirth: req.body.dateOfBirth || null,
            profileImage: req.body.profileImage || '',
          };
      
        const profile = new Profile(profileData);
        await profile.save();
        return res.status(201).json(profile);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

// And similarly for updateProfile and deleteProfile:
async function updateProfile(req, res) {
    try {
        const auth0UserId = req.params.id;
        const user = await getUserByAuth0Id(auth0UserId);
        if (!user) {
            return res.status(404).send("User with the specified Auth0 ID doesn't exist");
        }
        const profile = await Profile.findOneAndUpdate({ userID: user._id }, req.body, { new: true });
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
        const auth0UserId = req.params.id;
        const user = await getUserByAuth0Id(auth0UserId);
        if (!user) {
            return res.status(404).send("User with the specified Auth0 ID doesn't exist");
        }
        const profile = await Profile.findOneAndDelete({ userID: user._id });
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
