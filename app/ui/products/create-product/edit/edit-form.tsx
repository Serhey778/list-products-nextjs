'use client';
import { Product, ProductType, CardsList } from '../../../../lib/definitions';
import Link from 'next/link';
import { Button } from '../../../button';
import { updateCard, State } from '../../../../lib/actions';
import { useActionState } from 'react';
import TypeSelect from './type-select-edit';
import PriceInput from './price-input-edit';
import InfoInput from './info-input-edit';

export default function EditForm({
  products,
  typeNames,
  card,
}: {
  products: Product[];
  typeNames: ProductType[];
  card: CardsList;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCardWithId = updateCard.bind(null, card.id);
  const [state, formAction] = useActionState(updateCardWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6 md:w-250">
        <TypeSelect
          products={products}
          typeNames={typeNames}
          state={state}
          card={card}
        />
        <PriceInput state={state} card={card} />
        <InfoInput state={state} card={card} />
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/products"
            className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-green-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Card</Button>
        </div>
      </div>
    </form>
  );
}
