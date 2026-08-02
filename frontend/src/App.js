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
import PheasantHunting from '@/components/PheasantHunting';
import QuailCalling    from '@/components/QuailCalling';
import DeerScouting    from '@/components/DeerScouting';
import TrollingGuide   from '@/components/TrollingGuide';
import FishAttractor   from '@/components/FishAttractor';
import NightBirds      from '@/components/NightBirds';
import TrailCamera     from '@/components/TrailCamera';
import WetlandGuide    from '@/components/WetlandGuide';
import BoarCooking     from '@/components/BoarCooking';
import SurvivalNav     from '@/components/SurvivalNav';
import WinterHunting   from '@/components/WinterHunting';
import CrayfishGuide   from '@/components/CrayfishGuide';
import HuntingBlind    from '@/components/HuntingBlind';
import MedFish         from '@/components/MedFish';
import SaltLick        from '@/components/SaltLick';
import RiverReading    from '@/components/RiverReading';
import CatchRelease    from '@/components/CatchRelease';
import HikingNutrition from '@/components/HikingNutrition';
import CampHygiene     from '@/components/CampHygiene';
import AlpineGuide     from '@/components/AlpineGuide';
import BatObserve      from '@/components/BatObserve';
import ArtificialReef  from '@/components/ArtificialReef';
import GrasslandBirds  from '@/components/GrasslandBirds';
import TroutFishing    from '@/components/TroutFishing';
import PhotoHide       from '@/components/PhotoHide';
import TreeIdentify    from '@/components/TreeIdentify';
import NaturalCamo     from '@/components/NaturalCamo';
import BirdHouse       from '@/components/BirdHouse';
import BeeSafety       from '@/components/BeeSafety';
import TrailRunning    from '@/components/TrailRunning';
import LakeEcology     from '@/components/LakeEcology';
import MigratoryFish   from '@/components/MigratoryFish';
import WildCamping     from '@/components/WildCamping';
import SeabirdGuide    from '@/components/SeabirdGuide';
import HuntingEthicsAdv from '@/components/HuntingEthicsAdv';
import SeasonalBirding from '@/components/SeasonalBirding';
import CarpBoilies     from '@/components/CarpBoilies';
import WaterBirds      from '@/components/WaterBirds';
import FeatherGuide    from '@/components/FeatherGuide';
import BoarScent       from '@/components/BoarScent';
import ShoreFishing    from '@/components/ShoreFishing';
import OwlGuide        from '@/components/OwlGuide';
import RiverEcology    from '@/components/RiverEcology';
import AmphibianGuide  from '@/components/AmphibianGuide';
import DogTraining     from '@/components/DogTraining';
import SeaKayak        from '@/components/SeaKayak';
import MushroomSafety  from '@/components/MushroomSafety';
import HighSeas        from '@/components/HighSeas';
import SaltMarsh       from '@/components/SaltMarsh';
import FishingPhysics  from '@/components/FishingPhysics';
import LizardGuide     from '@/components/LizardGuide';
import BiodiversitySpots from '@/components/BiodiversitySpots';
import WildBoarHunting from '@/components/WildBoarHunting';
import NightSkyCamp    from '@/components/NightSkyCamp';
import SaltwaterFly    from '@/components/SaltwaterFly';
import WinterCamp      from '@/components/WinterCamp';
import ForestForaging  from '@/components/ForestForaging';
import OctopusGuide    from '@/components/OctopusGuide';
import DeerCallers     from '@/components/DeerCallers';
import BoatMaintenance from '@/components/BoatMaintenance';
import CatfishGuide    from '@/components/CatfishGuide';
import BeeKeeping      from '@/components/BeeKeeping';
import EelGuide        from '@/components/EelGuide';
import CloudReading    from '@/components/CloudReading';
import HawkWatch       from '@/components/HawkWatch';
import MossGuide       from '@/components/MossGuide';
import FrogBait        from '@/components/FrogBait';
import TunaGuide       from '@/components/TunaGuide';
import OysterCollect   from '@/components/OysterCollect';
import WormFarming     from '@/components/WormFarming';
import BoarSign        from '@/components/BoarSign';
import RiverSwimming   from '@/components/RiverSwimming';
import WildHoney       from '@/components/WildHoney';
import SpiderSafety    from '@/components/SpiderSafety';
import FishingKayak    from '@/components/FishingKayak';
import CoastalForaging from '@/components/CoastalForaging';
import LandNavigation  from '@/components/LandNavigation';
import SeasonalFood    from '@/components/SeasonalFood';
import BirdNesting     from '@/components/BirdNesting';
import FishingLine2    from '@/components/FishingLine2';
import ThermalHunting  from '@/components/ThermalHunting';
import LureMaking      from '@/components/LureMaking';
import WildTurkey      from '@/components/WildTurkey';
import SeaSnail        from '@/components/SeaSnail';
import CrabFishing     from '@/components/CrabFishing';
import NightHiking     from '@/components/NightHiking';
import SquidFishing    from '@/components/SquidFishing';
import SandstormSafe   from '@/components/SandstormSafe';
import CampTarp        from '@/components/CampTarp';
import WildGoose       from '@/components/WildGoose';
import MarineKnots     from '@/components/MarineKnots';
import GarfishGuide    from '@/components/GarfishGuide';
import UrchinCollect   from '@/components/UrchinCollect';
import BackcountrySkiing from '@/components/BackcountrySkiing';
import MosquitoSafety  from '@/components/MosquitoSafety';
import PheasantCook    from '@/components/PheasantCook';
import BeachCasting    from '@/components/BeachCasting';
import WaterSnake      from '@/components/WaterSnake';
import RayGuide        from '@/components/RayGuide';
import CampLantern     from '@/components/CampLantern';
import HuntingEthics2  from '@/components/HuntingEthics2';
import RockpoolGuide   from '@/components/RockpoolGuide';
import SunfishGuide    from '@/components/SunfishGuide';
import MountainGoat    from '@/components/MountainGoat';
import TidePoolSafety  from '@/components/TidePoolSafety';
import BowHunting      from '@/components/BowHunting';
import SeaweedGuide    from '@/components/SeaweedGuide';
import LakeSwimming    from '@/components/LakeSwimming';
import DragonFlyGuide  from '@/components/DragonFlyGuide';
import SaltwaterFishing from '@/components/SaltwaterFishing';
import CampingFood     from '@/components/CampingFood';
import NightCamping    from '@/components/NightCamping';
import WoodlandBirds   from '@/components/WoodlandBirds';
import NightVision     from '@/components/NightVision';
import DuckCooking     from '@/components/DuckCooking';
import SharkGuide      from '@/components/SharkGuide';
import CanyonHiking    from '@/components/CanyonHiking';
import PartridgeHunt   from '@/components/PartridgeHunt';
import CoralGuide      from '@/components/CoralGuide';
import WildSalad       from '@/components/WildSalad';
import CampingGas      from '@/components/CampingGas';
import WildFlowerID    from '@/components/WildFlowerID';
import SummerCamping   from '@/components/SummerCamping';
import PikeFishing     from '@/components/PikeFishing';
import RainFishing     from '@/components/RainFishing';
import HikingSnacks    from '@/components/HikingSnacks';
import BeachCombing    from '@/components/BeachCombing';
import CormorantGuide  from '@/components/CormorantGuide';
import ElkCalling      from '@/components/ElkCalling';
import FernGuide       from '@/components/FernGuide';
import FishSmoking     from '@/components/FishSmoking';
import RiverBirds      from '@/components/RiverBirds';
import NightSwimming   from '@/components/NightSwimming';
import SpringFishing   from '@/components/SpringFishing';
import MudFishing      from '@/components/MudFishing';
import OwlWatching     from '@/components/OwlWatching';
import WildBoarTrack   from '@/components/WildBoarTrack';
import SeabassGuide    from '@/components/SeabassGuide';
import WinterCamping   from '@/components/WinterCamping';
import WildMushroomID  from '@/components/WildMushroomID';
import FlyfishingGuide from '@/components/FlyfishingGuide';
import BearSafety      from '@/components/BearSafety';
import TroutCooking    from '@/components/TroutCooking';
import MigrationBirds  from '@/components/MigrationBirds';
import CliffFishing     from '@/components/CliffFishing';
import CampfireFood     from '@/components/CampfireFood';
import WolfTracking     from '@/components/WolfTracking';
import MoonFishing      from '@/components/MoonFishing';
import MountainHerbalism from '@/components/MountainHerbalism';
import TurkeyCooking    from '@/components/TurkeyCooking';
import CaveExploring    from '@/components/CaveExploring';
import WaterPurify      from '@/components/WaterPurify';
import TidalFishing     from '@/components/TidalFishing';
import SunriseHiking    from '@/components/SunriseHiking';
import SeaKayaking      from '@/components/SeaKayaking';
import DeerTracking     from '@/components/DeerTracking';
import AutumnBirding    from '@/components/AutumnBirding';
import LobsterGuide     from '@/components/LobsterGuide';
import AnchoryFishing   from '@/components/AnchoryFishing';
import CampingHygiene   from '@/components/CampingHygiene';
import WildBoarCooking  from '@/components/WildBoarCooking';
import TurtleWatching   from '@/components/TurtleWatching';
import IceHiking        from '@/components/IceHiking';
import WaterFowlDecoy   from '@/components/WaterFowlDecoy';
import MossBiodiversity from '@/components/MossBiodiversity';
import TunnelFishing    from '@/components/TunnelFishing';
import HighAltitudeHiking from '@/components/HighAltitudeHiking';
import MackerelFishing  from '@/components/MackerelFishing';
import BoulderingGuide  from '@/components/BoulderingGuide';
import WildHerbs        from '@/components/WildHerbs';
import SunfishFishing   from '@/components/SunfishFishing';
import HazardousBees    from '@/components/HazardousBees';
import RiverCrossing    from '@/components/RiverCrossing';
import LichenGuide      from '@/components/LichenGuide';
import HawkWatching     from '@/components/HawkWatching';
import MusselCooking    from '@/components/MusselCooking';
import SnowShoeHiking   from '@/components/SnowShoeHiking';
import WetlandsBirds    from '@/components/WetlandsBirds';
import WildCarrot       from '@/components/WildCarrot';
import DeltaPlaning     from '@/components/DeltaPlaning';
import MinkTracking     from '@/components/MinkTracking';
import SeaTurtleDive    from '@/components/SeaTurtleDive';
import WildTeaGuide     from '@/components/WildTeaGuide';
import ForestFungi      from '@/components/ForestFungi';
import ScorpionGuide    from '@/components/ScorpionGuide';
import AlpineFlowers    from '@/components/AlpineFlowers';
import RiverFishingMap  from '@/components/RiverFishingMap';
import NightSkyGuide    from '@/components/NightSkyGuide';
import GrassSnakeGuide  from '@/components/GrassSnakeGuide';
import SqouidFishing    from '@/components/SqouidFishing';
import OwlNesting       from '@/components/OwlNesting';
import IceClimbing      from '@/components/IceClimbing';
import WildBoarCookbook from '@/components/WildBoarCookbook';
import TigerMosquito   from '@/components/TigerMosquito';
import FreshwaterCrab  from '@/components/FreshwaterCrab';
import CaveDiving      from '@/components/CaveDiving';
import AutumnHarvest   from '@/components/AutumnHarvest';
import SandDunes       from '@/components/SandDunes';
import WolfBehavior    from '@/components/WolfBehavior';
import TroutFarm       from '@/components/TroutFarm';
import MossIdentify    from '@/components/MossIdentify';
import SpiderGuide     from '@/components/SpiderGuide';
import DolphinWatch    from '@/components/DolphinWatch';
import WildGarlic      from '@/components/WildGarlic';
import MulletFishing   from '@/components/MulletFishing';
import LynxTracking    from '@/components/LynxTracking';
import ShrimpFishing   from '@/components/ShrimpFishing';
import GeologyHike     from '@/components/GeologyHike';
import EelFishing      from '@/components/EelFishing';
import WildBirdCall    from '@/components/WildBirdCall';
import WildRaspberry   from '@/components/WildRaspberry';
import SeaBreem        from '@/components/SeaBreem';
import SalmonFishing   from '@/components/SalmonFishing';
import TrufflHunt      from '@/components/TrufflHunt';
import SeagullWatch    from '@/components/SeagullWatch';
import BatWatch        from '@/components/BatWatch';
import OctoFishing     from '@/components/OctoFishing';
import HighlandGrazing from '@/components/HighlandGrazing';
import PelicanWatch    from '@/components/PelicanWatch';
import WildBoarBehavior from '@/components/WildBoarBehavior';
import FrogGuide       from '@/components/FrogGuide';
import TigerFishing    from '@/components/TigerFishing';
import MediterSeaFood  from '@/components/MediterSeaFood';
import MeadowEcology   from '@/components/MeadowEcology';
import StorkMigration  from '@/components/StorkMigration';
import SeaUrchin       from '@/components/SeaUrchin';
import RedDeerRut      from '@/components/RedDeerRut';
import EagleOwl        from '@/components/EagleOwl';
import WildThyme       from '@/components/WildThyme';
import CormorantWatch  from '@/components/CormorantWatch';
import BreamFishing    from '@/components/BreamFishing';
import FoxTracking     from '@/components/FoxTracking';
import WildNettle      from '@/components/WildNettle';
import WildSage        from '@/components/WildSage';
import HazelnutHarvest from '@/components/HazelnutHarvest';
import MigratoryBirds  from '@/components/MigratoryBirds';
import WildMushroom    from '@/components/WildMushroom';
import IbisWatch       from '@/components/IbisWatch';
import MarshFishing    from '@/components/MarshFishing';
import AlpineHike      from '@/components/AlpineHike';
import SeaBassGuide    from '@/components/SeaBassGuide';
import WildBerry       from '@/components/WildBerry';
import CampfireCooking from '@/components/CampfireCooking';
import WildRosehip    from '@/components/WildRosehip';
import TurkishPine    from '@/components/TurkishPine';
import WildBoar2      from '@/components/WildBoar2';
import MarineEcology  from '@/components/MarineEcology';
import SpringFlowers  from '@/components/SpringFlowers';
import PheasantHunt   from '@/components/PheasantHunt';
import OakForest      from '@/components/OakForest';
import GoldenEagle    from '@/components/GoldenEagle';
import WildOrchid     from '@/components/WildOrchid';
import TroutGuide     from '@/components/TroutGuide';
import SquirrelWatch  from '@/components/SquirrelWatch';
import WildBoar3      from '@/components/WildBoar3';
import WildLavender   from '@/components/WildLavender';
import HedgehogGuide  from '@/components/HedgehogGuide';
import AnchovyCooking from '@/components/AnchovyCooking';
import BlackSeaFish   from '@/components/BlackSeaFish';
import ForestSurvival from '@/components/ForestSurvival';
import MountainGoatWatch from '@/components/MountainGoatWatch';
import WildRosmary    from '@/components/WildRosmary';
import MarineDiving   from '@/components/MarineDiving';
import AegeanFish     from '@/components/AegeanFish';
import WildMint       from '@/components/WildMint';
import TurkishTea     from '@/components/TurkishTea';
import BeachCamping   from '@/components/BeachCamping';
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
        <Route path="/sulun-av"       element={<PheasantHunting />} />
        <Route path="/buldircin-av"   element={<QuailCalling />} />
        <Route path="/geyik-scout"    element={<DeerScouting />} />
        <Route path="/trol-balik"     element={<TrollingGuide />} />
        <Route path="/balik-cekici"   element={<FishAttractor />} />
        <Route path="/gece-kuslar"    element={<NightBirds />} />
        <Route path="/kamera-tuzak"   element={<TrailCamera />} />
        <Route path="/sulak-alan"     element={<WetlandGuide />} />
        <Route path="/domuz-yemek"    element={<BoarCooking />} />
        <Route path="/hayatta-nav"    element={<SurvivalNav />} />
        <Route path="/kis-av"         element={<WinterHunting />} />
        <Route path="/kerevit"        element={<CrayfishGuide />} />
        <Route path="/av-pusu"        element={<HuntingBlind />} />
        <Route path="/akdeniz-balik"  element={<MedFish />} />
        <Route path="/tuzluk"         element={<SaltLick />} />
        <Route path="/nehir-oku"      element={<RiverReading />} />
        <Route path="/yakala-birak"   element={<CatchRelease />} />
        <Route path="/yuruyus-beslen" element={<HikingNutrition />} />
        <Route path="/kamp-hijyen"    element={<CampHygiene />} />
        <Route path="/alp-rehber"     element={<AlpineGuide />} />
        <Route path="/yarasa-gozlem"  element={<BatObserve />} />
        <Route path="/yapay-resif"    element={<ArtificialReef />} />
        <Route path="/bozkir-kuslar"  element={<GrasslandBirds />} />
        <Route path="/alabalik-av"    element={<TroutFishing />} />
        <Route path="/foto-pusu"      element={<PhotoHide />} />
        <Route path="/agac-tanimi"    element={<TreeIdentify />} />
        <Route path="/dogal-kamuflaj" element={<NaturalCamo />} />
        <Route path="/kus-evi-yap"    element={<BirdHouse />} />
        <Route path="/ari-guvenlik"   element={<BeeSafety />} />
        <Route path="/doga-kos"       element={<TrailRunning />} />
        <Route path="/gol-ekoloji"    element={<LakeEcology />} />
        <Route path="/goc-balik"      element={<MigratoryFish />} />
        <Route path="/vahsi-kamp"     element={<WildCamping />} />
        <Route path="/deniz-kuslar"   element={<SeabirdGuide />} />
        <Route path="/av-etik-ileri"  element={<HuntingEthicsAdv />} />
        <Route path="/mevsim-kus"     element={<SeasonalBirding />} />
        <Route path="/boilies"        element={<CarpBoilies />} />
        <Route path="/su-kuslar"      element={<WaterBirds />} />
        <Route path="/tuy-tanimi"     element={<FeatherGuide />} />
        <Route path="/domuz-koku"     element={<BoarScent />} />
        <Route path="/kiyi-olta"      element={<ShoreFishing />} />
        <Route path="/baykus-rehber"  element={<OwlGuide />} />
        <Route path="/nehir-ekoloji"  element={<RiverEcology />} />
        <Route path="/amfibi"         element={<AmphibianGuide />} />
        <Route path="/kopek-egitim"   element={<DogTraining />} />
        <Route path="/deniz-kayak"    element={<SeaKayak />} />
        <Route path="/mantar-guvenlik" element={<MushroomSafety />} />
        <Route path="/acik-deniz"     element={<HighSeas />} />
        <Route path="/bataklık"        element={<SaltMarsh />} />
        <Route path="/balik-fizik"    element={<FishingPhysics />} />
        <Route path="/kertenkele"     element={<LizardGuide />} />
        <Route path="/biyocesitlilik" element={<BiodiversitySpots />} />
        <Route path="/yaban-domuz-av" element={<WildBoarHunting />} />
        <Route path="/kamp-gokyuzu"   element={<NightSkyCamp />} />
        <Route path="/tuzlu-sinek"    element={<SaltwaterFly />} />
        <Route path="/kis-kamp"       element={<WinterCamp />} />
        <Route path="/orman-toplama"  element={<ForestForaging />} />
        <Route path="/ahtapot-av"     element={<OctopusGuide />} />
        <Route path="/geyik-cagri"    element={<DeerCallers />} />
        <Route path="/tekne-bakim"    element={<BoatMaintenance />} />
        <Route path="/yayin-balik"    element={<CatfishGuide />} />
        <Route path="/dogal-aricilik" element={<BeeKeeping />} />
        <Route path="/yilan-balik"    element={<EelGuide />} />
        <Route path="/bulut-oku"      element={<CloudReading />} />
        <Route path="/sahi-kus"       element={<HawkWatch />} />
        <Route path="/yosun-rehber"   element={<MossGuide />} />
        <Route path="/kurbaga-yem"    element={<FrogBait />} />
        <Route path="/orkinos-av"     element={<TunaGuide />} />
        <Route path="/istiridye"      element={<OysterCollect />} />
        <Route path="/solucan-yetistir" element={<WormFarming />} />
        <Route path="/domuz-iz"       element={<BoarSign />} />
        <Route path="/nehir-yuzme"    element={<RiverSwimming />} />
        <Route path="/yabani-bal"     element={<WildHoney />} />
        <Route path="/orumcek-guvenlik" element={<SpiderSafety />} />
        <Route path="/kayak-balik"    element={<FishingKayak />} />
        <Route path="/kiyi-toplama"   element={<CoastalForaging />} />
        <Route path="/arazi-nav"      element={<LandNavigation />} />
        <Route path="/mevsim-besin"   element={<SeasonalFood />} />
        <Route path="/kus-yuvasi"     element={<BirdNesting />} />
        <Route path="/misina-secimi"  element={<FishingLine2 />} />
        <Route path="/termal-av"      element={<ThermalHunting />} />
        <Route path="/sahte-yem-yap"  element={<LureMaking />} />
        <Route path="/yabani-hindi"   element={<WildTurkey />} />
        <Route path="/deniz-salyangozu" element={<SeaSnail />} />
        <Route path="/yengec-av"        element={<CrabFishing />} />
        <Route path="/gece-yuruyus"     element={<NightHiking />} />
        <Route path="/kalamar-av"       element={<SquidFishing />} />
        <Route path="/toz-firtinasi"    element={<SandstormSafe />} />
        <Route path="/kamp-tarp"        element={<CampTarp />} />
        <Route path="/yabani-kaz"       element={<WildGoose />} />
        <Route path="/denizci-dugum"    element={<MarineKnots />} />
        <Route path="/zargana"          element={<GarfishGuide />} />
        <Route path="/deniz-kirpisi"    element={<UrchinCollect />} />
        <Route path="/arazi-kayak"      element={<BackcountrySkiing />} />
        <Route path="/sivrisinek-guvenlik" element={<MosquitoSafety />} />
        <Route path="/sulun-pisirme"    element={<PheasantCook />} />
        <Route path="/sahil-casting"    element={<BeachCasting />} />
        <Route path="/su-yilani"        element={<WaterSnake />} />
        <Route path="/vatoz-rehber"     element={<RayGuide />} />
        <Route path="/kamp-fener"       element={<CampLantern />} />
        <Route path="/av-etik-ilkeler"  element={<HuntingEthics2 />} />
        <Route path="/kayalik-havuz"    element={<RockpoolGuide />} />
        <Route path="/cipura-av"        element={<SunfishGuide />} />
        <Route path="/yaban-keci"       element={<MountainGoat />} />
        <Route path="/gelgit-guvenlik"  element={<TidePoolSafety />} />
        <Route path="/yay-avciligi"     element={<BowHunting />} />
        <Route path="/deniz-yosunu"     element={<SeaweedGuide />} />
        <Route path="/gol-yuzme"        element={<LakeSwimming />} />
        <Route path="/yusufcuk"         element={<DragonFlyGuide />} />
        <Route path="/tuzlu-su-balik"   element={<SaltwaterFishing />} />
        <Route path="/kamp-yemek-plan"  element={<CampingFood />} />
        <Route path="/gece-kamp"        element={<NightCamping />} />
        <Route path="/orman-kuslari"    element={<WoodlandBirds />} />
        <Route path="/gece-gorus"       element={<NightVision />} />
        <Route path="/ordek-pisirme"    element={<DuckCooking />} />
        <Route path="/kopekbaligi"      element={<SharkGuide />} />
        <Route path="/kanyon-yuruyus"   element={<CanyonHiking />} />
        <Route path="/keklik-av"        element={<PartridgeHunt />} />
        <Route path="/mercan-rehber"    element={<CoralGuide />} />
        <Route path="/yabani-salata"    element={<WildSalad />} />
        <Route path="/kamp-yakit"       element={<CampingGas />} />
        <Route path="/yabani-cicek-id"  element={<WildFlowerID />} />
        <Route path="/yaz-kamp"         element={<SummerCamping />} />
        <Route path="/turna-balik"      element={<PikeFishing />} />
        <Route path="/yagmurda-balikcilik" element={<RainFishing />} />
        <Route path="/yuruyus-atistirmalik" element={<HikingSnacks />} />
        <Route path="/sahil-toplama"    element={<BeachCombing />} />
        <Route path="/karabatak"        element={<CormorantGuide />} />
        <Route path="/geyik-sesleri"    element={<ElkCalling />} />
        <Route path="/egrelti"          element={<FernGuide />} />
        <Route path="/balik-tutsuleme2" element={<FishSmoking />} />
        <Route path="/nehir-kuslari"    element={<RiverBirds />} />
        <Route path="/gece-yuzme"       element={<NightSwimming />} />
        <Route path="/ilkbahar-balik"   element={<SpringFishing />} />
        <Route path="/camurlu-su"       element={<MudFishing />} />
        <Route path="/baykus-gozlem"    element={<OwlWatching />} />
        <Route path="/yaban-domuzu"     element={<WildBoarTrack />} />
        <Route path="/levrek-av"        element={<SeabassGuide />} />
        <Route path="/kis-kamp"         element={<WinterCamping />} />
        <Route path="/yabani-mantar"    element={<WildMushroomID />} />
        <Route path="/fly-fishing"      element={<FlyfishingGuide />} />
        <Route path="/ayi-guvenligi"    element={<BearSafety />} />
        <Route path="/alabalik-pisirme" element={<TroutCooking />} />
        <Route path="/gocmen-kuslar"    element={<MigrationBirds />} />
        <Route path="/kayalik-olta"     element={<CliffFishing />} />
        <Route path="/kamp-atesi-yemek" element={<CampfireFood />} />
        <Route path="/kurt-takibi"      element={<WolfTracking />} />
        <Route path="/ay-balikcilik"    element={<MoonFishing />} />
        <Route path="/dag-bitkileri"    element={<MountainHerbalism />} />
        <Route path="/yaban-hindi-pis"  element={<TurkeyCooking />} />
        <Route path="/magara-kesfi"     element={<CaveExploring />} />
        <Route path="/su-aritma"        element={<WaterPurify />} />
        <Route path="/gelgit-balik"     element={<TidalFishing />} />
        <Route path="/gundogumu-yuruyus" element={<SunriseHiking />} />
        <Route path="/deniz-kayak"      element={<SeaKayaking />} />
        <Route path="/karaca-takibi"    element={<DeerTracking />} />
        <Route path="/sonbahar-kus"     element={<AutumnBirding />} />
        <Route path="/istakoz"          element={<LobsterGuide />} />
        <Route path="/hamsi-av"         element={<AnchoryFishing />} />
        <Route path="/kamp-hijyeni"     element={<CampingHygiene />} />
        <Route path="/yaban-dom-pisir"  element={<WildBoarCooking />} />
        <Route path="/kaplumbaga-gozlem" element={<TurtleWatching />} />
        <Route path="/buz-yuruyu"       element={<IceHiking />} />
        <Route path="/su-kusu-yem"      element={<WaterFowlDecoy />} />
        <Route path="/yosun-ekosistem"  element={<MossBiodiversity />} />
        <Route path="/kanal-balikcilik" element={<TunnelFishing />} />
        <Route path="/yuksek-irtifa"    element={<HighAltitudeHiking />} />
        <Route path="/uskumru-av"       element={<MackerelFishing />} />
        <Route path="/bouldering"       element={<BoulderingGuide />} />
        <Route path="/yabani-otlar"     element={<WildHerbs />} />
        <Route path="/cipura-av2"       element={<SunfishFishing />} />
        <Route path="/ari-guvenligi"    element={<HazardousBees />} />
        <Route path="/nehir-gecisi"     element={<RiverCrossing />} />
        <Route path="/liken-rehberi"    element={<LichenGuide />} />
        <Route path="/yirtici-kus-gozlem" element={<HawkWatching />} />
        <Route path="/midye-pisirme"    element={<MusselCooking />} />
        <Route path="/kar-ayakkabisi"   element={<SnowShoeHiking />} />
        <Route path="/sulak-alan-kuslari" element={<WetlandsBirds />} />
        <Route path="/yabani-umbel"     element={<WildCarrot />} />
        <Route path="/yamac-parasut"    element={<DeltaPlaning />} />
        <Route path="/vizon-takibi"     element={<MinkTracking />} />
        <Route path="/deniz-kaplum-dalisi" element={<SeaTurtleDive />} />
        <Route path="/yabani-cay"       element={<WildTeaGuide />} />
        <Route path="/orman-mantarlari" element={<ForestFungi />} />
        <Route path="/akrep-rehberi"    element={<ScorpionGuide />} />
        <Route path="/alpin-cicekler"   element={<AlpineFlowers />} />
        <Route path="/nehir-av-haritasi" element={<RiverFishingMap />} />
        <Route path="/gece-gokyuzu"     element={<NightSkyGuide />} />
        <Route path="/yilan-rehberi"    element={<GrassSnakeGuide />} />
        <Route path="/kalamari-av"      element={<SqouidFishing />} />
        <Route path="/baykus-yuvalama"  element={<OwlNesting />} />
        <Route path="/buz-tirmanis"     element={<IceClimbing />} />
        <Route path="/domuz-tarifleri"  element={<WildBoarCookbook />} />
        <Route path="/sivrisinek-rehberi" element={<TigerMosquito />} />
        <Route path="/tatlisuyu-yengeci" element={<FreshwaterCrab />} />
        <Route path="/magara-dalisi"    element={<CaveDiving />} />
        <Route path="/sonbahar-hasati"  element={<AutumnHarvest />} />
        <Route path="/kumul-ekoloji"    element={<SandDunes />} />
        <Route path="/kurt-davranisi"   element={<WolfBehavior />} />
        <Route path="/alabalik-rehberi" element={<TroutFarm />} />
        <Route path="/yosun-tanimlama"  element={<MossIdentify />} />
        <Route path="/orumcek-rehberi"  element={<SpiderGuide />} />
        <Route path="/yunus-gozlem"     element={<DolphinWatch />} />
        <Route path="/yabani-sarimsak"  element={<WildGarlic />} />
        <Route path="/kefal-avi"        element={<MulletFishing />} />
        <Route path="/vasak-takibi"     element={<LynxTracking />} />
        <Route path="/karides-avi"      element={<ShrimpFishing />} />
        <Route path="/jeoloji-yuruyus"  element={<GeologyHike />} />
        <Route path="/yilan-baligi"     element={<EelFishing />} />
        <Route path="/kus-sesi"         element={<WildBirdCall />} />
        <Route path="/yabani-meyvecik"  element={<WildRaspberry />} />
        <Route path="/cipura-avi"       element={<SeaBreem />} />
        <Route path="/somon-rehberi"    element={<SalmonFishing />} />
        <Route path="/truf-avi"         element={<TrufflHunt />} />
        <Route path="/marti-gozlem"     element={<SeagullWatch />} />
        <Route path="/yarasa-gozlem"    element={<BatWatch />} />
        <Route path="/ahtapot-avi"      element={<OctoFishing />} />
        <Route path="/yayla-ekoloji"    element={<HighlandGrazing />} />
        <Route path="/pelikan-gozlem"   element={<PelicanWatch />} />
        <Route path="/domuz-ekoloji"    element={<WildBoarBehavior />} />
        <Route path="/kurbaga-rehberi"  element={<FrogGuide />} />
        <Route path="/turna-avi"        element={<TigerFishing />} />
        <Route path="/akdeniz-deniz"    element={<MediterSeaFood />} />
        <Route path="/cayir-ekoloji"    element={<MeadowEcology />} />
        <Route path="/leylek-gocu"      element={<StorkMigration />} />
        <Route path="/deniz-kestanesi"  element={<SeaUrchin />} />
        <Route path="/kizil-geyik"      element={<RedDeerRut />} />
        <Route path="/puhu-baykus"      element={<EagleOwl />} />
        <Route path="/yabani-kekik"     element={<WildThyme />} />
        <Route path="/karabatak"        element={<CormorantWatch />} />
        <Route path="/sazan-avi"        element={<BreamFishing />} />
        <Route path="/tilki-iz"         element={<FoxTracking />} />
        <Route path="/isirgan-otu"      element={<WildNettle />} />
        <Route path="/adacayi"          element={<WildSage />} />
        <Route path="/findik-hasadi"    element={<HazelnutHarvest />} />
        <Route path="/gocmen-kuslar"    element={<MigratoryBirds />} />
        <Route path="/yabani-mantar"    element={<WildMushroom />} />
        <Route path="/kelaynak"         element={<IbisWatch />} />
        <Route path="/bataklık-avi"     element={<MarshFishing />} />
        <Route path="/alpin-yurus"      element={<AlpineHike />} />
        <Route path="/levrek-rehberi"   element={<SeaBassGuide />} />
        <Route path="/yabani-meyveler"  element={<WildBerry />} />
        <Route path="/kamp-yemekleri"   element={<CampfireCooking />} />
        <Route path="/kusburnu"         element={<WildRosehip />} />
        <Route path="/karacam"          element={<TurkishPine />} />
        <Route path="/yaban-domuzu-iz"  element={<WildBoar2 />} />
        <Route path="/deniz-ekoloji"    element={<MarineEcology />} />
        <Route path="/bahar-cicekleri"  element={<SpringFlowers />} />
        <Route path="/sulun-avi2"       element={<PheasantHunt />} />
        <Route path="/mese-ormani"      element={<OakForest />} />
        <Route path="/kizil-sahin"      element={<GoldenEagle />} />
        <Route path="/yabani-orkide"    element={<WildOrchid />} />
        <Route path="/alabalik-rehberi" element={<TroutGuide />} />
        <Route path="/sincap-gozu"      element={<SquirrelWatch />} />
        <Route path="/yaban-domuzu-av"  element={<WildBoar3 />} />
        <Route path="/yabani-lavanta"   element={<WildLavender />} />
        <Route path="/kirpi-rehberi"    element={<HedgehogGuide />} />
        <Route path="/hamsi-rehberi"    element={<AnchovyCooking />} />
        <Route path="/karadeniz-balık"  element={<BlackSeaFish />} />
        <Route path="/orman-hayatta"    element={<ForestSurvival />} />
        <Route path="/yaban-kecisi"     element={<MountainGoatWatch />} />
        <Route path="/yabani-biberiye"  element={<WildRosmary />} />
        <Route path="/deniz-dalisi"     element={<MarineDiving />} />
        <Route path="/ege-baliklari"    element={<AegeanFish />} />
        <Route path="/yabani-nane"      element={<WildMint />} />
        <Route path="/dogal-caylar"     element={<TurkishTea />} />
        <Route path="/sahil-kampi"      element={<BeachCamping />} />
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
