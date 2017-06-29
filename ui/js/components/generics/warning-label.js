import React from 'react';

export default (props) => {

    const cssClass = props.big ? 'btn' : 'label';
    const cssString = `${cssClass} ${cssClass}-${props.type}`;

    return (
        <span className="warning-label">
            <span className={cssString} >
                {props.txt}
            </span>
        </span>
    )
}