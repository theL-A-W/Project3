
import { useState } from "react";

export default function EventForm (){
    const [event, setEvent] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        privacyLevel: 'public', // defaulting to public
        location: '',
        image: ''
      });
    
      // Function to handle form input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
      };
    
      // Function to handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Whatever endpoint we choose
          await axios.post('/api/events', event);
          // Here we can decide how to update the state or the calendar
        } catch (error) {
          console.error("Error creating event:", error);
        }
      }; 
    return (
        <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={event.title} onChange={handleChange} required/>
        <textarea name="description" value={event.description} onChange={handleChange} />
        <input type="datetime-local" name="startDate" value={event.startDate} onChange={handleChange} required />
        <input type="datetime-local" name="endDate" value={event.endDate} onChange={handleChange} required />
        <select name="privacyLevel" value={event.privacyLevel} onChange={handleChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friendsOnly">Friends Only</option>
        </select>
        <input type="text" name="location" value={event.location} onChange={handleChange} />
        <input type="text" name="image" value={event.image} onChange={handleChange} />
        <button type="submit">Create Event</button>
      </form>
    );
  };
  