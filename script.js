document.addEventListener('DOMContentLoaded', () => {
  const passos = document.querySelectorAll('.passo');
  const botoes = document.querySelectorAll('.btn-proximo');

  function showStep(indexOrId) {
    const id = String(indexOrId).startsWith('passo-') ? String(indexOrId) : `passo-${indexOrId}`;
    const target = document.getElementById(id);
    // Se alvo não existe, volta para o início
    if (!target) {
      console.warn(`Passo "${id}" não encontrado. Retornando ao passo-0.`);
      safeShow(0);
      return;
    }
    passos.forEach(p => p.classList.remove('ativo'));
    target.classList.add('ativo');
    // muda hash da URL para permitir link direto
    try { history.replaceState(null, '', `#${id}`); } catch(e){}
    // rolar suavemente para o conteúdo
    target.scrollIntoView({behavior:'smooth', block:'center'});
  }

  function safeShow(n){
    const fallback = document.getElementById(`passo-${n}`);
    if (fallback) {
      passos.forEach(p => p.classList.remove('ativo'));
      fallback.classList.add('ativo');
    } else {
      // se por acaso nem passo-0 existir, mostra o primeiro passo disponível
      if (passos.length) passos[0].classList.add('ativo');
    }
  }

  // eventos dos botões
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const prox = btn.dataset.proximo;
      if (typeof prox === 'undefined' || prox === '') {
        console.error('Botão sem data-proximo detectado:', btn);
        return;
      }
      showStep(prox);
    });
  });

  // Init: se houver hash (#passo-3) usa, senão mostra passo-0
  const hash = location.hash;
  if (hash && document.getElementById(hash.replace('#',''))) {
    showStep(hash.replace('#',''));
  } else {
    safeShow(0);
  }
});
