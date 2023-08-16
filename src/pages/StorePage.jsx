import React, { useEffect, useState } from "react";
import StoreItem from "../components/Card/StoreItem";
import { callNon } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { Box, Pagination } from "@mui/material";
import styled from "@emotion/styled";

const CustomPagination = styled(Pagination)({
  "& .Mui-selected": {
    backgroundColor: "#ea736d",
    color: "#ffffff",
  },
  "& .MuiPaginationItem-root": {
    color: "#ffffff",
  },
});

const StorePage = () => {
  const [storeData, setStoreData] = useState();
  console.log("🚀 ~ file: StorePage.jsx:9 ~ StorePage ~ storeData:", storeData);
  const [storeIDSelected, setStoreIDSelected] = useState();
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();
  let flagDirection = false;

  //func
  const handleChangePage = (event, value) => {
    console.log(value);
    callNon(`api/stores?page=${value}&page_size=10`).then((res) => {
      setStoreData(res.data);
    });
  };

  useEffect(() => {
    async function fetchData(id) {
      const rs = await callNon(`api/food?store_id=${id}`);
      navigate("/menu", { state: { selectStore: rs, storeID: id } });
      console.log("🚀 ~ file: StorePage.jsx:39 ~ fetchData ~ rs:", rs);
    }

    if (storeIDSelected) {
      fetchData(storeIDSelected);
    }
  }, [storeIDSelected]);

  useEffect(() => {
    async function fetchData() {
      const rs = await callNon(`api/stores`);
      setStoreData(rs.data);
      setTotal(rs.paging.last_page);
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      {storeData ? (
        storeData.map((item) => {
          flagDirection = !flagDirection;
          return (
            <div key={item.id} className="flex flex-col gap-7 pr-6 pb-7">
              <StoreItem
                direction={flagDirection ? "left" : "right"}
                data={item}
                setStoreIDSelectied={setStoreIDSelected}
              />
            </div>
          );
        })
      ) : (
        <Loader />
      )}

      {storeData && (
        <div className="pb-5 flex justify-end px-4">
          <CustomPagination
            count={total}
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default StorePage;
