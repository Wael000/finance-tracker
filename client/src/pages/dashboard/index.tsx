import React from 'react'
import { useUser } from '@clerk/clerk-react'
import FinancialRecordForm from './financial-record-form'
import FinancialRecordList from './financial-record-list'

const Dashbboard = () => {
  const { user } = useUser()

  return (
    <div className='dashboard-container'>
      <h1>Welcome {user?.firstName}! Here are you finances:</h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  )
}

export default Dashbboard
