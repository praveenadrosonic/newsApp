import React, { Component } from 'react'
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
  async componentDidMount() {
    fetch('https://api.ipgeolocation.io/ipgeo?ip=49.248.148.202&apiKey=c983d8192e7849918a87d8b45c8dc149').then(
       async (response)=>{
            const json = await response.json();
            this.setState(
                {city:json.city}
            )
        }
    )
  }
  render() {
    return (
      <div >
        Current Weather in : {this.state.city}
      </div>
    )
  }
}
