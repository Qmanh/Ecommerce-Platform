import React, { useEffect } from 'react'
import './Cards.css';
import Card from './Card/Card';
import { ContentPasteOutlined, LocalAtmOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../../State/Store';
import { fetchTotalMoneyAndProductsBySeller } from '../../../../State/customer/OrderSlice';
import { getTotalEarning } from '../../../../State/seller/sellerSlice';

const Cards = () => {
    const dispatch = useAppDispatch();
    const {order,seller} = useAppSelector(store=>store);
    const jwt = localStorage.getItem("jwt")||"";
    const totalMoney = order.moneyAndProduct.totalMoneyByOrder;
    const totalProducts = order.moneyAndProduct.totalProductBySeller;

    useEffect(()=>{
      dispatch(getTotalEarning())
    },[])
console.log("total: ", totalMoney)
    
    const cardsData = [
        {
          title: "Sales",
          color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          barValue: Math.round((seller.totalEarning.totalEarning / totalMoney) * 100),
          value: seller.totalEarning.totalEarning,
          png: LocalAtmOutlined,
          series: [
            {
              name: "Sales",
              data: [31, 40, 28, 51, 42, 109, 100],
            },
          ],
        },
        {
          title: "Products",
          color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          },
          barValue: 50,
          value: totalProducts,
          png: LocalAtmOutlined,
          series: [
            {
              name: "Revenue",
              data: [10, 100, 50, 70, 80, 30, 40],
            },
          ],
        },
        {
          title: "Orders",
          color: {
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          },
          barValue: Math.round((seller.totalEarning.totalOrders - seller.totalEarning.totalCancelOrders)/seller.totalEarning.totalOrders*100) ,
          value: seller.totalEarning.totalOrders,
          png: ContentPasteOutlined,
          series: [
            {
              name: "Expenses",
              data: [10, 25, 15, 30, 12, 15, 20],
            },
          ],
        },
      ];

      useEffect(()=>{
        dispatch(fetchTotalMoneyAndProductsBySeller(jwt))
    },[])
  return (
    <div className='Cards'>
        {
            cardsData.map((card,id)=>{
                return (
                    <div className='parentContainer'>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value = {card.value}
                            total = {totalMoney}
                            png = {card.png}
                            series = {card.series}
                        />
                    </div>
                )
            })
        }
    </div>
  )
}

export default Cards