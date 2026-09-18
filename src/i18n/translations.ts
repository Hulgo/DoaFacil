import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'es' | 'en';

export interface Translations {
  // Navigation & General
  brandName: string;
  brandTagline: string;
  brandSubtag: string;
  exploreDonations: string;
  donorDashboard: string;
  myRequests: string;
  wantToDonate: string;
  donateShort: string;
  testUsers: string;
  testUsersDesc: string;
  donorRole: string;
  ongRole: string;
  requesterRole: string;

  // Banner
  privacyBannerTitle: string;
  privacyBannerSubtitle: string;
  dataProtectionBadge: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Filters & Search
  searchPlaceholder: string;
  clear: string;
  allNeighborhoods: string;
  onlyAvailable: string;
  showingDonations: string;
  donationSingular: string;
  donationsPlural: string;
  restoreTestData: string;
  restoreConfirm: string;
  noItemsFound: string;
  tryDifferentSearch: string;
  clearAllFilters: string;

  // Categories
  catAll: string;
  catAppliances: string;
  catFurniture: string;
  catClothes: string;
  catHealth: string;
  catBooks: string;
  catToys: string;
  catFood: string;
  catOther: string;

  // Conditions
  condNew: string;
  condExcellent: string;
  condGood: string;
  condSignsOfUse: string;

  // Statuses
  statusAvailable: string;
  statusInReview: string;
  statusReviewSingular: string;
  statusReviewPlural: string;
  statusAuthorized: string;
  statusCompleted: string;

  // Card
  approxRadius: string;
  unlockedForYou: string;
  addressSecretUntilAuthorized: string;
  youAreDonor: string;
  byDonor: string;
  requestedByYou: string;
  pickupApproved: string;
  details: string;
  requestAction: string;
  viewAddress: string;
  viewRequest: string;
  manageRequests: string;

  // Item Details Modal
  publishedOn: string;
  donorLabel: string;
  itemDescription: string;
  requestThisDonation: string;
  youAreOwner: string;
  markDelivered: string;
  deliveredSuccess: string;
  reservedForOther: string;
  alreadyDeliveredNotice: string;
  alreadyRequestedNotice: string;
  waitingDonorEvaluation: string;
  pickupLocation: string;
  definitiveAddress: string;
  confidentialAddressHeader: string;
  accessAuthorizedBadge: string;
  confidentialAddressBadge: string;
  unlockedAddressNotice: string;
  confidentialExplanation: string;
  approxLocationNotice: string;
  referenceRegion: string;
  copyAddress: string;
  copied: string;
  pickupInstructionsLabel: string;
  availableHoursLabel: string;
  openGoogleMaps: string;
  whatsappWithDonor: string;
  receivedRequests: string;
  donorRequestsExplanation: string;
  noRequestsYet: string;
  confirmAddressRelease: string;
  yesAuthorize: string;
  cancel: string;
  authorizePickup: string;
  reject: string;
  purposeLabel: string;
  transportPlanLabel: string;

  // New Donation Modal
  newDonationTitle: string;
  newDonationSubtitle: string;
  step1ItemInfo: string;
  step2Photos: string;
  step3Address: string;
  step4Contact: string;
  itemNameLabel: string;
  itemNamePlaceholder: string;
  categoryLabel: string;
  conditionLabel: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  useSuggestedPhotos: string;
  dragOrClickPhotos: string;
  photoFormatsNotice: string;
  addressExplanationNotice: string;
  approxAddressTitle: string;
  approxAddressDesc: string;
  neighborhoodLabel: string;
  cityLabel: string;
  stateLabel: string;
  referencePointLabel: string;
  referencePointPlaceholder: string;
  definitiveAddressTitle: string;
  definitiveAddressDesc: string;
  protectedBadge: string;
  streetLabel: string;
  streetPlaceholder: string;
  numberLabel: string;
  complementLabel: string;
  complementPlaceholder: string;
  zipCodeLabel: string;
  accessInstructionsLabel: string;
  accessInstructionsPlaceholder: string;
  availableTimesLabel: string;
  availableTimesPlaceholder: string;
  donorContactTitle: string;
  yourNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  publishDonation: string;

  // Request Donation Modal
  requestDonationTitle: string;
  requestDonationSubtitle: string;
  requestingItemNotice: string;
  approximateLocationLabel: string;
  requestingAsLabel: string;
  individual: string;
  individualDesc: string;
  ngo: string;
  ngoDesc: string;
  responsibleNameLabel: string;
  yourFullNameLabel: string;
  ngoNameLabel: string;
  ngoNamePlaceholder: string;
  ngoPhoneLabel: string;
  ngoEmailLabel: string;
  whyNeedItemLabel: string;
  whyNeedItemPlaceholder: string;
  howPickupLabel: string;
  howPickupPlaceholder: string;
  preferredDateLabel: string;
  preferredDatePlaceholder: string;
  privacyNoticeRequest: string;
  sendRequest: string;

  // Donor Dashboard
  donorDashboardTitle: string;
  donorDashboardSubtitle: string;
  registeredSingular: string;
  registeredPlural: string;
  allFilter: string;
  waitingAuthFilter: string;
  authorizedFilter: string;
  completedFilter: string;
  noDonorItemsTitle: string;
  noDonorItemsDesc: string;
  registerFirstDonation: string;
  requestsForThisItem: string;
  addressReleasedTo: string;
  callOnWhatsapp: string;
  reasonStated: string;
  transportPlanAndDate: string;

  // Requester Dashboard
  requesterDashboardTitle: string;
  requesterDashboardSubtitle: string;
  requestsCountSingular: string;
  requestsCountPlural: string;
  exploreMoreDonations: string;
  noRequestsTitle: string;
  noRequestsDesc: string;
  viewAvailableDonations: string;
  authorizedPickupsTitle: string;
  authorizedByDonorBadge: string;
  definitivePickupAddress: string;
  waitingDonorAuthTitle: string;
  definitiveAddressRevealedWhenApproved: string;
  previousHistoryTitle: string;
  requestStatusLabel: string;
  statusRejected: string;

