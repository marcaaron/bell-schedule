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
    const currentTime = `${(hour-12)<10 ? "0"+(hour-12) : (hour-12)}:${(minutes)<10 ? "0"+(minutes) : (minutes)}:${(seconds)<10 ? "0"+(seconds) : (seconds)}`;
    const style = {height:`${height-(height*.1)}px`};
    return (
      <div style={style} className="App">
        <div className="header">
          <h1>Kahuku High School Bell Schedule</h1>
          <p>Today is {day}</p>
          <p>Current Time: {currentTime}</p>
        </div>
        <Block currentTime={currentTime} day={day} hour={hour} minutes={minutes} height={height}/>
      </div>
    );
  }
}

export default App;
