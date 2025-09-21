import { X } from 'lucide-react';

interface InclusionExclusionModalProps {
  inclusions: string[];
  exclusions: string[];
  onClose: () => void;
}

const InclusionExclusionModal = ({ inclusions, exclusions, onClose }: InclusionExclusionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg animate-fade-in-up">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Inclusion & Exclusion</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={28} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Inclusion:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {inclusions.map((item, index) => <li key={`inc-${index}`}>{item}</li>)}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Exclusion:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {exclusions.map((item, index) => <li key={`exc-${index}`}>{item}</li>)}
            </ul>
          </div>
           <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Upgrade to Twin Sharing:</h3>
            <p className="text-gray-600">
              For those who wish to upgrade to twin sharing accommodation, an additional ₹2200 per person is applicable. 
              <a href="#" className="text-blue-600 hover:underline ml-1">Click Here</a> to make the payment and confirm your upgrade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionExclusionModal;

