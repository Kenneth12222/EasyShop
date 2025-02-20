// 
// authConfig.js is a utility function that returns an object with the withCredentials property set to true. This object is used as the third argument in the post, put, and del functions in the productApi, cartApi, and orderApi modules. This ensures that the API requests include the credentials (cookies) needed for authentication.
export const getAuthConfig = () => ({
    withCredentials: true,
});
