import React, {Component} from 'react';

class Putting extends Component {

  constructor(props) {
    super(props);
  }

  handleChange(event) {
    var puttIndex = event.target.value;
    var putt = this.props.putts[puttIndex];
    
    this.props.logPutts(putt);
  }

  render() {
    var options = this.props.putts.map((putt, index) => {
      return <option value={index} key={index}>{putt}</option>;
    });

    if(this.props.selectedPage === "putting") {
    return(
      <section>
        <div>Please enter how many putts you have taken:</div>
        <select id="putts" value={this.props.noOfPutts} onChange={this.handleChange.bind(this)}>
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

export default Putting