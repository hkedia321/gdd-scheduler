import React, {Component} from 'react';
import {
    Route
} from 'react-router-dom';
import {Grid, Col, Row} from 'react-flexbox-grid';
import {Helmet} from "react-helmet";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        let title= "Gdd-Scheduler";
        return (
            <div>
                <Helmet
                    title={title}
                    meta={[
                        {property: 'og:title', content: title},
                        {name: 'description', content: 'GDD-INDIA scheduler'}
                    ]}
                />

            </div>
        );
    }
}

export default Home;
