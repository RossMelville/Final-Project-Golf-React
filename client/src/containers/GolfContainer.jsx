import React, {Component} from 'react';
import Round from '../components/Round.jsx';
import Home from '../components/Home.jsx';
import RoundStats from '../components/RoundStats.jsx';
import ClubStats from '../components/ClubStats.jsx';
import CourseSelect from '../components/CourseSelect';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      holes: [],
      rounds: [],
      courses: [],
      currentLocationLat: null,
      currentLocationLon: null,
      previousLocationLat: null,
      previousLocationLon: null,
      selectedPage: "home",
      selectedCourse: {},
      currentHole: {},
      currentRound: {},
      distanceToBack: "Please plot your ball position",
      distanceToMiddle: "Please plot your ball position",
      distanceToFront: "Please plot your ball position",
      clubs: ["", "Driver", "3 Wood", "3 Iron", "4 Iron", "5 Iron", "6 Iron", "7 Iron", "8 Iron", "9 Iron", "PW", "Wedge 52", "Wedge 56", "Wedge 60", "Putter"],
      selectedClub: "",
      selectedClubShots: [],
      selectedClubDetails: []

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

  setCourse(course) {
    this.setState({selectedCourse: course})
    this.setState({selectedPage: "round"})

    var hole = this.state.holes.find((element) => {
      return element.course_id === course.id;
    })

    this.setState({currentHole: hole})

    var round = this.saveRound(course)

  }

  saveRound(course) {
    const data = {
          course: course.name,
          course_id: course.id,
          date: new Date()
          }

    const url = "http://localhost:3000/rounds"
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = () => { 
      var round = xhr.responseText;
      this.setState({currentRound: round});
    }
    xhr.send(JSON.stringify(data))
  }

  setPreviousPosition() {
    this.setState({previousLocationLat: this.state.currentLocationLat});
    this.setState({previousLocationLon: this.state.currentLocationLon});
  }

  setCurrentPosition(position) {
    this.setState({currentLocationLat: position.coords.latitude});
    this.setState({currentLocationLon: position.coords.longitude});
    this.frontMiddleBack();
  }

  frontMiddleBack() {
    var distanceToB = this.calculateYardage(3)
    var distanceToM = this.calculateYardage(2)
    var distanceToF = this.calculateYardage(1)

    this.setState({distanceToFront:  distanceToF});
    this.setState({distanceToMiddle:  distanceToM});
    this.setState({distanceToBack:  distanceToB});

    console.log(this.state.distanceToBack)
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180
  }

  distanceInYards(lat1, lon1, lat2, lon2) {
    var earthRadiusYards = 6967840;

    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusYards * c;
  }

  calculateYardage(param) {
    var lat1 = this.state.currentLocationLat;
    var lon1 = this.state.currentLocationLon;
    // var lat1 = 55.975874;
    // var lon1 = -3.404413;

    if(param === 1){
      var lat2 = this.state.currentHole.green_front_lat;
      var lon2 = this.state.currentHole.green_front_lon;
    }else if(param === 2){
      var lat2 = this.state.currentHole.green_middle_lat;
      var lon2 = this.state.currentHole.green_middle_lon;
    }else{
      var lat2 = this.state.currentHole.green_back_lat;
      var lon2 = this.state.currentHole.green_back_lon;
    } 
      
    var yard = this.distanceInYards(lat1, lon1, lat2, lon2);

    return Math.round(yard); 
  }

  setClub(club) {
    this.setState({selectedClub: club});
    this.clubDetails(club);
  }

  clubDetails(club) {
    let selectedShots = this.state.shots.filter(function(shot){
      return shot.club == club
    });
    this.setState({selectedClubShots: selectedShots});
  }

  clubMatch(shot) {
    return shot.club === this.state.selectedClub
  }

  render() {
    return(
      <section>
        <Home selectedPage={this.state.selectedPage} selectCourse={this.selectCourse.bind(this)} roundStats={this.roundStats.bind(this)} clubStats={this.clubStats.bind(this)}/>
        <Round setPreviousPosition={this.setPreviousPosition.bind(this)} setCurrentPosition={this.setCurrentPosition.bind(this)} selectedPage={this.state.selectedPage} currentLocationLat={this.state.currentLocationLat} currentLocationLon={this.state.currentLocationLon} previousLocationLat={this.state.previousLocationLat} previousLocationLon={this.state.previousLocationLon} currentHole={this.state.currentHole} currentRound={this.state.currentRound} distanceToFront={this.state.distanceToFront} distanceToMiddle={this.state.distanceToMiddle} distanceToBack={this.state.distanceToBack} clubs={this.state.clubs} selectedClub={this.state.selectedClub} setClub={this.setClub.bind(this)} clubDetails={this.clubDetails.bind(this)}/>
        <RoundStats selectedPage={this.state.selectedPage}/>
        <ClubStats selectedPage={this.state.selectedPage}/>
        <CourseSelect courses={this.state.courses} selectedPage={this.state.selectedPage} selectedCourse={this.state.selectedCourse} setCourse={this.setCourse.bind(this)}/>      
      </section>
    )
  }

}

export default GolfContainer