  // Notifications
  donationSuccessTitle: string;
  donationSuccessDesc: string;
  requestSentTitle: string;
  requestSentDesc: string;
  authorizedSuccessTitle: string;
  authorizedSuccessDesc: string;
  rejectedSuccessTitle: string;
  rejectedSuccessDesc: string;
  deliveredCompletedTitle: string;
  deliveredCompletedDesc: string;
  profileSwitchedTitle: string;
  profileSwitchedDesc: string;
  dataRestoredTitle: string;
  dataRestoredDesc: string;

  // Footer
  footerDescription: string;
  footerGuarantee: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    brandName: 'DoaFácil',
    brandTagline: 'Coleta Segura',
    brandSubtag: 'Conectando doadores a pessoas e ONGs com privacidade',
    exploreDonations: 'Explorar Doações',
    donorDashboard: 'Painel do Doador',
    myRequests: 'Minhas Solicitações',
    wantToDonate: 'Quero Doar',
    donateShort: 'Doar',
    testUsers: 'Alternar Usuário de Teste',
    testUsersDesc: 'Alterne entre perfis para testar o fluxo de doador e solicitante:',
    donorRole: 'Doadora',
    ongRole: 'ONG / Projeto Social',
    requesterRole: 'Solicitante (Pessoa Física)',

    privacyBannerTitle: 'Como funciona a Coleta com Endereço Protegido?',
    privacyBannerSubtitle: 'Privacidade & Proteção do Doador',
    dataProtectionBadge: 'Proteção de dados residenciais',
    step1Title: 'Endereço Aproximado',
    step1Desc: 'O doador cadastra fotos e informa apenas bairro/cidade no catálogo público para segurança.',
    step2Title: 'Solicitação Transparente',
    step2Desc: 'Pessoas ou ONGs enviam o pedido detalhando a finalidade de uso e o plano de transporte.',
    step3Title: 'Autorização do Doador',
    step3Desc: 'O doador escolhe quem receberá a doação e clica em Autorizar Coleta.',
    step4Title: 'Endereço Liberado',
    step4Desc: 'Apenas o solicitante aprovado recebe a rua, número, horário e WhatsApp direto para a retirada.',

    searchPlaceholder: 'Buscar por nome do item, descrição, bairro ou cidade...',
    clear: 'Limpar',
    allNeighborhoods: 'Todos os Bairros',
    onlyAvailable: 'Apenas disponíveis',
    showingDonations: 'Mostrando',
    donationSingular: 'doação disponível',
    donationsPlural: 'doações disponíveis',
    restoreTestData: 'Restaurar dados de teste',
    restoreConfirm: 'Deseja restaurar as doações e pedidos originais de demonstração?',
    noItemsFound: 'Nenhum item encontrado',
    tryDifferentSearch: 'Tente alterar seus termos de busca ou selecionar outra categoria.',
    clearAllFilters: 'Limpar todos os filtros',

    catAll: 'Todos os Itens',
    catAppliances: 'Eletrodomésticos',
    catFurniture: 'Móveis',
    catClothes: 'Roupas & Agasalhos',
    catHealth: 'Saúde & Acessibilidade',
    catBooks: 'Livros & Educação',
    catToys: 'Brinquedos',
    catFood: 'Alimentos',
    catOther: 'Outros',

    condNew: 'Novo na caixa',
    condExcellent: 'Excelente estado',
    condGood: 'Bom estado',
    condSignsOfUse: 'Com marcas de uso',

    statusAvailable: 'Disponível',
    statusInReview: 'Em Análise',
    statusReviewSingular: 'pedido em análise',
    statusReviewPlural: 'pedidos em análise',
    statusAuthorized: 'Coleta Autorizada',
    statusCompleted: 'Entregue / Concluído',

    approxRadius: 'km raio',
    unlockedForYou: 'Endereço completo liberado para você!',
    addressSecretUntilAuthorized: 'Rua exata liberada após autorização do doador',
    youAreDonor: 'Você é o doador',
    byDonor: 'Por',
    requestedByYou: 'Solicitado por você',
    pickupApproved: '✓ Coleta Aprovada',
    details: 'Detalhes',
    requestAction: 'Solicitar',
    viewAddress: 'Ver Endereço',
    viewRequest: 'Ver Solicitação',
    manageRequests: 'Gerenciar',

    publishedOn: 'Publicado em',
    donorLabel: 'Doador',
    itemDescription: 'Descrição do Item',
    requestThisDonation: 'Solicitar Esta Doação',
    youAreOwner: 'Você é o proprietário desta doação.',
    markDelivered: 'Marcar como Entregue',
    deliveredSuccess: 'Item entregue e concluído',
    reservedForOther: 'Este item já foi reservado e autorizado para outro solicitante.',
    alreadyDeliveredNotice: 'Este item já foi retirado e a doação foi concluída.',
    alreadyRequestedNotice: 'Você já solicitou este item',
    waitingDonorEvaluation: 'Aguardando avaliação do doador',
    pickupLocation: 'Localização para Coleta',
    definitiveAddress: 'Endereço Definitivo de Coleta',
    confidentialAddressHeader: 'Endereço Definitivo (Sigiloso & Protegido)',
    accessAuthorizedBadge: '✓ Acesso Autorizado',
    confidentialAddressBadge: '🔒 Endereço Sob Sigilo',
    unlockedAddressNotice: 'Liberado exclusivamente para retirada autorizada',
    confidentialExplanation: 'Endereço aproximado visível no catálogo por segurança',
    approxLocationNotice: 'Para segurança do doador, o endereço exato (rua, número, complemento e horários) só é disponibilizado após a aprovação formal da sua solicitação.',
    referenceRegion: 'Região de referência:',
    copyAddress: 'Copiar',
    copied: 'Copiado!',
    pickupInstructionsLabel: 'Instruções de Acesso:',
    availableHoursLabel: 'Horários Disponíveis:',
    openGoogleMaps: 'Abrir Rota no Google Maps',
    whatsappWithDonor: 'Falar no WhatsApp com',
    receivedRequests: 'Solicitações Recebidas',
    donorRequestsExplanation: 'Analise os pedidos de pessoas ou ONGs e autorize a coleta para liberar o endereço definitivo.',
    noRequestsYet: 'Nenhuma solicitação recebida para este item ainda. Quando alguém se interessar, o pedido aparecerá aqui!',
    confirmAddressRelease: 'Confirmar liberação do endereço?',
    yesAuthorize: 'Sim, Autorizar',
    cancel: 'Cancelar',
    authorizePickup: 'Autorizar Coleta',
    reject: 'Recusar',
    purposeLabel: 'Motivo / Finalidade:',
    transportPlanLabel: 'Plano de Coleta & Data:',

