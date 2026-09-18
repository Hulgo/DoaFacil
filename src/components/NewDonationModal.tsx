import React, { useState } from 'react';
import { 
  X, Upload, MapPin, Lock, 
  Trash2, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';
import { DonationItem, ItemCategory, ItemCondition, UserProfile } from '../types';
import { CATEGORY_LABELS, CONDITION_LABELS } from '../data/initialData';
import { useLanguage } from '../i18n/LanguageContext';

interface NewDonationModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onSaveDonation: (newItem: DonationItem) => void;
}

const SAMPLE_PHOTO_PRESETS: Record<ItemCategory, string[]> = {
  eletrodomesticos: [
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
  ],
  moveis: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
  ],
  roupas: [
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
  ],
  saude_acessibilidade: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  ],
  livros: [
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  ],
  brinquedos: [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
  ],
  alimentos: [
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
  ],
  outros: [
    'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
  ],
};

export const NewDonationModal: React.FC<NewDonationModalProps> = ({
  currentUser,
  onClose,
  onSaveDonation,
}) => {
  const { t, getCategoryLabel, getConditionLabel } = useLanguage();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('moveis');
  const [condition, setCondition] = useState<ItemCondition>('excelente');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // Approximate address (public)
  const [neighborhood, setNeighborhood] = useState('Pinheiros');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [referenceZone, setReferenceZone] = useState('');
  const [radiusKm, setRadiusKm] = useState(2);

  // Full address (secret until authorization)
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');

  // Donor contact
  const [donorName, setDonorName] = useState(currentUser.name);
  const [donorPhone, setDonorPhone] = useState(currentUser.phone);
  const [donorEmail, setDonorEmail] = useState(currentUser.email);

  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSamplePhotos = () => {
    const samples = SAMPLE_PHOTO_PRESETS[category] || SAMPLE_PHOTO_PRESETS['outros'];
    setImages((prev) => [...prev, ...samples]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage(t.itemNameLabel);
      return;
    }

    if (!description.trim()) {
      setErrorMessage(t.descriptionLabel);
      return;
    }

    if (!neighborhood.trim() || !city.trim() || !state.trim()) {
      setErrorMessage(`${t.neighborhoodLabel}, ${t.cityLabel}, ${t.stateLabel}`);
      return;
    }

    if (!street.trim() || !number.trim()) {
      setErrorMessage(`${t.streetLabel}, ${t.numberLabel}`);
      return;
    }

    // Default image if none uploaded
    const finalImages = images.length > 0 
      ? images 
      : (SAMPLE_PHOTO_PRESETS[category] || SAMPLE_PHOTO_PRESETS['outros']);

    const newItem: DonationItem = {
      id: `don-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      images: finalImages,
      donor: {
        id: currentUser.id,
        name: donorName.trim() || currentUser.name,
        phone: donorPhone.trim() || currentUser.phone,
        email: donorEmail.trim() || currentUser.email,
        userType: currentUser.type,
        verified: true,
      },
      approximateLocation: {
        neighborhood: neighborhood.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        referenceZone: referenceZone.trim(),
        approximateRadiusKm: radiusKm,
      },
      fullAddress: {
        street: street.trim(),
        number: number.trim(),
        complement: complement.trim(),
        zipCode: zipCode.trim(),
        pickupInstructions: pickupInstructions.trim(),
        availableTimes: availableTimes.trim() || '—',
      },
      status: 'disponivel',
      createdAt: new Date().toISOString(),
      requests: [],
    };

    onSaveDonation(newItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-xs">
      <div 
        id="new-donation-modal"
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80 sticky top-0 z-10">
          <div>
            <h2 className="font-display font-bold text-lg text-stone-900">{t.newDonationTitle}</h2>
            <p className="text-xs text-stone-500">{t.newDonationSubtitle}</p>
          </div>

          <button
            id="btn-close-new-donation-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors border border-stone-200 shadow-2xs"
            aria-label={t.cancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Item Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">1</span>
              {t.step1ItemInfo}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.itemNameLabel}
              </label>
              <input
                id="input-donation-title"
                type="text"
                required
                placeholder={t.itemNamePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">{t.categoryLabel}</label>
                <select
                  id="select-donation-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {Object.entries(CATEGORY_LABELS).filter(([k]) => k !== 'todos').map(([key]) => (
                    <option key={key} value={key}>{getCategoryLabel(key)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">{t.conditionLabel}</label>
                <select
                  id="select-donation-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ItemCondition)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {Object.entries(CONDITION_LABELS).map(([key]) => (
                    <option key={key} value={key}>{getConditionLabel(key)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.descriptionLabel}
              </label>
              <textarea
                id="textarea-donation-description"
                required
                rows={3}
                placeholder={t.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Photos */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">2</span>
                {t.step2Photos}
              </h3>

              <button
                type="button"
                onClick={handleAddSamplePhotos}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t.useSuggestedPhotos}
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-4 text-center transition-colors bg-stone-50/50">
              <input
                id="file-upload-photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="file-upload-photos" className="cursor-pointer block">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-stone-800">
                  {t.dragOrClickPhotos}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">{t.photoFormatsNotice}</p>
              </label>
            </div>

            {/* Preview list */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 group">
                    <img src={img} alt={`Preview ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                      aria-label="Remover foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Address & Security Configuration */}
          <div className="space-y-5 pt-4 border-t border-stone-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">3</span>
                {t.step3Address}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {t.addressExplanationNotice}
              </p>
            </div>

            {/* Sub-part A: Approximate Public Address */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900">{t.approxAddressTitle}</span>
                  <p className="text-[11px] text-stone-500">{t.approxAddressDesc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.neighborhoodLabel} *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pinheiros, Palermo, Brooklyn"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.cityLabel} *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: São Paulo, Madrid, New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.stateLabel} *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="Ex: SP, MD, NY"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  {t.referencePointLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.referencePointPlaceholder}
                  value={referenceZone}
                  onChange={(e) => setReferenceZone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Sub-part B: Definite Confidential Address */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-950">{t.definitiveAddressTitle}</span>
                    <p className="text-[11px] text-teal-700">{t.definitiveAddressDesc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-200/80 text-teal-900 border border-teal-300">
                  {t.protectedBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.streetLabel}</label>
                  <input
                    id="input-street"
                    type="text"
                    required
                    placeholder={t.streetPlaceholder}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.numberLabel}</label>
                  <input
                    id="input-number"
                    type="text"
                    required
                    placeholder="Ex: 840, 12B"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.complementLabel}</label>
                  <input
                    type="text"
                    placeholder={t.complementPlaceholder}
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.zipCodeLabel}</label>
                  <input
                    type="text"
                    placeholder="Ex: 05422-001, 28001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.accessInstructionsLabel}</label>
                  <input
                    type="text"
                    placeholder={t.accessInstructionsPlaceholder}
                    value={pickupInstructions}
                    onChange={(e) => setPickupInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-teal-950 mb-1">{t.availableTimesLabel}</label>
                  <input
                    type="text"
                    placeholder={t.availableTimesPlaceholder}
                    value={availableTimes}
                    onChange={(e) => setAvailableTimes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-teal-300 text-xs focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Donor Contact */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">4</span>
              {t.step4Contact}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.yourNameLabel}</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.phoneLabel}</label>
                <input
                  type="text"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">{t.emailLabel}</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-5 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              {t.cancel}
            </button>
            <button
              id="btn-submit-donation"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t.publishDonation}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
