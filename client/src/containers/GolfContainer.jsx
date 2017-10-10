import React, {Component} from 'react';
import Round from '../components/Round.jsx';
import Home from '../components/Home.jsx';
import RoundStats from '../components/RoundStats.jsx';
import ClubStats from '../components/ClubStats.jsx';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      holes: [],
      rounds: [],
      courses: [],
      currentLocation : {latitude: null, longitude: null},
      previousLocation: {latitude: null, longitude: null},
      selectedPage: "home"

    }
    this.startRound = this.startRound.bind(this)
    this.roundStats = this.roundStats.bind(this)
    this.clubStats = this.clubStats.bind(this)
  }

  componentDidMount() {
    const url = "http://localhost:3000/shots"
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.setState({
          shots: data
        })
      }
    }
    xhr.send();

    const url2 = "http://localhost:3000/holes"
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', url2);
    xhr2.onload = () => {
      if(xhr.status === 200) {
        const data2 = JSON.parse(xhr2.responseText);
        this.setState({
          holes: data2
        })
      }
    }
    xhr2.send();

    const url3 = "http://localhost:3000/rounds"
    const xhr3 = new XMLHttpRequest();
    xhr3.open('GET', url3);
    xhr3.onload = () => {
      if(xhr.status === 200) {
        const data3 = JSON.parse(xhr3.responseText);
        this.setState({
          rounds: data3
        })
      }
    }
    xhr3.send();

    const url4 = "http://localhost:3000/courses"
    const xhr4 = new XMLHttpRequest();
    xhr4.open('GET', url4);
    xhr4.onload = () => {
      if(xhr4.status === 200) {
        const data4 = JSON.parse(xhr4.responseText);
        this.setState({
          courses: data4
        })
      }
    }
    xhr4.send();
  }

  startRound() {
    this.setState({selectedPage: "round"})
  }

  selectCourse() {
    this.setState({selectedPage: "selectCourse"})
  }

  roundStats() {
    this.setState({selectedPage: "roundStats"})
  }

  clubStats() {
    this.setState({selectedPage: "clubStats"})
  }


  render() {
    return(
      <section>
        <Home state={this.state} selectCourse={this.selectCourse.bind(this)} roundStats={this.roundStats.bind(this)} clubStats={this.clubStats.bind(this)}/>
        <Round state={this.state} />
        <RoundStats state={this.state}/>
        <ClubStats state={this.state}/>          
      </section>
    )
  }

}

export default GolfContainer