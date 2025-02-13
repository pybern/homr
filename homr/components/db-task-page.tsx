import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { UserNav } from "./user-nav"
import { taskSchema } from "./data/schema"

const tasks = [
  {
    "id": "TASK-8782",
    "title": "HVAC annual cleaning services",
    "status": "in progress",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-7878",
    "title": "Reminder for maintenance fee due over 30 days",
    "status": "backlog",
    "label": "finance",
    "priority": "medium"
  },
  {
    "id": "TASK-4567",
    "title": "Organize community summer BBQ event",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-2345",
    "title": "Update building compliance documentation",
    "status": "in progress",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-6789",
    "title": "Repair leaking roof in unit 5B",
    "status": "done",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-3456",
    "title": "Review and approve annual budget",
    "status": "backlog",
    "label": "finance",
    "priority": "medium"
  },
  {
    "id": "TASK-7890",
    "title": "Schedule elevator maintenance",
    "status": "todo",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-1234",
    "title": "Send out monthly newsletter to residents",
    "status": "in progress",
    "label": "administration",
    "priority": "low"
  },
  {
    "id": "TASK-5678",
    "title": "Conduct fire drill for all residents",
    "status": "cancelled",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-9012",
    "title": "Renew building insurance policy",
    "status": "done",
    "label": "finance",
    "priority": "high"
  },
  {
    "id": "TASK-1122",
    "title": "Inspect and repair gym equipment",
    "status": "todo",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-3344",
    "title": "Plan quarterly board meeting",
    "status": "backlog",
    "label": "administration",
    "priority": "low"
  },
  {
    "id": "TASK-5566",
    "title": "Replace hallway carpets",
    "status": "in progress",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-7788",
    "title": "Audit resident parking permits",
    "status": "todo",
    "label": "administration",
    "priority": "medium"
  },
  {
    "id": "TASK-9900",
    "title": "Install new security cameras",
    "status": "done",
    "label": "safety",
    "priority": "high"
  },
  {
    "id": "TASK-2233",
    "title": "Collect feedback for new community rules",
    "status": "in progress",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-4455",
    "title": "Repair broken mailbox locks",
    "status": "todo",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-6677",
    "title": "Prepare financial report for Q3",
    "status": "backlog",
    "label": "finance",
    "priority": "high"
  },
  {
    "id": "TASK-8899",
    "title": "Organize holiday decoration contest",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-1010",
    "title": "Inspect plumbing in all units",
    "status": "in progress",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-2020",
    "title": "Update emergency contact list",
    "status": "done",
    "label": "administration",
    "priority": "medium"
  },
  {
    "id": "TASK-3030",
    "title": "Review vendor contracts",
    "status": "backlog",
    "label": "finance",
    "priority": "medium"
  },
  {
    "id": "TASK-4040",
    "title": "Clean and repaint stairwells",
    "status": "todo",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-5050",
    "title": "Conduct noise violation awareness session",
    "status": "cancelled",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-6060",
    "title": "Replace lobby furniture",
    "status": "done",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-7070",
    "title": "Organize resident appreciation day",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-8080",
    "title": "Inspect and repair fire alarms",
    "status": "in progress",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-9090",
    "title": "Update building website content",
    "status": "backlog",
    "label": "administration",
    "priority": "low"
  },
  {
    "id": "TASK-1111",
    "title": "Schedule pest control services",
    "status": "todo",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-2222",
    "title": "Prepare for annual fire safety inspection",
    "status": "in progress",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-3333",
    "title": "Collect HOA dues from residents",
    "status": "done",
    "label": "finance",
    "priority": "medium"
  },
  {
    "id": "TASK-4444",
    "title": "Organize gardening workshop",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-5555",
    "title": "Repair broken window in unit 3A",
    "status": "in progress",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-6666",
    "title": "Review and update resident handbook",
    "status": "backlog",
    "label": "administration",
    "priority": "medium"
  },
  {
    "id": "TASK-7777",
    "title": "Inspect and clean swimming pool",
    "status": "done",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-8888",
    "title": "Plan annual general meeting",
    "status": "todo",
    "label": "administration",
    "priority": "high"
  },
  {
    "id": "TASK-9999",
    "title": "Replace outdated signage",
    "status": "in progress",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-1212",
    "title": "Conduct energy efficiency audit",
    "status": "backlog",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-1313",
    "title": "Organize movie night for residents",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-1414",
    "title": "Repair damaged fencing around property",
    "status": "in progress",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-1515",
    "title": "Update resident directory",
    "status": "done",
    "label": "administration",
    "priority": "low"
  },
  {
    "id": "TASK-1616",
    "title": "Schedule landscaping services",
    "status": "todo",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-1717",
    "title": "Conduct building safety training",
    "status": "in progress",
    "label": "compliance",
    "priority": "high"
  },
  {
    "id": "TASK-1818",
    "title": "Review and update parking policies",
    "status": "backlog",
    "label": "administration",
    "priority": "medium"
  },
  {
    "id": "TASK-1919",
    "title": "Repair water fountain in courtyard",
    "status": "done",
    "label": "maintenance",
    "priority": "medium"
  },
  {
    "id": "TASK-2021",
    "title": "Organize charity donation drive",
    "status": "todo",
    "label": "community",
    "priority": "low"
  },
  {
    "id": "TASK-2121",
    "title": "Inspect and repair garage doors",
    "status": "in progress",
    "label": "maintenance",
    "priority": "high"
  },
  {
    "id": "TASK-2223",
    "title": "Prepare for annual financial audit",
    "status": "backlog",
    "label": "finance",
    "priority": "high"
  },
  {
    "id": "TASK-2323",
    "title": "Replace outdated light bulbs",
    "status": "done",
    "label": "maintenance",
    "priority": "low"
  }
];

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "./data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default function TaskPage() {

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}