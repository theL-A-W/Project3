import axios from 'axios';
import EventDetails from './EventDetails';
import { useAuth0 } from '@auth0/auth0-react';
import Friends from './Friend';
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

export default function UserCalendar (){
const [currentEvents, setCurrentEvents] = useState([])
const [showEventDetails, setShowEventDetails] = useState(false)
const [selectedEvent, setSelectedEvent] = useState(null)
const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/event')
      const formattedEvents = response.data.map(event => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        allDay: false, // adjust as needed based on your data
      }))
      console.log(formattedEvents)
      setCurrentEvents(formattedEvents)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }



console.log(user)
useEffect(() => {
  // Function to check or create the user
  const checkOrCreateUser = async () => {
    if (isAuthenticated && user) {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log("token", accessToken)
        // Call your API endpoint to check/create the user
        const response = await axios.post(
          'http://localhost:3001/User',
          { auth0Id: user.sub, email: user.email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userId = registerResponse.data.id;
        await axios.post('/api/sessions', { userId });
        // Handle the response
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  // Call the function
  checkOrCreateUser();
}, [isAuthenticated, getAccessTokenSilently, user]);



  useEffect(() => {
  getEvents()
}, [])

//CREATE TITLE FOR NEW EVENT
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar



    calendarApi.unselect() // clear date selection

            if (title) {
                calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
                })
            }
        }

//DATE CLICK FUNCTION
const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr) 
  
}

//CREATE EVENTS
const handleEvents = (event) => {
 
  }

//SHOW EVENTS
        // function renderEventContent(eventInfo) {
        //     return (
        //       <div className="render-event">
        // <b>{formatDate(eventInfo.event.start, { year: 'numeric', month: 'numeric', day: 'numeric' })}</b>
        // <i>{eventInfo.event.title}</i>
        //       </div>
        //     )
        //   }
        const renderEventContent = (eventInfo) => {
          // userId === currentUserId?
          return (
            <div
              className="render-event"
              onClick={() => {
                setShowEventDetails(true);
                setSelectedEvent(eventInfo.event);
              }}
            >
              <b>{formatDate(eventInfo.event.start, { year: 'numeric', month: 'numeric', day: 'numeric' })}</b>
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
                dateClick={handleDateClick}
                select={handleDateSelect}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                // you can update a remote database when these fire:
                // eventAdd={function(){}}
                // eventChange={function(){}}
                // eventRemove={function(){}}
                />

{/* EVENT DETAILS */}
                  {/* <EventDetails/> */}
                  {showEventDetails && <EventDetails event={selectedEvent}  />}

                <Friends/>

            </div>
          ) 
                }
