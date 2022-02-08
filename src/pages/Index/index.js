import React, { useRef } from "react";
import { Button, Space, Swiper, Toast, Grid, SearchBar } from "antd-mobile";
import { LocationFill, DownFill, SearchOutline } from "antd-mobile-icons";
import { SwiperRef } from "antd-mobile/es/components/swiper";
import "./style.less";
import axios from "axios";
import { getCurrentCity } from '../../utils/index'

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className="content"
      style={{ height: 212, background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {/* <img src={item.imgSrc} alt="" style={{width:'100%',verticalAlign:'top'}}/> */}
      {index + 1}
    </div>
  </Swiper.Item>
));

class Index extends React.Component {
  state = {
    swipers: [
      {
        id: "1",
        imgSrc: "../../assets/images/swiper/1.jpg",
        alt: "",
      },
      {
        id: "2",
        imgSrc: "../../assets/images/swiper/2.jpg",
        alt: "",
      },
      {
        id: "3",
        imgSrc: "../../assets/images/swiper/3.jpg",
        alt: "",
      },
      {
        id: "4",
        imgSrc: "../../assets/images/swiper/4.jpg",
        alt: "",
      },
    ],
    groups: [
      {
        id: "1",
        color: "#ace0ff",
        title: "家住回龙观",
        info: "归属的感觉",
      },
      {
        id: "2",
        color: "#bcffbd",
        title: "家住回龙观",
        info: "归属的感觉",
      },
      {
        id: "3",
        color: "#e4fabd",
        title: "家住回龙观",
        info: "归属的感觉",
      },
      {
        id: "4",
        color: "#ffcfac",
        title: "家住回龙观",
        info: "归属的感觉",
      },
    ],
    news: [
      {
        id: "1",
        desc: "置业选择 | 安家贞里 三室一厅 河间的的古雅别院",
        net: "兴华网",
        date: "两天前",
      },
      {
        id: "2",
        desc: "置业选择 | 安家贞里 苍山洱海 河间的的古雅别院",
        net: "新华网",
        date: "一周前",
      },
      {
        id: "3",
        desc: "置业选择 | 安家贞里 花园洋房 清新别墅",
        net: "新华网",
        date: "三周前",
      },
    ],
    curCity:'上海',
  };
  navs = [
    {
      id: "nav-icon1",
      title: "整租",
      path: "/home/list",
    },
    {
      id: "nav-icon2",
      title: "合租",
      path: "/home/common",
    },
    {
      id: "nav-icon3",
      title: "地图找房",
      path: "/map",
    },
    {
      id: "nav-icon4",
      title: "去出租",
      path: "/home/rent",
    },
  ];
  //获取轮播图数据
  getSwiperData = async () => {
    const ret = await axios.get("");
    this.setState({
      swiper: ret.data.body,
    });
  };
  //渲染导航菜单
  renderNavs = () => {
    return this.navs.map((item) => {
      return (
        <li key={item.id}>
          <a href={item.path}>
            <span className={item.id}></span>
            <span className="title">{item.title}</span>
          </a>
        </li>
      );
    });
  };
  //获取租房小组数据
  getGroups = async () => {
    const ret = await axios.get("http://localhost:8080/home/groups", {
      params: {
        area: "",
      },
    });
    this.setState({
      groups: ret.data.body,
    });
  };
  //渲染租房小组数据
  renderGroups = () => {
    return this.state.groups.map((item) => {
      return (
        <Grid.Item key={item.id}>
          <div className="grid-demo-item-block">
            <div className="infoBox">
              <p className="title1">{item.title}</p>
              <span className="info">{item.info}</span>
            </div>
            <div className="imgs"></div>
          </div>
        </Grid.Item>
      );
    });
  };
  //获取最新资讯
  getNews = async () => {
    const ret = await axios.get("");
    this.setState({
      news: ret.data.body,
    });
  };
  //渲染最新资讯
  renderNews = () => {
    return this.state.news.map((item) => {
      return (
        <div className="list" key={item.id}>
          <div className="image"></div>
          <div className="text">
            <h3>{item.desc}</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{item.net}</p>
              <p>{item.date}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  //H5获取地理位置信息
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position, "position");
    });
  };
//   //IP定位
//    myFun =(result)=>{
//     let cityName = result.name;
//     map.setCenter(cityName);
//     alert("当前定位城市:" + cityName);
// }
  async componentDidMount() {
    // this.getSwiperData();
    // this.getGroups();
    // this.getNews()
    // this.getLocation();
   const curCity = await  getCurrentCity()
   console.log(curCity,0)
    this.setState({
      curCity: curCity.label,
    })
  }
  render() {
    return (
      <div className='box'>
        {/* 轮播图 */}
        <div className="swiper">
          <Swiper autoplay>{items}</Swiper>
          <div className="searchBox">
            <div
              className="location"
              onClick={() => this.props.history.push("/cityList")}
            >
              <span>{this.state.curCity}</span>
              <DownFill />
            </div>
            <div className="search">
              <SearchBar placeholder="请输入小区区域地址" />
              {/* <Button style={{padding: '0.2rem 0.5rem', marginTop: '0.3rem'}}
               onClick={() => this.props.history.push('/search')}
                            className="search-icon">
                        <SearchOutline fontSize={16}/>
              </Button> */}
            </div>
            <div
              className="icon-map"
              onClick={() => this.props.history.push("/map")}
            >
              <LocationFill fontSize={28} color="var(--adm-color-weak)" />
            </div>
          </div>
        </div>
        {/* 导航菜单 */}
        <ul className="navBox">{this.renderNavs()}</ul>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="title">
            租房小组<span className="more">更多</span>
          </h3>
          <div style={{ background: "rgb(231, 228, 228)", paddingBottom: 8 }}>
            <Grid columns={2} gap={8}>
              {this.renderGroups()}
            </Grid>
          </div>
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="title">最新资讯</h3>
          {this.renderNews()}
        </div>
      </div>
    );
  }
}

export default Index;
