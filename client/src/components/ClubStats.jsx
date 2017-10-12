import React, {Component} from 'react';

class ClubStats extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.selectedPage === "clubStats") {
      return (
        <section id='standard'>
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