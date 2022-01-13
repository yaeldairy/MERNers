import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context

export const UserProvider = ({children}) => {

  const token = localStorage.getItem("accessToken") || null;
  const name= localStorage.getItem("username") || null;
  const parsedToken = JSON.parse(token)
  const [accessToken, setAccessToken] = useState(parsedToken || null);
  const [username, setUsername] = useState(name || null);/////////////
  const [permissionLevel, setPermissionLevel] = useState(parsedToken || null);
  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [cabin, setCabin] = useState(null);
  const [noOfSeats, setSeats] = useState(null);


  console.log("parsed token is ")
  console.log(parsedToken)
  return (
    <UserContext.Provider
      value={{
        accessToken, setAccessToken,
        permissionLevel, setPermissionLevel,
        departureFlight, setDepartureFlight,
        returnFlight, setReturnFlight,
        cabin, setCabin,
        noOfSeats, setSeats,
        username, setUsername

      }}
    >
      {children}
    </UserContext.Provider>
  );
};