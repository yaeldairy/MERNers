import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context

export const UserProvider = ({children}) => {

  const token = localStorage.getItem("accessToken") || "{}"
  const parsedToken = JSON.parse(token)
  const [accessToken, setAccessToken] = useState(parsedToken.accessToken || null);
  const [flights, setFlights] = useState(parsedToken.accessToken || null);
  const [permissionLevel, setPermissionLevel] = useState(parsedToken.accessToken || null);

  return (
    <UserContext.Provider
      value={{
        accessToken, setAccessToken,
        flights , setFlights,
        permissionLevel, setPermissionLevel}}
    >
      {children}
    </UserContext.Provider>
  );
};