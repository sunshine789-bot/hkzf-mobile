import React from "react";
// import './style.less'
import NavHeader from "../../components/NavHeader";
import styles from "./index.module.css";
import axios from "axios";
const BMapGL = window.BMapGL;
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255,0,0)",
  padding: "0px",
  whiteSpace: "nowrap",
  color: "rgb(255,255,255)",
  fontSize: "12px",
  textAlign: "center",
};
export default class Map extends React.Component {
  //初始化地图
  initMap = () => {
    //获取当前定位城市
    const { label, value } = localStorage.getItem("hkzf_city");

    //注意：在React脚手架中，全局对象需要使用window来访问，否则会造成ESlint校验错误
    //创建地图实例
    const map = new BMapGL.Map("container");

    //创建中心点坐标
    // const point = new window.BMapGL.Point(116.404, 39.915);
    //初始化地图，同时设置展示级别
    // map.centerAndZoom(point, 15);

    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      "上海市",
      async function (point) {
        if (point) {
          //初始化地图，同时设置展示级别
          map.centerAndZoom(point, 11);
          //   map.addOverlay(//添加位置标记
          //     new BMapGL.Marker(point, { title: "上海市" })
          //   );

          //   const ret = await axios.get(
          //     `http://localhost:8080/area/map?id=${value}`
          //   );
          //造假数据
          const houseData = [
            {
              label: "杨浦",
              value: "fdwe",
              count: 49,
              coord: { latitude: "31.29397421", longitude: "121.5361245" },
            },
            {
              label: "南汇",
              value: "651",
              count: 651,
              coord: { latitude: "31.05", longitude: "121.76" },
            },
            {
              label: "奉贤",
              value: "dsj",
              count: 78,
              coord: { latitude: "30.92", longitude: "121.46" },
            },
            {
                label: "松江",
                value: "32",
                count: 32,
                coord: { latitude: "31.00", longitude: "121.24" },
              },
              {
                label: "嘉定",
                value: "33",
                count: 99,
                coord: { latitude: "31.40", longitude: "121.24" },
              },
              {
                label: "上海",
                value: "32",
                count: 32,
                coord: { latitude: "31.22", longitude: "121.48" },
              },
              {
                label: "崇明",
                value: "40",
                count: 40,
                coord: { latitude: "31.73", longitude: "121.40" },
              },
              {
                label: "宝山",
                value: "70",
                count: 66,
                coord: { latitude: "31.41", longitude: "121.48" },
              },
              {
                label: "川沙",
                value: "89",
                count: 30,
                coord: { latitude: "31.19", longitude: "121.70" },
              },
              {
                label: "青浦",
                value: "89",
                count: 39,
                coord: { latitude: "31.15", longitude: "121.10" },
              },
          ];
          houseData.forEach((item) => {
            const {
              count,
              coord: { longitude, latitude },
              label: areaName,
            } = item;
            //添加文本标注
            const opts = {
              position: new BMapGL.Point(longitude, latitude),
              offset: new BMapGL.Size(-35, -35), //位置偏移量：设置在坐标中心点
            };

            const label = new BMapGL.Label("", opts); //创建文本标注对象
            label.setStyle(labelStyle);
            //设置房源覆盖物内容
            label.setContent(`
             <div class='${styles.bubble}'>
                 <p class='${styles.name}'>${areaName}</p>
                 <p>${count}套</p>
             </div>
          `);
            //添加覆盖物单击事件
            label.addEventListener("click", () => {
              console.log("房源覆盖物被单击了");
            });
            map.addOverlay(label);
          });
          //添加常用控件
          map.addControl(new BMapGL.ScaleControl());
          map.addControl(new BMapGL.ZoomControl());
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      "上海市"
    );
  };
  //获取房源数据
  getHouseData = () => {
    //   axios.get()
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <div className={styles.map}>
        {/* <div className={styles.test}>测试css modules</div> */}
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>
        {/* 地图 */}
        <div id="container" className={styles.container} />
      </div>
    );
  }
}
