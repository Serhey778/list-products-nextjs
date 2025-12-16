import Breadcrumbs from '../../ui/breadcrumbs';
import { Metadata } from 'next';
import CreateForm from '../../ui/products/create-product/create-form';
import { fetchProducts } from '../../lib/data';

export const metadata: Metadata = {
  title: 'Product Create',
};

const breadcrumbs = [
  { label: 'Products List', href: '/products' },
  {
    label: 'Product Create',
    href: '/products/create-product',
    active: true,
  },
];

export default async function Page() {
  const products = await fetchProducts();
  const typeNames = [...new Set(products.map(({ type }) => type))];
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <CreateForm products={products} typeNames={typeNames} />
    </main>
  );
}
