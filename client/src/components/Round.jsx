import React, {Component} from 'react';

class Round extends Component {

  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.recordShot = this.recordShot.bind(this);
  }

  getLocation(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition, this.setPosition, {timeout: 30000, enableHighAccuracy: true, maximumAge: 0});
    } 
  }

  setPosition(position) {
    if(this.props.currentLocationLat != null) {
      this.props.setPreviousPosition()
    }
    this.props.setCurrentPosition(position);
    this.recordShot();
  }

  recordShot() {
    if((this.props.previousLocationLat != null) && (this.props.currentLocationLat != null)) {
      this.saveShot();
    } else {
      console.log("unable to record shot");
    }
  }

  saveShot(){

    const data = {
          start_lat: this.props.previousLocationLat,
          start_lon: this.props.previousLocationLon,
          end_lat: this.props.currentLocationLat,
          end_lon: this.props.currentLocationLon
          }

    const url = "http://localhost:3000/shots"
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(data))  
  }

  handleChange(event) {
    var clubIndex = event.target.value;
    var club = this.props.clubs[clubIndex];

    this.props.setClub(club);
  }

  render() {
    // this.props.clubDetails();
    if(this.props.selectedPage === "round") {

      var options = this.props.clubs.map((club, index) => {
        return <option value={index} key={index}>{club}</option>;
      });

      return (
        <section>
          <div>Hole {this.props.currentHole.number}</div>
          <br></br>
          <div>Distance to Back: {this.props.distanceToBack}</div>
          <br></br>
          <div>Distance to Middle: {this.props.distanceToMiddle}</div>
          <br></br>
          <div>Distance to front: {this.props.distanceToFront}</div>
          <br></br>
          <div>Selected Club: {this.props.selectedClub}</div>
          <br></br>
          <select id="clubs" value={ this.props.selectedClub } onChange={this.handleChange.bind(this)}>
            { options }
          </select>
          <br></br>
        <button onClick={this.getLocation}>Get Location</button>
        
        </section>
      )
    }else{
      return (
        null
      )
    }
  }
    


}

export default Round