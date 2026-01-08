<template>
  <!-- Contenu visuel droite - Image portrait avec icônes -->
  <div class="visual-container">
    <!-- Image portrait de fond -->
    <div class="image-wrapper">
      <img 
        src="/src/assets/images/panneau_montés.jpg" 
        alt="Panneaux solaires - Énergie renouvelable"
        class="portrait-image"
      />
      <!-- Gradient overlay subtle -->
      <div class="gradient-overlay"></div>

      <!-- Icône Objectifs - Carré haut gauche -->
      <div class="icon-box icon-objectives">
        <div class="icon-inner">
          <div class="icon-circle">
            <i class="fas fa-bullseye"></i>
          </div>
          <p class="icon-text">NOS</p>
          <p class="icon-text">OBJECTIFS</p>
        </div>
      </div>

      <!-- Icône Vision - Carré bas gauche -->
      <div class="icon-box icon-vision">
        <div class="icon-inner">
          <div class="icon-circle">
            <i class="fas fa-eye"></i>
          </div>
          <p class="icon-text">NOTRE</p>
          <p class="icon-text">VISION</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Ce composant n'a pas besoin de props ou de logique complexe
// Il est purement présentationnel
</script>

<style scoped>
/* === CONTENEUR PRINCIPAL === */
.visual-container {
  position: relative;
  height: 100%;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Responsive : Mobile */
@media (max-width: 768px) {
  .visual-container {
    min-height: 250px;
    padding: 1rem 0;
  }
}

/* Responsive : Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .visual-container {
    min-height: 300px;
  }
}

/* Responsive : Desktop */
@media (min-width: 1025px) {
  .visual-container {
    min-height: 300px;
  }
}

/* === IMAGE WRAPPER === */
.image-wrapper {
  position: relative;
  width: 75%;
  height: 75%;
  border-radius: 1.5rem;
  overflow: visible;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
}

/* Responsive : Mobile */
@media (max-width: 640px) {
  .image-wrapper {
    width: 80%;
    height: 80%;
    border-radius: 1.5rem;
  }
}

/* Responsive : Tablet/Desktop */
@media (min-width: 641px) {
  .image-wrapper {
    width: 75%;
    height: 75%;
  }
}

/* === IMAGE === */
.portrait-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
  transition: box-shadow 0.5s;
}

.image-wrapper:hover .portrait-image {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}

/* === GRADIENT OVERLAY === */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
  border-radius: 1.5rem;
}

/* === ICÔNE BOX === */
.icon-box {
  position: absolute;
  left: 0;
  z-index: 10;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

/* Responsive pour Objectifs */
.icon-objectives {
  /* Mobile */
  top: 0.5rem;
}

@media (min-width: 641px) {
  .icon-objectives {
    /* Tablet */
    top: 1rem;
  }
}

@media (min-width: 769px) {
  .icon-objectives {
    /* Desktop */
    top: 2rem;
  }
}

/* Responsive pour Vision */
.icon-vision {
  /* Mobile */
  bottom: 0.5rem;
}

@media (min-width: 641px) {
  .icon-vision {
    /* Tablet */
    bottom: 1rem;
  }
}

@media (min-width: 769px) {
  .icon-vision {
    /* Desktop */
    bottom: 2rem;
  }
}

/* === INNER ICON === */
.icon-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background-opacity: 0.95;
  transition: all 0.3s ease;
  width: 8rem;
  height: 8rem;
}

/* Objectifs styling */
.icon-objectives .icon-inner {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
}

.icon-objectives:hover .icon-inner {
  box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.5);
  transform: scale(1.05);
}

/* Vision styling */
.icon-vision .icon-inner {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
}

.icon-vision:hover .icon-inner {
  box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.5);
  transform: scale(1.05);
}

/* === ICON CIRCLE === */
.icon-circle {
  width: 3rem;
  height: 3rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: transform 0.3s ease;
  color: inherit;
}

/* Couleur des icônes */
.icon-circle i {
  color: inherit;
}

.icon-objectives .icon-circle i {
  color: #f59e0b;
}

.icon-vision .icon-circle i {
  color: #2563eb;
}

.icon-objectives:hover .icon-circle {
  color: #f59e0b;
  transform: rotate(12deg);
}

.icon-vision:hover .icon-circle {
  color: #2563eb;
  transform: rotate(-12deg);
}

/* === ICON TEXT === */
.icon-text {
  font-size: 0.75rem;
  font-weight: 900;
  text-align: center;
  line-height: 1.25;
  margin: 0;
}

.icon-objectives .icon-text {
  color: rgba(255, 255, 255, 0.7);
}

.icon-vision .icon-text {
  color: rgba(230, 240, 255, 0.7);
}
</style>
