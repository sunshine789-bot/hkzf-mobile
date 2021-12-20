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
import styles from "./demo2.less";
import HouseList from "../HouseList";
import Profile from "../Profile";
import Index from "../Index";
import News from "../News";
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
    <div className="tabs" style={{ position: "fixed", bottom: 0 }}>
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
      <div className={styles.app}>
        <div className={styles.body}>
          <Switch>
            <Route exact path="/home">
              <Index />
            </Route>
            <Route  path="/home/list">
              <HouseList />
            </Route>
            <Route  path="/home/news">
              <News />
            </Route>
            <Route  path="/home/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    );
  }
}


