import React from "react";
import { connect } from "react-redux";

import { login, getAuthUser } from "../../actions";

import Logo from "../../images/logo.svg";
import Illustration from "../../images/illustration.svg";

import "./style.css";
import { Navigate } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            password: ''
        }
    }
    makeLogin = (e) => {
        e.preventDefault();
        const {userId, password} = this.state;
        this.props.login(userId, password);

    }

    adjustCssClass = () => {
        const body = document.querySelector('body');
        if(body) body.setAttribute('style', "padding: 0; margin: 0");
    }

    componentDidMount() {
        this.props.getAuthUser();
        this.adjustCssClass();
    }

    render() {
        const {userId, password}  = this.state;
        console.log("User: ", this.props.user);
        if(this.props.user) {
            return (
                <Navigate to="/"/>
            )
        }
        return (
            <div className="login">
                <div className="container sm:px-10">
                    <div className="block xl:grid grid-cols-2 gap-4">
                        <div className="hidden xl:flex flex-col min-h-screen">
                            <a href="" className="-intro-x flex items-center pt-5">
                                <img alt="Rubick Tailwind HTML Admin Template" className="w-6" src={Logo}/>
                                <span className="text-white text-lg ml-3"> Ru<span className="font-medium">bick</span> </span>
                            </a>
                            <div className="my-auto">
                                <img alt="Rubick Tailwind HTML Admin Template" className="-intro-x w-1/2 -mt-16" src={Illustration}/>
                                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                    A few more clicks to
                                    <br/>
                                    sign in to your account.
                                </div>
                                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">Manage all your e-commerce accounts in one place</div>
                            </div>
                        </div>
                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Sign In
                                </h2>
                                <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place</div>
                                <form onSubmit={this.makeLogin}>
                                    <div className="intro-x mt-8">
                                        <input type="text"
                                        className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                                        placeholder="Email"
                                        value={userId}
                                        onChange={(e) => {
                                            this.setState({
                                                userId: e.target.value
                                            });
                                        }}
                                        />
                                        <input type="password"
                                        className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            this.setState({
                                                password: e.target.value
                                            });
                                        }}
                                        />
                                    </div>

                                    <div className="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4">
                                        <div className="flex items-center mr-auto">
                                            <input id="remember-me" type="checkbox" className="form-check-input border mr-2"/>
                                            <label className="cursor-pointer select-none" htmlFor="remember-me">Remember me</label>
                                        </div>
                                    </div>

                                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                        <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {login, getAuthUser})(Login);
