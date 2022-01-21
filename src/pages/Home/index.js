import React from "react";
import { NavBar, TabBar } from "antd-mobile";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import "./style.less";
import HouseList from "../HouseList";
import Profile from "../Profile";
import Index from "../Index";
import News from "../News";
import CityList from "../CityList";
const Bottom = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const setRouteActive = (value) => {
    history.push(value);
  };
  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/home/list",
      title: "找房",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/home/news",
      title: "资讯",
      icon: <MessageOutline />,
    },
    {
      key: "/home/profile",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
  return (
    <div className="tabs" style={{ position: "fixed", bottom: 10 }}>
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};
export default class Home extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="body">
          {/* 嵌套路由，需要带上父路由/home */}
            <Route exact path="/home" component={Index} />
            <Route path="/home/list" component={HouseList} />
            <Route path="/home/news" component={News} />
            <Route path="/home/profile" component={Profile} />
            <Route path="/home/cityList" component={CityList} />
        </div>
        <div className="bottom" style={{ paddingBottom: 60 }}>
          <Bottom />
        </div>
      </div>
    );
  }
}
