import React, { Component } from 'react';
import './login.css'
import image from "./login.svg"
import Forget from "./forget"

class Login extends Component {
    
    
    

    constructor(props){
        super(props);

        this.state={
            showMessage:false
        };
        
    }

    registerBtn=()=>
    {
        this.setState({showMessage:true});
    }
    render() { 
        return ( 
            <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form>
                        <div className="form-group">
                            <input id="Email" type="text" className="form-control" placeholder="Your Email " value="" />
                        </div>
                        <div className="form-group">
                            <input  id ="Password" type="password" className="form-control" placeholder="Your Password " value="" />
                        </div>
                        <div className="form-group">
                            <button  type ="submit" className="btnSubmit" onClick="#">Login</button>
                            
                        </div>
                        <div className="form-group">
                            <a href="#" className="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                    
                        <form className="box">
                        <div class="col-md-12">
                        <ul class="social-network social-circle">
                            <h5>connect with</h5>
                            <li><a href="#" className="icoFacebook" title="Facebook" ><i className="fab fa-facebook-f" ><img className="facebookimg" src="https://img.icons8.com/fluent/2x/facebook-new.png" ></img></i></a></li>
                            <li><a href="#" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"><img src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg" alt="Google Login"/></i></a></li>
                            <li><a href="#" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Login"/></i></a></li>
                        </ul>
                    </div>
                        </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Signup</h3>
                    <form>
                    <div className="form-group">
                                <div className="row">
                                    <div className="col-sm">
                                    <input type="text" class="form-control" placeholder="First name " value="" />
                                    </div>
                                    <div className="col-sm">
                                    <input type="text" className="form-control" placeholder="Last name " value="" />
                                    </div>
                                </div>
                    </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Email " value="" />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" placeholder="phone number " value="" />
                        </div>
                        <div class="form-group">
                            <input type="password" className="form-control" placeholder="Your Password " value="" />
                        </div>
                        <div class="form-group">
                            <button type="submit" className="btnSubmit" value="Sign up" onClick={this.registerBtn}>Register</button>
                            {this.state.showMessage && <p>Check your mail!!</p>}
                        </div>
                    </form>
                    
                        <form className="box">
                        <div class="col-md-12">
                        <ul class="social-network social-circle">
                            <h5>connect with</h5>
                            <li><a href="#" className="icoFacebook" title="Facebook" ><i className="fab fa-facebook-f" ><img className="facebookimg" src="https://img.icons8.com/fluent/2x/facebook-new.png" ></img></i></a></li>
                            <li><a href="#" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"><img src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg" alt="Google Login"/></i></a></li>
                            <li><a href="#" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Login"/></i></a></li>
                        </ul>
                    </div>
                        </form>
                   

                </div>
            </div>
        </div>
         );
    }
}
 
export default Login;