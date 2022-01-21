import React from "react";
import { NavBar, Space, Toast } from "antd-mobile";
import "./style.less";
import axios from "axios";
class CityList extends React.Component {
  state = {};
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
   formatCityData = (list)=>{
     const cityList = {}
    //  const cityIndex = []
     //1.遍历list数组
     list.forEach(item =>{
       //2.获取城市首字母
       const first = item.short.substring(0,1)
       //3.判断cityList中是否有该分类
       //cityList[first] ==> [{},{}],用表达式first作为对象cityList的属性名，相当于cityList.a
       if(cityList[first]){
         //如果有，直接push到对应的分类中
         cityList[first].push(item)
       }else{
        //如果没有，就先创建一个数组，然后把当前城市信息添加到数组中
        cityList[first] = [item]
       }
     })
     //sort()默认升序排列
     const cityIndex = Object.keys(cityList).sort()
     return{
       cityList,
       cityIndex,
     }
   }
  getCityList = () => {
    // const ret = axios.get("");
    const ret=[
      {'label':'北京','value':'','pinyin':"beijing",'short':'bj'},
      {'label':'宝鸡','value':'','pinyin':"baoji",'short':'bj'},
      {'label':'安阳','value':'','pinyin':"anyang",'short':'ay'},
      {'label':'安庆','value':'','pinyin':"anqing",'short':'aq'},
      {'label':'常州','value':'','pinyin':"changzhou",'short':'cz'},
      {'label':'长沙','value':'','pinyin':"changsha",'short':'cs'},
      {'label':'长春','value':'','pinyin':"changchun",'short':'cc'},
      {'label':'大连','value':'','pinyin':"dalian",'short':'dl'},
      {'label':'杭州','value':'','pinyin':"hangzhou",'short':'hz'},
      {'label':'合肥','value':'','pinyin':"hefei",'short':'hf'},
      {'label':'郑州','value':'','pinyin':"zhengzhou",'short':'zz'},
      {'label':'湛江','value':'','pinyin':"zhanjiang",'short':'zj'},
      {'label':'武汉','value':'','pinyin':"wuhan",'short':'wh'},
    ]
    const { cityList,cityIndex }= this.formatCityData(ret);
    
    //1.获取热门数据
    // const hotCity = await axios.get('')
    const hotCity = [
      {'label':'北京','value':'','pinyin':"beijing",'short':'bj'},
      {'label':'广州','value':'','pinyin':"guangzhou",'short':'gz'},
      {'label':'上海','value':'','pinyin':"shanghai",'short':'sh'},
      {'label':'深圳','value':'','pinyin':"shenzhen",'short':'sz'},
    ]
    //2.热门数据添加到城市列表中
    cityList['hot']=hotCity
    cityIndex.unshift('hot')
    console.log(cityList,cityIndex);
  };
  componentDidMount() {
    this.getCityList();
  }
  render() {
    return (
      <div className="cityList">
        {/* 顶部导航栏 */}
        <NavBar className="navBar" onBack={this.back}>
          城市选择
        </NavBar>
      </div>
    );
  }
}
export default CityList;
