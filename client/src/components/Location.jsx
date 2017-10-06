import React, {Component} from 'react';



class Location extends Component {

  constructor(props) {
    super(props);

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showPosition, {timeout: 30000, enableHighAccuracy: true, maximumAge: 0});
    } 
  }

  showPosition(position) {
      console.log(position)
  }

  render() {
    return (
      <section>
      Location Stuff
      <button onClick={this.getLocation.bind(this)}>Get Location</button>
       
      </section>
    )
  }
    


}

export default Location