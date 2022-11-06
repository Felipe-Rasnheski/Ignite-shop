import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Handbag, House, Minus, Plus, X } from "phosphor-react";
import { useState } from "react";
import { CartActions, useShoppingCart } from "use-shopping-cart";
import { CartEntry as ICartEntry, formatCurrencyString } from "use-shopping-cart/core";
import { CartProductsContainer, EntryContainer } from "./styles";

interface CartyEntryProps {
  entry: ICartEntry;
  removeItem: CartActions["removeItem"];
  incrementItem: CartActions["incrementItem"];
  decrementItem: CartActions["decrementItem"];
} 

function CartEntry({ entry, removeItem, incrementItem, decrementItem}: CartyEntryProps) {
  return (
    <EntryContainer>
      <div className="imgContainer">
        <Image priority src={entry.image} width={94} height={94} alt="" />
      </div>
      <div className="entryInfos">
        <span>{entry.name}</span>
        <strong>
          {formatCurrencyString({value: entry.price, currency: "BRL", language: "PT"})}
        </strong>
        <button onClick={() => removeItem(entry.id)}>Remover</button>
      </div>
      <div className="quantity">
        <Minus size={24} onClick={() => decrementItem(entry.id)} />
        <span>{entry.quantity}</span>
        <Plus size={24}  onClick={() => incrementItem(entry.id)} />
      </div>
    </EntryContainer>
  )
}

export function Cart() {
  const [cartShowing, setCartShowing] = useState(false)

  const { route } = useRouter()

  const cart = useShoppingCart()
  const { 
    removeItem,incrementItem, decrementItem,
    cartDetails, formattedTotalPrice, clearCart
  } = cart

  const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    <CartEntry 
      key={entry.id} 
      entry={entry} 
      removeItem={removeItem} 
      incrementItem={incrementItem} 
      decrementItem={decrementItem}
    />
  ))

  async function handleCheckout() {
    const cartEntriesPriceId = Object.values(cartDetails ?? {}).map((entry) => {
      return {
        price: entry.price_id, 
        quantity: entry.quantity
      } 
    })

    try {
      const response = await axios.post('/api/checkout', {
        entriesPriceId: cartEntriesPriceId,
      })

      const { checkoutUrl } = response.data;
      clearCart();
      
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error)
    }
  }

  const cartIsEmpty = cartEntries.length <= 0

  function CartProducts() {
    return (
      <CartProductsContainer>
        <header>
          <X size={32} onClick={() => setCartShowing(false)} />
          <h1>Sacola de Compras</h1>
        </header>
        <div>
          {cartIsEmpty ? (
            <div className="emptybag">
              <p>Sacola de compras está vazia</p>
              <span><Handbag color="#00875F" size={32} /></span>
            </div>
          ) : (cartEntries)}
        </div>
        <footer>
          <div>
            <div>
              <span>Quantidade</span>
              <span>{cartEntries.length} itens</span>
            </div>
            <div>
              <strong>Valor Total</strong>
              <strong>{formattedTotalPrice.replace(".", ",").replace("R$", "R$ ")}</strong>
            </div>
          </div>
          
          <button disabled={cartIsEmpty} onClick={() => handleCheckout()}>Finalizar compra</button>
        </footer>
      </CartProductsContainer>  
    )
  }

  const cartNumberItems = cartEntries.length
   
  return  route !== "/success" ? (
    <div>
      <div className="inconContainer">
        {route === "/product/[id]" && (
            <Link href="/" title="Home">
              <button className="inconHome" >
                <House size={24} />
              </button>
            </Link>
          )
        }
        <button 
          className="inconBag" 
          onClick={() => setCartShowing(true)} 
          disabled={cartShowing}
        >
          <Handbag size={24}  />
        </button>
      </div>
      {cartShowing && <CartProducts />}
      {!cartIsEmpty ? (
        <span 
          className={route === "/" ? "numberItems numberItemsHome" : "numberItems"}
        >
          {cartNumberItems}
        </span>
      ) : <span className="numberItems numberItemsIsEmpty">{cartNumberItems}</span>}
    </div>

  ) : (
    <div className="inconContainer">
      <Link href="/">
        <button className="inconBag">
          <House size={24}  />
        </button>
      </Link>
    </div>
  )
}

