import fetchIntercept from 'fetch-intercept';
 
const unregister = fetchIntercept.register({
    request: function (url, config) {
        config.headers.clientId= 175;
        return [url, config];
    },
 
    requestError: function (error) {
        return Promise.reject(error);
    },
 
    response: function (response) {
        if(response.status == 400){
            window.location.href = '/';
        }
        return response;
    },
 
    responseError: function (error) {
        return Promise.reject(error);
    }
});