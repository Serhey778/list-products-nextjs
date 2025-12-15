import { fetchFilteredCards } from '../../lib/data';
import Card from './card';

export default async function Cards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const cards = await fetchFilteredCards(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2">
          {cards?.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
