import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import {Grid, Col, Row} from 'react-flexbox-grid';
import {Helmet} from "react-helmet";
import  mainlogo from './../gdd-logo.svg';
import './Schedule.css';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    myFunction = () => {
        let x = this.refs.myTopnav;
    }

    render() {
        let title= "Gdd-Scheduler";
        let topnav = true;
        return (
            <div>
                <Helmet>
                    <meta name="description" content="Gdd scheduler" />
                    <meta property="og:type" content="Gdd" />
                    <meta charset="utf-8" />
                    <meta name="author" content="Harshit Kedia" />
                    <meta property="og:type" content="website" />
                    <meta itemprop="image" content={mainlogo} />


                    <title>{title}</title>
                    <link rel="shortcut icon" href="https://developers.google.com/_static/2f20c0c6d8/images/favicon.png">
                    </link>

                </Helmet>
                <div className="navbar">
                    <p className="navPara">
                        <img src={mainlogo} style={{width:40}}></img>
                        <span className="navText"> Google Developers Days </span>

                    </p>
                </div>
            </div>
        );
    }
}

export default Header;
