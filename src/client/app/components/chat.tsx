'use client'

import React, { useEffect, useRef, useState } from 'react'
import Loading from './loading'
import ReactMarkdown from 'react-markdown'
import DangerError from './danger-error'
import axios, { AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Message = {
  author: string
  content: string
}

export default function Chat() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedMessages = sessionStorage.getItem('messages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, { author: 'User', content: text }]
      sessionStorage.setItem('messages', JSON.stringify(newMessages))
      return newMessages
    })
    setText('')
    setTimeout(getResponse, 0)
  }

  const getResponse = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/prompt/${text}`)
      const data = response.data
      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { author: 'Bot', content: data.candidates[0].content },
        ]
        sessionStorage.setItem('messages', JSON.stringify(newMessages))
        return newMessages
      })
    } catch (error) {
      const axiosError = error as AxiosError
      let errorMessage = 'An unexpected error occurred'
      if (axiosError.response) {
        errorMessage = axiosError.message
      }
      setErrorMessage(errorMessage)
    }
    setIsLoading(false)
  }

  const dismissError = () => {
    setErrorMessage(null)
  }

  return (
    <div className='p-6'>
      {errorMessage && (
        <DangerError message={errorMessage} dismissError={dismissError} />
      )}
      <h2 className='mb-6 text-lg font-bold text-gray-900 lg:text-2xl dark:text-white'>
        Chatbot
      </h2>
      <div className='mb-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.author === 'Bot' ? 'text-blue-500' : 'text-green-500'}`}
          >
            <strong>{message.author}</strong>:{' '}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit}>
        <label htmlFor='chat' className='sr-only'>
          Your message
        </label>
        <div className='flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700'>
          <input
            id='chat'
            className='mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type='submit'
            className='inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
          >
            <svg
              className='h-5 w-5 rotate-90 rtl:-rotate-90'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 20'
            >
              <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
      </form>
    </div>
  )
}
