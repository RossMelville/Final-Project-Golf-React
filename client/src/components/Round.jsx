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
    console.log(this.props);
    if(this.props.currentLocation.latitude != null) {

      this.props.previousLocation.latitude = this.props.currentLocation.latitude;
      this.props.previousLocation.longitude = this.props.currentLocation.longitude;

    }

    this.props.currentLocation.latitude = position.coords.latitude;
    this.props.currentLocation.longitude = position.coords.longitude;

    this.recordShot();
  }

  recordShot() {
    if((this.props.previousLocation.latitude != null) && (this.props.currentLocation.latitude != null)) {
      this.saveShot();
    } else {
      console.log("unable to record shot");
    }
  }

  saveShot(){

    console.log("This is where the shot would get saved.")

    // const data = {
    //       start_lat: this.props.previousLocation.latitude,
    //       start_lon: this.props.previousLocation.longitude,
    //       end_lat: this.props.currentLocation.latitude,
    //       end_lon: this.props.currentLocation.longitude
    //       }

    // console.log(this)
    // const url = "http://localhost:3000/shots"
    // const xhr = new XMLHttpRequest()
    // xhr.open('POST', url)
    // xhr.setRequestHeader("Content-Type", "application/json")
    // xhr.send(JSON.stringify(data))
  
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180
  }

  distanceInYards(lat1, lon1, lat2, lon2) {
    var earthRadiusYards = 6967410.3237095;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusYards * c;
  }

  calculateYardage() {
    console.log(this)
  }


  render() {
    console.log(this)
    if(this.props.state.selectedPage === "round") {
      return (
        <section>
          <div>Hole {this.props.state.currentHole.number}</div>
          <br></br>
          <div>Distance to front {this.calculateYardage.bind(this)}</div>
          <br></br>
          <br></br>
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