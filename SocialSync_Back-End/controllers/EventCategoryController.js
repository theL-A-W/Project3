const { EventCategory }  = require('../models');

const getAllEventCategories = async (req, res) => {
    try {
        const EventCategories = await EventCategory.find()
        res.json(EventCategories)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneEventCategory(req, res) {
    try {
        const id = req.params.id
        const EventCategory = await EventCategory.findById(id)
        if (EventCategory) {
            return res.json(EventCategory)
        }
        return res.status(404).send('EventCategory with this id doesnt exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createEventCategory(req,res) {
    try {
        const EventCategory = await new EventCategory (req.body)
        await EventCategory.save()
        return res.status(201).json({
            EventCategory
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function updateEventCategory(req,res) {
    try {
        const id = req.params.id
        const EventCategory = await EventCategory.findByIdAndUpdate(id, req.body, {new: true})
        if (EventCategory) {
            return res.status(200).json(EventCategory)
        }
        throw new Error('EventCategory not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function deleteEventCategory(req,res) {
    try {
        const id = req.params.id
        const EventCategory =  await EventCategory.findByIdAndDelete(id)
        if (EventCategory) {
            return res.status(200).json(EventCategory)
        }
        throw new Error('EventCategory not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

module.exports = {
    getAllEventCategories,
    getOneEventCategory,
    createEventCategory,
    updateEventCategory,
    deleteEventCategory
}