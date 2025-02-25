import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react"

interface Sums {
  bTw: number;
  bLw: number;
  qTw: number;
  qLw: number;
}

interface Counts {
  bTw: number;
  bLw: number
  qTw: number;
  qLw: number;
}

export function StatsCards({ sums, counts }: { sums: Sums, counts: Counts }) {
  const salesTrend = sums.bTw > sums.bLw ? true : false
  const bookTrend = counts.bTw > counts.bLw ? true : false
  const quoteTrend = counts.qTw > counts.qLw ? true : false

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$ {sums.bTw.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`inline-flex items-center ${salesTrend ? 'text-green-500' : 'text-red-500'}`}>
              {salesTrend ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}{Math.abs(sums.bTw - sums.bLw).toLocaleString()}
            </span>{" "}
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{counts.bTw.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`inline-flex items-center ${bookTrend ? 'text-green-500' : 'text-red-500'}`}>
              {bookTrend ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}{Math.abs(counts.bTw - counts.bLw).toLocaleString()}
            </span>{" "}
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{counts.qTw.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
            {quoteTrend ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}{Math.abs(counts.qTw - counts.qLw).toLocaleString()}
            </span>{" "}
            from last week
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 