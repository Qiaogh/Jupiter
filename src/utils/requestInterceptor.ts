import axios, {AxiosRequestConfig} from 'axios';
import {toast} from "amis";

/**
 * 全局请求拦截，方便对错误进行统一处理
 * @param config
 */
export default function request(config: AxiosRequestConfig) {
    let instance = axios.create();

    config.url = "/gw" + config.url;
    config.headers = config.headers || {};
    config.headers["Authorization"] = <string>localStorage.getItem("Authorization")

    const currentUrl = window.location.href;
    const domain = new URL(currentUrl).hostname;
    // Split the domain by dots and get the first part (before the first dot)
    config.headers["X-TenantID"] = domain.split('.')[0]

    let warehouseCode = <string>localStorage.getItem("warehouseCode");
    if (warehouseCode === null) {
        warehouseCode = "";
    }
    config.headers["X-WarehouseID"] = warehouseCode

    if (config.url.startsWith("/gw/wms")
        && (config.method == 'post' || config.method == 'POST')
        && config.data != undefined && !Array.isArray(config.data)) {
        if (config.headers["Content-Type"] == "application/json") {
            let data = {...JSON.parse(config.data)};
            data["warehouseCode"] = localStorage.getItem("warehouseCode");
            config.data = JSON.stringify(data);
        } else {
            config.data = localStorage.getItem("warehouseCode");
        }
    }

    return new Promise((resolve, reject) => {
        let onSuccess = (res: any) => {
            if (res.data == null) {
                console.log("reject data")
                reject(res);
            } else if (res.status == 401) {
                // 未登陆
                console.log("redirect url", res.data.redirectUrl)
                localStorage.setItem("Authorization", "");
                window.location.href = res.data.redirectUrl;
            } else if (res.status == 402) {
                // 无权限
                console.log("not permission, url", config.url);
                toast['error']('您无访问权限，请申请！', '消息');
                reject(res);
            } else {
                resolve(res)
            }
        }

        let onFail = (error: any) => {
            console.log("onFail", error)
            reject(error);
        }
        return instance.request(config).then(onSuccess, onFail).catch(onFail);
    });
}
