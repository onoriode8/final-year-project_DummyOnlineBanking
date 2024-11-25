import PropTypes from "prop-types";
import { FcLock } from "react-icons/fc";

//import { Link } from "react-router-dom";


import AuthenticationButton from "../../Reuse/buttons/authenticationButton/authenticationButton";



import "./authentication.css";



const authentication = ({ account, header, path, titleOnButton, paragraph, 
    onChangePasswordHandler, onChangeEmailHandler, onChangeUsernameHandler,
    onSubmitFuncHandler, showPassword, setPrevStateHandler, showSignIn,
    error, loading  }) => {
    // console.log("submit", onSubmitFuncHandler)
    return(
    <div>
        <div className="authentication_main_wrapper">
            <div className="authentication_logo_area">
                <p><FcLock /></p>
                <header>{header}</header>
            </div>

            <div className="authentication_input_wrapper">
                {!showSignIn && <div className="authentication_username_email_wrapper">
                    <label>Email address</label>
                    <input type="text" onChange={onChangeEmailHandler} placeholder="" />
                </div>}

                <div className="authentication_username_email_wrapper">
                    <label>Username</label>
                    <input type="text" onChange={onChangeUsernameHandler} placeholder="" />
                </div>

                <div className="authentication_password_container">
                    <label>Password</label>
                    <input type={!showPassword ? "password" : "text"} onChange={onChangePasswordHandler} placeholder="" />
                    <div className="authentication_showPassword_wrapper" onClick={setPrevStateHandler}>
                        <input type="checkbox" />
                        <div>Show password</div>
                    </div>
                </div>
            </div>
            
            <div>
                <AuthenticationButton title={titleOnButton} submit={onSubmitFuncHandler} />
            </div>

            <div className="authentication_create_an_account">
            <p>{paragraph} </p>
            <p><a href={`${path}`}> {account}</a></p>
        </div>
        <div style={{textAlign: "center"}}>
            {loading && <p>Loading...</p>}
            <p>{error}</p>
        </div>

        </div>

        

    </div>
)};

authentication.propTypes = {
    onChangeUsernameHandler: PropTypes.func,
    onChangeEmailHandler: PropTypes.func,
    onChangePasswordHandler: PropTypes.func,
    onSubmitSignInHandler: PropTypes.func,
    path: PropTypes.string,
    account: PropTypes.string,
    header: PropTypes.string,
    titleOnButton: PropTypes.string,
    paragraph: PropTypes.string
}

export default authentication;