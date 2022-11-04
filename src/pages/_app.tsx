import { AppProps } from "next/app"
import Image from 'next/image'
import logoShop from '../assets/logo.svg'
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
  <Container>
    <Header>
      <Image src={logoShop} alt="" width={130} height={52} />
    </Header>
    <Component {...pageProps} />
  </Container>
  )
}
