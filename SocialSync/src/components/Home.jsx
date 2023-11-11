// import Friend from './Friend'
import Calendar from './Calendar'


export default function Home (){
    return (
        
        <div className="home">
            <div className='popular-events'>
                <h2>Today's Popular Events</h2>
                <h3>Number 1 popular event --- #of likes</h3>
                <h3>Number 1 popular event --- #of likes</h3>
                <h3>Number 1 popular event --- #of likes</h3>
                {/* <Friend/> */}
            </div>
            
            <Calendar/>
        </div>
)
}