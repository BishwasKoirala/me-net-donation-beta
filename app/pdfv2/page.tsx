'use client'
import React from 'react'
import DownloadBillingTable from './DownloadBillingTable'
import { BillingTable } from './BillingTable'
import { Button } from '../components/ui/button'
import { PDFViewer } from '@react-pdf/renderer'

const page = () => {
  return (
    // <div className='flex w-full content-center'>
      
    //   {/* BillingTable needs to get rendered first to render DownLoad it */}
    //   {/* <Button> <DownloadBillingTable  /></Button> */}
      
    // </div>
    <div
      style={{
        height: "100vh",
      }}
    >
      <PDFViewer width="100%" height="100%">
        <BillingTable />
      </PDFViewer>
    </div>
  )
}

export default page