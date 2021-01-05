import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  state = {
    showMessage: false,
    login: {
      email: "",
      password: "",
    },
    register: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
  };

  onChange = ({ target }) => {
    if (target.id === "login") {
      let temp = this.state.login;
      temp[target.name] = target.value;
      this.setState(this.state);
    } else if (target.id === "register") {
      let temp = this.state.register;
      temp[target.name] = target.value;
      this.setState(this.state);
    }
  };

  register = (e) => {
    e.preventDefault();
    this.setState({ showMessage: true });
  };
  login = (e) => {
    e.preventDefault();
    console.log("Login user");
  };
  render() {
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Login</h3>
            <form onSubmit={this.login}>
              <div className="form-group">
                <input
                  id="login"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Your Email "
                  onChange={this.onChange}
                  value={this.state.login.email}
                />
              </div>
              <div className="form-group">
                <input
                  id="login"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  onChange={this.onChange}
                  value={this.state.login.password}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btnSubmit">
                  Login
                </button>
              </div>
              <div className="form-group">
                <a href="#" className="ForgetPwd">
                  Forget Password?
                </a>
              </div>
            </form>

            <form className="box">
              <div className="col-md-12">
                <ul className="social-network social-circle">
                  <h5>connect with</h5>
                  <li>
                    <a href="#" className="icoFacebook" title="Facebook">
                      <i className="fab fa-facebook-f">
                        <img
                          className="facebookimg"
                          src="https://img.icons8.com/fluent/2x/facebook-new.png"
                        ></img>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoTwitter" title="Twitter">
                      <i className="fab fa-twitter">
                        <img
                          src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg"
                          alt="Google Login"
                        />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoGoogle" title="Google +">
                      <i className="fab fa-google-plus">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          alt="Google Login"
                        />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="col-md-6 login-form-2">
            <h3>Signup</h3>
            <form onSubmit={this.register}>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm">
                    <input
                      id="register"
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="First name "
                      onChange={this.onChange}
                      value={this.state.register.firstName}
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      id="register"
                      name="lastName"
                      type="text"
                      className="form-control"
                      placeholder="Last name "
                      onChange={this.onChange}
                      value={this.state.register.lastName}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  id="register"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Your Email "
                  onChange={this.onChange}
                  value={this.state.register.email}
                />
              </div>
              <div className="form-group">
                <input
                  id="register"
                  name="mobileNumber"
                  type="number"
                  className="form-control"
                  placeholder="phone number "
                  onChange={this.onChange}
                  value={this.state.register.mobileNumber}
                />
              </div>
              <div className="form-group">
                <input
                  id="register"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Your Password "
                  onChange={this.onChange}
                  value={this.state.register.password}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btnSubmit">
                  Register
                </button>
                {this.state.showMessage && <p>Check your mail!!</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
