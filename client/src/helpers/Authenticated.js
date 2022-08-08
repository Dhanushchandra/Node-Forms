export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwt");
    fetch("http://localhost:8000/api/auth/isAuthChecker", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.isAuth === false) {
            localStorage.removeItem("jwt");
            resolve(false);
          } else {
            resolve(true);
          }
        });
      })
      .catch(reject);
  });
};
