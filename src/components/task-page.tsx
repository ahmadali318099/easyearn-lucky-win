"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/app/page"
import { CheckSquare, Clock, DollarSign, Edit, Trash2, Plus, Lock, ExternalLink } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  status: "available" | "pending" | "completed" | "rejected"
  category: string
  timeEstimate: string
  requirements: string[]
}

export function TaskPage() {
  const { user } = useUser()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Follow Instagram Account",
      description: "Follow our partner Instagram account and like the latest 3 posts",
      reward: 2.5,
      status: "available",
      category: "Social Media",
      timeEstimate: "5 min",
      requirements: ["Instagram account required", "Must follow for 24 hours minimum"],
    },
    {
      id: "2",
      title: "YouTube Video Engagement",
      description: "Watch, like, and comment on a YouTube video",
      reward: 3.0,
      status: "pending",
      category: "Social Media",
      timeEstimate: "10 min",
      requirements: ["YouTube account required", "Meaningful comment required"],
    },
    {
      id: "3",
      title: "App Review",
      description: "Download app and leave a 5-star review on Play Store",
      reward: 5.0,
      status: "completed",
      category: "App Store",
      timeEstimate: "15 min",
      requirements: ["Android device required", "Google Play account needed"],
    },
    {
      id: "4",
      title: "Survey Completion",
      description: "Complete a market research survey about consumer preferences",
      reward: 4.5,
      status: "available",
      category: "Survey",
      timeEstimate: "20 min",
      requirements: ["Age 18+", "US residents only"],
    },
  ])

  const handleTaskAction = (taskId: string, action: "start" | "edit" | "delete") => {
    if (action === "start") {
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "pending" as const } : task)))
      alert("Task started! Complete the requirements and wait for approval.")
    } else if (action === "delete") {
      setTasks(tasks.filter((task) => task.id !== taskId))
      alert("Task deleted successfully.")
    } else if (action === "edit") {
      alert("Edit functionality would open a modal/form here.")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Social Media":
        return "bg-purple-100 text-purple-800"
      case "App Store":
        return "bg-orange-100 text-orange-800"
      case "Survey":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user?.hasDeposited) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-8 text-center">
            <Lock className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-orange-800 mb-2">Tasks Locked</h2>
            <p className="text-orange-700 mb-6">
              Make a minimum deposit of $10 to unlock task earning features and start completing tasks.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700">Make Deposit</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const availableTasks = tasks.filter((task) => task.status === "available")
  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">Complete tasks to earn money</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Request Custom Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Tasks</p>
                <p className="text-2xl font-bold text-green-600">{availableTasks.length}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedTasks.length}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-green-600">
                  ${completedTasks.reduce((sum, task) => sum + task.reward, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Tasks */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                        <Badge variant="outline">{task.timeEstimate}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${task.reward}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-700">Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {task.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => handleTaskAction(task.id, "start")} className="w-full">
                    Start Task
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Approval</h2>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                          <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">${task.reward}</p>
                          <p className="text-sm text-gray-500">Pending review</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleTaskAction(task.id, "edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleTaskAction(task.id, "delete")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Tasks</h2>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <Card key={task.id} className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(task.status)}>Completed</Badge>
                          <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">${task.reward}</p>
                        <p className="text-sm text-green-600">✓ Earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
