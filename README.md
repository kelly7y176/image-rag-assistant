# 🌉 Cross-Application Image RAG Assistant (Google Drive + n8n + Gemini)

<div>
   <!-- <img align="left" align="left" alt="HTML" width="100%" style="padding-right:10px;" src="https://i.imgur.com/GgZC4B1.jpeg" /> -->
</div>

## Project Overview

This is an advanced application that integrates the Google Drive photo management system with an n8n Retrieval-Augmented Generation (RAG) workflow. It leverages **n8n** as the orchestration layer, utilizing **Gemini** (specifically, `Gemini 2.5 flash`) for visual analysis and a dedicated **pgvector** instance for storing RAG vectors. This setup enables users to efficiently retrieve and analyze images from their library via a chat interface using natural language queries.

## Tech Stack

- **Photo Management System:** Google Drive
- **Workflow Automation Engine:** n8n
- **Vision Language Model (VLM):** Gemini (`Gemini 2.5 flash`)
- **Database (Immich Data):** PostgreSQL
- **Vector Database (n8n RAG):** pgvector (ankane/pgvector)
- **Deployment:** Docker Compose

## Project Structure

<br />image-rag-assistant/
<br />├── docker-compose.yml # Configuration to launch Google Drive, n8n, Gemini, and DB services.
<br />├── .env.example # Template for API keys and credentials (NOT INCLUDE REAL KEYS).
<br />├── README.md # Project documentation.
<br />├── architecture*diagram.png # System architecture diagram (REQUIRED for submission).
<br />├── .gitignore # Specifies files to be ignored by Git (e.g., .env file).
<br />├── n8n-workflows/
<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Google Drive Image RAG Indexer + Chat* (13)\_Final.json # The core RAG workflow.

<!-- Cover -->
<br />
<div>

## 🚀 Quick Start Guide

### Step 1: Configure Environment Variables

1.  Copy the example file to create your working environment file: `cp .env.example .env`
2.  **Edit the `.env` file.** You must securely fill in all required credentials, including:
    - **Google OAuth Credentials** (Client ID/Secret).
    - **Gemini API Key**.

### Step 2: Launch All Services

Start the entire application stack using Docker Compose. This will launch Google Drive, n8n, Gemini, and both database services.

```bash
docker-compose up -d
Step 3: Import and Activate n8n Workflow
Access the n8n interface (typically at http://localhost:5678).

Import the workflow file located at n8n-workflows/Google Drive Image RAG Indexer + Chat_ (13)_Final.json.

Activate the workflow and configure the necessary credentials (e.g., set up the Google Drive OAuth credentials within the n8n nodes).
```
