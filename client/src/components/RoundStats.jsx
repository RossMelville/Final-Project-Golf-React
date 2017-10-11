import React, {Component} from 'react';

class RoundStats extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.selectedPage === "roundStats") {
      return (
        <section>
          Round Stats and stuff.
        </section>
      )
    }else{
      return (
        null
      )
    }
  }

}

export default RoundStats