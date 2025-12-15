import EditForm from '../../../ui/products/create-product/edit/edit-form';
import Breadcrumbs from '../../../ui/breadcrumbs';
import { fetchCardById, fetchProducts } from '../../../lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Edit',
};
const breadcrumbs = [
  { label: 'Products List', href: '/products' },
  {
    label: 'Product Edit',
    href: '',
    active: true,
  },
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [card, products] = await Promise.all([
    fetchCardById(id),
    fetchProducts(),
  ]);
  const typeNames = [...new Set(products.map(({ type }) => type))];
  if (!card) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <EditForm card={card} products={products} typeNames={typeNames} />
    </main>
  );
}
