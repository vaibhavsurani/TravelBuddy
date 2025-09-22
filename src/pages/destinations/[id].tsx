import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { destinations, Destination } from '@/data/destinations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingFlowModal from '@/components/BookingFlowModal';
import InclusionExclusionModal from '@/components/InclusionExclusionModal';
import { Calendar, Zap, Users, Mountain, ArrowRight, Download, Check } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center space-x-3">
    <div className="text-orange-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const PolicyLink = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="flex justify-between items-center w-full text-left p-4 rounded-md hover:bg-gray-100 transition group"
  >
    <span className="font-semibold text-gray-700">{text}</span>
    <ArrowRight size={20} className="text-gray-400 group-hover:text-orange-500 transition" />
  </button>
);

const DestinationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [destination, setDestination] = useState<Destination | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isInclusionModalOpen, setIsInclusionModalOpen] = useState(false);

  // States for the interactive date filter
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filteredDates, setFilteredDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundDestination = destinations.find((d) => d.id === id);
      setDestination(foundDestination || null);
    }
  }, [id]);

  // Auto-select first city when destination loads
  useEffect(() => {
    if (destination && destination.departureCities.length > 0 && !selectedCity) {
      handleCitySelect(destination.departureCities[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  const handleMonthSelect = (cityName: string, monthName: string) => {
    if (!destination) return;
    setSelectedMonth(monthName);

    const cityPackages = destination.packages.filter((p) => p.departureCity === cityName);
    const allDates = cityPackages.flatMap((p) => p.availableDates);
    const uniqueDates = [...new Set(allDates)];
    const monthIndex = new Date(Date.parse(monthName + ' 1, 2025')).getMonth();

    const datesForMonth = uniqueDates
      .filter((dateString) => {
        const startDateString = dateString.split(' - ')[0];
        const date = new Date(startDateString + ', 2025');
        return !isNaN(date.getTime()) && date.getMonth() === monthIndex;
      })
      .map((dateString) => {
        const startDatePart = dateString.split(' - ')[0];
        return startDatePart.split(' ')[1]; // just the day number
      });

    setFilteredDates(datesForMonth);

    // Auto-select first available date
    if (datesForMonth.length > 0) {
      setSelectedDate(datesForMonth[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const handleCitySelect = (cityName: string) => {
    if (!destination) return;

    setSelectedCity(cityName);
    setFilteredDates([]);
    setSelectedDate(null);

    const cityPackages = destination.packages.filter((p) => p.departureCity === cityName);
    const allDates = cityPackages.flatMap((p) => p.availableDates);
    const uniqueDates = [...new Set(allDates)];

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const months = new Set<string>();
    uniqueDates.forEach((dateString) => {
      const startDateString = dateString.split(' - ')[0];
      const date = new Date(startDateString + ', 2025');
      if (!isNaN(date.getTime())) {
        months.add(monthNames[date.getMonth()]);
      }
    });

    const sortedMonths = monthNames.filter((m) => months.has(m));
    setAvailableMonths(sortedMonths);

    if (sortedMonths.length > 0) {
      handleMonthSelect(cityName, sortedMonths[0]);
    } else {
      setSelectedMonth(null);
    }
  };

  if (!destination) {
    return <div>Loading or destination not found...</div>;
  }

  const { keyStats } = destination;

  // Find current package based on city + date
  const currentPackage = destination.packages.find(
    (pkg) => {
      if (pkg.departureCity !== selectedCity) return false;
      
      return pkg.availableDates.some((date) => {
        const [startDate] = date.split(' - ');
        const [monthStr, dayStr] = startDate.split(' ');
        
        const monthIndex = new Date(Date.parse(monthStr + " 1, 2000")).getMonth();
        const fullMonthName = new Date(2000, monthIndex).toLocaleString('default', { month: 'long' });

        return dayStr === selectedDate && fullMonthName === selectedMonth;
      });
    }
  );

  const getFormattedItineraryDate = (dayNumber: number): string => {
    if (!selectedDate || !selectedMonth) return '';

    const monthIndex = new Date(Date.parse(selectedMonth + ' 1, 2025')).getMonth();
    const startDate = new Date(2025, monthIndex, parseInt(selectedDate));

    // Add day offset (0 for day 1, 1 for day 2, etc.)
    const itineraryDate = new Date(startDate);
    itineraryDate.setDate(startDate.getDate() + (dayNumber - 1));

    // Format: Mon, 22 Sep
    return itineraryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };


  return (
    <>
      <div className="bg-[#f7f5f2]">
        <Header />
        <Head>
          <title>{`${destination.name} - TravelBuddy`}</title>
          <meta name="description" content={destination.shortDescription} />
        </Head>
           
        <main>
          {/* HERO SECTION (Full-width) */}
          <div className="relative h-[60vh] w-full">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              // 1. Set loop to false to stop it from restarting
              loop={false}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
                // 2. Add this line to pause when the user hovers over it
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              
              className="mySwiper h-full w-full"
            >
              {destination.carouselImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* MAIN CONTENT WRAPPER (Constrained to center) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30">
            {/* DETAILS CARD */}
            <div className="relative bg-white shadow-lg rounded-lg p-8 -mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  <h1 className="text-4xl font-bold text-gray-900">{destination.name}</h1>
                  <p className="text-lg text-gray-500 mt-1">{destination.subtitle}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 border-t border-b py-6">
                    <StatCard icon={<Calendar size={24} />} label="Duration" value={keyStats.duration} />
                    <StatCard icon={<Zap size={24} />} label="Difficulty" value={keyStats.difficulty} />
                    <StatCard icon={<Users size={24} />} label="Age Group" value={keyStats.ageGroup} />
                    <StatCard icon={<Mountain size={24} />} label="Max Altitude" value={keyStats.maxAltitude} />
                  </div>

                  {destination.importantUpdate && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8">
                      <h4 className="font-bold">Important Update</h4>
                      <p>{destination.importantUpdate}</p>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{destination.longDescription}</p>
                  {destination.brochureUrl && (
                    <a
                      href={destination.brochureUrl}
                      download
                      className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    >
                      <Download size={20} className="mr-2" /> Brochure
                    </a>
                  )}
                </div>

                {/* Right Column (Booking) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border">
                    <p className="text-gray-500">Starts from</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹ {destination.basePrice.toLocaleString('en-IN')} / person
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Includes</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Food</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Travelling</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Hotels</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> First Aid</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> GST</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="mt-6 w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CITY SELECTOR */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">Join us from</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {destination.departureCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    className={`p-4 rounded-lg text-left bg-white shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                      selectedCity === city.name ? 'border-orange-500 scale-105' : 'border-transparent'
                    }`}
                  >
                    <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                      <Image src={city.imageUrl} alt={city.name} layout="fill" objectFit="cover" />
                    </div>
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-gray-500">₹{city.price.toLocaleString('en-IN')}/-</p>
                    <p className="text-sm text-gray-500">{city.duration}</p>
                  </button>
                ))}
              </div>

              {/* MONTH SELECTOR */}
              {selectedCity && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-center mb-4">Dates from {selectedCity}</h3>
                  <div className="flex justify-center flex-wrap gap-4">
                    {availableMonths.map((month) => (
                      <button
                        key={month}
                        onClick={() => handleMonthSelect(selectedCity, month)}
                        className={`px-6 py-2 font-semibold rounded-md text-sm transition-colors duration-300 ${
                          selectedMonth === month
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-white text-gray-700 border hover:bg-orange-100'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DATE SELECTOR */}
              {selectedMonth && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                  <h4 className="font-bold text-center mb-4">Available Dates for {selectedMonth}</h4>
                  {filteredDates.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-4">
                      {filteredDates.map((day, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(day)}
                          className={`h-12 w-12 flex items-center justify-center rounded-full border-2 font-bold transition-colors duration-200 ${
                            selectedDate === day
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'border-orange-300 text-orange-500 hover:bg-orange-100'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No dates available for {selectedMonth}.</p>
                  )}
                </div>
              )}
            </div>

            {/* SCHEDULE (Dynamic per package) */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">Schedule</h2>
              {currentPackage && currentPackage.itinerary ? (
                <div className="relative border-l-2 border-orange-200 ml-4">
                  {currentPackage.itinerary.map((day, index) => (
                    <div key={index} className="mb-12 pl-12">
                      <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-orange-500 border-4 border-white"></div>
                      <p className="text-sm font-semibold text-orange-500">
                        DAY {day.day} - {getFormattedItineraryDate(day.day)}
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{day.title}</h3>
                      <p className="text-gray-600 mt-2">
                        {day.description}{' '}
                        <a href="#" className="text-orange-500 font-semibold">
                          Know more
                        </a>
                      </p>
                      <Image
                        src={day.imageUrl}
                        alt={day.title}
                        width={800}
                        height={500}
                        className="rounded-lg mt-4 shadow-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
                   <h4 className="font-bold text-lg">Please select a departure city and date.</h4>
                   <p>The detailed day-by-day schedule will appear here once you make a selection.</p>
                 </div>
              )}
            </div>

            {/* ATTRACTIONS */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.attractions.map((attraction) => (
                  <div key={attraction.name} className="relative rounded-lg overflow-hidden group">
                    <Image src={attraction.imageUrl} alt={attraction.name} width={500} height={400} objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-4 left-4 text-white text-xl font-bold">{attraction.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* POLICIES */}
            <div className="mt-16 mb-16 bg-white shadow-lg rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PolicyLink text="Inclusion & Exclusion" onClick={() => setIsInclusionModalOpen(true)} />
                <PolicyLink text="Things to Carry" />
                <PolicyLink text="Terms & Conditions" />
                <PolicyLink text="Cancellation Policy" />
                <PolicyLink text="Request a Call Back!" />
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER (Full-width) */}
        <Footer />
      </div>

      {/* MODALS */}
      {isBookingModalOpen && destination && (
        <BookingFlowModal destination={destination} onClose={() => setIsBookingModalOpen(false)} />
      )}
      {isInclusionModalOpen && (
        <InclusionExclusionModal
          inclusions={destination.inclusions}
          exclusions={destination.exclusions}
          onClose={() => setIsInclusionModalOpen(false)}
        />
      )}
    </>
  );
};

export default DestinationPage;