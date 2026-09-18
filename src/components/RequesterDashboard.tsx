import React from 'react';
import { 
  Heart, Clock, MapPin, Unlock, Lock, 
  ExternalLink, MessageCircle, Eye 
} from 'lucide-react';
import { DonationItem, DonationRequest, UserProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RequesterDashboardProps {
  items: DonationItem[];
  currentUser: UserProfile;
  onViewItem: (item: DonationItem) => void;
  onExploreItems: () => void;
}

export const RequesterDashboard: React.FC<RequesterDashboardProps> = ({
  items,
  currentUser,
  onViewItem,
  onExploreItems,
}) => {
  const { t } = useLanguage();

  // Find all requests made by the current user across all items
  const userRequestsWithItems: { request: DonationRequest; item: DonationItem }[] = [];

  items.forEach((item) => {
    item.requests.forEach((req) => {
      if (req.requesterId === currentUser.id) {
        userRequestsWithItems.push({ request: req, item });
      }
    });
  });

  const authorizedList = userRequestsWithItems.filter((r) => r.request.status === 'autorizado');
  const pendingList = userRequestsWithItems.filter((r) => r.request.status === 'pendente');
  const otherList = userRequestsWithItems.filter(
    (r) => r.request.status === 'recusado' || r.request.status === 'concluido'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              {t.requesterDashboardTitle}
            </h1>
            <span className="text-xs px-2.5 py-0.8 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
              {userRequestsWithItems.length} {userRequestsWithItems.length === 1 ? t.requestsCountSingular : t.requestsCountPlural}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.requesterDashboardSubtitle}
          </p>
        </div>

        <button
          onClick={onExploreItems}
          className="bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <Heart className="w-4 h-4 text-emerald-400" />
          {t.exploreMoreDonations}
        </button>
      </div>

      {userRequestsWithItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-stone-800">{t.noRequestsTitle}</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-5">
            {t.noRequestsDesc}
          </p>
          <button
            onClick={onExploreItems}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
          >
            {t.viewAvailableDonations}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. HIGHLIGHT: Authorized Pickups (Address Unlocked!) */}
          {authorizedList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                <h2 className="font-display font-bold text-lg text-stone-900">
                  {t.authorizedPickupsTitle} ({authorizedList.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {authorizedList.map(({ request, item }) => {
                  const fullAddressString = `${item.fullAddress.street}, ${item.fullAddress.number}${
                    item.fullAddress.complement ? ' - ' + item.fullAddress.complement : ''
                  }, ${item.approximateLocation.neighborhood}, ${item.approximateLocation.city} - ${item.approximateLocation.state}${
                    item.fullAddress.zipCode ? `, CEP/Postal ${item.fullAddress.zipCode}` : ''
                  }`;

                  return (
                    <div 
                      key={request.id}
                      className="bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/50 rounded-2xl border-2 border-teal-400/80 p-5 sm:p-6 shadow-md relative overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-teal-200/60">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-teal-200 shrink-0 shadow-xs"
                          />
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full bg-teal-600 text-white text-xs font-bold shadow-2xs mb-1.5">
                              <Unlock className="w-3 h-3" />
                              {t.authorizedByDonorBadge}
                            </div>
                            <h3 className="font-display font-bold text-lg text-stone-900">{item.title}</h3>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {t.donorLabel}: <strong className="text-stone-800">{item.donor.name}</strong> • {t.phoneLabel}: {item.donor.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start lg:self-center">
                          <button
                            onClick={() => onViewItem(item)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 inline mr-1" />
                            {t.details}
                          </button>
                        </div>
                      </div>

                      {/* Unlocked Address Card */}
                      <div className="mt-4 bg-white rounded-xl p-4 border border-teal-200/90 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                              {t.definitivePickupAddress}
                            </span>
                            <p className="text-base font-bold text-stone-900 mt-0.5">
                              {item.fullAddress.street}, {item.fullAddress.number}
                              {item.fullAddress.complement && ` (${item.fullAddress.complement})`}
                            </p>
                            <p className="text-xs text-stone-600">
                              {t.neighborhoodLabel}: {item.approximateLocation.neighborhood} • {item.approximateLocation.city} - {item.approximateLocation.state} {item.fullAddress.zipCode ? `• ${t.zipCodeLabel}: ${item.fullAddress.zipCode}` : ''}
                            </p>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-xs">
                              <div>
                                <strong className="text-stone-800 block">{t.pickupInstructionsLabel}:</strong>
                                <p className="text-stone-600">{item.fullAddress.pickupInstructions || '—'}</p>
                              </div>
                              <div>
                                <strong className="text-stone-800 block">{t.availableTimesLabel}:</strong>
                                <p className="text-stone-600">{item.fullAddress.availableTimes || '—'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Direct Action Links: Google Maps & WhatsApp */}
                        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressString)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {t.openGoogleMaps}
                          </a>

                          <a
                            href={`https://wa.me/55${item.donor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Olá ${item.donor.name}, fui autorizado(a) no DoaFácil para retirar a doação "${item.title}". Gostaria de confirmar a data e horário!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            {t.whatsappWithDonor}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Pending Requests (Waiting for donor authorization) */}
          {pendingList.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                {t.waitingDonorAuthTitle} ({pendingList.length})
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {pendingList.map(({ request, item }) => (
                  <div 
                    key={request.id}
                    className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-stone-900">{item.title}</h3>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            {t.statusInReview}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {t.approximateLocationLabel}: {item.approximateLocation.neighborhood}, {item.approximateLocation.city}
                        </p>
                        <p className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-stone-400" />
                          {t.definitiveAddressRevealedWhenApproved}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewItem(item)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 self-end sm:self-center"
                    >
                      {t.details}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. History / Rejected / Completed */}
          {otherList.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="font-display font-bold text-base text-stone-500">
                {t.previousHistoryTitle} ({otherList.length})
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {otherList.map(({ request, item }) => (
                  <div key={request.id} className="bg-stone-50 rounded-xl border border-stone-200 p-3.5 flex items-center justify-between gap-3 opacity-75">
                    <div>
                      <p className="text-xs font-bold text-stone-800">{item.title}</p>
                      <p className="text-[11px] text-stone-500">
                        {t.requestStatusLabel}: {request.status === 'recusado' ? t.statusRejected : t.statusCompleted}
                      </p>
                    </div>
                    <button
                      onClick={() => onViewItem(item)}
                      className="text-xs text-stone-600 hover:underline"
                    >
                      {t.details}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
