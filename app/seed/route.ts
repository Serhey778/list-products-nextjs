import postgres from 'postgres';
import { products, cards, productRange } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      type VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
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
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS cards (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL,
      price INT NOT NULL,
      info TEXT,
      date DATE NOT NULL,
      islike BOOLEAN NOT NULL
    );
  `;
  const insertedCards = await Promise.all(
    cards.map(
      (card) => sql`
        INSERT INTO cards (product_id, price, info, date, islike)
        VALUES (${card.product_id}, ${card.price}, ${card.info}, ${card.date}, ${card.islike})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCards;
}

async function seedProductRange() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS product_range (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      fruits VARCHAR(255) NOT NULL,
      vegetables VARCHAR(255) NOT NULL
    );
  `;

  const insertedFruitsRange = await Promise.all(
    productRange.fruits.map(
      (fruit) => sql`
        INSERT INTO product_range (fruits)
        VALUES (${fruit})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  const insertedVegetablesRange = await Promise.all(
    productRange.vegetables.map(
      (vegetable) => sql`
          INSERT INTO product_range (vegetables)
          VALUES (${vegetable})
          ON CONFLICT (id) DO NOTHING;
        `
    )
  );
  return [insertedFruitsRange, insertedVegetablesRange];
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProducts(),
      seedCards(),
      [seedProductRange()],
    ]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
