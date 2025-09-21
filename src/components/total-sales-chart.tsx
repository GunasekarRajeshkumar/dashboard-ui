import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

// Custom plugin for rounded doughnut effect
const roundedDoughnutPlugin = {
  id: 'roundedDoughnut',
  afterDraw: (chart: Chart) => {
    const ctx = chart.ctx
    const meta = chart.getDatasetMeta(0)
    const arcs = meta.data
    const borderWidth = 10
    const borderColor = 'white'

    if (arcs.length === 0) {
      return
    }

    ctx.save()

    const arc = arcs[0] as any
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    ctx.beginPath()
    ctx.arc(arc.x, arc.y, arc.innerRadius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(arc.x, arc.y, arc.outerRadius, 0, 2 * Math.PI)
    ctx.stroke()

    for (const arc of arcs) {
      const startAngle = (arc as any).startAngle
      const radius = ((arc as any).outerRadius + (arc as any).innerRadius) / 2
      const thickness = ((arc as any).outerRadius - (arc as any).innerRadius) / 2 - borderWidth
      const x0 = (arc as any).x + radius * Math.cos(startAngle)
      const y0 = (arc as any).y + radius * Math.sin(startAngle)
      
      ctx.beginPath()
      ctx.arc(x0, y0, thickness, 0, 2 * Math.PI)
      ctx.fillStyle = (arc as any).options.backgroundColor
      ctx.strokeStyle = (arc as any).options.backgroundColor
      ctx.lineWidth = borderWidth
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x0, y0, thickness + borderWidth, Math.PI + startAngle, 2 * Math.PI + startAngle)
      ctx.strokeStyle = borderColor
      ctx.stroke()
    }
    ctx.restore()
  }
}

// Register the plugin
Chart.register(roundedDoughnutPlugin)

const data = [
  { name: "Direct", value: 300.56, color: "#95A4FC" },
  { name: "Affiliate", value: 135.18, color: "#1C1C1C" },
  { name: "Sponsored", value: 154.02, color: "#BAEDBD" },
  { name: "E-mail", value: 80.96, color: "#B1E3FF" },
]

interface TotalSalesChartProps {
  isDarkMode?: boolean
}

export function TotalSalesChart({ isDarkMode = false }: TotalSalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: data.map(item => item.value),
              backgroundColor: data.map(item => item.color),
              borderWidth: 0
            }]
          },
          options: {
            cutout: "50%",
            layout: {
              padding: 10
            },
            plugins: {
              tooltip: {
                enabled: false
              },
              legend: {
                display: false
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              arc: {
                borderWidth: 0
              }
            }
          }
        } as any)
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [isDarkMode])

  return (
    <div className={`rounded-lg border-0 shadow-sm p-3 transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'}`}>
      <div className="mb-3">
        <h3 className={`text-base font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Sales</h3>
      </div>
      
      <div className="space-y-3">
             {/* Rounded Doughnut Chart */}
             <div className="relative flex justify-center">
               <div className="w-48 h-48 relative group hover:scale-105 transition-transform duration-300">
                 <canvas ref={chartRef} />
                 
                 {/* Center percentage label - moved to left corner */}
                 <div className="absolute top-2 left-2">
                   <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 group-hover:scale-110 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white'}`}>
                     38.6%
                   </div>
                 </div>
               </div>
             </div>

        {/* Legend */}
        <div className="space-y-1">
          {data.map((item, index) => (
            <div 
              key={item.name} 
              className="flex items-center justify-between animate-fade-in-up hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-1 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
              </div>
              <span className={`text-xs font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
