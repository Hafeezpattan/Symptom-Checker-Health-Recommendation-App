"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, TrendingUp, Clock, Stethoscope, FileText, Settings, Bell } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const recentChecks = [
    { date: "2024-01-15", symptom: "Headache", result: "Tension Headache", severity: "Moderate" },
    { date: "2024-01-10", symptom: "Cough", result: "Common Cold", severity: "Mild" },
    { date: "2024-01-05", symptom: "Fatigue", result: "Sleep Deprivation", severity: "Mild" },
  ]

  const healthMetrics = {
    checksThisMonth: 3,
    avgSeverity: "Mild",
    mostCommon: "Headache",
    improvementScore: 78,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">HealthCheck AI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
            <p className="text-gray-600">Here's your health overview and recent activity.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">New Symptom Check</h3>
                    <p className="text-blue-100 text-sm">Get instant AI-powered health insights</p>
                  </div>
                  <Stethoscope className="h-8 w-8 text-blue-200" />
                </div>
                <Link href="/checker">
                  <Button variant="secondary" className="mt-4 w-full">
                    Start Check
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Health History</h3>
                    <p className="text-gray-600 text-sm">View your past symptom checks</p>
                  </div>
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  View History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Health Insights</h3>
                    <p className="text-gray-600 text-sm">Personalized recommendations</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  View Insights
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Health Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Checks This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{healthMetrics.checksThisMonth}</div>
                <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Average Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{healthMetrics.avgSeverity}</div>
                <p className="text-xs text-gray-500 mt-1">Improved from moderate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Most Common</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{healthMetrics.mostCommon}</div>
                <p className="text-xs text-gray-500 mt-1">Consider prevention tips</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{healthMetrics.improvementScore}%</div>
                <Progress value={healthMetrics.improvementScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Symptom Checks
                </CardTitle>
                <CardDescription>Your latest health assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{check.symptom}</h4>
                          <Badge
                            variant={
                              check.severity === "Mild"
                                ? "secondary"
                                : check.severity === "Moderate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {check.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{check.result}</p>
                        <p className="text-xs text-gray-500">{check.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Health Recommendations
                </CardTitle>
                <CardDescription>Personalized tips based on your history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-blue-900">Stress Management</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Consider relaxation techniques to help with recurring headaches
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-green-900">Sleep Hygiene</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Maintain consistent sleep schedule to reduce fatigue
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-amber-900">Preventive Care</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Schedule annual check-up with your healthcare provider
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
