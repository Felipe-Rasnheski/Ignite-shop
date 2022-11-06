import { AppProps } from "next/app"
import Image from 'next/image'
import { CartProvider } from "use-shopping-cart"
import logoShop from '../assets/logo.svg'
import { Cart } from "../components/cart"
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_SECRET_KEY}
      currency="BRL"
    >
      <Container>
        <Header>
          <Image src={logoShop} width={130} height={52} alt="" />
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
