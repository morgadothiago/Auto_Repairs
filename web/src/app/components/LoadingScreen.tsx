"use client"

import Lottie from "lottie-react"
import React from "react"

import Loading from "../../../public/Speedometer.json"

interface LoadingScreenProps {
  isLoading: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Lottie
        animationData={require("../../../public/Speedometer.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  )
}

export default LoadingScreen
