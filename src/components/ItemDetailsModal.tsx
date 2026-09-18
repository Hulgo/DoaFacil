import React, { useState } from 'react';
import { 
  X, MapPin, Lock, Unlock, ShieldCheck, CheckCircle2, 
  ExternalLink, HeartHandshake, User, 
  Building2, MessageCircle, ChevronLeft, ChevronRight, Copy, Check, Clock
} from 'lucide-react';
import { DonationItem, UserProfile } from '../types';
import { CATEGORY_LABELS, CONDITION_LABELS } from '../data/initialData';
import { useLanguage } from '../i18n/LanguageContext';

interface ItemDetailsModalProps {
  item: DonationItem;
  currentUser: UserProfile;
  onClose: () => void;
  onRequestItem: (item: DonationItem) => void;
  onAuthorizeRequest: (itemId: string, requestId: string) => void;
  onRejectRequest: (itemId: string, requestId: string) => void;
  onMarkDelivered: (itemId: string) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  currentUser,
  onClose,
  onRequestItem,
  onAuthorizeRequest,
  onRejectRequest,
  onMarkDelivered,
}) => {
  const { t, language, getCategoryLabel, getConditionLabel } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [confirmAuthorizeId, setConfirmAuthorizeId] = useState<string | null>(null);

  const isDonor = item.donor.id === currentUser.id;
  const isAuthorizedRequester = item.authorizedRequesterId === currentUser.id;
  const userRequest = item.requests.find((r) => r.requesterId === currentUser.id);

  const categoryMeta = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['outros'];
  const conditionMeta = CONDITION_LABELS[item.condition] || CONDITION_LABELS['bom'];

  const fullAddressString = `${item.fullAddress.street}, ${item.fullAddress.number}${
    item.fullAddress.complement ? ' - ' + item.fullAddress.complement : ''
  }, ${item.approximateLocation.neighborhood}, ${item.approximateLocation.city} - ${item.approximateLocation.state}${
    item.fullAddress.zipCode ? `, CEP/Postal ${item.fullAddress.zipCode}` : ''
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullAddressString);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const localeCode = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-xs">
      <div 
        id="item-details-modal"
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 bg-stone-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.8 rounded-full text-xs font-semibold border ${categoryMeta.color}`}>
              {getCategoryLabel(item.category)}
            </span>
            <span className={`px-2.5 py-0.8 rounded-full text-xs font-semibold border ${conditionMeta.badgeClass}`}>
              {getConditionLabel(item.condition)}
            </span>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors border border-stone-200 shadow-2xs"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 sm:pb-8 overflow-y-auto space-y-6">
          {/* Main Grid: Gallery + Item Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Gallery Column */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                <img
                  src={item.images[activeImageIndex] || item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-xs"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-xs"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 scale-95 shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {item.title}
                </h1>

                <div className="mt-2.5 flex items-center gap-3 text-xs text-stone-500">
                  <span>{t.publishedOn} {new Date(item.createdAt).toLocaleDateString(localeCode)}</span>
                  <span>•</span>
                  <span>{t.donorLabel}: <strong className="text-stone-700">{item.donor.name}</strong></span>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">{t.itemDescription}</h4>
                  <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Bar for Requesting or Managing */}
              <div className="mt-6 pt-4 border-t border-stone-200">
                {!isDonor && (
                  <div>
                    {isAuthorizedRequester ? (
                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-teal-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{t.unlockedForYou}</span>
                      </div>
                    ) : userRequest ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{t.alreadyRequestedNotice} ({userRequest.status === 'pendente' ? t.waitingDonorEvaluation : userRequest.status}).</span>
                        </div>
                      </div>
                    ) : item.status === 'concluido' ? (
                      <div className="bg-stone-100 text-stone-500 text-xs p-3 rounded-xl text-center">
                        {t.alreadyDeliveredNotice}
                      </div>
                    ) : item.status === 'autorizado' ? (
                      <div className="bg-stone-100 text-stone-600 text-xs p-3 rounded-xl text-center">
                        {t.reservedForOther}
                      </div>
                    ) : (
                      <button
                        id="btn-modal-request-item"
                        onClick={() => onRequestItem(item)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <HeartHandshake className="w-4 h-4" />
                        {t.requestThisDonation}
                      </button>
                    )}
                  </div>
                )}

                {isDonor && (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900 flex items-center justify-between">
                    <span className="font-medium">{t.youAreOwner}</span>
                    {item.status === 'autorizado' && (
                      <button
                        onClick={() => onMarkDelivered(item.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs shadow-2xs"
                      >
                        {t.markDelivered}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Address and Collection Security Card */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Address Banner Header */}
            <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
              isAuthorizedRequester || isDonor 
                ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200' 
                : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isAuthorizedRequester || isDonor ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {isAuthorizedRequester || isDonor ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    {isAuthorizedRequester || isDonor ? t.definitiveAddress : t.pickupLocation}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isAuthorizedRequester || isDonor
                      ? t.unlockedAddressNotice
                      : t.confidentialExplanation}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isAuthorizedRequester || isDonor
                  ? 'bg-teal-100 text-teal-800 border-teal-300'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {isAuthorizedRequester || isDonor ? t.accessAuthorizedBadge : t.confidentialAddressBadge}
              </span>
            </div>

            {/* Address Body */}
            <div className="p-5 sm:p-6 bg-white">
              {isAuthorizedRequester || isDonor ? (
                /* UNLOCKED FULL ADDRESS STATE */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-teal-900 uppercase tracking-wider">{t.definitiveAddress}</p>
                          <p className="text-base font-bold text-stone-900 mt-0.5">
                            {item.fullAddress.street}, {item.fullAddress.number}
                            {item.fullAddress.complement && ` (${item.fullAddress.complement})`}
                          </p>
                          <p className="text-sm text-stone-700">
                            {t.neighborhoodLabel}: {item.approximateLocation.neighborhood} • {item.approximateLocation.city} - {item.approximateLocation.state}
                          </p>
                          {item.fullAddress.zipCode && (
                            <p className="text-xs text-stone-500 mt-0.5">{t.zipCodeLabel}: {item.fullAddress.zipCode}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-1.5 rounded-lg bg-white border border-teal-300 hover:bg-teal-50 text-teal-800 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedAddress ? t.copied : t.copyAddress}
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-teal-200/60 text-xs">
                      <div>
                        <strong className="text-stone-900 block mb-0.5">{t.pickupInstructionsLabel}</strong>
                        <p className="text-stone-700">{item.fullAddress.pickupInstructions || '—'}</p>
                      </div>
                      <div>
                        <strong className="text-stone-900 block mb-0.5">{t.availableHoursLabel}</strong>
                        <p className="text-stone-700">{item.fullAddress.availableTimes || '—'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions for Authorized Requester: Google Maps & WhatsApp */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressString)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.openGoogleMaps}
                    </a>

                    <a
                      href={`https://wa.me/55${item.donor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Olá ${item.donor.name}, fui autorizado(a) no DoaFácil para retirar a doação "${item.title}". Gostaria de combinar a coleta!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t.whatsappWithDonor} {item.donor.name.split(' ')[0]} ({item.donor.phone})
                    </a>
                  </div>
                </div>
              ) : (
                /* APPROXIMATE LOCATION WITH SECURITY BLUR / NOTICE */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Visual Radial Map Graphic */}
                    <div className="sm:col-span-5 bg-stone-100 rounded-xl p-4 border border-stone-200/90 relative overflow-hidden flex flex-col items-center justify-center text-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" />
                        <div className="absolute inset-2 rounded-full bg-emerald-500/20 border-2 border-dashed border-emerald-500/50" />
                        <div className="relative z-10 w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <span className="mt-2 text-xs font-bold text-stone-800">
                        {item.approximateLocation.neighborhood}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        ~{item.approximateLocation.approximateRadiusKm} {t.approxRadius}
                      </span>
                    </div>

                    {/* Explanatory details */}
                    <div className="sm:col-span-7 space-y-2">
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>{item.approximateLocation.neighborhood}, {item.approximateLocation.city} - {item.approximateLocation.state}</span>
                      </div>

                      {item.approximateLocation.referenceZone && (
                        <p className="text-xs text-stone-600">
                          <strong>{t.referenceRegion}</strong> {item.approximateLocation.referenceZone}
                        </p>
                      )}

                      <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong>{t.dataProtectionBadge}:</strong> {t.approxLocationNotice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: Requests list (visible to the Donor) */}
          {isDonor && (
            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    {t.receivedRequests} ({item.requests.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t.donorRequestsExplanation}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3 bg-white">
                {item.requests.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-6">
                    {t.noRequestsYet}
                  </p>
                ) : (
                  item.requests.map((req) => (
                    <div 
                      key={req.id} 
                      className={`p-4 rounded-xl border transition-all ${
                        req.status === 'autorizado'
                          ? 'bg-teal-50/80 border-teal-300'
                          : req.status === 'recusado'
                            ? 'bg-stone-50 border-stone-200 opacity-60'
                            : 'bg-white border-stone-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            req.requesterType === 'ong' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {req.requesterType === 'ong' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-stone-900">{req.requesterName}</span>
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
                            </div>

                            <p className="text-xs text-stone-500 mt-0.5">
                              {req.phone} • {req.email}
                            </p>
                          </div>
                        </div>

                        {/* Donor action buttons */}
                        {req.status === 'pendente' && (
                          <div className="flex items-center gap-2">
                            {confirmAuthorizeId === req.id ? (
                              <div className="flex items-center gap-2 bg-amber-50 p-1.5 rounded-lg border border-amber-300">
                                <span className="text-[11px] font-semibold text-amber-900">{t.confirmAddressRelease}</span>
                                <button
                                  onClick={() => {
                                    onAuthorizeRequest(item.id, req.id);
                                    setConfirmAuthorizeId(null);
                                  }}
                                  className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                                >
                                  {t.yesAuthorize}
                                </button>
                                <button
                                  onClick={() => setConfirmAuthorizeId(null)}
                                  className="px-2 py-1 rounded bg-stone-200 text-stone-700 text-xs"
                                >
                                  {t.cancel}
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => setConfirmAuthorizeId(req.id)}
                                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
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
                      </div>

                      {/* Request Justification & Pickup plan */}
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 border-t border-stone-200/70 text-xs">
                        <div className="bg-stone-50/80 p-2.5 rounded-lg">
                          <strong className="text-stone-800 block mb-0.5">{t.purposeLabel}</strong>
                          <p className="text-stone-600">{req.purpose}</p>
                        </div>
                        <div className="bg-stone-50/80 p-2.5 rounded-lg">
                          <strong className="text-stone-800 block mb-0.5">{t.transportPlanLabel}</strong>
                          <p className="text-stone-600">{req.pickupPlan} ({req.preferredDate})</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
