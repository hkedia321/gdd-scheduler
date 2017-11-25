import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import {Grid, Col, Row} from 'react-flexbox-grid';
import {Helmet} from "react-helmet";
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div className="footer-wrapper">

                    <Grid>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={3} >

                            </Col>
                            <Col xs={12} sm={6} md={6} lg={3} >
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={3} >
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={3} >
                            </Col>
                        </Row>
                    </Grid>

            </div>
        );
    }
}

export default Footer;
