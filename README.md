# React Native Timer App

This is a simple **Timer** application built with pure **React Native** (no Expo).  
It allows you to start, pause, and reset a timer inside a mobile app.


## Tech Stack

- **React Native (bare workflow)** — for building the mobile app  
- **Node.js + Express.js** — backend API server  
- **PostgreSQL** — database to store app data


## Getting Started

### Step 1: Start Metro Bundler

Run Metro, the React Native JavaScript bundler, from your project root:

```bash
npm start
```

### Step 2: Run the App on a Device or Emulator

Open a new terminal window and run one of the following commands depending on your platform:

- **Android:**

```bash
npm run android
```

### Step 2.1: Start Backend Server

In another terminal window, start the backend Node.js server (assuming your entry point is index.js):

```bash
node index.js
```

## Features

- Start and pause the timer  
- Reset the timer  
- Timer state can be synchronized with backend API (Node.js + Express + PostgreSQL)


## Screenshots
![image](https://github.com/user-attachments/assets/a839f578-07c8-44bf-b3e0-6da73a73859b)



## Backend Overview

The backend API built with Node.js and Express handles storing and retrieving timer sessions in a PostgreSQL database.  
This allows persistence of timer state and supports multi-session handling.


