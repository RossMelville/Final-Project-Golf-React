import React, {Component} from 'react';

class GolfContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shots: []
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

  render() {
    console.log(this.state)
    return(
      <section>
        <p>Golf Stuff going here</p>
        <button className="location">Location</button>
      </section>
    )
  }

}

export default GolfContainer