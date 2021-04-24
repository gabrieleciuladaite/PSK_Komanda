import React, { Component, Fragment } from 'react';
import Icons from './Icons';
import Ctamasonary from './Ctamasonary';

class Content extends Component { 
    render() {
        return (
            <Fragment>
                <Ctamasonary/>
                <Icons/>
            </Fragment>
        );
    }
}

export default Content;