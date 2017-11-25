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
import $ from 'jquery';
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
            countSessions1:0,
            countTrainings1:0,
            countSessions2:0,
            countTrainings2:0,
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
            var temp_e=$(ele[0]);
            var session_training=$(".devsite-event-text",temp_e).text();
            var obj={
                id:i-1,
                selected:false,
                timeColumn:ele[0],
                describeColumn:ele[1],
                session:ele[2],
                tracks:ele[3],
                products:ele[4],
                hideFromType:false,
                hideFromTrack:false,
                hideFromProduct:false,
            }
            response_day2.push(obj);
        }
        var response_day1=[];
        for(var i=1;i<responseDay1.length;i++){
            var ele=responseDay1[i];
            var temp_e=$(ele[0]);
            var session_training=$(".devsite-event-text",temp_e).text();
            var obj={
                id:i-1,
                selected:false,
                timeColumn:ele[0],
                describeColumn:ele[1],
                session:ele[2],
                tracks:ele[3],
                products:ele[4],
                hideFromType:false,
                hideFromTrack:false,
                hideFromProduct:false,
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
            this.resetSelections(2);
        }
        if(this.state.day===1){
            response=this.state.response_day1;
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
            if(this.state.day===1){
                this.setState({arrSelected1:[]});
            }
            if(this.state.day===2){
                this.setState({arrSelected2:[]});
            }
        }

        else{
            this.setState({
                showToolbarBottom:true
            });
        }
        if(this.state.day===2){
            this.setState({
                response_day2:response
            },()=>{
                this.setCount();
            });
        }
        if(this.state.day===1){
            this.setState({
                response_day1:response
            },()=>{
                this.setCount();
            });
        }

    }
    setCount=()=>{
        let session=0,training=0;
        for(let i=0;i<this.state.response_day1.length;i++){
            console.log(this.state.response_day1[i])
            if(this.state.response_day1[i].selected===true){
                if(this.state.response_day1[i].session==="Session")
                session++;
                else if(this.state.response_day1[i].session==="Training")
                training++;
            }
        }
        this.setState({
            countSessions1:session,
            countTrainings1:training
        })
        session=0;
        training=0;
        for(let i=0;i<this.state.response_day2.length;i++){
            if(this.state.response_day2[i].selected===true){
                if(this.state.response_day2[i].session==="Session")
                session++;
                else if(this.state.response_day2[i].session==="Training")
                training++;
            }
        }
        this.setState({
            countSessions2:session,
            countTrainings2:training
        });
    }
    handleChangeType= (event, index, value)=>{
        var response=this.state.response_day1;
        if(this.state.day===2){
            response=this.state.response_day2;
        }
        if(value==="Sessions"){//Sessions
            for(let i =0;i<response.length;i++){
                if(response[i].session!=="Session"){
                    response[i].hideFromType=true;
                }
                else{
                    response[i].hideFromType=false;
                }
            }
        }
        else if(value==="Trainings"){//Trainings
            for(let i =0;i<response.length;i++){
                if(response[i].session!=="Training"){
                    response[i].hideFromType=true;
                }
                else{
                    response[i].hideFromType=false;
                }
            }
        }
        else{//All
            for(let i =0;i<response.length;i++){
                response[i].hideFromType=false;
            }
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
        this.setState({valueType:value});
    }
    handleChangeTrack= (event, index, value)=>{
        var response=this.state.response_day1;
        if(this.state.day===2){
            response=this.state.response_day2;
        }
        if(value ==="All Tracks"){//All
            for(let i =0;i<response.length;i++){
                response[i].hideFromTrack=false;
            }
        }
        else{
            for(let i =0;i<response.length;i++){
                if(response[i].tracks.indexOf(value)===-1){
                    response[i].hideFromTrack=true;
                }
                else{
                    response[i].hideFromTrack=false;
                }
            }
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
        this.setState({valueTrack:value});
    }
    handleChangeProduct= (event, index, value)=>{
        var response=this.state.response_day1;
        if(this.state.day===2){
            response=this.state.response_day2;
        }
        if(value ==="All Products"){//All
            for(let i =0;i<response.length;i++){
                response[i].hideFromProduct=false;
            }
        }
        else{
            for(let i =0;i<response.length;i++){
                if(response[i].products.indexOf(value)===-1){
                    response[i].hideFromProduct=true;
                }
                else{
                    response[i].hideFromProduct=false;
                }
            }
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
        this.setState({valueProduct:value});
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
                        <br/>
                        <span className="dayHead">{this.state.day} December 2017</span>
                        <div className="filterSection">
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={4} >
                                    <p>All times are Indian Standard Time (UTC+05:30)</p>
                                </Col>
                                <Col xs={12} sm={12} md={3} lg={2} >
                                    <p className="devsite-livestream">Livestreamed</p>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} >
                                    <h4 className="margin-bottom-0">Filter:</h4>
                                    <span>
                                        <SelectField
                                            floatingLabelText="Type"
                                            style = {{marginRight:13}}
                                            value={this.state.valueType}
                                            onChange={this.handleChangeType}
                                            floatingLabelStyle={{color: 'black'}}

                                            >
                                                <MenuItem value={"All Types"} primaryText="All Types" />
                                                <MenuItem value={"Sessions"} primaryText="Sessions" />
                                                <MenuItem value={"Trainings"} primaryText="Trainings" />
                                            </SelectField>
                                            <SelectField
                                                floatingLabelText="Track"
                                                style = {{marginRight:13}}
                                                value={this.state.valueTrack}
                                                onChange={this.handleChangeTrack}
                                                floatingLabelStyle={{color: 'black'}}
                                                >
                                                    <MenuItem value={"All Tracks"} primaryText="All Tracks" />
                                                    <MenuItem value={"Android"} primaryText="Android" />
                                                    <MenuItem value={"Beyond Mobile"} primaryText="Beyond Mobile" />
                                                    <MenuItem value={"Certification"} primaryText="Certification" />
                                                    <MenuItem value={"Develop on mobile"} primaryText="Develop on mobile" />
                                                    <MenuItem value={"Mobile Web"} primaryText="Mobile Web" />
                                                </SelectField>
                                                <SelectField
                                                    floatingLabelText="Product"
                                                    style = {{marginRight:13}}
                                                    value={this.state.valueProduct}
                                                    onChange={this.handleChangeProduct}
                                                    floatingLabelStyle={{color: 'black'}}
                                                    iconStyle={{color: 'black'}}
                                                    >
                                                        <MenuItem value={"All Products"} primaryText="All Products" />
                                                        <MenuItem value={"AMP"} primaryText="AMP" />
                                                        <MenuItem value={"Android"} primaryText="Android" />
                                                        <MenuItem value={"Android Things"} primaryText="Android Things" />
                                                        <MenuItem value={"Assistant"} primaryText="Assistant" />
                                                        <MenuItem value={"Cloud"} primaryText="Cloud" />
                                                        <MenuItem value={"Firebase"} primaryText="Firebase" />
                                                        <MenuItem value={"G Suite"} primaryText="G Suite" />
                                                        <MenuItem value={"Mobile Web"} primaryText="Mobile Web" />
                                                        <MenuItem value={"PWA"} primaryText="PWA" />
                                                        <MenuItem value={"Play"} primaryText="Play" />
                                                        <MenuItem value={"TensorFlow"} primaryText="TensorFlow" />
                                                    </SelectField>
                                                </span>
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
                                                            {tableData.map( (row, index) => {
                                                                if(row.hideFromType||row.hideFromTrack||row.hideFromProduct)
                                                                return null;
                                                                else
                                                                return (
                                                                    <TableRow key={index} selected={this.state.day===1?this.state.arrSelected1.indexOf(row.id)!==-1:this.state.arrSelected2.indexOf(row.id)!==-1}>
                                                                        <TableRowColumn className="time-col">{renderHTML(row.timeColumn)}</TableRowColumn>
                                                                        <TableRowColumn className="description-col">{renderHTML(row.describeColumn)}</TableRowColumn>
                                                                    </TableRow>
                                                                )}
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </Paper>
                                            </div>
                                        </Grid>
                                        <br/><br/><br/><br/>
                                        <ToolbarBottom countSessions={this.state.day===1?this.state.countSessions1:this.state.countSessions2} countTrainings={this.state.day===1?this.state.countTrainings1:this.state.countTrainings2} show={this.state.showToolbarBottom} handleDownloadPdf={this.handleDownloadPdf}/>
                                    </div>
                                );
                            }
                        }

                        export default Home;
