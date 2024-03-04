export const useGetUserInfo = () => {
    const { userName, profilePicture, userID, isAuth } = JSON.parse(
        localStorage.getItem("auth")) || {};

    return { userName, profilePicture, userID, isAuth };
};
