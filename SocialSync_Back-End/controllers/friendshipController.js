const { Friendship, User }  = require('../models');

const getUserByAuth0Id = async (auth0Id) => {
  try {
      return await User.findOne({ auth0Id: auth0Id });
  } catch (error) {
      throw error;
  }
};

//Get pending friend list
const getPendingRequests = async (req, res) => {
  try {
      const auth0Id = req.params.auth0Id;
      const user = await getUserByAuth0Id(auth0Id);

      if (!user) {
          return res.status(404).send("User not found");
      }

      const userId = user._id;
      const pendingRequests = await Friendship.find({ user2: userId, status: 'pending' })
          .populate('user1', 'email');

      res.json(pendingRequests);
  } catch (error) {
      console.error('Error in getPendingRequests:', error);
      res.status(500).send("Internal Server Error");
  }
};

  
// Fetch list of friends
const getFriendsList = async (req, res) => {
  try {
      const auth0Id = req.params.auth0Id;
      const user = await getUserByAuth0Id(auth0Id);

      if (!user) {
          return res.status(404).send("User not found");
      }

      const userId = user._id;
      const friends = await Friendship.find({
          $or: [{ user1: userId }, { user2: userId }],
          status: 'accepted'
      }).populate('user1 user2', 'email');

      // Transform data to return only friend details
      const friendList = friends.map(friendship => {
          const friend = friendship.user1._id.equals(userId) ? friendship.user2 : friendship.user1;
          return { email: friend.email, _id: friend._id };
      });

      res.json(friendList);
  } catch (error) {
      console.error('Error in getFriendsList:', error);
      res.status(500).send("Internal Server Error");
  }
};

//Send Friend Reuest
  const sendFriendRequest = async (req, res) => {
      try {
          const { user1Auth0Id, user2Id } = req.body; // user1Auth0Id is Auth0 ID, user2Id is MongoDB ID
  console.log(req.body)
          // Find sender's User document using Auth0 ID
          const user1 = await User.findOne({ auth0Id: user1Auth0Id });
          if (!user1) {
              return res.status(404).send("Sender user not found.");
          }
          // Check if a friendship already exists
          const existingFriendship = await Friendship.findOne({
              $or: [
                  { user1: user1._id, user2: user2Id },
                  { user1: user2Id, user2: user1._id }
              ]
          });
  
          if (existingFriendship) {
              return res.status(400).send("Friend request already exists or users are already friends.");
          }
  console.log("user1:", user1._id, "user2:", user2Id )
          // Create new Friendship
          const newFriendship = new Friendship({
              user1: user1._id, // MongoDB ID of sender
              user2: user2Id, // MongoDB ID of receiver
              initiatedBy: user1._id
          });
  
          await newFriendship.save();
          res.status(201).send("Friend request sent.");
  
      } catch (error) {
          console.error('Error in sendFriendRequest:', error);
          res.status(500).send("Internal Server Error: " + error.message);
      }
  };
  

//Accept Request Button
  const acceptFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const userAuth0Id = req.body.userAuth0Id; // Auth0 ID of the user accepting the request

        // Find the user's MongoDB ID using their Auth0 ID
        const user = await getUserByAuth0Id(userAuth0Id);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Update the Friendship document
        const friendship = await Friendship.findOneAndUpdate(
            { _id: requestId, user2: user._id, status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        if (!friendship) {
            return res.status(404).send("Friend request not found.");
        }

        res.status(200).send("Friend request accepted.");
    } catch (error) {
        console.error('Error in acceptFriendRequest:', error);
        res.status(500).send("Internal Server Error");
    }
};

  
  // Reject request Button
  const rejectFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const userAuth0Id = req.body.userAuth0Id; // Auth0 ID of the user rejecting the request
        // Find the user's MongoDB ID using their Auth0 ID
        const user = await getUserByAuth0Id(userAuth0Id);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Delete the Friendship document
        const result = await Friendship.findOneAndDelete({ _id: requestId, user2: user._id });
        if (!result) {
            return res.status(404).send("Friend request not found or already handled.");
        }

        res.send("Friend request rejected.");
    } catch (error) {
        console.error('Error in rejectFriendRequest:', error);
        res.status(500).send("Internal Server Error");
    }
};


// const getAllFriendships = async (req, res) => {
//     try {
//         const Friendships = await Friendship.find()
//         res.json(Friendships)
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

// async function getOneFriendship(req, res) {
//     try {
//         const id = req.params.id
//         const Friendship = await Friendship.findById(id)
//         if (Friendship) {
//             return res.json(Friendship)
//         }
//         return res.status(404).send('Friendship with this id doesnt exist')
//     } catch (error) {
//         return res.status(500).send(error.message)
//     }
// }

async function createFriendship(req,res) {
    try {
        const Friendship = await new Friendship (req.body)
        await Friendship.save()
        return res.status(201).json({
            Friendship
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function updateFriendship(req,res) {
    try {
        const id = req.params.id
        const Friendship = await Friendship.findByIdAndUpdate(id, req.body, {new: true})
        if (Friendship) {
            return res.status(200).json(Friendship)
        }
        throw new Error('Friendship not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

const deleteFriendship = async (req, res) => {
    console.log(req.body)
  try {
      const { auth0Id, user2Id } = req.body.data; // Auth0Id is Auth0 ID, user2Id is MongoDB ID
console.log('user2:', user2Id)
      // Convert Auth0 ID to MongoDB User ID for user1
      const user1 = await getUserByAuth0Id(auth0Id);
      if (!user1) {
          return res.status(404).send("User1 not found.");
      }
console.log("user1:", user1._id, "user2:", user2Id)
      // Find and delete the friendship
      const result = await Friendship.findOneAndDelete({
          $or: [
              { user1: user1._id, user2: user2Id, status: 'accepted' },
              { user1: user2Id, user2: user1._id, status: 'accepted' }
          ]
      });

      if (!result) {
          return res.status(404).send("Friendship not found or already deleted.");
      }

      res.status(200).send("Friendship deleted successfully.");
  } catch (error) {
      console.error('Error in deleteFriendship:', error);
      res.status(500).send("Internal Server Error");
  }
};


module.exports = {
    acceptFriendRequest,
    sendFriendRequest,
    // getAllFriendships,
    // getOneFriendship,
    createFriendship,
    updateFriendship,
    deleteFriendship,
    getPendingRequests,
    getFriendsList,
    rejectFriendRequest
}