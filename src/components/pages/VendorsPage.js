// VendorsPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

function VendorsPage (props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <h1>[VendorsPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default VendorsPage;