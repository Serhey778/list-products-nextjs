import Breadcrumbs from '../../ui/products/breadcrumbs';
import { Metadata } from 'next';

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
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </main>
  );
}
