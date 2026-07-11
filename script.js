/* ==========================================================================
   WAYUP LANDING PAGE JAVASCRIPT
   Interactivity, FAQ Accordion, LED Cards, and Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }



  /* -------------------------------------------------------------
     1b. MOBILE HAMBURGER MENU
     ------------------------------------------------------------- */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('mobile-active');
      mobileMenuToggle.classList.toggle('active', isActive);
      mobileMenuToggle.setAttribute('aria-expanded', String(isActive));
    });

    // Close the mobile menu whenever a nav link is clicked
    navMenu.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }



  /* -------------------------------------------------------------
     1. LED CARDS INTERACTIVITY
     ------------------------------------------------------------- */
  const ledCards = document.querySelectorAll('.led-card');

  ledCards.forEach(card => {
    // Toggle "active" state on click (LED stays glowing)
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Deactivate all cards
      ledCards.forEach(c => c.classList.remove('active'));

      // Toggle clicked card
      if (!isActive) {
        card.classList.add('active');
      }
    });

    // Subtle parallax-like mouse tracking for glow direction
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) {
        card.style.transform = '';
      } else {
        card.style.transform = 'translateY(-6px) scale(1.01)';
      }
    });
  });



  /* -------------------------------------------------------------
     2. APP DASHBOARD SIDEBAR TAB NAVIGATION
     ------------------------------------------------------------- */
  const menuItems = document.querySelectorAll('.menu-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const genericTabTitle = document.getElementById('generic-tab-title');
  const genericTabDesc = document.getElementById('generic-tab-desc');

  const tabMap = {
    'hoje': 'tab-hoje',
    'jornada': 'tab-jornada',
    'evolucao': 'tab-evolucao',
    'revisoes': 'tab-generic',
    'biblioteca': 'tab-generic',
    'reta-final': 'tab-generic',
    'suporte': 'tab-generic'
  };

  const genericDescriptions = {
    'revisoes': { title: 'Revisões Inteligentes', desc: 'Gerencie seus ciclos de revisão espaçada automatizados aqui.' },
    'biblioteca': { title: 'Biblioteca de Conteúdo', desc: 'Acesse todos os materiais de teoria e exercícios por matéria.' },
    'reta-final': { title: 'Reta Final ENEM', desc: 'Estratégias de prova e simulados completos para os últimos 30 dias.' },
    'suporte': { title: 'Suporte WayUp', desc: 'Fale com nossa equipe de suporte estudantil.' }
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabKey = item.getAttribute('data-tab');
      const targetTabId = tabMap[tabKey] || 'tab-hoje';

      menuItems.forEach(m => m.classList.remove('active'));
      item.classList.add('active');

      tabContents.forEach(tab => tab.classList.remove('active'));
      const targetTab = document.getElementById(targetTabId);

      if (targetTab) {
        if (targetTabId === 'tab-generic' && genericDescriptions[tabKey]) {
          if (genericTabTitle) genericTabTitle.textContent = genericDescriptions[tabKey].title;
          if (genericTabDesc) genericTabDesc.textContent = genericDescriptions[tabKey].desc;
        }
        targetTab.classList.add('active');
      }
    });
  });



  /* -------------------------------------------------------------
     3. FAQ ACCORDION
     ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  /* -------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
     ------------------------------------------------------------- */
  const sectionsToReveal = document.querySelectorAll(
    '.problem-card, .led-card, .comparison-table-wrapper, .pricing-card, .how-step, .how-step-connector'
  );

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.5;

    sectionsToReveal.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        // Staggered reveal for led-cards and timeline steps - more distributed delay
        const delay = (section.classList.contains('led-card') || section.classList.contains('how-step') || section.classList.contains('how-step-connector')) ? index * 120 : 0;
        setTimeout(() => {
          section.classList.add('reveal-visible');
        }, delay);
      }
    });
  };

  // Add scroll reveal css injection dynamically
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .problem-card, .led-card, .comparison-table-wrapper, .testimonial-card, .pricing-card, .how-step {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .led-card {
      transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    .reveal-visible {
      opacity: 1 !important;
    }
    .problem-card.reveal-visible, .comparison-table-wrapper.reveal-visible, .testimonial-card.reveal-visible, .pricing-card.reveal-visible, .how-step.reveal-visible {
      transform: translateY(0) !important;
    }
    .led-card.reveal-visible:not(:hover):not(.active) {
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleEl);

  window.addEventListener('scroll', revealOnScroll);
  // Run once initially
  revealOnScroll();
});
