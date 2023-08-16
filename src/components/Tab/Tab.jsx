/* eslint-disable react/prop-types */
import { Tabs, Tab, ThemeProvider, Box } from "@mui/material";

import React from "react";
import theme from "../../utils/theme";
import { callNon } from "../../utils/api";

const TabComponent = ({ data, dispatch, setSelectedFoodGroup }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
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
                console.log("okok");
                setSelectedFoodGroup(item);
                callNon(
                  `api/stores/${item.store_id}/food_groups/${item.id}/food`
                ).then((res) => {
                  dispatch({ type: "setList", payload: { list: res.data } });
                  dispatch({
                    type: "getTotal",
                    payload: { total: res.paging.last_page },
                  });
                });
              }}
            />
          ))}
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default TabComponent;
