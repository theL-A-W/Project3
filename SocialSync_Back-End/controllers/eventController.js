const { Event }  = require('../models');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchEventsByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Search name is required.' });
        }

        const events = await Event.find({ title: { $regex: new RegExp(name, 'i') } });
        res.json(events);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// const getAllEvents = async (req, res) => {
//     try {
//         // Check if searchName is provided in the query parameters
//         const searchName = req.query.name;
        
//         let events;
//         if (searchName) {
//             // If searchName is provided, filter events by title
//             events = await Event.find({ title: { $regex: new RegExp(searchName, 'i') } });
//         } else {
//             // If searchName is not provided, get all events
//             events = await Event.find();
//         }

//         res.json(events);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

/////Original
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.json(events);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

async function getOneEvent(req, res) {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        if (event) {
            return res.json(event);
        }
        return res.status(404).send("Event with this id doesn't exist");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function createEvent(req, res) {
    try {
        const event = new Event(req.body);
        await event.save();
        return res.status(201).json({
            event
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function updateEvent(req, res) {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Event not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function deleteEvent(req, res) {
    try {
        const id = req.params.id;
        const event =  await Event.findByIdAndDelete(id);
        if (event) {
            return res.status(200).json(event);
        }
        throw new Error('Event not found');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = {
    getAllEvents,
    searchEventsByName,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
