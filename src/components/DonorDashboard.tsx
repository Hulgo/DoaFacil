import React, { useState } from 'react';
import { 
  PlusCircle, CheckCircle2, Clock, MapPin, Lock, Unlock, 
  User, Building2, MessageCircle, Eye, Check 
} from 'lucide-react';
import { DonationItem, UserProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface DonorDashboardProps {
  items: DonationItem[];
  currentUser: UserProfile;
  onOpenNewDonation: () => void;
  onViewItem: (item: DonationItem) => void;
  onAuthorizeRequest: (itemId: string, requestId: string) => void;
  onRejectRequest: (itemId: string, requestId: string) => void;
  onMarkDelivered: (itemId: string) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({
  items,
  currentUser,
  onOpenNewDonation,
  onViewItem,
  onAuthorizeRequest,
  onRejectRequest,
  onMarkDelivered,
}) => {
  const { t, getStatusLabel } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'pending' | 'authorized' | 'completed'>('all');
  const [confirmingReqId, setConfirmingReqId] = useState<string | null>(null);

  // Filter donor items
  const donorItems = items.filter((item) => item.donor.id === currentUser.id);

  const filteredItems = donorItems.filter((item) => {
    if (filter === 'pending') {
      return item.requests.some((r) => r.status === 'pendente');
    }
    if (filter === 'authorized') {
      return item.status === 'autorizado';
    }
    if (filter === 'completed') {
      return item.status === 'concluido';
    }
    return true;
  });

  const totalPendingRequests = donorItems.reduce(
    (acc, it) => acc + it.requests.filter((r) => r.status === 'pendente').length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              {t.donorDashboardTitle}
            </h1>
            <span className="text-xs px-2.5 py-0.8 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
              {donorItems.length} {donorItems.length === 1 ? t.registeredSingular : t.registeredPlural}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.donorDashboardSubtitle}
          </p>
        </div>

        <button
          id="donor-btn-add-item"
          onClick={onOpenNewDonation}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          {t.wantToDonate}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            filter === 'all'
              ? 'bg-stone-900 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          {t.allFilter} ({donorItems.length})
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'pending'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          {t.waitingAuthFilter}
          {totalPendingRequests > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              filter === 'pending' ? 'bg-amber-800 text-white' : 'bg-amber-500 text-white'
            }`}>
              {totalPendingRequests}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilter('authorized')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'authorized'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          {t.authorizedFilter}
        </button>

        <button
          onClick={() => setFilter('completed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'completed'
              ? 'bg-stone-800 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t.completedFilter}
        </button>
      </div>

      {/* Items list */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-stone-800">{t.noDonorItemsTitle}</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-5">
            {t.noDonorItemsDesc}
          </p>
          <button
            onClick={onOpenNewDonation}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
          >
            {t.registerFirstDonation}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const authorizedReq = item.requests.find((r) => r.status === 'autorizado');

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
              >
                {/* Item Summary Bar */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100">
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-base text-stone-900">{item.title}</h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          item.status === 'disponivel'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'autorizado'
                              ? 'bg-teal-100 text-teal-800'
                              : item.status === 'concluido'
                                ? 'bg-stone-200 text-stone-700'
                                : 'bg-amber-100 text-amber-800'
                        }`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {t.approximateLocationLabel}: {item.approximateLocation.neighborhood}, {item.approximateLocation.city}
                        </span>
                        <span>•</span>
                        <span>{item.requests.length} {item.requests.length === 1 ? t.requestsCountSingular : t.requestsCountPlural}</span>
                      </div>

                      {/* Registered Full Address Preview */}
                      <p className="text-xs text-teal-900 mt-1.5 flex items-center gap-1 font-medium bg-teal-50/70 px-2 py-1 rounded-md w-fit">
                        <Lock className="w-3 h-3 text-teal-700" />
                        {t.definitiveAddress}: {item.fullAddress.street}, {item.fullAddress.number} {item.fullAddress.complement ? `(${item.fullAddress.complement})` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Top Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => onViewItem(item)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {t.details}
                    </button>

                    {item.status === 'autorizado' && (
                      <button
                        onClick={() => onMarkDelivered(item.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {t.markDelivered}
                      </button>
                    )}
                  </div>
                </div>

                {/* Requests Box */}
                <div className="p-4 sm:p-5 bg-stone-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {t.requestsForThisItem} ({item.requests.length})
                    </h4>
                    {item.status === 'autorizado' && authorizedReq && (
                      <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                        <Unlock className="w-3.5 h-3.5 text-teal-600" />
                        {t.addressReleasedTo} {authorizedReq.requesterName}
                      </span>
                    )}
                  </div>

                  {item.requests.length === 0 ? (
                    <p className="text-xs text-stone-500 py-3 text-center">
                      {t.noRequestsYet}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {item.requests.map((req) => (
                        <div
                          key={req.id}
                          className={`p-4 rounded-xl border bg-white transition-all ${
                            req.status === 'autorizado'
                              ? 'border-teal-300 ring-1 ring-teal-200'
                              : req.status === 'recusado'
                                ? 'border-stone-200 opacity-60'
                                : 'border-stone-200'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                                req.requesterType === 'ong' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {req.requesterType === 'ong' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <strong className="text-sm text-stone-900">{req.requesterName}</strong>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                    req.requesterType === 'ong' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {req.requesterType === 'ong' ? (req.institutionName ? `${t.ngo}: ${req.institutionName}` : t.ngo) : t.individual}
                                  </span>

                                  {req.status === 'autorizado' && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                                      {t.accessAuthorizedBadge}
                                    </span>
                                  )}
                                  {req.status === 'recusado' && (
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
                                      {t.statusRejected}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-stone-500 mt-0.5">
                                  {req.phone} • {req.email}
                                </p>
                              </div>
                            </div>

                            {/* Request Action Controls */}
                            {req.status === 'pendente' && (
                              <div className="flex items-center gap-2 shrink-0">
                                {confirmingReqId === req.id ? (
                                  <div className="bg-amber-50 border border-amber-300 p-2 rounded-xl flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-amber-900">{t.confirmAddressRelease}</span>
                                    <button
                                      onClick={() => {
                                        onAuthorizeRequest(item.id, req.id);
                                        setConfirmingReqId(null);
                                      }}
                                      className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg"
                                    >
                                      {t.yesAuthorize}
                                    </button>
                                    <button
                                      onClick={() => setConfirmingReqId(null)}
                                      className="px-2 py-1 bg-stone-200 text-stone-700 text-xs rounded-lg"
                                    >
                                      {t.cancel}
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => setConfirmingReqId(req.id)}
                                      className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                                    >
                                      <Unlock className="w-3.5 h-3.5" />
                                      {t.authorizePickup}
                                    </button>
                                    <button
                                      onClick={() => onRejectRequest(item.id, req.id)}
                                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-medium transition-colors"
                                    >
                                      {t.reject}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}

                            {req.status === 'autorizado' && (
                              <a
                                href={`https://wa.me/55${req.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Olá ${req.requesterName}, sua coleta da doação "${item.title}" foi autorizada! Nosso endereço é ${item.fullAddress.street}, ${item.fullAddress.number}. Qual o melhor horário para retirada?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs shrink-0"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                {t.callOnWhatsapp}
                              </a>
                            )}
                          </div>

                          {/* Reason & Transport details */}
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2.5 border-t border-stone-100">
                            <div>
                              <span className="font-semibold text-stone-700 block">{t.reasonStated}:</span>
                              <p className="text-stone-600">{req.purpose}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-stone-700 block">{t.transportPlanAndDate}:</span>
                              <p className="text-stone-600">{req.pickupPlan} ({req.preferredDate})</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
