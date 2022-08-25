import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Notify } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  withCredentials: true,
  baseURL: '/',
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const err = error as {
    response?: {status: number, data: unknown},
    config?: {headers: Record<string, string>}
  };

  /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
  const message = error.response?.data?.error
    || (error.response?.data?.errors || [])[0]?.message;
  /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

  console.log('message',message)

  const suppressError = (err.config?.headers['X-SuppressError'] || '')
    .split(',');
  const responseStatus = err.response?.status ? String(err.response?.status) : null;

  console.log(suppressError, responseStatus, suppressError.length > 0 && responseStatus && suppressError.includes(responseStatus))

  if (typeof message !== 'string') {
    Notify.create({type: 'negative', message: String(err.response?.data || 'Error occurred')})
  } else if (suppressError.length > 0 && responseStatus && suppressError.includes(responseStatus)) {
    // don't create notification
  } else if (message) {
    Notify.create({type: 'negative', message: message})
  }

  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
