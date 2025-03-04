import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
  } from "lucide-react"

  // export const labels = [
  //   {
  //     value: "bug",
  //     label: "Bug",
  //   },
  //   {
  //     value: "maintenance",
  //     label: "Maintenance",
  //   },
  //   {
  //     value: "feature",
  //     label: "Feature",
  //   },
  //   {
  //     value: "documentation",
  //     label: "Documentation",
  //   },
  // ]
  
  export const labels = [  
    { value: "open", label: "Open" },  
    { value: "in progress", label: "In Progress" },  
    { value: "done", label: "Done" },  
    { value: "cancelled", label: "Cancelled" }
]  
  
  export const statuses = [
    {
      value: "pending",
      label: "Pending",
      icon: Timer,
    },
    {
      value: "booking",
      label: "Booked",
      icon: CheckCircle,
    },
    {
      value: "quote",
      label: "Quote",
      icon: Circle,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
  ]