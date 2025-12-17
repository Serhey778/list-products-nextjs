# User-interfase

Welcome to the User-interfase!
This project developed with the help of java script, type script, frameworks: React, Next.js, TailwindCSS, postgresSQL and Neon database. The user interface is a dynamic table of cards with information about products. The app's functionality allows you to create new cards, update and delete them, and manage cards using search, filtering and pagination.

## Running the App in Development Mode.

1. Navigate to the root directory of the project.
2. Open new terminal window.
3. Install User-interfase dependencies by running the following command:
   > pnpm install
4. Run App in the development mode with hot reload feature:
   > pnpm dev
   > pnpm run start (running the App in Production Mode)
5. Server will be running at the 'http:/127.0.0.1:3000/'('http:/localhost:3000/').
6. Open your browser and enter the above URL.
7. The application is ready to work.

## Documentation

### The model in the Neon database contains:

type ProductType = 'fruits' | 'vegetables';

type Product = {
id: string;
type: ProductType;
name: Fruits | Vegetables;
image_url: string;
};

type Card = {
id: string;
product_id: string;
price: number;
info: string;
date: string;
islike: boolean;
};

### App endpoints:

1. $/ - Home page.
2. $/products - List of cards.
3. $/products/create-product - Creatind a card.
4. $/products/:id - Card info.
5. $/api/users/:id/edit - Card update.
6. $/seed - Automatically populating the database with placeholder data. If the database is successfully filled, a messade will be sent: "Database seeded successfully".
