'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  product_id: z.string({
    error: 'Please select a product.',
  }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  info: z.string().min(1, {
    message: 'Please enter product information.',
  }),
  date: z.string(),
  islike: z.boolean(),
});

export type State = {
  errors?: {
    product_id?: string[];
    price?: string[];
    info?: string[];
  };
  message?: string | null;
};
const CreateCard = FormSchema.omit({ id: true, date: true, islike: true });
const UpdateCard = FormSchema.omit({ id: true, date: true, islike: true });

export async function createCard(prevState: State, formData: FormData) {
  const validatedFields = CreateCard.safeParse({
    product_id: formData.get('product_id'),
    price: formData.get('price'),
    info: formData.get('info'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Card.',
    };
  }
  const { product_id, price, info } = validatedFields.data;
  const priceInCents = price * 100;
  const date = new Date().toISOString();
  const islike = false;
  try {
    await sql`
      INSERT INTO cards (product_id, price, info, date, islike)
      VALUES (${product_id}, ${priceInCents}, ${info}, ${date},${islike})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Card.',
    };
  }
  revalidatePath('/products');
  redirect('/products');
}

export async function updateCard(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateCard.safeParse({
    product_id: formData.get('product_id'),
    price: formData.get('price'),
    info: formData.get('info'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Card.',
    };
  }

  const { product_id, price, info } = validatedFields.data;
  const priceInCents = price * 100;
  const date = new Date().toISOString();

  try {
    await sql`
      UPDATE cards
      SET product_id = ${product_id}, price = ${priceInCents}, info = ${info}, date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Card.' };
  }

  revalidatePath('/products');
  redirect('/products');
}

export async function deleteCard(id: string) {
  await sql`DELETE FROM cards WHERE id = ${id}`;
  revalidatePath('/products ');
}

export async function likeCard(id: string) {
  await sql`
  UPDATE cards
  SET islike = NOT islike
  WHERE id = ${id}
`;
  revalidatePath('/products');
}
