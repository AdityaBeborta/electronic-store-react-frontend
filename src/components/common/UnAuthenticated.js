import { Base } from "./Base";

export const UnAuthenticated = () => {
  return (
    <>
      <Base
        buttonEnabled="true"
        buttonColor="warning"
        buttonText="Login"
        pageTitle="Uh-oh! Looks like you forgot to log in. Let’s fix that! 🔄"
        description="You’ve got the skills, but do you have the credentials? 😉 Log in first!"
        buttonLink='/login'
      ></Base>
    </>
  );
};
