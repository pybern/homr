"use client"

import { useState, useEffect, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Define the type for our dashboard comparison data
interface DashboardComparisonData {
  comparison_type: 'Monthly' | 'Weekly'
  time_period: string
  order_count: number
  avg_price: number
  total_revenue: number
  prev_period_order_count: number
  prev_period_avg_price: number
  prev_period_revenue: number
  count_change_pct: number
  avg_price_change_pct: number
  revenue_change_pct: number
}

// Define chart configuration
const comparisonChartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  avgPrice: {
    label: "Avg Price",
    color: "hsl(var(--chart-3))",
  },
} as const

export function DashboardComparisonChart() {
  const [data, setData] = useState<DashboardComparisonData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeMetric, setActiveMetric] = useState<'orders' | 'revenue' | 'avgPrice'>('orders')
  const [comparisonType, setComparisonType] = useState<'Monthly' | 'Weekly'>('Monthly')

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('dashboard_comparison_view')
          .select('*')
          .eq('comparison_type', comparisonType)
          .order('time_period', { ascending: true })
        
        if (error) {
          throw error
        }
        
        setData(data || [])
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err)
        setError(err.message || 'Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [comparisonType])

  // Transform data for chart display
  const chartData = useMemo(() => {
    return data.map(item => ({
      date: new Date(item.time_period).toISOString(),
      orders: item.order_count,
      revenue: item.total_revenue,
      avgPrice: item.avg_price,
      prevOrders: item.prev_period_order_count,
      prevRevenue: item.prev_period_revenue,
      prevAvgPrice: item.prev_period_avg_price,
      orderChange: item.count_change_pct,
      revenueChange: item.revenue_change_pct,
      avgPriceChange: item.avg_price_change_pct
    }))
  }, [data])

  // Calculate totals for the header
  const totals = useMemo(() => {
    if (data.length === 0) return { orders: 0, revenue: 0, avgPrice: 0 }
    
    const totalOrders = data.reduce((sum, item) => sum + item.order_count, 0)
    const totalRevenue = data.reduce((sum, item) => sum + item.total_revenue, 0)
    const avgPrice = totalRevenue / totalOrders || 0
    
    return {
      orders: totalOrders,
      revenue: totalRevenue,
      avgPrice: avgPrice
    }
  }, [data])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }

  // if (loading) return <div>Loading dashboard data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            {comparisonType} comparison of orders, revenue, and average price
          </CardDescription>
          <div className="mt-2 flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded ${comparisonType === 'Monthly' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              onClick={() => setComparisonType('Monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${comparisonType === 'Weekly' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              onClick={() => setComparisonType('Weekly')}
            >
              Weekly
            </button>
          </div>
        </div>
        <div className="flex">
          {(Object.keys(comparisonChartConfig) as Array<keyof typeof comparisonChartConfig>).map((key) => {
            return (
              <button
                key={key}
                data-active={activeMetric === key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveMetric(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {comparisonChartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {key === 'revenue' || key === 'avgPrice' 
                    ? formatCurrency(totals[key]) 
                    : totals[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {chartData.length > 0 ? (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return comparisonType === 'Monthly'
                      ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    activeMetric === 'revenue' || activeMetric === 'avgPrice'
                      ? formatCurrency(value).replace('.00', '')
                      : value.toLocaleString()
                  }
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue' || name === 'avgPrice' || name === 'prevRevenue' || name === 'prevAvgPrice') {
                      return [formatCurrency(value), comparisonChartConfig[name.replace('prev', '').toLowerCase() as keyof typeof comparisonChartConfig]?.label || name]
                    }
                    return [value.toLocaleString(), comparisonChartConfig[name.replace('prev', '').toLowerCase() as keyof typeof comparisonChartConfig]?.label || name]
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return comparisonType === 'Monthly'
                      ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  }}
                />
                <Legend />
                <Bar 
                  dataKey={activeMetric} 
                  fill={comparisonChartConfig[activeMetric].color} 
                  name={comparisonChartConfig[activeMetric].label}
                />
                <Bar 
                  dataKey={`prev${activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}`} 
                  fill={`${comparisonChartConfig[activeMetric].color}80`}
                  name={`Previous ${comparisonChartConfig[activeMetric].label}`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[250px] items-center justify-center">
            No data available for the selected period
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Default export
export default DashboardComparisonChart; 