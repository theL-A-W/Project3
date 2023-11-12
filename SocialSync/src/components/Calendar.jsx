import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { formatDate } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from "react"
import EventDetails from './EventDetails'
import axios from 'axios'

export default function Calendar (){
const [currentEvents, setCurrentEvents] = useState([])
const [showEventDetails, setShowEventDetails] = useState(false)
const [selectedEvent, setSelectedEvent] = useState(null)

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/event')
      const formattedEvents = response.data.map(event => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
      }))
      console.log(formattedEvents)
      setCurrentEvents(formattedEvents)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
  getEvents()
}, [])








//CREATE EVENTS
const handleEvents = (event) => {
 
  }

        const renderEventContent = (eventInfo, formattedEvents) => {
          return (
            <div
              className="render-event"
              onClick={() => {
                setShowEventDetails(true);
                console.log(eventInfo.event.title)
                console.log(formattedEvents)
                console.log(eventInfo.event.id)
                console.log(eventInfo.event.start)
                console.log(eventInfo.event.end)
                setSelectedEvent(eventInfo.event);
              }}
            >
              <i>{eventInfo.event.title}</i>
            </div>
          )
        }


{/* CALENDAR */}
        return (
            <div className='calendar'>
                <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrap5Plugin ]}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay,today',
                    center: 'title',
                    right: 'prev,next'
                  }}
                themeSystem='bootstrap5'
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={currentEvents}
                eventContent={renderEventContent}
                select={(selectInfo) => handleDateSelect(selectInfo, selectedEvent)}
                eventsSet={handleEvents}
                />
{/* EVENT DETAILS */}
                  {/* <EventDetails/> */}
                  {showEventDetails && <EventDetails event={selectedEvent}  />}
            </div>
          ) 
        }





