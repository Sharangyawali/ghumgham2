import React, { useRef} from "react";
import { TileLayer, MapContainer, Marker, Popup, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import L from "leaflet";
import Geolocation from "./Geolocation";
import Routing from "./Routing";
import './Routing.css'
import Star from "../Star";

const markerIcon = new L.icon({
  
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [35, 45],
  iconAnchor: [17, 43],
  popupAnchor: [2, -5],
});


const Map1 = (props) => {
  const markerIcon1 = new L.icon({
    iconUrl: require(props.selects===`Local Eateries`?`./localeateries.png`:props.selects===`Hotels`?'./hotels.png':props.selects===`Restaurants`?'./restaurant.png':'./attractionsites.png'),
    iconSize: [35, 35],
    iconAnchor: [17, 33],
    popupAnchor: [2, -5],
  });
  const markerIcon2=(category)=>new L.icon({
    iconUrl:require(category===`Local Eateries`?`./localeateries.png`:category===`Hotels`?'./hotels.png':category===`Hotels`?'./restaurant.png':'./attractionsites.png'),
    iconSize: [35, 35],
    iconAnchor: [17, 33],
    popupAnchor: [2, -5],
  })
  const fillBlueOptios = { fillColor: "blue" };
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();
  const location = Geolocation();
  const data=props.fildata
  const minzoom=12
  const maxbound=[[27.563366,85.166683],[27.789086,85.504413]]
  if (location.loaded && !location.error) {
    return (
      <>
      <div style={{ position: 'relative' }} >
        <MapContainer 
          center={[location.coordinates.lat, location.coordinates.lng]}
          minZoom={minzoom}
          zoom={ZOOM_LEVEL}
          maxBounds={maxbound}
          ref={mapRef}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=2zdhXoIC85y7icMfBJxF"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <Circle
            center={[location.coordinates.lat, location.coordinates.lng]}
            pathOptions={fillBlueOptios}
            radius={5000}
          />
          <Marker className='z-10'
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={markerIcon}
          >
          <Tooltip>
            <p>This is your current location</p>
          </Tooltip>
          </Marker>
          {(Object.keys(props.search).length!==0)?
            (props.search.map((data, i) => (
            <Marker key={i}
              position={[data.latitude, data.longitude]}
              icon={markerIcon2(data.category)}
            >
            {(props.click===true?<Routing clat={location.coordinates.lat} clng={location.coordinates.lng} lat={props.lat} lng={props.lng} ></Routing>:"")}
              <Popup>
              <div className="container-fluid">
              <div className="row">
              <div className="col">
              <img className="imav" src={"http://localhost:5000/" +data.avatar}/>
              </div>
              </div>
              <p className="par">{data.name}</p>
              </div>
              </Popup>
            </Marker>
          )))
          :(props.click===false?
          (data.map((data, i) => 
            (
            <Marker key={i}
              position={[data.latitude, data.longitude]}
              icon={markerIcon1}
            >
              <Popup>
              <div className="">
              <img className="imav" src={"http://localhost:5000/" +data.avatar}/>
              <div className="">
              <h1 className="font-semibold">{data.name}</h1>
              <div className="flex">
              <h3 className="mr-2">{data.review}</h3>
              <Star className="justify-self-end" review={data.review}/>
              <h3 className="pl-2">{data.num_reviews}</h3>
              </div>
              </div>
              </div>
              </Popup>
            </Marker>
            )
          )):<Marker 
          position={[props.lat,props.lng]}
          icon={markerIcon1}
          >
          </Marker>)
          }
          {(props.click===true?<Routing clat={location.coordinates.lat} clng={location.coordinates.lng} lat={props.lat} lng={props.lng} selects={props.selects} search={props.search}></Routing>:"")}
        </MapContainer>
      </div>
      </>
    );
  }
};

export default Map1;
