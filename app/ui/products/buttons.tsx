import {
  PlusIcon,
  PencilIcon,
  HandThumbUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
//import { deleteInvoice } from '../ actions';

export function CreateInvoice() {
  return (
    <Link
      href="/products/create-product"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
    >
      <span className="hidden md:block">Create Invoice</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCard({ id }: { id: string }) {
  return (
    <Link
      href={`/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-200"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCard({ id }: { id: string }) {
  //const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      {/* <form action={deleteInvoiceWithId}> */}
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      {/* </form> */}
    </>
  );
}
export function LikeCard({ id }: { id: string }) {
  //const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      {/* <form action={deleteInvoiceWithId}> */}
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-200">
        <span className="sr-only">Like</span>
        <HandThumbUpIcon className="w-5" />
      </button>
      {/* </form> */}
    </>
  );
}
