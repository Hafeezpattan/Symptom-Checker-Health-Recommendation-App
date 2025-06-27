// Comprehensive Medical AI Analysis System
// Based on medical literature and symptom-disease correlations

interface PatientProfile {
  age: number
  gender: string
  primarySymptom: string
  duration: string
  severity: string
  additionalSymptoms: string[]
  description: string
}

interface Disease {
  name: string
  category: string
  commonSymptoms: string[]
  rareSymptoms: string[]
  ageFactors: {
    moreCommonIn: string[]
    lessCommonIn: string[]
  }
  genderFactors: {
    moreCommonIn: string[]
  }
  severityIndicators: string[]
  durationFactors: {
    acute: boolean
    chronic: boolean
  }
  description: string
  urgency: "low" | "medium" | "high" | "emergency"
}

interface AnalysisResult {
  disease: Disease
  confidence: number
  matchingSymptoms: string[]
  riskFactors: string[]
}

interface Recommendation {
  type: "self-care" | "monitor" | "see-doctor" | "emergency"
  title: string
  description: string
  urgency: number
}

// Comprehensive disease database
const DISEASE_DATABASE: Disease[] = [
  {
    name: "Tension Headache",
    category: "Neurological",
    commonSymptoms: ["headache", "muscle aches", "fatigue", "stress"],
    rareSymptoms: ["nausea", "dizziness"],
    ageFactors: {
      moreCommonIn: ["adult", "middle-aged"],
      lessCommonIn: ["child", "elderly"],
    },
    genderFactors: {
      moreCommonIn: ["female"],
    },
    severityIndicators: ["mild", "moderate"],
    durationFactors: { acute: true, chronic: true },
    description: "Most common type of headache, often caused by stress, poor posture, or muscle tension",
    urgency: "low",
  },
  {
    name: "Migraine",
    category: "Neurological",
    commonSymptoms: ["headache", "nausea", "dizziness", "fatigue"],
    rareSymptoms: ["vision changes", "sensitivity to light"],
    ageFactors: {
      moreCommonIn: ["young-adult", "adult"],
      lessCommonIn: ["elderly"],
    },
    genderFactors: {
      moreCommonIn: ["female"],
    },
    severityIndicators: ["moderate", "severe"],
    durationFactors: { acute: true, chronic: false },
    description: "Severe headache often accompanied by nausea and sensitivity to light and sound",
    urgency: "medium",
  },
  {
    name: "Common Cold",
    category: "Respiratory",
    commonSymptoms: ["cough", "sore throat", "fatigue", "runny nose"],
    rareSymptoms: ["fever", "headache", "muscle aches"],
    ageFactors: {
      moreCommonIn: ["child", "adult"],
      lessCommonIn: [],
    },
    genderFactors: {
      moreCommonIn: [],
    },
    severityIndicators: ["mild", "moderate"],
    durationFactors: { acute: true, chronic: false },
    description: "Viral upper respiratory infection with nasal congestion and throat irritation",
    urgency: "low",
  },
  {
    name: "Influenza",
    category: "Respiratory",
    commonSymptoms: ["fever", "cough", "fatigue", "muscle aches", "headache"],
    rareSymptoms: ["nausea", "diarrhea"],
    ageFactors: {
      moreCommonIn: ["child", "elderly"],
      lessCommonIn: [],
    },
    genderFactors: {
      moreCommonIn: [],
    },
    severityIndicators: ["moderate", "severe"],
    durationFactors: { acute: true, chronic: false },
    description: "Viral infection affecting the respiratory system with systemic symptoms",
    urgency: "medium",
  },
  {
    name: "Gastroenteritis",
    category: "Gastrointestinal",
    commonSymptoms: ["nausea", "abdominal pain", "diarrhea", "fatigue"],
    rareSymptoms: ["fever", "headache", "muscle aches"],
    ageFactors: {
      moreCommonIn: ["child", "adult"],
      lessCommonIn: [],
    },
    genderFactors: {
      moreCommonIn: [],
    },
    severityIndicators: ["mild", "moderate", "severe"],
    durationFactors: { acute: true, chronic: false },
    description: "Inflammation of stomach and intestines, often caused by infection or food poisoning",
    urgency: "medium",
  },
  {
    name: "Anxiety Disorder",
    category: "Mental Health",
    commonSymptoms: ["fatigue", "dizziness", "chest pain", "shortness of breath"],
    rareSymptoms: ["nausea", "headache", "muscle aches"],
    ageFactors: {
      moreCommonIn: ["young-adult", "adult"],
      lessCommonIn: ["child", "elderly"],
    },
    genderFactors: {
      moreCommonIn: ["female"],
    },
    severityIndicators: ["mild", "moderate", "severe"],
    durationFactors: { acute: false, chronic: true },
    description: "Mental health condition characterized by excessive worry and physical symptoms",
    urgency: "medium",
  },
  {
    name: "Hypertension",
    category: "Cardiovascular",
    commonSymptoms: ["headache", "dizziness", "fatigue"],
    rareSymptoms: ["chest pain", "shortness of breath", "nausea"],
    ageFactors: {
      moreCommonIn: ["middle-aged", "elderly"],
      lessCommonIn: ["child", "young-adult"],
    },
    genderFactors: {
      moreCommonIn: ["male"],
    },
    severityIndicators: ["mild", "moderate", "severe"],
    durationFactors: { acute: false, chronic: true },
    description: "High blood pressure that can lead to serious cardiovascular complications",
    urgency: "medium",
  },
  {
    name: "Pneumonia",
    category: "Respiratory",
    commonSymptoms: ["cough", "fever", "chest pain", "shortness of breath", "fatigue"],
    rareSymptoms: ["nausea", "diarrhea", "confusion"],
    ageFactors: {
      moreCommonIn: ["child", "elderly"],
      lessCommonIn: [],
    },
    genderFactors: {
      moreCommonIn: [],
    },
    severityIndicators: ["moderate", "severe", "very-severe"],
    durationFactors: { acute: true, chronic: false },
    description: "Infection that inflames air sacs in one or both lungs",
    urgency: "high",
  },
  {
    name: "Fibromyalgia",
    category: "Musculoskeletal",
    commonSymptoms: ["muscle aches", "joint pain", "fatigue", "back pain"],
    rareSymptoms: ["headache", "dizziness", "nausea"],
    ageFactors: {
      moreCommonIn: ["adult", "middle-aged"],
      lessCommonIn: ["child", "elderly"],
    },
    genderFactors: {
      moreCommonIn: ["female"],
    },
    severityIndicators: ["moderate", "severe"],
    durationFactors: { acute: false, chronic: true },
    description: "Chronic condition characterized by widespread musculoskeletal pain",
    urgency: "medium",
  },
  {
    name: "Allergic Reaction",
    category: "Immunological",
    commonSymptoms: ["skin rash", "dizziness", "nausea"],
    rareSymptoms: ["shortness of breath", "chest pain", "swelling"],
    ageFactors: {
      moreCommonIn: ["child", "adult"],
      lessCommonIn: [],
    },
    genderFactors: {
      moreCommonIn: [],
    },
    severityIndicators: ["mild", "moderate", "severe", "very-severe"],
    durationFactors: { acute: true, chronic: false },
    description: "Immune system response to allergens causing various symptoms",
    urgency: "medium",
  },
]

