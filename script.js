/* ==========================================================================
   WAYUP HIGH-TECH JAVASCRIPT LOGIC
   Header Navigation, App Simulator, FAQ Accordion & Scroll Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* -------------------------------------------------------------
     1. FLOATING HEADER ACTIVE LINK ON SCROLL
     ------------------------------------------------------------- */
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavPill() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navPills.forEach(pill => {
          pill.classList.remove('active');
          if (pill.getAttribute('href') === `#${sectionId}`) {
            pill.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavPill);

  /* -------------------------------------------------------------
     2. DASHBOARD MOCKUP TAB SWITCHER
     ------------------------------------------------------------- */
  const menuItems = document.querySelectorAll('.menu-item');
  const tabContents = document.querySelectorAll('.tab-content');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');

      // Update active sidebar state
      menuItems.forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');

      // Hide all contents
      tabContents.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
      });

      // Show targeted tab
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) {
        targetTab.classList.remove('hidden');
        targetTab.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------
     3. MOCKUP TASK COMPLETION INTERACTION
     ------------------------------------------------------------- */
  const btnCompleteTask = document.getElementById('btn-complete-task');
  const cardPrepVal = document.getElementById('card-prep-val');
  const cardStreakVal = document.getElementById('card-streak-val');
  const progressBigVal = document.getElementById('progress-big-val');
  const progressSubDesc = document.getElementById('progress-sub-desc');
  const progressFillBar = document.getElementById('progress-fill-bar');

  if (btnCompleteTask) {
    btnCompleteTask.addEventListener('click', function() {
      if (!this.classList.contains('completed')) {
        this.classList.add('completed');
        this.innerHTML = '<i data-lucide="check"></i> Concluído!';
        this.style.backgroundColor = '#10b981';
        this.style.color = '#000000';

        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        if (cardPrepVal) {
          const currentPrep = parseInt(cardPrepVal.textContent) || 1;
          const newPrep = Math.min(100, currentPrep + 1);
          cardPrepVal.textContent = `${newPrep}%`;
          if (progressBigVal) progressBigVal.textContent = `${newPrep}%`;
          if (progressSubDesc) progressSubDesc.textContent = `Você está ${newPrep}% mais perto da aprovação!`;
          if (progressFillBar) progressFillBar.style.width = `${newPrep}%`;
        }

        showToast("Meta diária cumprida! Sua sequência de estudos aumentou.");
      }
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('custom-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#000804] text-white border border-emerald-500/50 px-6 py-3 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] z-50 transition-all opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 3000);
  }

  /* -------------------------------------------------------------
     4. FAQ ACCORDION
     ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(other => {
          other.classList.remove('active');
          const content = other.querySelector('.faq-content');
          if (content) content.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.faq-content');
          if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }
      });
    }
  });
});
