import { BrowserRouter as Router, Route, Link, Redirect, } from "react-router-dom";
import { Button } from "antd-mobile";
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import "./pages/Home/style.less";
function App() {
  return (
    <Router initialEntries={["/home"]}>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        <Route  path="/home/list" component={Home} />
        <Route  path="/home/news" component={Home} />
        <Route  path="/home/profile" component={Home} />
        <Route path="/cityList" component={CityList} />
      </div>
    </Router>
  );
}

export default App;
