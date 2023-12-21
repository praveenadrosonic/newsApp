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
    rainProbability = '';
    windSpeed = '';
    cloudCover = '';
    temperature = '';
  async componentDidMount() {
    fetch('https://api.ipgeolocation.io/ipgeo?ip=49.248.148.202&apiKey=c983d8192e7849918a87d8b45c8dc149').then(
       async (response)=>{
            const json = await response.json();
            this.setState(
                {city:json.city}
            )
            const longitude = Number(json.longitude);
            const latitude = Number(json.latitude);
            const weatherUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${longitude},${latitude}&apikey=vm3UW54k0ZONa3xouyyXsgvZyWolBARd`;
            fetch(weatherUrl).then(
                async (response)=>{
                    const json =  await response.json();
                    this.humidity = json.timeline.minutely[0].values.humidity;
                    this.visibility = json.timeline.minutely[0].values.visibility;
                    this.rainProbability = json.timeline.minutely[0].values.precipitationProbability;
                    this.windSpeed = json.timeline.minutely[0].values.temperature;
                    this.cloudCover = json.timeline.minutely[0].values.cloudCover;
                    this.temperature = json.timeline.minutely[0].values.temperature;
                }
            )
        }
    )
  }

  render() {
    return (
        <>
            <div className='weather-container container'>
                <div className='weather-heading'>
                    <h1>Current Weather in : {this.state.city}</h1>
                </div>
                <div>
                    <h3>Humidity: {this.humidity}</h3>
                    <h3>Cloud Cover: {this.cloudCover}</h3>
                    <h3>Chances of Rainfall: {this.rainProbability}</h3>
                    <h3>Temprature: {this.temperature}</h3>
                    <h3>Visibility: {this.visibility}</h3>
                    <h3>Wind Speed: {this.windSpeed}</h3>
                </div>
            </div>
        </>
    )
  }
}
