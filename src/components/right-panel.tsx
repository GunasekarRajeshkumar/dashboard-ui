import { Bug, User, Wifi } from "lucide-react"

interface RightPanelProps {
  isDarkMode: boolean
}

export function RightPanel({ isDarkMode }: RightPanelProps) {
  return (
    <div className={`w-80 h-full border-l overflow-y-auto custom-scrollbar transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D] border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Notifications Section */}
      <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`font-semibold text-base mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Bug className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>You have a bug that needs...</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Just now</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <User className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New user registered</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>59 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Bug className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>You have a bug that needs...</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Wifi className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Andi Lane subscribed to you</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today, 11:59 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`font-semibold text-base mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activities</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <img 
              src="/assets/activity (1).png" 
              alt="Activity" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>You have a bug that needs...</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Just now</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img 
              src="/assets/activity (2).png" 
              alt="Activity" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Released a new version</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>59 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img 
              src="/assets/activity (3).png" 
              alt="Activity" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Submitted a bug</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img 
              src="/assets/activity (4).png" 
              alt="Activity" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Modified A data in Page X</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today, 11:59 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img 
              src="/assets/activity (5).png" 
              alt="Activity" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Deleted a page in Project X</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Feb 2, 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="p-6">
        <h2 className={`font-semibold text-base mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contacts</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (1).png" 
              alt="Natali Craig" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Natali Craig</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (2).png" 
              alt="Drew Cano" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drew Cano</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (3).png" 
              alt="Orlando Diggs" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Orlando Diggs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (4).png" 
              alt="Andi Lane" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Andi Lane</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (5).png" 
              alt="Kate Morrison" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kate Morrison</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="/assets/contact (6).png" 
              alt="Koray Okumus" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Koray Okumus</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
