import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
})

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",

  ".numberItems": {
    display: "inline-block",
    position: "relative",
    top: "-50px",
    right: "-25px",
    background: "$green300",
    color: "$gray100",
    padding: "0.15rem 0.45rem",
    borderRadius: "100%",
    fontWeight: "bold",
    fontSize: "0.85rem",
  },

  ".inconBag": {
    border: "none",
    color: "$gray300",
    padding: "0.5rem",
    backgroundColor: "$gray800",
    cursor: "pointer",
    borderRadius: 8,

    "&:hover": {
      color: "$gray100",
      cursor: "pointer",
      transition: "color 0.2s linear"
    }
  }
})
