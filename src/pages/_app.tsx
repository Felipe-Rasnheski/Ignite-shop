import { AppProps } from "next/app"
import Image from 'next/image'
import { useRouter } from "next/router"
import { CartProvider } from "use-shopping-cart"
import logoShop from '../assets/logo.svg'
import { Cart } from "../components/cart"
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { route } = useRouter()

  return (
  <CartProvider
    mode="payment"
    cartMode="client-only"
    stripe={process.env.STRIPE_SECRET_KEY}
    successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
    cancelUrl={`${process.env.NEXT_URL}/`}
    currency="BRL"
    allowedCountries={["BR", "US"]}
    billingAddressCollection={true}
  >
    <Container>
    <Header>
      <Image src={logoShop} alt="" width={130} height={52} />
  
      {route !== "/success" && <Cart />}
    </Header>
    <Component {...pageProps} />
  </Container>
  </CartProvider>
  
  )
}
