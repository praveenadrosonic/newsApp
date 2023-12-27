import React, { Component } from 'react'
import './Weather.css'

interface state {
    city: string
}

export default class Weather extends Component<{},state> {
    
    constructor(props:{}){
        super(props);
        this.state = { 
           city:''
        }
    };
    
    humidity = '';
    visibility = '';
    rainMeasure = '';
    windSpeed = '';
    cloudCover = '';
    temperature = '';
    backgroundUrl = "../staticResources/cloudy.jpg";

    async componentDidMount() {
        const getIpUrl = "https://api.ipgeolocation.io/getip";
        fetch(getIpUrl).then((response)=>{
            return response.json();
        }).then(
            (response)=>{
                fetch(`https://api.ipgeolocation.io/ipgeo?ip=${response.ip}&apiKey=c983d8192e7849918a87d8b45c8dc149`).then(
                async (response)=>{
                        const json1 = await response.json();
                        this.setState(
                            {city:json1.city}
                        )
                        return json1;
                    }
                ).then(
                    (json1)=>{
                        const weatherUrl =encodeURI(`https://api.weatherapi.com/v1/current.json?key=280f74e929d64341802145501232112&q="${json1.city}"&aqi=no`);
                        fetch(weatherUrl).then(
                            async (response)=>{
                                const json =  await response.json();
                                console.log(json);
                                try{
                                    this.humidity = json.current.humidity;
                                    this.visibility = json.current.vis_km;
                                    this.rainMeasure = json.current.precip_mm;
                                    this.windSpeed = json.current.gust_kph;
                                    this.cloudCover = json.current.condition.text;
                                    this.temperature = json.current.temp_c;
                                }catch(e) {
                                    console.error(e);
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    render() {
        return (
            <div style={{background: `url("D:/newsapp/newsapp/src/staticResources/cloudy.jpg")`,height:'calc(100vh - 56px)',color:'white !important'}}>
                <div className='weather-container container'>
                    <div className='weather-heading'>
                        <h1>Current Weather in : {this.state.city}</h1>
                    </div>
                    <div>
                        <h3>Humidity: {this.humidity}</h3>
                        <h3>Cloud Cover: {this.cloudCover}</h3>
                        <h3>Chances of Rainfall: {this.rainMeasure}</h3>
                        <h3>Temprature: {this.temperature}</h3>
                        <h3>Visibility: {this.visibility}</h3>
                        <h3>Wind Speed: {this.windSpeed}</h3>
                    </div>
                </div>
            </div>
        )
    }
}
