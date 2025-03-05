"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { AnalyticsChart } from "@/components/analytics-chart"
import { CriticalDates } from "@/components/critical-dates"
import TaskPage from '@/components/task-page'
import { chartConfig, criticalDates } from "@/lib/data"

import useSWR from 'swr'

// SWR fetcher function using Supabase
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
});

export default function Page() {
  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" }
  ]

  // Fetch chart data from Supabase
  const book = encodeURIComponent('dev_book');
  const quote = encodeURIComponent('quotes');
  const payid = encodeURIComponent('1');
  
  const { data: bTwData, error: bTwError, isLoading: bTwLoading } = useSWR(
    `/api/dashboard/week/bookings?table=${book}&payid=${payid}`, 
    fetcher, 
    {refreshInterval: 10000}
  )

  const { data: bLwData, error: bLWError, isLoading: bLWLoading } = useSWR(
    `/api/dashboard/last-week/bookings?table=${book}&payid=${payid}`, 
    fetcher, 
  )

  const { data: qTwData, error: qTwError, isLoading: qTwLoading } = useSWR(
    `/api/dashboard/week/quotes?table=${book}&payid=${payid}`, 
    fetcher, 
  )

  const { data: qLwData, error: qLwError, isLoading: qLwLoading } = useSWR(
    `/api/dashboard/last-week/quotes?table=${book}&payid=${payid}`, 
    fetcher, 
  )

  const [totalPrice, setTotalPrice] = useState({bTw: 0, bLw: 0, qTw: 0, qLw: 0})
  const [totalCount, setTotalCount] = useState({bTw: 0 , bLw: 0, qTw: 0, qLw: 0})

  // Update this week data
  useEffect(() => {
    if (bTwData?.data && Array.isArray(bTwData.data)) {
      // Calculate sum of price_customer
      const priceSum = bTwData.data.reduce((sum: number, item: { price_customer: string }) => {
        const price = parseFloat(item.price_customer) || 0;
        return sum + price;
      }, 0);
      
      setTotalPrice(prev => ({ ...prev, bTw: priceSum }));
      setTotalCount(prev => ({ ...prev, bTw: bTwData.data.length }));
    }

    if (qTwData?.data && Array.isArray(qTwData.data)) {
      // Calculate sum of price_customer
      const priceSum = qTwData.data.reduce((sum: number, item: { price_customer: string }) => {
        const price = parseFloat(item.price_customer) || 0;
        return sum + price;
      }, 0);
      
      setTotalPrice(prev => ({ ...prev, qTw: priceSum }));
      setTotalCount(prev => ({ ...prev, qTw: qTwData.data.length }));
    }
  }, [bTwData, qTwData]);
  
  // Update last week data
  useEffect(() => {
    if (bLwData?.data && Array.isArray(bLwData.data)) {
      // Calculate sum of price_customer for last week
      const priceSum = bLwData.data.reduce((sum: number, item: { price_customer: string }) => {
        const price = parseFloat(item.price_customer) || 0;
        return sum + price;
      }, 0);
      
      setTotalPrice(prev => ({ ...prev, bLw: priceSum }));
      setTotalCount(prev => ({ ...prev, bLw: bLwData.data.length }));
    }

    if (qLwData?.data && Array.isArray(qLwData.data)) {
      // Calculate sum of price_customer for last week
      const priceSum = qLwData.data.reduce((sum: number, item: { price_customer: string }) => {
        const price = parseFloat(item.price_customer) || 0;
        return sum + price;
      }, 0);
      
      setTotalPrice(prev => ({ ...prev, qLw: priceSum }));
      setTotalCount(prev => ({ ...prev, qLw: qLwData.data.length }));
    }
  }, [bLwData, qLwData]);



  return (
    <>
      <Header items={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <StatsCards sums={totalPrice} counts={totalCount}/>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* <AnalyticsChart data={chartData || []} config={chartConfig} /> */}
          <CriticalDates dates={criticalDates} />
        </div>
        <TaskPage />
      </div>
    </>
  )
}

