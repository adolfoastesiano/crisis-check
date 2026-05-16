export const SECCIONES = [
  {
    id: 1,
    nombre: 'Naturaleza del hecho',
    peso: 0.20,
    preguntas: [
      {
        texto: '¿La información ya es pública o puede hacerse pública en las próximas horas?',
        hint: 'Considerá filtraciones, documentos circulando, o fuentes que puedan dar a conocer el tema sin tu intervención.',
        opciones: ['No, es controlable', 'Parcialmente / hay riesgo', 'Sí, ya es pública o inminente'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay víctimas, afectados directos o daño concreto (económico, físico, reputacional)?',
        hint: 'La existencia de daño real eleva la gravedad objetiva de la situación.',
        opciones: ['No hay afectados', 'Afectados menores o indirectos', 'Hay afectados directos o daño grave'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay responsabilidad legal o regulatoria implicada?',
        hint: 'Investigaciones judiciales, sanciones regulatorias, incumplimientos normativos.',
        opciones: ['No', 'Posiblemente', 'Sí, hay implicancias legales claras'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿El origen de la situación es un error o acción propia?',
        hint: 'Si el origen es externo (ataque, fake news, malentendido), el tratamiento comunicacional es diferente.',
        opciones: ['No, es un ataque externo o error ajeno', 'Es mixto o hay responsabilidad parcial', 'Sí, es un error o decisión propia'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿El hecho está siendo interpretado de forma incorrecta, incompleta o perjudicial?',
        hint: 'Si la narrativa dominante distorsiona la realidad, la inacción comunicacional tiene un costo.',
        opciones: ['No, la narrativa es precisa o neutra', 'Hay matices que faltan', 'Sí, la narrativa dominante es incorrecta o perjudicial'],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    id: 2,
    nombre: 'Presión mediática',
    peso: 0.25,
    preguntas: [
      {
        texto: '¿El tema ya está siendo cubierto por medios de comunicación?',
        hint: 'Incluí prensa escrita, portales digitales, radio y televisión.',
        opciones: ['No hay cobertura', 'Cobertura mínima o especializada', 'Cobertura masiva o en crecimiento'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Qué nivel de alcance tienen los medios que cubren el tema?',
        hint: 'Un artículo en un blog especializado tiene impacto muy distinto a una nota en un medio masivo.',
        opciones: ['Medios menores o sin alcance masivo', 'Medios medianos o regionales', 'Medios nacionales o de alto alcance'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay periodistas que ya buscaron declaración o versión propia?',
        hint: 'Si hay periodistas esperando respuesta, el silencio se convierte en una señal en sí misma.',
        opciones: ['No', 'Hubo consultas informales', 'Sí, hay pedidos formales de declaración'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay un cierre editorial o deadline de publicación inminente?',
        hint: 'Las redacciones tienen cierres de edición. Pasado ese momento, la nota sale con o sin tu versión.',
        opciones: ['No hay presión de tiempo', 'Deadline en las próximas 24-48hs', 'El deadline es en horas'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Es probable que el tema escale a medios de mayor alcance?',
        hint: '¿Tiene los ingredientes para volverse noticia nacional? (conflicto, imagen, protagonistas conocidos, impacto social).',
        opciones: ['Poco probable', 'Posible si hay nuevos hechos', 'Alta probabilidad de escalada'],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    id: 3,
    nombre: 'Redes sociales',
    peso: 0.20,
    preguntas: [
      {
        texto: '¿El tema está circulando activamente en redes sociales?',
        hint: 'Twitter/X, Instagram, LinkedIn, TikTok, Facebook, grupos de WhatsApp con alcance público.',
        opciones: ['No está en redes', 'Circulación limitada o en grupos cerrados', 'Circulación activa y pública'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay hashtags, menciones masivas o tendencias relacionadas con el tema?',
        hint: 'La tendencia (trending) es un amplificador de crisis. Multiplica la audiencia exponencialmente.',
        opciones: ['No hay trending ni hashtags relevantes', 'Menciones crecientes pero sin tendencia', 'Hay trending o hashtags con miles de menciones'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Influencers, cuentas con gran audiencia o medios digitales amplifican el tema?',
        hint: 'Una cuenta con 100k seguidores puede tener más impacto que una nota de diario.',
        opciones: ['No hay amplificadores relevantes', 'Alguna cuenta mediana lo mencionó', 'Hay amplificadores de alto alcance involucrados'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿La narrativa dominante en redes te perjudica o deja espacio para el ataque?',
        hint: 'El silencio en redes se lee como culpa o indiferencia. Evaluá el tono de la conversación digital.',
        opciones: ['La narrativa es neutra o favorable', 'Tono mixto o ambiguo', 'La narrativa dominante es crítica o agresiva'],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    id: 4,
    nombre: 'Stakeholders',
    peso: 0.15,
    preguntas: [
      {
        texto: '¿Hay empleados, equipos internos o colaboradores afectados o desinformados?',
        hint: 'La comunicación interna mal gestionada se filtra. El equipo propio puede ser un vector de amplificación o de contención.',
        opciones: ['No hay impacto interno', 'Hay malestar o confusión interna', 'Hay afectados internos o riesgo de filtración'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay clientes, usuarios o ciudadanos directamente impactados por la situación?',
        hint: 'Cuando hay usuarios afectados, la inacción comunicacional se percibe como abandono.',
        opciones: ['No hay clientes/usuarios afectados', 'Impacto indirecto o potencial', 'Clientes o usuarios directamente afectados'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay accionistas, socios, inversores o financiadores que requieran información?',
        hint: 'Los stakeholders financieros tienen mecanismos propios de reacción (venta de acciones, retiro de fondos, declaraciones públicas).',
        opciones: ['No aplica', 'Pueden estar inquietos pero sin presión activa', 'Hay presión activa o consultas formales'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay reguladores, organismos de control, gobierno u organismos internacionales involucrados?',
        hint: 'La presencia de actores regulatorios cambia drásticamente las reglas de juego comunicacional.',
        opciones: ['No hay actores regulatorios involucrados', 'Podrían involucrarse si escala', 'Ya están involucrados o investigando'],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    id: 5,
    nombre: 'Timing y momentum',
    peso: 0.20,
    preguntas: [
      {
        texto: '¿Cuánto tiempo lleva la situación sin respuesta pública de tu parte?',
        hint: 'Las primeras horas son críticas. Cada hora sin respuesta aumenta el riesgo de que la narrativa se consolide sin tu voz.',
        opciones: ['Menos de 2 horas', 'Entre 2 y 12 horas', 'Más de 12 horas o varios días'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Existe un vacío narrativo que terceros están llenando activamente?',
        hint: 'Si otros (competidores, detractores, medios) están construyendo el relato en tu ausencia, el daño ya está ocurriendo.',
        opciones: ['No, el espacio está vacío o neutro', 'Algo de construcción narrativa ajena', 'Sí, el relato está siendo construido por terceros'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿El tema está creciendo en intensidad o empezando a desacelerarse?',
        hint: 'Un tema que baja puede revivirse con una declaración torpe. Un tema que sube requiere acción urgente.',
        opciones: ['Está bajando o estabilizándose', 'Estable pero latente', 'Está creciendo en intensidad'],
        scores: [0, 1, 2],
      },
      {
        texto: '¿Hay un evento, audiencia, reunión o hecho próximo que pueda potenciar la situación?',
        hint: 'Una reunión de directorio, una audiencia judicial, una conferencia o elección pueden convertir un tema menor en un escándalo.',
        opciones: ['No hay eventos relevantes próximos', 'Hay un evento en los próximos días', 'Hay un evento inminente (hoy o mañana)'],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    id: 6,
    nombre: 'Preparación',
    peso: null,
    preguntas: [
      {
        texto: '¿Tenés información suficiente y verificada sobre lo ocurrido?',
        hint: 'Salir a hablar sin información completa puede empeorar la situación. La verdad parcial puede ser peor que el silencio.',
        opciones: ['Sí, información completa y verificada', 'Información parcial, con puntos ciegos', 'No, la información es insuficiente o incierta'],
        scores: [2, 1, 0],
      },
      {
        texto: '¿Hay un vocero o portavoz identificado y preparado para salir?',
        hint: 'El vocero debe tener autoridad, credibilidad y estar alineado con el mensaje. La improvisación en crisis es riesgosa.',
        opciones: ['Sí, hay vocero preparado', 'Hay candidato pero sin preparación formal', 'No hay vocero definido'],
        scores: [2, 1, 0],
      },
      {
        texto: '¿Existe un mensaje claro, consistente y aprobado para comunicar?',
        hint: 'El mensaje debe ser simple, honesto y alineado con los valores. Los mensajes contradictorios en crisis destruyen credibilidad.',
        opciones: ['Sí, hay mensaje aprobado y claro', 'Hay líneas generales pero nada formal', 'No hay mensaje definido'],
        scores: [2, 1, 0],
      },
      {
        texto: '¿El entorno o canal donde aparecerías es controlable o predecible?',
        hint: 'Una conferencia de prensa abierta, un debate en vivo o una entrevista hostil son entornos de alto riesgo.',
        opciones: ['Sí, entorno controlado o neutro', 'Entorno mixto, con cierta imprevisibilidad', 'Entorno hostil o de alto riesgo'],
        scores: [2, 1, 0],
      },
    ],
  },
]

export function calcularScoreCrisis(respuestas) {
  let weightedSum = 0
  for (let s = 1; s <= 5; s++) {
    const sec = SECCIONES[s - 1]
    let raw = 0
    const max = sec.preguntas.length * 2
    sec.preguntas.forEach((p, qi) => {
      const ans = respuestas[`${s}-${qi}`]
      if (ans !== undefined) raw += p.scores[ans]
    })
    const pct = Math.round((raw / max) * 100)
    weightedSum += pct * sec.peso
  }
  return Math.round(weightedSum)
}

export function calcularScorePreparacion(respuestas) {
  const sec = SECCIONES[5]
  let raw = 0
  const max = sec.preguntas.length * 2
  sec.preguntas.forEach((p, qi) => {
    const ans = respuestas[`6-${qi}`]
    if (ans !== undefined) raw += p.scores[ans]
  })
  return Math.round((raw / max) * 100)
}

export function calcularScorePorDimension(respuestas) {
  return SECCIONES.slice(0, 5).map((sec, idx) => {
    const sIdx = idx + 1
    let raw = 0
    const max = sec.preguntas.length * 2
    sec.preguntas.forEach((p, qi) => {
      const ans = respuestas[`${sIdx}-${qi}`]
      if (ans !== undefined) raw += p.scores[ans]
    })
    return { nombre: sec.nombre, pct: Math.round((raw / max) * 100), peso: sec.peso }
  })
}

export function determinarDecision(crisisScore, prepScore) {
  if (crisisScore < 35) return 'no'
  if (crisisScore >= 35 && prepScore >= 60) return 'si'
  return 'esperar'
}

export function getVerdictoCrisis(score) {
  if (score >= 65) return { nivel: 'crisis', label: '🔴 Crisis mediática activa', titulo: 'Estás frente a una crisis', color: '#ef4444' }
  if (score >= 35) return { nivel: 'alerta', label: '🟡 Situación de alerta', titulo: 'Zona de alerta — monitoreo activo', color: '#f59e0b' }
  return { nivel: 'ok', label: '🟢 Situación bajo control', titulo: 'No es una crisis mediática', color: '#10b981' }
}

export function getAcciones(decision) {
  if (decision === 'si') {
    return [
      'Emitir declaración pública en las próximas 1-2 horas: reconocer el tema, expresar posición y anunciar próximos pasos.',
      'Briefear al vocero con los Q&A anticipados. No improvisar ninguna respuesta fuera del mensaje aprobado.',
      'Activar comunicación interna antes de la aparición pública para evitar que el equipo se entere por los medios.',
      'Designar a alguien en monitoring exclusivo de redes y medios durante las próximas 12 horas.',
      'Preparar una segunda declaración para 6-8 horas después, con actualizaciones o respuesta a nuevas preguntas.',
    ]
  }
  if (decision === 'esperar') {
    return [
      'Definir el mensaje central en los próximos 30 minutos. Un solo párrafo, validado por las personas clave.',
      'Identificar y preparar al vocero con los puntos más probables de pregunta periodística.',
      'Emitir una señal mínima de presencia ("estamos al tanto y vamos a informar") para detener el vacío narrativo.',
      'Completar el relevamiento de información: no salir hasta tener claridad sobre los puntos ciegos identificados.',
      'Establecer un horario de aparición concreto (ej: "a las 15hs") para tener un objetivo claro de preparación.',
    ]
  }
  return [
    'Mantener monitoreo de medios y redes cada 2 horas para detectar cambios de intensidad.',
    'Tener preparado un mensaje de contingencia en caso de que el tema escale inesperadamente.',
    'Evitar declaraciones que puedan amplificar un tema que hoy no tiene tracción pública.',
    'Documentar internamente los hechos y la cronología por si la situación requiere respuesta posterior.',
    'Revisar esta evaluación en 12-24 horas o ante cualquier cambio significativo en la cobertura o el tono.',
  ]
}
