import React, {Component} from 'react';
import Round from '../components/Round.jsx';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      holes: [],
      rounds: [],
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

    const url2 = "http://localhost:3000/shots/7/holes"
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

    const url3 = "http://localhost:3000/shots/7/holes/96/rounds"
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
  }

  startRound() {
    console.log(this)
  }

  roundStats() {
    console.log(this)
  }

  clubStats() {
    console.log(this)
  }


  render() {
    if(this.state.selectedPage === "home"){
      return(
        <section>
          <h1>Golf Shot Tracker</h1>
          <button onClick={this.startRound}>Start Round</button>
          <br></br>
          <button onClick={this.roundStats}>Round Stats</button>
          <br></br>
          <button onClick={this.clubStats}>Club Stats</button>
          <Round state={this.state} />


          
        </section>
      )
    }
  }

}

export default GolfContainer