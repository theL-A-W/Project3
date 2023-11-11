const { User }  = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Function to get user by Auth0 ID
const getUserByAuth0Id = async (auth0Id) => {
    try {
      const user = await User.findOne({ auth0Id: auth0Id });
      return user;
    } catch (error) {
      throw error;
    }
  };

// Controller for the route
const getUserWithAuth0Id = async (req, res) => {
    try {
      const auth0Id = req.params.auth0Id;
      const user = await getUserByAuth0Id(auth0Id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send back the user's ObjectId
      res.json({ _id: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

async function getOneUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.json(user);
        }
        return res.status(404).send("User with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Create User
async function createUser(req, res) {
    try {
        const { auth0Id, email } = req.body; // Adjust according to the actual properties sent in the request

        let user = await User.findOne({ auth0Id: auth0Id });

        if (!user) {
            // If the user doesn't exist, create a new one
            // You might want to ensure that only the fields you want to be set from the request are copied over
            const userData = {
                auth0Id: auth0Id,
                email: email,
                // Copy over other fields you want to initialize from the request
            };
            user = new User(userData);
            await user.save();
            return res.status(201).json(user);
        } else {
            // If user already exists, respond accordingly
            return res.status(409).json({
                message: "User already exists",
                user
            });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}



async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
            return res.status(200).json(user);
        }
        throw new Error('User not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            return res.status(200).json(user);
        }
        throw new Error('User not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getUserWithAuth0Id
}
