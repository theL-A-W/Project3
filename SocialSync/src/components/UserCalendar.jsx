
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { formatDate } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from "react"

export default function UserCalendar (){
const [currentEvents, setCurrentEvents] = useState([])



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
const handleEvents = (events) => {
    setCurrentEvents(events)
  }

//SHOW EVENTS
        function renderEventContent(event) {
            return (
              <>
                <li key={event.id}>
                <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
                <i>{event.title}</i>
                </li>
              </>
            )
          }
        

          


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
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                select={handleDateSelect}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                // you can update a remote database when these fire:
                // eventAdd={function(){}}
                // eventChange={function(){}}
                // eventRemove={function(){}}
                />
            </div>
          ) 
        }





