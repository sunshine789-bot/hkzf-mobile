import React from "react";
import { NavBar, Space, Toast } from "antd-mobile";
import "./style.less";
import axios from "axios";
import { getCurrentCity } from "../../utils/index";
import { AutoSizer, List } from "react-virtualized";
import NavHeader from '../../components/NavHeader'
import styles from './index.module.css';
// const list = Array(100).fill("zzzz");

// function rowRenderer({
//   key, // Unique key within array of rows
//   index, // Index of row within collection
//   isScrolling, // The List is currently being scrolled
//   isVisible, // This row is visible within the List (eg it is not an overscanned row)
//   style, // Style object to be applied to row (to position it)
// }) {
//   return (
//     <div key={key} style={style}>
//       {list[index]+index}
//     </div>
//   );
// }
const TITLE_HEIGHT = 36; //每个索引（A、B的高度）
const NAME_HEIGHT = 50; //每个城市名称的高度
const HOUSE_CITY = ['北京','上海','广州','深圳'];//存在房源的城市
const formatCityIndex = (letter) => {
  switch (letter) {
    case "#":
      return "当前城市";
    case "hot":
      return "热门城市";
    default:
      return letter.toUpperCase();
  }
};
class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      activeIndex: 0, //当前右侧默认高亮索引号
    };
    //创建ref对象
    this.cityListComponent = React.createRef();
  }

  back = () => {
    this.props.history.go(-1);
  };
  /**
   * 接口返回的数据格式
   * [{'label':'北京','value':'','pinyin':"beijing",'short':'bj'}]
   * 渲染城市列表的数据格式为：
   * {a:[{},{}],b:[{},{}]}
   * (上述对象是无序的，渲染时无法按照顺序遍历，所以采用数组的形式)渲染右侧索引的数据格式
   * ['a','b']
   */

  //数据格式化的方法
  //list:[{},{},.....]
  formatCityData = (list) => {
    const cityList = {};
    //  const cityIndex = []
    //1.遍历list数组
    list.forEach((item) => {
      //2.获取城市首字母
      const first = item.short.substring(0, 1);
      //3.判断cityList中是否有该分类
      //cityList[first] ==> [{},{}],用表达式first作为对象cityList的属性名，相当于cityList.a
      if (cityList[first]) {
        //如果有，直接push到对应的分类中
        cityList[first].push(item);
      } else {
        //如果没有，就先创建一个数组，然后把当前城市信息添加到数组中
        cityList[first] = [item];
      }
    });
    //sort()默认升序排列
    const cityIndex = Object.keys(cityList).sort();
    return {
      cityList,
      cityIndex,
    };
  };
  getCityList = async () => {
    // const ret = axios.get("");
    const ret = [
      { label: "北京", value: "ds", pinyin: "beijing", short: "bj" },
      { label: "宝鸡", value: "op", pinyin: "baoji", short: "bj" },
      { label: "安阳", value: "f", pinyin: "anyang", short: "ay" },
      { label: "安庆", value: "fs", pinyin: "anqing", short: "aq" },
      { label: "常州", value: "jk", pinyin: "changzhou", short: "cz" },
      { label: "长沙", value: "jh", pinyin: "changsha", short: "cs" },
      { label: "长春", value: "ytu", pinyin: "changchun", short: "cc" },
      { label: "大连", value: "ty", pinyin: "dalian", short: "dl" },
      { label: "鄂尔多斯", value: "wkt", pinyin: "eerduosi", short: "eeds" },
      { label: "佛山", value: "dsk", pinyin: "foshan", short: "fs" },
      { label: "广州", value: "sm", pinyin: "guangzhou", short: "gz" },
      { label: "杭州", value: "ty", pinyin: "hangzhou", short: "hz" },
      { label: "合肥", value: "qr", pinyin: "hefei", short: "hf" },
      { label: "昆明", value: "ls", pinyin: "kunming", short: "km" },
      { label: "扬州", value: "ydt", pinyin: "yangzhou", short: "yz" },
      { label: "南京", value: "dnn", pinyin: "nanjing", short: "nj" },
      { label: "绍兴", value: "As", pinyin: "shaoxing", short: "sx" },
      { label: "郑州", value: "w", pinyin: "zhengzhou", short: "zz" },
      { label: "湛江", value: "m", pinyin: "zhanjiang", short: "zj" },
      { label: "武汉", value: "yt", pinyin: "wuhan", short: "wh" },
    ];
    const { cityList, cityIndex } = this.formatCityData(ret);

    //1.获取热门数据
    // const hotCity = await axios.get('')
    const hotCity = [
      { label: "北京", value: "sds", pinyin: "beijing", short: "bj" },
      { label: "广州", value: "sdfs", pinyin: "guangzhou", short: "gz" },
      { label: "上海", value: "fd", pinyin: "shanghai", short: "sh" },
      { label: "深圳", value: "hjkh", pinyin: "shenzhen", short: "sz" },
    ];
    //2.热门数据添加到城市列表中
    cityList["hot"] = hotCity;
    cityIndex.unshift("hot");
    //3.当前定位城市数据添加到列表中
    // const curCity = await getCurrentCity();
    cityList["#"] = [{ label: "上海", value: "", short: "2432h" }];
    cityIndex.unshift("#");

    this.setState({
      cityList,
      cityIndex,
    });
  };
  //动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    //索引的高度 + 城市名称的高度 * 城市数量
    const { cityList, cityIndex } = this.state;
    // console.log(index,88)
    return TITLE_HEIGHT + NAME_HEIGHT * cityList[cityIndex[index]].length;
  };
  changeCity({label,value}){
    if(HOUSE_CITY.indexOf(label) > -1){
      //存在房源
      localStorage.setItem("hkzf_city", JSON.stringify({label,value}));
      this.back();
    }else{
      Toast.show({content:'该城市暂无房源数据！',duration:500})
    }
    
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // 重点！！！必须给每一个数据行加，作用：指定每一行的位置
  }) => {
    const { cityIndex, cityList } = this.state;
    let letter = cityIndex[index]; //获取每一行的字母索引
    // console.log(letter,99)
    // console.log(cityList[letter],100)//获取指定字母索引下的城市列表数据
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item) => (
          <div className="name" key={item.value} onClick={()=>this.changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    );
  };
  //用于获取List组件中渲染行的信息
  onRowsRendered = ({ startIndex }) => {
    //startIndex:城市列表开头索引
    if (this.state.activeIndex !== startIndex) {
      this.setState({ activeIndex: startIndex });
    }
  };
  renderCityIndex = () => {
    const { cityList, cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          this.cityListComponent.current.scrollToRow(index);
        }}
      >
        <span className={index === activeIndex ? "index-active" : ""}>
          {item === "hot" ? "热" : item.toUpperCase()}
        </span>
      </li>
    ));
  };
  async componentDidMount() {
    await this.getCityList();
    //调用measureAllRows提前计算List每一行的高度,实现scrollToRow精准跳转
    //注意：城市列表存在的前提下再调用该方法，所以上面代码加await
    console.log(this.cityListComponent,999)
    this.cityListComponent.current.measureAllRows()
  }
  render() {
    return (
      <div className="cityList">
        {/* <div className={styles.test}>测试css modules</div> */}
        {/* 顶部导航栏 */}
        <NavHeader>城市选择</NavHeader>
        {/* 城市列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToIndex={this.state.activeIndex}
              scrollToAlignment='start'
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}
export default CityList;
