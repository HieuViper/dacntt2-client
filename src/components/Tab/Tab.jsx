/* eslint-disable react/prop-types */
import { Tabs, Tab, ThemeProvider, Box } from "@mui/material";

import React from "react";
import theme from "../../utils/theme";

const TabComponent = ({ data, dispatch }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: { xs: 320, sm: 800 } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#D97D54",
            },
          }}
        >
          {data.map((item) => (
            <Tab
              key={item.id}
              value={item.id}
              style={{ fontFamily: "Poppins" }}
              label={item.name}
              onClick={() => {
                dispatch({ type: "filterFoodGroup", item: item });
              }}
            />
          ))}
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default TabComponent;
