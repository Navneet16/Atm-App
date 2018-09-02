import React from "react"
import {connect } from 'react-redux'
import { bindActionCreators} from  'redux'
import   action  from '../../actions/action.js'
import {withRouter} from 'react-router-dom'

class screen1 extends React.Component {
  constructor(props, context) {
     super(props, context);
     this.state = {pin: '' , cardNumber : ''};
     this.handleInputChange = this.handleInputChange.bind(this);
     this.pinCardNumberSubmit = this.pinCardNumberSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  pinCardNumberSubmit(e){
     e.preventDefault()
     this.props.authenticate(this.state.cardNumber ,this.state.pin )
  }

  componentWillUpdate(nextProps){
     if(nextProps.authenticateState){
      this.props.history.replace('/screen2')
     }
  }
  componentWillMount(){
    if(localStorage.getItem("token") !== '' && localStorage.getItem("token") !== null ){
      this.props.history.replace('/screen2')
     }
  }
  render() {
    return (
      <div>
        <div className="container">
          <form id="contact" onSubmit={this.pinCardNumberSubmit}>
            <h3>Welcome to ATM Services</h3>
            <fieldset>
              <input name="cardNumber" placeholder="Enter Card Number" type="number" pattern="[0-9]+(\.[0-9]{0,10})?%?" value={this.state.cardNumber} onChange={this.handleInputChange} required />
            </fieldset>
            <fieldset>
              <input name="pin" placeholder="Enter Pin" type="number" pattern="[0-9]+(\.[0-9]{0,10})?%?" value={this.state.pin} onChange={this.handleInputChange} required/>
            </fieldset>
            <fieldset>
              <button
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticateState  : state.inititateState.authenticateState
  }
}
function mapDispatchToProps(dispatch){
  return{
      authenticate : bindActionCreators(action.authenticate , dispatch),
}}
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(screen1)) 