import React from 'react';


const LengthContent = ({ArrowUp, ArrowDown, session, breakLength, onClickBreak, onClickSession, playPause}) => (
    <React.Fragment> 
    <div className="cont-break">
        <h3 id="break-label">Break Length</h3>
        <div className="cont-btn-break">
            <button  id="break-decrement" onClick={onClickBreak}>{ArrowDown}</button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment"  onClick={onClickBreak}>{ArrowUp}</button>
        </div>
    </div>
    <div className="cont-session">
        <h3 id="session-label">Session Length</h3>
        <div className="cont-btn-session">
            <button id="session-decrement" onClick={onClickSession}>{ArrowDown}</button>
            <span id="session-length">{session}</span>
            <button id="session-increment" onClick={onClickSession}>{ArrowUp}</button>
        </div>   
    </div>
    </React.Fragment>
)

 
export default LengthContent;