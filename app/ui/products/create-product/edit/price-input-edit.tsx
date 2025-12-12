import {
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { State } from '../../../../lib/actions';
import { CardsList } from '@/app/lib/definitions';

export default function PriceInput({
  state,
  card,
}: {
  state: State;
  card: CardsList;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="price" className="mb-2 block text-sm font-medium">
        Choose a price:
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={card.price}
            placeholder="Enter USD amount"
            className="peer block w-full bg-white rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-200"
            aria-describedby="price-error"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-green-800" />
        </div>
      </div>
      <div id="price-error" aria-live="polite" aria-atomic="true">
        {state.errors?.price &&
          state.errors.price.map((error: string) => (
            <div
              key={error}
              className="flex flex-row mt-2 text-sm text-red-500"
            >
              <ExclamationTriangleIcon className="h-[25px] w-[25px] " />
              <p className="ml-2 mt-1">{error}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
