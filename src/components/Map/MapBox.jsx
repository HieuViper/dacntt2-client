import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
const MapBox = () => {
  const [lng, setLng] = useState(106.69868);
  const [lat, setLat] = useState(10.73174);
  const [showPopup, setShowPopup] = React.useState(true);
  return (
    <div className="Map">
      <Map
        mapboxAccessToken={
          "pk.eyJ1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cDl5MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA"
        }
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "15px",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
        {showPopup && (
          <Popup
            longitude={lng}
            latitude={lat}
            anchor="bottom-left"
            onClose={() => setShowPopup(false)}
            closeOnClick="false"
          >
            Ton Duc Thang University, Sub-dis Tan Phong, Dis 7, Ho Chi Minh
            City, Viet Nam
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
