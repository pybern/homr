import { Header } from "@/components/header"

interface TasksLayoutProps {
  children: React.ReactNode
}

export default function TasksLayout({ children }: TasksLayoutProps) {
  const breadcrumbItems = [
    { title: "Client", href: "/tasks" }
  ]

  return (
    <>
    <Header items={breadcrumbItems} />
      <div className="container mx-auto w-full m-4">
        {children}
      </div>
    </>
  )
} 