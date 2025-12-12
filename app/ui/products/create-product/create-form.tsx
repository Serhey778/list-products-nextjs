'use client';
import { Product, ProductType } from '../../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../button';
import { createCard, State } from '../../../lib/actions';
import { useActionState } from 'react';
import TypeSelect from './type-select';
import PriceInput from './price-input';
import InfoInput from './info-input';

export default function CreateForm({
  products,
  typeNames,
}: {
  products: Product[];
  typeNames: ProductType[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCard, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        <TypeSelect products={products} typeNames={typeNames} state={state} />
        <PriceInput state={state} />
        <InfoInput state={state} />
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/products"
            className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-green-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Invoice</Button>
        </div>
      </div>
    </form>
  );
}
