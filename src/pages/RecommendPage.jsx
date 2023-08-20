import { AsyncStorage } from "AsyncStorage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { call, callNon } from "../utils/api";
import {
  ratingToStars,
  recommendationPrompt,
  systemPrompt,
  tasteProfilePrompt,
} from "../utils/prompt";
import { createChatCompletion } from "../utils/chatgpt";
import CardItem from "../components/Card/CardItem";

const RecommendPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const [loadingRatings, setLoadingRatings] = useState(false);
  const [loadingTasteProfile, setLoadingTasteProfile] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const [ratings, setRatings] = useState();
  const [tasteProfile, setTasteProfile] = useState();
  const [recommendations, setRecommendations] = useState();

  const [allFoodArr, setAllFoodArr] = useState();

  const fetchData = async ({ customerID, foodData, allFoodArr }) => {
    setLoadingRatings(true);
    const ratings = await call(`api/get-ratings-for-customer/${customerID}`);

    console.log(
      "🚀 ~ file: RecommendPage.jsx:17 ~ fetchData ~ rating:",
      ratings
    );
    setRatings(ratings.data);
    setLoadingRatings(false);

    // taste profile
    setLoadingTasteProfile(true);
    const prompt = tasteProfilePrompt.replace(
      "{{ratings}}",
      ratings.data
        .map(
          (rating) => `${rating.food.name} - ${ratingToStars(rating.rating)}`
        )
        .join("\n")
    );
    const tasteProfile = await createChatCompletion([
      { role: "user", content: systemPrompt },
      { role: "user", content: prompt },
    ]);
    console.log(
      "🚀 ~ file: taste-profile.tsx:34 ~ tasteProfile:",
      tasteProfile
    );
    setTasteProfile(tasteProfile);
    setLoadingTasteProfile(false);

    // recommend
    setLoadingRecommendations(true);
    const recommend_prompt = recommendationPrompt.replace(
      "{{dataset}}",
      foodData
        .map(
          (item) => `
          {
            id: ${item.id},
            store_id: ${item.store_id},
            name: ${item.name}
          },
          `
        )
        .join("\n")
    );

    let messages = [
      { role: "user", content: systemPrompt },
      { role: "user", content: prompt },
      { role: "assistant", content: tasteProfile },
      { role: "user", content: recommend_prompt },
    ];

    console.log(recommend_prompt.length);

    const recommendationCompletion = await createChatCompletion(messages);
    const recommendations = JSON.parse(recommendationCompletion);
    console.log(
      "🚀 ~ file: RecommendPage.jsx:77 ~ fetchData ~ recommendations:",
      recommendations
    );
    setLoadingRecommendations(false);

    const cardRecommend = [];
    console.log(allFoodArr);
    recommendations.map((recom) => {
      allFoodArr.map((item) => {
        if (item.id == recom.id) {
          cardRecommend.push(item);
        }
      });
    });

    console.log(cardRecommend);
    setRecommendations(cardRecommend);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token-customer");
      if (!token) {
        navigate("/login");
      } else {
        const rsUser = await call(`api/user`);

        setUserData(rsUser);
        const rsFood = await callNon(`api/food?page=1&page_size=20`);
        // setAllFoodArr(rsFood.data);

        const foodData = [];
        rsFood.data.map((item) => {
          console.log(item);
          foodData.push({
            id: item.id,
            store_id: item.food_group.store_id,
            name: item.name,
          });
        });
        console.log(
          "🚀 ~ file: RecommendPage.jsx:95 ~ checkToken ~ foodData:",
          foodData
        );

        fetchData({
          customerID: rsUser.id,
          foodData: foodData,
          allFoodArr: rsFood.data,
        });
      }
    };
    checkToken();
  }, []);

  return (
    <div>
      <div className="flex gap-10">
        {ratings && (
          <div className="p-5 bg-white text-dark-800 rounded-2xl shadow-md w-fit basis-1/2">
            <div className="text-xl font-semibold mb-2">
              Here is your list ratings of our foods:
            </div>
            <hr className="my-3" />
            <div className="flex flex-col">
              {ratings.map((item) => (
                <div className="flex gap-3" key={item.id}>
                  <span>{item.food.name}</span> -{" "}
                  <span>{ratingToStars(item.rating)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tasteProfile && (
          <div className="p-5 bg-white text-dark-800 rounded-2xl shadow-md w-fit basis-1/2">
            <div className="text-xl font-semibold my-2">Taste Profile:</div>
            <hr className="my-3" />
            <p className="text-sm">{tasteProfile}</p>
          </div>
        )}
      </div>

      {recommendations && recommendations.length > 0 && (
        <div className="my-3">
          <div className="text-xl font-semibold mb-2">Recommendations:</div>
          <div
            className={`pt-6 grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 place-items-center`}
          >
            {recommendations.map((item) => (
              <CardItem key={item.id} data={item} isMenu={false} />
            ))}
          </div>
        </div>
      )}

      <div className="py-3 italic text-sm text-gray font-semibold">
        {loadingRatings
          ? "Fetching letterboxd ratings..."
          : loadingTasteProfile
          ? "Generating a taste profile based on your ratings..."
          : loadingRecommendations
          ? "Generating recommendations..."
          : null}
      </div>
    </div>
  );
};

export default RecommendPage;
