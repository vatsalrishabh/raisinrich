import React from 'react'
import { useRouter } from 'next/router'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const StartFoodSubscription = () => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
    >
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 8px 32px 0 rgba(255,140,0,0.25)",
          background:
            "linear-gradient(90deg, #FFD600 0%, #FF9800 50%, #FF3D00 100%)",
        }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-lg transition-all duration-200 focus:outline-none"
        onClick={() => router.push("/subscription")}
      >
        Start Food Subscription
        <motion.span
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <FaArrowRight className="text-white text-lg" />
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

export default StartFoodSubscription
