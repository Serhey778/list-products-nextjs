import postgres from 'postgres';
import { CardsList, Product } from './definitions';
// import { LatestCardRaw } from './definitions';
// import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;

export async function fetchCardsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM cards
    JOIN products ON cards.product_id = products.id
    WHERE
      products.type ILIKE ${`%${query}%`} OR
      products.name ILIKE ${`%${query}%`} OR
      cards.price::text ILIKE ${`%${query}%`} OR
      cards.info ILIKE ${`%${query}%`} OR
      cards.date::text ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of cards.');
  }
}

export async function fetchFilteredCards(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
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
      WHERE
        products.type ILIKE ${`%${query}%`} OR
        products.name ILIKE ${`%${query}%`} OR
        cards.price::text ILIKE ${`%${query}%`} OR
        cards.info ILIKE ${`%${query}%`} OR
        cards.date::text ILIKE ${`%${query}%`}
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

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? '0');
//     const numberOfCustomers = Number(data[1][0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }

// export async function fetchCustomers() {
//   try {
//     const customers = await sql<CustomerField[]>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }
