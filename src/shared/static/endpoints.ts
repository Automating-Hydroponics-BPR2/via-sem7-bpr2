/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;

// #region userEndpoints
export const userEndpoints = {
  login: () => `${baseUrl}/user/login`,
  register: () => `${baseUrl}/user/register`,
  delete: () => `${baseUrl}/user`,
  update: () => `${baseUrl}/user`,
};
// #endregion

// #region deviceEndpoints
export const deviceEndpoints = {
  create: () => `${baseUrl}/device/new`,
  get: (id: string) => `${baseUrl}/device?id=${id}`,
  update: (id: string) => `${baseUrl}/device?id=${id}`,
  delete: (id: string) => `${baseUrl}/device?id=${id}`,
  getCurrent: (id: string) => `${baseUrl}/device/current?id=${id}`,
  getHistorical: (id: string, start: string, end: string, type?: string) =>
    type
      ? `${baseUrl}/device/historical?id=${id}&start=${start}&end=${end}&type=${type}`
      : `${baseUrl}/device/historical?id=${id}&start=${start}&end=${end}`,
  getDeviceIds: () => `${baseUrl}/device/all`,
};
// #endregion
