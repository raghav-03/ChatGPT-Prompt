const express = require("express");
const app = express();
const data = require("./input.json");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.get("/", async (req, res) => {
  try {
    const finalresult = [];
    const Article = [];
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].content.length; k++) {
        let item = data[i].content[k];
        let flag = false;
        for (let j = 0; j < finalresult.length; j++) {
          let summary1 = finalresult[j].summary;
          let summary2 = item.summary;
          let prompt = `Identify weather these two sentences mean the same thing or not in true or false without explaination \n \n Summary1: ${summary1}\n Summary2: ${summary2}`;
          let completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
          });
          if (completion.data.choices[0].text === "True") {
            let prompt1 = `Give concise summary for the following given statements \n \n Statement1: ${item.summary} \n Statement2: ${finalresult[j].summary} `;
            let completion1 = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: prompt1,
            });
            finalresult[j].summary = completion1.data.choices[0].text;
            finalresult[j].citation.push(i);
            flag = true;
            break;
          }
        }
        if (flag === false) {
          let prompt1 = `Give concise summary for the following given statements \n \n Statement1: ${item.summary}`;
          let completion1 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt1,
          });
          let obj = {
            heading: item.heading,
            summary: completion1.data.choices[0].text,
            example: item.example,
            citation: [i],
          };
          finalresult.push(obj);
        }
      }
      Article.push({
        url: data[i].url,
        title: data[i].title,
      });
    }
    return res.status(200).json({
      success: true,
      finalresult,
      Article,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        errorcode: error.response.status,
        message: error.response.data.error.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
});

const server = app.listen(process.env.PORT || 3601, () =>
  console.log(`Sever Running on port ${process.env.PORT || 3601}`)
);
