import React, {Component} from 'react';

class CourseSelect extends Component {

  constructor(props) {
    super(props)
  }

  handleChange(event) {
    var courseIndex = event.target.value;
    var course = this.props.state.courses[courseIndex];

    this.props.setCourse(course);
  }

  render() {
    if(this.props.state.selectedPage === "selectCourse") {
      var options = this.props.state.courses.map((course, index) => {
            console.log(course.id)
            return <option value={index} key={index}>{course.name}</option>;
          });

          return (
            <select id="courses" value={ this.props.state.selectedCourse } onChange={this.handleChange.bind(this)}>
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

