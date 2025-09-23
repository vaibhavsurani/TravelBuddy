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
    <div className="bg-white rounded-xl shadow-lg h-90 w-52 overflow-hidden transform hover:shadow-2xl transition-transform duration-300">
      <Link href={`/destinations/${destination.id}`} className="">
        <div className="relative h-90 w-52">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;

