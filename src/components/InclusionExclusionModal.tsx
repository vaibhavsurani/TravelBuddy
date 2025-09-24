import { X } from 'lucide-react';

interface InclusionExclusionModalProps {
  inclusions: string[];
  exclusions: string[];
  onClose: () => void;
}

const InclusionExclusionModal = ({ inclusions, exclusions, onClose }: InclusionExclusionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-2xl w-full max-w-lg animate-fade-in-up">
        <div className="px-4 py-5 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-md font-normal text-gray-800">Inclusion & Exclusion</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={13} className="font-bold"/>
          </button>
        </div>
        <div className="px-4 py-5 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-xl font-normal text-gray-500 mb-1">Inclusion:</h3>
            <ul className="list-disc text-sm list-inside text-gray-500 custom-lines">
              {inclusions.map((item, index) => <li key={`inc-${index}`}>{item}</li>)}
            </ul>
          </div>
          <div className="pt-2">
            <h3 className="text-xl font-normal text-gray-500 mb-1">Exclusion:</h3>
            <ul className="list-disc text-sm list-inside text-gray-500 custom-lines">
              {exclusions.map((item, index) => <li key={`exc-${index}`}>{item}</li>)}
            </ul>
          </div>
           <div className="pt-2">
            <h3 className="text-xl font-normal text-gray-500 mb-1">Upgrade to Twin Sharing:</h3>
            <p className="text-gray-500 text-sm">
              For those who wish to upgrade to twin sharing accommodation, an additional ₹2200 per person is applicable. 
              <a href="#" className="text-orange-600 hover:underline ml-1 hover:text-[#C2461C]">Click Here</a> to make the payment and confirm your upgrade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionExclusionModal;

