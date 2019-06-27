"use strict";

import Vue from "vue";
import axios from "axios";
import db from "./db";
import api from "./api";

let baseURL;
if (process.env.NODE_ENV == "production") {
  baseURL = "https://mini.yizhou.com.cn";
  baseURL = "http://yizhou.congcong2014.cn";
} else if (process.env.NODE_ENV == "development") {
  baseURL = "http://yizhou.congcong2014.cn";
}
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

function checkStatus(data, _this) {
  // 如果http状态码正常，则直接返回数据
  if (!data) {
    // 异常状态
    Vue.$vux.toast.text("网络请求异常，请检查是否允许应用访问网络。");
    return;
  }
  return data;
}

let axiosRequest = {
  get(_this, url, data, params) {
    if (params) {
      for (let key in params) {
        url = url.replace("{" + key + "}", encodeURIComponent(params[key]));
      }
    }
    return instance({
      method: "get",
      url: url,
      params: params
    })
      .then(data => {
        return checkStatus(data, _this, url);
      })
      .catch(data => {
        console.log(data);
      });
  },
  post(_this, url, data, params) {
    if (params) {
      for (let key in params) {
        url = url.replace("{" + key + "}", encodeURIComponent(params[key]));
      }
    }
    return instance({
      method: "post",
      url: url,
      data: data
    })
      .then(data => {
        return checkStatus(data, _this);
      })
      .catch(data => {
        console.log(data);
      });
  }
};
//插件导出
const httpPlugin = Vue => {
  if (httpPlugin.installed) {
    return;
  }
  Vue.prototype.$http = axiosRequest;
};

//if(typeof window !== "undefined" && window.Vue) {
//window.Vue.use(httpPlugin);
//}

export default httpPlugin;
