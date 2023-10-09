/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;

// #region userEndpoints
export const userEndpoints = {
  signIn: () => `${baseUrl}/user/login`,
  signUp: () => `${baseUrl}/user/register`,
};
// #endregion
