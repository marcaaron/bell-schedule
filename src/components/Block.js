import React, {Component} from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import schedule from './schedule';
const moment = extendMoment(Moment);

class Block extends Component{
  state = {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    currentRange: 0
  }

  componentDidMount(){
    const {year, month, date} = this.state;
    const day = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const now = new Moment();
    // const now = new Moment('2018-5-1 9:30');
    const activeRange = schedule[day].map((period,index)=>{
      return [period[1].split('-'), index];
    }).filter(period=>{
      const start = new Moment(`${year}-${month+1}-${date} ${period[0][0]}`, 'YYYY-M-D H:m');
      const end = new Moment(`${year}-${month+1}-${date} ${period[0][1]}`, 'YYYY-M-D H:m');
      const range = moment.range(start, end);
      return range.contains(now);
    });
    if(activeRange.length>0){
      this.setState({currentRange:activeRange[0][1]});
    }
  }

  inRange = (start, end, date, month, year, index) => {
    const now = new Moment();
    // const now = new Moment('2018-5-1 9:30');
    const startTime = new Moment(`${year}-${month+1}-${date} ${start}`, 'YYYY-M-D H:m');
    const endTime = new Moment(`${year}-${month+1}-${date} ${end}`, 'YYYY-M-D H:m');
    const range = moment.range(startTime, endTime);
    if(range.contains(now)){
      return true;
    }
  }

  formatDisplayTime = (timeString) => {
    let splitTime = timeString.split('-');
    let starter = splitTime[0];
    let ender = splitTime[1];
    if(starter.split(':')[0]>12){
      starter = starter.split(':');
      starter[0] = starter[0] - 12;
      starter = [starter[0], starter[1]].join(':');
    }
    if(ender.split(':')[0]>12){
      ender = ender.split(':');
      ender[0] = ender[0] - 12;
      ender = [ender[0], ender[1]].join(':');
    }
    return [starter,ender].join(' - ');
  }

  render(){
    const {day} = this.props;
    const daySchedule = schedule[day];
    const {date, month, year} = this.state;
    return(
      <div className="time-block-container">
        {
          daySchedule.map((period, index)=>{
            const rangeArr = period[1].split('-');
            const start = rangeArr[0];
            const end = rangeArr[1];
            let style = {}
            if(this.inRange(start, end, date, month, year, index)){
              style = {borderRight:`solid tomato 10px`}
            }else if(this.state.currentRange && index<this.state.currentRange){
              style = {borderRight:`solid rgb(185,48,56) 10px`}
            }
            return (
              <div style={style} key={`${day}_${index}`} className="time-block">
                <div><strong>{period[0]}</strong></div>
                <div>{this.formatDisplayTime(period[1])}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Block;