// Symptom normalization mapping
const SYMPTOM_MAPPING: Record<string, string[]> = {
  headache: ["head pain", "migraine", "tension headache"],
  fever: ["high temperature", "pyrexia", "elevated temperature"],
  cough: ["persistent cough", "dry cough", "productive cough"],
  fatigue: ["tiredness", "exhaustion", "weakness", "lethargy"],
  nausea: ["feeling sick", "queasiness", "stomach upset"],
  dizziness: ["lightheadedness", "vertigo", "unsteadiness"],
  "chest pain": ["chest discomfort", "chest tightness", "cardiac pain"],
  "shortness of breath": ["breathing difficulty", "dyspnea", "breathlessness"],
  "abdominal pain": ["stomach pain", "belly pain", "gastric pain"],
  "joint pain": ["arthralgia", "joint aches", "joint stiffness"],
  "skin rash": ["rash", "skin irritation", "dermatitis", "hives"],
  "sore throat": ["throat pain", "pharyngitis", "throat irritation"],
  "back pain": ["lower back pain", "spine pain", "lumbar pain"],
  "muscle aches": ["myalgia", "muscle pain", "muscle soreness"],
}

class MedicalAI {
  private normalizeSymptom(symptom: string): string {
    const normalized = symptom.toLowerCase().trim()

    // Find matching normalized symptom
    for (const [key, variants] of Object.entries(SYMPTOM_MAPPING)) {
      if (
        key === normalized ||
        variants.some((variant) => normalized.includes(variant) || variant.includes(normalized))
      ) {
        return key
      }
    }

    return normalized
  }

