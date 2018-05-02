import React, { Component } from 'react';
import '../App.css';
import schedule from './schedule';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const date = new Date();

const inRange = (start, end) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const now = new Moment('2018-5-1 12:30', 'YYYY-M-D H:m');
  const startTime = new Moment(`${year}-${month+1}-${date} ${start}`, 'YYYY-M-D H:m');
  const endTime = new Moment(`${year}-${month+1}-${date} ${end}`, 'YYYY-M-D H:m');
  const range = moment.range(startTime, endTime);
  if(range.contains(now)){
    return true;
  }
}

const Block = ({day, hour, minutes}) => {
  const daySchedule = schedule[day];
  return daySchedule.map((period,index)=>{
    const rangeArr = period[1].split('-');
    const start = rangeArr[0];
    const end = rangeArr[1];
    let style = {}
    if(inRange(start,end)){
      style = {borderRight:`solid red 10px`}
    }
    return (
      <div style={style} key={`${day}_${index}`} className="time-block">
        <div><strong>{period[0]}</strong></div>
        <div>{period[1]}</div>
      </div>
    );
  });
}

class App extends Component {
  state = {
    day: date.toLocaleString('en-us', {  weekday: 'long' }),
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    height: window.innerHeight,
  }

  componentDidMount(){
    window.addEventListener('resize', this.resize);
    const intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId});
  }

  resize = () => {
    const height = window.innerHeight;
    this.setState({height});
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    const date = new Date();
    const day = date.toLocaleString('en-us', {  weekday: 'long' });
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.setState({day,hour,minutes,seconds});
  }

  render() {
    const {day, hour, minutes, seconds, height} = this.state;
    const currentTime = `${(hour-12)<10 ? "0"+(hour-12) : (hour-12)}:${(minutes)<10 ? "0"+(minutes) : (minutes)}:${(seconds)<10 ? "0"+(seconds) : (seconds)}`;
    const style = {height:`${height-(height*.1)}px`};
    return (
      <div style={style} className="App">
        <div className="header">
          <h1>Kahuku High School Bell Schedule</h1>
          <p>Today is {day}</p>
          <p>Current Time: {currentTime}</p>
        </div>
        <div className="time-block-container">
          <Block currentTime={currentTime} day={day} hour={hour} minutes={minutes} height={height}/>
        </div>
      </div>
    );
  }
}

export default App;
