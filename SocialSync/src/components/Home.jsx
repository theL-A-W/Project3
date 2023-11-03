import Friend from './Friend'


export default function Home (){
    return (
        
        <div className="home">
            <div className='popular-events'>
                <h2>Today's Popular Events</h2>
                <h3>Number 1 popular event --- #of likes</h3>
                <h3>Number 1 popular event --- #of likes</h3>
                <h3>Number 1 popular event --- #of likes</h3>
            </div>
            <Friend/>
            <div className='calendar-box'>
                <h1 className='calendar-itm'>This is the Calendar</h1>
            </div>
        </div>
)
}