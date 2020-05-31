import React from 'react';


const TimeContent = ({Play, playAndReset, Undo, convert,count, reset, title, playPause, pause}) =>( 
    <React.Fragment>
    <div className="cont-timer">
        <h3 id="timer-label">{title}</h3>
        <span id="time-left">{convert(count)}</span>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1" />
    </div>
    <div className="cont-btn">
        <button id="start_stop" onClick={playAndReset}>{(playPause) ? pause : Play}</button>
        <button id="reset" onClick={reset}>{Undo}</button>
    </div>
    </React.Fragment>
)

 
export default TimeContent;