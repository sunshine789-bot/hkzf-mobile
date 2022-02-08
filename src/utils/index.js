import axios from "axios";
export const getCurrentCity = () => {
  /*本地存储：localStorage只支持string类型的存储(目前所有的浏览器中都会把localStorage的值类型限
    定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换)，但是将来我们需要把一个对象存储到本地，
    所以将它转成json对象*/
  const localCity = JSON.parse(localStorage.getItem("hkzf_city"));
  if (!localCity) {//判断localStorage中是否有定位城市
    //如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
    const curCity = new window.BMapGL.LocalCity();
    curCity.get(async (res) => {
      return new Promise(async(resolve, reject) => { //解决js中的异步返回结果问题，采用Promise对象
        try {
          const ret = await axios.get(`http://localhost:8080/area/info?name=${res.name}`);
          //ret.data.body
          //存储到本地存储中
          localStorage.setItem("hkzf_city", JSON.stringify(ret.data.body));
          //返回该城市数据
          // return ret.data.body;//此法无法返回，这是get的 异步回调函数
          resolve(ret.data.body);
        } catch (e) {
          reject(e); //获取定位城市失败
        }
      });
    });
    //如果有，直接返回本地存储中定位城市的数据
    //注意：为保持返回数据统一，此处也应该返回一个Promise对象
    return Promise.resolve(localCity);//因为此处promise不会失败，所以返回一个成功的Promise即可
  }
};
