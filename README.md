# 🌉 Cross-Application Image RAG Assistant (Immich + n8n + Ollama)

## Project Overview

This is an advanced application that integrates the Immich photo management system with an n8n Retrieval-Augmented Generation (RAG) workflow. It leverages **n8n** as the orchestration layer, utilizing **Ollama** (specifically, `llava-phi3`) for visual analysis and a dedicated **pgvector** instance for storing RAG vectors. This setup enables users to efficiently retrieve and analyze images from their library via a chat interface using natural language queries.

## Tech Stack

* **Photo Management System:** Immich
* **Workflow Automation Engine:** n8n
* **Vision Language Model (VLM):** Ollama (`llava-phi3:latest`)
* **Database (Immich Data):** PostgreSQL
* **Vector Database (n8n RAG):** pgvector (ankane/pgvector)
* **Deployment:** Docker Compose

## Project Structure

image-rag-assistant/ ├── docker-compose.yml # Configuration to launch Immich, n8n, Ollama, and DB services. ├── .env.example # Template for API keys and credentials (DO NOT INCLUDE REAL KEYS). ├── README.md # Project documentation. ├── architecture_diagram.png # System architecture diagram (REQUIRED for submission). ├── .gitignore # Specifies files to be ignored by Git (e.g., .env file). └── n8n-workflows/ └── Google Drive Image RAG Indexer + Chat_ (13)_Final.json # The core RAG workflow.


## 🚀 Quick Start Guide

### Step 1: Configure Environment Variables

1.  Copy the example file to create your working environment file: `cp .env.example .env`
2.  **Edit the `.env` file.** You must securely fill in all required credentials, including:
    * Immich database passwords.
    * **Google OAuth Credentials** (Client ID/Secret).
    * **Gemini API Key**.

### Step 2: Launch All Services

Start the entire application stack using Docker Compose. This will launch Immich, n8n, Ollama, and both database services.

```bash
docker-compose up -d
Step 3: Import and Activate n8n Workflow
Access the n8n interface (typically at http://localhost:5678).

Import the workflow file located at n8n-workflows/Google Drive Image RAG Indexer + Chat_ (13)_Final.json.

Activate the workflow and configure the necessary credentials (e.g., set up the Google Drive OAuth credentials within the n8n nodes).
