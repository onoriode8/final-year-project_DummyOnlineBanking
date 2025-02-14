import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({
    sideDrawer: false,
    toggleSideDrawerHandler: () => {},
    showBalance: false,
    toggleShowBalanceHandler: () => {},
    balance: 0.00,
    fullname: null,
    walletNumber: null,
    userId: null,
    token: null,
    email: null,
    username: null,
    image: null,
    friendsref: null,
    secret: null,
    notification: [],
    isMFA: false,
    referenceCode: null,
    error: null,
    errorFun: () => {},
    logout: () => {}
});


export const ContextProvider = (props) => {
    const sessionData = sessionStorage.getItem("user");
    const parsedUserData = JSON.parse(sessionData);


    const [showBalance, setShowBalance] = useState(false);
    const [sideDrawer, setSideDrawer] = useState(false);

    const navigate = useNavigate();

    //useState for updating user fetch data.
    const [userData, setUserData] = useState({ balance: 0.00, fullname: null,
            walletNumber: null, token: null, email: null, userId: null,
            username: null, image: null, friendsref: null, secret: null,
            notification: [], isMFA: false,
         })
    const [error, setError] = useState();

    //useEffect for fetching user data from the server and rendering to UI when the UI gets reloaded.
    useEffect(() => {
        const fetchData = async() => {
          try {
              const response = await fetch(`https://final-year-project-pijh.onrender.com/user/${parsedUserData.id}`,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + parsedUserData.token
                }
              })
              const responseData = await response.json();
              if(response.ok === false) {
                throw new Error(responseData)
              }
              setUserData({
                balance: responseData.balance, walletNumber: responseData.walletNumber,
                fullname: responseData.fullname, token: parsedUserData.token, 
                email: responseData.email, username: responseData.username,
                userId: responseData._id, notification: responseData.notification,
                secret: responseData.twoFactorAuthenticator ? responseData.twoFactorAuthenticator.secret : null,
                image: responseData.image, friendsref: responseData.friendsref,
                isMFA: responseData.isMFA, referenceCode: responseData.referenceCode
              })
          } catch(err) {
              const errorM = "Check your connection!";
              setError(`Something went wrong. ${errorM}` || err.message);
          }
        };
    
        fetchData();
    }, [parsedUserData.id, parsedUserData.token]); 


    const toggleShowBalanceHandler = useCallback(() => {
        const toggle = showBalance;
        setShowBalance(!toggle);
    }, [showBalance]);

    const toggleSideDrawerHandler = useCallback(() => {
        const toggleSideDrawer = sideDrawer;
        setSideDrawer(!toggleSideDrawer);
    }, [sideDrawer]);


    //function to logout user.
    const logoutHandler = () => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("user");
        navigate("/");
    }
      


    return (
        <AuthContext.Provider value={{showBalance: showBalance, token: userData.token,
           toggleShowBalanceHandler: toggleShowBalanceHandler, email: userData.email,
           toggleSideDrawerHandler: toggleSideDrawerHandler, username: userData.username,
           balance: userData.balance, fullname: userData.fullname,
           userId: userData.userId, secret: userData.secret,
           walletNumber: userData.walletNumber, logout: logoutHandler,
           image: userData.image, friendsref: userData.friendsref, error: error, errorFun:() => setError(null),
           sideDrawer: sideDrawer, notification: userData.notification,
           isMFA: userData.isMFA, referenceCode: userData.referenceCode  }}>
            {props.children}
        </AuthContext.Provider>
    )
}