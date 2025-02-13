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
    { value: "maintenance", label: "Maintenance" },  
    { value: "administration", label: "Administration" },  
    { value: "finance", label: "Finance" },  
    { value: "community", label: "Community" },  
    { value: "compliance", label: "Compliance" },
    { value: "enquiry", label: "Enquiry" },
]  
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: Timer,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: CircleOff,
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