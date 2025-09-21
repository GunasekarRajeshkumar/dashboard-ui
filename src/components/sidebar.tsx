import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  FolderOpen,
  BookOpen,
  FileText,
  MessageCircle,
  ShoppingBag,
  PieChart,
  UserCheck,
  CreditCard,
  Users,
  List,
} from "lucide-react"

interface SidebarProps {
  isDarkMode: boolean
  onNavigate: (page: string) => void
  currentPage: string
  isMobile?: boolean
}

function Sidebar({ isDarkMode, onNavigate, currentPage, isMobile = false }: SidebarProps) {
  const [activeDashboard, setActiveDashboard] = useState("Default")
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(true)
  const [activeFavorites, setActiveFavorites] = useState("Favorites")

  const handleDashboardClick = (dashboard: string) => {
    setActiveDashboard(dashboard)
    onNavigate(dashboard)
    // Close sidebar on mobile after navigation
    if (isMobile) {
      // We'll need to pass a close function from parent
    }
  }

  const handleUserProfileToggle = () => {
    setIsUserProfileOpen(!isUserProfileOpen)
  }

  const handleFavoritesToggle = (tab: string) => {
    setActiveFavorites(tab)
  }

  return (
    <div className={`w-64 h-full border-r flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D] border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* User Profile Section */}
      <div className={`p-4 flex-shrink-0 transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>ByeWind</span>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Favorites/Recently */}
        <div>
          <div className="flex items-center gap-4 text-sm mb-3">
            <button
              onClick={() => handleFavoritesToggle("Favorites")}
              className={`transition-colors ${
                activeFavorites === "Favorites" 
                  ? (isDarkMode ? "text-white" : "text-gray-700") 
                  : (isDarkMode ? "text-gray-400" : "text-gray-500")
              } ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-700'}`}
            >
              Favorites
            </button>
            <button
              onClick={() => handleFavoritesToggle("Recently")}
              className={`transition-colors ${
                activeFavorites === "Recently" 
                  ? (isDarkMode ? "text-white" : "text-gray-700") 
                  : (isDarkMode ? "text-gray-400" : "text-gray-500")
              } ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-700'}`}
            >
              Recently
            </button>
          </div>
          <div className="space-y-1">
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
              <span>Overview</span>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
              <span>Projects</span>
            </div>
          </div>
        </div>

        {/* Dashboards */}
        <div>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dashboards</h3>
          <div className="space-y-1">
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                currentPage === "Default" 
                  ? (isDarkMode 
                      ? "bg-gray-700 text-white border-l-2 border-gray-300" 
                      : "bg-gray-100 text-gray-700 border-l-2 border-gray-700")
                  : (isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-gray-700 hover:bg-gray-50")
              }`}
              onClick={() => handleDashboardClick("Default")}
            >
              <PieChart className="w-4 h-4" />
              <span>Default</span>
            </div>
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                currentPage === "eCommerce" 
                  ? (isDarkMode 
                      ? "bg-gray-700 text-white border-l-2 border-gray-300" 
                      : "bg-gray-100 text-gray-700 border-l-2 border-gray-700")
                  : (isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-gray-700 hover:bg-gray-50")
              }`}
              onClick={() => handleDashboardClick("eCommerce")}
            >
              <ChevronRight className="w-3 h-3" />
              <ShoppingBag className="w-4 h-4" />
              <span>eCommerce</span>
            </div>
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                currentPage === "OrderList" 
                  ? (isDarkMode 
                      ? "bg-gray-700 text-white border-l-2 border-gray-300" 
                      : "bg-gray-100 text-gray-700 border-l-2 border-gray-700")
                  : (isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-gray-700 hover:bg-gray-50")
              }`}
              onClick={() => handleDashboardClick("OrderList")}
            >
              <ChevronRight className="w-3 h-3" />
              <List className="w-4 h-4" />
              <span>Order List</span>
            </div>
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                activeDashboard === "Projects" 
                  ? (isDarkMode 
                      ? "bg-gray-700 text-white border-l-2 border-gray-300" 
                      : "bg-gray-100 text-gray-700 border-l-2 border-gray-700")
                  : (isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-gray-700 hover:bg-gray-50")
              }`}
              onClick={() => handleDashboardClick("Projects")}
            >
              <ChevronRight className="w-3 h-3" />
              <FolderOpen className="w-4 h-4" />
              <span>Projects</span>
            </div>
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                activeDashboard === "Online Courses" 
                  ? (isDarkMode 
                      ? "bg-gray-700 text-white border-l-2 border-gray-300" 
                      : "bg-gray-100 text-gray-700 border-l-2 border-gray-700")
                  : (isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-gray-700 hover:bg-gray-50")
              }`}
              onClick={() => handleDashboardClick("Online Courses")}
            >
              <ChevronRight className="w-3 h-3" />
              <BookOpen className="w-4 h-4" />
              <span>Online Courses</span>
            </div>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pages</h3>
          <div className="space-y-1">
            {/* User Profile with dropdown */}
            <div className="space-y-1">
              <div 
                className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={handleUserProfileToggle}
              >
                <UserCheck className="w-4 h-4" />
                <span>User Profile</span>
                {isUserProfileOpen ? (
                  <ChevronDown className="w-3 h-3 ml-auto" />
                ) : (
                  <ChevronRight className="w-3 h-3 ml-auto" />
                )}
              </div>
              {isUserProfileOpen && (
                <div className="ml-6 space-y-1">
                  <div className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>Overview</div>
                  <div className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>Projects</div>
                  <div className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>Campaigns</div>
                  <div className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>Documents</div>
                  <div className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>Followers</div>
                </div>
              )}
            </div>
            
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <ChevronRight className="w-3 h-3" />
              <CreditCard className="w-4 h-4" />
              <span>Account</span>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <ChevronRight className="w-3 h-3" />
              <Users className="w-4 h-4" />
              <span>Corporate</span>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <ChevronRight className="w-3 h-3" />
              <FileText className="w-4 h-4" />
              <span>Blog</span>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <ChevronRight className="w-3 h-3" />
              <MessageCircle className="w-4 h-4" />
              <span>Social</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
