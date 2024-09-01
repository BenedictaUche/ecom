import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Footer from '@/components/Footer'
import AddProduct from './add-product'
import EditProduct from './edit-product'

const Collection = () => {
  return (
    <>
        <Navbar />
        <div className='mx-auto flex justify-center'>
            <AddProduct />
            {/* <EditProduct /> */}
        </div>
        <Footer />
    </>
  )
}

export default Collection
