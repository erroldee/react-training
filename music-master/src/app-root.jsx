import React, { Component } from 'react';
import './app-root.css';
import { Form, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { AUTH_HEADER, FETCH_URL, TOKEN_URL } from './constants';

class AppRoot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    search() {
        this.getAPIToken();
        /*fetch(FETCH_URL.replace("%query%", this.state.query), {
            method: "GET",
            headers: {
                "Authorization": AUTH_HEADER,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(
            response => {
                console.log('response', response);
            }
        );*/
    }

    getAPIToken() {
        fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
            method: 'POST',
            headers: {
                'Authorization': AUTH_HEADER,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => console.log(response.json()));

    }

    render() {
        return (
            <div className="app-root">
                <div className="app-title">Music Master</div>
                <Form
                    onSubmit={event => {
                        event.preventDefault();
                        this.search();
                    }}
                >
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search for an artist..."
                                value={this.state.query}
                                onChange={event => {
                                    this.setState({
                                        query: event.target.value
                                    });
                                }}
                            />
                            <InputGroup.Addon>
                                <Glyphicon
                                    glyph="search"
                                    onClick={() => {
                                        this.search();
                                    }}
                                />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Form>
                <div className="profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default AppRoot;