import React, { useEffect, useState } from "react";
import StoreItem from "../components/Card/StoreItem";
import { callNon } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const StorePage = () => {
  const [storeData, setStoreData] = useState();
  console.log("🚀 ~ file: StorePage.jsx:9 ~ StorePage ~ storeData:", storeData);
  const [storeIDSelected, setStoreIDSelected] = useState();
  const navigate = useNavigate();
  let flagDirection = false;

  //func
  useEffect(() => {
    async function fetchData(id) {
      const rs = await callNon(`api/food?store_id=${id}`);
      navigate("/menu", { state: { selectStore: rs.data } });
    }

    if (storeIDSelected) {
      fetchData(storeIDSelected);
    }
  }, [storeIDSelected]);

  useEffect(() => {
    async function fetchData() {
      const rs = await callNon(`api/stores`);
      setStoreData(rs.data);
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
    </div>
  );
};

export default StorePage;
