import React, { Component } from 'react'

class Forget extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container login-container">
            <div className="row">
                <div class="col-md-6 login-form-1">
                    <h3>Forget password</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" class="form-control" placeholder="Your Email " value="" />
                        </div>
                        <div className="form-group">
                            <input type="submit" class="btnSubmit" value="send varification link" />
                        </div>
                    </form>
                    
                </div>
                </div>
                </div>
         );
    }
}
 
export default Forget;