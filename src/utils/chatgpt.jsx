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
