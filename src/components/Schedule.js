import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import {Grid, Col, Row} from 'react-flexbox-grid';
import Footer from './Footer';
import classNames from 'classnames';
import {Helmet} from "react-helmet";
import renderHTML from 'react-render-html';

import axios from 'axios';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import responseDay2 from './response-day2.json';
import responseDay1 from './response-day1.json';
import './Schedule.css';
import './google-css.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            day:1
        }
    }
    handleDayChange = (day) =>{
        this.setState({day});
    }
    componentWillMount(){
        // axios.get(`https://google-developers.appspot.com/events/gdd-india/schedule/day2-events`)
        // .then(response =>{
        //     console.log(response.data);
        // })
        // .catch((err)=>{
        // })
        var response_day2=[];
        for(var i=1;i<responseDay2.length;i++){
            var ele=responseDay2[i];
            response_day2.push(ele);
        }
        var response_day1=[];
        for(var i=1;i<responseDay1.length;i++){
            var ele=responseDay1[i];
            response_day1.push(ele);
        }
        this.setState({response_day2,response_day1})
    }
    render() {
        let dayClass1=classNames({
            'day-span':true,
            'is-active':this.state.day===1
        });
        let dayClass2=classNames({
            'day-span':true,
            'is-active':this.state.day===2
        });
        let tableData=this.state.response_day1;
        if(this.state.day===2)
        tableData=this.state.response_day2;
        return (
            <div>
                <div className="days-nav-div">
                    <span className={dayClass1} onClick={()=>this.handleDayChange(1)}>DAY 1</span>
                    <span className={dayClass2} onClick={()=>this.handleDayChange(2)}>DAY 2</span>
                </div>
                <Grid>
                <div className="home-body">
                    <Paper>
                    <Table
                        selectable={true}
                        className="home-table"
                        fixedHeader={true}
                        multiSelectable={true}
                        >
                            <TableHeader
                                displaySelectAll={true}
                                adjustForCheckbox={true}
                                enableSelectAll={true}
                                >
                                    <TableRow>
                                        <TableHeaderColumn  className="time-col" tooltip="">Select all</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="" className="description-col"> </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    deselectOnClickaway={false}
                                    showRowHover={false}
                                    stripedRows={false}
                                    >
                                        {tableData.map( (row, index) => (
                                            <TableRow key={index}>
                                                <TableRowColumn className="time-col">{renderHTML(row[0])}</TableRowColumn>
                                                <TableRowColumn className="description-col">{renderHTML(row[1])}</TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                            </div>
                        </Grid>
                        </div>
                    );
                }
            }

            export default Home;
