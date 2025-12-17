import Pagination from '../ui/products/pagination';
import Search from '../ui/products/search';
import { CreateCard } from '../ui/products/buttons';
import Cards from '../ui/products/cards';
import CardsSkeleton from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCardsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import Breadcrumbs from '../ui/breadcrumbs';
import Filter from '../ui/products/filter';

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
    likes?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const likes = searchParams?.likes || null;
  const totalPages = await fetchCardsPages(query, likes);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <Filter />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search cards..." />
        <CreateCard />
      </div>
      <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
        <Cards query={query} currentPage={currentPage} likes={likes} />
      </Suspense>
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} likes={likes} />
      </div>
    </div>
  );
}
