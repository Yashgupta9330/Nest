import L from 'leaflet'
import React, { useEffect, useMemo, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'
import { GeoLocDataAlgolia, GeoLocDataGraphQL } from 'types/chapter'

const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const ChapterMap = ({
  geoLocData,
  userLocation,
  style,
}: {
  geoLocData: GeoLocDataGraphQL[] | GeoLocDataAlgolia[]
  userLocation: { lat: number; lng: number } | null
  style: React.CSSProperties
}) => {
  const mapRef = useRef<L.Map | null>(null)

  const normalizedData = useMemo(() => {
    return geoLocData.map((chapter) => ({
      lat: '_geoloc' in chapter ? chapter._geoloc.lat : chapter.geoLocation.lat,
      lng: '_geoloc' in chapter ? chapter._geoloc.lng : chapter.geoLocation.lng,
      key: chapter.key,
      name: chapter.name,
    }))
  }, [geoLocData])

  const nearestChapters = useMemo(() => {
    if (!userLocation) return normalizedData

    // Sort chapters by distance from user location
    return normalizedData
      .map((chapter) => ({
        ...chapter,
        distance: getDistance(userLocation.lat, userLocation.lng, chapter.lat, chapter.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5)
  }, [userLocation, normalizedData])

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('chapter-map', {
        worldCopyJump: false,
        maxBounds: [
          [-90, -180],
          [90, 180],
        ],
        maxBoundsViscosity: 1.0,
      }).setView([20, 0], 2)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current)
    }

    const map = mapRef.current

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.LayerGroup) {
        map.removeLayer(layer)
      }
    })

    const markerClusterGroup = L.markerClusterGroup()
    const bounds: [number, number][] = []

    // Validate and filter out invalid coordinates
    const validChapters = normalizedData.filter(chapter =>
      chapter.lat !== null &&
      chapter.lng !== null &&
      !isNaN(chapter.lat) &&
      !isNaN(chapter.lng) &&
      chapter.lat >= -90 &&
      chapter.lat <= 90 &&
      chapter.lng >= -180 &&
      chapter.lng <= 180
    )

    validChapters.forEach((chapter) => {
      const markerIcon = new L.Icon({
        iconAnchor: [12, 41],
        iconRetinaUrl: '/img/marker-icon-2x.png',
        iconSize: [25, 41],
        iconUrl: '/img/marker-icon.png',
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowUrl: '/img/marker-shadow.png',
      })
      const marker = L.marker([chapter.lat, chapter.lng], { icon: markerIcon })
      const popup = L.popup()
      const popupContent = document.createElement('div')
      popupContent.className = 'popup-content'
      popupContent.textContent = chapter.name
      popupContent.addEventListener('click', () => {
        window.location.href = `/chapters/${chapter.key}`
      })
      popup.setContent(popupContent)
      marker.bindPopup(popup)
      markerClusterGroup.addLayer(marker)
      bounds.push([chapter.lat, chapter.lng])
    })

    map.addLayer(markerClusterGroup)

    // Add fallback for fitting bounds
    try {
      if (userLocation && nearestChapters.length > 0) {
        const nearestBounds = nearestChapters.map((chapter) => [chapter.lat, chapter.lng] as [number, number])
        if (nearestBounds.length > 0) {
          map.fitBounds(nearestBounds, { maxZoom: 10 })
        } else if (bounds.length > 0) {
          map.fitBounds(bounds)
        }
      } else if (bounds.length > 0) {
        map.fitBounds(bounds)
      }
    } catch (error) {
      // Fallback to default view if bounds fitting fails
      map.setView([20, 0], 2)
    }
  }, [normalizedData, nearestChapters, userLocation])

  return <div id="chapter-map" style={style} />
}

export default ChapterMap
