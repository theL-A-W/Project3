// const { Friendship }  = require('../models');

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

// async function createFriendship(req,res) {
//     try {
//         const Friendship = await new Friendship (req.body)
//         await Friendship.save()
//         return res.status(201).json({
//             Friendship
//         })
//     } catch (e) {
//         return res.status(500).json({error: e.message})
//     }
// }

// async function updateFriendship(req,res) {
//     try {
//         const id = req.params.id
//         const Friendship = await Friendship.findByIdAndUpdate(id, req.body, {new: true})
//         if (Friendship) {
//             return res.status(200).json(Friendship)
//         }
//         throw new Error('Friendship not found')
//     } catch (e) {
//         return res.status(500).json({error: e.message})
//     }
// }

// async function deleteFriendship(req,res) {
//     try {
//         const id = req.params.id
//         const Friendship =  await Friendship.findByIdAndDelete(id)
//         if (Friendship) {
//             return res.status(200).json(Friendship)
//         }
//         throw new Error('Friendship not found')
//     } catch (e) {
//         return res.status(500).json({error: e.message})
//     }
// }

// module.exports = {
//     getAllFriendships,
//     getOneFriendship,
//     createFriendship,
//     updateFriendship,
//     deleteFriendship
// }