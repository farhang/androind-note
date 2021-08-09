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
    const [footerIconMove, setFooterIconMove] = useState({});
    let currentStatus = '';
    let timeDistance = 0;
    let [x1, x2, y1, y2] = [0,0,0,0];
    var x;

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
        x = event.touches[0].clientX;
        currentStatus = 'start;'
        x1 =  event.touches[0].clientX;
        y1 =  event.touches[0].clientY;
        timeDistance = event.timeStamp;
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
            const distance = calculateDistance(x1, y1, x2, y2);
            const dateTimeOpacity = distance > 100 ? 0 : 1 - (distance * 0.01).toFixed(2);
            const dateTimeMoveDistance = (distance > 100 ? -100 :  -distance) / 2;
            const dateTimeXScale = distance * 0.01 <= .5  ? 1 + ((distance * 0.01 / 6)) : 1.08;
            // console.log(dateTimeMoveDistance);
            moveDateTime(dateTimeOpacity, dateTimeMoveDistance, dateTimeXScale);
            moveIcons(distance);
            // console.log('calculatedDistance', calculatedDistance)
            eventBus.dispatch("DistanceCalculated", { distance})
        }
    }

    const handleGestureEnd =  (event) => {
        x2 = event.changedTouches[0].clientX;
        y2 = event.changedTouches[0].clientY;
        const distance = calculateDistance(x1, y1, x2, y2);
        eventBus.dispatch("touchStatus", { status: 'end', distance});
        swapSwipeText(1);
        moveDateTime(1, 0);
        moveIcons( 0);
    }


    const swapSwipeText = (opacity) => {
        setSwipeTextStyles({opacity})
    }

    const moveDateTime = (opacity, move, scale = 1) => {
        setDateTimeStyles({opacity, transform: `translate(0, ${move}px) scaleX(${scale})`});
    }

    const moveIcons = ( move) => {
        setFooterIconMove(move);
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
                    <span style={{transform: `translate(${-footerIconMove}px, ${footerIconMove}px)`}}  className="material-icons footer-inner__item">photo_camera</span>
                    <span style={{transform: `translate(${footerIconMove}px, ${footerIconMove}px)`}} className="footer-inner__item"><span className={"footer-inner__item--phone material-icons"}>call</span></span>
                </div>
            </footer>
        </section>

    )
}


export default LockScreen;
