import React from "react";
import "./MaterialIcon.css"
function MaterialIcon(props) {
    return(
        <div className={'icon'}>
            <div className={"material-icons material-icon"} style={{'backgroundColor': props.bgColor}}>{props.icon}</div>
            {props.text && <div className={'material-icon__text'}>{props.text}</div>}
        </div>
    );
}

export default MaterialIcon;

