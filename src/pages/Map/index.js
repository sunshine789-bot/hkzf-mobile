import React from 'react';
import './style.less'
export default class Map extends React.Component {

    componentDidMount(){
        //注意：在React脚手架中，全局对象需要使用window来访问，否则会造成ESlint校验错误
        //创建地图实例
        const map = new window.BMapGL.Map('container');
        //创建中心点坐标
        const point = new window.BMapGL.Point(116.404,39.915);
        //初始化地图，同时设置展示级别
        map.centerAndZoom(point,15)

    }
    render() {
        return(
            <div className='map'>
                <div id='container'>

                </div>
            </div>
        )
    }
}