"use client"

import { useState, useEffect } from "react"
import { Metadata } from "next"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Define the type for our shipping data
interface ShippingData {
  from: string
  to: string
  from_desc: string
  to_desc: string
  type: string
  path: any
  v_type: string
  carrier: string
  carrier_type: string
  goods_category: string
  price_sell: number
  ref_id: string
  selected_from: string
  selected_to: string
  email: string
  phone: string
  make: string
  model: string
  year: string
  source: string
  created_at: string
  price_gst: number
  price_profit: number
  rn1: string
  rn2: string
  transit: number
  num_carriers: string
  price_spoke_surcharge: number
  price_cc_surcharge: number
  price_customer: number
  price_customer_cents: number
  num_carriers_type: string
  price_cost: number
  car_age: string
  price_fuel: number
  status: string
  source_table: string
}

// Define the Task type
interface Task {
  id: string
  title: string
  status: string
  label: string
  priority: string
}

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchShippingData() {
      try {
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('combined_records_view')  // Replace with your actual table name
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          throw error
        }
        
        // Transform the data into the task format
        const transformedTasks = (data || []).map((item: ShippingData) => ({
          id: item.ref_id,
          title: `${item.make} ${item.model} [${item.v_type || 'Vehicle'}] from ${item.from || 'Unknown'} to ${item.to || 'Unknown'} `,
          status: item.status || 'backlog',
          label: 'open',
          priority: 'medium'
        }))
        
        setTasks(transformedTasks)
      } catch (err: any) {
        console.error('Error fetching shipping data:', err)
        setError(err.message)
        
        // Set mock data if there's an error
        setTasks(mockTasks)
      } finally {
        setLoading(false)
      }
    }

    fetchShippingData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-24">Loading tasks...</div>
  }

  if (error) {
    console.error('Error loading tasks:', error)
    // Fall back to mock data if there's an error
    return (
      <>
        <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p className="font-bold">Warning</p>
            <p>Could not load data from Supabase. Showing mock data instead.</p>
            <p className="text-xs mt-1">{error}</p>
          </div>
          <DataTable data={mockTasks} columns={columns} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}

// Mock data for fallback
const mockTasks = [
  {
    "id": "TASK-8782",
    "title": "SUV from Sydney to Melbourne - $1,250",
    "status": "in progress",
    "label": "open",
    "priority": "medium"
  },
  {
    "id": "TASK-7878",
    "title": "Sedan from Brisbane to Gold Coast - $450",
    "status": "backlog",
    "label": "open",
    "priority": "medium"
  },
  {
    "id": "TASK-4567",
    "title": "Truck from Perth to Adelaide - $3,200",
    "status": "todo",
    "label": "open",
    "priority": "medium"
  },
  {
    "id": "TASK-2345",
    "title": "Motorcycle from Melbourne to Canberra - $780",
    "status": "in progress",
    "label": "open",
    "priority": "medium"
  },
  {
    "id": "TASK-6789",
    "title": "Van from Adelaide to Sydney - $1,450",
    "status": "done",
    "label": "open",
    "priority": "medium"
  }
];