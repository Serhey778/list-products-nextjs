import { Product } from '@/app/lib/definitions';
import {
  ShoppingCartIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { State } from '../../../lib/actions';

export default function ProductSelect({
  products,
  selected,
  state,
}: {
  products: Product[];
  selected: string;
  state: State;
}) {
  return (
    <>
      <div className="mt-3">
        <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
          Choose product:
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <select
              id="product_id"
              name="product_id"
              className="peer block w-full h-10 bg-white cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
              defaultValue=""
              aria-describedby="product_id-error"
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.sort().map(({ id, name, type }) => {
                if (type === selected) {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                }
              })}
            </select>
            <ShoppingCartIcon className="hidden md:block md:pointer-events-none md:absolute md:left-3 md:top-1/2 md:h-[25px] md:w-[25px] md:-translate-y-1/2 md:text-green-800" />
          </div>
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
    </>
  );
}
