import React, {Component} from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import Header from './Header';
import classNames from 'classnames';
import renderHTML from 'react-render-html';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import $ from 'jquery';
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
            pdfLink:"",
        }
    }

    handleDayChange = (day) =>{
        this.setState({day});
    }
    
    componentWillMount(){
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
        console.log("PDF Download");
        var tableBody="";
        var response=this.state.response_day1;
        if(this.state.day===2)
        response=this.state.response_day2;
        for(let i=0;i<response.length;i++){
            if(response[i].selected){
                tableBody+="<tr>";
                tableBody+="<td class='time-col'>";
                tableBody+=response[i].timeColumn+"</td>";
                tableBody+="<td class='description-col'>";
                tableBody+=response[i].describeColumn+"</td>";
                tableBody+="</tr>";
            }
        }
        var html=`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                    <title>${this.state.day} December, 2017 - GDD My Schedule</title>
                    <style>
                        body{
                            font-family: sans-serif;
                            white-space: normal;
                            font-size: 12px;
                        }
                        table{
                            background-color: rgb(255, 255, 255);
                            width: 100%;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed;
                            font-family: Roboto, sans-serif;
                        }
                        tr{
                            border-bottom: 1px solid rgb(224, 224, 224);
                            border-top: 1px solid rgb(224, 224, 224);
                            color: rgba(0, 0, 0, 0.87);
                            height: 48px;
                        }
                        td{
                            padding-left: 24px;
                            padding-right: 24px;
                            text-align: left;
                            font-size: 10px;
                            overflow: hidden;
                        }
                        .devsite-event-type {
                            border-radius: 2px;
                            display: inline-block;
                            padding: 4px 8px;
                            white-space: nowrap;
                            margin-right: 5px !important;
                        }
                        .description-col p {
                            margin: 8px 0;
                        }
                        .gdd-event-session-type .devsite-event-type.devsite-event-text {
                            display: block;
                            margin: 5px 0;
                            text-align: center;
                        }
                        .devsite-event-type {
                            border: 1px solid #e0e0e0;
                        }
                        .time-col {
                            width: 20%;
                            min-width: 300px;
                            color: #757575;
                            padding: 0 !important;
                        }
                        .description-col{
                            padding-left: 24px;
                            padding-right: 24px;
                            height: 48px;
                            text-align: left;
                            overflow: hidden;
                        }
                    </style>
                </head>
                <body>
                    <br />
                    <h3>${this.state.day} December 2017 | Google Developers Day India</h3>
                    <br />
                    <table class="home-table" style="">
                        <tbody>
                            ${tableBody}
                        </tbody>
                    </table>
                </body>
            </html>

            `;
            console.log(html)
        axios.post(`http://139.59.19.231/download`,
            {
                html:html,
                }
            )
            .then(response =>{
                console.log(response);
                let pdfLink="http://"+response.data.url;
                this.setState({pdfLink},()=>{
                    this.refs.downloadPdf.click();
                })
            })
            .catch((err)=>{
            })
        }
        resetSelections = (day)=>{
            let response=this.state.response_day1;
            if(day===2){
                response=this.state.response_day2;
            }
            for(var i =0;i<response.length;i++){
                if(!(response[i].hideFromType||response[i].hideFromTrack||response[i].hideFromProduct))
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
            console.log(arr)
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
                        if(!(response[i].hideFromType||response[i].hideFromTrack||response[i].hideFromProduct)){
                        response[i].selected=true;
                        arrSelected.push(i);
                    }
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
                let visible_response=[];
                for(let i=0;i<response.length;i++){
                    if(!(response[i].hideFromType||response[i].hideFromTrack||response[i].hideFromProduct)){
                        visible_response.push(response[i]);
                    }
                }
                for(let i=0;i<arr.length;i++){
                    let id=visible_response[arr[i]].id;
                    for(let j=0;j<response.length;j++){
                        if(response[j].id===id){
                            response[j].selected=true;
                        }
                    }
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
            let fileName="GDD_My_schedule_"+this.state.day+"_December.pdf";
            return (
                <div>
                    <a className="hidden" ref="downloadPdf" download={fileName} href={this.state.pdfLink} />
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
                                                                    let className="";
                                                                    if(row.hideFromType||row.hideFromTrack||row.hideFromProduct)
                                                                    className="hidden";
                                                                    else
                                                                    return (
                                                                        <TableRow key={index} className={className} selected={row.selected}>
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
