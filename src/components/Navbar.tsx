import React from 'react';
import { Heart, Gift, UserCheck, PlusCircle, Inbox, ListFilter, Users } from 'lucide-react';
import { UserProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  activeTab: 'catalog' | 'new-donation' | 'donor-dashboard' | 'my-requests';
  setActiveTab: (tab: 'catalog' | 'new-donation' | 'donor-dashboard' | 'my-requests') => void;
  currentUser: UserProfile;
  allUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  pendingRequestsCount: number;
  authorizedRequestsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  allUsers,
  onSelectUser,
  pendingRequestsCount,
  authorizedRequestsCount,
}) => {
  const { t } = useLanguage();

  const getUserRoleLabel = (user: UserProfile) => {
    if (user.type === 'ong') return t.ongRole;
    if (user.id === 'user_donor_mariana') return t.donorRole;
    return t.requesterRole;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div 
            id="nav-logo"
            onClick={() => setActiveTab('catalog')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-stone-900 tracking-tight">Doa<span className="text-emerald-600">Fácil</span></span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.brandTagline}
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">{t.brandSubtag}</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-tab-catalog"
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              {t.exploreDonations}
            </button>

            <button
              id="nav-tab-donor-dashboard"
              onClick={() => setActiveTab('donor-dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 relative ${
                activeTab === 'donor-dashboard'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Inbox className="w-4 h-4" />
              {t.donorDashboard}
              {pendingRequestsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-amber-500 text-white animate-pulse">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-my-requests"
              onClick={() => setActiveTab('my-requests')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 relative ${
                activeTab === 'my-requests'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              {t.myRequests}
              {authorizedRequestsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  {authorizedRequestsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action: Language Selector + New Donation Button + User switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <LanguageSelector />

            <button
              id="nav-btn-new-donation"
              onClick={() => setActiveTab('new-donation')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 sm:gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.wantToDonate}</span>
              <span className="sm:hidden">{t.donateShort}</span>
            </button>

            {/* Profile / Role quick switcher */}
            <div className="relative group">
              <div 
                id="user-switcher-trigger"
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-stone-800 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.type === 'ong' ? 'ONG' : currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block max-w-[130px]">
                  <p className="text-xs font-bold text-stone-900 truncate leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{getUserRoleLabel(currentUser)}</p>
                </div>
                <Users className="w-3.5 h-3.5 text-stone-400" />
              </div>

              {/* Switcher dropdown */}
              <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 hidden group-hover:block transition-all z-50">
                <div className="px-3 py-1.5 border-b border-stone-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{t.testUsers}</p>
                  <p className="text-xs text-stone-500">{t.testUsersDesc}</p>
                </div>
                {allUsers.map((user) => (
                  <button
                    key={user.id}
                    id={`user-opt-${user.id}`}
                    onClick={() => onSelectUser(user)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-stone-50 transition-colors ${
                      user.id === currentUser.id ? 'bg-emerald-50/70 text-emerald-950 font-medium' : 'text-stone-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      user.type === 'ong' 
                        ? 'bg-purple-100 text-purple-800' 
                        : user.id === 'user_donor_mariana'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type === 'ong' ? 'ONG' : user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{getUserRoleLabel(user)}</p>
                    </div>
                    {user.id === currentUser.id && (
                      <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden border-t border-stone-100 py-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'
            }`}
          >
            {t.exploreDonations}
          </button>
          <button
            onClick={() => setActiveTab('donor-dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'donor-dashboard' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'
            }`}
          >
            {t.donorDashboard}
            {pendingRequestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white">
                {pendingRequestsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'my-requests' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-stone-600'
            }`}
          >
            {t.myRequests}
            {authorizedRequestsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white">
                {authorizedRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
