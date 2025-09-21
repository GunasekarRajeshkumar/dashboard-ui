import React, { useEffect, useState } from 'react'

const locationData = [
  { name: 'New York', revenue: 72, color: '#A8C5DA' },
  { name: 'San Francisco', revenue: 39, color: '#A8C5DA' },
  { name: 'Sydney', revenue: 25, color: '#A8C5DA' },
  { name: 'Singapore', revenue: 61, color: '#A8C5DA' },
]

interface RevenueMapProps {
  isDarkMode?: boolean
}

export function RevenueMap({ isDarkMode = false }: RevenueMapProps) {
  const [animatedBars, setAnimatedBars] = useState<number[]>([])

  useEffect(() => {
    // Animate progress bars with increasing effect
    const maxRevenue = Math.max(...locationData.map(loc => loc.revenue))
    
    const timer = setTimeout(() => {
      setAnimatedBars(locationData.map(loc => (loc.revenue / maxRevenue) * 100))
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`rounded-lg border-0 shadow-sm p-4 w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'}`}>
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue by Location</h3>
      </div>

      {/* Map and Content Container */}
      <div className="flex flex-col">
        {/* World Map Section */}
        <div className="relative mb-4" style={{ height: '80px' }}>
          <img 
            src="/assets/World-Map.png" 
            alt="World Map" 
            className="w-full h-full object-contain"
          />
          {/* Location Markers */}
          <div className="absolute inset-0">
            {/* New York Marker */}
            <div 
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              style={{ left: '25%', top: '45%' }}
            />
            {/* San Francisco Marker */}
            <div 
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              style={{ left: '15%', top: '50%' }}
            />
            {/* Singapore Marker */}
            <div 
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              style={{ left: '75%', top: '70%' }}
            />
            {/* Sydney Marker */}
            <div 
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              style={{ left: '80%', top: '85%' }}
            />
          </div>
        </div>

        {/* Location List */}
        <div className="space-y-3">
          {locationData.map((location, index) => (
            <div key={location.name} className="relative">
              {/* Location Name and Revenue */}
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.name}</span>
                <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.revenue}K</span>
              </div>
              
              {/* Progress Bar */}
              <div className={`w-full rounded-full h-1 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    backgroundColor: location.color,
                    width: `${animatedBars[index] || 0}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}