    newDonationTitle: 'Cadastrar Nova Doação',
    newDonationSubtitle: 'Preencha os dados do item e o endereço para coleta segura',
    step1ItemInfo: 'Informações do Item',
    step2Photos: 'Fotos do Item',
    step3Address: 'Endereço de Coleta (Aproximado vs. Definitivo)',
    step4Contact: 'Dados de Contato do Doador',
    itemNameLabel: 'Nome do Item a Doar *',
    itemNamePlaceholder: 'Ex: Geladeira Frost Free, Sofá 3 Lugares, Lote de Roupas Infantis...',
    categoryLabel: 'Categoria *',
    conditionLabel: 'Estado de Conservação *',
    descriptionLabel: 'Descrição Detalhada do Item *',
    descriptionPlaceholder: 'Descreva detalhes como medidas aproximadas, funcionamento, motivo da doação e o que acompanha...',
    useSuggestedPhotos: 'Usar fotos sugeridas de exemplo',
    dragOrClickPhotos: 'Clique para selecionar fotos ou arraste arquivos aqui',
    photoFormatsNotice: 'PNG, JPG, WEBP (suporta múltiplas fotos)',
    addressExplanationNotice: 'Conforme as regras de segurança, seu endereço definitivo só é liberado para a pessoa ou ONG após você autorizar.',
    approxAddressTitle: 'Endereço Aproximado (Visível no Catálogo)',
    approxAddressDesc: 'Pessoas e ONGs verão apenas esta região aproximada.',
    neighborhoodLabel: 'Bairro *',
    cityLabel: 'Cidade *',
    stateLabel: 'Estado (UF) *',
    referencePointLabel: 'Ponto de Referência Geral (Opcional)',
    referencePointPlaceholder: 'Ex: Próximo à Estação Faria Lima, Zona Oeste',
    definitiveAddressTitle: 'Endereço Definitivo (Sigiloso & Protegido)',
    definitiveAddressDesc: '🔒 Revelado SOMENTE para o solicitante que você autorizar.',
    protectedBadge: 'Protegido',
    streetLabel: 'Rua / Avenida *',
    streetPlaceholder: 'Ex: Rua dos Pinheiros, Alameda Santos',
    numberLabel: 'Número *',
    complementLabel: 'Complemento',
    complementPlaceholder: 'Ex: Apto 42, Bloco B, Casa dos fundos',
    zipCodeLabel: 'CEP',
    accessInstructionsLabel: 'Instruções de Acesso / Retirada',
    accessInstructionsPlaceholder: 'Ex: Prédio com elevador, interfone 42, vaga rápida na frente',
    availableTimesLabel: 'Horários Disponíveis',
    availableTimesPlaceholder: 'Ex: Seg a sex após 18h, ou finais de semana',
    donorContactTitle: 'Dados de Contato do Doador',
    yourNameLabel: 'Seu Nome / Nome de Contato',
    phoneLabel: 'WhatsApp / Telefone',
    emailLabel: 'E-mail',
    publishDonation: 'Publicar Doação',

    requestDonationTitle: 'Solicitar Doação',
    requestDonationSubtitle: 'Envie seu pedido diretamente ao doador',
    requestingItemNotice: 'Você está solicitando:',
    approximateLocationLabel: 'Local aproximado:',
    requestingAsLabel: 'Você está solicitando como: *',
    individual: 'Pessoa Física',
    individualDesc: 'Uso pessoal ou familiar',
    ngo: 'ONG / Instituição',
    ngoDesc: 'Projeto social ou comunitário',
    responsibleNameLabel: 'Nome do Responsável *',
    yourFullNameLabel: 'Seu Nome Completo *',
    ngoNameLabel: 'Nome da ONG / Projeto Social *',
    ngoNamePlaceholder: 'Ex: Associação Social Esperança Viva',
    ngoPhoneLabel: 'WhatsApp / Telefone da ONG *',
    ngoEmailLabel: 'E-mail Institucional',
    whyNeedItemLabel: 'Finalidade / Por que você ou a instituição precisa deste item? *',
    whyNeedItemPlaceholder: 'Explique detalhadamente como o item será utilizado ou para quem será destinado. O doador lerá esta mensagem para decidir a autorização.',
    howPickupLabel: 'Como você planeja retirar o item? *',
    howPickupPlaceholder: 'Ex: Carro próprio, carreto contratado, van da ONG',
    preferredDateLabel: 'Disponibilidade ou Data Sugerida para Retirada *',
    preferredDatePlaceholder: 'Ex: Este sábado pela manhã, ou dias úteis após 18h',
    privacyNoticeRequest: 'O doador receberá sua solicitação. Caso ele autorize a coleta, o endereço completo (rua, número, complemento e instruções) será liberado imediatamente no seu painel em Minhas Solicitações.',
    sendRequest: 'Enviar Solicitação',

    donorDashboardTitle: 'Painel do Doador',
    donorDashboardSubtitle: 'Gerencie seus itens doados e autorize coletas para liberar o endereço definitivo aos solicitantes.',
    registeredSingular: 'item cadastrado',
    registeredPlural: 'itens cadastrados',
    allFilter: 'Todos',
    waitingAuthFilter: 'Aguardando Autorização',
    authorizedFilter: 'Coleta Autorizada',
    completedFilter: 'Entregues / Concluídos',
    noDonorItemsTitle: 'Nenhum item encontrado',
    noDonorItemsDesc: 'Você ainda não cadastrou doações com este perfil de usuário. Cadastre um item para começar!',
    registerFirstDonation: 'Cadastrar Minha Primeira Doação',
    requestsForThisItem: 'Solicitações para este item',
    addressReleasedTo: 'Endereço liberado para',
    callOnWhatsapp: 'Chamar no WhatsApp',
    reasonStated: 'Finalidade informada:',
    transportPlanAndDate: 'Plano de transporte e data:',

