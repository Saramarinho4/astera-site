(function () {
  'use strict';

  const C = { white: '#FFFFFF', paper: '#FDFBFF', l50: '#F7F3FD', l100: '#EFE7FB', l200: '#E0D2F5', l300: '#CDB8EE', l400: '#B197E3', l500: '#9270D6', l600: '#7654BE', l700: '#5D3F9E', plum: '#2A1B47', ink: '#41375A', muted: '#6B6084', line: '#E7DEF6' };
  const STAR = 'M12 0C12.8 6.9 17.1 11.2 24 12C17.1 12.8 12.8 17.1 12 24C11.2 17.1 6.9 12.8 0 12C6.9 11.2 11.2 6.9 12 0Z';
  const SANS = "font-family=\"'Hanken Grotesk','Helvetica Neue',Arial,sans-serif\"";
  const SERIF = "font-family=\"'Instrument Serif',Georgia,serif\"";

  function frame(title, inner) {
    return `<rect x="8" y="8" width="384" height="304" rx="18" fill="${C.white}" stroke="${C.line}"/>
      <circle cx="28" cy="28" r="4" fill="${C.l200}"/><circle cx="42" cy="28" r="4" fill="${C.l200}"/><circle cx="56" cy="28" r="4" fill="${C.l200}"/>
      <text x="76" y="32" ${SANS} font-size="10.5" fill="${C.muted}">${title}</text>
      <line x1="8" y1="44" x2="392" y2="44" stroke="${C.line}"/>${inner}`;
  }
  function svg(inner, label) {
    return `<svg viewBox="0 0 400 320" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  function finance(label) {
    const R = 42, L = 2 * Math.PI * R;
    const tile = (x, name, val, dark) => `<rect x="${x}" y="80" width="108" height="54" rx="12" fill="${dark ? C.l100 : C.l50}"/>
      <text x="${x + 12}" y="99" ${SANS} font-size="9.5" fill="${C.muted}">${name}</text>
      <text x="${x + 12}" y="122" ${SANS} font-size="15" font-weight="700" fill="${dark ? C.l700 : C.plum}">${val}</text>`;
    const row = (y, name, w, col) => `<text x="150" y="${y + 8}" ${SANS} font-size="10" fill="${C.ink}">${name}</text>
      <rect x="216" y="${y}" width="156" height="9" rx="4.5" fill="${C.l100}"/><rect x="216" y="${y}" width="${w}" height="9" rx="4.5" fill="${col}"/>`;
    const arc = (len, off, col) => `<circle cx="80" cy="232" r="${R}" fill="none" stroke="${col}" stroke-width="16" stroke-dasharray="${len} ${L}" stroke-dashoffset="${-off}" transform="rotate(-90 80 232)"/>`;
    return svg(frame('Finanças · Meu mês', `
      <text x="28" y="68" ${SERIF} font-size="21" fill="${C.plum}">Resumo do mês</text>
      ${tile(28, 'Entradas', 'R$ 4.850')}${tile(146, 'Saídas', 'R$ 3.120')}${tile(264, 'Saldo', 'R$ 1.730', true)}
      <circle cx="80" cy="232" r="${R}" fill="none" stroke="${C.l100}" stroke-width="16"/>
      ${arc(110, 0, C.l600)}${arc(70, 110, C.l400)}${arc(45, 180, C.l300)}
      <text x="80" y="237" text-anchor="middle" ${SERIF} font-size="17" fill="${C.plum}">64%</text>
      <text x="150" y="166" ${SANS} font-size="10.5" font-weight="600" fill="${C.muted}">Para onde vai o dinheiro</text>
      ${row(180, 'Moradia', 118, C.l600)}${row(208, 'Mercado', 86, C.l500)}${row(236, 'Lazer', 52, C.l400)}${row(264, 'Reserva', 68, C.l300)}`), label);
  }

  function sales(label) {
    const vals = [38, 56, 44, 70, 62, 88, 76, 102];
    const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D', 'S'];
    const bars = vals.map((h, i) => {
      const x = 32 + i * 43.5, col = i === vals.length - 1 ? C.l600 : (i % 3 === 0 ? C.l300 : C.l200);
      return `<rect x="${x}" y="${232 - h}" width="30" height="${h}" rx="6" fill="${col}"/><text x="${x + 15}" y="246" text-anchor="middle" ${SANS} font-size="9" fill="${C.muted}">${days[i]}</text>`;
    }).join('');
    return svg(frame('Vendas · Esta semana', `
      <text x="28" y="68" ${SERIF} font-size="21" fill="${C.plum}">Faturamento</text>
      <text x="28" y="104" ${SERIF} font-size="30" fill="${C.l700}">R$ 12.480</text>
      <rect x="152" y="84" width="46" height="21" rx="10.5" fill="${C.l100}"/>
      <text x="175" y="98.5" text-anchor="middle" ${SANS} font-size="10.5" font-weight="700" fill="${C.l700}">+18%</text>
      <line x1="28" y1="150" x2="372" y2="150" stroke="${C.line}" stroke-dasharray="3 4"/><line x1="28" y1="190" x2="372" y2="190" stroke="${C.line}" stroke-dasharray="3 4"/>
      <line x1="28" y1="232" x2="372" y2="232" stroke="${C.line}"/>${bars}
      <rect x="28" y="260" width="344" height="24" rx="8" fill="${C.l50}"/>
      <text x="40" y="276" ${SANS} font-size="10" fill="${C.ink}">Pedido 1042</text><text x="150" y="276" ${SANS} font-size="10" fill="${C.ink}">Planner</text>
      <rect x="320" y="266" width="42" height="13" rx="6.5" fill="${C.l200}"/><text x="341" y="276" text-anchor="middle" ${SANS} font-size="8.5" font-weight="700" fill="${C.l700}">Pago</text>`), label);
  }

  function planner(label) {
    const labels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    let cal = labels.map((d, i) => `<text x="${225 + i * 23}" y="88" text-anchor="middle" ${SANS} font-size="8.5" font-weight="700" fill="${C.muted}">${d}</text>`).join('');
    const offset = 3, hi = { 9: 'soft', 14: 'soft', 21: 'main', 28: 'soft' };
    for (let d = 1; d <= 30; d++) {
      const idx = d + offset - 1, cx = 225 + (idx % 7) * 23, cy = 108 + Math.floor(idx / 7) * 27;
      const mark = hi[d];
      if (mark) cal += `<circle cx="${cx}" cy="${cy - 3}" r="10" fill="${mark === 'main' ? C.l600 : C.l100}"/>`;
      cal += `<text x="${cx}" y="${cy}" text-anchor="middle" ${SANS} font-size="9.5" fill="${mark === 'main' ? '#fff' : C.ink}" font-weight="${mark ? 700 : 400}">${d}</text>`;
    }
    const goal = (y, done, txt) => `<rect x="34" y="${y}" width="12" height="12" rx="3.5" fill="${done ? C.l600 : 'none'}" stroke="${done ? C.l600 : C.l300}" stroke-width="1.5"/>
      ${done ? `<path d="M37 ${y + 6.5}l2.2 2.2 4-4.4" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      <text x="56" y="${y + 10}" ${SANS} font-size="10.5" fill="${C.ink}">${txt}</text>`;
    return svg(frame('Planner · Ano', `
      <rect x="9" y="45" width="191" height="266" fill="${C.paper}"/>
      <line x1="200" y1="45" x2="200" y2="311" stroke="${C.line}"/>
      <text x="34" y="122" ${SERIF} font-size="72" fill="${C.l700}">2027</text>
      <text x="36" y="146" ${SANS} font-size="10" letter-spacing="3" fill="${C.muted}">PLANNER</text>
      <path transform="translate(170 54) scale(.9)" d="${STAR}" fill="${C.l500}"/>
      <text x="34" y="192" ${SANS} font-size="10.5" font-weight="700" fill="${C.plum}">Metas do ano</text>
      ${goal(204, true, 'Reserva de emergência')}${goal(228, false, 'Ler doze livros')}${goal(252, false, 'Viagem em família')}
      <text x="216" y="66" ${SERIF} font-size="21" fill="${C.plum}">Setembro</text>${cal}`), label);
  }

  function creator(label) {
    const cols = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
    const plan = [[C.l200], [C.l600, C.l100], [C.l300], [C.l100, C.l400], [C.l600], [C.l200, C.l300], [C.l100]];
    let week = '';
    cols.forEach((d, i) => {
      const x = 28 + i * 50;
      week += `<text x="${x + 22}" y="88" text-anchor="middle" ${SANS} font-size="9" font-weight="700" fill="${C.muted}">${d}</text>`;
      plan[i].forEach((col, j) => { week += `<rect x="${x}" y="${96 + j * 34}" width="44" height="${j ? 26 : 30}" rx="8" fill="${col}"/>`; });
    });
    const tile = (x, name, val, dark) => `<rect x="${x}" y="172" width="108" height="48" rx="12" fill="${dark ? C.l100 : C.l50}"/>
      <text x="${x + 12}" y="190" ${SANS} font-size="9.5" fill="${C.muted}">${name}</text>
      <text x="${x + 12}" y="211" ${SANS} font-size="15" font-weight="700" fill="${dark ? C.l700 : C.plum}">${val}</text>`;
    const row = (y, txt, pill, w) => `<rect x="28" y="${y}" width="344" height="24" rx="8" fill="${C.l50}"/>
      <text x="40" y="${y + 16}" ${SANS} font-size="10" fill="${C.ink}">${txt}</text>
      <rect x="${372 - w - 10}" y="${y + 5}" width="${w}" height="14" rx="7" fill="${C.l200}"/><text x="${372 - w / 2 - 10}" y="${y + 15}" text-anchor="middle" ${SANS} font-size="8.5" font-weight="700" fill="${C.l700}">${pill}</text>`;
    return svg(frame('Creator · Conteúdo', `
      <text x="28" y="68" ${SERIF} font-size="21" fill="${C.plum}">Calendário de conteúdo</text>
      ${week}
      ${tile(28, 'Posts no mês', '18')}${tile(146, 'Parcerias', '4')}${tile(264, 'Meta do mês', '72%', true)}
      ${row(236, 'Reels · bastidores', 'Gravado', 46)}${row(266, 'Parceria · roteiro', 'Enviado', 46)}`), label);
  }

  function site(label) {
    return svg(`
      <rect x="8" y="8" width="384" height="304" rx="18" fill="${C.white}" stroke="${C.line}"/>
      <circle cx="28" cy="28" r="4" fill="${C.l200}"/><circle cx="42" cy="28" r="4" fill="${C.l200}"/><circle cx="56" cy="28" r="4" fill="${C.l200}"/>
      <rect x="92" y="19" width="216" height="18" rx="9" fill="${C.l50}"/>
      <line x1="8" y1="44" x2="392" y2="44" stroke="${C.line}"/>
      <text x="28" y="72" ${SERIF} font-size="13" letter-spacing="2" fill="${C.plum}">ÁSTERA</text><path transform="translate(80 60) scale(.3)" d="${STAR}" fill="${C.l500}"/>
      <rect x="270" y="62" width="30" height="5" rx="2.5" fill="${C.l200}"/><rect x="310" y="62" width="30" height="5" rx="2.5" fill="${C.l200}"/><rect x="350" y="62" width="22" height="5" rx="2.5" fill="${C.l200}"/>
      <text x="28" y="140" ${SERIF} font-size="44" letter-spacing="3" fill="${C.plum}">ÁSTERA</text><path transform="translate(218 104) scale(.75)" d="${STAR}" fill="${C.l500}"/>
      <rect x="28" y="158" width="190" height="7" rx="3.5" fill="${C.l200}"/><rect x="28" y="174" width="140" height="7" rx="3.5" fill="${C.l100}"/>
      <rect x="28" y="196" width="92" height="28" rx="14" fill="${C.l600}"/><rect x="128" y="196" width="80" height="28" rx="14" fill="none" stroke="${C.l300}"/>
      <path transform="translate(252 72) scale(5)" d="${STAR}" fill="${C.l100}"/>
      <rect x="28" y="246" width="106" height="50" rx="10" fill="${C.l50}"/><rect x="147" y="246" width="106" height="50" rx="10" fill="${C.l50}"/><rect x="266" y="246" width="106" height="50" rx="10" fill="${C.l50}"/>`, label);
  }

  function generic(label) {
    return svg(frame('Ástera', `
      <path transform="translate(148 96) scale(4.2)" d="${STAR}" fill="${C.l200}"/>
      <text x="200" y="252" text-anchor="middle" ${SERIF} font-size="22" fill="${C.plum}">Novo por aqui</text>`), label);
  }

  const kinds = { finance, sales, planner, creator, site, generic };

  window.AsteraMockups = {
    render(kind, label) {
      return (kinds[kind] || generic)(label || 'Mockup conceitual do produto Ástera');
    }
  };
})();
