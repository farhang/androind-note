import './LockScreen.css';

function LockScreen() {
    const currentDate = new Date();
    const currentHour  = ('0' + currentDate.getHours()).substr(-2);
    const currentMinute = ('0' + currentDate.getMinutes()).slice(-2);
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'long' };
    return (
        <section>
            <div className="time font-thin">{currentHour}:{currentMinute}</div>
            <div className="date">{currentDate.toLocaleDateString("en-US", dateOptions)}</div>
        </section>)
}

export default LockScreen;
