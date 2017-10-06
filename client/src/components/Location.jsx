import React, {Component} from 'react';



class Location extends Component {

  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);

  }

  getLocation(event) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showPosition, {timeout: 30000, enableHighAccuracy: true, maximumAge: 0});
    } 
  }

  showPosition(position) {
      console.log(position)
      console.log(this)
  }

  render() {
    console.log(this)
    return (
      <section>
      Location Stuff
      <button onClick={this.getLocation}>Get Location</button>
      
      </section>
    )
  }
    


}

export default Location