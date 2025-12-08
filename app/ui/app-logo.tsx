import { QueueListIcon } from '@heroicons/react/24/solid';
import { lusitana } from '@/app/ui/fonts';

export default function AppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <QueueListIcon className="h-12 w-12" />
      <p className="text-[44px] pl-5">Products</p>
    </div>
  );
}
