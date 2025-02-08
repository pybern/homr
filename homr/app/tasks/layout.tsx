import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { TopBar } from "./top-bar"
interface TasksLayoutProps {
  children: React.ReactNode
}

export default function TasksLayout({ children }: TasksLayoutProps) {
  const breadcrumbItems = [
    { title: "Tasks", href: "/tasks" },
    { title: "All Tasks" }
  ]

  return (
    <>
      <Header items={breadcrumbItems} />
      <div className="container mx-auto m-4">
        <Card className="p-4">
          <TopBar />
          {children}
        </Card>
      </div>
    </>
  )
} 