import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;
    const enteredOldPassword = oldPasswordRef.current.value;

    // can add some password validation here

    props.onChangePassword({
      newPassword: enteredNewPassword,
      oldPassword: enteredOldPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Current Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
        {props.error}
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>

      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
