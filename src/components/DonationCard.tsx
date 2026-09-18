import React from 'react';
import { MapPin, Lock, Unlock, Eye, HeartHandshake, CheckCircle2, Clock, Camera } from 'lucide-react';
import { DonationItem, UserProfile } from '../types';
import { CATEGORY_LABELS, CONDITION_LABELS } from '../data/initialData';
import { useLanguage } from '../i18n/LanguageContext';

interface DonationCardProps {
  item: DonationItem;
  currentUser: UserProfile;
  onViewDetails: (item: DonationItem) => void;
  onRequestItem: (item: DonationItem) => void;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  item,
  currentUser,
  onViewDetails,
  onRequestItem,
}) => {
  const { t, getCategoryLabel, getConditionLabel, getStatusLabel } = useLanguage();

  const isDonor = item.donor.id === currentUser.id;
  const isAuthorizedRequester = item.authorizedRequesterId === currentUser.id;
  const userRequest = item.requests.find((r) => r.requesterId === currentUser.id);

  const categoryMeta = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['outros'];
  const conditionMeta = CONDITION_LABELS[item.condition] || CONDITION_LABELS['bom'];

  const getStatusBadge = () => {
    switch (item.status) {
      case 'disponivel':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {t.statusAvailable}
          </span>
        );
      case 'em_analise':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            {getStatusLabel('em_analise', item.requests.length)}
          </span>
        );
      case 'autorizado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-600" />
            {t.statusAuthorized}
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-700">
            {t.statusCompleted}
          </span>
        );
    }
  };

  return (
    <div 
      id={`donation-card-${item.id}`}
      className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group hover:border-stone-300"
    >
      {/* Card Image & Overlay Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
          {getStatusBadge()}
          
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border shadow-2xs backdrop-blur-md bg-white/90 ${categoryMeta.color}`}>
            {getCategoryLabel(item.category)}
          </span>
        </div>

        {/* Photos count */}
        {item.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-medium px-2 py-0.8 rounded-md backdrop-blur-xs flex items-center gap-1">
            <Camera className="w-3 h-3" />
            {item.images.length} fotos
          </div>
        )}

        {/* Condition tag */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-0.8 rounded-md text-[11px] font-semibold border backdrop-blur-sm bg-white/95 ${conditionMeta.badgeClass}`}>
            {getConditionLabel(item.condition)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Location Area - Core Safe Collection Requirement */}
          <div className="mt-4 rounded-xl border p-3 bg-stone-50 border-stone-200/80">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-stone-900 truncate">
                    {item.approximateLocation.neighborhood}, {item.approximateLocation.city} - {item.approximateLocation.state}
                  </span>
                  <span className="text-[10px] font-medium text-stone-500 shrink-0">
                    ~{item.approximateLocation.approximateRadiusKm} {t.approxRadius}
                  </span>
                </div>

                {/* Privacy Lock or Unlock indicator */}
                {isAuthorizedRequester || isDonor ? (
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                    <Unlock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t.unlockedForYou}</span>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                    <Lock className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{t.addressSecretUntilAuthorized}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Donor badge / request status info */}
          <div className="text-xs text-stone-500 truncate">
            {isDonor ? (
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md">{t.youAreDonor}</span>
            ) : userRequest ? (
              <span className={`px-2 py-0.5 rounded-md font-medium ${
                userRequest.status === 'autorizado' 
                  ? 'bg-teal-100 text-teal-800' 
                  : userRequest.status === 'recusado' 
                    ? 'bg-rose-50 text-rose-700' 
                    : 'bg-amber-50 text-amber-800'
              }`}>
                {userRequest.status === 'autorizado' ? t.pickupApproved : t.requestedByYou}
              </span>
            ) : (
              <span>{t.byDonor} <strong className="text-stone-700 font-medium">{item.donor.name.split(' ')[0]}</strong></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`btn-view-details-${item.id}`}
              onClick={() => onViewDetails(item)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              {t.details}
            </button>

            {!isDonor && item.status !== 'concluido' && (
              <button
                id={`btn-request-${item.id}`}
                onClick={() => {
                  if (userRequest && userRequest.status === 'autorizado') {
                    onViewDetails(item);
                  } else {
                    onRequestItem(item);
                  }
                }}
                disabled={item.status === 'autorizado' && !isAuthorizedRequester}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isAuthorizedRequester
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : item.status === 'autorizado'
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : userRequest
                        ? 'bg-stone-800 text-white hover:bg-stone-900'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                }`}
              >
                {isAuthorizedRequester ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    {t.viewAddress}
                  </>
                ) : userRequest ? (
                  <>{t.viewRequest}</>
                ) : (
                  <>
                    <HeartHandshake className="w-3.5 h-3.5" />
                    {t.requestAction}
                  </>
                )}
              </button>
            )}

            {isDonor && (
              <button
                id={`btn-manage-requests-${item.id}`}
                onClick={() => onViewDetails(item)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                {t.manageRequests} ({item.requests.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
