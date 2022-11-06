import { styled } from "../../styles";

export const CartProductsContainer = styled("div", {
  padding: "3rem",
  background: "$gray800",
  width: "30rem",
  overflowY: "auto",

  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,

  display: "flex",
  flexDirection: "column",

  header: {
    margin: "1.5rem 0 2rem 0",
    
    svg:{
      padding: "0.25rem",
      color: "$gray300",
      float: "right",
      marginTop: "-1.5rem",

      "&:hover": {
        color: "$gray100",
        cursor: "pointer",
        background: "$gray900",
        borderRadius: 8,
        transition: "background-color 0.2s"
      }
    },

    h1: {
      fontSize: "$md",
      color: "$gray100" 
    }
  },

  "&>div": {
    flex: 1,

    ".emptybag": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
    },
    
    "div + div": {
      overflowY: "auto",
      marginTop: "1.25rem"
    }
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",

    div: {
      lineHeight: 1.6,

      strong: {
        marginTop: "0.25rem",
      },

      div: {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    

    button: {
      padding: "1.25rem",
      border: "none",
      borderRadius: 8,
      background: "$green300",
      color: "$gray100",
      fontWeight: "bold",
      fontSize: "$md",

      "&:hover": {
        cursor: "pointer",
      },

      "&:disabled": {
        background: "$green500",
        cursor: "default",
      }
    },
  },

  "&:hover": {
    cursor: "default",
  }
})

export const EntryContainer = styled("div", {
  display: "flex",
  gap: "1.25rem",

  ".imgContainer": {
    background: "linear-gradient(180deg, #1EA483 0%, #7465d4 100%)",
    borderRadius: 8,
    objectFit: "cover",
    width: "min-content",
    height: "min-content",

    img: {
      objectFit: "cover",
    },
  },

  ".entryInfos": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    margin: 0,
    lineHeight: 1.6,
    fontSize: "$md",
    
    span: {
      color: "$gray300",
    },

    strong: {
      color: "$gray100",
    },

    button: {
      display: "flex",
      padding: "0.5rem 0 0.5rem 0",
      alignItems: "flex-start",
      color: "$green300",
      background: "transparent",
      border: "none",
      userSelect: "none",

      "&:hover": {
        color: "$green500",
        cursor: "pointer",
      },
    }
  },

  ".quantity": {
    margin: 0,
    color: "$gray300",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    span: {
      borderRadius: 4,
      userSelect: "none"
    },

    svg: {
      color: "$green300",
      padding: "0.25rem",
      
      "&:hover": {
        color: "$green500",
        cursor: "pointer",
      }
    }
  }
})