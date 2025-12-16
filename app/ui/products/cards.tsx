import { fetchFilteredCards } from '../../lib/data';
import Card from './card';

export default async function Cards({
  query,
  currentPage,
  likes,
}: {
  query: string;
  currentPage: number;
  likes: string | null;
}) {
  const cards = await fetchFilteredCards(query, currentPage, likes);
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
