import React, { Component } from 'react';
import './app-root.css';
import { Form, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { AUTH_HEADER, FETCH_URL, TOP_TRACKS_URL } from './constants';
import Profile from './profile'
import Gallery from './gallery';

class AppRoot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        fetch(FETCH_URL.replace("%query%", this.state.query), {
            method: "GET",
            headers: {
                "Authorization": AUTH_HEADER
            }
        }).then(
            response => response.json()
        ).then(
            json => {
                this.consumeArtistsResponse(json);

                fetch(TOP_TRACKS_URL.replace("%id%", this.state.artist.id), {
                    method: "GET",
                    headers: {
                        "Authorization": AUTH_HEADER
                    }
                }).then(
                    response => response.json()
                ).then(
                    json => {
                        this.consumeTracksResponse(json);
                    }
                );
            }
        );
    }

    consumeArtistsResponse(response) {
        const artist = response.artists.items[0];
        this.setState({ artist });
    }

    consumeTracksResponse(response) {
        const { tracks } = response;
        this.setState({ tracks });
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
                {
                    this.state.artist !== null
                    ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks={this.state.tracks}
                            />
                        </div>
                    :
                        <div></div>
                }
            </div>
        )
    }
}

export default AppRoot;