import './LockScreen.css';
import {useState, useEffect} from "react";
import eventBus from "../common/Eventbus";

function LockScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentHour, setCurrentHour] = useState('');
    const [currentMinute, setCurrentMinute] = useState('');
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'long' };
    let [x1, x2, y1, y2] = [0,0,0,0];
    let touch = document.querySelector('#touch');

    useEffect(() => {
        handleDate();
        setInterval(handleDate, 1000);
        handleTouch();
    }, []);

    const handleTouch = () => {
        const body = document.querySelector('body');
        touch = document.querySelector('#touch');
        body.addEventListener('touchstart', handleGestureStart, false);
        body.addEventListener('touchmove', handleGestureMove, {passive: true});
        body.addEventListener('touchend', handleGestureEnd, false);
    }

    const handleGestureStart =  (event) => {
        touch.innerHTML = 'start';
        x1 =  event.touches[0].clientX;
        y1 =  event.touches[0].clientY;
        console.log('start', event.touches[0].clientX)
        eventBus.dispatch("touchStatus", { status: 'start'})
    }

    const handleGestureMove =  (event) => {
        touch.innerHTML = 'move';
        x2 =  event.touches[0].clientX;
        y2 =  event.touches[0].clientY;
        eventBus.dispatch("DistanceCalculated", { value: calculateDistance(x1, y1, x2, y2)})
        eventBus.dispatch("touchStatus", { status: 'move'})
    }

    const calculateDistance = (cx1, cy1, cx2, cy2) => {
        const a = cx1 - cx2;
        const b = cy1 - cy2;
        return Math.sqrt( a * a + b * b );
    }

    const handleGestureEnd =  (event) => {
        eventBus.dispatch("touchStatus", { status: 'end'})
        touch.innerHTML = 'end';
        console.log('end', event);
    }


    const handleDate = () => {
        setCurrentDate(new Date());
        setCurrentHour(('0' + currentDate.getHours().toString()).slice(-2));
        setCurrentMinute(('0' + currentDate.getMinutes().toString()).slice(-2));
    }

    return (
        <section id="lock-screen">
            <div className="time font-thin">{currentHour}:{currentMinute}</div>
            <div className="date">{currentDate.toLocaleDateString("en-US", dateOptions)}</div>

            <footer className={"footer"}>
                <div className={"footer-header font-regular"}>
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
