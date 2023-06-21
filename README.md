# Using ChatGPT Promopts to identify same articles

An API has been developed to retrieve input data, and the ChatGPT prompt is utilized to eliminate redundant information and generate concise summaries of the data. This process involves fetching the input data through the API, leveraging ChatGPT to process and analyze the data, and producing succinct summaries that capture the key points without unnecessary redundancy.
The input data for the process is sourced from the "input.json" file, while the resulting output is presented in the "output.json" file.

## Run Locally

Clone the project

```bash
  git https://github.com/raghav-03/ChatGPT-Prompt.git
```

Go to the project directory

```bash
  cd ChatGPT-Prompt
```

Install dependencies

```bash
  npm install
```

Setup Config Files

```bash
  OPENAI_API_KEY = // get from openai.com
  PORT=3601

```

Start the server

```bash
  npm start
```

Run the Api on Browser

```bash
  http://localhost:3601/
```

## Made By

- [@Raghav Agarwal](https://github.com/raghav-03)
