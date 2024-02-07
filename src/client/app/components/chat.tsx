"use client"

import React, { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Message = {
  author: string;
  content: string;
}

export default function Chat() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const getResponse = async () => {
    const response = await fetch(`${API_URL}/prompt/${text}`)
    const data = await response.json()
    setMessages([...messages,
    {
      author: 'User',
      content: text
    },
    {
      author: 'Bot',
      content: data.candidates[0].content
    }
    ])
    setText('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getResponse()
  }

  return (
    <div className="p-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">Chatbot</h2>
      <div className="border border-gray-200 dark:border-gray-700 dark:bg-gray-900 p-4 rounded-lg mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.author === 'Bot' ? 'text-blue-500' : 'text-green-500'}`}>
            <strong>{message.author}</strong>: {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="chat" className="sr-only">Your message</label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <textarea
            id="chat"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..." value={text} onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  )
}