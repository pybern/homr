"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, DollarSign, TrendingDown, TrendingUp, Users, Package, Clock } from "lucide-react"
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

export function StatsCards() {
  const [latestData, setLatestData] = useState<DashboardComparisonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch the most recent monthly data from dashboard_comparison_view
        const { data, error } = await supabase
          .from('dashboard_comparison_view')
          .select('*')
          .eq('comparison_type', 'Monthly')
          .order('time_period', { ascending: false })
          .limit(1)
          .single()
        
        if (error) {
          // If the view doesn't exist, we'll create mock data
          console.error('Error fetching stats:', error)
          setError(error.message)
          
          // Set mock data for demonstration
          setLatestData({
            comparison_type: 'Monthly',
            time_period: new Date().toISOString(),
            order_count: 1234,
            avg_price: 460.20,
            total_revenue: 567890,
            prev_period_order_count: 1175,
            prev_period_avg_price: 450.10,
            prev_period_revenue: 528867,
            count_change_pct: 5.1,
            avg_price_change_pct: 2.2,
            revenue_change_pct: 7.4
          })
        } else {
          setLatestData(data)
        }
      } catch (err: any) {
        console.error('Error in fetchStats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  // Render loading state
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-muted animate-pulse rounded mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestData?.order_count.toLocaleString() || "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            {latestData && (
              <span className={`${latestData.count_change_pct >= 0 ? 'text-green-500' : 'text-red-500'} inline-flex items-center`}>
                {latestData.count_change_pct >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {latestData.count_change_pct >= 0 ? '+' : ''}{latestData.count_change_pct.toFixed(1)}%
              </span>
            )}{" "}
            from previous {latestData?.comparison_type.toLowerCase() || "period"}
          </p>
          {latestData && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(latestData.time_period)}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestData ? formatCurrency(latestData.total_revenue) : "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            {latestData && (
              <span className={`${latestData.revenue_change_pct >= 0 ? 'text-green-500' : 'text-red-500'} inline-flex items-center`}>
                {latestData.revenue_change_pct >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {latestData.revenue_change_pct >= 0 ? '+' : ''}{latestData.revenue_change_pct.toFixed(1)}%
              </span>
            )}{" "}
            from previous {latestData?.comparison_type.toLowerCase() || "period"}
          </p>
          {latestData && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(latestData.time_period)}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestData ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            }).format(latestData.avg_price) : "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">
            {latestData && (
              <span className={`${latestData.avg_price_change_pct >= 0 ? 'text-green-500' : 'text-red-500'} inline-flex items-center`}>
                {latestData.avg_price_change_pct >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {latestData.avg_price_change_pct >= 0 ? '+' : ''}{latestData.avg_price_change_pct.toFixed(1)}%
              </span>
            )}{" "}
            from previous {latestData?.comparison_type.toLowerCase() || "period"}
          </p>
          {latestData && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(latestData.time_period)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 