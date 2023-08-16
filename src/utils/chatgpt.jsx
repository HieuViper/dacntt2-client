import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const createChatCompletion = async (messages) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  console.log(
    "🚀 ~ file: chatgpt.jsx:14 ~ createChatCompletion ~ completion:",
    completion
  );
  return completion.data.choices[0].message.content;
};
