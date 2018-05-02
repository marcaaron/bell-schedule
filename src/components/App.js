import React, { Component } from 'react';
import '../App.css';
import Block from './Block';

const date = new Date();

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
    let newHour = hour;
    if(hour>12) newHour = hour-12;
    const currentTime = `${(newHour)<10 ? "0"+(newHour) : (newHour)}:${(minutes)<10 ? "0"+(minutes) : (minutes)}:${(seconds)<10 ? "0"+(seconds) : (seconds)}`;
    const style = {height:`${height-50 < 400 ? 400 : height-50}px`};
    return (
      <div style={style} className="App">
        <div className="header">
          <h1>Kahuku High School</h1><h2>Bell Schedule</h2>
          <p>Today is {day}</p>
          <p>Current Time: {currentTime}</p>
        </div>
        <Block currentTime={currentTime} day={day} hour={newHour} minutes={minutes} height={height}/>
      </div>
    );
  }
}

export default App;
