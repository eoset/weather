import React from 'react';
import axios from 'axios';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'd3b4772714fb77d701d4a4001aac34c0';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        if(!city && !country) {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: 'Please fill in needed values...'
            });
        }
        else {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                if(city && country) {
                    console.log(response);
                    this.setState({
                        temperature: response.data.main.temp,
                        city: response.data.name,
                        country: response.data.sys.country,
                        humidity: response.data.main.humidity,
                        description: this.capitalizeFirstLetter(response.data.weather[0].description),
                        error: ''
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main1">
                        <div className="container1">
                            <div className="row1">
                                <div className="logoAndTitle">
                                    <Titles />
                                </div>
                                <div className="inputAndInfo">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather 
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


                

export default App;