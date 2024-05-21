'use client'

import React, { useEffect, useRef } from 'react'
import Loading from './loading'
import ReactMarkdown from 'react-markdown'
import DangerError from './danger-error'
import { useChat } from '../hooks/useChat'

export default function Chat() {
  const {
    text,
    setText,
    messages,
    isLoading,
    errorMessage,
    handleSubmit,
    dismissError,
  } = useChat()

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <div className='p-6'>
      {errorMessage && (
        <DangerError message={errorMessage} dismissError={dismissError} />
      )}
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
        {isLoading && <Loading />}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='chat' className='sr-only'>
          Your message
        </label>
        <div className='flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700'>
          <input
            id='chat'
            disabled={isLoading}
            ref={inputRef}
            className='mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type='submit'
            disabled={isLoading}
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
