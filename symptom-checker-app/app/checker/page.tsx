"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowRight, AlertTriangle, Clock, User, Brain, Activity } from "lucide-react"
import Link from "next/link"
import { medicalAI, type PatientProfile, type AnalysisResult, type Recommendation } from "@/lib/medical-ai"

interface SymptomData {
  primarySymptom: string
  duration: string
  severity: string
  additionalSymptoms: string[]
  age: string
  gender: string
  description: string
}

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest pain",
  "Shortness of breath",
  "Abdominal pain",
  "Joint pain",
  "Skin rash",
  "Sore throat",
  "Back pain",
  "Muscle aches",
]

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [symptomData, setSymptomData] = useState<SymptomData>({
    primarySymptom: "",
    duration: "",
    severity: "",
    additionalSymptoms: [],
    age: "",
    gender: "",
    description: "",
  })

  const handleSymptomToggle = (symptom: string) => {
    setSymptomData((prev) => ({
      ...prev,
      additionalSymptoms: prev.additionalSymptoms.includes(symptom)
        ? prev.additionalSymptoms.filter((s) => s !== symptom)
        : [...prev.additionalSymptoms, symptom],
    }))
  }

  const handleAnalyze = async () => {
    setIsLoading(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Create patient profile for AI analysis
    const patientProfile: PatientProfile = {
      age: Number.parseInt(symptomData.age),
      gender: symptomData.gender,
      primarySymptom: symptomData.primarySymptom,
      duration: symptomData.duration,
      severity: symptomData.severity,
      additionalSymptoms: symptomData.additionalSymptoms,
      description: symptomData.description,
    }

    // Run AI analysis
    const results = medicalAI.analyzeSymptoms(patientProfile)
    const recs = medicalAI.generateRecommendations(results, patientProfile)

    setAnalysisResults(results)
    setRecommendations(recs)
    setIsLoading(false)
    setCurrentStep(4)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 border-red-300 text-red-800"
      case "high":
        return "bg-orange-100 border-orange-300 text-orange-800"
      case "medium":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "low":
        return "bg-green-100 border-green-300 text-green-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-red-500"
    if (confidence >= 60) return "bg-orange-500"
    if (confidence >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Basic Information
        </CardTitle>
        <CardDescription>
          Help us provide more accurate AI-powered recommendations by sharing some basic details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={symptomData.age}
              onChange={(e) => setSymptomData((prev) => ({ ...prev, age: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={symptomData.gender}
              onValueChange={(value) => setSymptomData((prev) => ({ ...prev, gender: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => setCurrentStep(2)} className="w-full" disabled={!symptomData.age || !symptomData.gender}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Primary Symptom
        </CardTitle>
        <CardDescription>What is your main concern or most bothersome symptom?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="primary-symptom">Primary Symptom</Label>
          <Input
            id="primary-symptom"
            placeholder="e.g., Headache, Fever, Cough"
            value={symptomData.primarySymptom}
            onChange={(e) => setSymptomData((prev) => ({ ...prev, primarySymptom: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select
              value={symptomData.duration}
              onValueChange={(value) => setSymptomData((prev) => ({ ...prev, duration: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="How long?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-day">Less than a day</SelectItem>
                <SelectItem value="1-3-days">1-3 days</SelectItem>
                <SelectItem value="4-7-days">4-7 days</SelectItem>
                <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                <SelectItem value="more-than-2-weeks">More than 2 weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="severity">Severity</Label>
            <Select
              value={symptomData.severity}
              onValueChange={(value) => setSymptomData((prev) => ({ ...prev, severity: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="How severe?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
                <SelectItem value="very-severe">Very Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Additional Details</Label>
          <Textarea
            id="description"
            placeholder="Describe your symptom in more detail..."
            value={symptomData.description}
            onChange={(e) => setSymptomData((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button
            onClick={() => setCurrentStep(3)}
            className="flex-1"
            disabled={!symptomData.primarySymptom || !symptomData.duration || !symptomData.severity}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Additional Symptoms</CardTitle>
        <CardDescription>Select any other symptoms you're experiencing (optional)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {commonSymptoms.map((symptom) => (
            <div key={symptom} className="flex items-center space-x-2">
              <Checkbox
                id={symptom}
                checked={symptomData.additionalSymptoms.includes(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
              />
              <Label htmlFor={symptom} className="text-sm">
                {symptom}
              </Label>
            </div>
          ))}
        </div>

        {symptomData.additionalSymptoms.length > 0 && (
          <div>
            <Label>Selected symptoms:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {symptomData.additionalSymptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            Back
          </Button>
          <Button onClick={handleAnalyze} className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                AI Analyzing...
              </div>
            ) : (
              <>
                Analyze with AI <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderResults = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not
          replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and
          treatment.
        </AlertDescription>
      </Alert>

      {/* AI Analysis Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Brain className="mr-2 h-6 w-6" />
            AI Analysis Complete
          </CardTitle>
          <CardDescription className="text-blue-600">
            Our medical AI has analyzed your symptoms using advanced pattern recognition and medical databases.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Possible Conditions
            </CardTitle>
            <CardDescription>AI-powered analysis of potential conditions based on your symptoms:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.length > 0 ? (
                analysisResults.map((result, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{result.disease.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{result.confidence}% match</Badge>
                        <div className={`px-2 py-1 rounded text-xs ${getUrgencyColor(result.disease.urgency)}`}>
                          {result.disease.urgency}
                        </div>
                      </div>
                    </div>
                    <Progress value={result.confidence} className="mb-2" />
                    <p className="text-sm text-gray-600 mb-2">{result.disease.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Category:</strong> {result.disease.category}
                    </div>
                    {result.matchingSymptoms.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Matching symptoms:</div>
                        <div className="flex flex-wrap gap-1">
                          {result.matchingSymptoms.map((symptom, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No clear matches found. Please consult a healthcare provider.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">AI Recommendations</CardTitle>
            <CardDescription>Personalized next steps based on AI analysis:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getUrgencyColor(rec.type)}`}>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        rec.type === "emergency"
                          ? "bg-red-500"
                          : rec.type === "see-doctor"
                            ? "bg-orange-500"
                            : rec.type === "monitor"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Warning */}
      {recommendations.some((r) => r.type === "emergency") && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Alert:</strong> Your symptoms may indicate a serious condition. Please seek immediate
            medical attention or call emergency services.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>When to Seek Immediate Medical Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Emergency Signs:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Difficulty breathing or shortness of breath</li>
                <li>• Chest pain or pressure</li>
                <li>• Severe abdominal pain</li>
                <li>• High fever with confusion</li>
                <li>• Severe allergic reactions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-amber-600">See Doctor Soon:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Symptoms getting worse over time</li>
                <li>• Persistent high fever</li>
                <li>• Severe pain that doesn't improve</li>
                <li>• Symptoms affecting daily activities</li>
                <li>• Concerning changes in symptoms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setCurrentStep(1)} variant="outline">
          New Symptom Check
        </Button>
        <Button>Save Results</Button>
        <Button variant="outline">Find Healthcare Provider</Button>
      </div>
    </div>
  )

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
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Step {currentStep} of 4</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderResults()}
        </div>
      </main>
    </div>
  )
}
