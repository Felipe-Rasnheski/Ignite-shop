import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { CartActions, useShoppingCart } from 'use-shopping-cart'
import { Product as IProduct } from 'use-shopping-cart/core'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { addItem, clearCart } = useShoppingCart()
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>loading...</p>
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        entriesPriceId: [
          {
            price: product.defaultPriceId,
            quantity: 1,
          }
        ],
      })

      const { checkoutUrl } = response.data;
      clearCart()

      window.location.href = checkoutUrl;
      
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (datalog / sentry)

      setIsCreatingCheckoutSession(false);

      alert('falha ao redirecionar ao checkout!')
    }
  }

  function handleAddItem(product: IProduct, addItem: CartActions["addItem"]) {
    addItem(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat("pt-Br", {
              style: "currency",
              currency: "BRL",
              }).format(product.price / 100)
            }
          </span>
          <p>{product.description}</p>
          <div>
            <button 
              disabled={isCreatingCheckoutSession} 
              onClick={handleBuyProduct}
            >
              Comprar agora
            </button>
            <button
              disabled={isCreatingCheckoutSession} 
              onClick={() => handleAddItem({...product, currency: "BRL"}, addItem)}
            >
              Colocar na sacola
            </button>
          </div>
          
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {  id: 'prod_Mi8GeKnNmYI1zI'}
      }
    ],
    fallback: true,
  }
} 

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 2,
  }
}