import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Grid, Col, Row} from 'react-flexbox-grid';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import {Helmet} from "react-helmet";
import './ToolbarBottom.css';
class ToolbarBottom extends Component {
    constructor(props) {
        super(props);
        this.state={}
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

                            <img src="/images/gdd-logo.svg" className="attendingInfo" alt=""/>
                            &nbsp;&nbsp;
                            <ToolbarTitle text="GDD Scheduler" className="attendingInfo" style={{color:"#fff"}}/>

                            <ToolbarSeparator style={styles.separator} className="attendingInfo" />
                            <span className="attendingInfo">
                            &nbsp;&nbsp;&nbsp;
                            You are Attending {this.props.countSessions?this.props.countSessions:"0"} Sessions and {this.props.countTrainings?this.props.countTrainings:"0"} Trainings
                            </span>
                            <ToolbarSeparator className="attendingInfo" style={styles.separator} />

                        <RaisedButton onClick={this.props.handleDownloadPdf} icon={<FileDownload />} label={"Download PDF"} primary={true}></RaisedButton>

                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default ToolbarBottom;
