import React, { ReactNode, SyntheticEvent } from "react";
import ApiCalendar from "react-google-calendar-api";
import Event from './components/Event/index';

const config = {
    clientId: "57090579544-pq7ur7r2r42uqpd6uq5r95g3s55a9jme.apps.googleusercontent.com",
    apiKey: "AIzaSyBQLBw71zHs2WEwyepFCOmr7zhdrw9qTBU",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
};

const apiCalendar = new ApiCalendar(config);

export default class DoubleButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event, name) {
        if (name === "sign-in") {
            apiCalendar.handleAuthClick();
        } else if (name === "sign-out") {
            apiCalendar.handleSignoutClick();
        }
    }

    render() {
        return (
            <>
                <button onClick={(e) => this.handleItemClick(e, "sign-in")}>sign-in</button>
                <button onClick={(e) => this.handleItemClick(e, "sign-out")}>sign-out</button>
            </>
        );
    }
}
