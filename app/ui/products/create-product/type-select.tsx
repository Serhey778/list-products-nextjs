'use client';
import { useState } from 'react';
import { Product, ProductType } from '@/app/lib/definitions';
import ProductSelect from './product-select';
import { State } from '../../../lib/actions';
import {
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function TypeSelect({
  products,
  typeNames,
  state,
}: {
  products: Product[];
  typeNames: ProductType[];
  state: State;
}) {
  const [selected, setSelected] = useState<string>('');
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
            className="peer block w-full h-10 bg-white cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
            defaultValue=""
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
          <AdjustmentsHorizontalIcon className="hidden md:block md:pointer-events-none md:absolute md:left-3 md:top-1/2 md:h-[25px] md:w-[25px] md:-translate-y-1/2 md:text-green-800" />
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
      {selected && (
        <ProductSelect selected={selected} products={products} state={state} />
      )}
    </div>
  );
}
