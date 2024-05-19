import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";

export default function Geo({onCoordinatesUpdate}) {
    const [showLink, setShowLink] = useState(false);
    const [showGreenText, setShowGreenText] = useState(false);
    const [searchEnabled, setSearchEnabled] = useState(false); 

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            watchPosition: false, 
        });

    useEffect(() => {
        setShowGreenText(true);
        const timeoutId = setTimeout(() => {
            setShowGreenText(false);
            setShowLink(true);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    const handleToggleGeolocation = () => {
        if(!coords){
            onCoordinatesUpdate(null);
            window.alert("Geolocation is not enabled or coordinates are not available")
        }else if(searchEnabled){
            onCoordinatesUpdate(null);
            setSearchEnabled(!searchEnabled);
        }
        else{
            onCoordinatesUpdate(coords);
            setSearchEnabled(!searchEnabled);
        }
    };

    return (
        <div>
            {!isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : (
                <div>
                    {showLink && (
                        <div className="" style={{color:'#284d65' }}>Order with location {searchEnabled ? '(on)' : '(off)'}        
                        <label className="switch"> 
                            <input
                                type="checkbox"
                                checked={searchEnabled}
                                onChange={handleToggleGeolocation}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    )}
                </div>
            )}
        </div>
    );
}
