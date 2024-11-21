import React, { useEffect } from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'

const ElectronicTable = () => {
  const {customer}  = useAppSelector(store => store)
  console.log("customer ", customer)

  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.electricCategories || []}/>
    </div>
  )
}

export default ElectronicTable