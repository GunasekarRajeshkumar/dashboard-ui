import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Calendar, Plus, ArrowUpDown, ListFilter, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import toast from "react-hot-toast"

interface Order {
  id: string
  customerName: string
  email: string
  avatar: string
  project: string
  address: string
  orderDate: string
  status: 'pending' | 'in-progress' | 'complete' | 'approved' | 'rejected'
  isSelected?: boolean
}

interface OrderListProps {
  isDarkMode: boolean
  isMobile?: boolean
}

export function OrderList({ isDarkMode, isMobile = false }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState<string>("orderDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    email: '',
    project: '',
    address: '',
    status: 'pending' as Order['status']
  })

  // Generate sample data
  useEffect(() => {
    const generateOrders = () => {
      const sampleOrders: Order[] = []
      const statuses: Order['status'][] = ['pending', 'in-progress', 'complete', 'approved', 'rejected']
      const projects = ['Landing Page', 'CRM Admin pages', 'Client Project', 'Admin Dashboard', 'App Landing Page', 'E-commerce Site', 'Mobile App', 'API Integration']
      const customers = [
        { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
        { name: 'Kate Morrison', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
        { name: 'Drew Cano', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
        { name: 'Orlando Diggs', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
        { name: 'Andi Lane', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
        { name: 'Natali Craig', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face' },
        { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
        { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' }
      ]
      const addresses = ['Meadow Lane Oakland', 'Larry San Francisco', 'Bagwell Avenue Ocala', 'Washburn Baton Rouge', 'Nest Lane Olivette', 'Main Street Boston', 'Oak Avenue Seattle', 'Pine Road Miami']

      for (let i = 1; i <= 50; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        const randomProject = projects[Math.floor(Math.random() * projects.length)]
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)]
        const randomAddress = addresses[Math.floor(Math.random() * addresses.length)]
        
        const orderDate = new Date()
        orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30))
        
        const timeAgo = Math.floor(Math.random() * 24 * 7) // Random hours in the past week
        let timeString = ''
        if (timeAgo < 1) timeString = 'Just now'
        else if (timeAgo < 60) timeString = `${timeAgo} minute${timeAgo > 1 ? 's' : ''} ago`
        else if (timeAgo < 24 * 60) timeString = `${Math.floor(timeAgo / 60)} hour${Math.floor(timeAgo / 60) > 1 ? 's' : ''} ago`
        else if (timeAgo < 24 * 60 * 2) timeString = 'Yesterday'
        else timeString = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

        sampleOrders.push({
          id: `#CM${String(9800 + i).padStart(4, '0')}`,
          customerName: randomCustomer.name,
          email: `${randomCustomer.name.toLowerCase().replace(' ', '.')}@email.com`,
          avatar: randomCustomer.avatar,
          project: randomProject,
          address: randomAddress,
          orderDate: timeString,
          status: randomStatus,
          isSelected: false
        })
      }
      
      return sampleOrders.sort((a, b) => {
        // Sort by time priority: "Just now" > "X minutes ago" > "X hours ago" > "Yesterday" > dates
        const timePriority = (time: string) => {
          if (time === 'Just now') return 0
          if (time.includes('minute')) return 1
          if (time.includes('hour')) return 2
          if (time === 'Yesterday') return 3
          return 4
        }
        return timePriority(a.orderDate) - timePriority(b.orderDate)
      })
    }

    setIsLoading(true)
    setTimeout(() => {
      const generatedOrders = generateOrders()
      setOrders(generatedOrders)
      setFilteredOrders(generatedOrders)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and search
  useEffect(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.address.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Order]
      let bValue: any = b[sortBy as keyof Order]
      
      if (sortBy === 'orderDate' || sortBy === 'deliveryDate') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [orders, searchQuery, statusFilter, sortBy, sortOrder])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'w-2 h-2 bg-blue-500 rounded-full'
      case 'in-progress':
        return 'w-2 h-2 bg-purple-500 rounded-full'
      case 'complete':
        return 'w-2 h-2 bg-green-500 rounded-full'
      case 'approved':
        return 'w-2 h-2 bg-yellow-500 rounded-full'
      case 'rejected':
        return 'w-2 h-2 bg-gray-400 rounded-full'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'in-progress':
        return 'In Progress'
      case 'complete':
        return 'Complete'
      case 'approved':
        return 'Approved'
      case 'rejected':
        return 'Rejected'
    }
  }

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(currentOrders.map(order => order.id)))
    }
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddOrder = () => {
    if (!newOrder.customerName || !newOrder.email || !newOrder.project || !newOrder.address) {
      toast.error('Please fill in all required fields')
      return
    }

    const newId = `#CM${String(9800 + orders.length + 1).padStart(4, '0')}`
    const newOrderData: Order = {
      id: newId,
      customerName: newOrder.customerName,
      email: newOrder.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      project: newOrder.project,
      address: newOrder.address,
      orderDate: 'Just now',
      status: newOrder.status,
      isSelected: false
    }

    setOrders(prev => [newOrderData, ...prev])
    setNewOrder({
      customerName: '',
      email: '',
      project: '',
      address: '',
      status: 'pending'
    })
    setIsAddModalOpen(false)
    toast.success('Order added successfully!')
  }

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen)
    toast.success(`Filter ${isFilterOpen ? 'closed' : 'opened'}`)
  }

  const handleSortToggle = () => {
    setIsSortOpen(!isSortOpen)
    toast.success(`Sort ${isSortOpen ? 'closed' : 'opened'}`)
  }

  if (isLoading) {
    return (
      <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1C1C1C]' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-3 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1C1C1C]' : 'bg-[#FFFFFF]'}`}>
      {/* Title */}
      <h1 className={`text-lg md:text-xl font-semibold mb-4 md:mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Order List
      </h1>

      {/* Top Bar */}
      <div className={`flex items-center justify-between mb-3 p-1.5 rounded-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#FFFFFF0D] border border-gray-700' 
          : 'bg-[#F7F9FB] border border-gray-200'
      }`}>
        {/* Left Side - Action Icons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Add New Order"
          >
            <Plus className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button 
            onClick={handleFilterToggle}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Filter Orders"
          >
            <ListFilter className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button 
            onClick={handleSortToggle}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Sort Orders"
          >
            <ArrowUpDown className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Right Side - Search */}
        <div className="relative">
          <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                 <Input
                   placeholder="Search"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className={`w-48 pl-7 pr-3 h-7 rounded-lg border transition-colors duration-300 text-sm ${
                     isDarkMode 
                       ? 'bg-[#FFFFFF1A] border-gray-300 text-white placeholder-gray-400' 
                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                   }`}
                 />
        </div>
      </div>

             {/* Orders Table */}
             <Card className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-white'} border-0`}>
               <div className="overflow-x-auto">
                 {currentOrders.length === 0 ? (
                   <div className="flex flex-col items-center justify-center py-12">
                     <div className={`text-6xl mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                       📋
                     </div>
                     <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       No data found
                     </h3>
                     <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                       {searchQuery ? `No orders match "${searchQuery}"` : 'No orders available'}
                     </p>
                   </div>
                 ) : (
                   <table className="w-full min-w-[600px]">
                     <thead>
                       <tr className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                         <th className="text-left p-3 font-medium">
                           <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedOrders.size === currentOrders.length && currentOrders.length > 0}
                                onChange={handleSelectAll}
                                className={`w-3 h-3 rounded border transition-colors duration-200 ${
                                  isDarkMode 
                                    ? 'bg-transparent border-[#FFFFFF33] text-gray-300 focus:ring-0 focus:ring-offset-0' 
                                    : 'bg-white border-[#1C1C1C33] text-[#1C1C1C33]'
                                }`}
                              />
                           </div>
                         </th>
                         <th 
                           className="text-left p-3 font-semibold cursor-pointer hover:bg-opacity-50 transition-colors duration-200"
                           onClick={() => handleSort('id')}
                         >
                           <div className="flex items-center gap-0.5">
                             <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                               Order ID
                             </span>
                             {sortBy === 'id' && (
                               <span className="text-xs">
                                 {sortOrder === 'asc' ? '↑' : '↓'}
                               </span>
                             )}
                           </div>
                         </th>
                         <th 
                           className="text-left p-3 font-semibold cursor-pointer hover:bg-opacity-50 transition-colors duration-200"
                           onClick={() => handleSort('customerName')}
                         >
                           <div className="flex items-center gap-0.5">
                             <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                               User
                             </span>
                             {sortBy === 'customerName' && (
                               <span className="text-xs">
                                 {sortOrder === 'asc' ? '↑' : '↓'}
                               </span>
                             )}
                           </div>
                         </th>
                         <th className={`text-left p-3 font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                           <span className="text-sm font-semibold">Project</span>
                         </th>
                         <th className={`text-left p-3 font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                           <span className="text-sm font-semibold">Address</span>
                         </th>
                         <th 
                           className="text-left p-3 font-semibold cursor-pointer hover:bg-opacity-50 transition-colors duration-200"
                           onClick={() => handleSort('orderDate')}
                         >
                           <div className="flex items-center gap-0.5">
                             <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                               Date
                             </span>
                             {sortBy === 'orderDate' && (
                               <span className="text-xs">
                                 {sortOrder === 'asc' ? '↑' : '↓'}
                               </span>
                             )}
                           </div>
                         </th>
                         <th 
                           className="text-left p-3 font-semibold cursor-pointer hover:bg-opacity-50 transition-colors duration-200"
                           onClick={() => handleSort('status')}
                         >
                           <div className="flex items-center gap-0.5">
                             <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'}`}>
                               Status
                             </span>
                             {sortBy === 'status' && (
                               <span className="text-xs">
                                 {sortOrder === 'asc' ? '↑' : '↓'}
                               </span>
                             )}
                           </div>
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       {currentOrders.map((order, index) => (
                         <tr 
                           key={order.id}
                         className={`border-b transition-all duration-300 group ${
                           selectedOrders.has(order.id)
                             ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                             : (isDarkMode 
                                 ? 'border-gray-700 hover:bg-[#FFFFFF0D]' 
                                 : 'border-gray-200 hover:bg-[#F7F9FB]')
                         }`}
                           style={{
                             animationDelay: `${index * 100}ms`,
                             animation: 'fadeInUp 0.5s ease-out forwards'
                           }}
                         >
                           <td className="p-3">
                             <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedOrders.has(order.id)}
                                  onChange={() => handleSelectOrder(order.id)}
                                  className={`w-3 h-3 rounded border transition-colors duration-200 ${
                                    isDarkMode 
                                      ? 'bg-transparent border-[#FFFFFF33] text-gray-300 focus:ring-0 focus:ring-offset-0' 
                                      : 'bg-white border-[#1C1C1C33] text-[#1C1C1C33]'
                                  }`}
                                />
                             </div>
                           </td>
                           <td className="p-3">
                             <div className={`font-mono text-sm font-normal transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                               {order.id}
                             </div>
                           </td>
                           <td className="p-3">
                             <div className="flex items-center gap-1.5">
                               <img 
                                 src={order.avatar} 
                                 alt={order.customerName}
                                 className="w-5 h-5 rounded-full object-cover"
                               />
                               <div className={`text-sm font-normal transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                 {order.customerName}
                               </div>
                             </div>
                           </td>
                           <td className="p-3">
                             <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                               {order.project}
                             </div>
                           </td>
                           <td className="p-3">
                             <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                               {order.address}
                             </div>
                           </td>
                           <td className="p-3">
                             <div className="flex items-center gap-1">
                               <Calendar className={`w-3 h-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                               <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                 {order.orderDate}
                               </div>
                             </div>
                           </td>
                           <td className="p-3">
                             <div className="flex items-center gap-1">
                               <div className={getStatusColor(order.status)}></div>
                               <span className={`text-sm font-normal transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                 {getStatusText(order.status)}
                               </span>
                             </div>
                           </td>
                           <td className="p-3">
                             <div className="flex items-center justify-end">
                               <button className={`p-1 rounded hover:bg-opacity-50 transition-colors duration-200 opacity-0 group-hover:opacity-100 ${
                                 isDarkMode ? 'hover:bg-white' : 'hover:bg-gray-100'
                               }`}>
                                 <MoreHorizontal className={`w-3 h-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                               </button>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 )}
               </div>

               {/* Pagination - Only show when there's data */}
               {currentOrders.length > 0 && (
                 <div className={`p-3 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                   <div className="flex items-center justify-end">
                     <div className="flex items-center gap-1">
                       <button
                         onClick={() => handlePageChange(currentPage - 1)}
                         disabled={currentPage === 1}
                         className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                           currentPage === 1
                             ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                             : (isDarkMode 
                                 ? 'text-gray-300 hover:bg-gray-700' 
                                 : 'text-gray-700 hover:bg-gray-100')
                         }`}
                       >
                         <ChevronLeft className="w-3 h-3" />
                       </button>
                       
                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                         const page = i + 1
                         const isActive = page === currentPage
                         
                         return (
                           <button
                             key={page}
                             onClick={() => handlePageChange(page)}
                             className={`w-7 h-7 rounded-lg text-sm font-medium transition-colors duration-200 ${
                               isActive
                                 ? (isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900')
                                 : (isDarkMode
                                     ? 'text-gray-300 hover:bg-gray-700'
                                     : 'text-gray-700 hover:bg-gray-100')
                             }`}
                           >
                             {page}
                           </button>
                         )
                       })}
                       
                       <button
                         onClick={() => handlePageChange(currentPage + 1)}
                         disabled={currentPage === totalPages}
                         className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                           currentPage === totalPages
                             ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                             : (isDarkMode 
                                 ? 'text-gray-300 hover:bg-gray-700' 
                                 : 'text-gray-700 hover:bg-gray-100')
                         }`}
                       >
                         <ChevronRight className="w-3 h-3" />
                       </button>
                     </div>
                   </div>
                 </div>
               )}
      </Card>

             {/* Add Order Modal */}
             {isAddModalOpen && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className={`w-96 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#1C1C1C] border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                   {/* Modal Header */}
                   <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${
                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
                   }`}>
                     <h2 className={`text-lg font-semibold transition-colors duration-300 ${
                       isDarkMode ? 'text-white' : 'text-gray-900'
                     }`}>
                       Add New Order
                     </h2>
                     <button
                       onClick={() => setIsAddModalOpen(false)}
                       className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-colors duration-200 ${
                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                       }`}
                     >
                       <X className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                     </button>
                   </div>
                   
                   {/* Modal Body */}
                   <div className="p-4 space-y-4">
                     <div>
                       <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                         isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'
                       }`}>
                         Customer Name *
                       </label>
                       <Input
                         value={newOrder.customerName}
                         onChange={(e) => setNewOrder(prev => ({ ...prev, customerName: e.target.value }))}
                         placeholder="Enter customer name"
                         className={`w-full h-8 text-sm transition-colors duration-300 ${
                           isDarkMode 
                             ? 'bg-[#FFFFFF0D] border-gray-600 text-white placeholder-gray-400' 
                             : 'bg-[#F7F9FB] border-gray-300 text-gray-900 placeholder-gray-500'
                         }`}
                       />
                     </div>
                     
                     <div>
                       <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                         isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'
                       }`}>
                         Email *
                       </label>
                       <Input
                         value={newOrder.email}
                         onChange={(e) => setNewOrder(prev => ({ ...prev, email: e.target.value }))}
                         placeholder="Enter email address"
                         type="email"
                         className={`w-full h-8 text-sm transition-colors duration-300 ${
                           isDarkMode 
                             ? 'bg-[#FFFFFF0D] border-gray-600 text-white placeholder-gray-400' 
                             : 'bg-[#F7F9FB] border-gray-300 text-gray-900 placeholder-gray-500'
                         }`}
                       />
                     </div>
                     
                     <div>
                       <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                         isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'
                       }`}>
                         Project *
                       </label>
                       <Input
                         value={newOrder.project}
                         onChange={(e) => setNewOrder(prev => ({ ...prev, project: e.target.value }))}
                         placeholder="Enter project name"
                         className={`w-full h-8 text-sm transition-colors duration-300 ${
                           isDarkMode 
                             ? 'bg-[#FFFFFF0D] border-gray-600 text-white placeholder-gray-400' 
                             : 'bg-[#F7F9FB] border-gray-300 text-gray-900 placeholder-gray-500'
                         }`}
                       />
                     </div>
                     
                     <div>
                       <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                         isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'
                       }`}>
                         Address *
                       </label>
                       <Input
                         value={newOrder.address}
                         onChange={(e) => setNewOrder(prev => ({ ...prev, address: e.target.value }))}
                         placeholder="Enter address"
                         className={`w-full h-8 text-sm transition-colors duration-300 ${
                           isDarkMode 
                             ? 'bg-[#FFFFFF0D] border-gray-600 text-white placeholder-gray-400' 
                             : 'bg-[#F7F9FB] border-gray-300 text-gray-900 placeholder-gray-500'
                         }`}
                       />
                     </div>
                     
                     <div>
                       <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                         isDarkMode ? 'text-gray-300' : 'text-[#1C1C1C33]'
                       }`}>
                         Status
                       </label>
                       <select
                         value={newOrder.status}
                         onChange={(e) => setNewOrder(prev => ({ ...prev, status: e.target.value as Order['status'] }))}
                         className={`w-full h-8 text-sm rounded border transition-colors duration-300 ${
                           isDarkMode 
                             ? 'bg-[#FFFFFF0D] border-gray-600 text-white' 
                             : 'bg-[#F7F9FB] border-gray-300 text-gray-900'
                         }`}
                       >
                         <option value="pending">Pending</option>
                         <option value="in-progress">In Progress</option>
                         <option value="complete">Complete</option>
                         <option value="approved">Approved</option>
                         <option value="rejected">Rejected</option>
                       </select>
                     </div>
                   </div>
                   
                   {/* Modal Footer */}
                   <div className={`flex gap-2 p-4 border-t transition-colors duration-300 ${
                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
                   }`}>
                     <Button
                       onClick={handleAddOrder}
                       className="flex-1 h-8 text-sm bg-blue-500 hover:bg-blue-600 text-white"
                     >
                       Add Order
                     </Button>
                     <Button
                       onClick={() => setIsAddModalOpen(false)}
                       variant="outline"
                       className={`flex-1 h-8 text-sm transition-colors duration-300 ${
                         isDarkMode 
                           ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                           : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                       }`}
                     >
                       Cancel
                     </Button>
                   </div>
                 </div>
               </div>
             )}
    </div>
  )
}