    requesterDashboardTitle: 'Minhas Solicitações de Doação',
    requesterDashboardSubtitle: 'Acompanhe o status das suas solicitações e acesse os endereços definitivos autorizados para retirada.',
    requestsCountSingular: 'pedido',
    requestsCountPlural: 'pedidos',
    exploreMoreDonations: 'Explorar Mais Doações',
    noRequestsTitle: 'Nenhuma solicitação ativa',
    noRequestsDesc: 'Você ainda não enviou pedidos de doação com o perfil selecionado. Explore os itens disponíveis e solicite o que você ou sua instituição precisam!',
    viewAvailableDonations: 'Ver Doações Disponíveis',
    authorizedPickupsTitle: 'Coletas Autorizadas — Endereço Liberado',
    authorizedByDonorBadge: 'Coleta Autorizada pelo Doador',
    definitivePickupAddress: 'Endereço Definitivo para Retirada',
    waitingDonorAuthTitle: 'Aguardando Autorização do Doador',
    definitiveAddressRevealedWhenApproved: 'Endereço definitivo será revelado assim que o doador autorizar sua coleta.',
    previousHistoryTitle: 'Histórico Anterior',
    requestStatusLabel: 'Status do pedido:',
    statusRejected: 'Não autorizado pelo doador',

    donationSuccessTitle: 'Doação cadastrada com sucesso!',
    donationSuccessDesc: 'O item foi publicado no catálogo com endereço aproximado.',
    requestSentTitle: 'Solicitação enviada ao doador!',
    requestSentDesc: 'Assim que o doador autorizar, o endereço completo de coleta será liberado para você.',
    authorizedSuccessTitle: 'Coleta autorizada!',
    authorizedSuccessDesc: 'O solicitante agora tem acesso liberado ao seu endereço completo e instruções de retirada.',
    rejectedSuccessTitle: 'Solicitação recusada',
    rejectedSuccessDesc: 'A solicitação foi marcada como não atendida.',
    deliveredCompletedTitle: 'Doação concluída com sucesso!',
    deliveredCompletedDesc: 'Item entregue e processo finalizado. Parabéns!',
    profileSwitchedTitle: 'Perfil alternado',
    profileSwitchedDesc: 'Você agora está navegando como',
    dataRestoredTitle: 'Dados restaurados',
    dataRestoredDesc: 'Os itens iniciais de exemplo foram recarregados.',

