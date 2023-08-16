import { useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile(props) {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(false);
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>; // could be changed to styled css preloader
  // }

  //if (!loading) {
  // if (session === null) {
  //   //window.location.href = "/auth";
  //   Router.push("/auth");
  // }
  //}
  const [error, setError] = useState("");

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      setError("");
      console.log(data.message);
      setError(data.message);
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} error={error} />
    </section>
  );
}

export default UserProfile;
