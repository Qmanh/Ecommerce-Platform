import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store'
import { HomeCategory } from '../../../types/HomeCategoryTypes'

const ShopByCategoryTable = () => {
  const {customer, homeCategory}  = useAppSelector(store => store)
  return (
    <div>
      <HomeCategoryTable data = {customer.homePageData?.shopByCategories||[]}/>
    </div>
  )
}

export default ShopByCategoryTable