import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", actuals: 16, projections: 4 },
  { month: "Feb", actuals: 20, projections: 4 },
  { month: "Mar", actuals: 17, projections: 4 },
  { month: "Apr", actuals: 21, projections: 6 },
  { month: "May", actuals: 14, projections: 4 },
  { month: "Jun", actuals: 20, projections: 4 },
]

interface ProjectionsChartProps {
  isDarkMode?: boolean
}

export function ProjectionsChart({ isDarkMode = false }: ProjectionsChartProps) {
  return (
    <div className={`rounded-lg border-0 shadow-sm p-5 h-full flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'}`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projections vs Actuals</h3>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="34px"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5ECF6"} horizontal={true} vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#9CA3AF" }}
              interval={0}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#9CA3AF" }}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`}
            />
            <Bar dataKey="actuals" stackId="a" fill="#A8C5DA" radius={[0, 0, 0, 0]} maxBarSize={20} />
            <Bar dataKey="projections" stackId="a" fill="#E5ECF6" radius={[4, 4, 0, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
