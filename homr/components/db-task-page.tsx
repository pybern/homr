import { Metadata } from "next"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false })
  
  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }

  return data || []
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}