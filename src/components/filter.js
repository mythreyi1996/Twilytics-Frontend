import React from 'react'
import "./filter.css"; 
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

class RenderCalender extends React.Component {
    constructor(props) {
        super(props)
        const date = new Date()
        const startDate = date.getTime()
        this.state = { 
          startDate, // Today
          endDate: new Date(startDate).setDate(date.getDate()),
        }
    }

    onChange = (startDate, endDate) =>{
        this.setState({ startDate, endDate })
        this.props.onChange(startDate, endDate); 
    }

    render() {
      return (
        <div>
        <ReactLightCalendar className="calender" startDate={this.state.startDate} endDate={this.state.endDate} disableDates={date => date > new Date().getTime()} onChange={this.onChange} range displayTime />
        </div>
      );
    }
  }

export default class Filter extends React.Component {
    constructor(props) {
        super(props)
        const date = new Date()
        const startDate = date.getTime()
        this.state = { 
        date_check: false,
        startDate, // Today
        endDate: new Date(startDate).setDate(date.getDate())
        }
    }
    onDateChanged(e){
        this.setState({date_check: !this.state.date_check});
    };

    onChange = (startDate, endDate) =>{
      this.setState({ startDate, endDate })
      this.props.onDate(startDate, endDate); 
    }

    render = () => {
        const { startDate, endDate } = this.state
        return (
            <div className = "dateFilter">
            <input type="checkbox" name="Date" checked={this.state.date_check} onChange={e => this.onDateChanged(e)}/> Date <br/>
            {this.state.date_check === true ? <RenderCalender onChange={this.onChange} /> : ""}
            </div>
        )
      }
}
