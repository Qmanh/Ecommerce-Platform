import React, { useEffect } from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { HomeCategories } from '../../../data/HomeCategories'

const GridTable = () => {
  const {customer}  = useAppSelector(store => store)
  return (
    <div>
      <HomeCategoryTable data = {customer.homePageData?.grid || []}/>
    </div>
  )
}

export default GridTable