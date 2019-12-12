## Introduction

boot-httpservice is simple and base http service for manage system frontend project, it is main used with ES 2017 Async/Await

## we suggest use it like below:
```js

class HttpServiceAwareComponent extends AppConstantsAwareComponent {

    constructor(props) {
        super(props);

        this.ajaxOptions = {ajaxBasePath: this.getAjaxBasePath()};
        this.http = this.http.bind(this);
        this.getAjaxOptions = this.getAjaxOptions.bind(this);
        this.dealAjaxException = this.dealAjaxException.bind(this);
        this.loadModuleConfig = this.loadModuleConfig.bind(this);
    }

    http() {
        return new HttpService(this.getAjaxOptions(), this.AppConfig);
    }

    getRequestPath(options) {
        return new HttpService(this.getAjaxOptions(), this.AppConfig).getRequestPath(options);
    }

    getAjaxOptions() {
        return this.ajaxOptions;
    }

    getAjaxBasePath() {
        // wait for you to implement
    }

    dealAjaxException(httpExceptionResponse) {
        // implement yourself excepion dealer
    }

}

export default HttpServiceAwareComponent;

```

```js
class BillListQueryComponent extends HttpServiceAwareComponent {

    constructor(props) {

    }

    getAjaxBasePath() {
        return "/api/bill/";
    }

    async queryBillData() {
        try {
            let bill_pk = this.getParameterValue("bill_pk");

            let result = await this.http().getJSON("queryBillData", {bill_pk: bill_pk});

            // do you what you want
        }
        catch (e) {
            this.dealAjaxException(e);
        }
    }

}

```
## License

[MIT](http://opensource.org/licenses/MIT)