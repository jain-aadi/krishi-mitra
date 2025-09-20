Kishan Mitra is a full-stack, multilingual AI-powered chatbot designed to provide personalized crop recommendations to Indian farmers. This solution directly addresses the critical need for accessible, localized agricultural information, empowering farmers to make informed decisions and improve yields using the power of Generative AI.

This repository contains the complete source code for the backend server, the web application, and the cross-platform mobile app.

✨ Key Features
Hyper-Personalized Advice: Uses the device's real-time GPS location and the current agricultural season to provide accurate crop recommendations.

Multilingual Chat Interface: Farmers can communicate naturally in English, Hindi, Bengali, Gujarati, and Malayalam.

Voice-to-Text Input: An accessible voice input option allows users to ask questions by speaking into their device.

Cross-Platform Access: Available as both a modern web application and a native mobile app for Android & iOS (via Expo).

Intelligent AI Core: Leverages the Google Gemini API for context-aware, human-like conversations and expert-level agricultural advice.

🛠️ Technology Stack
This project is a full-stack application composed of three main parts:

Component

Technology

Backend Server

Java 21, Spring Boot, Maven

Web Frontend

Next.js, React, TypeScript, Tailwind CSS, Shadcn UI

Mobile App

React Native, Expo, TypeScript

External APIs

Google Gemini API (for AI), OpenWeatherMap API (for reverse geocoding)

🚀 Getting Started
Follow these instructions to get the entire project up and running on your local machine for development and testing.

Prerequisites

Make sure you have the following software installed on your computer:

Java Development Kit (JDK): Version 21 or higher.

A Java IDE: IntelliJ IDEA or Visual Studio Code with the Extension Pack for Java.

Node.js: The runtime environment for the frontends.

An IDE for Frontend: Visual Studio Code is highly recommended.

For the Mobile App: The Expo Go app on your physical smartphone (from the App Store or Google Play).

1. Configuration: API Keys

The backend requires secret API keys to connect to Google Gemini and OpenWeatherMap.

Navigate to the backend configuration file: backend/src/main/resources/application.properties.

Add your API keys to this file. It should look like this:

# Your API key from Google AI Studio for Gemini
gemini.api.key=AIzaSy...YOUR_KEY_HERE

# Your API key from OpenWeatherMap for location
openweathermap.api.key=1fc22d...YOUR_KEY_HERE

2. How to Run the Application

You must run the backend and at least one frontend (web or mobile) at the same time.

A. Running the Backend (Spring Boot)

Open the backend folder in your Java IDE (e.g., IntelliJ IDEA).

Locate and open the main application file: src/main/java/kishanMitra/demo/DemoApplication.java.

Run this file. Your IDE will have a green "Run" button next to the main method.

Wait for the console to show a message similar to: Tomcat started on port(s): 8080.
Your backend is now live and ready for connections.

B. Running the Web Frontend (Next.js)

Open a new terminal window.

Navigate to the frontend directory:

cd frontend

Install the necessary packages:

npm install

Start the development server:

npm run dev

Your default web browser should automatically open a new tab to http://localhost:3000. The web application is now running.

C. Running the Mobile App (React Native with Expo)

Find Your Computer's Local IP Address: Your mobile phone needs this address to connect to your backend.

On Mac: ifconfig | grep "inet " | grep -v 127.0.0.1

On Windows: ipconfig (Look for the "IPv4 Address").

It will look like 192.168.x.x.

Update the API file in the mobile app code:

Open the file: KrishiMitraMobileNew/src/services/api.ts.

Find the API_URL constant and replace the placeholder IP with your computer's actual IP address.

// Change this line
const API_URL = '[http://192.168.1.10:8080/api/recommend](http://192.168.1.10:8080/api/recommend)'; // Use your actual IP

Run the App:

Open a new terminal and navigate to the KrishiMitraMobileNew folder.

Install the necessary packages: npm install

Start the Expo server: npx expo start

A QR code will appear in your terminal. Open the Expo Go app on your phone and scan the QR code to launch the app.

Ensure your phone and computer are connected to the same Wi-Fi network.

📂 Project Structure
The repository is organized into three main folders:

/backend: The Spring Boot Java application that serves the main API.

/frontend: The Next.js web application.

/KrishiMitraMobileNew: The React Native (Expo) mobile application.
