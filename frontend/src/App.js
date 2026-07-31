import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Home         from '@/components/Home';
import AIIdentify   from '@/components/AIIdentify';
import MapView      from '@/components/MapView';
import Community    from '@/components/Community';
import ActivityLog  from '@/components/ActivityLog';
import AIChat       from '@/components/AIChat';
import Profile      from '@/components/Profile';
import Login        from '@/components/Login';
import Navbar       from '@/components/Navbar';
import AgentCenter  from '@/components/AgentCenter';
import Planner      from '@/components/Planner';
import SpeciesDB    from '@/components/SpeciesDB';
import NLPTools     from '@/components/NLPTools';
import ImageGen     from '@/components/ImageGen';
import Equipment    from '@/components/Equipment';
import Leaderboard  from '@/components/Leaderboard';
import Search       from '@/components/Search';
import WeatherDetail from '@/components/WeatherDetail';
import Analytics      from '@/components/Analytics';
import Notifications  from '@/components/Notifications';
import Achievements      from '@/components/Achievements';
import SeasonalCalendar from '@/components/SeasonalCalendar';
import Notes           from '@/components/Notes';
import Settings         from '@/components/Settings';
import Recommendations  from '@/components/Recommendations';
import Checklist       from '@/components/Checklist';
import TripReport      from '@/components/TripReport';
import TrophyCabinet   from '@/components/TrophyCabinet';
import FishCalc        from '@/components/FishCalc';
import BaitGuide       from '@/components/BaitGuide';
import MoonCalendar    from '@/components/MoonCalendar';
import KnotGuide       from '@/components/KnotGuide';
import RecipeBook      from '@/components/RecipeBook';
import SpeciesCompare  from '@/components/SpeciesCompare';
import FishingLaws     from '@/components/FishingLaws';
import GearSelector    from '@/components/GearSelector';
import DailyBriefing   from '@/components/DailyBriefing';
import HuntingCalendar from '@/components/HuntingCalendar';
import CampingGuide    from '@/components/CampingGuide';
import TrailFinder     from '@/components/TrailFinder';
import BirdWatching   from '@/components/BirdWatching';
import PlantGuide      from '@/components/PlantGuide';
import EmergencyGuide  from '@/components/EmergencyGuide';
import WaterSports     from '@/components/WaterSports';
import WeatherTrends   from '@/components/WeatherTrends';
import WildlifeLog     from '@/components/WildlifeLog';
import SpotMap         from '@/components/SpotMap';
import FishSeason      from '@/components/FishSeason';
import RigCalculator   from '@/components/RigCalculator';
import HuntingGear     from '@/components/HuntingGear';
import FieldNotes      from '@/components/FieldNotes';
import NatureSounds    from '@/components/NatureSounds';
import TideCalc        from '@/components/TideCalc';
import WeatherStation  from '@/components/WeatherStation';
import FishDB          from '@/components/FishDB';
import SunTracker      from '@/components/SunTracker';
import HuntingZones    from '@/components/HuntingZones';
import FishingSpots    from '@/components/FishingSpots';
import WeatherForecast from '@/components/WeatherForecast';
import LureGuide       from '@/components/LureGuide';
import NatureQuiz      from '@/components/NatureQuiz';
import Tournament      from '@/components/Tournament';
import NationalParks   from '@/components/NationalParks';
import FirstAid        from '@/components/FirstAid';
import CampingChecklist from '@/components/CampingChecklist';
import FishSizeGuide   from '@/components/FishSizeGuide';
import AnimalTracks    from '@/components/AnimalTracks';
import MushroomGuide   from '@/components/MushroomGuide';
import StarMap         from '@/components/StarMap';
import SnakeGuide      from '@/components/SnakeGuide';
import WaterQuality    from '@/components/WaterQuality';
import HuntingLaws       from '@/components/HuntingLaws';
import WeatherCompare    from '@/components/WeatherCompare';
import FishingDiary      from '@/components/FishingDiary';
import PopulationTracker from '@/components/PopulationTracker';
import FishingForecast   from '@/components/FishingForecast';
import CampingMap        from '@/components/CampingMap';
import InsectGuide       from '@/components/InsectGuide';
import SeasonAlerts      from '@/components/SeasonAlerts';
import FishWeightCalc    from '@/components/FishWeightCalc';
import SurvivalGuide     from '@/components/SurvivalGuide';
import BaitShopFinder   from '@/components/BaitShopFinder';
import CatchPhotoAlbum  from '@/components/CatchPhotoAlbum';
import MarineWeather    from '@/components/MarineWeather';
import INaturalist      from '@/components/INaturalist';
import GBIFSpecies      from '@/components/GBIFSpecies';
import AirQuality       from '@/components/AirQuality';
import NasaAPOD           from '@/components/NasaAPOD';
import ElevationMap       from '@/components/ElevationMap';
import EarthquakeTracker  from '@/components/EarthquakeTracker';
import GoldenHour         from '@/components/GoldenHour';
import RiverWatch         from '@/components/RiverWatch';
import HuntingWeapons     from '@/components/HuntingWeapons';
import FishRecipes        from '@/components/FishRecipes';
import CampingRecipes     from '@/components/CampingRecipes';
import WeatherAlert       from '@/components/WeatherAlert';
import FishingTips        from '@/components/FishingTips';
import HuntingCountdown   from '@/components/HuntingCountdown';
import GearPack           from '@/components/GearPack';
import PersonalBest       from '@/components/PersonalBest';
import WindForecast       from '@/components/WindForecast';
import BirdMigration      from '@/components/BirdMigration';
import FishingRegulations from '@/components/FishingRegulations';
import FireGuide          from '@/components/FireGuide';
import InvasiveSpecies    from '@/components/InvasiveSpecies';
import StargazingGuide    from '@/components/StargazingGuide';
import SpeciesOfDay       from '@/components/SpeciesOfDay';
import NaturePhotography  from '@/components/NaturePhotography';
import GPSTools           from '@/components/GPSTools';
import { ToastProvider } from '@/components/Toast';
import '@/App.css';

