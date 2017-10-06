import React, {Component} from 'react';
import Location from '../components/Location.jsx';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      currentLocation : {latitude: null, longitude: null},
      previousLocation: {latitude: null, longitude: null}

    }
  }

  componentDidMount() {
    const url = "http://localhost:3000/api/shots"
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
  }

  getLocation() {

  }

  render() {
    console.log(this.state.shots)
    return(
      <section>
        <p>Golf Stuff going here</p>

        <Location currentLocation={this.state.currentLocation} previousLocation={this.state.previousLocation}/>
      </section>
    )
  }

}

export default GolfContainer