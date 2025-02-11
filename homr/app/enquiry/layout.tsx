import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"

interface TasksLayoutProps {
    children: React.ReactNode
}

export default function TasksLayout({ children }: TasksLayoutProps) {
    const breadcrumbItems = [
        { title: "Enq.", href: "/enquiry" }
    ]

    return (
        <div className="min-h-screen">
            <Header items={breadcrumbItems} />
            <div className="container mx-auto w-full m-4">
                <Card className="p-4">
                    {children}
                </Card>
            </div>
        </div>
    )
} 