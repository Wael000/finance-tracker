import React from 'react'
import { useFinancialRecord } from '../../contexts/financial-record-context'
import { useTable, Column, CellProps, Row } from 'react-table'

const FinancialRecordList = () => {
  const { records } = useFinancialRecord()
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: records,
  }) 

  return (
    <div className='table-container'>
      <table {...getTableProps()} className='table'>
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default FinancialRecordList
