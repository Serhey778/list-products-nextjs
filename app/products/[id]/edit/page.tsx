import Breadcrumbs from '../../../ui/products/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Edit',
};
const breadcrumbs = [
  { label: 'Products List', href: '/products' },
  {
    label: 'Product Edit',
    href: '/products/[id]/edit',
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
