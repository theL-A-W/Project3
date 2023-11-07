const { EventCategory }  = require('../models');

const getAllEventCategories = async (req, res) => {
    try {
        const eventCategories = await EventCategory.find();
        res.json(eventCategories);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneEventCategory(req, res) {
    try {
        const id = req.params.id;
        const eventCategory = await EventCategory.findById(id);
        if (eventCategory) {
            return res.json(eventCategory);
        }
        return res.status(404).send("EventCategory with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createEventCategory(req, res) {
    try {
        const eventCategory = new EventCategory(req.body);
        await eventCategory.save();
        return res.status(201).json({
            eventCategory
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateEventCategory(req, res) {
    try {
        const id = req.params.id;
        const eventCategory = await EventCategory.findByIdAndUpdate(id, req.body, { new: true });
        if (eventCategory) {
            return res.status(200).json(eventCategory);
        }
        throw new Error('EventCategory not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteEventCategory(req, res) {
    try {
        const id = req.params.id;
        const eventCategory =  await EventCategory.findByIdAndDelete(id);
        if (eventCategory) {
            return res.status(200).json(eventCategory);
        }
        throw new Error('EventCategory not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllEventCategories,
    getOneEventCategory,
    createEventCategory,
    updateEventCategory,
    deleteEventCategory
}
