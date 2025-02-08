import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CriticalDate {
  id: number
  type: string
  date: string
  description: string
}

interface CriticalDatesProps {
  dates: CriticalDate[]
}

export function CriticalDates({ dates }: CriticalDatesProps) {
  return (
    <Card className="col-span-full md:col-span-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>

    </CardHeader>
    <CardContent>
                {dates.map((event) => (
                  <Card key={event.id} className="my-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">{event.type}</CardTitle>
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
  </Card>
  )
} 