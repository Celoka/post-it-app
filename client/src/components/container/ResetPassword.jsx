import React from 'react';

import AppActions from '../../actions/AppActions';
import Navbar from './../presentation/Navbar';

/**
 * @description creates a class reset password as a react component
 *
 * @class ResetPassword
 *
 * @extends {React.Component}
 *
 * @return {void}
 */
class ResetPassword extends React.Component {

  /**
   * @description Creates an instance of ResetPassword.
   *
   * @param { Object } props
   *
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  /**
   *@description Creates an on change event method that
    * monitors the state of the component
    *
    * @param { String } event
    *
    * @memberof ResetPassword
    *
    * @return { void }
    */
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * @description Creates an on submit
   *  event that fires a submit action.
   *
   * @return { void }
   *
   * @param { event } event
   *
   * @memberof ResetPassword
   */
  onSubmit = (event) => {
    event.preventDefault();
    const resetEmail = {
      email: this.state.email
    };
    AppActions.resetPassword(resetEmail)
      .then((res) => {
        if (res) {
          this.props.history.push('/signin');
        }
      });
  }
  /**
   * @return { jsx } rendered jsx element
   *
   * @memberof ResetPassword
   */
  render() {
    return (
      <div>
        <Navbar />
        <h1 className="reset-password"> Reset Password </h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-sm-3 col-md-offset-4">
              <form id="resetpassword" className="col-sm-12" onSubmit={this.onSubmit}>
                <fieldset className="account-info">
                  <label>
                    Email Address
                    <input
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      name="email"
                      required />
                  </label>
                </fieldset>
                <button name="login"
                  id="sign"
                  className="btn btn-primary btn-sm">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
