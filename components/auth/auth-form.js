import classes from "./auth-form.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../loader/loader";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setEnteredEmail("");
    setEnteredPassword("");
  }

  async function submitHandler(event) {
    event.preventDefault();

    // optional: Add some validation
    if (isLogin) {
      setIsLoading(true);
      setEmailError("");
      setPasswordError("");
      // log in user
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      //console.log(result);
      if (!result.error) {
        //setIsLoading(false);
        //set some auth state - generate jwt token
        router.replace("/profile");
      } else {
        setIsLoading(false);
        if (result.error === "No user found!") {
          setEmailError("There is no user with this Email");
        } else if (result.error === "Could not log you in!") {
          setPasswordError("Invalid password");
        }
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isLoading) {
    return (
      <div className={classes.center}>
        <Loader />
      </div>
    );
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
          {emailError && <div className={classes.error}>{emailError}</div>}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          {passwordError && (
            <div className={classes.error}>{passwordError}</div>
          )}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
