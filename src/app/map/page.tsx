'use client'
import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api'
import { MessageSquare, Download, Share, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function MapPage() {
  const [center, setCenter] = useState({ lat: -1.2921, lng: 36.8219 })
  const [zoom, setZoom] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isPanelMinimized, setIsPanelMinimized] = useState(false)
  const [mapInfo, setMapInfo] = useState({
    totalLandArea: '580,367 km2',
    averageAnnualRainfall: '1,740 mm - 1,940 mm',
    disclaimer: 'LandVista provides general flood risk guidance based on current data. For critical property decisions, consult qualified local experts. This information does not replace professional surveys or guarantee outcomes. Use responsibly and exercise personal judgment when making important decisions.'
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setIsSmallScreen(
        width < 640 ||
        (width <= 1280 && height <= 800) ||
        (width <= 1024 && height <= 600) ||
        (width <= 912 && height <= 1368) ||
        (width <= 1024 && height <= 1366) ||
        (width <= 820 || height <= 180) ||
        (width <= 768 && height <= 1024)
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setCenter({
      lat: center.lat + (Math.random() - 0.5) * 0.1,
      lng: center.lng + (Math.random() - 0.5) * 0.1
    })
    setZoom(12)
  }

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  }

  const getFloodRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'red'
      case 'Moderate': return 'yellow'
      case 'Low': return 'green'
      default: return 'gray'
    }
  }

  const handlePanelToggle = () => {
    setIsPanelMinimized(!isPanelMinimized)
  }

  // Inline styles based on screen size
  const buttonStyle = {
    transition: 'background-color 0.3s ease',
  }

  const buttonBouncyStyle = isSmallScreen
    ? {
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        transform: 'scale(1.1)',
      }
    : {
        transition: 'background-color 0.3s ease',
      }

  // Styles for Chevron buttons
  const chevronButtonStyle = {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isPanelMinimized ? '#004d40' : '#00796b',
    color: 'white',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }

  const chevronHoverStyle = {
    backgroundColor: isPanelMinimized ? '#00796b' : '#004d40',
  }

  return (
    <div className={`relative w-full h-screen flex ${isSmallScreen ? 'flex-col' : ''}`}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
        >
          <Marker position={center} />
          {[
            { name: 'KIBERA', risk: 'High' },
            { name: 'EASTLEIGH', risk: 'High' },
            { name: 'DONHOLM', risk: 'High' },
            { name: 'KASARANI', risk: 'Low' },
            { name: 'KAYOLE', risk: 'Low' },
            { name: 'Kiambu', risk: 'Moderate' },
            { name: 'New Njiru Town', risk: 'Moderate' }
          ].map((location, i) => (
            <Circle
              key={i}
              center={{
                lat: center.lat + (Math.random() - 0.5) * 0.1,
                lng: center.lng + (Math.random() - 0.5) * 0.1
              }}
              radius={1000}
              options={{
                strokeColor: getFloodRiskColor(location.risk),
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: getFloodRiskColor(location.risk),
                fillOpacity: 0.35
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Search bar */}
      <div className={`absolute top-4 left-4 right-4 flex items-center ${isSmallScreen ? 'mt-12' : ''}`}>
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Enter ward name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-teal-600 rounded-full"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-teal-600">
              🔍
            </button>
          </form>
        </div>
      </div>

      {/* Info panel */}
      <div 
        className={`
          ${isSmallScreen ? 'fixed bottom-0 left-0 right-0' : 'absolute top-20 left-4'}
          ${isSmallScreen ? (isPanelMinimized ? 'w-16 h-16' : 'w-full h-2/3') : 'w-[400px] h-[830px]'}
          ${!isSmallScreen && (window.innerWidth >= 912 && window.innerHeight >= 1368 ? 'w-[400px]' : '')}
          bg-white rounded-t-3xl shadow-lg overflow-hidden
          ${!isSmallScreen && 'rounded-b-3xl'}
          border-2 border-teal-600
          flex flex-col
        `}
      >
        <div className={`bg-white p-4 flex justify-center items-center ${isSmallScreen ? 'h-[120px]' : 'h-[180px]'}`}>
          <Image
            src="/landvista-logo.png"
            alt="LandVista Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        <div className={`bg-teal-600 p-4 text-white flex-1 overflow-y-auto ${isSmallScreen && isPanelMinimized ? 'hidden' : ''} flex flex-col`}>
          <div className="mb-4">
            <p className="font-bold">Total Land Area</p>
            <p className='text-xl'>{mapInfo.totalLandArea}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Average Annual Rainfall</p>
            <p className='text-xl'>{mapInfo.averageAnnualRainfall}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Disclaimer</p>
            <p className="text-sm text-justify">{mapInfo.disclaimer}</p>
          </div>
          <div className="flex flex-col mt-auto pb-4">
            <div className="flex flex-col space-y-2 mt-auto">
              {!isSmallScreen && (
                <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-orange text-white px-4 py-2 rounded-full flex items-center justify-center">
                  <MessageSquare className="mr-2" size={20} />
                  Feedback
                </button>
              )}
              {!isSmallScreen && (
                <div className="flex space-x-2">
                  <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-orange text-white px-4 py-2 rounded-full flex items-center flex-1 justify-center">
                    <Download size={20} className="mr-2" />
                    Download
                  </button>
                  <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-blue text-white px-4 py-2 rounded-full flex items-center flex-1 justify-center">
                    <Share size={20} className="mr-2" />
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Removed hamburger menu button from large screens */}
      </div>

      {/* Legend */}
      <div className={`
        ${isSmallScreen ? 'fixed top-28 right-4' : 'absolute bottom-24 right-4'}
        bg-white p-2 rounded-lg shadow-lg
      `}>
        <h3 className="font-bold mb-2">Flood Risk Index</h3>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Action buttons for small screens */}
      {isSmallScreen && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          {/* Minimize/Maximize panel button */}
          <div className="relative group">
            <button
              style={{
                ...chevronButtonStyle,
                ...(isPanelMinimized ? chevronHoverStyle : {})
              }}
              onClick={handlePanelToggle}
              className="flex items-center justify-center"
            >
              {isPanelMinimized ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </button>
            <div className="absolute right-full bottom-1/2 transform -translate-y-1/2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isPanelMinimized ? 'Expand' : 'Collapse'}
            </div>
          </div>
          <div className="relative group">
            <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-orange text-white w-12 h-12 rounded-full flex items-center justify-center">
              <Download size={24} />
            </button>
            <div className="absolute right-full bottom-1/2 transform -translate-y-1/2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Download
            </div>
          </div>
          <div className="relative group">
            <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-blue text-white w-12 h-12 rounded-full flex items-center justify-center">
              <Share size={24} />
            </button>
            <div className="absolute right-full bottom-1/2 transform -translate-y-1/2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Share
            </div>
          </div>
          <div className="relative group">
            <button style={{ ...buttonStyle, ...buttonBouncyStyle }} className="bg-custom-dark-orange text-white w-12 h-12 rounded-full flex items-center justify-center">
              <MessageSquare size={24} />
            </button>
            <div className="absolute right-full bottom-1/2 transform -translate-y-1/2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Feedback
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
