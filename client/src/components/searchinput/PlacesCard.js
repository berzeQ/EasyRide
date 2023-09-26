import React from "react";
import styles from "../../styles/register.module.css";

const PlacesCard = (props) => {
  return (
    props.searchedPlaceList.length > 0 && (
      <div
        onMouseLeave={() => props.setIsSelectionOngoing(false)}
        onMouseOver={() => props.setIsSelectionOngoing(true)}
        className={styles.setLocation}
      >
        <div className={styles.searchResultLocation}>
          {props.searchedPlaceList.length > 0 &&
            props.searchedPlaceList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    props.setPickInputAddress(item.formatted);
                    props.setPickUpOpen(false);
                    props.setCurrentPos({
                      lat: item.lat,
                      lng: item.lon,
                    });
                    // props.handlePickUpLocationZoom();
                    props.setCenterPos({
                      lat: item.lat,
                      lng: item.lon,
                    });
                    props.setZoom(14);

                    console.log(item);
                  }}
                  className={styles.searchLists}
                >
                  {item.formatted.length > 15
                    ? item.formatted.substring(0, 35) + "..."
                    : item.formatted}
                </li>
              );
            })}
        </div>
      </div>
    )
  );
};

export default PlacesCard;