  private getAgeCategory(age: number): string {
    if (age < 13) return "child"
    if (age < 25) return "young-adult"
    if (age < 45) return "adult"
    if (age < 65) return "middle-aged"
    return "elderly"
  }

  private calculateSymptomMatch(
    disease: Disease,
    symptoms: string[],
  ): {
    score: number
    matchingSymptoms: string[]
  } {
    const normalizedSymptoms = symptoms.map((s) => this.normalizeSymptom(s))
    const allDiseaseSymptoms = [...disease.commonSymptoms, ...disease.rareSymptoms]

    let score = 0
    const matchingSymptoms: string[] = []

    normalizedSymptoms.forEach((symptom) => {
      if (disease.commonSymptoms.includes(symptom)) {
        score += 3 // High weight for common symptoms
        matchingSymptoms.push(symptom)
      } else if (disease.rareSymptoms.includes(symptom)) {
        score += 1.5 // Medium weight for rare symptoms
        matchingSymptoms.push(symptom)
      }
    })

    // Normalize score by total possible score
    const maxScore = disease.commonSymptoms.length * 3 + disease.rareSymptoms.length * 1.5
    return {
      score: maxScore > 0 ? (score / maxScore) * 100 : 0,
      matchingSymptoms,
    }
  }

  private calculateDemographicFactors(disease: Disease, age: number, gender: string): number {
    let factor = 1.0
    const ageCategory = this.getAgeCategory(age)

    // Age factors
    if (disease.ageFactors.moreCommonIn.includes(ageCategory)) {
      factor *= 1.3
    } else if (disease.ageFactors.lessCommonIn.includes(ageCategory)) {
      factor *= 0.7
    }

    // Gender factors
    if (disease.genderFactors.moreCommonIn.includes(gender.toLowerCase())) {
      factor *= 1.2
    }

    return factor
  }

  private calculateSeverityMatch(disease: Disease, severity: string): number {
    if (disease.severityIndicators.includes(severity)) {
      return 1.2
    }
    return 1.0
  }

  private calculateDurationMatch(disease: Disease, duration: string): number {
    const isAcute = ["less-than-day", "1-3-days", "4-7-days"].includes(duration)
    const isChronic = ["1-2-weeks", "more-than-2-weeks"].includes(duration)

    if ((isAcute && disease.durationFactors.acute) || (isChronic && disease.durationFactors.chronic)) {
      return 1.1
    }
    return 0.9
  }

