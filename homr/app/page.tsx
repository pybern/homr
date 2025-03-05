import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { DashboardComparisonChart } from "@/components/dashboard-comparison-chart"
import { CriticalDates } from "@/components/critical-dates"
import TaskPage from '@/components/task-page'
import { chartData, chartConfig, criticalDates } from "@/lib/data"



export default function Page() {
  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" }
  ]

  return (
    <>
      <Header items={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <StatsCards />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DashboardComparisonChart />
        </div>
        <TaskPage />
      </div>
    </>
  )
}
