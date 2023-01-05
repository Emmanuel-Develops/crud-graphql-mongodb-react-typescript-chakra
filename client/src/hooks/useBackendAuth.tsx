import { useState } from "react";
import useAuth from "./useAuth";

const useBackendAuth = () => {
    const {onLogin} = useAuth()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const handleGoogle = async (
    response: google.accounts.id.CredentialResponse
  ) => {
    // const body = JSON.stringify(response);
    setLoading(true);

    fetch("http://localhost:5000/auth/login", { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(response) 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false)
        if (data.user) {
          onLogin(data.user);
        } else {
          throw new Error(data?.message || data);
        }
      })
      .catch((err) => {
        console.log("error from be", err);
        setError({
          state: true,
          message: err.message ?? "Authentication Error",
        });
        setLoading(false)
      });
  };

  return { loading, error, handleGoogle };
};

export default useBackendAuth;
