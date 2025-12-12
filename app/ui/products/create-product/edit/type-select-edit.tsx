'use client';
import { useState } from 'react';
import { Product, ProductType, CardsList } from '../../../../lib/definitions';
import ProductSelect from './product-select-edit';
import { State } from '../../../../lib/actions';
import {
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function TypeSelect({
  products,
  typeNames,
  state,
  card,
}: {
  products: Product[];
  typeNames: ProductType[];
  state: State;
  card: CardsList;
}) {
  const [selected, setSelected] = useState<string>(card.type);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };
  return (
    <div className="mb-4">
      <label htmlFor="type" className="mb-2 block text-sm font-medium">
        Choose products type:
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <select
            id="type"
            name="type"
            className="peer block w-full bg-white cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-200"
            defaultValue={card.type}
            aria-describedby="type-error"
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select a product type
            </option>
            {typeNames.sort().map((typeName) => (
              <option key={typeName} value={typeName}>
                {typeName}
              </option>
            ))}
          </select>
          <AdjustmentsHorizontalIcon className="pointer-events-none absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-green-800" />
        </div>
      </div>
      <div id="product_id-error" aria-live="polite" aria-atomic="true">
        {state.errors?.product_id &&
          state.errors.product_id.map((error: string) => (
            <div
              key={error}
              className="flex flex-row mt-2 text-sm text-red-500"
            >
              <ExclamationTriangleIcon className="h-[25px] w-[25px] " />
              <p className="ml-2 mt-1">{error}</p>
            </div>
          ))}
      </div>
      <ProductSelect
        selected={selected}
        products={products}
        state={state}
        card={card}
      />
    </div>
  );
}
