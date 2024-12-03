import { Autocomplete, Box, Button, Card, CircularProgress, Grid, Rating, TextField, Typography } from '@mui/material'
// import { Card, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const ProdectsCard = () => {
  const [updatedProductsArr, setUpdatedProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);
  // console.log(products, 'products');
// const filterProducts=(categoryProdut)=>{
//   const filterBycategory= products?.filtter((item)=> item.category.name === categoryProdut.value) : products;
//   setUpdatedProductsArr(filterBycategory)
// }
const filterProducts = (categoryProduct) => {
  const filterByCategory = categoryProduct
    ? products.filter((item) => item.category?.name === categoryProduct.value)
    : products;
  setUpdatedProductsArr(filterByCategory);
};

  useEffect(() => {
    const productsData = axios.get('https://api.escuelajs.co/api/v1/products').then((data) => {
      const filterData = data?.data?.filter((products)=> products?.title !=='New Product' );
      // console.log(filterData, 'filterData');
      const categoryArr = filterData?.map((item)=>{
        return{
          label: item?.category?.name,
          value: item?.category?.name,
        };
      })
      const uniqueData = categoryArr.filter((item, index, self)=>index === self.findIndex((t)=>t.value === item.value));
      // console.log(categoryArr, 'categoryArr');
      setCategoryArr(uniqueData);
      setProducts(filterData);
      setUpdatedProductsArr(filterData);
      setIsLoadingData(false);
      
    } );
    

  }, [])
  return (
   <>
   <Autocomplete className='mb-5'
  disablePortal
  options={categoryArr}
  onChange={(e, newValue)=>{
filterProducts(newValue)
  }}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Category" />}
/>
    <Grid container spacing={3} >
      {
        isLoadingData ? <Box className='mt-2'><CircularProgress size={40} /></Box> :
        updatedProductsArr?.map((product) => (

        <Grid Item sm={3} className='p-3'>
          <Card key={product.id} >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
             {
              product.images.map ((img)=>{
                return(

                  <SwiperSlide>  <img className='img-fluid' src={img} alt='' /></SwiperSlide>
                )
              })
             }
            </Swiper>
           <Box className='p-3'>
           <Typography variant='body1'>{product?.category?.name}</Typography>
            <Typography variant="h5" className="mt-2">{product.title}</Typography>
            <Rating name="read-only" value={product.rating} readOnly />
            <Box className='d-flex justify-content-between align-items-center'>
            <Typography variant="h6">${product.price}</Typography>
            <Button className="my-3" variant="contained"><AddIcon /> Add
            </Button>
            </Box>
           </Box>
              
          </Card>
        </Grid>

      ))}
    </Grid>
   </>
  )
}

export default ProdectsCard;