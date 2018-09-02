import {connect } from 'react-redux'
import { bindActionCreators} from  'redux'
import   action  from '../../actions/action.js'
import {withRouter} from 'react-router-dom'

import React from "react"
class screen2 extends React.Component {
  constructor(props, context) {
     super(props, context);
     this.state={
       amountToDebit  : ""
     }
     this.onTransactionInitiate = this.onTransactionInitiate.bind(this);  
     this.handleInputChange = this.handleInputChange.bind(this);  

  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  componentWillMount(){
    if(localStorage.getItem("token") === '' || localStorage.getItem("token") === null ){
        this.props.history.replace('/')
     }
  }
  onTransactionInitiate(e){
      e.preventDefault()
      this.props.initate(this.state.amountToDebit)
  }
  componentWillUpdate(nextProps){
      if(nextProps.inititateState){
        this.props.history.replace('/screen3')
      }
  }

  render() {
    return (
      <div>
        <div className="container">
          <form id="contact" onSubmit={this.onTransactionInitiate}>
            <fieldset>
              <input name="amountToDebit" placeholder="Enter Amount To Withdraw" type="text" pattern="[0-9]+(\.[0-9]{0,10})?%?" onChange={this.handleInputChange}  required/>
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
    inititateState  : state.authenticateReducer.authenticateInitiateState
  }
}
function mapDispatchToProps(dispatch){
  return{
      initate : bindActionCreators(action.initiate , dispatch),
}}
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(screen2)) 