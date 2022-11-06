import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",

  '.buttonsCarosel': {
    position: "absolute",

    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",

    button: {
      zIndex: 1,
      position: "relative",
      background: "transparent",
      border: "none",
      padding: "0 4rem 0 1rem ",
      
  
      svg: {
        height: "2.5rem",
        width: "2.5rem",
        color: "$gray300"
      },

      "&:hover": {
        cursor: "pointer",
        background: "linear-gradient(90deg, #121214 0%, rgba(0, 0, 0, 0) 100%)"
      }, 
    },
  
    '.nextRight': {
      padding: "0 1rem 0 4rem ",

      "&:hover": {
        cursor: "pointer",
        background: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%,  rgba(0, 0, 0, 0.9)100%)"
      }, 
    },
  },
})

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1EA483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "1.25rem",

    borderRadius: 6,
    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    ".infoProduct": {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",

      strong: {
        fontSize: "$lg",
        color: "$gray100"
      },

      span: {
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$green300",
      },
    },

    button: {
      width: "3.5rem",
      height: "3.5rem",
      background: "$green500",
      color: "$gray100",
      border: "none",
      borderRadius: 8,

      "&:hover": {
        background: "$green300",
        cursor: "pointer",
      }
    },

    "&:hover": {
      cursor: "default",
    }
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
})