import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";
import "@fontsource/raleway";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#8799EF",
      seconday: "#fff",
      error: "#FF3333",
    },
  },
  fonts: {
    text: "Poppins",
    body: "Poppins",
    heading: "Raleway",
  },
});
