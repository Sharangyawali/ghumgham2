import "./Routing.css"
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
let route=null
const Routing=(props)=>{
   const map=useMap()
    if(route){
       route.spliceWaypoints(0,2)
     }
 let r= L.Routing.control({
        waypoints: [
          L.latLng(props.clat, props.clng),
          L.latLng(props.lat, props.lng)
        ],
        createMarker:function(){return null;},
        showAlternatives:true,
        altLineOptions:{
            styles: [
                {color: 'black', opacity: 0.15, weight: 9},
                {color: 'white', opacity: 0.8, weight: 6},
                {color: 'green', opacity: 0.8, weight: 4}
            ]
        },
        totalDistanceRoundingSensitivity:true,
        routeWhileDragging:false,
        addWaypoints:false,
        autoRoute:true,
      }).addTo(map);
       
      useEffect(()=>{
        map.on('click', function() {
          // map.removeLayer(r)
         route.spliceWaypoints(0,2);
        });
        // route.spliceWaypoints(0,2)
      },[props.search||props.selects])
      route=r  
  return null
}
export default Routing

