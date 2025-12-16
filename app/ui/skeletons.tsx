const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function CardSkeleton() {
  return (
    <div className={`${shimmer} mb-2 w-full rounded-md bg-white p-4`}>
      <div className="flex items-center justify-between border-b border-gray-200 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-25 w-25 bg-gray-200"></div>
          <div className="h-6 w-16 rounded bg-gray-200"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray200"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-200"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-200"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-200"></div>
          <div className="h-10 w-10 rounded bg-gray-200"></div>
          <div className="h-10 w-10 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default function CardsSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
