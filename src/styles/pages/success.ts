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

export const SuccessImage = styled("div", {
  width: "100%",
  maxWidth: 130,
  height: 145,
  background: "linear-gradient(180deg, #1EA483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  }
})