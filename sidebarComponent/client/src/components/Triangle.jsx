import React from 'react';
import style from './Triangle.css';

let Triangle = function(props) {
  return <div className={style.triangle}></div>;
};

let TriangleBorder = function(props) {
  return <div className={style['triangle-border']}></div>;
};

let TriangleCover = function(props) {
  return <div className={style['triangle-cover']}></div>;
};

let MouseBridge = function(props) {
  return <div className={style.bridge}></div>;
};

export { MouseBridge, TriangleCover, TriangleBorder, Triangle };
