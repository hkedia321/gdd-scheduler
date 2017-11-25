import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Grid, Col, Row} from 'react-flexbox-grid';
import {Helmet} from "react-helmet";
import './ToolbarBottom.css';
class ToolbarBottom extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        const styles={
            toolbar:{
                backgroundColor: "#212121",
                color:"#fff"
            },
            separator:{
                backgroundColor:"#ccc",
            }
        }
        return (
            <div className={this.props.show?"toolbar-show toolbar-div":"toolbar-hide toolbar-div"}>
                <Toolbar style={styles.toolbar}>
                    <ToolbarGroup>
                        <img src="/images/gdd-logo.svg" alt=""/>
                        &nbsp;&nbsp;
                        <ToolbarTitle text="GDD Scheduler" style={{color:"#fff"}}/>
                        <ToolbarSeparator style={styles.separator} />
                        &nbsp;&nbsp;&nbsp;
                        You are Attending {this.props.countSessions?this.props.countSessions:"0"} Sessions and {this.props.countTrainings?this.props.countTrainings:"0"} Trainings
                        <ToolbarSeparator style={styles.separator} />

                        <RaisedButton label="Download PDF" onClick={this.props.handleDownloadPdf} primary={true} />

                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default ToolbarBottom;
