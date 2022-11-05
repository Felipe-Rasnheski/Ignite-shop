import { styled } from "../../styles";

export const CartContainer = styled("div", {
  height: "3rem",
  width: "3rem",
  background: "$gray800",
  color: "$gray500",
  borderRadius: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "$gray100",
    cursor: "pointer",
  }
}) 