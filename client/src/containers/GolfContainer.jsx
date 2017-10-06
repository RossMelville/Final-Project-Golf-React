import React, {Component} from 'react';
import Location from '../components/Location.jsx';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: [],
      location: null
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
    return(
      <section>
        <p>Golf Stuff going here</p>
        <Location />
      </section>
    )
  }

}

export default GolfContainer