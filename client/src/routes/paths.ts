export const baseUrl = '/';
export const loginUrl = `${baseUrl}login`;
export const baseInstanceUrl = `${baseUrl}instance/`;
export const instanceUrl = `${baseInstanceUrl}:instanceId/`;
export const getInstanceUrl = (instanceId: string) =>
  `${baseInstanceUrl}${instanceId}/`;
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
  `${adminBaseInstanceUrl}${instanceId}/`;
export const adminPersonsUrl = `${adminInstanceUrl}persons`;
export const getAdminPersonsUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}persons`;
export const adminProductsUrl = `${adminInstanceUrl}products`;
export const getAdminProductsUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}products`;
export const adminProductCategoriesUrl = `${adminInstanceUrl}product-categories`;
export const getAdminProductCategoriesUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}product-categories`;
export const adminPaymentsUrl = `${adminInstanceUrl}payments`;
export const getAdminPaymentsUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}payments`;
export const adminPurchasesUrl = `${adminInstanceUrl}purchases`;
export const getAdminPurchasesUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}purchases`;
export const adminSettingsUrl = `${adminInstanceUrl}settings`;
export const getAdminSettingsUrl = (instanceId: string) =>
  `${getAdminInstanceUrl(instanceId)}settings`;

export default baseUrl;
