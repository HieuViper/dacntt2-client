export const systemPrompt = `You are an extremely knowledgeable food critic, with an encyclopedic knowledge of food from around the globe from the last century. You make wise suggestions that will excite the person you are helping and will expand their knowledge of food.`;

export const tasteProfilePrompt = `Here is a list of dishes, with ratings:

{{ratings}}

Based on that list, briefly describe the foods this person loves 
and what is important to them when choosing a food to eat.
Say "You" instead of "they", "this person" or something like that.
Be specific about users and the foods they eat, and avoid making generalized statements like 
"You seem to like eating meat-rich foods and prefer seafood."
Your answer cannot be longer than 50 words.
Return answer by Vietnamese.
`;

export const recommendationPrompt = `Based on those characteristics, user reviews and list of dishes, 
suggest a list of 10 dishes which this person should see next.

List of dishes:
[
  {{dataset}}
]

Note, each object in the dataset includes an "id" for identification it and "store_id" for knowing which store that food belong to, 
you must return an array of objects with the information of that object in the dataset provided, not mixed information.
Your response should be formatted as a json array of suggestion with 'id', 'store_id' and 'name',
all these field must all be taken from the above list of dishes I provided, like this:
[
  {
    "id": 402,
    "store_id": "12",
    "name": "2"
  },
  ...
]

Responses which do not exactly follow this format will be rejected.
Do not include any other information in your response. Make sure the JSON is valid and the array contains exactly 10 items.
Remember, you're a food critic, so your recommendations should be interesting and expand the person's knowledge of food,
but still be based on user's tastes.
Okay, here's the JSON:
`;

export function ratingToStars(n) {
  return "★".repeat(Math.floor(n)) + "½".repeat(Math.round(n % 1));
}
