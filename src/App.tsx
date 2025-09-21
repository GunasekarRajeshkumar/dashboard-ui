import { useState, useEffect } from "react"
import { Sidebar } from "./components/sidebar"
import { TopBar } from "./components/top-bar"
import { DashboardContent } from "./components/dashboard-content"
import { OrderList } from "./components/order-list"
import { RightPanel } from "./components/right-panel"
import { Toaster } from "react-hot-toast"

export default function Dashboard() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState("Default")
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-hide sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1C1C1C]' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isMobile ? 'w-64' : 'w-64'}`}>
        <Sidebar isDarkMode={isDarkMode} onNavigate={handleNavigation} currentPage={currentPage} isMobile={isMobile} />
      </div>
      
      {/* Main Content Area */}
      <div className={`flex-1 flex transition-all duration-300 ease-in-out ${
        isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-64' : 'ml-0')
      }`}>
        {/* Left Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar - Positioned between sidebar and right panel */}
          <div className={`h-16 border-b z-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D] border-gray-700' : 'bg-white border-gray-200'}`}>
            <TopBar 
              onToggleSidebar={toggleSidebar} 
              isSidebarOpen={isSidebarOpen}
              onToggleRightPanel={toggleRightPanel} 
              isRightPanelOpen={isRightPanelOpen}
              onRefresh={handleRefresh}
              onToggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
              currentPage={currentPage}
              isMobile={isMobile}
            />
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar h-full max-h-screen transition-all duration-300 ease-in-out">
            {currentPage === "OrderList" ? (
              <OrderList isDarkMode={isDarkMode} isMobile={isMobile} />
            ) : (
              <DashboardContent key={refreshKey} isRightPanelOpen={isRightPanelOpen} isDarkMode={isDarkMode} isMobile={isMobile} />
            )}
          </div>
        </div>
        
        {/* Fixed Right Panel - Hidden on mobile, only render when open on desktop */}
        {!isMobile && isRightPanelOpen && (
          <div className="w-80 flex-shrink-0 h-full animate-fade-in-right">
            <RightPanel isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
      
      {/* Mobile Notifications - Only show on mobile */}
      {isMobile && (
        <Toaster position="top-center" />
      )}
      
      {/* Desktop Notifications - Only show on desktop */}
      {!isMobile && (
        <Toaster position="top-right" />
      )}
    </div>
  )
}
