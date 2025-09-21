import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", current: 12, previous: 8, currentSolid: 12, currentDashed: 12 },
  { month: "Feb", current: 8, previous: 17, currentSolid: 8, currentDashed: 8 },
  { month: "Mar", current: 8, previous: 15, currentSolid: 8, currentDashed: 8 },
  { month: "Apr", current: 10, previous: 10, currentSolid: 8, currentDashed: 10 },
  { month: "May", current: 15, previous: 15, currentSolid: 8, currentDashed: 15 },
  { month: "Jun", current: 20, previous: 21, currentSolid: 8, currentDashed: 20 },
]

interface RevenueChartProps {
  isDarkMode?: boolean
}

export function RevenueChart({ isDarkMode = false }: RevenueChartProps) {
  return (
    <div className={`rounded-lg border-0 shadow-sm p-5 w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'}`} style={{ height: '318px' }}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Week</span>
            <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60A5FA' }}></div>
            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Previous Week</span>
            <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$68,768</span>
          </div>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 70px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5ECF6"} horizontal={true} vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              interval={0}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`}
            />
            <Line 
              type="monotone" 
              dataKey="currentSolid" 
              stroke={isDarkMode ? "#FFFFFF" : "#000000"} 
              strokeWidth={2} 
              dot={false}
              connectNulls={false}
              strokeDasharray="0 0"
            />
            <Line 
              type="monotone" 
              dataKey="currentDashed" 
              stroke={isDarkMode ? "#FFFFFF" : "#000000"} 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={false}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

