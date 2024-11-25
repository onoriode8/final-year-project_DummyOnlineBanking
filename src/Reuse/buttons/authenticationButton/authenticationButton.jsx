import PropTypes from "prop-types";


import "./authenticationButton.css";


const authenticationButton = ({ submit, title }) => {
    // console.log("sub", submit)
    return (
        <div className="authenticationButton_wrapper">
            <button onClick={submit}>{title}</button>
        </div>
    )
};

authenticationButton.propTypes = {
    submit: PropTypes.func,
    title: PropTypes.string,
}

export default authenticationButton;