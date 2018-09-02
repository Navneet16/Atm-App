import swal from 'sweetalert2'
import axios from 'axios'
import {
    backendUrl
} from '../url.js'

function authenticate(cardNumber , pin) {
    return dispatch => {
         return axios.post(`${backendUrl}/api/authenticate`, {
            cardNumber : cardNumber,
            pin : pin
         }).then(function(authenticateResponse){
                if(authenticateResponse.data.status){
              if (typeof(Storage) !== "undefined") {
                   localStorage.setItem("token", authenticateResponse.data.token);
                    swal({
                        title: "Success!",
                        position: 'top-end',
                        text: `${authenticateResponse.data.message}`,
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(function(result){
                        if(result){
                            dispatch({
                                type: 'authenticate',
                                payload: authenticateResponse.data.status
                            })
                        }
                    })
                  }
                }
                else
                {
                    swal({
                        title: "Error!",
                        position: 'top-end',
                        text: `${authenticateResponse.data.message}`,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: false
                    }).then(function(result){
                        if(result){
                            dispatch({
                                type: 'authenticate',
                                payload: authenticateResponse.data.status
                            })
                        }
                    })
                  
                }
         })
    }
}

function initiate(amountToDebit){

      return dispatch => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        return axios.post(`${backendUrl}/api/initiate`, {
            amountToDebit : amountToDebit
         }).then(function(initiateResponse){
                if(initiateResponse.data.status){
                    swal({
                        title: "Success!",
                        position: 'top-end',
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(function(result){
                        if(result){
                            dispatch({
                                type: 'initiate',
                                payload: initiateResponse.data.serverResponse
                            })
                        }
                    })
                }
                else
                {
                    swal({
                        title: "Error!",
                        position: 'top-end',
                        text: `${initiateResponse.data.message}`,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: false
                    }).then(function(result){
                        if(result){
                            dispatch({
                                type: 'initiate',
                                payload: initiateResponse.data.serverResponse
                            })
                        }
                    })
                  
                }
         })
      }
}

function finalConfirm(BalanceRequested , availableBalance , denomination_2000, denomination_500 ,denomination_100){

    return dispatch => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      return axios.post(`${backendUrl}/api/finalConfirm`, {
        BalanceRequested : BalanceRequested,
        availableBalance : availableBalance,
        denomination_2000 : denomination_2000,
        denomination_500 : denomination_500,
        denomination_100 : denomination_100,
      }).then(function(finalConfirmResponse){
              if(finalConfirmResponse.data.status){
                   localStorage.removeItem('token')
                  swal({
                      title: "Success!",
                      position: 'top-end',
                      type: "success",
                      text: `Transaction ID: ${finalConfirmResponse.data.transaction._id}
                            CardNumber : ${finalConfirmResponse.data.transaction.cardNumber}
                            Amount Withdraw : ${finalConfirmResponse.data.transaction.amountWithdrawn}`,
                      timer: 6000,
                      showConfirmButton: false
                  }).then(function(result){
                      if(result){
                          dispatch({
                              type: 'finalConfirm',
                              payload: finalConfirmResponse
                          })
                      }
                  })
              }
              else
              {
                  swal({
                      title: "Error!",
                      position: 'top-end',
                      text: `${finalConfirmResponse.data.message}`,
                      type: "error",
                      timer: 3000,
                      showConfirmButton: false
                  }).then(function(result){
                      if(result){
                          dispatch({
                              type: 'finalConfirm',
                              payload: finalConfirmResponse
                          })
                      }
                  })
                
              }
       })
    }
}


export default {
    authenticate,
    initiate,
    finalConfirm
}