const HIDE_NAV = ['/ai-asistan', '/giris', '/ajanlar'];

function AppInner() {
  const location = useLocation();
  const hideNav  = HIDE_NAV.some(p => location.pathname.startsWith(p));

  return (
    <div className="app-container">
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/tani"        element={<AIIdentify />} />
        <Route path="/harita"      element={<MapView />} />
        <Route path="/topluluk"    element={<Community />} />
        <Route path="/aktivite"    element={<ActivityLog />} />
        <Route path="/ai-asistan"  element={<AIChat />} />
        <Route path="/profil"      element={<Profile />} />
        <Route path="/giris"       element={<Login />} />
        <Route path="/ajanlar"     element={<AgentCenter />} />
        <Route path="/planlama"    element={<Planner />} />
        <Route path="/turler"      element={<SpeciesDB />} />
        <Route path="/nlp"         element={<NLPTools />} />
        <Route path="/gorsel"      element={<ImageGen />} />
        <Route path="/ekipman"     element={<Equipment />} />
        <Route path="/liderboard"  element={<Leaderboard />} />
        <Route path="/arama"       element={<Search />} />
        <Route path="/hava"        element={<WeatherDetail />} />
        <Route path="/analiz"      element={<Analytics />} />
        <Route path="/bildirimler" element={<Notifications />} />
        <Route path="/basarilar"   element={<Achievements />} />
        <Route path="/takvim"      element={<SeasonalCalendar />} />
        <Route path="/notlar"      element={<Notes />} />
        <Route path="/ayarlar"     element={<Settings />} />
        <Route path="/oneri"       element={<Recommendations />} />
        <Route path="/kontrol"     element={<Checklist />} />
        <Route path="/rapor"       element={<TripReport />} />
        <Route path="/kupalar"     element={<TrophyCabinet />} />
        <Route path="/hesap"       element={<FishCalc />} />
        <Route path="/yem"         element={<BaitGuide />} />
        <Route path="/ay"          element={<MoonCalendar />} />
        <Route path="/dugum"       element={<KnotGuide />} />
        <Route path="/tarifler"    element={<RecipeBook />} />
        <Route path="/karsilastir" element={<SpeciesCompare />} />
        <Route path="/kanun"       element={<FishingLaws />} />
        <Route path="/setup"       element={<GearSelector />} />
        <Route path="/brifing"     element={<DailyBriefing />} />
        <Route path="/av-takvim"   element={<HuntingCalendar />} />
        <Route path="/kamp"        element={<CampingGuide />} />
        <Route path="/rotalar"     element={<TrailFinder />} />
        <Route path="/kuslar"      element={<BirdWatching />} />
        <Route path="/bitkiler"    element={<PlantGuide />} />
        <Route path="/acil"        element={<EmergencyGuide />} />
        <Route path="/su-sporlari" element={<WaterSports />} />
        <Route path="/trend"       element={<WeatherTrends />} />
        <Route path="/gunluk"      element={<WildlifeLog />} />
        <Route path="/noktalar"    element={<SpotMap />} />
        <Route path="/sezon"       element={<FishSeason />} />
        <Route path="/olta"        element={<RigCalculator />} />
        <Route path="/av-ekipman"  element={<HuntingGear />} />
        <Route path="/saha"        element={<FieldNotes />} />
        <Route path="/sesler"      element={<NatureSounds />} />
        <Route path="/gelgit"      element={<TideCalc />} />
        <Route path="/istasyon"    element={<WeatherStation />} />
        <Route path="/balik-db"    element={<FishDB />} />
        <Route path="/gun"         element={<SunTracker />} />
        <Route path="/av-bolge"    element={<HuntingZones />} />
        <Route path="/balik-nokta" element={<FishingSpots />} />
        <Route path="/tahmin"      element={<WeatherForecast />} />
        <Route path="/sahte-yem"   element={<LureGuide />} />
        <Route path="/quiz"         element={<NatureQuiz />} />
        <Route path="/turnuva"      element={<Tournament />} />
        <Route path="/milli-park"   element={<NationalParks />} />
        <Route path="/ilk-yardim"   element={<FirstAid />} />
        <Route path="/kamp-liste"   element={<CampingChecklist />} />
        <Route path="/boy-kilavuz"  element={<FishSizeGuide />} />
        <Route path="/izler"        element={<AnimalTracks />} />
        <Route path="/mantar"       element={<MushroomGuide />} />
        <Route path="/yildizlar"    element={<StarMap />} />
        <Route path="/surungen"     element={<SnakeGuide />} />
        <Route path="/su-kalite"    element={<WaterQuality />} />
        <Route path="/av-kanun"     element={<HuntingLaws />} />
        <Route path="/hava-karsi"   element={<WeatherCompare />} />
        <Route path="/balik-gunluk" element={<FishingDiary />} />
        <Route path="/populasyon"   element={<PopulationTracker />} />
        <Route path="/balik-tahmin" element={<FishingForecast />} />
        <Route path="/kamp-harita"  element={<CampingMap />} />
        <Route path="/bocekler"     element={<InsectGuide />} />
        <Route path="/sezon-uyari"  element={<SeasonAlerts />} />
        <Route path="/kilo"         element={<FishWeightCalc />} />
        <Route path="/hayatta-kal"  element={<SurvivalGuide />} />
        <Route path="/yem-bul"      element={<BaitShopFinder />} />
        <Route path="/foto-album"   element={<CatchPhotoAlbum />} />
        <Route path="/deniz-hava"   element={<MarineWeather />} />
        <Route path="/gozlemler"    element={<INaturalist />} />
        <Route path="/gbif"         element={<GBIFSpecies />} />
        <Route path="/hava-kalite"  element={<AirQuality />} />
        <Route path="/nasa-apod"    element={<NasaAPOD />} />
        <Route path="/yukseklik"    element={<ElevationMap />} />
        <Route path="/deprem"       element={<EarthquakeTracker />} />
        <Route path="/altin-saat"   element={<GoldenHour />} />
        <Route path="/nehir"        element={<RiverWatch />} />
        <Route path="/silah"        element={<HuntingWeapons />} />
        <Route path="/balik-tarif"  element={<FishRecipes />} />
        <Route path="/kamp-yemek"   element={<CampingRecipes />} />
        <Route path="/hava-uyari"    element={<WeatherAlert />} />
        <Route path="/ipuclari"      element={<FishingTips />} />
        <Route path="/geri-sayim"    element={<HuntingCountdown />} />
        <Route path="/paket"         element={<GearPack />} />
        <Route path="/rekor"         element={<PersonalBest />} />
        <Route path="/ruzgar"        element={<WindForecast />} />
        <Route path="/goc"           element={<BirdMigration />} />
        <Route path="/mevzuat2"      element={<FishingRegulations />} />
        <Route path="/ates"          element={<FireGuide />} />
        <Route path="/istilaci"      element={<InvasiveSpecies />} />
        <Route path="/gozlem"        element={<StargazingGuide />} />
        <Route path="/gunun-turu"    element={<SpeciesOfDay />} />
        <Route path="/dogal-fotograf" element={<NaturePhotography />} />
        <Route path="/gps"           element={<GPSTools />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppInner />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
