import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight, Handbag } from "phosphor-react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { CartActions, Product as IProduct } from "use-shopping-cart/core";
import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

interface HomeProps {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    price_id: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef ,instanceRef] = useKeenSlider({
    slides: {
      perView: 2.7,
      spacing: 42,
    }
  })

  const cart = useShoppingCart()
  const { addItem } = cart

  function ProductList(product: IProduct, addItem: CartActions["addItem"]) {
    addItem(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider" >
        <div className="buttonsCarosel">
          <button onClick={() => {
              instanceRef.current.prev()
            }}>
            <CaretLeft />
          </button>
          <button 
            className="nextRight" 
            onClick={() => {
              instanceRef.current.next()
            }}
          >
            <CaretRight />
          </button>
        </div>

        {products.map((product) => {
          return (
            <Product key={product.id}  className="keen-slider__slide" >
              <Link href={`/product/${product.id}`}  prefetch={false}>
                <Image priority src={product.image} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div className="infoProduct">
                  <strong>{product.name}</strong>
                  <span>
                    {new Intl.NumberFormat("pt-Br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price / 100)}
                  </span>
                </div>
                
                <button onClick={() => ProductList({...product, currency:"BRL"}, addItem)}>
                  <Handbag size={32} />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}
// getServerSideProps

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: price.unit_amount,
      description: product.description,
      price_id: price.id,
    }
  }) 

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2
  }
}
