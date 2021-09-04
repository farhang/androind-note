import MaterialIcon from "../common/materialIcon/MaterialIcon";
import React from "react";
import logo from "../assets/images/google-play.png"
import CustomIcon from "../common/customIcon/CustomIcon";
import "./Home.css";

function Home() {
    return (
        <div className={'icons-container'}>
            <div className={'icons'}>
                <MaterialIcon text={'Clock'} bgColor={'#615BDA'} icon={'watch_later'}/>
                <CustomIcon text={'Play Store'} bgColor={'#fff'} image={logo} />
                <MaterialIcon text={'YouTube'} bgColor={'#F22927'} icon={'smart_display'}/>
                <MaterialIcon text={'Gallery'} bgColor={'#D30259'} icon={'local_florist'}/>
            </div>
            <div className={'icons'}>
                <MaterialIcon text={'Clock'} bgColor={'#615BDA'} icon={'watch_later'}/>
                <CustomIcon text={'Play Store'} bgColor={'#fff'} image={logo} />
                <MaterialIcon text={'YouTube'} bgColor={'#F22927'} icon={'smart_display'}/>
                <MaterialIcon text={'Gallery'} bgColor={'#D30259'} icon={'local_florist'}/>
            </div>

            <div className={'footer-wrapper'}>
                <div className={'footer-icons'}>
                    <MaterialIcon bgColor={'#17B76D'} icon={'call'}/>
                    <MaterialIcon bgColor={'#0192E8'} icon={'textsms'}/>
                    <MaterialIcon bgColor={'#EE2056'} icon={'camera_alt'}/>
                    <MaterialIcon bgColor={'#5D7F96'} icon={'settings'}/>
                </div>
                <div className={'footer-navigation'}>
                    <div className={"material-icons"} style={{'transform': 'rotate(90deg)'}}>dehaze</div>
                    <div className={"material-icons"}>crop_square</div>
                    <div className={"material-icons"}>navigate_before</div>
                </div>
            </div>
        </div>
    )
}

export default Home;
