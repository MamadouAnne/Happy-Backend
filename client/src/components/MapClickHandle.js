import React from 'react'
import { useMapEvent } from 'react-leaflet'

export default function MapClickHandle(props) {

    useMapEvent("click", props.onClick)

    return props.children
}
