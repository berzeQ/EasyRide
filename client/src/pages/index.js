import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useSelector } from "react-redux";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";

import { Input } from "@chakra-ui/react";
import {
  Circle,
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useState, useRef, useEffect, useMemo } from "react";
import PlacesCard from "../components/searchinput/PlacesCard";
import DestinationCard from "../components/searchinput/destinationSearch";
import CustomMenu from "../components/CustomeMenu/CustomMenu";
import Getgeolocation from "../components/GoogleMaps/Getgeolocation";
import { Marker } from "@react-google-maps/api";

const libraries = ["places"];

const montserrat = Montserrat({ subsets: ["latin"] });

//*********************************************************** */
export default function Home() {
  let customIcon = {};

  const router = useRouter();

  //for whether mouse is overing the input and result div
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);

  // for token login
  const { token, id, isLoggedIn } = useSelector((state) => state.user);
  // const [placesList, setPlacesList] = useState([]);
  // const [placesListDestination, setPlacesListDestination] = useState([]);

  //for sending value to input field when clicked on the li i.e results
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  //makes the search results block to display
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  //inputs the search result formatted into the states
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const [searchDestinationList, setSearchDestinationList] = useState([]);

  // const [pickUpRef, setPickUpRef] = useState(false)
  // const [destinationRef, setDestinationRef] = useState(false)

  const [currentPos, setCurrentPos] = useState({
    lat: "",
    lng: "",
  });
  const [centerPos, setCenterPos] = useState({
    lat: 27.700769,
    lng: 85.30014,
  });
  // useEffect({

  // })
  const [destinationPos, setDestinationPos] = useState({
    lat: "",
    lng: "",
  });
  // const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef(null);
  // console.log(originRef?.current?.focus(), "hello");
  const [zoom, setZoom] = useState(13);

  const destiantionRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0",
    libraries: libraries,
  });

  // if (!isLoaded) {
  //   return;
  // }

  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return;
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);
  // }

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   setDistance("");
  //   setDuration("");
  //   originRef.current.value = "";
  //   destiantionRef.current.value = "";
  // }

  const handleCenteringMap = () => {
    return console.log("hello"), setCenterPos(currentPos);
  };
  // const handlePickUpLocationZoom = async () => {
  //   map.onLoad && console.log("Hello"); // Just for testing
  //   setCenterPos(currentPos);

  //   map.panTo(centerPos);
  //   map.setZoom(15);
  // };

  // const handleDestinationZoom = async () => {
  //   if (isLoaded) {
  //     map.onLoad && console.log("Hello"); // Just for testing
  //     map.panTo(destinationPos);
  //     map.setZoom(15);
  //     setCenterPos(destinationPos);
  //   }
  // };

  const generatePlaces = async (text) => {
    setPickUpOpen(true);
    setPickInputAddress(text);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
      );
      const data = await res.json();
      if (data.results) {
        setSearchedPlaceList(data.results);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const generateDestination = async (text) => {
    setDestinationOpen(true);
    setDestinationAddress(text);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
      );
      const data = await res.json();
      if (data.results) {
        setSearchDestinationList(data.results);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  if (isLoaded) {
    customIcon = {
      url: "favicon.ico",
      scaledSize: new window.google.maps.Size(50, 50),
    };
  }

  async function pickUpLocationBasedOnMarker(lat, lng) {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
      );
      const data = await res.json();
      if (data) {
        console.log(data.features[0].properties.formatted);
        // originRef.current.value = data.features[0].properties.formatted;
        setPickInputAddress(data.features[0].properties.formatted);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  }
  async function destinationLocationBasedOnMarker(lat, lng) {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
      );
      const data = await res.json();
      if (data) {
        console.log(data.features[0].properties.formatted);
        // destiantionRef.current.value = data.features[0].properties.formatted;
        setDestinationAddress(data.features[0].properties.formatted);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24${montserrat.className}  `}
    >
      <div className="navbarMain mainBody">
        {!token ? (
          <div>
            <button
              className="mainBtn"
              type="button"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="mainBtn"
              type="button"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>
        ) : (
          <CustomMenu color="#fff" token={token} />
        )}

        <div>
          <a>
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      {/* MAIN BODY FOR LANDING PAGE */}

      <div className={styles.mainLandingPageBody}>
        <Getgeolocation
          setCurrentPos={setCurrentPos}
          currentPos={currentPos}
          setDestinationPos={setDestinationPos}
          originRef={originRef}
        />

        {/* LOCATION INFUL FIELD */}
        <div className={styles.locationInput}>
          <div className={styles.setLocation}>
            <Input
              ref={originRef}
              className={styles.inputPlace}
              focusBorderColor="#483C4E"
              placeholder="Enter Your Location"
              value={pickInputAddress}
              type="text"
              onFocus={() => {
                setIsSelectionOngoing(true);
                setDestinationOpen(false);
                setZoom(12);
              }}
              onBlur={() => {
                !isSelectionOngoing && setPickUpOpen(false);
              }}
              onChange={(e) => generatePlaces(e.target.value)}
            />

            {pickUpOpen && (
              <PlacesCard
                isSelectionOngoing={isSelectionOngoing}
                setIsSelectionOngoing={setIsSelectionOngoing}
                setPickUpOpen={setPickUpOpen}
                setPickInputAddress={setPickInputAddress}
                searchedPlaceList={searchedPlaceList}
                setCurrentPos={setCurrentPos}
                // handlePickUpLocationZoom={handlePickUpLocationZoom}
                originRef={originRef}
                setCenterPos={setCenterPos}
                setZoom={setZoom}
              />
            )}

            <br />
            <br />
            <br />

            <div className={styles.setDestination}>
              <Input
                ref={destiantionRef}
                className={styles.inputPlace}
                focusBorderColor="#483C4E"
                placeholder="Enter Your Destination"
                value={destinationAddress}
                type="text"
                onFocus={() => {
                  setIsSelectionOngoing(true);
                  setPickUpOpen(false);
                  setZoom(12);
                }}
                onBlur={() => !isSelectionOngoing && setDestinationOpen(false)}
                onChange={(e) => generateDestination(e.target.value)}
              />

              {destinationOpen && (
                <DestinationCard
                  isSelectionOngoing={isSelectionOngoing}
                  setIsSelectionOngoing={setIsSelectionOngoing}
                  setDestinationOpen={setDestinationOpen}
                  setDestinationAddress={setDestinationAddress}
                  searchDestinationList={searchDestinationList}
                  setDestinationPos={setDestinationPos}
                  // handleDestinationZoom={handleDestinationZoom}
                  setCenterPos={setCenterPos}
                  setZoom={setZoom}
                />
              )}
              <br />
            </div>
          </div>
          <button
            className={styles.centerMap}
            onClick={() => {
              handleCenteringMap();
            }}
            type="button"
          >
            To Center
          </button>
        </div>

        <br />
        <br />
        <br />
        <br />

        {/* GOOGLE MAP USING API  */}
        <div className={styles.gmapAPI}>
          {isLoaded && (
            <GoogleMap
              id="circle-example"
              mapContainerStyle={{
                height: "700px",
                width: "1000px",
              }}
              zoom={zoom}
              center={centerPos}
              // onLoad={(map) => setMap(map)}
            >
              <MarkerF
                draggable={true}
                position={currentPos}
                icon={customIcon}
                onDragEnd={(e) => {
                  console.log(e.latLng.lat(), e.latLng.lng());
                  pickUpLocationBasedOnMarker(e.latLng.lat(), e.latLng.lng());
                  setCenterPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                  setZoom(14);
                }}
              />
              <Circle
                center={currentPos}
                radius={1000} // Adjust the radius in meters as needed
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                }}
              />
              <MarkerF
                draggable={true}
                position={destinationPos}
                // icon={customIcon}
                onDragEnd={(e) => {
                  console.log(e.latLng.lat(), e.latLng.lng());
                  destinationLocationBasedOnMarker(
                    e.latLng.lat(),
                    e.latLng.lng()
                  );
                  setCenterPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                  setZoom(14);
                }}
              />
              {/* {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )} */}
            </GoogleMap>
          )}

          {isLoaded && (
            <Autocomplete>
              <input type="text" />
            </Autocomplete>
          )}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </main>
  );
}
