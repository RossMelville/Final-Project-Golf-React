import React, {Component} from 'react';
import Round from '../components/Round.jsx';
import Home from '../components/Home.jsx';
import RoundStats from '../components/RoundStats.jsx';
import ClubStats from '../components/ClubStats.jsx';
import CourseSelect from '../components/CourseSelect.jsx';
import Putting from '../components/Putting.jsx';

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
      selectedClubDetails: [],
      selectedCourseHoles: [],
      holeShots: [],
      shotDistance: null,
      putts: [0,1,2,3,4,5,6,7,8,9],
      noOfPutts: undefined,
      holeIndex: 0

    }
    this.goToRound = this.goToRound.bind(this)
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

  goToRound() {
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
    this.getHolesForCourse(course)
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
      var round = JSON.parse(xhr.responseText);
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
    if(club == "Putter"){
      this.setState({selectedPage: "putting"});
    }else{
      this.getClubShotDetails(club);
    }
  }

  getClubShotDetails(club) {
    let selectedShots = this.state.shots.filter(function(shot){
      return shot.club == club
    });
    this.setState({selectedClubShots: selectedShots});
  }

  getHolesForCourse(course) {
    let selectedHoles = this.state.holes.filter(function(hole){
      return hole.course_id === course.id
    });
    this.setState({selectedCourseHoles: selectedHoles});
    this.getCurrentHole(selectedHoles);

  }

  getCurrentHole(holes) {
    let index = this.state.holeIndex;
    let hole = holes[index];
    let newIndex = index +1;
    this.setState({currentHole: hole});
    this.setState({holeIndex: newIndex});
    
    this.goToRound();
  }

  getShotDistance() {
    var lat1 = this.state.currentLocationLat;
    var lon1 = this.state.currentLocationLon;
    var lat2 = this.state.previousLocationLat;
    var lon2 = this.state.previousLocationLon;

    var yard = this.distanceInYards(lat1, lon1, lat2, lon2);

    var distance = Math.round(yard);

    var copyShots = this.state.holeShots;
    var club = this.state.selectedClub;
    copyShots.push({club, distance});
    this.setState({holeShots: copyShots});

    return distance;
  }

  saveShot(shotDistance){
    const data = {
          start_lat: this.state.previousLocationLat,
          start_lon: this.state.previousLocationLon,
          end_lat: this.state.currentLocationLat,
          end_lon: this.state.currentLocationLon,
          distance: shotDistance,
          club: this.state.selectedClub,
          hole_id: this.state.currentHole.id,
          round_id: this.state.currentRound.id
    }  
    this.logShot(data);
  }

  logShot(data) {
    const url = "http://localhost:3000/shots"
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(data))
  }

  logPutts(putts) {
    this.setState({noOfPutts: undefined});
    this.setState({selectedClub: ""})
    this.setState({currentLocationLat: null});
    this.setState({currentLocationLon: null});
    this.setState({previousLocationLat: null});
    this.setState({previousLocationLon: null});
    this.setState({distanceToBack: "Please plot your ball position"});
    this.setState({distanceToMiddle: "Please plot your ball position"});
    this.setState({distanceToFront: "Please plot your ball position"});

    var i;
    for(i=0; i < putts; i++) {
      var data = {
        round_id: this.state.currentRound.id,
        hole_id: this.state.currentHole.id,
        club: "Putter"
      }
      this.logShot(data);
    }

    this.getCurrentHole(this.state.selectedCourseHoles);
  }

  render() {
    return(
      <section>
        <Home 
        selectedPage={this.state.selectedPage} 
        selectCourse={this.selectCourse.bind(this)} 
        roundStats={this.roundStats.bind(this)} 
        clubStats={this.clubStats.bind(this)}/>

        <Round 
        setPreviousPosition={this.setPreviousPosition.bind(this)} 
        setCurrentPosition={this.setCurrentPosition.bind(this)} 
        selectedPage={this.state.selectedPage} 
        currentLocationLat={this.state.currentLocationLat} 
        currentLocationLon={this.state.currentLocationLon} 
        previousLocationLat={this.state.previousLocationLat} 
        previousLocationLon={this.state.previousLocationLon} 
        currentHole={this.state.currentHole} 
        currentRound={this.state.currentRound} 
        distanceToFront={this.state.distanceToFront} 
        distanceToMiddle={this.state.distanceToMiddle} 
        distanceToBack={this.state.distanceToBack} 
        clubs={this.state.clubs} 
        selectedClub={this.state.selectedClub} 
        setClub={this.setClub.bind(this)} 
        getShotDistance={this.getShotDistance.bind(this)} 
        saveShot={this.saveShot.bind(this)}
        holeShots={this.state.holeShots}/>

        <RoundStats 
        selectedPage={this.state.selectedPage}/>

        <ClubStats 
        selectedPage={this.state.selectedPage}/>

        <CourseSelect 
        courses={this.state.courses} 
        selectedPage={this.state.selectedPage} 
        selectedCourse={this.state.selectedCourse} 
        setCourse={this.setCourse.bind(this)}/> 

        <Putting 
        selectedPage={this.state.selectedPage}
        goToRound={this.goToRound.bind(this)}
        putts={this.state.putts}
        noOfPutts={this.state.noOfPutts}
        logPutts={this.logPutts.bind(this)}/>

      </section>
    )
  }

}

export default GolfContainer