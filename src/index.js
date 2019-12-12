import $ from 'jquery';

/**
 * * ajaxURL = back_service_host_name + back_service_context_path + ajaxBasePath
 * * ajaxBasePath = back_service_rpc_prefix  + functionLetBasePath
 */
class HttpService {

    constructor(options, AppConfig) {
        let SERVICE_HOST_NAME     = AppConfig.back_service_host_name;
        let SERVICE_CONTEXT_PATH  = AppConfig.back_service_context_path;
        if ($.isPlainObject(options)) {
            this.ajaxBasePath  = options.ajaxBasePath;
        }
        else {
            this.ajaxBasePath  = options;
        }

        if (!this.ajaxBasePath) {
            this.ajaxBasePath = "";
        }

        this.requestContextPath   = SERVICE_HOST_NAME + SERVICE_CONTEXT_PATH + this.ajaxBasePath;

        if (!this.requestContextPath.endsWith("/")) {
            this.requestContextPath = this.requestContextPath + "/"
        }

        this.AppConfig = AppConfig;

        this.getRequestPath = this.getRequestPath.bind(this);

        this.post = this.post.bind(this);
        this.__postForMock = this.__postForMock.bind(this);
        this.postWithDefaultErrorHandler = this.postWithDefaultErrorHandler.bind(this);

        this.postJSON = this.postJSON.bind(this);
        this.__postJSONForMock = this.__postJSONForMock.bind(this);
        this.postJSONWithDefaultErrorHandler = this.postJSONWithDefaultErrorHandler.bind(this);

        this.getJSON = this.getJSON.bind(this);
        this.__getJSONForMock = this.__getJSONForMock.bind(this);
        this.getJSONWithDefaultErrorHandler = this.getJSONWithDefaultErrorHandler.bind(this);

    }


    getRequestPath(options) {
        let rpcMethodName = "";
        let ajaxOptions = {};
        if ($.isPlainObject(options)) {
            rpcMethodName = options.rpcMethodName;
            ajaxOptions = options;
        }
        else {
            rpcMethodName = options;
        }

        if (!rpcMethodName) {
            rpcMethodName = "";
        }

        if (ajaxOptions.url) {
            return ajaxOptions.url
        } else {
            return this.requestContextPath + rpcMethodName;
        }
    }

    post(options, jsonObject, mockOptions) {

        if (mockOptions) {
            return this.__postForMock(mockOptions);
        }

        let rpcMethodName = "";
        let ajaxOptions = {};
        if ($.isPlainObject(options)) {
            rpcMethodName = options.rpcMethodName;
            ajaxOptions = options;
        }
        else {
            rpcMethodName = options;
        }

        if (!rpcMethodName) {
            rpcMethodName = "";
        }

        if (jsonObject) {
            ajaxOptions.data = jsonObject;
        }

        if (ajaxOptions.rpcMethodName) {
            delete ajaxOptions.rpcMethodName;
        }

        ajaxOptions.type = "post";
        if (!ajaxOptions.dataType) {
            ajaxOptions.dataType = "json";
        }


        if (!ajaxOptions.url) {
            ajaxOptions.url  = this.requestContextPath + rpcMethodName;
        }

        return $.ajax(ajaxOptions);
    }

    __postForMock(mockOptions) {

        let waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
        return new Promise(function (resolve, reject) {

            setTimeout(function () {
                if (mockOptions.success === false) {
                    return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
                }
                else {
                    let resultData = mockOptions.data ? mockOptions.data : mockOptions;
                    return resolve(resultData);
                }
            }, waitTime)
        });
    }

    postJSON(options, jsonObject, mockOptions) {

        if (mockOptions) {
            return this.__postJSONForMock(mockOptions);
        }

        let rpcMethodName = "";
        let ajaxOptions = {};
        if ($.isPlainObject(options)) {
            rpcMethodName = options.rpcMethodName;
            ajaxOptions = options;
        }
        else {
            rpcMethodName = options;
        }

        if (!rpcMethodName) {
            rpcMethodName = "";
        }

        if (ajaxOptions.rpcMethodName) {
            delete ajaxOptions.rpcMethodName;
        }


        if ($.isPlainObject(ajaxOptions.data)) {
            jsonObject = ajaxOptions.data;
        }


        if (jsonObject) {
            ajaxOptions.data = jsonObject;
        }

        if (ajaxOptions.data) {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }

        ajaxOptions.type = "post";
        ajaxOptions.contentType = "application/json; charset=utf-8";
        if (!ajaxOptions.dataType) {
            ajaxOptions.dataType = "json";
        }

        if (!ajaxOptions.url) {
            ajaxOptions.url  = this.requestContextPath + rpcMethodName;
        }

        return $.ajax(ajaxOptions);
    }

    __postJSONForMock(mockOptions) {

        let waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
        return new Promise(function (resolve, reject) {

            setTimeout(function () {
                if (mockOptions.success === false) {
                    return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
                }
                else {
                    let resultData = mockOptions.data ? mockOptions.data : mockOptions;
                    return resolve(resultData);
                }
            }, waitTime)
        });
    }

    getJSON(options, paramObject, mockData) {

        if (mockData) {
            return this.__getJSONForMock(mockData);
        }

        let rpcMethodName = "";
        let ajaxOptions = {};
        if ($.isPlainObject(options)) {
            rpcMethodName = options.rpcMethodName;
            ajaxOptions = options;
        }
        else {
            rpcMethodName = options;
        }

        if (!rpcMethodName) {
            rpcMethodName = "";
        }

        ajaxOptions.type = "get";
        ajaxOptions.dataType = "json";
        if ($.isPlainObject(paramObject)) {
            ajaxOptions.data = paramObject;
        }

        if (!ajaxOptions.data){
            ajaxOptions.data = {};
        }

        if (!ajaxOptions.data.euts) {
            ajaxOptions.data.euts = (new Date()).getTime();
        }

        if (!ajaxOptions.url) {
            ajaxOptions.url  = this.requestContextPath + rpcMethodName;
        }

        return $.ajax(ajaxOptions);
    }

    __getJSONForMock(mockOptions) {

        let waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
        return new Promise(function (resolve, reject) {

            setTimeout(function () {
                if (mockOptions.success === false) {
                    return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
                }
                else {
                    let resultData = mockOptions.data ? mockOptions.data : mockOptions;
                    return resolve(resultData);
                }
            }, waitTime)
        });
    }

    requestStaticHTMLTemplate(staticTemplateFilePath) {
        return $.ajax({
            url : staticTemplateFilePath,
            dataType: "html"
        });
    }
}

export default HttpService;