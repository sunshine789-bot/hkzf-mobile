import React from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import "./style.less";
import PropTypes from 'prop-types';
function NavHeader({ children, history, onBack }) {  //props解构出来的参数
  const defaultHandler = () => history.go(-1);
  return (
    <NavBar className="navBar" onBack={onBack || defaultHandler}>
      {children}
    </NavBar>
  );
}
// 添加props校验
NavHeader.propTypes ={
    children: PropTypes.string.isRequired,
    onBack: PropTypes.func,
}
export default withRouter(NavHeader);
