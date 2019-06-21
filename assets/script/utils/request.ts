/**
 * @description：带超时网络请求类
 */

// import appFetch from './appFetch';
// import { isIOSApp } from './client';

// 对一个 promise 做超时限制
function withTimeLimit(promise: Promise<any>, timeLimit: number = 10000, timeoutMsg: string = '网络超时，请稍后重试~') {
    if (!timeLimit || typeof timeLimit !== 'number') {
        return promise;
    }

    // 创建一个超时 promise
    const timer = new Promise((resolve, reject) => {
        const timeoutFn = () => {
            reject({
                code: -1,
                message: timeoutMsg
            });
        };
        setTimeout(timeoutFn, timeLimit);
    });

    // 竞赛
    return Promise.race([
        promise,
        timer
    ]);
}

// 数据对象转 URL 参数格式
// function objToParams(data = {}) {
//   let params = [];
//   for (let key in data) {
//     params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
//   }
//   return params.join('&');
// }

// 将对象数据以参数形式添加到 URL 上
function urlAddParams(url: string, data = {}) {
    let params = [];
    for (let key in data) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
    return (
        params.length
            ? url + (/\?/.test(url) ? '&' : '?') + params.join('&')
            : url
    );
}

// 通用网络请求
function request(url: string, data = {}, options: any = {}, timeout = 15000) {
    const { method } = options;

    if (method === 'GET' || method === 'HEAD') {
        url = urlAddParams(url, data);

        // A request using the GET or HEAD method cannot have a body.
        if ('body' in options) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
            // delete options.body;
        }
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        options.headers = new Headers(options.headers);
        options.headers.set('Content-Type', 'application/json; charset=utf-8');
        options.body = JSON.stringify(data);
    }

    //   const crossDeviceFetch = isIOSApp ? appFetch : window.fetch;
    return withTimeLimit(window.fetch(url, options), timeout);
}

export default request;
