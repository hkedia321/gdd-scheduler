import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Header from './components/Header';
import Schedule from './components/Schedule.js';
import Snackbar from 'material-ui/Snackbar';

class App extends Component {

  closeSnackbar=()=>{
    this.props.hideMessage();
}
  render() {
    let snackbarOpen=false;
    let snackbarMessage="";
    if(typeof this.props.message.payload !=='undefined' && this.props.message.payload.show==true){
      snackbarOpen=this.props.message.payload.show
      snackbarMessage = this.props.message.payload.message;
}
    return (
      <div className="app-wrap">
        <Snackbar
          open ={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={()=>this.closeSnackbar()}
        />
        <Route exact path='/schedule' component={Schedule}/>
          <Route exact path='/' component={Schedule}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    message:state.message
  };
}

export default connect(mapStateToProps,actions)(App);
