import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, RefreshCw, CheckCircle2 
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PrivacyBanner } from './components/PrivacyBanner';
import { DonationCard } from './components/DonationCard';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { NewDonationModal } from './components/NewDonationModal';
import { RequestDonationModal } from './components/RequestDonationModal';
import { DonorDashboard } from './components/DonorDashboard';
import { RequesterDashboard } from './components/RequesterDashboard';
import { DonationItem, DonationRequest, UserProfile } from './types';
import { INITIAL_DONATIONS, DEMO_USERS, CATEGORY_LABELS } from './data/initialData';
import { useLanguage } from './i18n/LanguageContext';

const STORAGE_ITEMS_KEY = 'doafacil_items_v2';
const STORAGE_USER_KEY = 'doafacil_current_user_v2';

export default function App() {
  const { t, getCategoryLabel } = useLanguage();

  // Persistence state
  const [items, setItems] = useState<DonationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ITEMS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading items from localStorage', e);
    }
    return INITIAL_DONATIONS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading user from localStorage', e);
    }
    return DEMO_USERS[0]; // Mariana Silveira (Doadora)
  });

  // Navigation & Modals state
  const [activeTab, setActiveTab] = useState<'catalog' | 'new-donation' | 'donor-dashboard' | 'my-requests'>('catalog');
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<DonationItem | null>(null);
  const [selectedItemForRequest, setSelectedItemForRequest] = useState<DonationItem | null>(null);
  const [isNewDonationModalOpen, setIsNewDonationModalOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('todos');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'success' | 'info' } | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving items to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }, [currentUser]);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Distinct neighborhoods for filter
  const neighborhoods = Array.from(new Set(items.map((i) => i.approximateLocation.neighborhood)));

  // Filtered items
  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedNeighborhood !== 'todos' && item.approximateLocation.neighborhood !== selectedNeighborhood) {
      return false;
    }
    if (onlyAvailable && item.status !== 'disponivel') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLocation = `${item.approximateLocation.neighborhood} ${item.approximateLocation.city}`.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLocation) {
        return false;
      }
    }
    return true;
  });

  // Action handlers
  const handleSaveDonation = (newItem: DonationItem) => {
    setItems((prev) => [newItem, ...prev]);
    setIsNewDonationModalOpen(false);
    showToast(
      t.donationSuccessTitle,
      `${newItem.title}: ${t.donationSuccessDesc}`
    );
  };

  const handleSubmitRequest = (newRequest: DonationRequest) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === newRequest.itemId) {
          return {
            ...item,
            status: item.status === 'disponivel' ? 'em_analise' : item.status,
            requests: [newRequest, ...item.requests],
          };
        }
        return item;
      })
    );

    setSelectedItemForRequest(null);
    if (selectedItemForDetails && selectedItemForDetails.id === newRequest.itemId) {
      setSelectedItemForDetails((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'disponivel' ? 'em_analise' : prev.status,
              requests: [newRequest, ...prev.requests],
            }
          : null
      );
    }

    showToast(
      t.requestSentTitle,
      t.requestSentDesc
    );
  };

  const handleAuthorizeRequest = (itemId: string, requestId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const targetReq = item.requests.find((r) => r.id === requestId);
          const updatedRequests = item.requests.map((r) => {
            if (r.id === requestId) {
              return { ...r, status: 'autorizado' as const, authorizedAt: new Date().toISOString() };
            }
            return r;
          });

          return {
            ...item,
            status: 'autorizado' as const,
            authorizedRequestId: requestId,
            authorizedRequesterId: targetReq?.requesterId,
            requests: updatedRequests,
          };
        }
        return item;
      })
    );

    // Update modal view if currently open
    if (selectedItemForDetails && selectedItemForDetails.id === itemId) {
      const targetReq = selectedItemForDetails.requests.find((r) => r.id === requestId);
      setSelectedItemForDetails({
        ...selectedItemForDetails,
        status: 'autorizado',
        authorizedRequestId: requestId,
        authorizedRequesterId: targetReq?.requesterId,
        requests: selectedItemForDetails.requests.map((r) =>
          r.id === requestId ? { ...r, status: 'autorizado', authorizedAt: new Date().toISOString() } : r
        ),
      });
    }

    showToast(
      t.authorizedSuccessTitle,
      t.authorizedSuccessDesc
    );
  };

  const handleRejectRequest = (itemId: string, requestId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            requests: item.requests.map((r) =>
              r.id === requestId ? { ...r, status: 'recusado' as const } : r
            ),
          };
        }
        return item;
      })
    );

    if (selectedItemForDetails && selectedItemForDetails.id === itemId) {
      setSelectedItemForDetails({
        ...selectedItemForDetails,
        requests: selectedItemForDetails.requests.map((r) =>
          r.id === requestId ? { ...r, status: 'recusado' } : r
        ),
      });
    }

    showToast(t.rejectedSuccessTitle, t.rejectedSuccessDesc, 'info');
  };

  const handleMarkDelivered = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: 'concluido' as const } : item))
    );

    if (selectedItemForDetails && selectedItemForDetails.id === itemId) {
      setSelectedItemForDetails({
        ...selectedItemForDetails,
        status: 'concluido',
      });
    }

    showToast(t.deliveredCompletedTitle, t.deliveredCompletedDesc);
  };

  const handleResetData = () => {
    if (window.confirm(t.restoreConfirm)) {
      setItems(INITIAL_DONATIONS);
      localStorage.removeItem(STORAGE_ITEMS_KEY);
      showToast(t.restoreTestData, t.donationSuccessDesc);
    }
  };

  // Badge counters
  const donorItems = items.filter((i) => i.donor.id === currentUser.id);
  const pendingRequestsCount = donorItems.reduce(
    (acc, it) => acc + it.requests.filter((r) => r.status === 'pendente').length,
    0
  );

  const authorizedRequestsCount = items.reduce((acc, it) => {
    const isAuthorized = it.requests.some(
      (r) => r.requesterId === currentUser.id && r.status === 'autorizado'
    );
    return isAuthorized ? acc + 1 : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border border-stone-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold">{toastMessage.title}</h4>
            <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'new-donation') {
            setIsNewDonationModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentUser={currentUser}
        allUsers={DEMO_USERS}
        onSelectUser={(user) => {
          setCurrentUser(user);
          showToast(t.profileSwitchedTitle, `${user.name} (${user.roleLabel})`, 'info');
        }}
        pendingRequestsCount={pendingRequestsCount}
        authorizedRequestsCount={authorizedRequestsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Privacy & Safe Collection Explainer */}
            <PrivacyBanner />

            {/* Filter & Search Toolbar */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search field */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-catalog-search"
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
                    >
                      {t.clear}
                    </button>
                  )}
                </div>

                {/* Secondary filters (Neighborhood & Availability) */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <select
                      id="select-filter-neighborhood"
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="text-xs text-stone-700 bg-transparent focus:outline-none font-medium"
                    >
                      <option value="todos">{t.allNeighborhoods}</option>
                      {neighborhoods.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer select-none bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
                    <input
                      type="checkbox"
                      checked={onlyAvailable}
                      onChange={(e) => setOnlyAvailable(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    {t.onlyAvailable}
                  </label>
                </div>
              </div>

              {/* Categories Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {Object.entries(CATEGORY_LABELS).map(([key]) => {
                  const isSelected = selectedCategory === key;
                  const label = key === 'todos' ? t.catAll : getCategoryLabel(key);
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-stone-900 text-white font-semibold shadow-2xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count & Stats Bar */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>
                {t.showingDonations} <strong className="text-stone-800 font-semibold">{filteredItems.length}</strong> {filteredItems.length === 1 ? t.donationSingular : t.donationsPlural}
              </span>

              <button
                onClick={handleResetData}
                className="text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors"
                title={t.restoreTestData}
              >
                <RefreshCw className="w-3 h-3" />
                {t.restoreTestData}
              </button>
            </div>

            {/* Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-stone-800">{t.noItemsFound}</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
                  {t.tryDifferentSearch}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('todos');
                    setSelectedNeighborhood('todos');
                    setOnlyAvailable(false);
                  }}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
                >
                  {t.clearAllFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <DonationCard
                    key={item.id}
                    item={item}
                    currentUser={currentUser}
                    onViewDetails={(it) => setSelectedItemForDetails(it)}
                    onRequestItem={(it) => setSelectedItemForRequest(it)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DONOR DASHBOARD */}
        {activeTab === 'donor-dashboard' && (
          <DonorDashboard
            items={items}
            currentUser={currentUser}
            onOpenNewDonation={() => setIsNewDonationModalOpen(true)}
            onViewItem={(it) => setSelectedItemForDetails(it)}
            onAuthorizeRequest={handleAuthorizeRequest}
            onRejectRequest={handleRejectRequest}
            onMarkDelivered={handleMarkDelivered}
          />
        )}

        {/* VIEW 3: REQUESTER DASHBOARD */}
        {activeTab === 'my-requests' && (
          <RequesterDashboard
            items={items}
            currentUser={currentUser}
            onViewItem={(it) => setSelectedItemForDetails(it)}
            onExploreItems={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-stone-900">{t.brandName}</span>
            <span>—</span>
            <span>{t.brandSubtag}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{t.accessAuthorizedBadge}</span>
            <span>•</span>
            <button
              onClick={() => {
                setIsNewDonationModalOpen(true);
              }}
              className="text-emerald-700 font-semibold hover:underline"
            >
              {t.wantToDonate}
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Item Details Modal */}
      {selectedItemForDetails && (
        <ItemDetailsModal
          item={selectedItemForDetails}
          currentUser={currentUser}
          onClose={() => setSelectedItemForDetails(null)}
          onRequestItem={(it) => {
            setSelectedItemForDetails(null);
            setSelectedItemForRequest(it);
          }}
          onAuthorizeRequest={handleAuthorizeRequest}
          onRejectRequest={handleRejectRequest}
          onMarkDelivered={handleMarkDelivered}
        />
      )}

      {/* 2. New Donation Modal */}
      {isNewDonationModalOpen && (
        <NewDonationModal
          currentUser={currentUser}
          onClose={() => setIsNewDonationModalOpen(false)}
          onSaveDonation={handleSaveDonation}
        />
      )}

      {/* 3. Request Donation Modal */}
      {selectedItemForRequest && (
        <RequestDonationModal
          item={selectedItemForRequest}
          currentUser={currentUser}
          onClose={() => setSelectedItemForRequest(null)}
          onSubmitRequest={handleSubmitRequest}
        />
      )}
    </div>
  );
}
