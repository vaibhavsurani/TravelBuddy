import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { destinations, Destination } from '@/data/destinations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingFlowModal from '@/components/BookingFlowModal';
import InclusionExclusionModal from '@/components/InclusionExclusionModal';
import { Calendar, Zap, Users, Mountain, ArrowRight, Download, Check, MessageSquare } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center space-x-3">
    <div className="text-[#C2461C]">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold text-gray-800 text-sm">{value}</p>
    </div>
  </div>
);

const PolicyLink = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="flex justify-between items-center w-full text-left p-4 rounded-md hover:bg-gray-100 transition group"
  >
    <span className="font-semibold text-gray-700 text-sm">{text}</span>
    <ArrowRight size={20} className="text-gray-400 group-hover:text-[#C2461C] transition" />
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

  // --- REVISED: CODE FOR STICKY BAR ---
  const [isBarVisible, setIsBarVisible] = useState(false);
  const joinUsSectionRef = useRef<HTMLDivElement>(null);
  const policiesSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 1. Don't run this effect if the destination data hasn't loaded yet.
    if (!destination) return;

    const handleScroll = () => {
      // 2. Safety check to ensure the referenced elements exist in the DOM.
      const joinUsEl = joinUsSectionRef.current;
      const policiesEl = policiesSectionRef.current;

      if (!joinUsEl || !policiesEl) return;

      const joinUsTop = joinUsEl.offsetTop;
      const policiesTop = policiesEl.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Condition: The bottom of the screen is between the "Join Us" and "Policies" sections.
      const shouldBeVisible =
        scrollY + windowHeight >= joinUsTop &&
        scrollY + windowHeight < policiesTop;
      
      // 3. Only update state if the visibility has actually changed.
      setIsBarVisible(prev => prev === shouldBeVisible ? prev : shouldBeVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call handler once on setup to check initial position
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // 4. Dependency: This effect will re-run ONLY when the `destination` data changes.
  }, [destination]);
  // --- END: REVISED CODE ---


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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
        
        <Head>
          <title>{`${destination.name} - TravelBuddy`}</title>
          <meta name="description" content={destination.shortDescription} />
        </Head>
        
        <main>
          {/* HERO SECTION (Full-width) */}
          <Header />
          <div className="relative h-[60vh] w-full -top-15">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              loop={false}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
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
          <div className="max-w-6xl mx-auto px-8 mt-14">
            {/* DETAILS CARD */}
            <div className="relative bg-white shadow-lg rounded-lg p-8 -mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  <h1 className="text-2xl font-md text-[#C2461C]">{destination.name}</h1>
                  <p className="text-base text-gray-500 mt-1">{destination.subtitle}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4 mt-8 text-gray-300 border-b pb-6">
                    <StatCard icon={<Calendar size={24} />} label="Duration" value={keyStats.duration} />
                    <StatCard icon={<Zap size={24} />} label="Difficulty" value={keyStats.difficulty} />
                    <StatCard icon={<Users size={24} />} label="Age Group" value={keyStats.ageGroup} />
                    <StatCard icon={<Mountain size={24} />} label="Max Altitude" value={keyStats.maxAltitude} />
                  </div>

                  {destination.importantUpdate && (
                    <div className="bg-red-100  border-red-500 text-gray-700 p-4 rounded-md mb-6">
                      <h4 className="font-md text-base">Important Update</h4>
                      <p className="text-sm">{destination.importantUpdate}</p>
                    </div>
                  )}

                  <h2 className="text-lg text-gray-700 font-md mb-1">About</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{destination.longDescription}</p>
                  {destination.brochureUrl && (
                    <a
                      href={destination.brochureUrl}
                      download
                      className="inline-flex items-center px-2 py-1.5 text-[#C2461C] border border-[#C2461C] rounded-md hover:bg-[#C2461C] hover:text-white transition text-sm"
                    >
                      <Download size={20} className="mr-2" /> Brochure
                    </a>
                  )}
                </div>

                {/* Right Column (Booking) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-white p-6 rounded-xl rounded-md shadow-md border border-gray-200">
                    <p className="text-sm text-gray-500">Starts from</p>
                    <p className="text-2xl font-md text-gray-900">
                      ₹ {destination.basePrice.toLocaleString('en-IN')} <span className="font-extralight text-sm text-gray-900">/ person</span>
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold mb-2 text-sm">Includes</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Food</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Travelling</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> Hotels</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> First Aid</span>
                        <span className="flex items-center"><Check size={16} className="mr-1 text-green-500" /> GST</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="mt-6 w-full bg-[#C2461C] text-white font-bold py-3 rounded-2xl hover:bg-[#C2461C]/80 transition text-sm focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CITY SELECTOR */}
            <div ref={joinUsSectionRef} className="mt-4 px-6">
              <div className="">
                <h2 className="text-2xl w-full text-left font-normal text-[#C2461C] text-center">Join us from</h2>
                
                <div className="flex overflow-x-auto gap-6 pb-4 pt-4 pr-2">
                  {destination.departureCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleCitySelect(city.name)}
                      className={`flex-shrink-0 w-48 h-50 p-4 rounded-2xl text-left bg-white shadow-md hover:shadow-xl transition-all duration-300 border-3 ${
                        selectedCity === city.name ? 'border-[#C2461C] scale-100' : 'border-transparent'
                      }`}
                    >
                      <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                        <Image src={city.imageUrl} alt={city.name} layout="fill" objectFit="cover" />
                      </div>
                      <h3 className="text-lg font-normal">{city.name}</h3>
                      <div className="w-full flex justify-between items-center">
                        <p className="text-xs text-gray-500">₹{city.price.toLocaleString('en-IN')}/-</p>
                        <p className="text-xs text-gray-500">{city.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white w-full items-left px-6 py-4 mt-2">
                {/* MONTH SELECTOR */}
                {selectedCity && (
                  <div className="">
                    <h3 className="text-md font-normal mb-4">Dates from {selectedCity}</h3>
                    <div className="flex flex-wrap gap-4">
                      {availableMonths.map((month) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(selectedCity, month)}
                          className={`px-2 py-1 font-normal rounded-sm text-sm transition-colors duration-300 ${
                            selectedMonth === month
                              ? 'bg-[#C2461C] text-white shadow-md focus:outline-none focus:ring-3 focus:ring-[#E9743C]/50'
                              : 'bg-white text-orange-600 border hover:bg-orange-600 hover:text-white'
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
                  <div className="mt-6 bg-white rounded-lg w-full mx-auto">
                    {filteredDates.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {filteredDates.map((day, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(day)}
                            className={`h-9 w-9 flex items-center justify-center rounded-full border-2 font-normal transition-colors duration-200 text-md ${
                              selectedDate === day
                                ? 'text-gray-700 border-[#C2461C] '
                                : 'text-gray-700 border-gray-300 hover:bg-orange-300'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No dates available for {selectedMonth}.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SCHEDULE (Dynamic per package) */}
            <div className="mt-4 px-2">
              <h2 className="text-xl px-4 font-normal text-[#C2461C] mb-4">Schedule</h2>
              {currentPackage && currentPackage.itinerary ? (
                <div className="relative border-l-2 border-orange-200 ml-4">
                  {currentPackage.itinerary.map((day, index) => (
                    <div key={index} className="mb-6 pl-6">
                      <div className="absolute -left-[4px] h-2 w-2 rounded-full bg-[#C2461C]"></div>
                      <p className="text-sm font-semibold text-gray-700">
                        DAY {day.day}<p className="inline text-sm font-normal text-gray-500"> • {getFormattedItineraryDate(day.day)}</p>
                      </p>
                      <h3 className="text-xl font-normal text-gray-7\900 mt-1">{day.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {day.description}{' '}
                        <a href="#" className="text-[#C2461C] font-normal">
                          Know more
                        </a>
                      </p>
                      <div className="w-full h-[1px] bg-gray-300 my-6 max-w-2xl"></div>
                      <div className="mt-4 max-w-[600px] max-h-[400px] rounded-lg overflow-hidden">
                        {day.imageUrl && (
                          <Image
                            src={day.imageUrl}
                            alt={day.title}
                            width={600}
                            height={400}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                  <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
                    <h4 className="font-bold text-base">Please select a departure city and date.</h4>
                    <p className="text-sm">The detailed day-by-day schedule will appear here once you make a selection.</p>
                  </div>
              )}
            </div>

            {/* ATTRACTIONS */}
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-2xl font-normal text-[#C2461C] mb-3">Attractions</h2>
              
              <div className="flex overflow-x-auto gap-6"> 
                {destination.attractions.map((attraction) => (
                  <div key={attraction.name} className="flex-shrink-0 w-64"> 
                    <Image 
                      src={attraction.imageUrl} 
                      alt={attraction.name} 
                      width={400} 
                      height={300}
                      className="rounded-2xl h-40 w-full object-cover" 
                    />
                    
                    <p className="mt-2 text-gray-800">{attraction.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* POLICIES */}
            <div ref={policiesSectionRef} className="mt-16 mb-16 bg-white shadow-lg rounded-lg p-8">
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

      {/* --- STICKY BOOKING BAR --- */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-3 py-1 z-40 transform transition-transform duration-300 ease-in-out ${
          isBarVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {destination && (
          <div className="max-w-6xl px-8 mx-auto flex justify-between items-center px-4">
            <div>
              
              <p className="font-bold text-lg text-gray-700">
                <p className="text-sm font-normal text-gray-500 inline">From   </p>
                ₹{destination.basePrice.toLocaleString('en-IN')}{' '}
                <span className="font-normal text-sm">/ person</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#C2461C] text-white font-normal py-2 px-3 rounded-lg hover:bg-[#C2461C]/80 transition text-md focus:outline-none focus:ring-4 focus:ring-[#E9743C]/50"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
      {/* --- END: BOOKING BAR --- */}
    </>
  );
};

export default DestinationPage;