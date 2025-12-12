'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  product_id: z.string().min(1, {
    message: 'Please select a product.',
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

//const UpdateInvoice = FormSchema.omit({ id: true, date: true, islike: true });

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

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   await sql`DELETE FROM invoices WHERE id = ${id}`;
//   revalidatePath('/dashboard/invoices');
// }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
