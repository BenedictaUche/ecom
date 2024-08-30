import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Footer from '@/components/Footer'

const AddCollection = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Add Collection</h1>
      </div>
      <Footer />
    </>
  )
}

export default AddCollection
