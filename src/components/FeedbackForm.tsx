'use client'

import React, { useState } from 'react'

interface FeedbackFormProps {
  userEmail: string
}

const FeedbackForm = ({ userEmail }: FeedbackFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail,
    phone: '',
    feedback: '',
    interested: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement form submission logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Demo Feedback</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block mb-2">Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Feedback</label>
          <textarea
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.interested}
            onChange={(e) => setFormData({ ...formData, interested: e.target.checked })}
            className="mr-2"
          />
          <label>I'm interested in learning more about the full product</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  )
}

export default FeedbackForm 