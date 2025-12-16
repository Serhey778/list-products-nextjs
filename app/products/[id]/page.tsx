import { fetchCardById } from '../../lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumbs from '../../ui/breadcrumbs';
import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Info',
};
const breadcrumbs = [
  { label: 'Products List', href: '/products' },
  {
    label: 'Product Info',
    href: '',
    active: true,
  },
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const card = await fetchCardById(id);
  if (!card) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="rounded-md bg-gray-100 p-4 md:p-6 md:w-250">
        <div className="flex items-center justify-left pb-4 mb-2">
          <div className="mb-2 flex-col">
            <h1 className="text-3xl">Product</h1>
            <div>
              <Image
                src={card.image_url}
                className="mr-2 rounded-full object-contain"
                width={200}
                height={200}
                loading="eager"
                alt={`${card.name}'s profile picture`}
              />
            </div>
            <p className="text-xl font-medium mb-2">Name : {card.name}</p>
            <p className="text-xl font-medium mb-2">Type : {card.type}</p>
            <p className="text-xl font-medium">Info : </p>
            <div className="flex flex-wrap text-xl mb-2">
              <p className="break-words w-full text-justify">{card.info}</p>
            </div>
            <p className="text-xl font-medium mb-2">
              Price : {formatCurrency(card.price)}
            </p>
            <p className="text-xl font-medium mb-2">
              Date : {formatDateToLocal(card.date)}
            </p>
            {card.islike && (
              <p className="text-xl font-medium mb-2 text-green-500">
                Product has been marked as liked !
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            href="/products"
            className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-xl font-medium text-white transition-colors hover:bg-green-800"
          >
            Return
          </Link>
        </div>
      </div>
    </main>
  );
}
