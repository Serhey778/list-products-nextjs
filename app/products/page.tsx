// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Image from 'next/image';
import Cards from '../ui/products/cards';
import CardsSkeleton from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCardsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import Breadcrumbs from '../ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Products List',
};
const breadcrumbs = [
  { label: 'Home', href: '/' },
  {
    label: 'Products List',
    href: '/products',
    active: true,
  },
];

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCardsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div> */}
      <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
        <Cards query={query} currentPage={currentPage} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
