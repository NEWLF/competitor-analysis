import React from "react";

export const useAuth = () => {
  const [auth, setAuth] = React.useState({
    isAuth: false,
    userId: null,
  })

  React.useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    setAuth({
      isAuth: !!userId,
      userId,
    })
  }, [])

  return auth
};
