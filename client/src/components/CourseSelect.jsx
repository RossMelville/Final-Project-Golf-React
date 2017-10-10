import React, {Component} from 'react';

class CourseSelect extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.state.selectedPage === "selectCourse") {
      return (
        <section>
          Course Select Stuff
        </section>
      )
    }else{
      return (
        null
      )
    }
  }



}


export default CourseSelect