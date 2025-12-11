import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { State } from '../../../lib/actions';

export default function InfoInput({ state }: { state: State }) {
  return (
    <div className="mb-4">
      <label htmlFor="info" className="mb-2 block text-sm font-medium">
        Choose an info:
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="info"
            name="info"
            type="text"
            step="0.01"
            placeholder="Enter product info"
            className="peer block w-full bg-white rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="info-error"
          />
          <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[25px] w-[25px] -translate-y-1/2 text-green-800" />
        </div>
      </div>
      <div id="info-error" aria-live="polite" aria-atomic="true">
        {state.errors?.info &&
          state.errors.info.map((error: string) => (
            <div
              key={error}
              className="flex flex-row mt-2 text-sm text-red-500"
            >
              <ExclamationTriangleIcon className="h-[25px] w-[25px] " />
              <p className="ml-2 mt-1">{error}</p>
              {state.message && (
                <p className="block ml-2 mt-1 text-sm text-red-500">
                  {state.message}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
