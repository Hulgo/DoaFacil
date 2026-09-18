import React, { useState } from 'react';
import { 
  X, HeartHandshake, User, Building2, 
  Lock, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { DonationItem, DonationRequest, UserProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RequestDonationModalProps {
  item: DonationItem;
  currentUser: UserProfile;
  onClose: () => void;
  onSubmitRequest: (request: DonationRequest) => void;
}

export const RequestDonationModal: React.FC<RequestDonationModalProps> = ({
  item,
  currentUser,
  onClose,
  onSubmitRequest,
}) => {
  const { t } = useLanguage();
  const [requesterType, setRequesterType] = useState<'pessoa_fisica' | 'ong'>(
    currentUser.type === 'ong' ? 'ong' : 'pessoa_fisica'
  );
  const [requesterName, setRequesterName] = useState(currentUser.name);
  const [institutionName, setInstitutionName] = useState(currentUser.institutionName || '');
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [purpose, setPurpose] = useState('');
  const [pickupPlan, setPickupPlan] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requesterName.trim()) {
      setErrorMessage('Informe seu nome ou responsável.');
      return;
    }

    if (requesterType === 'ong' && !institutionName.trim()) {
      setErrorMessage('Informe a razão social ou nome da ONG/Projeto Social.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Informe um telefone/WhatsApp para contato.');
      return;
    }

    if (!purpose.trim()) {
      setErrorMessage('Conte brevemente o motivo pelo qual você ou sua instituição precisa deste item.');
      return;
    }

    if (!pickupPlan.trim()) {
      setErrorMessage('Informe como pretende realizar o transporte do item.');
      return;
    }

    if (!preferredDate.trim()) {
      setErrorMessage('Informe a data ou período estimado para a coleta.');
      return;
    }

    const newRequest: DonationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      itemId: item.id,
      itemTitle: item.title,
      requesterId: currentUser.id,
      requesterName,
      requesterType,
      institutionName: requesterType === 'ong' ? institutionName : undefined,
      phone,
      email,
      purpose,
      pickupPlan,
      preferredDate,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };

    onSubmitRequest(newRequest);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900">{t.requestDonationTitle}</h2>
              <p className="text-xs text-stone-500">{t.requestDonationSubtitle}</p>
            </div>
          </div>

          <button
            id="btn-close-request-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors border border-stone-200 shadow-2xs"
            aria-label={t.cancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Target Item Summary card */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
            <img
              src={item.images[0]}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-stone-500 font-medium">{t.requestingItemNotice}:</p>
              <p className="text-sm font-bold text-stone-900 truncate">{item.title}</p>
              <p className="text-xs text-stone-600">
                {t.approximateLocationLabel}: {item.approximateLocation.neighborhood}, {item.approximateLocation.city} - {item.approximateLocation.state}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section: Requester type selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              {t.requestingAsLabel} *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRequesterType('pessoa_fisica')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  requesterType === 'pessoa_fisica'
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold shadow-2xs'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <User className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold">{t.individual}</p>
                  <p className="text-[11px] text-stone-500">{t.individualDesc}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRequesterType('ong')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  requesterType === 'ong'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-950 font-semibold shadow-2xs'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold">{t.ngo}</p>
                  <p className="text-[11px] text-stone-500">{t.ngoDesc}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {requesterType === 'ong' ? `${t.responsibleNameLabel} *` : `${t.yourFullNameLabel} *`}
              </label>
              <input
                type="text"
                required
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            {requesterType === 'ong' ? (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.ngoNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.ngoNamePlaceholder}
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">{t.phoneLabel} *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            )}
          </div>

          {requesterType === 'ong' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">{t.ngoPhoneLabel} *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">{t.ngoEmailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.whyNeedItemLabel} *
            </label>
            <textarea
              id="textarea-request-purpose"
              required
              rows={3}
              placeholder={t.whyNeedItemPlaceholder}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.howPickupLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={t.howPickupPlaceholder}
                value={pickupPlan}
                onChange={(e) => setPickupPlan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.preferredDateLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={t.preferredDatePlaceholder}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Privacy clarification */}
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>{t.confidentialAddressBadge}:</strong> {t.privacyNoticeRequest}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              {t.cancel}
            </button>
            <button
              id="btn-submit-request"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t.sendRequest}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
