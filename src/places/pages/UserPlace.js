import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/Hooks/http-hook";
// const Dummy_places = [
//   {
//     id: "p1",
//     title: "raj pat",
//     discription: "One of the Most famous/uniqe sky scrapers in World",
//     name: "Place 1",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/1/17/India_Gate_from_Rajpath.jpg",
//     address: "Kartavya Path, India Gate, New Delhi, Delhi 110001",
//     location: {
//       lat: "28.613835016548503",
//       lng: "77.22925220795096",
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire State Building",
//     discription: "One of the Most famous/uniqe sky scrapers in World",
//     name: "Place 1",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/1/17/India_Gate_from_Rajpath.jpg",
//     address: "Kartavya Path, India Gate, New Delhi, Delhi 110001",
//     location: {
//       lat: "28.613835016548503",
//       lng: "77.22925220795096",
//     },
//     creator: "u2",
//   },
// ];
function UserPlace(props) {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const PlaceDeletedHandler = (deletedPlaceid) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceid)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={PlaceDeletedHandler} />
      )}
    </React.Fragment>
  );
}

export default UserPlace;
