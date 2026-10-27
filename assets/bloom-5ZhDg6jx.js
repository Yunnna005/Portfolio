const e=`# Bloom (Final Year Project)

## Date
2026-05-01

## Description
An AI-powered personal finance tracker. It pulls bank transactions through the Plaid API or from AIB and Revolut CSV exports, runs them through a machine learning pipeline, and answers questions about your spending in a chatbot that compares a local LLM with a cloud one side by side.

## Tags
React, TypeScript, Python, FastAPI, PostgreSQL, Plaid API

## Category
Software Development

## Link
https://github.com/Yunnna005/FYP

## Images
/Portfolio/images/bloom/start_page.png
/Portfolio/images/bloom/dashboard.png
/Portfolio/images/bloom/chat.png
/Portfolio/images/bloom/evaluation_results.png

## Detailed Info

Final Year Project for my BSc in Computer Science at MTU Kerry (Sep 2025 to May 2026). [Watch the demo video](https://drive.google.com/file/d/1SuIIA7VAfhDH1DxX-1E9tweWRJzKuFmu/view?usp=sharing).

› Data in

Transactions come from the Plaid Sandbox API, which simulates a real bank connection, or from a CSV export from AIB or Revolut. The backend normalises both into one transaction schema, sorts them into 10+ spending categories and stores them in PostgreSQL.

› ML pipeline

* Deep Feature Synthesis builds features from the raw transactions, such as spending velocity, merchant frequency and category ratios.
* Isolation Forest flags transactions that don't fit the user's usual spending.
* XGBoost generates personalised spending recommendations.
* Prophet forecasts future spending from past patterns.

› Dual-LLM chatbot

The chatbot works out the intent of a question, pulls the matching pipeline outputs (anomalies, forecasts, peer benchmarks or recommendations) and builds a prompt. The prompt goes to two models at once, and both answers are shown side by side:

* Ollama (Qwen3 1.7b), which runs locally so no data leaves the machine
* Gemini 1.5 Flash-Lite, through the Gemini API

I evaluated both on 15 test questions across 5 intent types (Lookup, Anomaly, Advice, Scenario, Overview), scored on 6 quality metrics. Gemini was more specific and grounded its answers in the actual transactions. The two were close on naturalness, readability and instruction following. Qwen3 was slower, up to 66 seconds on Scenario and Overview questions against under 25 seconds for Gemini. The quality gap was small enough that a fully local, privacy-preserving setup is workable, at the cost of speed on complex questions.

### Full Tech Stack:
React, TypeScript, Vite, Python, FastAPI, PostgreSQL, Plaid API, Deep Feature Synthesis, Isolation Forest, XGBoost, Prophet, Ollama (Qwen3 1.7b), Gemini 1.5 Flash-Lite
`;export{e as default};
