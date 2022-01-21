import { BrowserRouter as Router, Route, Link, Redirect, } from "react-router-dom";
import { Button } from "antd-mobile";
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import "./pages/Home/style.less";
import Map from "./pages/Map";
function App() {
  return (
    <Router initialEntries={["/home"]}>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        <Route  path="/home/list" component={Home} />
        <Route  path="/home/news" component={Home} />
        <Route  path="/home/profile" component={Home} />
        {/* 不需要tabBar,所以不加/home */}
        <Route path="/cityList" component={CityList} />
        <Route path="/map" component={Map}/>
      </div>
    </Router>
  );
}

export default App;
