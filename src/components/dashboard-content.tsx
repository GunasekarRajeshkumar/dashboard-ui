import { MetricCard } from "./metric-card"
import { ProjectionsChart } from "./projections-chart"
import { RevenueChart } from "./revenue-chart"
import { RevenueMap } from "./revenue-map"
import { TopProductsTable } from "./top-products-table"
import { TotalSalesChart } from "./total-sales-chart"

interface DashboardContentProps {
  isRightPanelOpen?: boolean
  isDarkMode?: boolean
  isMobile?: boolean
}

export function DashboardContent({ isRightPanelOpen = true, isDarkMode = false, isMobile = false }: DashboardContentProps) {
  return (
    <div className={`p-3 md:p-6 pb-20 space-y-4 md:space-y-6 min-h-full transition-all duration-500 ease-in-out ${isDarkMode ? 'bg-[#1C1C1C]' : 'bg-white'}`}>
      {/* Header */}
      <div>
        <h1 className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>eCommerce</h1>
      </div>

      {/* Top Row: KPI Cards + Projections Chart */}
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:h-[256px]">
        {/* KPI Cards - Responsive Grid */}
        <div className="flex-1 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
          <MetricCard title="Customers" value="3,781" change="+11.01%" positive={true} backgroundColor="#E3F5FF" />
          <MetricCard title="Orders" value="1,219" change="-0.03%" positive={false} isDarkMode={isDarkMode} />
          <MetricCard title="Revenue" value="$695" change="+15.03%" positive={true} isDarkMode={isDarkMode} />
          <MetricCard title="Growth" value="30.1%" change="+6.08%" positive={true} backgroundColor="#E5ECF6"  />
        </div>
        
        {/* Projections Chart */}
        <div className="flex-1 h-full">
          <ProjectionsChart isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Second Row: Revenue Chart + Revenue Map */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Revenue Chart - Responsive width */}
        <div className={`flex-1 flex-transition ${
          isRightPanelOpen ? 'lg:flex-[2]' : 'lg:flex-[3]'
        }`}>
          <RevenueChart isDarkMode={isDarkMode} />
        </div>
        
        {/* Revenue Map - Responsive width */}
        <div className={`flex-1 flex-transition ${
          isRightPanelOpen ? 'lg:flex-[1]' : 'lg:flex-[1]'
        }`}>
          <RevenueMap isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Bottom Row: Top Products Table + Total Sales Chart */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Top Products Table - Responsive width */}
        <div className={`flex-1 flex-transition ${
          isRightPanelOpen ? 'lg:flex-[2]' : 'lg:flex-[3]'
        }`}>
          <TopProductsTable isDarkMode={isDarkMode} />
        </div>
        
        {/* Total Sales Chart - Responsive width */}
        <div className={`flex-1 flex-transition ${
          isRightPanelOpen ? 'lg:flex-[1]' : 'lg:flex-[1]'
        }`}>
          <TotalSalesChart isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  )
}
