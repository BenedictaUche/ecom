
# ecom

## Overview

ecom is an E-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Firebase. It features product listing, viewing details, filtering, and CRUD (Create, Read, Update, Delete) operations for products. The platform is optimized for SEO and performance, making it fast and search engine-friendly.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- npm or yarn
- A [Firebase account](https://firebase.google.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BenedictaUche/ecom.git
   cd ecom
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Firebase:**

   - Set up a Firebase project with Firestore and Authentication (Email/Password).
   - Create a `.env.local` file with your Firebase configuration:

     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the app:**

   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your app.

## Design Choices

- **Firebase:** Chose this because it is easy to use and scalable, though it does limit flexibility.
- **Next.js:** Used because it has excellent SSR support, which enhances SEO.
- **Tailwind CSS:** Speeds up styling but requires careful configuration to avoid bloated CSS.

## SEO Considerations

- **Metadata:** The project has unique titles and meta descriptions to improve search engine rankings.
- **Performance:** Optimizations like lazy loading, image compression, and caching ensuring fast load times, which benefits SEO.
- **Mobile-Friendly:** The app is fully responsive, crucial for both user experience and SEO.



---
