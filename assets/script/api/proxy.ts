/**
 * 请求接口的通用方法
 * @return {Object} 常用的4种请求方法，每种方法的参数和返回值定义如下：
 * @param {string} url 请求的 URL
 * @param {Object=} data 请求时需要携带的参数，可选
 * @param {Object=} options 请求的配置项，可选
 * @returns {Object} 服务端返回的 json，或错误对象
 */

import request from '../utils/request';
// import storage from '../utils/storage';
// import Toast from '../components/common/Toast';
// import Store from '../stores';
// import { track } from '../utils/pingback';
// import reportError from '../utils/reportError';

// const PROCESS_ENV = process.env;

async function _request(url: string, data: any, options: any) {
    let timestamp = Date.now(); //网络请求时间戳
    // 一些默认请求配置
    options = Object.assign({
        mode: 'cors',
        cache: 'no-cache',  // 默认每次请求都从服务端检查更新
    }, options);
    options.headers = Object.assign({ 'Accept': 'application/json' }, options.headers);

    // 针对同域请求的处理
    if (! /^(?:https?:)?\/\//.test(url)) {
        // 相对路径前添加 host
        // url = PROCESS_ENV.REACT_APP_API_HOST + url;
        url = 'http://dev.putaoread.top:8091' + url;

        // // 在同域请求的 header 中添加 access_token
        // const token = await storage.getItem('access_token');
        // if (token) {
        //     options.headers = Object.assign({ access_token: token }, options.headers);
        // }
    }

    //TODO 定义一下httpcode  这块可能也不应该判断httpCode
    return request(url, data, options).then(res => {
        // let delay = Date.now() - timestamp;
        // if (delay > 1000) { //只统计接口请求大于1秒的
        //     track({
        //         ac: 'nw',
        //         delay,
        //         url,
        //         data
        //     });
        // }
        // HTTP 状态码处理
        const HTTP_CODE = res.status;
        switch (HTTP_CODE) {
            case 401: // 未登录
                // storage.removeItem('access_token');
                // Store.getInstance().ui.toggleLogin(true);
                return Promise.reject({
                    code: 401,
                    message: '请登录'
                });
            default:
                return res.json();
        }
    }, err => {
        const result = 'code' in err ? err : {
            code: -1,
            message: '网络异常'
        };
        return Promise.reject(result);
    }).catch(err => {
        let result = err;
        if (!('code' in err)) {
            // reportError(err, 'request 异常');  // 上报错误
            result = {
                code: -2,
                message: '未知错误'
            };
        }

        // Toast.info(result.message);
        return Promise.reject(result);
    });
}

export default {
    get: (url: string, data = {}, options = {}) => _request(url, data, Object.assign(options, { method: 'GET' })),
    post: (url: string, data = {}, options = {}) => _request(url, data, Object.assign(options, { method: 'POST' })),
    put: (url: string, data = {}, options = {}) => _request(url, data, Object.assign(options, { method: 'PUT' })),
    del: (url: string, data = {}, options = {}) => _request(url, data, Object.assign(options, { method: 'DELETE' })),
}
