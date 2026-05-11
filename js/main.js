// ---- Navbar scroll ----
const mainNav = document.getElementById('mainNav');

function updateNavbar() {
  mainNav.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ---- Before/After slider ----
const slider   = document.querySelector('[data-slider]');
const afterSide = document.querySelector('[data-after-side]');

if (slider && afterSide) {
  function updateComparison() {
    afterSide.style.width = slider.value + '%';
  }
  slider.addEventListener('input', updateComparison);
  updateComparison();
}

// ---- Scheduling form ----
const scheduleDate   = document.getElementById('scheduleDate');
const schedulingForm = document.getElementById('schedulingForm');

if (scheduleDate) {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  scheduleDate.min = yyyy + '-' + mm + '-' + dd;

  scheduleDate.addEventListener('change', function () {
    // new Date with T00:00 avoids UTC offset shifting the day
    const picked = new Date(this.value + 'T00:00:00');
    if (picked.getDay() === 0) {
      this.setCustomValidity('Não atendemos aos domingos. Escolha outro dia.');
      this.reportValidity();
    } else {
      this.setCustomValidity('');
    }
  });
}

if (schedulingForm) {
  schedulingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data        = new FormData(this);
    const tipo        = data.get('tipoLavagem') || '';
    const dia         = data.get('dia')         || '';
    const horario     = data.get('horario')     || '';
    const nome        = data.get('nome')        || '';
    const whatsapp    = data.get('whatsapp')    || '';
    const veiculo     = data.get('veiculo')     || 'Não informado';
    const observacoes = data.get('observacoes') || 'Nenhuma';

    function formatDate(str) {
      if (!str) return '';
      var parts = str.split('-');
      return parts[2] + '/' + parts[1] + '/' + parts[0];
    }

    var msg = [
      '*Agendamento — Prime Detail Studio*',
      '',
      '*Serviço:* '     + tipo,
      '*Dia:* '         + formatDate(dia),
      '*Horário:* '     + horario,
      '*Nome:* '        + nome,
      '*WhatsApp:* '    + whatsapp,
      '*Veículo:* '     + veiculo,
      '*Observações:* ' + observacoes,
    ].join('\n');

    // Replace 5500000000000 with the studio's actual WhatsApp number
    var phone = '5500000000000';
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
  });
}
