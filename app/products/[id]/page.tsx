import Breadcrumbs from '../../ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Info',
};
const breadcrumbs = [
  { label: 'Products List', href: '/products' },
  {
    label: 'Product Info',
    href: '/products/[id]',
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
