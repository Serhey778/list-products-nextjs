'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  FunnelIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selected, setSelected] = useState<boolean | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selected === true || selected === false) {
      params.set('likes', `${selected}`);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete('likes');
      replace(`${pathname}?${params.toString()}`);
    }
  }, [selected]);
  const handleChange = (value: boolean) => {
    setSelected(value);
  };
  const handleReset = () => {
    setSelected(null);
  };
  return (
    <fieldset>
      <div className="flex flex-row justify-between md:justify-start gap-2 bg-gray-100 rounded-md border p-2 text-ml ">
        <legend className=" flex flex-row">
          <FunnelIcon className="w-6 mx-2" />
          Filter:
        </legend>
        <label htmlFor="like" className="flex flex-row">
          <p className="hidden md:block">Like</p>
          <HandThumbUpIcon className="w-6 mx-2" />
          <input
            id="like"
            name="likes"
            type="checkbox"
            className="w-6 cursor-pointer"
            checked={selected === true}
            onChange={() => handleChange(true)}
            aria-describedby="likes-error"
          />
        </label>
        <label htmlFor="notlike" className="flex flex-row ml-2">
          <p className="hidden md:block">Not Like</p>
          <HandThumbDownIcon className="w-6 mx-2" />
          <input
            id="notlike"
            name="likes"
            type="checkbox"
            className="w-6 cursor-pointer"
            checked={selected === false}
            onChange={() => handleChange(false)}
            aria-describedby="likes-error"
          />
        </label>
        <button
          type="button"
          onClick={handleReset}
          className="flex flex-row ml-2 cursor-pointer hover:text-green-600"
        >
          <p className="hidden md:block">Reset</p>
          <ArrowPathIcon className="w-6 mx-2" />
        </button>
      </div>
    </fieldset>
  );
}
