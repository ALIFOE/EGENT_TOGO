export const services = [
  {
    id: 1,
    slug: 'energie-solaire',
    name: 'Énergie Solaire',
    category: 'Solutions Énergétiques',
    shortDescription: 'Solutions solaires innovantes et durables pour tous vos besoins énergétiques.',
    description: `L'énergie solaire est la solution d'avenir pour une consommation énergétique responsable et économique. Nous installons des systèmes photovoltaïques performants adaptés à vos besoins.`,
    longDescription: `
    <h3>Nos services solaires incluent:</h3>
    <ul>
      <li>Installation de panneaux solaires de dernière génération</li>
      <li>Étude de faisabilité et dimensionnement</li>
      <li>Maintenance et monitoring des installations</li>
      <li>Batteries de stockage d'énergie</li>
      <li>Intégration avec systèmes existants</li>
      <li>Conseil en économies d'énergie</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Réduction drastique de votre facture énergétique</li>
      <li>Énergie verte et renouvelable</li>
      <li>Installation rapide et discrète</li>
      <li>Durée de vie de 25+ ans</li>
      <li>Maintenance minimale</li>
      <li>Augmentation de la valeur de votre bien</li>
    </ul>
    `,
    image: new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Rendement optimal', description: 'Panneaux haute performance jusqu\'à 22% de rendement' },
      { title: 'Installation rapide', description: 'Équipe expérimentée pour une mise en place rapide' },
      { title: 'Monitoring 24/7', description: 'Suivi en temps réel de votre production énergétique' },
      { title: 'Garantie complète', description: 'Garantie 25 ans sur les panneaux + 10 ans sur l\'installation' }
    ],
    specifications: [
      { label: 'Type de panneaux', value: 'Monocristallin dernière génération' },
      { label: 'Puissance', value: '1kWc à 50kWc' },
      { label: 'Rendement', value: 'Jusqu\'à 22%' },
      { label: 'Garantie panneaux', value: '25 ans' },
      { label: 'Garantie installation', value: '10 ans' }
    ],
    benefits: [
      'Économies d\'énergie jusqu\'à 80%',
      'Investissement rentabilisé en 5-7 ans',
      'Crédits et subventions disponibles',
      'Impact environnemental positif',
      'Autonomie énergétique progressive'
    ]
  },
  {
    id: 2,
    slug: 'electricite-generale',
    name: 'Électricité Générale',
    category: 'Services Techniques',
    shortDescription: 'Services d\'électricité complète pour résidentiel et professionnel.',
    description: `Notre expertise en électricité générale couvre tous vos besoins : installation, réparation, maintenance et sécurité électrique.`,
    longDescription: `
    <h3>Services d'électricité générale:</h3>
    <ul>
      <li>Installation électrique complète</li>
      <li>Rénovation et mise aux normes</li>
      <li>Maintenance préventive</li>
      <li>Dépannage d'urgence 24/7</li>
      <li>Installation de tableaux électriques</li>
      <li>Certification aux normes internationales</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Conformité aux normes de sécurité</li>
      <li>Électriciens qualifiés et certifiés</li>
      <li>Devis gratuit et transparent</li>
      <li>Travaux garantis 2 ans</li>
      <li>Dépannage rapide</li>
      <li>Respect des délais</li>
    </ul>
    `,
    image: new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href,
      new URL('../assets/images/photo_chantier.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Électriciens certifiés', description: 'Équipe qualifiée et expérimentée' },
      { title: 'Normes de sécurité', description: 'Conformité avec toutes les normes en vigueur' },
      { title: 'Service d\'urgence', description: 'Intervention rapide 24/7 pour les dépannages' },
      { title: 'Devis transparent', description: 'Devis gratuit sans engagement préalable' }
    ],
    specifications: [
      { label: 'Types d\'installations', value: 'Résidentiel, Commercial, Industriel' },
      { label: 'Tension supportée', value: '220V monophasé et 380V triphasé' },
      { label: 'Certifications', value: 'Normes NFC 15-100 et internationales' },
      { label: 'Garantie travaux', value: '2 ans' }
    ],
    benefits: [
      'Installation sécurisée et conforme',
      'Réduction des risques électriques',
      'Optimisation de votre consommation',
      'Accès aux crédits d\'impôt',
      'Augmentation de la sécurité du bâtiment'
    ]
  },
  {
    id: 3,
    slug: 'climatisation-froid',
    name: 'Climatisation & Froid',
    category: 'Confort Thermique',
    shortDescription: 'Solutions de climatisation et systèmes frigorifiques pour votre confort.',
    description: `Nous proposons des solutions de climatisation et de froid adaptées à vos espaces, du résidentiel au professionnel.`,
    longDescription: `
    <h3>Services de climatisation et froid:</h3>
    <ul>
      <li>Installation de climatiseurs</li>
      <li>Systèmes de froid commercial</li>
      <li>Maintenance et entretien régulier</li>
      <li>Recharge de fluide frigorigène</li>
      <li>Réparation rapide</li>
      <li>Systèmes éco-responsables</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Confort thermique optimal</li>
      <li>Économies énergétiques</li>
      <li>Installation rapide et discrète</li>
      <li>Systèmes silencieux</li>
      <li>Faible entretien</li>
      <li>Garantie constructeur</li>
    </ul>
    `,
    image: new URL('../assets/images/photo_chantier.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/photo_chantier.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/photo_chantier.jpg', import.meta.url).href,
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Systèmes performants', description: 'Climatiseurs dernière génération économes' },
      { title: 'Installation discrète', description: 'Unités intérieures élégantes et discrètes' },
      { title: 'Maintenance incluse', description: 'Contrats d\'entretien annuel disponibles' },
      { title: 'Économies énergétiques', description: 'Consommation réduite avec technologie inverter' }
    ],
    specifications: [
      { label: 'Types de systèmes', value: 'Split, Multi-split, Cassette' },
      { label: 'Puissance frigorifique', value: '2,5 à 48 kW' },
      { label: 'Efficacité énergétique', value: 'Classe A++' },
      { label: 'Garantie', value: '5 ans' }
    ],
    benefits: [
      'Confort thermique année-round',
      'Meilleure qualité de l\'air intérieur',
      'Économies énergétiques de 30-40%',
      'Réduction du bruit',
      'Contrôle individuel des zones'
    ]
  },
  {
    id: 4,
    slug: 'plomberie',
    name: 'Plomberie',
    category: 'Services Hydrosantaires',
    shortDescription: 'Services de plomberie complète pour tous vos besoins en eau.',
    description: `Services de plomberie professionnels pour l'installation, la réparation et la maintenance de vos systèmes de tuyauterie.`,
    longDescription: `
    <h3>Services de plomberie:</h3>
    <ul>
      <li>Installation de systèmes de plomberie</li>
      <li>Réparation de fuites</li>
      <li>Débouchage de canalisations</li>
      <li>Installation de sanitaires</li>
      <li>Maintenance préventive</li>
      <li>Installation de systèmes d\'eau chaude</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Plombiers expérimentés et qualifiés</li>
      <li>Dépannage rapide</li>
      <li>Travaux de qualité</li>
      <li>Devis gratuit</li>
      <li>Garantie sur les travaux</li>
      <li>Service d\'urgence 24/7</li>
    </ul>
    `,
    image: new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Experts plomberie', description: 'Équipe qualifiée avec 15+ ans d\'expérience' },
      { title: 'Intervention rapide', description: 'Dépannage d\'urgence available 24/7' },
      { title: 'Matériaux de qualité', description: 'Utilisation de matériaux haut de gamme' },
      { title: 'Garantie travaux', description: 'Garantie 2 ans sur tous les travaux' }
    ],
    specifications: [
      { label: 'Diamètres tuyauterie', value: '10mm à 110mm' },
      { label: 'Types de matériaux', value: 'Cuivre, PVC, PER, Inox' },
      { label: 'Certifications', value: 'Normes DTU en vigueur' },
      { label: 'Garantie', value: '2 ans' }
    ],
    benefits: [
      'Résolution rapide des fuites',
      'Prévention des dégâts d\'eau',
      'Amélioration de la pression d\'eau',
      'Hygiène et sécurité optimales',
      'Conformité aux normes'
    ]
  },
  {
    id: 5,
    slug: 'fourniture-equipements',
    name: 'Fourniture d\'Équipements',
    category: 'Équipements Énergétiques',
    shortDescription: 'Fourniture de tous les équipements nécessaires pour vos projets énergétiques.',
    description: `Nous fournissons tous les équipements de qualité nécessaires pour vos installations énergétiques et de confort.`,
    longDescription: `
    <h3>Équipements fournis:</h3>
    <ul>
      <li>Panneaux solaires photovoltaïques</li>
      <li>Onduleurs et régulateurs de charge</li>
      <li>Batteries de stockage d\'énergie</li>
      <li>Climatiseurs et pompes à chaleur</li>
      <li>Tableaux électriques et disjoncteurs</li>
      <li>Matériel de plomberie</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Équipements de marques reconnues</li>
      <li>Prix compétitifs</li>
      <li>Garantie constructeur</li>
      <li>Livraison rapide</li>
      <li>Support technique</li>
      <li>Conseil en sélection</li>
    </ul>
    `,
    image: new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href,
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Marques reconnues', description: 'Fournisseur officiel des meilleures marques' },
      { title: 'Prix compétitifs', description: 'Tarification la plus attractive du marché' },
      { title: 'Support technique', description: 'Conseil gratuit pour choisir les bons équipements' },
      { title: 'Livraison rapide', description: 'Stock important avec livraison sous 48h' }
    ],
    specifications: [
      { label: 'Marques proposées', value: '20+ marques internationales' },
      { label: 'Délai de livraison', value: '24-48h pour stocks disponibles' },
      { label: 'Garantie', value: 'Selon les constructeurs (2 à 25 ans)' },
      { label: 'Livraison', value: 'Sur toute la région' }
    ],
    benefits: [
      'Accès aux meilleurs équipements du marché',
      'Prix réduits par rapport au retail',
      'Équipements certifiés et garantis',
      'Support technique pendant et après vente',
      'Facilité d\'installation standardisée'
    ]
  },
  {
    id: 6,
    slug: 'consulting',
    name: 'Consulting',
    category: 'Conseil et Études',
    shortDescription: 'Consulting en solutions énergétiques pour optimiser votre consommation.',
    description: `Nos consultants experts vous aident à identifier et mettre en œuvre les meilleures solutions énergétiques adaptées à vos besoins et votre budget.`,
    longDescription: `
    <h3>Services de consulting:</h3>
    <ul>
      <li>Audit énergétique complet</li>
      <li>Étude de faisabilité</li>
      <li>Dimensionnement de systèmes</li>
      <li>Analyse de rentabilité</li>
      <li>Conseil en financement</li>
      <li>Suivi de projet</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Experts avec 20+ ans d\'expérience</li>
      <li>Analyse personnalisée de vos besoins</li>
      <li>Solutions optimisées et rentables</li>
      <li>Accompagnement complet du projet</li>
      <li>Accès aux aides et subventions</li>
      <li>Suivi après installation</li>
    </ul>
    `,
    image: new URL('../assets/images/egent_reception.jpg', import.meta.url).href,
    mainImage: new URL('../assets/images/egent_reception.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/egent_reception.jpg', import.meta.url).href,
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href
    ],
    features: [
      { title: 'Experts expérimentés', description: 'Consultants avec 20+ ans d\'expérience' },
      { title: 'Audit personnalisé', description: 'Analyse approfondie de votre situation' },
      { title: 'Solutions optimisées', description: 'Recommandations adaptées et rentables' },
      { title: 'Accompagnement complet', description: 'Support du projet du début à la fin' }
    ],
    specifications: [
      { label: 'Durée audit moyen', value: '2-3 jours' },
      { label: 'Rapport fourni', value: 'Détaillé avec recommandations' },
      { label: 'Expertise', value: 'Énergie solaire, efficacité énergétique' },
      { label: 'Coût audit', value: 'Gratuit (remboursé lors installation)' }
    ],
    benefits: [
      'Réduction de 40-60% de votre consommation',
      'ROI (retour sur investissement) en 4-6 ans',
      'Accès aux crédits d\'impôt et subventions',
      'Transition énergétique progressive',
      'Tranquillité d\'esprit énergétique'
    ]
  }
];
