import { combineReducers } from 'redux'


function inititateState(state = {authenticateState: '' }, action) {
    if(action.type === "authenticate"){
     return {
            authenticateState : action.payload
        }  
    }
    return state;
}

function authenticateReducer(state={ authenticateInitiateState : '' , BalanceRequested : '' , availableBalance : '' , denomination_2000 : '' , denomination_500 : '' ,denomination_100 : ''}, action){
      if(action.type === "initiate"){
          if(action.payload.status){
            return {
               authenticateInitiateState : action.payload.status,
               BalanceRequested : action.payload.thatamountToDebit,
               availableBalance : action.payload.resultBalance,
               denomination_2000 : action.payload.twoThousand,
               denomination_500: action.payload.fiveHundred,
               denomination_100 : action.payload.hundred,
            } 
          }
      }
    return state;
 }
 function finalConfirmReducer(state={ finalConfirmation : '' ,transactionid : '' , BalanceRequested : '' , noteDispensed_2000 : '' , noteDispensed_500 : '' ,noteDispensed_100 : ''}, action){
    if(action.type === "finalConfirm"){
          return {

             finalConfirmation : action.payload.data.status,
             BalanceRequested : action.payload.data.thatamountToDebit,
             availableBalance :  action.payload.data.resultBalance,
             denomination_2000 :  action.payload.data.twoThousand,
             denomination_500:  action.payload.data.fiveHundred,
             denomination_100 :  action.payload.data.hundred,
          } 
    
    }
  return state;
}



export default combineReducers({
    authenticateReducer,
    inititateState,
    finalConfirmReducer
 })
