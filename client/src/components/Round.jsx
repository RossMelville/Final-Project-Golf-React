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

  

  


  render() {

    if(this.props.selectedPage === "round") {
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