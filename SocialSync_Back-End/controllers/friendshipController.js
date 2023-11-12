const { Friendship }  = require('../models');

const sendFriendRequest = async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      const existingFriendship = await Friendship.findOne({
        $or: [
          { user1: userId, user2: friendId },
          { user1: friendId, user2: userId }
        ]
      });
  
      if (existingFriendship) {
        return res.status(400).send("Friend request already exists or users are already friends.");
      }
  
      const newFriendship = new Friendship({
        user1: userId,
        user2: friendId,
        initiatedBy: userId
      });
  
      await newFriendship.save();
      res.status(201).send("Friend request sent.");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const acceptFriendRequest = async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      const friendship = await Friendship.findOneAndUpdate(
        { user1: friendId, user2: userId, status: 'pending' },
        { status: 'accepted' },
        { new: true }
      );
  
      if (!friendship) {
        return res.status(404).send("Friend request not found.");
      }
  
      res.status(200).send("Friend request accepted.");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

const getAllFriendships = async (req, res) => {
    try {
        const Friendships = await Friendship.find()
        res.json(Friendships)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneFriendship(req, res) {
    try {
        const id = req.params.id
        const Friendship = await Friendship.findById(id)
        if (Friendship) {
            return res.json(Friendship)
        }
        return res.status(404).send('Friendship with this id doesnt exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

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

async function deleteFriendship(req,res) {
    try {
        const id = req.params.id
        const Friendship =  await Friendship.findByIdAndDelete(id)
        if (Friendship) {
            return res.status(200).json(Friendship)
        }
        throw new Error('Friendship not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

module.exports = {
    acceptFriendRequest,
    sendFriendRequest,
    getAllFriendships,
    getOneFriendship,
    createFriendship,
    updateFriendship,
    deleteFriendship
}