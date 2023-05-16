import { service } from "./service";

const request = (option) => {
  const { url, method, params, data, headersType, responseType } = option;
  // eslint-disable-next-line no-debugger
  return service({
    // `url` is the server URL that will be used for the request
    url: url,
    // `method` is the request method to be used when making the request
    // options are: 'get', 'post', 'put', 'delete'
    method,
    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    // NOTE: params that are null or undefined are not rendered in the URL.
    params,
    // `data` is the data to be sent as the request body
    data,
    // `responseType` indicates the type of data that the server will respond with
    // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
    //   browser only: 'blob'
    responseType: responseType,
    // `headers` are custom headers to be sent
    headers: {
      "Content-Type": headersType,
      // 'Access-Control-Allow-Origin': '*',
      // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    },
  });
};
export default {
  get: (option) => {
    return request({ method: "get", ...option });
  },
  post: (option) => {
    return request({ method: "post", ...option });
  },
  delete: (option) => {
    return request({ method: "delete", ...option });
  },
  put: (option) => {
    return request({ method: "put", ...option });
  },
};
