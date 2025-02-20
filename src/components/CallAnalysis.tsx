import React from 'react'

interface CallAnalysisProps {
  result: {
    summary: string
    qualification: string
    analysis: {
      key_points: string[]
      recommendations: string[]
    }
  }
  onComplete: () => void
}

const CallAnalysis = ({ result, onComplete }: CallAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Call Analysis</h3>
        
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            result.qualification === 'hot' ? 'bg-green-100 text-green-800' :
            result.qualification === 'warm' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {result.qualification.toUpperCase()} Lead
          </span>
        </div>

        <div className="prose">
          <h4>Summary</h4>
          <p>{result.summary}</p>

          <h4>Key Points</h4>
          <ul>
            {result.analysis.key_points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <h4>Recommendations</h4>
          <ul>
            {result.analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Provide Feedback
        </button>
      </div>
    </div>
  )
}

export default CallAnalysis 