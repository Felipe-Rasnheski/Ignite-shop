import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImagesContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>
        <meta name="robots" content="noindex" />  
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        
        <ImagesContainer>
          {products.map((product) => {
          return (
            <div key={product.name}>
              <span>
                <Image priority src={product.imageUrl} width={150} height={150} alt="" />
              </span>
            </div>
            )
            })
          }
        </ImagesContainer>
          
        {products.length === 1 ? (
            <p>
              Uhuul <strong>{customerName}</strong>, sua Camiseta{" "}
              <strong>{products[0].name}</strong> já está a caminho da sua casa.
            </p>
          )
          :
          (
            <p>
              Uhuul <strong>{customerName}</strong>,
              suas Camisetas já estão a caminho da sua casa.
            </p>
          )
        }
        
        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = response.customer_details.name;

  const products = response.line_items.data.map((product) => {
    const { name, images } = product.price.product as Stripe.Product

    return {
      name,
      imageUrl: images[0],
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}
