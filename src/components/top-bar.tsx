import { Search, Bell, Star, Sun, Moon, RefreshCw, PanelRight, PanelLeft } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"

interface TopBarProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  onToggleRightPanel: () => void
  isRightPanelOpen: boolean
  onRefresh: () => void
  onToggleTheme: () => void
  isDarkMode: boolean
  currentPage: string
  isMobile?: boolean
}

export function TopBar({ onToggleSidebar, isSidebarOpen, onToggleRightPanel, isRightPanelOpen, onRefresh, onToggleTheme, isDarkMode, currentPage, isMobile = false }: TopBarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setIsRefreshing(true)
    onRefresh()
    // Reset animation after a short delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchBlur = () => {
    // Delay closing to allow clicking on dropdown items
    setTimeout(() => {
      setIsSearchOpen(false)
    }, 200)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className={`h-16 flex items-center justify-between px-3 md:px-6 border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#1C1C1C] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button 
          onClick={onToggleSidebar}
          className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeft className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          ) : (
            <PanelRight className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          )}
        </button>
        <div className="flex items-center gap-1.5">
          <Star className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
        </div>
        <span className={`text-sm hidden sm:inline ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Dashboards</span>
        <span className={`text-sm hidden sm:inline ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>/</span>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {currentPage === "OrderList" ? "Order List" : currentPage === "Economic" ? "Economic" : "Default"}
        </span>
      </div>

      {/* Right side - Search and Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <Input 
            placeholder="Search" 
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            onBlur={handleSearchBlur}
            className={`pl-6 pr-8 rounded h-6 text-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-[#333333] border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
          <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 flex items-center gap-0.5">
            <kbd className={`px-1 py-0.5 text-xs bg-transparent border rounded ${
              isDarkMode 
                ? 'text-gray-400 border-gray-600' 
                : 'text-gray-500 border-gray-300'
            }`}>⌘</kbd>
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
          </div>
          
          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-50 ${
              isDarkMode 
                ? 'bg-[#FFFFFF0D] border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="p-2">
                <div className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Recent Searches
                </div>
                <div className="space-y-1">
                  <div className={`px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-opacity-50 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    Dashboard Analytics
                  </div>
                  <div className={`px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-opacity-50 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    Revenue Reports
                  </div>
                  <div className={`px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-opacity-50 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    User Management
                  </div>
                </div>
                
                <div className={`border-t mt-2 pt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Quick Actions
                  </div>
                  <div className="space-y-1">
                    <div className={`px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-opacity-50 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      Create New Dashboard
                    </div>
                    <div className={`px-2 py-1.5 rounded text-sm cursor-pointer hover:bg-opacity-50 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      View All Reports
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <button 
            onClick={onToggleTheme}
            className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 transition-all duration-200 text-white" />
            ) : (
              <Sun className="w-4 h-4 transition-all duration-200 text-gray-600" />
            )}
          </button>
          <button 
            onClick={handleRefresh}
            className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'} ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          {/* Right panel toggle - Hidden on mobile */}
          {!isMobile && (
            <button 
              onClick={onToggleRightPanel}
              className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title={isRightPanelOpen ? "Hide right panel" : "Show right panel"}
            >
              <Bell className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          )}
  <button 
            onClick={onToggleRightPanel}
            className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={isRightPanelOpen ? "Hide right panel" : "Show right panel"}
          >
            {isRightPanelOpen ? (
              <PanelRight className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            ) : (
              <PanelLeft className={`w-4 h-4 transition-all duration-200 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            )}
          </button>        </div>
      </div>
    </div>
  )
}
