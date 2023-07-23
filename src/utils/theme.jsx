import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "white",
          textTransform: "none",
          fontFamily: "Poppins",
          fontSize: "16px",
          "&:hover": {
            color: "#EA736D",
          },
          "&.Mui-selected": {
            color: "#EA736D",
            "&:hover": {
              color: "#EA736D",
            },
          },
        },
      },
    },
  },
});

export default theme;
