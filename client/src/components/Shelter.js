import React, { useEffect, useState } from 'react';
import { FaPhone } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import  { MapContainer, Marker }  from 'react-leaflet';
import {TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import mapMarkerImg from '../images/logo.svg';
import '../styles/pages/shelters.css';
import Leaflet, { imageOverlay } from 'leaflet';
import Sidebar from './Sidebar';
import { FaPrayingHands } from 'react-icons/fa'

const HappyMapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default function Shelter() {

    const [ shelter, setShelter] = useState(null);
    const { id } = useParams();
    const [ activeImageIndex, setActiveImageIndex ] = useState(0);

    useEffect(() => {
        fetch(`/api/v1/shelters/${id}`)
            .then(res => res.json())
            .then(data => {
                setShelter(data)
            })
    }, [id])

    if (!shelter) {
        return <p>Loading...</p>
    }

    return (
        <div id="page-shelter">

            <Sidebar />

            <main>
                <div className="shelter-details">
                    <img src={"/" + shelter.Images[activeImageIndex].path} alt={shelter.name} />

                    <div className="images">
                    {/* <button className="active" type="button"> */}
                        {shelter.Images.map((image, index) => {
                            return (
                                <button key={image.id} className={activeImageIndex === index ? 'active' : ''} type="button" onClick={() => setActiveImageIndex(index)}>
                            <img src={"/" + image.path}alt="#" />
                        </button>   
                            )
                        })}
                        
                            {/* <img src="https://static.fox29.com/www.fox29.com/content/uploads/2019/06/PSPCA_dog_generic_01.jpg" alt="#" />
                        </button> */}

                        {/* <button className="active" type="button">
                            <img src="https://static.fox29.com/www.fox29.com/content/uploads/2019/06/PSPCA_dog_generic_01.jpg" alt="#" />
                        </button>

                        <button className="active" type="button">
                            <img src="https://static.fox29.com/www.fox29.com/content/uploads/2019/06/PSPCA_dog_generic_01.jpg" alt="#" />
                        </button> */}
                        
                    </div>

                    <div className="shelter-details-content">
                        <h1>{shelter.name}</h1>
                        <p>{shelter.about}</p>


                    <div className="map-container">
                        <MapContainer 
                        center={[shelter.latitude, shelter.longitude]}
                        zoom={15}
                        style={{ width: '100%', height: 280 }}
                        dragging={false}
                        touchZoom={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        >
                        
                        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                        <Marker 
                            interactive={false}
                            icon={HappyMapIcon}
                            position={[shelter.latitude, shelter.longitude]}
                            />
                        </MapContainer>

                        <footer>
                            <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`}>See route on Google Maps</a>
                        </footer>
                    </div>

                    <hr />

                    <h2>Ready to make a visit?</h2>
                    <p>{shelter.instructions}</p>

                    <div className="open-details">
                        <div className="hour">
                            <FaPrayingHands size={32} color="#15B6D6" />
                            <br />
                            {shelter.open_hours}
                        </div>
                        
                        { shelter.open_on_weekends ? (
                                <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                Open <br/>
                                on the weekends
                            </div>
                        ) : (
                            <div className="open-on-weekends closed">
                            <FiInfo size={32} color="#FF669D" />
                            Not opened <br/>
                            on the weekends
                        </div>
                        )}

                    </div>

                       
                    <button type="button" className="contact-button">
                        <FaPhone size={20} color="FFF" />
                        Get in touch
                    </button>
                    
                </div>
            </div>
            </main>
        </div>
    )
}
