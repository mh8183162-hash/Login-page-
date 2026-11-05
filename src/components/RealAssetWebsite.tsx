import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Sun, 
  Home, 
  Compass, 
  Download, 
  ArrowUpRight, 
  PieChart, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  Filter, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  X,
  Wallet,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface RealAssetWebsiteProps {
  user: UserProfile;
  language: Language;
  onLogout: () => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
}

export interface RealAsset {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'real_estate' | 'clean_energy' | 'commercial' | 'agtech';
  categoryLabelEn: string;
  categoryLabelUr: string;
  location: string;
  image: string;
  valuation: number;
  minInvestment: number;
  apy: number;
  fundedPercentage: number;
  distributionFreq: string;
  esgScore: string;
  descriptionEn: string;
  descriptionUr: string;
}

export const RealAssetWebsite: React.FC<RealAssetWebsiteProps> = ({
  user,
  language,
  onLogout,
  showToast
}) => {
  const isUrdu = language === 'ur';

  // Portfolio state
  const [currency, setCurrency] = useState<'USD' | 'PKR' | 'EUR'>('USD');
  const [currencyRate, setCurrencyRate] = useState({ USD: 1, PKR: 278, EUR: 0.92 });
  const [portfolioValue, setPortfolioValue] = useState(14850240);
  const [totalYieldEarned, setTotalYieldEarned] = useState(142680);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected asset for modal
  const [selectedAsset, setSelectedAsset] = useState<RealAsset | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(25000);
  const [isSubmittingInvest, setIsSubmittingInvest] = useState(false);

  // Currency Formatter
  const formatMoney = (amount: number) => {
    const converted = amount * currencyRate[currency];
    const symbol = currency === 'USD' ? '$' : currency === 'PKR' ? '₨ ' : '€';
    return `${symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  // Real Assets Inventory
  const [assets, setAssets] = useState<RealAsset[]>([
    {
      id: 'asset-1',
      titleEn: 'Azure Horizon Luxury Eco-Villa Estate',
      titleUr: 'ایزور ہورائزن لگژری ولا اسٹیٹ',
      category: 'real_estate',
      categoryLabelEn: 'Prime Residential',
      categoryLabelUr: 'رہائشی ولاز',
      location: 'Côte d’Azur / Marbella',
      image: '/src/assets/images/luxury_modern_villa_1793892362114.jpg',
      valuation: 8400000,
      minInvestment: 10000,
      apy: 11.8,
      fundedPercentage: 86,
      distributionFreq: 'Monthly / ماہانہ',
      esgScore: 'A+ Green Built',
      descriptionEn: 'High-yield coastal villa estate featuring private infinity pools, zero-emission geothermal cooling, and strong luxury tourist tenancy.',
      descriptionUr: 'ساحلی لگژری ولاز، زیرو کاربن ایمیشن اور اعلیٰ ماہانہ کرایہ ریٹرن کے ساتھ محفوظ ریئل اسٹیٹ اثاثہ۔'
    },
    {
      id: 'asset-2',
      titleEn: 'Solaria Solar Photovoltaic Grid Phase II',
      titleUr: 'سولاریا گرین انرجی سولر فارم',
      category: 'clean_energy',
      categoryLabelEn: 'Renewable Power',
      categoryLabelUr: 'توانائی منصوبے',
      location: 'Iberian Clean Energy Corridor',
      image: '/src/assets/images/solar_renewable_farm_1793892364813.jpg',
      valuation: 18200000,
      minInvestment: 5000,
      apy: 14.5,
      fundedPercentage: 94,
      distributionFreq: 'Quarterly / سہ ماہی',
      esgScore: 'AAA Net Zero',
      descriptionEn: '120MW operational solar infrastructure with 20-year government feed-in power purchase contracts and inflation-indexed dividends.',
      descriptionUr: '120 میگاواٹ سولر پارک جو 20 سالہ سرکاری معاہدے اور افراطِ زر سے محفوظ منافع فراہم کرتا ہے۔'
    },
    {
      id: 'asset-3',
      titleEn: 'Verdant Central Biophilic Commercial Tower',
      titleUr: 'ورڈینٹ سنٹرل کمرشل بائیوفیلک ٹاور',
      category: 'commercial',
      categoryLabelEn: 'Commercial Office',
      categoryLabelUr: 'کمرشل ٹاور',
      location: 'Central Financial District',
      image: '/src/assets/images/commercial_glass_tower_1793892363390.jpg',
      valuation: 42000000,
      minInvestment: 25000,
      apy: 10.2,
      fundedPercentage: 78,
      distributionFreq: 'Monthly / ماہانہ',
      esgScore: 'LEED Platinum',
      descriptionEn: 'Grade-A smart skyscraper featuring vertical urban forests, 98% Fortune 500 occupancy, and long-term triple net corporate leases.',
      descriptionUr: '98 فیصد ملٹی نیشنل کمپنیوں سے لیس ماحول دوست کارپوریٹ ٹاور، طویل مدتی محفوظ منافع کے ساتھ۔'
    },
    {
      id: 'asset-4',
      titleEn: 'AeroGreen Smart Hydroponic AgTech Complex',
      titleUr: 'ایرو گرین اسمارٹ زرعی کمپلیکس',
      category: 'agtech',
      categoryLabelEn: 'AgTech & Food Security',
      categoryLabelUr: 'اسمارٹ زراعت',
      location: 'Greenfield Valley Biosphere',
      image: '/src/assets/images/smart_agtech_farmland_1793892362791.jpg',
      valuation: 6500000,
      minInvestment: 5000,
      apy: 16.4,
      fundedPercentage: 62,
      distributionFreq: 'Bi-Monthly / ہر 2 ماہ',
      esgScore: 'Organic & Carbon Negative',
      descriptionEn: 'Automated greenhouse facility delivering 90% water savings and guaranteed supermarket supply contracts across domestic chains.',
      descriptionUr: 'جدید ترین ہائیڈروپونک گرین ہاؤس جس میں 90 فیصد پانی کی بچت اور پریمیم فصلوں کا محفوظ منافع ہے۔'
    }
  ]);

  // Filtered assets
  const filteredAssets = assets.filter(a => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch = a.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.titleUr.includes(searchQuery) ||
                          a.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInvestmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    setIsSubmittingInvest(true);
    setTimeout(() => {
      setIsSubmittingInvest(false);
      setPortfolioValue(prev => prev + investAmount);
      setTotalYieldEarned(prev => prev + Math.round((investAmount * (selectedAsset.apy / 100)) / 12));
      showToast(
        'success',
        isUrdu 
          ? `مبارک ہو! آپ نے ${selectedAsset.titleUr} میں ${formatMoney(investAmount)} کی کامیاب سرمایہ کاری کر لی ہے۔`
          : `Congratulations! Invested ${formatMoney(investAmount)} into ${selectedAsset.titleEn}.`
      );
      setSelectedAsset(null);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-950/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Verdant<span className="text-emerald-600 dark:text-emerald-400">Assets</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Portfolio
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
                {isUrdu ? 'حقیقی اثاثہ جات اور گرین انرجی ویلتھ پورٹل' : 'Real-World Asset Tokenization & Wealth Platform'}
              </p>
            </div>
          </div>

          {/* Quick Stats + Currency Switcher */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col text-end">
              <span className="text-[11px] text-slate-400 font-medium">
                {isUrdu ? 'کل اثاثہ جات (AUM)' : 'Portfolio Value'}
              </span>
              <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                {formatMoney(portfolioValue)}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col text-end">
              <span className="text-[11px] text-slate-400 font-medium">
                {isUrdu ? 'ماہانہ حاصل منافع' : 'Net Annual Yield'}
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                13.4% APY
              </span>
            </div>
          </div>

          {/* Right User Bar & Logout */}
          <div className="flex items-center gap-3">
            {/* Currency Pill */}
            <div className="flex items-center bg-emerald-50 dark:bg-slate-800 rounded-lg p-0.5 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold">
              {(['USD', 'PKR', 'EUR'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                    currency === curr 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-start leading-none">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {user.name}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Logout to test login anytime */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/60 transition-all cursor-pointer shadow-xs"
              title="Sign Out / لاگ آؤٹ کریں"
            >
              <LogOut className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
              <span className="hidden sm:inline">{isUrdu ? 'لاگ آؤٹ' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Portfolio Banner - White & Emerald Clean Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/80 p-6 sm:p-10 shadow-xl shadow-emerald-600/5 transition-all">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-teal-400/10 dark:bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {isUrdu ? 'لائیو پورٹ فولیو کارکردگی' : 'Institutional-Grade Asset Portfolio'}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {isUrdu ? `خوش آمدید، ${user.name}!` : `Welcome back, ${user.name}!`}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {isUrdu 
                  ? 'آپ کے تمام ریئل اسٹیٹ، گرین انرجی اور زرعی اثاثہ جات محفوظ اور خودکار منافع پیدا کر رہے ہیں۔'
                  : 'Your diversified real-world assets and clean energy infrastructure investments are actively generating inflation-hedged yields.'}
              </p>

              {/* Action Buttons with rich hover and feedback */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    const topAsset = assets[0];
                    setSelectedAsset(topAsset);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isUrdu ? 'نئی سرمایہ کاری کریں' : 'Invest in Assets'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('success', isUrdu ? 'اثاثہ جات کی مکمل رپورٹ (PDF) ڈاؤن لوڈ ہو رہی ہے۔' : 'Exporting comprehensive audited portfolio PDF...');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{isUrdu ? 'آڈٹ رپورٹ ڈاؤن لوڈ کریں' : 'Download Portfolio Ledger'}</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Dashboard Card */}
            <div className="w-full lg:w-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-emerald-800/80 p-5 shadow-lg shadow-emerald-950/5 min-w-[280px] sm:min-w-[320px]">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isUrdu ? 'مجموعی پورٹ فولیو ویلیو' : 'Total Assets Value'}
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums tracking-tight">
                {formatMoney(portfolioValue)}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="flex items-center gap-0.5 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% YTD
                </span>
                <span className="text-slate-400">vs S&P 500 (+9.1%)</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isUrdu ? 'ماہانہ حاصل آمدن' : 'Cumulative Dividends'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {formatMoney(totalYieldEarned)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isUrdu ? 'کاربن آفسیٹ' : 'Carbon Offset'}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    4,120 Metric Tons CO₂
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters & Live Search Bar */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-slate-800 shadow-xs overflow-x-auto">
            {[
              { id: 'all', labelEn: 'All Assets (4)', labelUr: 'تمام اثاثے' },
              { id: 'real_estate', labelEn: 'Luxury Villas', labelUr: 'لگژری ولاز' },
              { id: 'clean_energy', labelEn: 'Solar & Clean Energy', labelUr: 'سولر و انرجی' },
              { id: 'commercial', labelEn: 'Eco Skyscraper', labelUr: 'کمرشل ٹاور' },
              { id: 'agtech', labelEn: 'Smart AgTech', labelUr: 'اسمارٹ زراعت' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
                }`}
              >
                {isUrdu ? tab.labelUr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <div className={`absolute inset-y-0 ${isUrdu ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400`}>
              <Search className="w-4 h-4 text-emerald-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'اثاثہ یا مقام تلاش کریں...' : 'Search assets, location...'}
              className={`w-full ${isUrdu ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-xl border border-emerald-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-xs`}
            />
          </div>
        </section>

        {/* Asset Cards Grid - Rich Hover & Animations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/60 overflow-hidden shadow-md shadow-emerald-950/5 hover:shadow-2xl hover:shadow-emerald-500/15 hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={asset.image}
                  alt={asset.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Badge Pills */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-md border border-emerald-200 dark:border-emerald-800">
                    {isUrdu ? asset.categoryLabelUr : asset.categoryLabelEn}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-md flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" /> {asset.apy}% APY
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                  <div className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-xs font-medium inline-flex items-center gap-1.5 border border-white/10">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{asset.esgScore}</span>
                    <span>·</span>
                    <span>{asset.location}</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                    {isUrdu ? asset.titleUr : asset.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {isUrdu ? asset.descriptionUr : asset.descriptionEn}
                  </p>
                </div>

                {/* Financial Stats Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">{isUrdu ? 'کل اثاثہ مالیت' : 'Asset Valuation'}</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                        {formatMoney(asset.valuation)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{isUrdu ? 'کم از کم سرمایہ کاری' : 'Min. Investment'}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                        {formatMoney(asset.minInvestment)}
                      </span>
                    </div>
                  </div>

                  {/* Funding Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">{isUrdu ? 'فنڈنگ مکمل' : 'Target Funded'}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                        {asset.fundedPercentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-emerald-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 group-hover:brightness-110"
                        style={{ width: `${asset.fundedPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Button Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setInvestAmount(asset.minInvestment);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{isUrdu ? 'سرمایہ کاری کا حساب لگائیں' : 'Invest / Buy Shares'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showToast('info', isUrdu ? `${asset.titleUr} کی قانونی دستاویزات اور آڈٹ رپورٹ کھولی جا رہی ہے۔` : `Opening legal prospectus for ${asset.titleEn}`);
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer"
                      title="Inspect Prospectus"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Live Asset Allocation Breakdown & Interactive Distribution */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/60 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-600" />
                <span>{isUrdu ? 'اثاثہ جاتی تقسیم اور رسک بیلنس' : 'Asset Allocation & Risk Diversification'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isUrdu ? 'آپ کے پورٹ فولیو کی کیٹیگری وائز فیصد تقسیم' : 'Target asset classes optimized for capital preservation and high quarterly dividend flow.'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ESG Tier-1 Compliant</span>
            </div>
          </div>

          {/* Allocation Bar */}
          <div className="h-4 w-full rounded-full overflow-hidden flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800 p-0.5">
            <div className="bg-emerald-600 rounded-l-full h-full hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '42%' }} title="Real Estate: 42%" />
            <div className="bg-teal-500 h-full hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '28%' }} title="Clean Energy: 28%" />
            <div className="bg-emerald-400 h-full hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '18%' }} title="Commercial Tower: 18%" />
            <div className="bg-emerald-300 rounded-r-full h-full hover:opacity-90 transition-opacity cursor-pointer" style={{ width: '12%' }} title="AgTech: 12%" />
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{isUrdu ? 'لگژری ولاز' : 'Prime Villas'}</span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">42%</div>
              <div className="text-[11px] text-slate-400 font-mono">{formatMoney(6237100)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{isUrdu ? 'سولر فارم' : 'Solar Power'}</span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">28%</div>
              <div className="text-[11px] text-slate-400 font-mono">{formatMoney(4158000)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{isUrdu ? 'کمرشل ٹاور' : 'Commercial'}</span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">18%</div>
              <div className="text-[11px] text-slate-400 font-mono">{formatMoney(2673000)}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-emerald-300" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{isUrdu ? 'اسمارٹ زراعت' : 'AgTech'}</span>
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">12%</div>
              <div className="text-[11px] text-slate-400 font-mono">{formatMoney(1782000)}</div>
            </div>
          </div>
        </section>

        {/* Recent Dividends Ledger Table */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/60 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>{isUrdu ? 'حالیہ منافع جات کی ٹرانزیکشن ہسٹری' : 'Recent Payouts & Yield Ledger'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isUrdu ? 'براہ راست آپ کے بینک یا ڈیجیٹل والٹ میں بھیجا جانے والا منافع' : 'Automated monthly dividend payouts deposited into your linked settlement account.'}
              </p>
            </div>
            <button
              onClick={() => showToast('success', isUrdu ? 'تمام تاریخی ٹرانزیکشنز کی CSV فائل برآمد کر لی گئی۔' : 'CSV Ledger exported successfully.')}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'CSV ڈاؤن لوڈ' : 'Export CSV'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="pb-3 text-start">{isUrdu ? 'تاریخ' : 'Date'}</th>
                  <th className="pb-3 text-start">{isUrdu ? 'اثاثہ کا نام' : 'Asset Name'}</th>
                  <th className="pb-3 text-start">{isUrdu ? 'نوعیت' : 'Type'}</th>
                  <th className="pb-3 text-start">{isUrdu ? 'رقم' : 'Amount'}</th>
                  <th className="pb-3 text-end">{isUrdu ? 'حیثیت' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { date: 'Nov 02, 2026', asset: 'Solaria Solar Photovoltaic Grid', type: 'Q3 PPA Dividend', amount: 14850, status: 'Settled' },
                  { date: 'Oct 28, 2026', asset: 'Azure Horizon Luxury Eco-Villa', type: 'Monthly Rental Yield', amount: 9240, status: 'Settled' },
                  { date: 'Oct 15, 2026', asset: 'Verdant Central Commercial Tower', type: 'Corporate Lease Distribution', amount: 21400, status: 'Settled' },
                  { date: 'Sep 30, 2026', asset: 'AeroGreen Smart Hydroponic Complex', type: 'Harvest Offtake Payout', amount: 6800, status: 'Settled' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 text-slate-500 font-mono">{row.date}</td>
                    <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{row.asset}</td>
                    <td className="py-3.5 text-slate-500">{row.type}</td>
                    <td className="py-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +{formatMoney(row.amount)}
                    </td>
                    <td className="py-3.5 text-end">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Interactive Investment Calculator Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedAsset(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isUrdu ? selectedAsset.titleUr : selectedAsset.titleEn}
                </h3>
                <p className="text-xs text-emerald-600 font-semibold font-mono">
                  {selectedAsset.apy}% Expected Annual APY · {selectedAsset.location}
                </p>
              </div>
            </div>

            <form onSubmit={handleInvestmentSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {isUrdu ? 'سرمایہ کاری کی رقم' : 'Investment Amount'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-mono font-bold">
                    {currency === 'USD' ? '$' : currency === 'PKR' ? '₨' : '€'}
                  </span>
                  <input
                    type="number"
                    min={selectedAsset.minInvestment}
                    step={1000}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 font-mono text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Min: {formatMoney(selectedAsset.minInvestment)}</span>
                  <div className="flex gap-2">
                    {[10000, 25000, 50000, 100000].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setInvestAmount(amt)}
                        className="text-emerald-600 font-semibold hover:underline"
                      >
                        +${amt/1000}k
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Yield Calculator Forecast Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">{isUrdu ? 'سالانہ متوقع منافع' : 'Projected Annual Return'}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-sm">
                    {formatMoney(Math.round(investAmount * (selectedAsset.apy / 100)))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">{isUrdu ? 'ماہانہ اوسط ادائیگی' : 'Monthly Dividend Estimate'}</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {formatMoney(Math.round((investAmount * (selectedAsset.apy / 100)) / 12))}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingInvest}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmittingInvest ? (
                  <span>Processing Investment...</span>
                ) : (
                  <>
                    <span>{isUrdu ? 'ابھی سرمایہ کاری کی تصدیق کریں' : `Confirm & Allocate ${formatMoney(investAmount)}`}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-emerald-100 dark:border-emerald-950/60 bg-white/80 dark:bg-slate-900/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">Verdant Real Assets</span>
            <span>· ISO 14064 Green FinTech Certified</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Verdant Capital Global. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
