"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * * ajaxURL = back_service_host_name + back_service_context_path + ajaxBasePath
 * * ajaxBasePath = back_service_rpc_prefix  + functionLetBasePath
 */
var HttpService =
/*#__PURE__*/
function () {
  function HttpService(options, AppConfig) {
    _classCallCheck(this, HttpService);

    var SERVICE_HOST_NAME = AppConfig.back_service_host_name;
    var SERVICE_CONTEXT_PATH = AppConfig.back_service_context_path;

    if (_jquery["default"].isPlainObject(options)) {
      this.ajaxBasePath = options.ajaxBasePath;
    } else {
      this.ajaxBasePath = options;
    }

    if (!this.ajaxBasePath) {
      this.ajaxBasePath = "";
    }

    this.requestContextPath = SERVICE_HOST_NAME + SERVICE_CONTEXT_PATH + this.ajaxBasePath;

    if (!this.requestContextPath.endsWith("/")) {
      this.requestContextPath = this.requestContextPath + "/";
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

  _createClass(HttpService, [{
    key: "getRequestPath",
    value: function getRequestPath(options) {
      var rpcMethodName = "";
      var ajaxOptions = {};

      if (_jquery["default"].isPlainObject(options)) {
        rpcMethodName = options.rpcMethodName;
        ajaxOptions = options;
      } else {
        rpcMethodName = options;
      }

      if (!rpcMethodName) {
        rpcMethodName = "";
      }

      if (ajaxOptions.url) {
        return ajaxOptions.url;
      } else {
        return this.requestContextPath + rpcMethodName;
      }
    }
  }, {
    key: "post",
    value: function post(options, jsonObject, mockOptions) {
      if (mockOptions) {
        return this.__postForMock(mockOptions);
      }

      var rpcMethodName = "";
      var ajaxOptions = {};

      if (_jquery["default"].isPlainObject(options)) {
        rpcMethodName = options.rpcMethodName;
        ajaxOptions = options;
      } else {
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
        ajaxOptions.url = this.requestContextPath + rpcMethodName;
      }

      return _jquery["default"].ajax(ajaxOptions);
    }
  }, {
    key: "__postForMock",
    value: function __postForMock(mockOptions) {
      var waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (mockOptions.success === false) {
            return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
          } else {
            var resultData = mockOptions.data ? mockOptions.data : mockOptions;
            return resolve(resultData);
          }
        }, waitTime);
      });
    }
  }, {
    key: "postJSON",
    value: function postJSON(options, jsonObject, mockOptions) {
      if (mockOptions) {
        return this.__postJSONForMock(mockOptions);
      }

      var rpcMethodName = "";
      var ajaxOptions = {};

      if (_jquery["default"].isPlainObject(options)) {
        rpcMethodName = options.rpcMethodName;
        ajaxOptions = options;
      } else {
        rpcMethodName = options;
      }

      if (!rpcMethodName) {
        rpcMethodName = "";
      }

      if (ajaxOptions.rpcMethodName) {
        delete ajaxOptions.rpcMethodName;
      }

      if (_jquery["default"].isPlainObject(ajaxOptions.data)) {
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
        ajaxOptions.url = this.requestContextPath + rpcMethodName;
      }

      return _jquery["default"].ajax(ajaxOptions);
    }
  }, {
    key: "__postJSONForMock",
    value: function __postJSONForMock(mockOptions) {
      var waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (mockOptions.success === false) {
            return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
          } else {
            var resultData = mockOptions.data ? mockOptions.data : mockOptions;
            return resolve(resultData);
          }
        }, waitTime);
      });
    }
  }, {
    key: "getJSON",
    value: function getJSON(options, paramObject, mockData) {
      if (mockData) {
        return this.__getJSONForMock(mockData);
      }

      var rpcMethodName = "";
      var ajaxOptions = {};

      if (_jquery["default"].isPlainObject(options)) {
        rpcMethodName = options.rpcMethodName;
        ajaxOptions = options;
      } else {
        rpcMethodName = options;
      }

      if (!rpcMethodName) {
        rpcMethodName = "";
      }

      ajaxOptions.type = "get";
      ajaxOptions.dataType = "json";

      if (_jquery["default"].isPlainObject(paramObject)) {
        ajaxOptions.data = paramObject;
      }

      if (!ajaxOptions.data) {
        ajaxOptions.data = {};
      }

      if (!ajaxOptions.data.euts) {
        ajaxOptions.data.euts = new Date().getTime();
      }

      if (!ajaxOptions.url) {
        ajaxOptions.url = this.requestContextPath + rpcMethodName;
      }

      return _jquery["default"].ajax(ajaxOptions);
    }
  }, {
    key: "__getJSONForMock",
    value: function __getJSONForMock(mockOptions) {
      var waitTime = mockOptions.waitTime ? mockOptions.waitTime : 600;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (mockOptions.success === false) {
            return reject(new Error(mockOptions.message ? mockOptions.message : "请求数据发生异常"));
          } else {
            var resultData = mockOptions.data ? mockOptions.data : mockOptions;
            return resolve(resultData);
          }
        }, waitTime);
      });
    }
  }, {
    key: "requestStaticHTMLTemplate",
    value: function requestStaticHTMLTemplate(staticTemplateFilePath) {
      return _jquery["default"].ajax({
        url: staticTemplateFilePath,
        dataType: "html"
      });
    }
  }]);

  return HttpService;
}();

var _default = HttpService;
exports["default"] = _default;