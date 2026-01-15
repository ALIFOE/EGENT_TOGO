export const projects = [
  {
    id: 1,
    slug: 'installation-solaire-residential',
    title: 'Installation Solaire Résidentielle - Lomé',
    category: 'Énergie Solaire',
    date: 'Décembre 2023',
    location: 'Lomé, Togo',
    shortDescription: 'Installation complète d\'un système solaire de 5kWc pour une maison résidentielle avec batteries de stockage.',
    description: `Projet d'installation d'un système photovoltaïque complet pour une résidence à Lomé. Ce projet a permis au client de réduire sa facture énergétique de 85% tout en bénéficiant d'une autonomie énergétique progressive.`,
    details: `
      <h3>Caractéristiques du projet:</h3>
      <ul>
        <li>Puissance installée: 5kWc</li>
        <li>Nombre de panneaux: 12 panneaux 400W</li>
        <li>Onduleur: Hybrid 5kW</li>
        <li>Batterie: 10kWh LiFePO4</li>
        <li>Durée d'installation: 5 jours</li>
        <li>Investissement: 2,5 millions FCFA</li>
      </ul>
      
      <h3>Avantages réalisés:</h3>
      <ul>
        <li>Autonomie énergétique 80% du temps</li>
        <li>Réduction de la facture énergétique de 85%</li>
        <li>Système de monitoring en temps réel</li>
        <li>Garantie 10 ans sur l'installation</li>
        <li>Durée de vie estimée: 25+ ans</li>
      </ul>
    `,
    mainImage: new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href
    ],
    team: [
      { name: 'Ingénieur Principal', title: 'Chef de projet' },
      { name: 'Technicien Senior', title: 'Installation' },
      { name: 'Électricien Certifié', title: 'Câblage et mise en service' }
    ],
    results: [
      { metric: '5 kWc', description: 'Puissance installée' },
      { metric: '85%', description: 'Réduction de facture' },
      { metric: '25+ ans', description: 'Durée de vie système' },
      { metric: '10 ans', description: 'Garantie' }
    ],
    testimonial: {
      author: 'M. Koffi A.',
      role: 'Propriétaire résidence',
      content: 'Excellent projet! Ma facture d\'électricité a considérablement diminué et j\'ai une totale indépendance énergétique pendant les heures de soleil. L\'équipe EGENT TOGO a été très professionnelle.'
    }
  },
  {
    id: 2,
    slug: 'installation-climatisation-commercial',
    title: 'Système de Climatisation Commercial - Kofi',
    category: 'Climatisation & Froid',
    date: 'Septembre 2023',
    location: 'Kofi, Togo',
    shortDescription: 'Installation d\'un système de climatisation multi-split pour un bâtiment commercial de 500m².',
    description: `Installation d'un système de climatisation haute performance pour un complexe commercial à Kofi. Cette installation a optimisé le confort thermique et réduit la consommation énergétique du bâtiment.`,
    details: `
      <h3>Spécifications techniques:</h3>
      <ul>
        <li>Type: Système multi-split inverter</li>
        <li>Surface climatisée: 500m²</li>
        <li>Capacité frigorifique: 24 kW</li>
        <li>Nombre de zones: 4 zones indépendantes</li>
        <li>Consommation: 30% moins qu'un système traditionnel</li>
        <li>Durée d'installation: 8 jours</li>
      </ul>
      
      <h3>Points forts du projet:</h3>
      <ul>
        <li>Contrôle de température par zone</li>
        <li>Consommation énergétique réduite</li>
        <li>Climatisation silencieuse (18dB)</li>
        <li>Filtration HEPA intégrée</li>
        <li>Maintenance annuelle incluse 2 ans</li>
      </ul>
    `,
    mainImage: new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href,
      new URL('../assets/images/photo_chantier.jpg', import.meta.url).href
    ],
    team: [
      { name: 'Chef d\'équipe Climatisation', title: 'Supervision' },
      { name: 'Technicien Frigoriste', title: 'Installation' },
      { name: 'Électricien Spécialisé', title: 'Électricité' }
    ],
    results: [
      { metric: '500m²', description: 'Surface climatisée' },
      { metric: '24 kW', description: 'Capacité frigorifique' },
      { metric: '30%', description: 'Économie énergétique' },
      { metric: '4 zones', description: 'Contrôle indépendant' }
    ],
    testimonial: {
      author: 'Directeur Commercial Kofi',
      role: 'Responsable bâtiment',
      content: 'Le confort thermique est parfait dans tout le bâtiment. Nos clients et employés sont satisfaits. En plus, les économies d\'énergie sont impressionnantes!'
    }
  },
  {
    id: 3,
    slug: 'installation-electrique-hotel',
    title: 'Rénovation Électrique Hôtel 3 étoiles - Aného',
    category: 'Électricité Générale',
    date: 'Juillet 2023',
    location: 'Aného, Togo',
    shortDescription: 'Rénovation complète du système électrique d\'un hôtel 3 étoiles incluant mise aux normes de sécurité.',
    description: `Projet complet de rénovation du système électrique d'un hôtel 3 étoiles à Aného. La rénovation incluait la mise à jour de tous les équipements électriques selon les normes internationales.`,
    details: `
      <h3>Scope du projet:</h3>
      <ul>
        <li>Création de nouveaux tableaux électriques</li>
        <li>Pose de câblage haute sécurité</li>
        <li>Installation système de secours (groupe électrogène)</li>
        <li>Système de protection incendie</li>
        <li>Lighting LED haute efficacité</li>
        <li>Certification conformité normes NFC 15-100</li>
      </ul>
      
      <h3>Résultats et avantages:</h3>
      <ul>
        <li>Sécurité électrique certifiée</li>
        <li>Consommation énergétique réduite de 40%</li>
        <li>Système de secours automatique</li>
        <li>Qualité de distribution améliorée</li>
        <li>Zéro interruption service pendant rénovation</li>
      </ul>
    `,
    mainImage: new URL('../assets/images/photo_chantier.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/photo_chantier.jpg', import.meta.url).href,
      new URL('../assets/images/chauffage_egent.jpg', import.meta.url).href
    ],
    team: [
      { name: 'Chef d\'équipe électrique', title: 'Responsable chantier' },
      { name: 'Électricien Principal', title: 'Tableaux et distribution' },
      { name: 'Technicien Sécurité', title: 'Systèmes de protection' },
      { name: 'Électricien Confirmé', title: 'Installation générale' }
    ],
    results: [
      { metric: '100%', description: 'Conformité normes' },
      { metric: '40%', description: 'Économie énergétique' },
      { metric: '6 semaines', description: 'Durée projet' },
      { metric: '0 incident', description: 'Sécurité sur site' }
    ],
    testimonial: {
      author: 'Directeur Hôtel 3 étoiles',
      role: 'Gestionnaire',
      content: 'Travail exemplaire! L\'équipe EGENT TOGO a respecté les délais, les budgets et a minimisé les disruptions. Notre hôtel respecte maintenant tous les standards internationaux.'
    }
  },
  {
    id: 4,
    slug: 'installation-solaire-ferme',
    title: 'Installation Solaire Ferme Piscicole - Tsévié',
    category: 'Énergie Solaire',
    date: 'Mai 2023',
    location: 'Tsévié, Togo',
    shortDescription: 'Système solaire 10kWc pour alimentation d\'une ferme piscicole avec pompage et aération automatiques.',
    description: `Installation d'un système photovoltaïque pour une ferme piscicole à Tsévié. Le système alimente entièrement les pompes et systèmes d'aération, rendant la ferme complètement autonome énergétiquement.`,
    details: `
      <h3>Configuration technique:</h3>
      <ul>
        <li>Puissance: 10kWc (25 panneaux 400W)</li>
        <li>Onduleur: 10kW tri-phasé</li>
        <li>Batterie: 20kWh LiFePO4</li>
        <li>Pompes: 2 pompes submersibles 7,5kW</li>
        <li>Aération: Système automatique avec variateur</li>
        <li>Monitoring: Système IoT avec app mobile</li>
      </ul>
      
      <h3>Impact du projet:</h3>
      <ul>
        <li>Autonomie énergétique 100%</li>
        <li>Production piscicole augmentée de 30%</li>
        <li>Zéro coût carburant (ancien groupe électrogène)</li>
        <li>Équipements plus durables sans vibrations</li>
        <li>Contrôle à distance des paramètres</li>
        <li>ROI prévu: 4 ans</li>
      </ul>
    `,
    mainImage: new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
    images: [
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href
    ],
    team: [
      { name: 'Ingénieur en énergie renouvelable', title: 'Chef de projet' },
      { name: 'Technicien solaire', title: 'Installation panneaux' },
      { name: 'Électricien', title: 'Câblage et onduleur' },
      { name: 'Spécialiste pompage', title: 'Systèmes d\'eau' }
    ],
    results: [
      { metric: '10 kWc', description: 'Puissance totale' },
      { metric: '100%', description: 'Autonomie énergétique' },
      { metric: '+30%', description: 'Production augmentée' },
      { metric: '4 ans', description: 'ROI estimé' }
    ],
    testimonial: {
      author: 'Propriétaire Ferme Piscicole',
      role: 'Entrepreneur agricole',
      content: 'Vraiment transformateur! Depuis cette installation, ma production a augmenté et je n\'ai plus besoin de carburant cher. C\'est un investissement très rentable et écologique.'
    }
  }
];
