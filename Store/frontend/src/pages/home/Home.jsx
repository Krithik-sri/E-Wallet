import React from 'react'
import Slider from '../../components/slider/Slider'
import "./Home.scss";
import HomeInfoBox from './HomeInfoBox';
import { productData } from '../../components/carousel/data';
import CarouselItem from '../../components/carousel/CarouselItem';
import ProductCarousel from '../../components/carousel/Carousel';
import ProductCategory from './ProductCategory';


const PageHeading = ( {heading, btnText}) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className='--fw-thin'>{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>

  )
}

const Home = () => {
  const product_s = productData.map((item) => (
      <div key={item.id}>
        <CarouselItem name={item.name} url={item.imageurl} description={item.description} price={item.price} />
      </div>
  ))
  return (
    <>
      <Slider />
      <section>
        <div className='container'>
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now"} />
          <ProductCarousel products={product_s} />
        </div>
      </section>
      <section className='--bg-grey'>
        <div className='container'>
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>
    </>
  )
}

export default Home