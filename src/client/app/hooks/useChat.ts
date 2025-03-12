import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Message = {
  author: string
  content: string
}

export const useChat = () => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const savedMessages = sessionStorage.getItem('messages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

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
      const response = await axios.post(`${API_URL}/prompt/${text}`)
      const data: {
        candidates: {
          content: {
            parts: { text: string }[]
          }
        }[]
      } = response.data

      const botMessage = data.candidates[0].content.parts
        .map((part) => part.text)
        .join(' ')

      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { author: 'Bot', content: botMessage },
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

  return {
    text,
    setText,
    messages,
    isLoading,
    errorMessage,
    handleSubmit,
    dismissError,
  }
}
