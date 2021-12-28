export const baseUrl = '/';
export const loginUrl = `${baseUrl}login`;
export const baseInstanceUrl = `${baseUrl}instance/`;
export const instanceUrl = `${baseInstanceUrl}:instanceId/`;
export const getInstanceUrl = (instanceId: string) =>
  `${baseInstanceUrl}${instanceId}`;
export const pinUrl = `${instanceUrl}pin`;
export const getPinUrl = (instanceId: string) =>
  `${getInstanceUrl(instanceId)}pin`;
export const homeUrl = `${instanceUrl}home`;
export const getHomeUrl = (instanceId: string) =>
  `${getInstanceUrl(instanceId)}home`;

export const adminBaseUrl = `${baseUrl}admin/`;
export const adminBaseInstanceUrl = `${adminBaseUrl}instance/`;
export const adminInstanceUrl = `${adminBaseInstanceUrl}:instanceId/`;
export const getAdminInstanceUrl = (instanceId: string) =>
  `${adminBaseInstanceUrl}${instanceId}`;
export const adminPersonsUrl = `${adminInstanceUrl}persons`;
export const adminProductsUrl = `${adminInstanceUrl}products`;
export const adminPaymentsUrl = `${adminInstanceUrl}payments`;
export const adminPurchasesUrl = `${adminInstanceUrl}purchases`;
export const adminSettingsUrl = `${adminInstanceUrl}settings`;

export default baseUrl;
