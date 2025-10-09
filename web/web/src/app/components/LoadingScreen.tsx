"use client"

import React from "react"

interface LoadingScreenProps {
  isLoading: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
    </div>
  )
}

export default LoadingScreen
