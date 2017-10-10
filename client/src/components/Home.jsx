import React, {Component} from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.state.selectedPage === "home") {
      return (
        <section>
          <h1>Golf Shot Tracker</h1>
          <button onClick={this.props.selectCourse}>Start Round</button>
          <br></br>
          <button onClick={this.props.roundStats}>Round Stats</button>
          <br></br>
          <button onClick={this.props.clubStats}>Club Stats</button>
        </section>
      )
    }else{
      return(
        null
      )
    }
  }



}

export default Home