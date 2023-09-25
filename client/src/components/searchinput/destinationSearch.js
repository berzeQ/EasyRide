import React from "react";
import styles from "../../styles/register.module.css";

const DestinationCard = (props) => {
  return (
    props.searchDestinationList.length > 0 && (
      <div
        onMouseLeave={() => props.setIsSelectionOngoing(false)}
        onMouseOver={() => props.setIsSelectionOngoing(true)}
        className={styles.setLocation}
      >
        <div className={styles.searchResultDestination}>
          {props.searchDestinationList.length > 0 &&
            props.searchDestinationList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    props.setDestinationAddress(item.formatted);
                    props.setDestinationOpen(false);
                    props.setDestinationPos({
                      lat: item.lat,
                      lng: item.lon,
                    });

                    props.handleDestinationZoom();
                  }}
                  className={styles.searchLists}
                >
                  {item.formatted.length > 20
                    ? item.formatted.substring(0, 30) + "..."
                    : item.formatted}
                </li>
              );
            })}
        </div>
      </div>
    )
  );
};

export default DestinationCard;
