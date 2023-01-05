import { useEffect } from "react";

interface Props {
    handleGoogle: (response: google.accounts.id.CredentialResponse) => void
}

const GoogleAuthentication = ({handleGoogle}: Props) => {
    

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOG_CLIENT_ID || "",
        callback: handleGoogle,
    });
    

      google.accounts.id.renderButton(
        document.getElementById("googleSignIn") as HTMLElement,
        {
          type: "standard",
          theme: "filled_black",
          size: "medium",
          text: "continue_with",
          shape: "pill",
        }
      );
    //   google.accounts.id.
    //   google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  return <div id="googleSignIn"></div>;
};

export default GoogleAuthentication;
