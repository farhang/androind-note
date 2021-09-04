import React from "react";
import "./CustomIcon.css";

function CustomIcon(props) {
    return (
        <div className={'icon'}>
            <img className={'custom-icon'} style={{'backgroundColor': props.bgColor}} src={props.image} />
            <div className={'custom-icon__text'}>{props.text}</div>
        </div>
    )
}

export default CustomIcon;