  public analyzeSymptoms(patient: PatientProfile): AnalysisResult[] {
    const allSymptoms = [patient.primarySymptom, ...patient.additionalSymptoms]
    const age = Number.parseInt(patient.age)

    const results: AnalysisResult[] = []

    DISEASE_DATABASE.forEach((disease) => {
      const symptomMatch = this.calculateSymptomMatch(disease, allSymptoms)

      if (symptomMatch.score > 10) {
        // Only consider diseases with some symptom match
        const demographicFactor = this.calculateDemographicFactors(disease, age, patient.gender)
        const severityFactor = this.calculateSeverityMatch(disease, patient.severity)
        const durationFactor = this.calculateDurationMatch(disease, patient.duration)

        let confidence = symptomMatch.score * demographicFactor * severityFactor * durationFactor

        // Cap confidence at 95% to maintain medical uncertainty
        confidence = Math.min(confidence, 95)

        // Add risk factors
        const riskFactors: string[] = []
        if (demographicFactor > 1.0) {
          riskFactors.push(`More common in ${patient.gender.toLowerCase()}s`)
        }
        if (age > 50 && disease.ageFactors.moreCommonIn.includes("elderly")) {
          riskFactors.push("Age-related risk factor")
        }

        results.push({
          disease,
          confidence: Math.round(confidence),
          matchingSymptoms: symptomMatch.matchingSymptoms,
          riskFactors,
        })
      }
    })

    // Sort by confidence and return top 5
    return results.sort((a, b) => b.confidence - a.confidence).slice(0, 5)
  }

  public generateRecommendations(results: AnalysisResult[], patient: PatientProfile): Recommendation[] {
    const recommendations: Recommendation[] = []
    const topResult = results[0]

    if (!topResult) {
      return [
        {
          type: "see-doctor",
          title: "Consult Healthcare Provider",
          description:
            "Your symptoms don't match common patterns. Please consult a healthcare provider for proper evaluation.",
          urgency: 3,
        },
      ]
    }

    // Emergency recommendations
    if (topResult.disease.urgency === "emergency" || topResult.confidence > 80) {
      if (topResult.disease.category === "Cardiovascular" || topResult.disease.name === "Pneumonia") {
        recommendations.push({
          type: "emergency",
          title: "Seek Immediate Medical Attention",
          description: "Your symptoms may indicate a serious condition requiring immediate medical care.",
          urgency: 5,
        })
      }
    }

    // High urgency recommendations
    if (topResult.disease.urgency === "high" || patient.severity === "very-severe") {
      recommendations.push({
        type: "see-doctor",
        title: "See Doctor Within 24 Hours",
        description: "Your symptoms warrant prompt medical evaluation and treatment.",
        urgency: 4,
      })
    }

    // Self-care recommendations
    if (topResult.disease.urgency === "low" && patient.severity !== "severe") {
      const selfCareMap: Record<string, string> = {
        "Tension Headache": "Rest, hydration, stress management, and over-the-counter pain relievers",
        "Common Cold": "Rest, fluids, throat lozenges, and symptom management",
        "Allergic Reaction": "Avoid triggers, antihistamines, and monitor for worsening symptoms",
      }

      recommendations.push({
        type: "self-care",
        title: "Self-Care Measures",
        description: selfCareMap[topResult.disease.name] || "Rest, hydration, and symptom monitoring",
        urgency: 1,
      })
    }

    // Monitoring recommendations
    recommendations.push({
      type: "monitor",
      title: "Monitor Symptoms",
      description:
        "Keep track of symptom changes, triggers, and severity. Seek medical care if symptoms worsen or persist.",
      urgency: 2,
    })

    // Specific condition recommendations
    if (topResult.disease.category === "Mental Health") {
      recommendations.push({
        type: "see-doctor",
        title: "Consider Mental Health Support",
        description: "Speak with a healthcare provider about mental health resources and treatment options.",
        urgency: 3,
      })
    }

    return recommendations.sort((a, b) => b.urgency - a.urgency)
  }
}

export const medicalAI = new MedicalAI()
export type { PatientProfile, AnalysisResult, Recommendation }
