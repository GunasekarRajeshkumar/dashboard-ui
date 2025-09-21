import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const products = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
]

interface TopProductsTableProps {
  isDarkMode?: boolean
}

export function TopProductsTable({ isDarkMode = false }: TopProductsTableProps) {
  return (
    <div className={`rounded-lg border-0 shadow-sm p-5 transition-colors duration-300 ${isDarkMode ? 'bg-[#FFFFFF0D]' : 'bg-[#F7F9FB]'}`}>
      <div className="mb-6">
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h3>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <th className={`text-left py-3 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name</th>
              <th className={`text-left py-3 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</th>
              <th className={`text-left py-3 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quantity</th>
              <th className={`text-left py-3 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b-0">
                <td className={`py-4 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</td>
                <td className={`py-4 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.price}</td>
                <td className={`py-4 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.quantity}</td>
                <td className={`py-4 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
