import { CardsList } from '../../lib/definitions';
import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '../../lib/utils';
import { LikeCard, UpdateCard, DeleteCard } from './buttons';
import Link from 'next/link';

export default function Card({ card }: { card: CardsList }) {
  const { id, type, name, image_url, price, date, islike } = card;
  return (
    <div className="my-4 w-full rounded-md bg-white p-4">
      <Link href={`/products/${card.id}`}>
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="mb-2 flex items-center">
              <Image
                src={image_url}
                className="mr-2 rounded-sm"
                width={80}
                height={80}
                loading="eager"
                alt={`${name}'s profile picture`}
                style={{ objectFit: 'cover' }}
              />
              <p className="text-xl font-medium">{name}</p>
            </div>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">{formatCurrency(price)}</p>
          <p className="text-sm text-gray-500">{formatDateToLocal(date)}</p>
        </div>
        <div className="flex justify-end gap-2 ">
          <LikeCard id={id} islike={islike} />
          <UpdateCard id={id} />
          <DeleteCard id={id} />
        </div>
      </div>
    </div>
  );
}
