import './LockScreen.css';
import {useState, useEffect} from "react";
import eventBus from "../common/Eventbus";

function LockScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentHour, setCurrentHour] = useState('');
    const [currentMinute, setCurrentMinute] = useState('');
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'long' };
    const [swipeTextStyles, setSwipeTextStyles] = useState({});
    const [dateTimeStyles, setDateTimeStyles] = useState({});
    let currentStatus = '';
    let timeDistance = 0;
    let [x1, x2, y1, y2] = [0,0,0,0];

    useEffect(() => {
        handleDate();
        setInterval(handleDate, 1000);
        handleTouch();
    }, []);

    const handleTouch = () => {
        const body = document.querySelector('body');
        body.addEventListener('touchstart', handleGestureStart, false);
        body.addEventListener('touchmove', handleGestureMove, false);
        body.addEventListener('touchend', handleGestureEnd, false);
    }

    const handleGestureStart =  (event) => {
        currentStatus = 'start;'
        x1 =  event.touches[0].clientX;
        y1 =  event.touches[0].clientY;
        timeDistance = event.timeStamp;
        console.log('start', event.touches[0].clientX);
        eventBus.dispatch("touchStatus", { status: 'start'});
        swapSwipeText( 0);
    }

    const handleGestureMove =  (event) => {
        if (currentStatus !== 'move') {
            currentStatus = 'move';
            eventBus.dispatch("touchStatus", { status: 'move'})
        }
        //console.log('move', event.timeStamp);
        if(event.timeStamp - timeDistance > 50) {
            timeDistance = event.timeStamp;
            x2 = event.touches[0].clientX;
            y2 = event.touches[0].clientY;
            const calculatedDistance = calculateDistance(x1, y1, x2, y2);
            const dateTimeOpacity = calculatedDistance > 100 ? 0 : 1 - (calculatedDistance * 0.01).toFixed(2);
            const dateTimeMoveDistance = (calculatedDistance > 100 ? -100 :  -calculatedDistance) / 2;
            const dateTimeXScale = calculatedDistance * 0.01 <= .5  ? 1 + ((calculatedDistance * 0.01 / 6)) : 1.08;
            // console.log(dateTimeMoveDistance);
            moveDateTime(dateTimeOpacity, dateTimeMoveDistance, dateTimeXScale);
            eventBus.dispatch("DistanceCalculated", { value: calculatedDistance})
        }
    }

    const swapSwipeText = (opacity) => {
        setSwipeTextStyles({opacity})
    }

    const moveDateTime = (opacity, move, scale = 1) => {
        setDateTimeStyles({opacity, transform: `translate(0, ${move}px) scaleX(${scale})`});
    }

    const handleGestureEnd =  (event) => {
        eventBus.dispatch("touchStatus", { status: 'end'});
        swapSwipeText(1);
        moveDateTime(1, 0);
    }

    const calculateDistance = (cx1, cy1, cx2, cy2) => {
        const a = cx1 - cx2;
        const b = cy1 - cy2;
        return Math.sqrt( a * a + b * b );
    }

    const handleDate = () => {
        setCurrentDate(new Date());
        setCurrentHour(('0' + currentDate.getHours().toString()).slice(-2));
        setCurrentMinute(('0' + currentDate.getMinutes().toString()).slice(-2));
    }

    return (
        <section id="lock-screen">
            <div className="date-time-container" style={dateTimeStyles}>
                <div className="time font-thin">{currentHour}:{currentMinute}</div>
                <div className="date">{currentDate.toLocaleDateString("en-US", dateOptions)}</div>
            </div>
            <footer className={"footer"}>
                <div style={swipeTextStyles} className={"footer-header font-regular"}>
                    <span>Swipe to open</span>
                </div>
                <div className={"footer-inner"}>
                    <span className="material-icons footer-inner__item">photo_camera</span>
                    <span className="footer-inner__item"><span className={"footer-inner__item--phone material-icons"}>call</span></span>
                </div>
            </footer>
        </section>

    )
}


export default LockScreen;
