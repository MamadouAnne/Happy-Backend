import React, { useState, useEffect } from 'react';
import  { MapContainer, Marker }  from 'react-leaflet';
import {TileLayer } from 'react-leaflet';
import mapMarkerImg from '../images/logo.svg';
import '../styles/pages/create-shelters.css';
import Leaflet from 'leaflet';
import Sidebar from './Sidebar';
import { FiPlus } from 'react-icons/fi';
import MapClickHandle from './MapClickHandle';
import { useHistory } from 'react-router-dom';


const HappyMapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default function CreateShelter() {
    
    const [ shelters, setShelters ]  = useState([])
    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');
    const [ position, setPosition] = useState({ latitude: 0, longitude: 0 });
    // const [ latitude, setLatitude ] = useState({ latitude: 0})
    // const [ longitude, setLongitude ] = useState({ longitude: 0})
    const [ instructions, setInstructions ] = useState('');
    const [ open_hours, setOpenHours ] = useState('');
    const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const history = useHistory()

    // Get latitude and longitude onClick
    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        setPosition({ latitude: lat, longitude: lng });
    };


    // Adding and displaying multiple images
    const handleSelectImages = (event) => {
        if (!event.target.files)
            return;
        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map((image) => {
            return URL.createObjectURL(image);
        });
        setPreviewImages(selectedImagesPreview);
    };


    useEffect(() => {
        fetch('/api/v1/shelters')
          .then(res => res.json())
          .then(data => {
            setShelters(data);
          })
      }, [])

  

    // Submiting the form
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData  = new FormData();
        formData.append('name', [name]);
        formData.append('about', [about])
        formData.append('latitude', [position.latitude])
        formData.append('longitude', [position.longitude])
        formData.append('instructions', [instructions])
        formData.append('open_hours', [open_hours])
        formData.append('open_on_weekends', [open_on_weekends])
        images.forEach(image => {
        formData.append('path', image)
          
        })    

        fetch('/api/v1/shelters', {
          method: 'POST',
          body: formData 
        
        })
          .then(res => res.json())
          .then(data => {
            setShelters(shelters.concat(data));
            setName('')
            setAbout('')
            setPosition({ latitude: 0, longitude: 0 })
            setInstructions('')
            setOpenHours('')
            setOpenOnWeekends('')
            setImages('')
            let path = '/app'
            history.push(path)
          })
      }
    

    return (
        <div id="page-create-shelter">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit}  className="create-shelter-form">
                <h1>Thank you for your support 💛 Register a new shelter below and help our community grow. </h1>

                    <fieldset>
                        <legend className="map-legend">Click on the map to add the area where the shelter is located </legend>

                        <MapContainer 
                        center={[33.8623597,-84.4697653]}
                        style={{ width: '100%', height: 280 }}
                        zoom={14}
                        >
                        <MapClickHandle onClick={handleMapClick}>


                        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                        { position.latitude !== 0
                        ?  

                        <Marker 
                            interactive={false}
                            icon={HappyMapIcon}
                            position={[position.latitude, position.longitude]}
                            /> 
                              : null } 
                              </MapClickHandle>
                        </MapContainer>

                        <div className="input-block">
                            <label htmlFor="name">What's the shelter's name?</label>
                            <input id="name" value={ name } onChange={event => setName(event.target.value)}
                            />
                            </div>

                            <div className="input-block">
                            <label htmlFor="about">
                                Tell us a little bit about this shelter <span>Maximum 300 characters</span>
                            </label>
                            <textarea
                                id="about" maxLength={300} value={ about } onChange={event => setAbout(event.target.value)}
                            />
                            </div>

                            <div className="input-block">
                                <label htmlFor="images">Share some pics with us. We would love to see them.</label>

                                <div className="images-container">
                                    {previewImages.map((image) => {
                                    return <img key={image} src={image} alt={name} />;
                                    })}

                                    <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                    </label>
                                </div>

                                <input
                                    multiple
                                    onChange={handleSelectImages}
                                    type="file"
                                    id="image[]"
                                />

            </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visiting the shelter</legend>

                        <div className="input-block">
                        <label htmlFor="instructions">Is there anything we need to know/do before making a visit?</label>
                        <textarea
                            id="instructions" value={ instructions } onChange={event => setInstructions(event.target.value)}
                        />
                        </div>

                        <div className="input-block">
                        <label htmlFor="opening_hours">How can we get in touch with the shelter?</label>
                        <input
                            id="opening_hours" value={ open_hours } onChange={event => setOpenHours(event.target.value)}
                           placeholder="Email? Phone number? Website? Tell us all."
                        />
                        </div>

                        <div className="input-block">
                        <label htmlFor="open_on_weekends">Is it open on the weekends?</label>

                        <div className="button-select">
                            <button
                            type="button"
                            className={open_on_weekends ? 'active' : ''}
                            onClick={() => setOpenOnWeekends(true)}
                            >
                            Yes
                            </button>

                            <button
                            type="button"
                            className={!open_on_weekends ? 'active' : ''}
                            onClick={() => setOpenOnWeekends(false)}
                            >
                            No
                            </button>
                        </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Submit
                    </button>
                </form>
            </main>
            
        </div>
    )
}
