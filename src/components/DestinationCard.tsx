import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/data/destinations';

// This interface tells TypeScript exactly what props the component expects.
// This is likely the part that is missing or incorrect in your file.
interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative h-56 w-full">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6 text-left">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
        <Link href={`/destinations/${destination.id}`} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            View Details
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;

