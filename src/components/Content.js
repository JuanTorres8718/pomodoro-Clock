import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import TimeContent from './TimeContent';
import LengthContent from './LengthContent';
import '../styles/Content.css'

class Content extends Component {
    constructor(props) {
        super(props);
        this.loop = undefined;
    }

    state = {
        session: 25,
        breakLength: 5,
        count: 25*60,
        titleTimer: 'Session',
        playPause: false
    }


    handleClickBreak = (e) => {
        const { breakLength, playPause } = this.state;
        if (e.currentTarget.id === 'break-increment' && breakLength < 60 && playPause === false) {
            this.setState({
                breakLength: breakLength + 1
            })
        } else if (e.currentTarget.id === 'break-decrement' && breakLength > 1 && playPause === false) {
            this.setState({
                breakLength: breakLength - 1
            })
        }
    }

    handleClickSession = (e) => {
        const { session, playPause } = this.state;
        if (e.currentTarget.id === 'session-increment' && session < 60 && playPause === false) {
            this.setState({
                session: session + 1,
                count : (session+1)*60
            })

        } else if (e.currentTarget.id === 'session-decrement' && session > 1 && playPause === false) {
            this.setState({
                session: session - 1,
                count : (session-1)*60
            })

        }
    }

    handleReset = ()=>{
        const audio = document.getElementById('beep')
        this.setState({
            session: 25,
            breakLength: 5,
            count: 25 * 60,
            titleTimer: 'Session',
            playPause: false,
        })
        clearInterval(this.loop)
        audio.pause()
        audio.currentTime = 0;
    }
        
    convertTimer = (count)=>{
        let min = Math.floor(count/60);
        let sec = count % 60;
        min = (min<10) ? `0${min}` : min;
        sec =(sec<10) ? `0${sec}` : sec;
        return `${min}:${sec}`;
    }
        
        
    handlePlay = ()=>{
        const {playPause} = this.state
        const audio = document.getElementById('beep')
        
        if(playPause){
            clearInterval(this.loop);          
            this.setState({
                playPause:false
            })
        }else{
            this.setState({
                playPause:true
            })
            this.loop = setInterval (()=>{
                const { count,titleTimer,breakLength,session} = this.state
                if(count>0 && count<61){
                    document.getElementById('timer-label').style.color='red';
                    document.getElementById('time-left').style.color = 'red';
                    this.setState({
                        count:count-1
                    })
                }else if(count ===0){
                    this.setState({
                        titleTimer: (titleTimer === 'Session') ? 'Break' : 'Session',
                        count: ( titleTimer === 'Session') ? (breakLength*60) : (session*60)
                    })
                    document.getElementById('timer-label').style.color='white';
                    document.getElementById('time-left').style.color = 'white';
                    audio.play();
                }else{
                    this.setState({
                        count:count-1
                    })
                }
                
            },1000);

        }

    }   

    render() {
        const {session, breakLength,titleTimer, count,playPause} = this.state;
        return (
            <div className="timer-container">
                <div className="title">
                    <h2>Pomodoro Clock</h2>
                </div>
                <div className="length-cont">
                    <LengthContent
                        ArrowUp={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
                        ArrowDown={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
                        session={session}
                        breakLength={breakLength}
                        onClickBreak={this.handleClickBreak}
                        onClickSession={this.handleClickSession}
                        playPause={playPause}
                    />
                </div>
                <div className="content-time">
                    <TimeContent
                        Play={<FontAwesomeIcon icon={faPlayCircle} />}
                        Undo={<FontAwesomeIcon icon={faUndoAlt} />}
                        pause = {<FontAwesomeIcon icon={faPauseCircle} />}
                        convert={this.convertTimer}
                        count={count}
                        reset={this.handleReset}
                        playAndReset={this.handlePlay}
                        title={titleTimer}
                        playPause={playPause}
                    />
                </div>
            </div>
        );
    }
}

export default Content;

