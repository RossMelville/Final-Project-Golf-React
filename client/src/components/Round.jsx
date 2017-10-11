import React, {Component} from 'react';



class Round extends Component {

  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.recordShot = this.recordShot.bind(this);


  }

  getLocation(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showPosition, {timeout: 30000, enableHighAccuracy: true, maximumAge: 0});
    } 
  }

  showPosition(position) {
    if(this.props.state.currentLocation.latitude != null) {

      this.props.state.previousLocation.latitude = this.props.state.currentLocation.latitude;
      this.props.state.previousLocation.longitude = this.props.state.currentLocation.longitude;

    }

    this.props.state.currentLocation.latitude = position.coords.latitude;
    this.props.state.currentLocation.longitude = position.coords.longitude;

    this.recordShot();
  }

  recordShot() {
    if((this.props.state.previousLocation.latitude != null) && (this.props.state.currentLocation.latitude != null)) {
      this.frontMiddleBack();
      this.saveShot();
    } else {
      this.frontMiddleBack();
      console.log("unable to record shot");
    }
  }

  saveShot(){

    const data = {
          start_lat: this.props.state.previousLocation.latitude,
          start_lon: this.props.state.previousLocation.longitude,
          end_lat: this.props.state.currentLocation.latitude,
          end_lon: this.props.state.currentLocation.longitude
          }

    const url = "http://localhost:3000/shots"
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(data))

  
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
    if(this.props.state.currentLocation.latitude != null){
      var lat1 = this.props.state.currentLocation.latitude;
      var lon1 = this.props.state.currentLocation.longitude;

      if(param === "front"){
        var lat2 = this.props.state.currentHole.green_front_lat;
        var lon2 = this.props.state.currentHole.green_front_lon;
      }else if(param === "middle"){
        var lat2 = this.props.state.currentHole.green_middle_lat;
        var lon2 = this.props.state.currentHole.green_middle_lon;
      }else{
        var lat2 = this.props.state.currentHole.green_back_lat;
        var lon2 = this.props.state.currentHole.green_back_lon;
      } 
      
      var yard = this.distanceInYards(lat1, lon1, lat2, lon2);

      return Math.round(yard);
    }else{
      return "Please plot your ball position";
    }
  }

  frontMiddleBack() {
    var distanceToBack = this.calculateYardage("Back")
    var distanceToMiddle = this.calculateYardage("Middle")
    var distanceToFront = this.calculateYardage("Front")

    this.props.state.distanceToFront = distanceToFront;
    this.props.state.distanceToMiddle = distanceToMiddle;
    this.props.state.distanceToBack = distanceToBack;

    console.log(this.props.state.distanceToBack)

  }


  render() {
    
    this.frontMiddleBack()

    if(this.props.state.selectedPage === "round") {
      return (
        <section>
          <div>Hole {this.props.state.currentHole.number}</div>
          <br></br>
          <div>Distance to Back: {this.props.state.distanceToBack}</div>
          <br></br>
          <div>Distance to Middle: {this.props.state.distanceToMiddle}</div>
          <br></br>
          <div>Distance to front: {this.props.state.distanceToFront}</div>
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