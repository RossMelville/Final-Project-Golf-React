import React, {Component} from 'react';

class CourseSelect extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.state.selectedPage === "selectCourse") {
      var options = this.props.state.courses.map((course) => {
            return <option value={course.id} key={course.id}>{course.name}</option>;
          });

          return (
            <select id="courses" value={ this.props.state.selectedCourse } >
              { options }
            </select>
          )
    }else{
      return (
        null
      )
    }
  }



}


export default CourseSelect

