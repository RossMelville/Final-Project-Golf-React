import React, {Component} from 'react';

class ClubStats extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.state.selectedPage === "clubStats") {
      return (
        <section>
          Club Stats and stuff.
        </section>
      )
    }else{
      return (
        null
      )
    }
  }

}

export default ClubStats