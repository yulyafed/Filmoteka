(() => {
  const refs = {
    openDaynightBtn: document.querySelector('[data-daynight-open]'),
    closeDaynightBtn: document.querySelector('[data-daynight-close]'),
    daynight: document.querySelector('[data-daynight]'),
    openDaynighthBtn: document.querySelector('[data-daynighth-open]'),
    closeDaynighthBtn: document.querySelector('[data-daynighth-close]'),
    daynighth: document.querySelector('[data-daynighth]'),
  };

  refs.openDaynightBtn.addEventListener('change', toggleDaynight);
  refs.closeDaynightBtn.addEventListener('change', toggleDaynight);
  refs.openDaynighthBtn.addEventListener('change', toggleDaynighth);
  refs.closeDaynighthBtn.addEventListener('change', toggleDaynighth);

  function toggleDaynight() {
    refs.daynight.classList.toggle('body_dark');
  }
  function toggleDaynighth() {
    refs.daynighth.classList.toggle('dark-header');
  }
})();
