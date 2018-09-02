import React from 'react';
import {Route , Switch , Redirect} from 'react-router-dom'
import pageArray from '../routes.js'
import '../style/style.css'


class Main extends React.Component {
  constructor(props, context) {
   
      super(props, context);
      this.state={

           userData : ''
      }

  }
  render() {
    return (
      <div>
                 <Switch> 
                        { pageArray.map((element , i)=>{
                             if(element.landing){
                                return ( <Redirect to = {element.to} from = {element.from} key = {i}/>)
                             }
                                return ( <Route path = {element.path} component = {element.component} key = {i}/>)
                            })}
                </Switch> 
                
      </div>
    );
  }
}

export default Main