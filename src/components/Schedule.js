import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import { Grid, Col, Row } from 'react-flexbox-grid';
import Footer from './Footer';
import Header from './Header';
import classNames from 'classnames';
import { Helmet } from "react-helmet";
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
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import responseDay2 from './response-day2.json';
import responseDay1 from './response-day1.json';
import ToolbarBottom from './ToolbarBottom.js';
import './Schedule.css';
import './google-css.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            day:1,
            showToolbarBottom:false,
            arrSelected1:[],
            arrSelected2:[],
            SelectAllChecked1:false,
            SelectAllChecked2:false,
            value:null,
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
            var obj={
                id:i-1,
                selected:false,
                timeColumn:ele[0],
                describeColumn:ele[1],
                session:ele[2],
                keywords1:ele[3],
                keywords2:ele[4],
            }
            response_day2.push(obj);
        }
        var response_day1=[];
        for(var i=1;i<responseDay1.length;i++){
            var ele=responseDay1[i];
            var obj={
                id:i-1,
                selected:false,
                timeColumn:ele[0],
                describeColumn:ele[1],
                session:ele[2],
                keywords1:ele[3],
                keywords2:ele[4],
            }
            response_day1.push(obj);
        }
        this.setState({response_day2,response_day1})
    }
    handleDownloadPdf=()=>{
        console.log("PDF Download")
    }
    resetSelections = (day)=>{
        let response=this.state.response_day1;
        if(day===2){
            response=this.state.response_day2;
        }
        for(var i =0;i<response.length;i++){
            response[i].selected=false;
        }
        if(day===2){
            this.setState({
                response_day2:response,
                arrSelected2:[],
            });
        }
        if(day===1){
            this.setState({
                response_day1:response,
                arrSelected1:[]
            });
        }
    }
    handleRowSelection = (arr)=>{
        let response;
        console.log(arr);
        if(this.state.day===2){
            response=this.state.response_day2;
            if(arr!=="all")
            this.resetSelections(2);
        }
        if(this.state.day===1){
            response=this.state.response_day1;
            if(arr!=="all")
            this.resetSelections(1);
        }
        if(arr==="all"){
            let arrSelected=[];
            let SelectAllChecked;
            if(this.state.day===1)
            SelectAllChecked=this.state.SelectAllChecked1;
            if(this.state.day===2)
            SelectAllChecked=this.state.SelectAllChecked2;

            if(!SelectAllChecked){
                for(let i=0;i<response.length;i++){
                    response[i].selected=true;
                    arrSelected.push(i);
                }
                if(this.state.day===1){
                    this.setState({arrSelected1:arrSelected});
                }
                if(this.state.day===2){
                    this.setState({arrSelected2:arrSelected});
                }
                SelectAllChecked=true;
            }
            else{
                SelectAllChecked=false;
                this.setState({arrSelected});
                arr="none";
            }
            if(this.state.day===1)
            this.setState({SelectAllChecked1:SelectAllChecked});
            if(this.state.day===2)
            this.setState({SelectAllChecked2:SelectAllChecked});
        }
        else if(arr!=="none"){
            for(let i=0;i<arr.length;i++){
                let id=arr[i];
                response[id].selected=true;
            }
        }
        if(arr!=="all"){
            if(this.state.day===1){
                this.setState({arrSelected1:arr});
            }
            if(this.state.day===2){
                this.setState({arrSelected2:arr});
            }
        }
        if(arr.length===0||arr==="none"){
            this.setState({
                showToolbarBottom:false
            });
        }
        else{
            this.setState({
                showToolbarBottom:true
            });
        }
        if(this.state.day===2){
            this.setState({
                response_day2:response
            });
        }
        if(this.state.day===1){
            this.setState({
                response_day1:response
            });
        }
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
                <Header />
                <div className="days-nav-div">
                    <span className={dayClass1} onClick={()=>this.handleDayChange(1)}><span className="borderSpan">DAY 1</span></span>
                    <span className={dayClass2} onClick={()=>this.handleDayChange(2)}><span className="borderSpan">DAY 2</span></span>
                </div>

                <Grid>
                <div className="home-body">
                    <span className="dayHead">December { this.state.day }</span>
                    <div className="filterSection">
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} >
                                <p>All times are Indian Standard Time (UTC+05:30)</p>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={2} >
                                <p className="devsite-livestream">Livestreamed</p>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={6} >
                                <p style={{fontSize:17}}>Filter:</p>
                                    <div>

                                        <SelectField
                                            floatingLabelText="Type"
                                            style = {{width:130,marginRight:13}}
                                            value={this.state.value}
                                            floatingLabelStyle={{color: 'black'}}

                                        >
                                            <MenuItem value={null} primaryText="" style={{display:'none'}} />
                                            <MenuItem value={1} primaryText="All Types" />
                                            <MenuItem value={2} primaryText="Sessions" />
                                            <MenuItem value={3} primaryText="Trainings" />
                                        </SelectField>
                                        <SelectField
                                            floatingLabelText="Track"
                                            style = {{width:130,marginRight:13}}
                                            value={this.state.value}
                                            floatingLabelStyle={{color: 'black'}}
                                        >
                                            <MenuItem value={1} primaryText="All Tracks" />
                                            <MenuItem value={2} primaryText="Android" />
                                            <MenuItem value={3} primaryText="Beyond Mobile" />
                                            <MenuItem value={4} primaryText="Certification" />
                                            <MenuItem value={5} primaryText="Develop on mobile" />
                                            <MenuItem value={6} primaryText="Mobile Web" />
                                        </SelectField>
                                        <SelectField
                                            floatingLabelText="Product"
                                            style = {{width:130,marginRight:13}}
                                            value={this.state.value}
                                            floatingLabelStyle={{color: 'black'}}
                                            iconStyle={{color: 'black'}}
                                        >
                                            <MenuItem value={1} primaryText="All Product" />
                                            <MenuItem value={2} primaryText="AMP" />
                                            <MenuItem value={3} primaryText="Android" />
                                        </SelectField>
                                    </div>
                            </Col>
                        </Row>
                    </div>
                        <Paper>
                            <Table
                                selectable={true}
                                className="home-table"
                                fixedHeader={true}
                                multiSelectable={true}
                                onRowSelection={this.handleRowSelection}
                        >
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                        enableSelectAll={false}
                                        >
                                            {/* <TableRow>
                                                <TableHeaderColumn  className="time-col" tooltip="">Select all</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="" className="description-col"> </TableHeaderColumn>
                                            </TableRow> */}
                                            <TableRow>
                                                <TableRowColumn tooltip="">
                                                    <Checkbox
                                                        label="&nbsp;&nbsp;Select all"
                                                        checked={this.state.day===1?this.state.SelectAllChecked1:this.state.SelectAllChecked2}
                                                        onCheck={(e)=>this.handleRowSelection("all")}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox={true}
                                            deselectOnClickaway={false}
                                            showRowHover={false}
                                            stripedRows={false}
                                            >
                                                {tableData.map( (row, index) => (
                                                    <TableRow key={index} selected={this.state.day===1?this.state.arrSelected1.indexOf(row.id)!==-1:this.state.arrSelected2.indexOf(row.id)!==-1}>
                                                        <TableRowColumn className="time-col">{renderHTML(row.timeColumn)}</TableRowColumn>
                                                        <TableRowColumn className="description-col">{renderHTML(row.describeColumn)}</TableRowColumn>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </div>
                            </Grid>
                            <ToolbarBottom show={this.state.showToolbarBottom} handleDownloadPdf={this.handleDownloadPdf}/>
                        </div>
                    );
                }
            }

            export default Home;
