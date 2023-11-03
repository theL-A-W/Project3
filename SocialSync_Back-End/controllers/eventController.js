const { Event }  = require('../models');

const getAllEvents = async (req, res) => {
    try {
        const Events = await Event.find()
        res.json(Events)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneEvent(req, res) {
    try {
        const id = req.params.id
        const Event = await Event.findById(id)
        if (Event) {
            return res.json(Event)
        }
        return res.status(404).send('Event with this id doesnt exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createEvent(req,res) {
    try {
        const Event = await new Event (req.body)
        await Event.save()
        return res.status(201).json({
            Event
        })
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function updateEvent(req,res) {
    try {
        const id = req.params.id
        const Event = await Event.findByIdAndUpdate(id, req.body, {new: true})
        if (Event) {
            return res.status(200).json(Event)
        }
        throw new Error('Event not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

async function deleteEvent(req,res) {
    try {
        const id = req.params.id
        const Event =  await Event.findByIdAndDelete(id)
        if (Event) {
            return res.status(200).json(Event)
        }
        throw new Error('Event not found')
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

module.exports = {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent
}