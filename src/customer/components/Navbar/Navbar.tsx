
import { AddShoppingCart, FavoriteBorder, Menu, Search, Storefront } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import CategorySheet from "../CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sellerLogin } from "../../../State/seller/sellerAuthSlice";

const Navbar = () => {

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [selectedCategory, setSelectedCategory] = useState("men");
    const [showCategory, setShowCategory] = useState(false);
    const navigate = useNavigate();
    const {auth, seller} = useAppSelector(store=>store)

    return (
        <>
            <Box className="sticky top-0 left-0 right-0 bg-white" sx={{zIndex:2}}>
                <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
                    <div className="flex items-center gap-9">
                        <div className="flex items-center gap-2">
                           {!isLarge &&
                                <IconButton>
                                    <Menu/>
                                </IconButton>
                            }
                            <h1 onClick={() =>navigate("/")} className="logo cursor-pointer text-lg md:text-2xl text-primary-color">
                                Shopping LazaPee
                            </h1>
                        </div>
                        <ul className="flex items-center font-medium text-gray-800">
                            {mainCategory.map((item)=> 
                            
                            <li 
                                onMouseLeave={()=> {
                                    setShowCategory(false)
                                }}
                                onMouseEnter={()=> {
                                    setShowCategory(true);
                                    setSelectedCategory(item.categoryId);
                                }}
                                className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color
                                flex items-center">{item.name}</li>
                            )}
                            
                        </ul>
                    </div>

                    <div className="flex gap-1 lg:gap-6 items-center">
                        <IconButton>
                            <Search/>
                        </IconButton>
                        {
                           localStorage.getItem("jwt")&& auth.user?.role==="ROLE_CUSTOMER" ?
                            <Button onClick={()=> navigate("/account/orders")} className="flex items-center gap-2">
                                <Avatar
                                sx={{width:29, height:29}}
                                src='https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png'
                                />
                                <h1 className="font-semibold hidden lg:block">
                                    {auth.user?.fullName}
                                </h1>
                               
                            </Button> 
                            :
                            localStorage.getItem("jwt") && seller.profile ?
                            <Button onClick={()=> navigate("/seller")} className="flex items-center gap-2">
                                <Avatar
                                sx={{width:29, height:29}}
                                src='https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png'
                                />
                                <h1 className="font-semibold hidden lg:block">
                                    {seller.profile?.sellerName}
                                </h1>
                               
                            </Button> 
                            :
                            localStorage.getItem("jwt") && auth.user?.role==="ROLE_ADMIN" ?
                            <Button onClick={()=> navigate("/admin")} className="flex items-center gap-2">
                                <Avatar
                                sx={{width:29, height:29}}
                                src='https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png'
                                />
                                <h1 className="font-semibold hidden lg:block">
                                    {auth.user?.fullName}
                                </h1>
                               
                            </Button> 
                            :
                            <Button onClick={()=> navigate("/login")} variant="contained">
                                Login
                            </Button>
                        }

                        <IconButton onClick={()=> navigate("/wishlist")}>
                            <FavoriteBorder sx={{fontSize:29}}/>
                        </IconButton>

                        <IconButton onClick={()=>navigate("/cart")}>
                            <AddShoppingCart className="text-gray-700" sx={{fontSize:29}}/>
                        </IconButton>

                        { isLarge  && <Button onClick={()=> navigate("/become-seller")} startIcon={<Storefront/>} variant="outlined">
                            Become Seller
                        </Button>}
                    </div>
                </div>

                {showCategory &&
                    <div
                        onMouseLeave={()=> setShowCategory(false)}
                        onMouseEnter={()=> setShowCategory(true)} 
                        className="categorySheet absolute top-[4.41rem] left-20 right-20 border">
                            <CategorySheet selectedCategory={selectedCategory}/>
                    </div>
                }
            </Box>
        </>
    )
}

export default Navbar