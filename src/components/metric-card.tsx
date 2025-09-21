import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "../lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  className?: string
  backgroundColor?: string
  isDarkMode?: boolean
}

export function MetricCard({ title, value, change, positive, className, backgroundColor, isDarkMode = false }: MetricCardProps) {
  return (
    <div 
      className={cn("rounded-lg border-0 shadow-sm p-5 h-full transition-colors duration-300", className)}
      style={{ 
        backgroundColor: isDarkMode ? '#FFFFFF0D' : (backgroundColor || '#F7F9FB')
      }}
    >
      <div className="space-y-3 h-full flex flex-col justify-between">
        <p className={`text-base font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</p>
        <div className="flex items-center justify-between">
           <p className={`text-3xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          <div className="flex items-center gap-1 group cursor-pointer">
            {positive ? (
              <TrendingUp className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            ) : (
              <TrendingDown className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            )}
             <div className="relative overflow-hidden">
               <span className={`text-base block group-hover:transform group-hover:-translate-x-full group-hover:transition-transform group-hover:duration-300 group-hover:ease-in-out transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                 {change}
               </span>
               <span className="text-base text-green-600 absolute inset-0 transform translate-x-full group-hover:translate-x-0 group-hover:transition-transform group-hover:duration-300 group-hover:ease-in-out">
                 {change}
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
