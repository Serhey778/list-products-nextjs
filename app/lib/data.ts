import postgres from 'postgres';
import { CardsList, Product } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;

export async function fetchCardsPages(query: string, likes: string | null) {
  const likesBoolean: boolean | undefined =
    likes === 'true' ? true : likes === 'false' ? false : undefined;
  try {
    const data = await sql`SELECT COUNT(*)
    FROM cards
    JOIN products ON cards.product_id = products.id
    WHERE (
      products.type ILIKE ${`%${query}%`} OR
      products.name ILIKE ${`%${query}%`} OR
      cards.price::text ILIKE ${`%${query}%`} OR
      cards.info ILIKE ${`%${query}%`} OR
      cards.date::text ILIKE ${`%${query}%`}
    )
    ${
      likesBoolean !== undefined
        ? sql`AND cards.islike = ${likesBoolean}`
        : sql``
    }
  `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of cards.');
  }
}

export async function fetchFilteredCards(
  query: string,
  currentPage: number,
  likes: string | null
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const likesBoolean: boolean | undefined =
    likes === 'true' ? true : likes === 'false' ? false : undefined;
  try {
    const cards = await sql<CardsList[]>`
      SELECT
        cards.id,
        products.type,
        products.name,
        products.image_url,
        cards.price,
        cards.info,
        cards.date,
        cards.islike
      FROM cards
      JOIN products ON cards.product_id = products.id
      WHERE (
        products.type ILIKE ${`%${query}%`} OR
        products.name ILIKE ${`%${query}%`} OR
        cards.price::text ILIKE ${`%${query}%`} OR
        cards.info ILIKE ${`%${query}%`} OR
        cards.date::text ILIKE ${`%${query}%`}
      )
      ${
        likesBoolean !== undefined
          ? sql`AND cards.islike = ${likesBoolean}`
          : sql``
      }
      ORDER BY cards.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return cards;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cards.');
  }
}

export async function fetchProducts() {
  try {
    const products = await sql<Product[]>`
    SELECT * FROM products`;
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchCardById(id: string) {
  try {
    const cards = await sql<CardsList[]>`
       SELECT
        cards.id,
        cards.product_id,
        products.type,
        products.name,
        products.image_url,
        cards.price,
        cards.info,
        cards.date,
        cards.islike 
      FROM cards
      JOIN products ON cards.product_id = products.id
      WHERE cards.id = ${id};
    `;
    const cardArray = cards.map((card) => ({
      ...card,
      price: card.price / 100,
    }));
    return cardArray[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card.');
  }
}
