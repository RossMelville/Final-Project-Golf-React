import React, {Component} from 'react';

class CourseSelect extends Component {

  constructor(props) {
    super(props)
  }

  handleChange(event) {
    var courseIndex = event.target.value;
    var course = this.props.courses[courseIndex];

    this.props.setCourse(course);
  }

  render() {
    if(this.props.selectedPage === "selectCourse") {
      var options = this.props.courses.map((course, index) => {
            return <option value={index} key={index}>{course.name}</option>;
          });

          return (
            <section id='standard'>
              <div>Please select your course</div>
              <select id="select" value={ this.props.selectedCourse } onChange={this.handleChange.bind(this)}>
                { options }
              </select>
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

