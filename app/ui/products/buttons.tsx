import {
  PlusIcon,
  PencilIcon,
  HandThumbUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCard, likeCard } from '../../lib/actions';
import clsx from 'clsx';

export function CreateCard() {
  return (
    <Link
      href="/products/create-product"
      className="flex h-10 items-center round ed-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
    >
      <span className="hidden md:block">Create Card</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCard({ id }: { id: string }) {
  return (
    <Link
      href={`/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCard({ id }: { id: string }) {
  const deleteCardWithId = deleteCard.bind(null, id);
  return (
    <>
      <form action={deleteCardWithId}>
        <button
          type="submit"
          className="rounded-md border p-2 cursor-pointer hover:bg-green-200"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
export function LikeCard({ id, islike }: { id: string; islike: boolean }) {
  const likeCardWithId = likeCard.bind(null, id);
  return (
    <>
      <form action={likeCardWithId}>
        <button
          type="submit"
          className={clsx(
            'rounded-md border p-2 hover:bg-green-200 cursor-pointer',
            {
              'text-green-600': islike === true,
            }
          )}
        >
          <span className="sr-only">Like</span>
          <HandThumbUpIcon
            className={clsx('w-5', {
              'text-green-600': islike === true,
            })}
          />
        </button>
      </form>
    </>
  );
}