    footerDescription: 'Plataforma Comunitária de Doações & Coleta com Endereço Protegido',
    footerGuarantee: 'Privacidade garantida por autorização',
  },

  es: {
    brandName: 'DoaFácil',
    brandTagline: 'Recogida Segura',
    brandSubtag: 'Conectando donantes con personas y ONGs con total privacidad',
    exploreDonations: 'Explorar Donaciones',
    donorDashboard: 'Panel del Donante',
    myRequests: 'Mis Solicitudes',
    wantToDonate: 'Quiero Donar',
    donateShort: 'Donar',
    testUsers: 'Cambiar Usuario de Prueba',
    testUsersDesc: 'Cambia de perfil para probar el flujo de donante y solicitante:',
    donorRole: 'Donante',
    ongRole: 'ONG / Proyecto Social',
    requesterRole: 'Solicitante (Particular)',

    privacyBannerTitle: '¿Cómo funciona la Recogida con Dirección Protegida?',
    privacyBannerSubtitle: 'Privacidad & Protección del Donante',
    dataProtectionBadge: 'Protección de datos residenciales',
    step1Title: 'Dirección Aproximada',
    step1Desc: 'El donante sube fotos e indica solo barrio/ciudad en el catálogo público para mayor seguridad.',
    step2Title: 'Solicitud Transparente',
    step2Desc: 'Personas u ONGs envían la solicitud detallando el destino del artículo y el plan de transporte.',
    step3Title: 'Autorización del Donante',
    step3Desc: 'El donante elige a quién entregar la donación y pulsa Autorizar Recogida.',
    step4Title: 'Dirección Liberada',
    step4Desc: 'Solo el solicitante aprobado recibe la calle, número, horario y WhatsApp directo para la recogida.',

    searchPlaceholder: 'Buscar por nombre del artículo, descripción, barrio o ciudad...',
    clear: 'Limpiar',
    allNeighborhoods: 'Todos los Barrios',
    onlyAvailable: 'Solo disponibles',
    showingDonations: 'Mostrando',
    donationSingular: 'donación disponible',
    donationsPlural: 'donaciones disponibles',
    restoreTestData: 'Restaurar datos de prueba',
    restoreConfirm: '¿Deseas restaurar las donaciones y solicitudes iniciales de demostración?',
    noItemsFound: 'No se encontraron artículos',
    tryDifferentSearch: 'Intenta modificar tus términos de búsqueda o selecciona otra categoría.',
    clearAllFilters: 'Limpiar todos los filtros',

    catAll: 'Todos los Artículos',
    catAppliances: 'Electrodomésticos',
    catFurniture: 'Muebles',
    catClothes: 'Ropa & Abrigos',
    catHealth: 'Salud & Accesibilidad',
    catBooks: 'Libros & Educación',
    catToys: 'Juguetes',
    catFood: 'Alimentos',
    catOther: 'Otros',

    condNew: 'Nuevo en caja',
    condExcellent: 'Excelente estado',
    condGood: 'Buen estado',
    condSignsOfUse: 'Con marcas de uso',

    statusAvailable: 'Disponible',
    statusInReview: 'En Revisión',
    statusReviewSingular: 'solicitud en revisión',
    statusReviewPlural: 'solicitudes en revisión',
    statusAuthorized: 'Recogida Autorizada',
    statusCompleted: 'Entregado / Finalizado',

    approxRadius: 'km de radio',
    unlockedForYou: '¡Dirección completa liberada para ti!',
    addressSecretUntilAuthorized: 'Calle exacta liberada tras la autorización del donante',
    youAreDonor: 'Eres el donante',
    byDonor: 'Por',
    requestedByYou: 'Solicitado por ti',
    pickupApproved: '✓ Recogida Aprobada',
    details: 'Detalles',
    requestAction: 'Solicitar',
    viewAddress: 'Ver Dirección',
    viewRequest: 'Ver Solicitud',
    manageRequests: 'Gestionar',

    publishedOn: 'Publicado el',
    donorLabel: 'Donante',
    itemDescription: 'Descripción del Artículo',
    requestThisDonation: 'Solicitar Esta Donación',
    youAreOwner: 'Eres el propietario de esta donación.',
    markDelivered: 'Marcar como Entregado',
    deliveredSuccess: 'Artículo entregado y finalizado',
    reservedForOther: 'Este artículo ya ha sido reservado y autorizado para otro solicitante.',
    alreadyDeliveredNotice: 'Este artículo ya fue retirado y la donación está completada.',
    alreadyRequestedNotice: 'Ya has solicitado este artículo',
    waitingDonorEvaluation: 'Esperando evaluación del donante',
    pickupLocation: 'Ubicación para Recogida',
    definitiveAddress: 'Dirección Definitiva de Recogida',
    confidentialAddressHeader: 'Dirección Definitiva (Confidencial & Protegida)',
    accessAuthorizedBadge: '✓ Acceso Autorizado',
    confidentialAddressBadge: '🔒 Dirección Confidencial',
    unlockedAddressNotice: 'Liberada exclusivamente para la recogida autorizada',
    confidentialExplanation: 'Dirección aproximada visible en el catálogo por seguridad',
    approxLocationNotice: 'Por la seguridad del donante, la dirección exacta (calle, número, piso y horarios) solo se entrega tras la aprobación de tu solicitud.',
    referenceRegion: 'Zona de referencia:',
    copyAddress: 'Copiar',
    copied: '¡Copiado!',
    pickupInstructionsLabel: 'Instrucciones de Acceso:',
    availableHoursLabel: 'Horarios Disponibles:',
    openGoogleMaps: 'Abrir Ruta en Google Maps',
    whatsappWithDonor: 'Hablar por WhatsApp con',
    receivedRequests: 'Solicitudes Recibidas',
    donorRequestsExplanation: 'Evalúa las solicitudes de personas u ONGs y autoriza la recogida para revelar la dirección definitiva.',
    noRequestsYet: 'No hay solicitudes para este artículo todavía. ¡Aparecerán aquí cuando alguien se interese!',
    confirmAddressRelease: '¿Confirmar liberación de la dirección?',
    yesAuthorize: 'Sí, Autorizar',
    cancel: 'Cancelar',
    authorizePickup: 'Autorizar Recogida',
    reject: 'Rechazar',
    purposeLabel: 'Motivo / Finalidad:',
    transportPlanLabel: 'Plan de Transporte y Fecha:',

    newDonationTitle: 'Publicar Nueva Donación',
    newDonationSubtitle: 'Completa los datos del artículo y la dirección para una recogida segura',
    step1ItemInfo: 'Información del Artículo',
    step2Photos: 'Fotos del Artículo',
    step3Address: 'Dirección de Recogida (Aproximada vs. Definitiva)',
    step4Contact: 'Datos de Contacto del Donante',
    itemNameLabel: 'Nombre del Artículo a Donar *',
    itemNamePlaceholder: 'Ej: Frigorífico No Frost, Sofá 3 Plazas, Lote de Ropa Infantil...',
    categoryLabel: 'Categoría *',
    conditionLabel: 'Estado de Conservación *',
    descriptionLabel: 'Descripción Detallada del Artículo *',
    descriptionPlaceholder: 'Describe medidas aproximadas, funcionamiento, motivo de donación y accesorios incluidos...',
    useSuggestedPhotos: 'Usar fotos sugeridas de ejemplo',
    dragOrClickPhotos: 'Haz clic para seleccionar fotos o arrastra archivos aquí',
    photoFormatsNotice: 'PNG, JPG, WEBP (admite múltiples fotos)',
    addressExplanationNotice: 'Por normas de seguridad, tu dirección definitiva solo se revela a la persona u ONG tras tu autorización.',
    approxAddressTitle: 'Dirección Aproximada (Pública en el Catálogo)',
    approxAddressDesc: 'Las personas y ONGs solo verán esta zona aproximada.',
    neighborhoodLabel: 'Barrio *',
    cityLabel: 'Ciudad *',
    stateLabel: 'Provincia / Estado *',
    referencePointLabel: 'Punto de Referencia General (Opcional)',
    referencePointPlaceholder: 'Ej: Cerca de la estación central, zona norte',
    definitiveAddressTitle: 'Dirección Definitiva (Confidencial & Protegida)',
    definitiveAddressDesc: '🔒 Revelada ÚNICAMENTE al solicitante que tú autorices.',
    protectedBadge: 'Protegida',
    streetLabel: 'Calle / Avenida *',
    streetPlaceholder: 'Ej: Gran Vía, Calle Mayor',
    numberLabel: 'Número *',
    complementLabel: 'Piso / Puerta / Complemento',
    complementPlaceholder: 'Ej: 3º B, Bloque 2, Casa interior',
    zipCodeLabel: 'Código Postal',
    accessInstructionsLabel: 'Instrucciones de Acceso / Recogida',
    accessInstructionsPlaceholder: 'Ej: Edificio con ascensor grande, timbre 42, vado para carga rápida',
    availableTimesLabel: 'Horarios Disponibles',
    availableTimesPlaceholder: 'Ej: Tardes a partir de las 18h o fines de semana',
    donorContactTitle: 'Datos de Contacto del Donante',
    yourNameLabel: 'Tu Nombre / Nombre de Contacto',
    phoneLabel: 'WhatsApp / Teléfono',
    emailLabel: 'Correo Electrónico',
    publishDonation: 'Publicar Donación',

    requestDonationTitle: 'Solicitar Donación',
    requestDonationSubtitle: 'Envía tu petición directamente al donante',
    requestingItemNotice: 'Estás solicitando:',
    approximateLocationLabel: 'Ubicación aproximada:',
    requestingAsLabel: 'Estás solicitando como: *',
    individual: 'Persona Particular',
    individualDesc: 'Uso personal o familiar',
    ngo: 'ONG / Institución',
    ngoDesc: 'Proyecto social o comunitario',
    responsibleNameLabel: 'Nombre del Responsable *',
    yourFullNameLabel: 'Tu Nombre Completo *',
    ngoNameLabel: 'Nombre de la ONG / Proyecto Social *',
    ngoNamePlaceholder: 'Ej: Asociación Solidaria Esperanza Viva',
    ngoPhoneLabel: 'WhatsApp / Teléfono de la ONG *',
    ngoEmailLabel: 'Correo Institucional',
    whyNeedItemLabel: 'Finalidad / ¿Por qué necesitas o necesita la entidad este artículo? *',
    whyNeedItemPlaceholder: 'Explica con detalle cómo se utilizará el artículo. El donante leerá este mensaje para decidir su autorización.',
    howPickupLabel: '¿Cómo planeas recoger el artículo? *',
    howPickupPlaceholder: 'Ej: Coche propio, furgoneta alquilada, furgoneta de la ONG',
    preferredDateLabel: 'Disponibilidad o Fecha Sugerida para Recogida *',
    preferredDatePlaceholder: 'Ej: Este sábado por la mañana, o laborables después de las 18h',
    privacyNoticeRequest: 'El donante recibirá tu solicitud. Si la autoriza, la dirección completa (calle, número y notas de recogida) se desbloqueará de inmediato en Mis Solicitudes.',
    sendRequest: 'Enviar Solicitud',

    donorDashboardTitle: 'Panel del Donante',
    donorDashboardSubtitle: 'Gestiona tus artículos donados y autoriza recogidas para liberar la dirección definitiva a los solicitantes.',
    registeredSingular: 'artículo publicado',
    registeredPlural: 'artículos publicados',
    allFilter: 'Todos',
    waitingAuthFilter: 'Esperando Autorización',
    authorizedFilter: 'Recogida Autorizada',
    completedFilter: 'Entregados / Finalizados',
    noDonorItemsTitle: 'No se encontraron artículos',
    noDonorItemsDesc: 'Aún no has publicado donaciones con este usuario. ¡Publica tu primer artículo para empezar!',
    registerFirstDonation: 'Publicar Mi Primera Donación',
    requestsForThisItem: 'Solicitudes para este artículo',
    addressReleasedTo: 'Dirección liberada a',
    callOnWhatsapp: 'Contactar por WhatsApp',
    reasonStated: 'Finalidad indicada:',
    transportPlanAndDate: 'Plan de transporte y fecha:',

    requesterDashboardTitle: 'Mis Solicitudes de Donación',
    requesterDashboardSubtitle: 'Consulta el estado de tus solicitudes y accede a las direcciones definitivas autorizadas para recogida.',
    requestsCountSingular: 'solicitud',
    requestsCountPlural: 'solicitudes',
    exploreMoreDonations: 'Explorar Más Donaciones',
    noRequestsTitle: 'Sin solicitudes activas',
    noRequestsDesc: 'Todavía no has enviado peticiones de donación con el perfil actual. ¡Explora los artículos disponibles y pide lo que necesites!',
    viewAvailableDonations: 'Ver Donaciones Disponibles',
    authorizedPickupsTitle: 'Recogidas Autorizadas — Dirección Liberada',
    authorizedByDonorBadge: 'Recogida Autorizada por el Donante',
    definitivePickupAddress: 'Dirección Definitiva para Recogida',
    waitingDonorAuthTitle: 'Esperando Autorización del Donante',
    definitiveAddressRevealedWhenApproved: 'La dirección definitiva se revelará en cuanto el donante autorice tu recogida.',
    previousHistoryTitle: 'Historial Anterior',
    requestStatusLabel: 'Estado de la solicitud:',
    statusRejected: 'No autorizada por el donante',

    donationSuccessTitle: '¡Donación registrada con éxito!',
    donationSuccessDesc: 'El artículo ha sido publicado en el catálogo con dirección aproximada.',
    requestSentTitle: '¡Solicitud enviada al donante!',
    requestSentDesc: 'En cuanto el donante la apruebe, la dirección completa de recogida quedará liberada para ti.',
    authorizedSuccessTitle: '¡Recogida autorizada!',
    authorizedSuccessDesc: 'El solicitante ya tiene acceso a tu dirección completa e instrucciones de recogida.',
    rejectedSuccessTitle: 'Solicitud rechazada',
    rejectedSuccessDesc: 'La solicitud ha sido marcada como no atendida.',
    deliveredCompletedTitle: '¡Donación finalizada con éxito!',
    deliveredCompletedDesc: 'Artículo entregado y proceso cerrado. ¡Enhorabuena!',
    profileSwitchedTitle: 'Perfil cambiado',
    profileSwitchedDesc: 'Ahora estás navegando como',
    dataRestoredTitle: 'Datos restaurados',
    dataRestoredDesc: 'Se han recargado los artículos y peticiones de demostración.',

    footerDescription: 'Plataforma Comunitaria de Donaciones & Recogida con Dirección Protegida',
    footerGuarantee: 'Privacidad garantizada mediante autorización previa',
  },

  en: {
    brandName: 'DoaFácil',
    brandTagline: 'Safe Pickup',
    brandSubtag: 'Connecting generous donors to individuals & NGOs with privacy protection',
    exploreDonations: 'Explore Donations',
    donorDashboard: 'Donor Dashboard',
    myRequests: 'My Requests',
    wantToDonate: 'Donate an Item',
    donateShort: 'Donate',
    testUsers: 'Switch Demo User',
    testUsersDesc: 'Switch profiles to test the donor and requester workflows seamlessly:',
    donorRole: 'Donor',
    ongRole: 'NGO / Community Project',
    requesterRole: 'Requester (Individual)',

    privacyBannerTitle: 'How Does Protected Pickup Address Work?',
    privacyBannerSubtitle: 'Privacy & Donor Security',
    dataProtectionBadge: 'Home address privacy protection',
    step1Title: 'Approximate Location',
    step1Desc: 'Donors upload item photos and publish only neighborhood/city on the public catalog for safety.',
    step2Title: 'Transparent Request',
    step2Desc: 'Individuals or NGOs submit requests explaining how the item will be used and the transport plan.',
    step3Title: 'Donor Authorization',
    step3Desc: 'The donor selects the recipient and clicks Authorize Pickup.',
    step4Title: 'Address Unlocked',
    step4Desc: 'Only the approved recipient receives the exact street, number, hours, and direct WhatsApp contact.',

    searchPlaceholder: 'Search by item title, description, neighborhood, or city...',
    clear: 'Clear',
    allNeighborhoods: 'All Neighborhoods',
    onlyAvailable: 'Available only',
    showingDonations: 'Showing',
    donationSingular: 'available donation',
    donationsPlural: 'available donations',
    restoreTestData: 'Restore demo data',
    restoreConfirm: 'Do you want to restore original sample donations and requests?',
    noItemsFound: 'No items found',
    tryDifferentSearch: 'Try adjusting your search terms or selecting another category.',
    clearAllFilters: 'Clear all filters',

    catAll: 'All Items',
    catAppliances: 'Home Appliances',
    catFurniture: 'Furniture',
    catClothes: 'Clothes & Coats',
    catHealth: 'Health & Accessibility',
    catBooks: 'Books & Education',
    catToys: 'Toys & Games',
    catFood: 'Food & Pantry',
    catOther: 'Other Items',

    condNew: 'Brand new in box',
    condExcellent: 'Excellent condition',
    condGood: 'Good condition',
    condSignsOfUse: 'Signs of use',

    statusAvailable: 'Available',
    statusInReview: 'Under Review',
    statusReviewSingular: 'request under review',
    statusReviewPlural: 'requests under review',
    statusAuthorized: 'Pickup Authorized',
    statusCompleted: 'Delivered / Completed',

    approxRadius: 'km radius',
    unlockedForYou: 'Exact full address unlocked for you!',
    addressSecretUntilAuthorized: 'Exact street released only after donor authorization',
    youAreDonor: 'You are the donor',
    byDonor: 'By',
    requestedByYou: 'Requested by you',
    pickupApproved: '✓ Pickup Approved',
    details: 'Details',
    requestAction: 'Request',
    viewAddress: 'View Address',
    viewRequest: 'View Request',
    manageRequests: 'Manage',

    publishedOn: 'Published on',
    donorLabel: 'Donor',
    itemDescription: 'Item Description',
    requestThisDonation: 'Request This Item',
    youAreOwner: 'You own this donation listing.',
    markDelivered: 'Mark as Delivered',
    deliveredSuccess: 'Item delivered and completed',
    reservedForOther: 'This item has already been reserved and authorized for another recipient.',
    alreadyDeliveredNotice: 'This item has already been picked up and the donation is closed.',
    alreadyRequestedNotice: 'You have already requested this item',
    waitingDonorEvaluation: 'Awaiting donor evaluation',
    pickupLocation: 'Pickup Location',
    definitiveAddress: 'Definite Pickup Address',
    confidentialAddressHeader: 'Definite Address (Confidential & Protected)',
    accessAuthorizedBadge: '✓ Access Authorized',
    confidentialAddressBadge: '🔒 Confidential Address',
    unlockedAddressNotice: 'Unlocked exclusively for authorized pickup',
    confidentialExplanation: 'Approximate location shown publicly for privacy protection',
    approxLocationNotice: 'For donor security, the exact street, number, apartment, and pickup instructions are only disclosed after formal donor approval.',
    referenceRegion: 'Reference area:',
    copyAddress: 'Copy',
    copied: 'Copied!',
    pickupInstructionsLabel: 'Access Instructions:',
    availableHoursLabel: 'Available Hours:',
    openGoogleMaps: 'Open Route in Google Maps',
    whatsappWithDonor: 'Chat on WhatsApp with',
    receivedRequests: 'Received Requests',
    donorRequestsExplanation: 'Review requests from individuals or NGOs and authorize pickup to disclose the exact address.',
    noRequestsYet: 'No requests received for this item yet. They will appear here once someone submits one!',
    confirmAddressRelease: 'Confirm unlocking address to this recipient?',
    yesAuthorize: 'Yes, Authorize',
    cancel: 'Cancel',
    authorizePickup: 'Authorize Pickup',
    reject: 'Decline',
    purposeLabel: 'Purpose / Need:',
    transportPlanLabel: 'Pickup Plan & Date:',

    newDonationTitle: 'Post a New Donation',
    newDonationSubtitle: 'Fill in item details and set safe pickup coordinates',
    step1ItemInfo: 'Item Information',
    step2Photos: 'Item Photos',
    step3Address: 'Pickup Address (Approximate vs. Exact)',
    step4Contact: 'Donor Contact Information',
    itemNameLabel: 'Item Title *',
    itemNamePlaceholder: 'E.g., Frost Free Refrigerator, 3-Seater Sofa, Kids Winter Clothes Bundle...',
    categoryLabel: 'Category *',
    conditionLabel: 'Condition *',
    descriptionLabel: 'Detailed Description *',
    descriptionPlaceholder: 'Describe dimensions, working condition, reason for donation, and included accessories...',
    useSuggestedPhotos: 'Use sample suggested photos',
    dragOrClickPhotos: 'Click to select photos or drag & drop files here',
    photoFormatsNotice: 'PNG, JPG, WEBP (supports multiple photos)',
    addressExplanationNotice: 'Following safety rules, your definite address is strictly revealed only to the person or NGO you authorize.',
    approxAddressTitle: 'Approximate Location (Public in Catalog)',
    approxAddressDesc: 'Requesters will only see this generalized area.',
    neighborhoodLabel: 'Neighborhood / District *',
    cityLabel: 'City *',
    stateLabel: 'State / Province *',
    referencePointLabel: 'General Reference Area (Optional)',
    referencePointPlaceholder: 'E.g., Near Central Station, West District',
    definitiveAddressTitle: 'Definite Address (Confidential & Protected)',
    definitiveAddressDesc: '🔒 Revealed ONLY to the recipient you choose to authorize.',
    protectedBadge: 'Protected',
    streetLabel: 'Street / Avenue *',
    streetPlaceholder: 'E.g., 5th Avenue, Baker Street',
    numberLabel: 'Building Number *',
    complementLabel: 'Apartment / Suite / Unit',
    complementPlaceholder: 'E.g., Apt 4B, Building 2',
    zipCodeLabel: 'Postal / ZIP Code',
    accessInstructionsLabel: 'Pickup & Access Instructions',
    accessInstructionsPlaceholder: 'E.g., Service elevator available, ring bell #42, loading bay at back',
    availableTimesLabel: 'Available Pickup Hours',
    availableTimesPlaceholder: 'E.g., Weekdays after 6pm, or weekends anytime',
    donorContactTitle: 'Donor Contact Details',
    yourNameLabel: 'Your Name / Contact Name',
    phoneLabel: 'WhatsApp / Phone Number',
    emailLabel: 'Email Address',
    publishDonation: 'Publish Donation',

    requestDonationTitle: 'Request Donation',
    requestDonationSubtitle: 'Submit your request directly to the donor',
    requestingItemNotice: 'You are requesting:',
    approximateLocationLabel: 'Approximate location:',
    requestingAsLabel: 'You are requesting as: *',
    individual: 'Individual / Household',
    individualDesc: 'Personal or family need',
    ngo: 'NGO / Non-profit',
    ngoDesc: 'Community or social project',
    responsibleNameLabel: 'Contact Person Name *',
    yourFullNameLabel: 'Your Full Name *',
    ngoNameLabel: 'NGO / Organization Name *',
    ngoNamePlaceholder: 'E.g., Hope Community Outreach Initiative',
    ngoPhoneLabel: 'NGO WhatsApp / Phone *',
    ngoEmailLabel: 'Organization Email',
    whyNeedItemLabel: 'Purpose / Why do you or your organization need this item? *',
    whyNeedItemPlaceholder: 'Explain in detail who will benefit and how the item will be utilized. The donor will read this message to authorize pickup.',
    howPickupLabel: 'How do you plan to transport/pick up the item? *',
    howPickupPlaceholder: 'E.g., Personal car, hired moving truck, NGO volunteer van',
    preferredDateLabel: 'Availability or Suggested Pickup Date *',
    preferredDatePlaceholder: 'E.g., This Saturday morning, or weekdays after 6 PM',
    privacyNoticeRequest: 'The donor will review your request. If approved, the full street address, apartment number, and collection notes will be immediately revealed in My Requests.',
    sendRequest: 'Send Request',

    donorDashboardTitle: 'Donor Dashboard',
    donorDashboardSubtitle: 'Manage your listed donations and authorize pickups to reveal the exact address to chosen recipients.',
    registeredSingular: 'item listed',
    registeredPlural: 'items listed',
    allFilter: 'All',
    waitingAuthFilter: 'Awaiting Authorization',
    authorizedFilter: 'Pickup Authorized',
    completedFilter: 'Delivered / Closed',
    noDonorItemsTitle: 'No items listed yet',
    noDonorItemsDesc: 'You have not listed any items with this user profile yet. Post an item to get started!',
    registerFirstDonation: 'Post My First Donation',
    requestsForThisItem: 'Requests for this item',
    addressReleasedTo: 'Address unlocked for',
    callOnWhatsapp: 'Chat on WhatsApp',
    reasonStated: 'Stated purpose:',
    transportPlanAndDate: 'Transport plan & date:',

    requesterDashboardTitle: 'My Donation Requests',
    requesterDashboardSubtitle: 'Track your pending applications and access unlocked pickup addresses for approved items.',
    requestsCountSingular: 'request',
    requestsCountPlural: 'requests',
    exploreMoreDonations: 'Explore More Donations',
    noRequestsTitle: 'No active requests',
    noRequestsDesc: 'You have not submitted any donation requests with the active user profile yet. Explore available items and apply for what you need!',
    viewAvailableDonations: 'Browse Available Donations',
    authorizedPickupsTitle: 'Authorized Pickups — Exact Address Unlocked',
    authorizedByDonorBadge: 'Pickup Authorized by Donor',
    definitivePickupAddress: 'Exact Pickup Address',
    waitingDonorAuthTitle: 'Awaiting Donor Authorization',
    definitiveAddressRevealedWhenApproved: 'Definite pickup address will be disclosed as soon as the donor approves your request.',
    previousHistoryTitle: 'Previous Requests',
    requestStatusLabel: 'Request status:',
    statusRejected: 'Not authorized by donor',

    donationSuccessTitle: 'Donation published successfully!',
    donationSuccessDesc: 'Your item is now live in the catalog with an approximate safe location.',
    requestSentTitle: 'Request sent to donor!',
    requestSentDesc: 'Once the donor approves your pickup, the exact address will be disclosed to you.',
    authorizedSuccessTitle: 'Pickup authorized!',
    authorizedSuccessDesc: 'The recipient now has access to your exact address and collection notes.',
    rejectedSuccessTitle: 'Request declined',
    rejectedSuccessDesc: 'The request has been marked as declined.',
    deliveredCompletedTitle: 'Donation completed!',
    deliveredCompletedDesc: 'Item delivered and process closed. Thank you!',
    profileSwitchedTitle: 'User switched',
    profileSwitchedDesc: 'You are now browsing as',
    dataRestoredTitle: 'Demo data restored',
    dataRestoredDesc: 'Default sample donations and requests have been reloaded.',

    footerDescription: 'Community Donations & Safe Pickup Platform with Address Privacy Protection',
    footerGuarantee: 'Privacy guaranteed through authorization',
  },
};
