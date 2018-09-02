//childs ---> Buy Sell form , Trade list , Buy List ,Sell List, My Orders
import React from "react"
import {connect } from 'react-redux'
import { bindActionCreators} from  'redux'
import   action  from '../../actions/action.js'
import {withRouter} from 'react-router-dom'
import BigNumber from 'bignumber.js'

class screen3 extends React.Component {
  constructor(props, context) {
     super(props, context);
     this.state={
       user  : ""
     }
  this.finalConfirmation = this.finalConfirmation.bind(this);
  }
  finalConfirmation(e){
     e.preventDefault()
     this.props.finalConfirm(this.props.BalanceRequested , this.props.availableBalance , this.props.denomination_2000, this.props.denomination_500 ,this.props.denomination_100)

  }
  componentWillMount(){
    if(localStorage.getItem("token") === '' || localStorage.getItem("token") === null ){
      this.props.history.replace('/')
     }
  }
  componentWillUpdate(nextProps){
       if(nextProps.finalConfirmation){
        this.props.history.replace('/')
       }
  }
  render() {
    return (
      <div>
          <div className="container">
          <form id="contact" onSubmit={this.finalConfirmation}>
            <fieldset>
            Balance Requested <input   type="text"  value={this.props.BalanceRequested}  required disabled/>
            </fieldset>
            <fieldset>
            Available Balance <input   type="text"  value={this.props.availableBalance}  required disabled/>
            </fieldset>
            <fieldset>
            New Balance <input   type="text"  value={BigNumber(this.props.availableBalance).minus(this.props.BalanceRequested)}  required disabled/>
            </fieldset>
            <fieldset>
             2000 notes <input   type="text"  value={this.props.denomination_2000}  required disabled/>
            </fieldset>
            <fieldset>
            500 notes  <input   type="text"  value={this.props.denomination_500}  required disabled/>
            </fieldset>
            <fieldset>
            100 notes  <input   type="text"  value={this.props.denomination_100}  required disabled/>
            </fieldset>
            <fieldset>
              <button
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending">Start Withdrawl</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    finalConfirmation   : state.finalConfirmReducer.finalConfirmation,
    inititateState  : state.authenticateReducer.authenticateInitiateState,
    BalanceRequested  : state.authenticateReducer.BalanceRequested,
    availableBalance  : state.authenticateReducer.availableBalance,
    denomination_2000  : state.authenticateReducer.denomination_2000,
    denomination_500  : state.authenticateReducer.denomination_500,
    denomination_100  : state.authenticateReducer.denomination_100
  }
}
function mapDispatchToProps(dispatch){
  return{
      finalConfirm : bindActionCreators(action.finalConfirm , dispatch),
}}
export default withRouter(connect(mapStateToProps , mapDispatchToProps)(screen3)) 