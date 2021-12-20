import React, { useRef } from "react";
import { Button, Space, Swiper, Toast } from "antd-mobile";
import { SwiperRef } from "antd-mobile/es/components/swiper";
import  "./style.css";
import axios from "axios";

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className='content'
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
  };
  //获取轮播图数据
  getSwiperData = async () => {
    const ret = await axios.get("");
    this.setState({
      swiper: ret.data.body,
    });
  };
  componentDidMount() {
    // this.getSwiperData();
  }
  render() {
    return (
      <div>
        <div className="swiper">
          <Swiper autoplay>{items}</Swiper>
        </div>
        {/* 导航菜单 */}
        <ul className='navBox'>
          <li>
            <a href="#">
              <span className='local-nav-icon-icon1'></span>
              <span>整租</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className='local-nav-icon-icon1'></span>
              <span>合租</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className='local-nav-icon-icon1'></span>
              <span>地图找房</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className='local-nav-icon-icon1'></span>
              <span>去出租</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Index;
