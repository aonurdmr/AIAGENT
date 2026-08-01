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
import HuntingDogs        from '@/components/HuntingDogs';
import WaterTemp          from '@/components/WaterTemp';
import PollinatorGuide    from '@/components/PollinatorGuide';
import FishingLicense     from '@/components/FishingLicense';
import NatureJournal      from '@/components/NatureJournal';
import TrailConditions    from '@/components/TrailConditions';
import FlyFishing         from '@/components/FlyFishing';
import WildBoarGuide      from '@/components/WildBoarGuide';
import ThermalSpots       from '@/components/ThermalSpots';
import FishingWeather     from '@/components/FishingWeather';
import SpearFishing       from '@/components/SpearFishing';
import NightFishing       from '@/components/NightFishing';
import FishAnatomy        from '@/components/FishAnatomy';
import WeatherPatterns    from '@/components/WeatherPatterns';
import Phenology          from '@/components/Phenology';
import CarpFishing        from '@/components/CarpFishing';
import HerbGuide          from '@/components/HerbGuide';
import RiverFishing       from '@/components/RiverFishing';
import OutdoorCooking     from '@/components/OutdoorCooking';
import HuntingEthics     from '@/components/HuntingEthics';
import OpticsGuide       from '@/components/OpticsGuide';
import UVGuide           from '@/components/UVGuide';
import FishCooking       from '@/components/FishCooking';
import BearEncounter     from '@/components/BearEncounter';
import WolfGuide         from '@/components/WolfGuide';
import TurkeyHunting     from '@/components/TurkeyHunting';
import MusselGuide       from '@/components/MusselGuide';
import CampFireSafety    from '@/components/CampFireSafety';
import NightSky          from '@/components/NightSky';
import SeaFishDB         from '@/components/SeaFishDB';
import HikingGear        from '@/components/HikingGear';
import FishingKnots      from '@/components/FishingKnots';
import WildlifeSafety    from '@/components/WildlifeSafety';
import DeerGuide         from '@/components/DeerGuide';
import WeatherSafety     from '@/components/WeatherSafety';
import AquaticPlants     from '@/components/AquaticPlants';
import PhotoSpots        from '@/components/PhotoSpots';
import ButterflyGuide   from '@/components/ButterflyGuide';
import RockClimbing     from '@/components/RockClimbing';
import WildflowerGuide  from '@/components/WildflowerGuide';
import ForestBathing    from '@/components/ForestBathing';
import CaveGuide        from '@/components/CaveGuide';
import SnowSafety       from '@/components/SnowSafety';
import WildFoodGuide    from '@/components/WildFoodGuide';
import KayakGuide       from '@/components/KayakGuide';
import BinocularsGuide  from '@/components/BinocularsGuide';
import TurkeyNature     from '@/components/TurkeyNature';
import LakeFishing      from '@/components/LakeFishing';
import FishingRig       from '@/components/FishingRig';
import HuntingSeasons   from '@/components/HuntingSeasons';
import SeasonRecipes    from '@/components/SeasonRecipes';
import BirdSong         from '@/components/BirdSong';
import MarineLife       from '@/components/MarineLife';
import NatureCalendar   from '@/components/NatureCalendar';
import SoilGuide        from '@/components/SoilGuide';
import WindReading      from '@/components/WindReading';
import MountainSafety  from '@/components/MountainSafety';
import FishBehavior    from '@/components/FishBehavior';
import HuntingDogCare  from '@/components/HuntingDogCare';
import FishingLine       from '@/components/FishingLine';
import CampSiteSelector  from '@/components/CampSiteSelector';
import BirdMigrationMap  from '@/components/BirdMigrationMap';
import StarNavigation    from '@/components/StarNavigation';
import FishingJournal   from '@/components/FishingJournal';
import HuntingTraps      from '@/components/HuntingTraps';
import NaturePhotoTech  from '@/components/NaturePhotoTech';
import RiverMap           from '@/components/RiverMap';
import SeasonalCampFood  from '@/components/SeasonalCampFood';
import WeatherRead       from '@/components/WeatherRead';
import SeaFishing       from '@/components/SeaFishing';
import GunCare         from '@/components/GunCare';
import RaptorGuide      from '@/components/RaptorGuide';
import PlantIdentify    from '@/components/PlantIdentify';
import PredatorSafety   from '@/components/PredatorSafety';
import DivingGuide      from '@/components/DivingGuide';
import MapReading       from '@/components/MapReading';
import ForestTypes      from '@/components/ForestTypes';
import CurrentsGuide    from '@/components/CurrentsGuide';
import BigGameGuide     from '@/components/BigGameGuide';
import EmergencyCom     from '@/components/EmergencyCom';
import NatureScents     from '@/components/NatureScents';
import IceFishing       from '@/components/IceFishing';
import WildBerries      from '@/components/WildBerries';
import BirdCallGuide    from '@/components/BirdCallGuide';
import AnimalTracking   from '@/components/AnimalTracking';
import SurvivalFire     from '@/components/SurvivalFire';
import WaterSurvival    from '@/components/WaterSurvival';
import CampingKnots     from '@/components/CampingKnots';
import NightHunting     from '@/components/NightHunting';
import HunterCalendar   from '@/components/HunterCalendar';
import InsectFishing    from '@/components/InsectFishing';
import TideGuide        from '@/components/TideGuide';
import WildlifeSounds   from '@/components/WildlifeSounds';
import CampCooking      from '@/components/CampCooking';
import FishingStructure from '@/components/FishingStructure';
import ShelterBuilding  from '@/components/ShelterBuilding';
import HikingTrails     from '@/components/HikingTrails';
import AmmunitionGuide  from '@/components/AmmunitionGuide';
import SeasonFishing    from '@/components/SeasonFishing';
import CamouflageGuide  from '@/components/CamouflageGuide';
import FirstAidOutdoor  from '@/components/FirstAidOutdoor';
import FlyCastingGuide  from '@/components/FlyCastingGuide';
import WildlifePhoto    from '@/components/WildlifePhoto';
import BoatFishing      from '@/components/BoatFishing';
import MountainHunting  from '@/components/MountainHunting';
import ArcheryHunting   from '@/components/ArcheryHunting';
import WetlandBirding   from '@/components/WetlandBirding';
import TreeStand        from '@/components/TreeStand';
import WildEdibles      from '@/components/WildEdibles';
import CarpRigs         from '@/components/CarpRigs';
import BackpackGear     from '@/components/BackpackGear';
import FoxHunting      from '@/components/FoxHunting';
import RabbitHunting   from '@/components/RabbitHunting';
import SmokingFish     from '@/components/SmokingFish';
import DuckDecoys      from '@/components/DuckDecoys';
import CanoeGuide      from '@/components/CanoeGuide';
import WildBirdID      from '@/components/WildBirdID';
import ReedFishing     from '@/components/ReedFishing';
import ScentControl    from '@/components/ScentControl';
import SurfFishing     from '@/components/SurfFishing';
import SpinFishing     from '@/components/SpinFishing';
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
        <Route path="/av-kopek"      element={<HuntingDogs />} />
        <Route path="/su-sicak"      element={<WaterTemp />} />
        <Route path="/tozlasici"     element={<PollinatorGuide />} />
        <Route path="/ruhsat"        element={<FishingLicense />} />
        <Route path="/gunlugum"      element={<NatureJournal />} />
        <Route path="/parkur-durum"  element={<TrailConditions />} />
        <Route path="/sinek-av"      element={<FlyFishing />} />
        <Route path="/yaban-domuz"   element={<WildBoarGuide />} />
        <Route path="/termal"        element={<ThermalSpots />} />
        <Route path="/balik-hava"    element={<FishingWeather />} />
        <Route path="/zipkin"        element={<SpearFishing />} />
        <Route path="/gece-av"       element={<NightFishing />} />
        <Route path="/balik-anatomi" element={<FishAnatomy />} />
        <Route path="/hava-desen"    element={<WeatherPatterns />} />
        <Route path="/fenoloji"      element={<Phenology />} />
        <Route path="/sazan"         element={<CarpFishing />} />
        <Route path="/sifali"        element={<HerbGuide />} />
        <Route path="/irmak"         element={<RiverFishing />} />
        <Route path="/kamp-pisir"    element={<OutdoorCooking />} />
        <Route path="/av-etik"       element={<HuntingEthics />} />
        <Route path="/optik"         element={<OpticsGuide />} />
        <Route path="/uv-rehber"     element={<UVGuide />} />
        <Route path="/balik-pis"     element={<FishCooking />} />
        <Route path="/ayi-karsi"     element={<BearEncounter />} />
        <Route path="/kurt"          element={<WolfGuide />} />
        <Route path="/tuy-av"        element={<TurkeyHunting />} />
        <Route path="/kabuklu"       element={<MusselGuide />} />
        <Route path="/kamp-ates"     element={<CampFireSafety />} />
        <Route path="/gece-gokyuzu"  element={<NightSky />} />
        <Route path="/deniz-balik"   element={<SeaFishDB />} />
        <Route path="/yuruyus-gear"  element={<HikingGear />} />
        <Route path="/dugumler"      element={<FishingKnots />} />
        <Route path="/dogada-guvenlik" element={<WildlifeSafety />} />
        <Route path="/geyik"          element={<DeerGuide />} />
        <Route path="/hava-tehlike"   element={<WeatherSafety />} />
        <Route path="/su-bitkileri"   element={<AquaticPlants />} />
        <Route path="/foto-noktalar"  element={<PhotoSpots />} />
        <Route path="/kelebek"        element={<ButterflyGuide />} />
        <Route path="/kaya-tirmanis" element={<RockClimbing />} />
        <Route path="/yabani-cicek"  element={<WildflowerGuide />} />
        <Route path="/orman-banyo"   element={<ForestBathing />} />
        <Route path="/magara"        element={<CaveGuide />} />
        <Route path="/kar-guvenlik"  element={<SnowSafety />} />
        <Route path="/yabani-gida"   element={<WildFoodGuide />} />
        <Route path="/kayak"         element={<KayakGuide />} />
        <Route path="/durbun"        element={<BinocularsGuide />} />
        <Route path="/turkiye-doga"  element={<TurkeyNature />} />
        <Route path="/gol-balik"     element={<LakeFishing />} />
        <Route path="/rig-kurulum"   element={<FishingRig />} />
        <Route path="/av-sezon"      element={<HuntingSeasons />} />
        <Route path="/mevsim-tarif"  element={<SeasonRecipes />} />
        <Route path="/kus-sesleri"   element={<BirdSong />} />
        <Route path="/deniz-canlı"   element={<MarineLife />} />
        <Route path="/doga-takvim"   element={<NatureCalendar />} />
        <Route path="/zemin"          element={<SoilGuide />} />
        <Route path="/ruzgar-oku"     element={<WindReading />} />
        <Route path="/dag-guvenlik"   element={<MountainSafety />} />
        <Route path="/balik-davranis" element={<FishBehavior />} />
        <Route path="/av-kopek-bakim" element={<HuntingDogCare />} />
        <Route path="/misina"         element={<FishingLine />} />
        <Route path="/kamp-yer"       element={<CampSiteSelector />} />
        <Route path="/goc-harita"     element={<BirdMigrationMap />} />
        <Route path="/yildiz-nav"     element={<StarNavigation />} />
        <Route path="/gunluk-pro"     element={<FishingJournal />} />
        <Route path="/tuzak"          element={<HuntingTraps />} />
        <Route path="/foto-teknik"    element={<NaturePhotoTech />} />
        <Route path="/nehir-harita"   element={<RiverMap />} />
        <Route path="/mevsim-kamp"    element={<SeasonalCampFood />} />
        <Route path="/hava-oku"       element={<WeatherRead />} />
        <Route path="/deniz-av"       element={<SeaFishing />} />
        <Route path="/silah-bakim"    element={<GunCare />} />
        <Route path="/yirtici-kuslar" element={<RaptorGuide />} />
        <Route path="/bitki-tanima"   element={<PlantIdentify />} />
        <Route path="/yirtici-karsi"  element={<PredatorSafety />} />
        <Route path="/dalis"          element={<DivingGuide />} />
        <Route path="/harita-oku"     element={<MapReading />} />
        <Route path="/orman-tipi"     element={<ForestTypes />} />
        <Route path="/akinti"         element={<CurrentsGuide />} />
        <Route path="/buyuk-av"       element={<BigGameGuide />} />
        <Route path="/acil-haberlesme" element={<EmergencyCom />} />
        <Route path="/doga-koku"      element={<NatureScents />} />
        <Route path="/buz-balik"      element={<IceFishing />} />
        <Route path="/yabani-meyve"   element={<WildBerries />} />
        <Route path="/kus-sesi-rehber" element={<BirdCallGuide />} />
        <Route path="/iz-takip"       element={<AnimalTracking />} />
        <Route path="/hayatta-ates"   element={<SurvivalFire />} />
        <Route path="/su-aritma"      element={<WaterSurvival />} />
        <Route path="/kamp-dugum"     element={<CampingKnots />} />
        <Route path="/gece-av-teknik" element={<NightHunting />} />
        <Route path="/avci-takvim"    element={<HunterCalendar />} />
        <Route path="/yem-rehber"     element={<InsectFishing />} />
        <Route path="/gelgit"         element={<TideGuide />} />
        <Route path="/yaban-ses"      element={<WildlifeSounds />} />
        <Route path="/kamp-yemek"     element={<CampCooking />} />
        <Route path="/balik-yapi"     element={<FishingStructure />} />
        <Route path="/siginak-yap"    element={<ShelterBuilding />} />
        <Route path="/yuruyus"        element={<HikingTrails />} />
        <Route path="/mermi-rehber"   element={<AmmunitionGuide />} />
        <Route path="/mevsim-balik"   element={<SeasonFishing />} />
        <Route path="/kamuflaj"       element={<CamouflageGuide />} />
        <Route path="/doga-ilk-yardim" element={<FirstAidOutdoor />} />
        <Route path="/sinek-casting"  element={<FlyCastingGuide />} />
        <Route path="/yaban-foto"     element={<WildlifePhoto />} />
        <Route path="/tekne-balik"    element={<BoatFishing />} />
        <Route path="/dag-avi"        element={<MountainHunting />} />
        <Route path="/ok-avcilik"     element={<ArcheryHunting />} />
        <Route path="/sulak-kus"      element={<WetlandBirding />} />
        <Route path="/pusu-rehber"    element={<TreeStand />} />
        <Route path="/yabani-besin"   element={<WildEdibles />} />
        <Route path="/sazan-rig"      element={<CarpRigs />} />
        <Route path="/sirt-cantasi"   element={<BackpackGear />} />
        <Route path="/tilki-av"       element={<FoxHunting />} />
        <Route path="/tavsan-av"      element={<RabbitHunting />} />
        <Route path="/balik-tutsule"  element={<SmokingFish />} />
        <Route path="/ordek-heykel"   element={<DuckDecoys />} />
        <Route path="/kano-rehber"    element={<CanoeGuide />} />
        <Route path="/kus-tanimi"     element={<WildBirdID />} />
        <Route path="/sazlik-balik"   element={<ReedFishing />} />
        <Route path="/koku-kontrol"   element={<ScentControl />} />
        <Route path="/kiyi-balik"     element={<SurfFishing />} />
        <Route path="/spinner-balik"  element={<SpinFishing />} />
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
