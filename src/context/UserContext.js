import { createContext, useContext, useEffect, useState } from "react";
import defaultPfp from "../assets/pfp.png";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentUser"));
    if (stored) {
      setUser({
        ...stored,
        avatar: stored.avatar || defaultPfp,
      });
    }
  }, []);

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, ...updatedFields };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === prev.email ? { ...u, ...updatedFields } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return updatedUser;
    });
  };

  const loginUser = (loggedInUser) => {
    const normalizedUser = {
      ...loggedInUser,
      avatar: loggedInUser.avatar || defaultPfp,
    };

    setUser(normalizedUser);
    localStorage.setItem("currentUser", JSON.stringify(normalizedUser));
  };

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
