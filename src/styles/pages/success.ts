import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4, 
  },

  a: {
    display: "block",
    marginTop: "3rem",
    fontSize: "$lg",
    color: "$green300",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green500"
    },
  },
})

export const ImagesContainer = styled("div", {
  marginTop: "4rem",
  display: "flex",
  gap: "0.25rem",

  div: {
    display: "inline-block",
    background: "linear-gradient(180deg, #1EA483 0%, #7465d4 100%)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    border: "1px solid #00875F"
  },

  span: {
    Width: 150,
    height: 150,
    background: "linear-gradient(180deg, rgba(30, 164, 161, 1) 30%, rgba(116, 101, 212, 1) 100%)",
    borderRadius: "100%",
    padding: "1rem",
    border: "1px solid #00B37E"
  },

  img: {
    objectFit: "cover",
  }
})