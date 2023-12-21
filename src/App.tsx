import React, { Component} from 'react'
import NavBar from './components/NavBar.tsx'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import AboutUs from './components/AboutUs.tsx';
import NewsComponent from './components/NewsComponent.tsx';
import Weather from './components/Weather.tsx';
export default class App extends Component {
  render() {
    return (
      <>
      <NavBar/>
        <Router>
          <Routes> 
            <Route  path='/' element={<NewsComponent />}></Route>
            <Route  path='/weather' element={<Weather/>}></Route>
            <Route  path='/aboutus' element={<AboutUs/>}></Route>                
          </Routes>
        </Router>
      </> 
    )
  }
}
//1487053d29f9460485bf80ee29944a1b