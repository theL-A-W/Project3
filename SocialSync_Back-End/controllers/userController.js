const { User }  = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneUser(req, res) {
    try {
        const id = req.params.id
        const User = await User.findById(id)
        if (User) {
            return res.json(User)
        }
        return res.status(404).send('User with this id doesnt exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createUser(req,res) {
    try {
        const User = await new User (req.body)
        await User.save()
        return res.status(201).json({
            User
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function updateUser(req,res) {
    try {
        const id = req.params.id
        const User = await User.findByIdAndUpdate(id, req.body, {new: true})
        if (User) {
            return res.status(200).json(User)
        }
        throw new Error('User not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function deleteUser(req,res) {
    try {
        const id = req.params.id
        const User =  await User.findByIdAndDelete(id)
        if (User) {
            return res.status(200).json(User)
        }
        throw new Error('User not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}