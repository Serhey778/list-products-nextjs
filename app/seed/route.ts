import postgres from 'postgres';
import { products, cards } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      type VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    )
  `;
  await sql`
  DELETE FROM products;
  `;
  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (id, type, name, image_url)
        VALUES (${product.id}, ${product.type}, ${product.name}, ${product.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  return insertedProducts;
}

async function seedCards() {
  //await sql`DROP TABLE cards`;
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS cards (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL,
      price INT NOT NULL,
      info TEXT,
      date TIMESTAMP,
      islike BOOLEAN NOT NULL
    );
  `;
  await sql`
  DELETE FROM cards;
  `;
  // // const insertedCards = await Promise.all(
  //   cards.map(
  //     (card) => sql`
  //       INSERT INTO cards (product_id, price, info, date, islike)
  //       VALUES (${card.product_id}, ${card.price}, ${card.info}, ${card.date}, ${card.islike})
  //       ON CONFLICT (id) DO NOTHING;
  //     `
  //   )
  // );

  // return insertedCards;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedProducts(), seedCards()]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
