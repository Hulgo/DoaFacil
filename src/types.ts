export type ItemCategory =
  | 'moveis'
  | 'roupas'
  | 'eletrodomesticos'
  | 'brinquedos'
  | 'alimentos'
  | 'livros'
  | 'saude_acessibilidade'
  | 'outros';

export type ItemCondition = 'novo' | 'excelente' | 'bom' | 'com_marcas';

export type DonationStatus = 'disponivel' | 'em_analise' | 'autorizado' | 'concluido';

export type RequestStatus = 'pendente' | 'autorizado' | 'recusado' | 'concluido';

export type UserType = 'pessoa_fisica' | 'ong';

export interface ApproximateLocation {
  neighborhood: string;
  city: string;
  state: string;
  referenceZone?: string;
  approximateRadiusKm: number;
}

export interface FullAddress {
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  pickupInstructions: string;
  availableTimes: string;
}

export interface DonorInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  userType: UserType;
  verified?: boolean;
}

export interface DonationRequest {
  id: string;
  itemId: string;
  itemTitle: string;
  requesterId: string;
  requesterName: string;
  requesterType: UserType;
  institutionName?: string;
  phone: string;
  email: string;
  purpose: string;
  pickupPlan: string;
  preferredDate: string;
  status: RequestStatus;
  donorNotes?: string;
  authorizedAt?: string;
  createdAt: string;
}

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  condition: ItemCondition;
  images: string[];
  donor: DonorInfo;
  approximateLocation: ApproximateLocation;
  fullAddress: FullAddress; // Secret until authorized
  status: DonationStatus;
  authorizedRequestId?: string;
  authorizedRequesterId?: string;
  createdAt: string;
  requests: DonationRequest[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  institutionName?: string;
  roleLabel: string;
}
