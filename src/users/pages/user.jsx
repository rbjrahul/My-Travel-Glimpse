import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/Hooks/http-hook";
const User = () => {
  //   const USERS = [
  //     {
  //       id: "u1",
  //       name: "Rahul",
  //       image:
  //         "https://image.lexica.art/md2_webp/0163a8ab-c780-4837-aa4f-c7932dc89dea",
  //       places: 3,
  //     },
  //   ];
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        // const responseData = await response.json();
        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }
        setLoadedUser(responseData.users);
        //setIsLoading(false);
      } catch (err) {
        //setError(err.message);
      }
    };
    fetchUser();
  }, [sendRequest]);
  // const errorHandler = () => {
  //   clearError(null);
  // };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && <UsersList items={loadedUser} />}
    </React.Fragment>
  );
};

export default User;
