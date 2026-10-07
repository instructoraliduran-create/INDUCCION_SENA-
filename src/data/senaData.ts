import { SimulationCase, QuizQuestion, RegulationQuizQuestion, SenaValue, ProductiveAlternative } from '../types/induction';

export const SENA_HISTORY = {
  founder: "Rodolfo Martínez Tono",
  foundationDate: "21 de junio de 1957",
  decree: "Decreto Ley 118 de 1957",
  originStory: "Nació de una conversación a la orilla del lago Lemán en Ginebra, Suiza, entre el economista Rodolfo Martínez Tono y el ministro del Trabajo Raimundo Emiliani Román, con el respaldo fundamental de la clase trabajadora y gremios empresariales para brindar formación técnica gratuita a los colombianos.",
  timeline: [
    {
      year: "1957",
      title: "Fundación del SENA",
      description: "Creación oficial mediante el Decreto Ley 118 de 1957 bajo la Junta Militar de Gobierno, presidida por Gabriel París Gordillo."
    },
    {
      year: "1960 - 1970",
      title: "Expansión Nacional",
      description: "Construcción de sedes en las principales ciudades de Colombia y consolidación de la formación en sectores industrial, agropecuario y comercial."
    },
    {
      year: "1990 - 2000",
      title: "Modernización y Ley 119 de 1994",
      description: "Reestructuración que define la Formación Profesional Integral (FPI) orientada a competencias laborales y desarrollo social."
    },
    {
      year: "2024 - Actualidad",
      title: "Nuevo Reglamento (Acuerdo 0009 de 2024)",
      description: "Adopción del nuevo Reglamento del Aprendiz con enfoque diferencial, territorial, sostenibilidad e instancias claras (deroga el Acuerdo 07 de 2012 y posteriores)."
    }
  ]
};

export const SENA_SYMBOLS = [
  {
    id: "escudo",
    name: "El Escudo Institucional",
    meaning: "Refleja los tres sectores económicos clave de la economía nacional que impulsan a Colombia.",
    details: [
      { element: "Piñón dentado", sector: "Sector Industrial y de la Construcción", desc: "Simboliza la fuerza productiva mecánica, la tecnología, la manufactura y la edificación." },
      { element: "Caduceo alado", sector: "Sector Comercio y Servicios", desc: "Representa el intercambio mercantil, la logística, la comunicación y los servicios financieros." },
      { element: "Rama y fruto de café", sector: "Sector Agropecuario y Primario", desc: "Evoca la fertilidad del campo colombiano, la seguridad alimentaria y la labor campesina." }
    ]
  },
  {
    id: "bandera",
    name: "La Bandera",
    meaning: "Fondo blanco puro con el escudo en verde institucional (#39A900).",
    details: [
      { element: "Fondo Blanco", sector: "Paz y Transparencia", desc: "Expresa la concordia, honestidad, tranquilidad y la transparencia en la gestión pública." },
      { element: "Verde Institucional", sector: "Esperanza y Vida", desc: "Representa el renacer, el crecimiento personal del aprendiz y la riqueza natural de Colombia." }
    ]
  },
  {
    id: "logotipo",
    name: "El Caminante (Logotipo)",
    meaning: "Diseñado en la década de los 70, representa al ser humano en constante evolución y avance.",
    details: [
      { element: "Figura humana estilizada", sector: "El Aprendiz Integral", desc: "El centro de la institución es la persona que se supera y transforma su vida y comunidad." },
      { element: "Camino proyectado hacia adelante", sector: "El Futuro", desc: "Senda del conocimiento, la disciplina y el trabajo que conduce hacia el desarrollo integral." }
    ]
  }
];

export const SENA_ANTHEM_STANZAS = [
  {
    type: "Coro",
    lines: [
      "Estudiantes del SENA adelante",
      "por Colombia luchad con amor",
      "con el ánimo noble y radiante",
      "transformémosle el mundo en mejor."
    ],
    reflection: "Llamado a la juventud y a los trabajadores a liderar la transformación positiva de la nación."
  },
  {
    type: "Estrofa I",
    lines: [
      "De la patria el futuro destino,",
      "en las manos está del trabajo,",
      "el trabajo es seguro camino,",
      "que el progreso a Colombia legó."
    ],
    reflection: "El trabajo digno y calificado es el motor indiscutible del progreso nacional."
  },
  {
    type: "Estrofa II",
    lines: [
      "En la forja del SENA se forman,",
      "hombres libres que saben triunfar,",
      "sus espaldas robustas conforman,",
      "fiel apoyo de la paz popular."
    ],
    reflection: "La educación técnica y tecnológica forma ciudadanos éticos, constructores de paz social."
  }
];

export const SENA_VALUES: SenaValue[] = [
  {
    name: "Respeto",
    description: "Reconocimiento y valoración de la dignidad de las personas y de la diversidad de ideas.",
    application: "Tratar con cortesía a instructores, compañeros y personal administrativo en todo momento."
  },
  {
    name: "Honestidad",
    description: "Actuar siempre con la verdad, rectitud y transparencia en todas las circunstancias.",
    application: "Presentar evidencias auténticas sin incurrir en plagio o suplantación en evaluaciones."
  },
  {
    name: "Compromiso",
    description: "Disposición proactiva para cumplir los objetivos formativos y metas pactadas.",
    application: "Asistir con puntualidad y participar activamente en cada sesión de aprendizaje."
  },
  {
    name: "Diligencia",
    description: "Cumplir con los deberes y tareas asignadas con prontitud, esmero y eficacia.",
    application: "Entregar evidencias dentro de los plazos establecidos en la plataforma ZAJUNA."
  },
  {
    name: "Justicia",
    description: "Actuar con equidad e imparcialidad, garantizando los derechos de todos.",
    application: "Fomentar el debido proceso y la inclusión en el ambiente de formación."
  },
  {
    name: "Solidaridad",
    description: "Ayudar y apoyar a los demás en momentos de dificultad para el bienestar colectivo.",
    application: "Apoyar a compañeros que presentan dificultades académicas mediante el trabajo colaborativo."
  }
];

// =========================================================================
// NUEVO REGLAMENTO DEL APRENDIZ SENA - ACUERDO No. 0009 DE 2024
// =========================================================================
export const ACUERDO_0009_2024 = {
  documento: {
    titulo: "Acuerdo No. 0009 de 2024",
    emisor: "Servicio Nacional de Aprendizaje (SENA) - Consejo Directivo Nacional",
    fecha_expedicion: "2024-11-05",
    descripcion: "Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.",
    firmantes: {
      presidente_consejo_directivo: "Iván Daniel Jaramillo Jassir",
      secretaria_general_e: "Katerine Grimaldos Robayo"
    }
  },
  acuerdo_articulado: [
    {
      articulo: 1,
      nombre: "Adopción del Reglamento",
      contenido: "Adoptar el Reglamento del Aprendiz SENA, aplicable a todas las personas matriculadas en los programas de formación profesional del SENA."
    },
    {
      articulo: 2,
      nombre: "Ámbito de Aplicación y Transición",
      contenido: "Aplicable a aprendices matriculados a partir de su publicación. Procesos en curso continúan bajo el reglamento vigente al momento de la matrícula."
    },
    {
      articulo: 3,
      nombre: "Vigencia y Derogatorias",
      contenido: "Rige a partir de su publicación en el Diario Oficial y deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024."
    },
    {
      articulo: 4,
      nombre: "Divulgación",
      contenido: "Ordena la publicación del Acuerdo y del Reglamento en la página web del SENA."
    }
  ],
  reglamento_aprendiz: {
    capitulo_I_definiciones: {
      articulo_1_definiciones: [
        { termino: "Formación Profesional Integral", definicion: "Proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos y humanistas." },
        { termino: "Comunidad Educativa SENA", definicion: "Aprendices, instructores, personal administrativo, directivos, familias, egresados, empresarios, entre otros." },
        { termino: "Aspirante", definicion: "Persona en proceso de ingreso para matricularse." },
        { termino: "Aprendiz", definicion: "Persona matriculada en los programas de formación profesional del SENA." },
        { termino: "Grupo", definicion: "Conjunto de aprendices matriculados en un centro, programa, jornada y ficha específica." }
      ],
      articulo_2_alcance: "Aplica para el aspirante y el aprendiz durante todo su proceso formativo y certificación en todas las modalidades y sedes.",
      articulo_3_principios_orientadores: [
        "Autonomía",
        "Dignidad",
        "Inclusión",
        "Enfoque diferencial",
        "Enfoque territorial",
        "Participación",
        "Desarrollo sostenible",
        "Solidaridad"
      ],
      articulo_4_centro_de_convivencia: "Atención complementaria que brinda alojamiento y alimentación para aprendices seleccionados."
    },
    capitulo_II_derechos_y_reconocimientos: {
      articulo_5_derechos: [
        "Recibir inducción completa",
        "Recibir formación profesional integral de calidad",
        "Ser acreditado como aprendiz",
        "Disponer de infraestructura, recursos y elementos de protección personal",
        "Gozar de los beneficios de Bienestar al Aprendiz",
        "Debido proceso en trámites académicos y disciplinarios",
        "Libertad de expresión y trato digno",
        "Postularse a representación o vocería",
        "Obtener certificación"
      ],
      articulo_6_reconocimientos: [
        { titulo: "Mención de Honor", desc: "Por rendimiento académico sobresaliente y liderazgo formativo ejemplar." },
        { titulo: "Representación Institucional", desc: "Encuentros deportivos, culturales, WorldSkills y competencias de habilidades técnicas." },
        { titulo: "Pasantías Internacionales", desc: "Selección para prácticas, misiones técnicas o eventos internacionales." },
        { titulo: "Selección como Monitor", desc: "Apoyo formativo remunerado en ambientes de aprendizaje o dependencias del centro." }
      ]
    },
    capitulo_III_deberes_y_prohibiciones: {
      articulo_8_deberes: [
        "Suscribir y cumplir el acta de compromiso institucional",
        "Conocer y acatar el presente reglamento (Acuerdo 0009 de 2024)",
        "Puntualidad y cumplimiento del cronograma formativo y entrega de evidencias",
        "Mantener actualizados los datos personales y de contacto en los sistemas del SENA",
        "Uso adecuado de instalaciones y respeto estricto a los derechos de autor",
        "Portar obligatoriamente los Elementos de Protección Personal (EPP) en talleres y laboratorios"
      ],
      articulo_9_prohibiciones: [
        "Suministrar información o documentos falsos o adulterados",
        "Suplantar o permitir la suplantación de identidad en evaluaciones o actividades",
        "Cometer plagio o fraude académico en evidencias o proyectos",
        "Ingresar, consumir o comercializar alcohol o sustancias psicoactivas",
        "Portar armas de cualquier tipo en instalaciones del SENA",
        "Dañar, sabotear o sustraer bienes, equipos o software de la institución"
      ]
    },
    capitulo_IV_tramites_y_novedades: {
      articulo_18_novedades: [
        { nombre: "Traslado", regla: "Máximo 1 vez", detalle: "Por motivos justificados a otro centro, jornada o modalidad sujeta a cupo." },
        { nombre: "Aplazamiento", regla: "Hasta por 3 meses (prorrogable)", detalle: "Suspensión temporal por motivos de fuerza mayor, salud o servicio militar." },
        { nombre: "Reintegro", regla: "Antes de vencer el aplazamiento", detalle: "Solicitud de reanudación formal radicada oportunamente ante coordinación." },
        { nombre: "Retiro Voluntario", regla: "Decisión informada del aprendiz", detalle: "Desvinculación voluntaria radicada formalmente ante el centro de formación." }
      ],
      articulo_30_desercion: {
        causales: [
          "Inasistencia injustificada durante tres (3) días continuos en actividades presenciales.",
          "Inactividad continua durante veinte (20) días en el ambiente virtual de aprendizaje (ZAJUNA).",
          "No tramitar o sustentar la novedad de aplazamiento o reintegro dentro de los plazos reglamentarios."
        ],
        procedimiento: "Notificación formal al aprendiz para presentar justificación dentro de los tres (3) días hábiles siguientes; si no comparece, se declara la deserción mediante acto motivado."
      }
    },
    capitulo_V_regimen_disciplinario: {
      articulo_41_faltas: {
        academicas: "Incumplimiento injustificado en evidencias, bajo rendimiento o plagio en actividades formativas.",
        disciplinarias: "Conductas que atentan contra la convivencia pacífica, la seguridad, la integridad física o bienes institucionales."
      },
      articulo_42_clasificacion: ["Leves", "Graves", "Gravísimas"],
      articulo_46_medidas_formativas: {
        llamado_atencion_escrito: "Hasta dos (2) por fase de formación con copia a la hoja de vida.",
        plan_mejoramiento_academico: "Término perentorio de máximo veinte (20) días para superar debilidades pedagógicas.",
        plan_mejoramiento_disciplinario: "Compromiso formativo con acciones de reparación pedagógica y convivencia."
      },
      articulo_47_medidas_sancionatorias: [
        { sancion: "Condicionamiento de Matrícula", detalle: "Pérdida temporal de incentivos y asignación de plan de mejoramiento riguroso." },
        { sancion: "Cancelación de Matrícula", detalle: "Retiro definitivo del programa e inhabilidad por seis (6) meses para matricularse en el SENA." }
      ],
      articulos_48_49_instancias: {
        comite_evaluacion: "Comité de Evaluación y Seguimiento (órgano consultivo colegiado con vocero de aprendices).",
        primera_instancia: "Subdirección del Centro de Formación (emite la resolución sancionatoria motivada).",
        segunda_instancia: "Dirección Regional del SENA (resuelve el recurso de apelación, garantizando la doble instancia constitucional)."
      }
    }
  },
  principios_orientadores: [
    { nombre: "Autonomía", desc: "Capacidad del aprendiz para gestionar su propio aprendizaje y tomar decisiones responsables." },
    { nombre: "Dignidad", desc: "Respeto irrestricto por el valor intrínseco y los derechos humanos de cada persona." },
    { nombre: "Inclusión", desc: "Acceso y permanencia equitativa sin barreras sociales, físicas ni culturales." },
    { nombre: "Enfoque diferencial", desc: "Reconocimiento y atención a la diversidad poblacional, étnica, etaria y de género." },
    { nombre: "Enfoque territorial", desc: "Adaptación pedagógica y pertinencia a las realidades y vocaciones de cada región del país." },
    { nombre: "Participación", desc: "Voz activa de los aprendices en la toma de decisiones y en la vida institucional." },
    { nombre: "Desarrollo sostenible", desc: "Compromiso con el cuidado ambiental, social y económico para las futuras generaciones." },
    { nombre: "Solidaridad", desc: "Cultura de cooperación mutua y apoyo a quienes enfrentan mayores dificultades." }
  ],
  definiciones: [
    { termino: "Formación Profesional Integral", definicion: "Proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos y humanistas." },
    { termino: "Comunidad Educativa SENA", definicion: "Aprendices, instructores, personal administrativo, directivos, familias, egresados, empresarios, entre otros." },
    { termino: "Aspirante", definicion: "Persona en proceso de ingreso para matricularse." },
    { termino: "Aprendiz", definicion: "Persona matriculada en los programas de formación profesional del SENA." },
    { termino: "Grupo", definicion: "Conjunto de aprendices matriculados en un centro, programa, jornada y ficha específica." }
  ],
  alcance: "Aplica para el aspirante y el aprendiz durante todo su proceso formativo y certificación en todas las modalidades y sedes.",
  centro_de_convivencia: "Atención complementaria que brinda alojamiento y alimentación para aprendices seleccionados.",
  derechos: [
    {
      articulo: "Art. 5",
      title: "Recibir Inducción Completa",
      description: "Conocer la identidad institucional, símbolos, valores, plataformas y el presente reglamento desde el primer día."
    },
    {
      articulo: "Art. 5",
      title: "Formación Profesional Integral de Calidad",
      description: "Recibir acompañamiento pedagógico calificado en conocimientos técnicos, tecnológicos y humanistas."
    },
    {
      articulo: "Art. 5",
      title: "Acreditación como Aprendiz",
      description: "Ser acreditado mediante el carné institucional físico o digital que valida su condición académica."
    },
    {
      articulo: "Art. 5",
      title: "Infraestructura, Recursos y EPP",
      description: "Disponer de ambientes adecuados, herramientas, conectividad y los Elementos de Protección Personal requeridos para las prácticas."
    },
    {
      articulo: "Art. 5",
      title: "Beneficios de Bienestar al Aprendiz",
      description: "Acceder a apoyos socioeconómicos, programas de salud integral, deporte, cultura, liderazgo y orientación psicosocial."
    },
    {
      articulo: "Art. 5",
      title: "Garantía del Debido Proceso",
      description: "Ser escuchado, presentar descargos, pruebas y recursos en doble instancia ante trámites académicos o disciplinarios."
    },
    {
      articulo: "Art. 5",
      title: "Libertad de Expresión y Trato Digno",
      description: "Expresar opiniones libremente en un marco de respeto mutuo y libre de cualquier discriminación o acoso."
    },
    {
      articulo: "Art. 5",
      title: "Representación y Vocería Democrática",
      description: "Postularse, elegir y ser elegido vocero de grupo, representante de jornada o vocero de poblaciones con enfoque diferencial."
    },
    {
      articulo: "Art. 5",
      title: "Certificación Oportuna",
      description: "Obtener el certificado técnico o tecnológico una vez aprobados la totalidad de los resultados de aprendizaje de las etapas lectiva y productiva."
    }
  ],
  reconocimientos: [
    { titulo: "Mención de Honor", desc: "Por rendimiento académico sobresaliente y liderazgo formativo ejemplar (Art. 6)." },
    { titulo: "Representación Institucional", desc: "Encuentros deportivos, culturales, WorldSkills y competencias de habilidades (Art. 6)." },
    { titulo: "Pasantías Internacionales", desc: "Selección para prácticas, misiones técnicas o eventos internacionales (Art. 6)." },
    { titulo: "Selección como Monitor", desc: "Apoyo formativo remunerado en ambientes de aprendizaje o dependencias del centro (Art. 6)." }
  ],
  deberes: [
    {
      articulo: "Art. 8",
      title: "Suscribir el Acta de Compromiso",
      description: "Firmar y asumir responsablemente el acta de compromiso institucional al momento de la matrícula."
    },
    {
      articulo: "Art. 8",
      title: "Conocer y Cumplir el Reglamento",
      description: "Acatar las normas del Acuerdo 0009 de 2024 y directrices vigentes de la comunidad educativa."
    },
    {
      articulo: "Art. 8",
      title: "Puntualidad y Cumplimiento del Cronograma",
      description: "Asistir puntualmente a actividades y entregar evidencias dentro de las fechas pactadas."
    },
    {
      articulo: "Art. 8",
      title: "Actualización de Datos Personales",
      description: "Mantener actualizada la información de contacto, residencia y estado de seguridad social en los sistemas."
    },
    {
      articulo: "Art. 8",
      title: "Uso Adecuado de Instalaciones y Derechos de Autor",
      description: "Cuidar la infraestructura y respetar la propiedad intelectual en todas las investigaciones y evidencias."
    },
    {
      articulo: "Art. 8",
      title: "Portar los Elementos de Protección Personal (EPP)",
      description: "Usar de forma obligatoria los EPP específicos exigidos en talleres, laboratorios y centros de formación."
    }
  ],
  prohibiciones: [
    {
      articulo: "Art. 9",
      title: "Falsedad en Información o Documentos",
      description: "Suministrar información, firmas o soportes falsos o adulterados en cualquier trámite institucional."
    },
    {
      articulo: "Art. 9",
      title: "Suplantación de Identidad",
      description: "Hacerse pasar por otra persona o permitir ser suplantado en evaluaciones, asistencias o trámites virtuales y presenciales."
    },
    {
      articulo: "Art. 9",
      title: "Fraude y Plagio Académico",
      description: "Copiar o atribuirse como propias obras, proyectos, códigos o contenidos sin la debida citación y autorización."
    },
    {
      articulo: "Art. 9",
      title: "Alcohol y Sustancias Psicoactivas",
      description: "Ingresar, consumir, distribuir o comercializar bebidas alcohólicas o sustancias prohibidas en instalaciones del SENA."
    },
    {
      articulo: "Art. 9",
      title: "Porte de Armas",
      description: "Ingresar o portar armas de fuego, traumáticas, cortopunzantes o elementos que pongan en riesgo la vida humana."
    },
    {
      articulo: "Art. 9",
      title: "Daño o Sustracción de Bienes",
      description: "Dañar intencionalmente, sabotear o hurtar herramientas, equipos, materiales o software del centro."
    }
  ],
  novedades_formacion: [
    {
      novedad: "Traslado (Art. 18)",
      limite: "Máximo 1 vez",
      descripcion: "Solicitud motivada para continuar la formación en otro centro, jornada o modalidad, sujeta a cupo y equivalencia de competencias."
    },
    {
      novedad: "Aplazamiento (Art. 18)",
      limite: "Hasta por 3 meses (prorrogable a 3 más)",
      descripcion: "Suspensión temporal justificada de la formación por motivos de fuerza mayor, salud o servicio militar obligatorio."
    },
    {
      novedad: "Reintegro (Art. 18)",
      limite: "Antes de vencer el aplazamiento",
      descripcion: "Solicitud formal de retorno a la formación radicada oportunamente tras culminar el periodo de aplazamiento concedido."
    },
    {
      novedad: "Retiro Voluntario (Art. 18)",
      limite: "Decisión del aprendiz",
      descripcion: "Desvinculación voluntaria del programa radicada formalmente ante la coordinación académica del centro."
    }
  ],
  desercion: {
    articulo: "Art. 30",
    titulo: "Causales de Deserción",
    causales: [
      "Inasistencia injustificada durante tres (3) días continuos en actividades presenciales.",
      "Inactividad continua durante veinte (20) días en el ambiente virtual de aprendizaje (ZAJUNA).",
      "No tramitar o sustentar la novedad de aplazamiento o reintegro dentro de los plazos reglamentarios."
    ],
    procedimiento: "Notificación al aprendiz para que justifique dentro de los 3 días hábiles siguientes; si no comparece o no justifica válidamente, se declara la deserción mediante acto motivado."
  },
  regimen_faltas: {
    articulo_41: "Faltas Académicas (incumplimiento en evidencias o bajo rendimiento) y Faltas Disciplinarias (conductas contrarias a la convivencia, respeto o integridad).",
    articulo_42: "Clasificación: Leves, Graves y Gravísimas según el daño causado, reiteración, dolo o culpa manifiesta."
  },
  medidas_formativas: {
    academicas: [
      { medida: "Llamado de atención escrito (Art. 46)", detalle: "Hasta dos (2) llamados por fase de formación suscritos por el instructor con copia a la hoja de vida." },
      { medida: "Plan de mejoramiento académico (Art. 46)", detalle: "Acuerdo pedagógico con actividades y cronograma de máximo veinte (20) días para superar debilidades." }
    ],
    disciplinarias: [
      { medida: "Llamado de atención escrito (Art. 46)", detalle: "Notificación formal reflexiva por conducta inapropiada menor." },
      { medida: "Plan de mejoramiento disciplinario (Art. 46)", detalle: "Compromiso formativo con acciones de reparación pedagógica y convivencia pacífica." }
    ]
  },
  medidas_sancionatorias: [
    {
      sancion: "Condicionamiento de Matrícula (Art. 47)",
      efecto: "Pérdida temporal de incentivos institucionales y asignación de un plan de mejoramiento estricto.",
      origen: "Impuesto por el Subdirector de Centro ante faltas graves o reiterativas."
    },
    {
      sancion: "Cancelación de Matrícula (Art. 47)",
      efecto: "Retiro definitivo del programa de formación e inhabilidad por seis (6) meses para volver a matricularse en programas de formación laboral o tecnológica.",
      origen: "Sanción máxima aplicada ante faltas gravísimas o incumplimiento de condicionamientos."
    }
  ],
  equipos_e_instancias: {
    equipos_evaluadores: [
      { nombre: "Equipo Ejecutor del Grupo (Art. 48)", funcion: "Instructores que orientan el programa; realizan seguimiento continuo y aplican llamados de atención y planes de mejoramiento." },
      { nombre: "Comité de Evaluación y Seguimiento (Art. 48)", funcion: "Órgano consultivo colegiado con vocero de aprendices; analiza descargos y emite recomendaciones al Subdirector." }
    ],
    instancias_decisorias: {
      primera_instancia: "Subdirección del Centro de Formación Profesional Integral (emite la resolución sancionatoria motivada).",
      segunda_instancia: "Dirección Regional del SENA (resuelve el recurso de apelación, garantizando la doble instancia constitucional)."
    }
  }
};

// Backward compatible export for any generic views
export const REGULATION_CATEGORIES = {
  rights: ACUERDO_0009_2024.derechos,
  duties: ACUERDO_0009_2024.deberes,
  prohibitions: ACUERDO_0009_2024.prohibiciones,
  infractions: [
    {
      type: "Faltas Académicas (Art. 41)",
      description: "Incumplimiento injustificado en evidencias, bajo rendimiento o plagio en actividades."
    },
    {
      type: "Faltas Disciplinarias (Art. 41)",
      description: "Comportamientos que atentan contra la convivencia, la seguridad, bienes o el respeto mutuo."
    }
  ],
  measures: [
    {
      measure: "Llamado de Atención Escrito (Art. 46)",
      desc: "Hasta dos (2) llamados por fase formativa ante faltas académicas o disciplinarias leves."
    },
    {
      measure: "Plan de Mejoramiento (Art. 46)",
      desc: "Actividades de recuperación académica con término perentorio de máximo veinte (20) días."
    },
    {
      measure: "Condicionamiento de Matrícula (Art. 47)",
      desc: "Pérdida de incentivos institucionales y plan estricto firmado ante el Subdirector de Centro."
    },
    {
      measure: "Cancelación de Matrícula (Art. 47)",
      desc: "Pérdida del carácter de aprendiz y sanción de 6 meses para volver a matricularse en el SENA."
    }
  ]
};

export const PRODUCTIVE_ALTERNATIVES: ProductiveAlternative[] = [
  {
    id: "contrato",
    title: "1. Contrato de Aprendizaje",
    description: "Vinculación formativa con una empresa patrocinadora bajo la Ley 789 de 2002. La empresa provee apoyo de sostenimiento y afiliación a seguridad social.",
    requirements: [
      "Estar en estado 'Disponible' en el sistema SGVA (Caprendizaje)",
      "Aprobación del 100% de la etapa lectiva",
      "No haber tenido previamente contrato de aprendizaje en el mismo nivel formativo"
    ],
    keyBenefit: "Apoyo mensual del 75% al 100% del SMLMV + cobertura en EPS y ARL",
    supportType: "Empresarial Formal"
  },
  {
    id: "vinculo_laboral",
    title: "2. Vinculación Laboral o Contractual",
    description: "Para aprendices que ya laboran en una empresa en funciones directamente relacionadas con su programa de formación.",
    requirements: [
      "Contrato de trabajo vigente a término fijo o indefinido",
      "Certificación laboral que detalle funciones coincidentes con las competencias del programa",
      "Concertación de plan de trabajo y bitácoras quincenales"
    ],
    keyBenefit: "Homologación de su jornada laboral como cumplimiento de la etapa productiva",
    supportType: "Salario Legal Empresa"
  },
  {
    id: "proyecto_productivo",
    title: "3. Proyecto Productivo (Fondo Emprender)",
    description: "Desarrollo y puesta en marcha de un plan de negocio innovador o solución tecnológica orientada a la creación de empresa.",
    requirements: [
      "Propuesta de negocio formulada y aprobada por la Unidad de Emprendimiento",
      "Participación en semilleros SENNOVA o convocatorias Fondo Emprender",
      "Acompañamiento de gestor de emprendimiento asignado"
    ],
    keyBenefit: "Creación de tu propia empresa y opción de capital semilla condonable",
    supportType: "Emprendimiento Propio"
  },
  {
    id: "pasantia",
    title: "4. Pasantía (Pyme, ONG o Sector Público)",
    description: "Práctica concertada en una entidad pública, ONG, fundación o PYME para aplicar conocimientos técnicos específicos.",
    requirements: [
      "Convenio interinstitucional previo firmado entre el SENA y la entidad receptora",
      "Plan concertado de actividades aprobado por el instructor de seguimiento",
      "Afiliación a ARL cubierta por la entidad receptora o el SENA"
    ],
    keyBenefit: "Impacto social directo en comunidades o sectores estratégicos",
    supportType: "Acuerdo Institucional"
  },
  {
    id: "monitoria",
    title: "5. Monitoría en el SENA",
    description: "Apoyo técnico y pedagógico calificado en los ambientes de aprendizaje, laboratorios o dependencias del centro de formación.",
    requirements: [
      "Haber culminado con excelencia la etapa lectiva",
      "Presentarse a convocatoria pública de monitorías del Centro de Formación",
      "Cumplir con el puntaje y prueba de selección"
    ],
    keyBenefit: "Experiencia institucional directa y estímulo económico mensual",
    supportType: "Institucional SENA"
  },
  {
    id: "unidad_familiar",
    title: "6. Unidad Productiva Familiar",
    description: "Aplicación y mejora de procesos técnicos en un negocio o microempresa de propiedad del núcleo familiar del aprendiz.",
    requirements: [
      "Constancia de propiedad o registro mercantil de la unidad productiva familiar",
      "Plan de mejoramiento con entregables técnicos medibles",
      "Supervisión periódica del instructor asignado"
    ],
    keyBenefit: "Modernización y escalamiento del negocio familiar con rigor técnico",
    supportType: "Economía Familiar"
  }
];

export const WELLBEING_DIMENSIONS = [
  {
    title: "Salud Integral y Prevención",
    description: "Jornadas de salud visual, oral, vacunación, tamizaje, hábitos de vida saludable y atención en primeros auxilios en enfermería del centro.",
    iconName: "HeartPulse"
  },
  {
    title: "Deporte y Recreación",
    description: "Torneos intercentros e internos (fútbol, voleibol, baloncesto, ajedrez), actividad física musicalizada y pausas activas.",
    iconName: "Trophy"
  },
  {
    title: "Arte y Cultura",
    description: "Talleres y grupos representativos de danza folclórica, música, teatro, artes plásticas y festivales de talento SENA.",
    iconName: "Palette"
  },
  {
    title: "Liderazgo y Habilidades Blandas",
    description: "Escuelas de líderes, vocería de aprendices, representación democrática, trabajo en equipo y resolución pacífica de conflictos.",
    iconName: "Compass"
  },
  {
    title: "Apoyos Socioeconómicos",
    description: "Convocatorias semestrales de Apoyo de Sostenimiento regular, Fondo FIC (sector construcción), bono de alimentación y transporte.",
    iconName: "HandCoins"
  },
  {
    title: "Acompañamiento Psicosocial",
    description: "Orientación profesional individual y grupal para manejo del estrés, proyecto de vida y fortalecimiento emocional.",
    iconName: "Users"
  }
];

export const DIGITAL_ECOSYSTEM = [
  {
    name: "ZAJUNA (LMS SENA)",
    tagline: "Ambiente Virtual de Aprendizaje Oficial",
    description: "Plataforma educativa para acceder a guías de aprendizaje, foros de discusión, envío de evidencias, cuestionarios y seguimiento de calificaciones.",
    badge: "Plataforma de Formación"
  },
  {
    name: "SENA SOFIA Plus",
    tagline: "Sistema Optimizado para la Formación Integral",
    description: "Portal de gestión académica institucional: inscripción a programas, consulta de hoja de vida, generación de certificados oficiales y registro de matrícula.",
    badge: "Gestión Académica"
  },
  {
    name: "Agencia Pública de Empleo (APE)",
    tagline: "Intermediación Laboral Gratuita y Pública",
    description: "Conecta a los aprendices y egresados con ofertas de empleo reales en todo el territorio nacional e internacional, sin intermediarios.",
    badge: "Empleabilidad"
  },
  {
    name: "SENNOVA",
    tagline: "Investigación, Desarrollo e Innovación",
    description: "Sistema de investigación aplicada con semilleros, tecnoacademias y tecnoparques donde los aprendices materializan prototipos e inventos.",
    badge: "Innovación Tecnológica"
  }
];

export const SIMULATION_CASES: SimulationCase[] = [
  {
    id: "caso-1",
    title: "Caso 1: El Carné Olvidado y el Ingreso al Centro",
    context: "Llegas a la portería del Centro de Formación a las 7:00 a.m. para una evaluación práctica crucial. Te das cuenta de que olvidaste tu carné institucional en casa.",
    dilemma: "¿Cuál es la conducta institucional y reglamentaria adecuada que debes tomar?",
    options: [
      {
        id: "opt-1a",
        text: "Pedirle prestado el carné a un compañero de otra ficha para ingresar discretamente sin ser detectado.",
        isCorrect: false,
        explanation: "Suplantar a otra persona o permitir suplantaciones constituye una Prohibición expresa (Art. 9) y Falta Disciplinaria Gravísima tipificada en el Acuerdo 0009 de 2024.",
        articleReference: "Acuerdo 0009 de 2024, Art. 9 (Prohibiciones - Suplantación de Identidad)",
        points: 0
      },
      {
        id: "opt-1b",
        text: "Acercarte a la coordinación o portería, presentar tu documento de identidad (cédula o tarjeta) y solicitar un pase provisional de ingreso mientras notificas a tu instructor.",
        isCorrect: true,
        explanation: "¡Correcto! La transparencia y el debido proceso garantizan la seguridad de la comunidad SENA según los Deberes del Aprendiz (Art. 8).",
        articleReference: "Acuerdo 0009 de 2024, Art. 8 (Deberes) y Principio de Dignidad (Art. 3)",
        points: 25
      },
      {
        id: "opt-1c",
        text: "Saltar la reja lateral o ingresar por el parqueadero evitando la revisión de los vigilantes.",
        isCorrect: false,
        explanation: "El ingreso no autorizado por sitios no habilitados viola las normas básicas de seguridad institucional y es considerado una falta disciplinaria grave.",
        articleReference: "Acuerdo 0009 de 2024, Art. 8 y 41 (Faltas Disciplinarias)",
        points: 0
      }
    ]
  },
  {
    id: "caso-2",
    title: "Caso 2: Inasistencia por Emergencia Médica y Prevención de Deserción",
    context: "Sufriste un problema de salud repentino que te impidió asistir a clase durante 3 días hábiles consecutivos. Tienes la incapacidad médica emitida por tu EPS.",
    dilemma: "¿Qué procedimiento debes seguir según el Acuerdo 0009 de 2024 para evitar una deserción?",
    options: [
      {
        id: "opt-2a",
        text: "Regresar a la semana siguiente y asumir que el instructor comprenderá verbalmente sin necesidad de radicar ningún soporte.",
        isCorrect: false,
        explanation: "La inasistencia injustificada durante 3 días continuos presenciales (o 20 días continuos en ZAJUNA) activa la causal de deserción según el Artículo 30.",
        articleReference: "Acuerdo 0009 de 2024, Art. 30 (Causales de Deserción)",
        points: 0
      },
      {
        id: "opt-2b",
        text: "Radicar y enviar la incapacidad médica oficial por correo institucional o ZAJUNA a tu instructor y coordinación dentro de los 3 días hábiles siguientes al hecho.",
        isCorrect: true,
        explanation: "¡Excelente! El aprendiz dispone de hasta 3 días hábiles para justificar debidamente y evitar la declaratoria de deserción del Artículo 30.",
        articleReference: "Acuerdo 0009 de 2024, Art. 30 (Procedimiento de Justificación de Inasistencias)",
        points: 25
      },
      {
        id: "opt-2c",
        text: "Pedirle a un compañero que firme la lista de asistencia por ti los 3 días para que no figuren inasistencias.",
        isCorrect: false,
        explanation: "Firmar por otra persona o suministrar información falsa es una falta gravísima prohibida en el Art. 9, causal de cancelación de matrícula.",
        articleReference: "Acuerdo 0009 de 2024, Art. 9 y 47 (Cancelación de Matrícula)",
        points: 0
      }
    ]
  },
  {
    id: "caso-3",
    title: "Caso 3: Trabajo en Equipo y Citación de Fuentes (Plagio)",
    context: "Tu equipo debe entregar la evidencia final de un proyecto. Uno de los integrantes sugiere copiar textualmente un proyecto anterior encontrado en internet sin citar al autor para ahorrar tiempo.",
    dilemma: "¿Cuál debe ser tu postura como aprendiz SENA bajo el nuevo reglamento?",
    options: [
      {
        id: "opt-3a",
        text: "Aceptar la propuesta si nadie se da cuenta, pues lo importante es obtener la calificación 'Aprobado'.",
        isCorrect: false,
        explanation: "El plagio viola los deberes de respeto a derechos de autor (Art. 8) y está catalogado como prohibición expresa (Art. 9) y falta académica grave.",
        articleReference: "Acuerdo 0009 de 2024, Art. 8 y Art. 9 (Prohibición de Plagio)",
        points: 0
      },
      {
        id: "opt-3b",
        text: "Explicar al equipo que el plagio es una falta académica grave, investigar adecuadamente y referenciar todas las fuentes según normas técnicas y de derechos de autor.",
        isCorrect: true,
        explanation: "¡Impecable! La Formación Profesional Integral promueve la ética, la producción intelectual propia y el respeto estricto a los derechos de autor (Art. 8).",
        articleReference: "Acuerdo 0009 de 2024, Art. 8 y Principio de Autonomía (Art. 3)",
        points: 25
      },
      {
        id: "opt-3c",
        text: "Retirarte del grupo sin decir nada y no entregar la evidencia.",
        isCorrect: false,
        explanation: "Abandonar el equipo sin concertación no resuelve el dilema y perjudica tu propio proceso formativo y el de tus compañeros.",
        articleReference: "Acuerdo 0009 de 2024, Trabajo Colaborativo en la FPI",
        points: 0
      }
    ]
  },
  {
    id: "caso-4",
    title: "Caso 4: Elección de Modalidad de Etapa Productiva y Novedades",
    context: "Estás a un mes de finalizar la etapa lectiva. Necesitas pausar temporalmente tu formación por 2 meses debido a una calamidad doméstica comprobada antes de iniciar la etapa productiva.",
    dilemma: "¿Qué novedad reglamentaria debes solicitar formalmente?",
    options: [
      {
        id: "opt-4a",
        text: "Dejar de asistir sin avisar y volver cuando se solucione la situación sin radicar ningún documento.",
        isCorrect: false,
        explanation: "Dejar de asistir activa la causal de deserción (Art. 30) y pérdida del cupo formativo en el SENA.",
        articleReference: "Acuerdo 0009 de 2024, Art. 30",
        points: 0
      },
      {
        id: "opt-4b",
        text: "Radicar una solicitud formal de Aplazamiento (Art. 18), que permite suspender justificadamente la formación hasta por 3 meses (prorrogable por otros 3 meses).",
        isCorrect: true,
        explanation: "¡Totalmente acertado! El Artículo 18 contempla el Aplazamiento justificado hasta por 3 meses prorrogables a 3 más, permitiendo un posterior Reintegro sin perder tu cupo.",
        articleReference: "Acuerdo 0009 de 2024, Art. 18 (Novedades - Aplazamiento y Reintegro)",
        points: 25
      },
      {
        id: "opt-4c",
        text: "Pedir un traslado indefinido para otra ciudad sin cumplir los requisitos de equivalencia.",
        isCorrect: false,
        explanation: "El traslado (Art. 18) solo puede solicitarse máximo una (1) vez y requiere disponibilidad de cupo y equivalencia de competencias.",
        articleReference: "Acuerdo 0009 de 2024, Art. 18 (Novedad de Traslado)",
        points: 0
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿En qué año y bajo qué decreto ley fue fundado el Servicio Nacional de Aprendizaje (SENA)?",
    options: [
      "1957, mediante el Decreto Ley 118",
      "1964, mediante la Ley 100",
      "1994, mediante la Ley 119",
      "1970, mediante el Decreto 410"
    ],
    correctAnswer: 0,
    explanation: "El SENA fue fundado el 21 de junio de 1957 mediante el Decreto Ley 118 por iniciativa de Rodolfo Martínez Tono.",
    category: "identidad"
  },
  {
    id: 2,
    question: "¿Cuál es la norma actual que adopta el Reglamento del Aprendiz SENA vigente y deroga los Acuerdos anteriores (como el 07 de 2012)?",
    options: [
      "Acuerdo No. 0009 de 2024 (5 de noviembre de 2024)",
      "Acuerdo 07 de 2012",
      "Ley 100 de 1993",
      "Decreto 2420 de 2015"
    ],
    correctAnswer: 0,
    explanation: "El Consejo Directivo Nacional adoptó el Acuerdo No. 0009 de 2024 (del 5 de noviembre de 2024), derogando en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.",
    category: "reglamento"
  },
  {
    id: 3,
    question: "¿Qué sectores de la economía representan los elementos del escudo del SENA?",
    options: [
      "Educación, Salud y Deporte",
      "Industria (piñón), Agropecuario (café) y Comercio y Servicios (caduceo)",
      "Tecnología, Minería y Turismo",
      "Aeronáutica, Banca y Transporte"
    ],
    correctAnswer: 1,
    explanation: "El piñón representa la industria, el fruto de café el sector agropecuario y el caduceo el sector comercio y servicios.",
    category: "identidad"
  },
  {
    id: 4,
    question: "¿Qué simboliza el logotipo del 'Caminante' del SENA?",
    options: [
      "Una persona caminando hacia el paradero de transporte",
      "Al ser humano que supera obstáculos y avanza con paso firme hacia su autorrealización y futuro",
      "Un atleta de alta competencia en pista atlética",
      "Una brújula para no perderse en el centro de formación"
    ],
    correctAnswer: 1,
    explanation: "El logotipo proyecta al aprendiz sobre el sendero del conocimiento y el progreso hacia su desarrollo integral.",
    category: "identidad"
  },
  {
    id: 5,
    question: "Según el Artículo 30 del Acuerdo 0009 de 2024, ¿cuáles son causales para declarar la deserción de un aprendiz?",
    options: [
      "Llegar 5 minutos tarde a una clase",
      "Inasistencia injustificada por 3 días continuos presenciales o inactividad continua por 20 días en el ambiente virtual (ZAJUNA)",
      "No asistir a una jornada deportiva voluntaria de fin de semana",
      "Perder una sola evaluación escrita en todo el trimestre"
    ],
    correctAnswer: 1,
    explanation: "El Artículo 30 del Acuerdo 0009 de 2024 estipula como causales de deserción: 3 días continuos injustificados en actividades presenciales o 20 días continuos de inactividad virtual en ZAJUNA.",
    category: "reglamento"
  },
  {
    id: 6,
    question: "¿Cuántos llamados de atención escritos pueden aplicarse por fase de formación como medida formativa académica antes de un plan de mejoramiento (Art. 46)?",
    options: [
      "Hasta diez (10) llamados",
      "Hasta dos (2) llamados de atención escritos por fase",
      "Ninguno, se cancela la matrícula inmediatamente",
      "Cinco (5) llamados por semana"
    ],
    correctAnswer: 1,
    explanation: "El Artículo 46 del Acuerdo 0009 de 2024 establece que ante faltas académicas se aplicará llamado de atención escrito (hasta 2 por fase) y plan de mejoramiento de máximo 20 días.",
    category: "reglamento"
  },
  {
    id: 7,
    question: "Si a un aprendiz se le sanciona con la 'Cancelación de Matrícula' (Art. 47 del Acuerdo 0009 de 2024), ¿por cuánto tiempo queda inhabilitado para volver a matricularse?",
    options: [
      "De por vida sin posibilidad de retorno",
      "Por un periodo de seis (6) meses",
      "Por solo 3 días calendario",
      "Por 5 años continuos"
    ],
    correctAnswer: 1,
    explanation: "El Artículo 47 señala que la Cancelación de Matrícula implica el retiro del programa e inhabilidad de seis (6) meses para volver a matricularse en programas de formación laboral o tecnológica.",
    category: "reglamento"
  },
  {
    id: 8,
    question: "¿Cuáles son las dos instancias decisorias en el debido proceso disciplinario del SENA (Art. 49)?",
    options: [
      "Primera instancia: Subdirección de Centro; Segunda instancia: Dirección Regional",
      "Primera instancia: El celador; Segunda instancia: El personero municipal",
      "Primera instancia: El representante de curso; Segunda instancia: El rector de colegio",
      "Primera instancia: La policía nacional; Segunda instancia: El ministerio del trabajo"
    ],
    correctAnswer: 0,
    explanation: "El Artículo 49 consagra la doble instancia: Primera instancia ante la Subdirección del Centro y Segunda instancia ante la Dirección Regional del SENA.",
    category: "reglamento"
  },
  {
    id: 9,
    question: "¿Por cuánto tiempo máximo puede solicitar un aprendiz el 'Aplazamiento' justificado de su formación (Art. 18)?",
    options: [
      "Hasta por 3 meses, prorrogables por 3 meses más (máximo 6 meses en total)",
      "Por 5 años consecutivos",
      "Solo por 48 horas",
      "Por 10 años"
    ],
    correctAnswer: 0,
    explanation: "El Artículo 18 del Acuerdo 0009 de 2024 establece que el aplazamiento procede hasta por 3 meses, prorrogable justificadamente por 3 meses adicionales.",
    category: "reglamento"
  },
  {
    id: 10,
    question: "¿Cuáles son principios orientadores fundamentales del Reglamento del Aprendiz (Art. 3 del Acuerdo 0009 de 2024)?",
    options: [
      "Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial y Solidaridad",
      "Rivalidad, Competitividad extrema y Exclusión",
      "Lucro individual y confidencialidad comercial estricta",
      "Imposición unilateral sin derecho a descargos"
    ],
    correctAnswer: 0,
    explanation: "El Artículo 3 consagra como principios: Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad.",
    category: "reglamento"
  }
];

export const SENA_REGIONALES = [
  "Regional Distrito Capital",
  "Regional Antioquia",
  "Regional Valle del Cauca",
  "Regional Santander",
  "Regional Atlántico",
  "Regional Bolívar",
  "Regional Cundinamarca",
  "Regional Caldas",
  "Regional Risaralda",
  "Regional Quindío",
  "Regional Boyacá",
  "Regional Tolima",
  "Regional Huila",
  "Regional Nariño",
  "Regional Cauca",
  "Regional Norte de Santander",
  "Regional Cesar",
  "Regional Córdoba",
  "Regional Magdalena",
  "Regional Meta",
  "Regional Casanare",
  "Regional Sucre",
  "Regional La Guajira",
  "Regional Chocó",
  "Regional Caquetá",
  "Regional Putumayo",
  "Regional Arauca",
  "Regional San Andrés y Providencia",
  "Regional Amazonas",
  "Regional Guaviare",
  "Regional Guainía",
  "Regional Vaupés",
  "Regional Vichada"
];

// =========================================================================
// BANCO OFICIAL DE 25 PREGUNTAS DEL REGLAMENTO DEL APRENDIZ
// ACUERDO No. 0009 DE 2024 (5 PREGUNTAS POR CADA SECCIÓN)
// =========================================================================
export const REGULATION_QUIZ_QUESTIONS: RegulationQuizQuestion[] = [
  // -----------------------------------------------------------------------
  // SECCIÓN 1: CAPÍTULO I - PRINCIPIOS, DEFINICIONES Y ALCANCE (Art. 1 - 4)
  // -----------------------------------------------------------------------
  {
    id: 1,
    sectionKey: 'cap1_definiciones',
    sectionTitle: 'Capítulo I: Principios, Definiciones y Alcance',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 1 (Definiciones)',
    question: '¿Cómo define el Artículo 1 del Acuerdo 0009 de 2024 la "Formación Profesional Integral (FPI)" del SENA?',
    options: [
      'Proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos y actitudes humanistas para la convivencia',
      'Un entrenamiento mecánico temporal enfocado exclusivamente en labores fabriles sin dimensión social',
      'Un curso virtual express sin acompañamiento pedagógico ni prácticas presenciales',
      'Un periodo de pasantía laboral no remunerado ni supervisado académicamente'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Excelente apropiación! La FPI concibe al aprendiz como un ser integral, fusionando conocimientos técnicos con valores cívicos y éticos.',
    errorDiagnosis: 'Atención: En el SENA la formación no es un mero adiestramiento instrumental. El Art. 1 define la FPI como un proceso educativo integral con profundo sentido humanista.',
    officialRule: 'Art. 1: La Formación Profesional Integral es un proceso educativo teórico-práctico integral orientado al desarrollo de conocimientos técnicos, tecnológicos y actitudes y valores para la convivencia pacífica.'
  },
  {
    id: 2,
    sectionKey: 'cap1_definiciones',
    sectionTitle: 'Capítulo I: Principios, Definiciones y Alcance',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 2 (Ámbito de Aplicación y Alcance)',
    question: 'Según el Artículo 2, ¿a quiénes y en qué modalidades aplica obligatoriamente el Reglamento del Aprendiz SENA?',
    options: [
      'Aplica a toda persona matriculada (aspirantes y aprendices) en todas las sedes, centros y modalidades formativas (presencial, virtual y a distancia)',
      'Aplica únicamente a los aprendices matriculados en jornadas nocturnas de centros urbanos',
      'Aplica exclusivamente cuando el aprendiz firma su contrato de aprendizaje en empresa',
      'Aplica solo a estudiantes que pagan cursos en instituciones terciarias privadas'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Correcto! El reglamento ampara y rige desde la condición de aspirante hasta la certificación final en todas las sedes y modalidades del país.',
    errorDiagnosis: 'Identificación del error: Limitaste el alcance. El Artículo 2 ampara por igual tanto a aspirantes como a aprendices en modalidades presenciales, virtuales y combinadas.',
    officialRule: 'Art. 2: El presente reglamento aplica para el aspirante y el aprendiz durante todo su proceso formativo y certificación en todas las modalidades, jornadas y sedes del SENA.'
  },
  {
    id: 3,
    sectionKey: 'cap1_definiciones',
    sectionTitle: 'Capítulo I: Principios, Definiciones y Alcance',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 3 (Principios Orientadores)',
    question: '¿Cuál de los siguientes grupos reúne principios orientadores fundamentales consagrados en el Artículo 3 del Acuerdo 0009 de 2024?',
    options: [
      'Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad',
      'Jerarquización rígida, Aislamiento regional, Lucro financiero y Secreto corporativo',
      'Sanción punitiva inmediata, Deserción forzosa y Exclusión por origen geográfico',
      'Competencia desleal entre aprendices y Restricción a la libertad de expresión'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Brillante! Estos 8 principios garantizan equidad social, respeto por la dignidad humana y pertinencia con las vocaciones territoriales de Colombia.',
    errorDiagnosis: 'Punto de confusión: Elegiste prácticas contrarias al espíritu del SENA. Los principios orientadores (Art. 3) son humanistas: dignidad, autonomía, inclusión, enfoque diferencial y solidaridad.',
    officialRule: 'Art. 3: Principios como Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad fundamentan la convivencia formativa.'
  },
  {
    id: 4,
    sectionKey: 'cap1_definiciones',
    sectionTitle: 'Capítulo I: Principios, Definiciones y Alcance',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 4 (Centro de Convivencia)',
    question: '¿Qué es y qué propósito cumple un "Centro de Convivencia" en el SENA de acuerdo con el Artículo 4?',
    options: [
      'Espacio de atención complementaria de bienestar que brinda alojamiento y alimentación para aprendices seleccionados por lejanía o condición socioeconómica',
      'Un centro correccional para recluir a aprendices sancionados disciplinariamente',
      'Una instalación hotelera comercial abierta a turistas particulares',
      'Un salón de actos reservado exclusivamente para directores del orden nacional'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Muy bien! Los Centros de Convivencia son un servicio solidario del SENA para asegurar la permanencia de aprendices campesinos y de regiones apartadas.',
    errorDiagnosis: 'Ojo al concepto: El Centro de Convivencia no es un espacio punitivo ni comercial; es un beneficio asistencial de alojamiento y alimentación para aprendices vulnerables (Art. 4).',
    officialRule: 'Art. 4: El Centro de Convivencia es un servicio de bienestar que proporciona residencia y alimentación a aprendices focalizados para favorecer su permanencia.'
  },
  {
    id: 5,
    sectionKey: 'cap1_definiciones',
    sectionTitle: 'Capítulo I: Principios, Definiciones y Alcance',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 3 (Vigencia y Derogatorias del Acuerdo General)',
    question: '¿Qué norma rige actualmente como Reglamento del Aprendiz SENA y qué acuerdos históricos derogó expresamente?',
    options: [
      'Acuerdo No. 0009 de 2024, el cual derogó en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024',
      'Acuerdo 07 de 2012, el cual sigue plenamente vigente sin ninguna modificación',
      'Decreto 410 de 1971 (Código de Comercio colombiano)',
      'Circular 001 de 2010 de archivo y biblioteca'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Impecable! Conocer el marco legal vigente evita basar decisiones en normas derogadas como el antiguo Acuerdo 07 de 2012.',
    errorDiagnosis: 'Ten presente que el Acuerdo 07 de 2012 fue totalmente derogado por el Consejo Directivo Nacional mediante el Acuerdo No. 0009 de 2024, expedido el 5 de noviembre de 2024.',
    officialRule: 'Acuerdo 0009 de 2024: Adopta el nuevo Reglamento y deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.'
  },

  // -----------------------------------------------------------------------
  // SECCIÓN 2: CAPÍTULO II - DERECHOS Y RECONOCIMIENTOS (Art. 5 - 7)
  // -----------------------------------------------------------------------
  {
    id: 6,
    sectionKey: 'cap2_derechos',
    sectionTitle: 'Capítulo II: Derechos y Reconocimientos',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 5 (Derechos del Aprendiz)',
    question: 'Según el Artículo 5, ¿cuál de los siguientes es un derecho fundamental del aprendiz SENA desde su ingreso?',
    options: [
      'Recibir inducción integral, ser carnetizado/acreditado, recibir formación de calidad y disponer de elementos de protección personal (EPP)',
      'Exigir que se le aprueben las evidencias sin necesidad de presentar los resultados de aprendizaje',
      'Cobrar comisiones de dinero a sus compañeros para gestionar permisos con instructores',
      'Suspender las clases del grupo a voluntad propia cuando haya lluvia'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Totalmente acertado! La inducción completa, el carné y los EPP son derechos inalienables para un ambiente formativo seguro y digno.',
    errorDiagnosis: 'Confundiste un derecho con una extralimitación. El Art. 5 garantiza formación de calidad, inducción, carné institucional, recursos de aprendizaje y EPP.',
    officialRule: 'Art. 5: Son derechos del aprendiz recibir inducción completa, formación profesional integral de calidad, ser acreditado y gozar de ambientes seguros con EPP.'
  },
  {
    id: 7,
    sectionKey: 'cap2_derechos',
    sectionTitle: 'Capítulo II: Derechos y Reconocimientos',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 5, Numeral 6 (Debido Proceso)',
    question: '¿Cómo se materializa el derecho constitucional al "Debido Proceso" para el aprendiz en el SENA (Art. 5)?',
    options: [
      'Con presunción de inocencia, derecho a ser notificado, ser escuchado en descargos, presentar pruebas y apelar decisiones ante una segunda instancia',
      'Mediante sanciones automáticas aplicadas verbalmente por el celador sin registro escrito',
      'Imponiendo condicionamientos de matrícula de forma secreta sin avisar al aprendiz',
      'Cancelando la matrícula inmediatamente ante cualquier queja anónima'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Exacto! El debido proceso garantiza justicia, derecho de contradicción y doble instancia ante la Dirección Regional.',
    errorDiagnosis: 'Identificación del error: En el SENA ninguna sanción puede aplicarse a puerta cerrada o de sorpresa. El debido proceso (Art. 5 y 49) exige descargos y pruebas.',
    officialRule: 'Art. 5, Numeral 6: Garantía plena del debido proceso en trámites académicos y disciplinarios, asegurando defensa, contradicción y doble instancia.'
  },
  {
    id: 8,
    sectionKey: 'cap2_derechos',
    sectionTitle: 'Capítulo II: Derechos y Reconocimientos',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 6 (Reconocimientos e Incentivos)',
    question: '¿Cuáles de los siguientes son reconocimientos oficiales otorgados por el SENA a aprendices con rendimiento sobresaliente (Art. 6)?',
    options: [
      'Mención de honor, selección para monitorías remuneradas y postulación a eventos o pasantías internacionales (como WorldSkills)',
      'Exención de por vida de pago de impuestos distritales o peajes nacionales',
      'Nombramiento directo como subdirector de centro de formación sin carrera administrativa',
      'Aprobación automática de títulos universitarios sin cursarlos'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Excelente! El SENA exalta el talento con menciones de honor, monitorías y competencias mundiales de habilidades como WorldSkills.',
    errorDiagnosis: 'Cuidado con opciones irreales: Los reconocimientos reglamentarios (Art. 6) son pedagógicos y meritocráticos: Mención de Honor, monitorías y representación institucional.',
    officialRule: 'Art. 6: Se otorgarán reconocimientos como Mención de Honor por desempeño sobresaliente, designación como monitor y representación en eventos internacionales.'
  },
  {
    id: 9,
    sectionKey: 'cap2_derechos',
    sectionTitle: 'Capítulo II: Derechos y Reconocimientos',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 6, Numeral 4 (Monitorías)',
    question: '¿En qué consiste el incentivo de "Monitoría" para un aprendiz SENA según el Artículo 6?',
    options: [
      'Apoyo formativo y técnico calificado en ambientes de aprendizaje o dependencias del centro, con asignación de un estímulo económico institucional',
      'Realizar labores de vigilancia armada y control de acceso en la portería del centro',
      'Sustituir de forma definitiva al instructor de planta y evaluar notas finales',
      'Hacer tareas de aseo general en la cafetería del centro'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Muy bien! Las monitorías son una gran oportunidad para desarrollar habilidades de liderazgo pedagógico y obtener experiencia formal certificada.',
    errorDiagnosis: 'Punto de confusión: El monitor no reemplaza funciones de empleados administrativos ni de instructores; brinda apoyo técnico y pedagógico en ambientes de aprendizaje (Art. 6).',
    officialRule: 'Art. 6: Las monitorías son estímulos formativos otorgados por mérito para apoyar ambientes de aprendizaje o dependencias con auxilio económico.'
  },
  {
    id: 10,
    sectionKey: 'cap2_derechos',
    sectionTitle: 'Capítulo II: Derechos y Reconocimientos',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 7 (Representatividad y Vocería)',
    question: '¿Cuál es la función del Vocero de Grupo y del Representante de Aprendices en el centro de formación (Art. 7)?',
    options: [
      'Canalizar democráticamente las propuestas e inquietudes de sus pares y participar con voz y voto en comités y escenarios institucionales',
      'Imponer castigos y multas en dinero a los compañeros que no lleven uniforme',
      'Decidir unilateralmente qué instructores son contratados o despedidos',
      'Monopolizar la información y actuar como juez disciplinario del grupo'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Brillante! La vocería es el pilar de la democracia y participación activa de los aprendices en los comités del SENA.',
    errorDiagnosis: 'Identificación del error: Los voceros no tienen facultades punitivas ni administrativas; son líderes elegidos democráticamente para representar las necesidades del grupo (Art. 7).',
    officialRule: 'Art. 7: La representatividad se ejerce democráticamente mediante voceros y representantes elegidos por los aprendices para la interlocución institucional.'
  },

  // -----------------------------------------------------------------------
  // SECCIÓN 3: CAPÍTULO III - DEBERES Y PROHIBICIONES (Art. 8 - 9)
  // -----------------------------------------------------------------------
  {
    id: 11,
    sectionKey: 'cap3_deberes',
    sectionTitle: 'Capítulo III: Deberes y Prohibiciones',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 8 (Deberes del Aprendiz)',
    question: 'Según el Artículo 8, ¿cuál es uno de los deberes esenciales que adquiere el aprendiz al matricularse en el SENA?',
    options: [
      'Suscribir el acta de compromiso institucional, conocer y cumplir el reglamento y asistir con puntualidad al cronograma formativo',
      'Comprar obligatoriamente acciones o bonos comerciales del centro de formación',
      'Renunciar de por vida a los derechos de autor de sus creaciones personales',
      'Pagar cuotas mensuales obligatorias para el mantenimiento de computadores'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Correcto! El acta de compromiso y la puntualidad son el cimiento de la disciplina y el éxito profesional en el SENA.',
    errorDiagnosis: 'La formación en el SENA es 100% gratuita. El deber esencial al ingresar es suscribir el acta de compromiso y cumplir rigurosamente el reglamento y cronogramas (Art. 8).',
    officialRule: 'Art. 8: Son deberes del aprendiz suscribir el acta de compromiso, conocer y cumplir las normas del SENA y asistir con puntualidad al proceso formativo.'
  },
  {
    id: 12,
    sectionKey: 'cap3_deberes',
    sectionTitle: 'Capítulo III: Deberes y Prohibiciones',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 8, Numeral 6 (Elementos de Protección Personal)',
    question: '¿Qué dispone el Artículo 8 respecto a los Elementos de Protección Personal (EPP) en talleres y laboratorios?',
    options: [
      'Es deber obligatorio portar y utilizar los EPP reglamentarios de su especialidad para salvaguardar la vida y la seguridad ocupacional',
      'Es opcional y solo debe usarse si el aprendiz no tiene ropa cómoda disponible',
      'Solo se exige a los instructores, los aprendices pueden ingresar en sandalias',
      'Se pueden prestar o sustituir por prendas de moda que no cumplan normas de seguridad'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Excelente! La cultura de la seguridad y el autocuidado industrial con EPP previene accidentes graves en los talleres.',
    errorDiagnosis: 'Punto de confusión: En ambientes técnicos los EPP nunca son opcionales. Portarlos adecuadamente es un deber estricto e inderogable de seguridad (Art. 8).',
    officialRule: 'Art. 8: Portar y usar obligatoriamente los elementos de protección personal (EPP) exigidos en los ambientes de formación técnica y tecnológica.'
  },
  {
    id: 13,
    sectionKey: 'cap3_deberes',
    sectionTitle: 'Capítulo III: Deberes y Prohibiciones',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 9 (Prohibición de Plagio y Fraude)',
    question: '¿Por qué cometer plagio, fraude académico o suplantación en evaluaciones constituye una prohibición taxativa (Art. 9)?',
    options: [
      'Porque atenta gravemente contra la ética formativa, los derechos de autor y constituye falta sancionable que vicia la competencia real adquirida',
      'Solo está prohibido si el texto copiado tiene más de mil palabras exactas',
      'Está permitido si se copia de blogs públicos de internet sin citar fuentes',
      'Solo se sanciona si el autor de la obra original radica una demanda penal'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Exacto! El fraude y el plagio desvirtúan el proceso educativo. El SENA fomenta la autoría original y la ética profesional.',
    errorDiagnosis: 'Identificación del error: El plagio nunca está permitido, sin importar la cantidad copiada. Copiar sin citar o suplantar en pruebas es una prohibición expresa sancionable (Art. 9).',
    officialRule: 'Art. 9: Se prohíbe cometer plagio en evidencias, actividades o proyectos, así como suplantar o permitir la suplantación en trámites o evaluaciones.'
  },
  {
    id: 14,
    sectionKey: 'cap3_deberes',
    sectionTitle: 'Capítulo III: Deberes y Prohibiciones',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 9 (Sustancias y Armas)',
    question: '¿Qué estipula el Artículo 9 acerca del consumo de alcohol, sustancias psicoactivas y porte de armas en el SENA?',
    options: [
      'Constituye prohibición expresa ingresar bajo sus efectos, comercializarlos o portar cualquier tipo de armas u objetos cortopunzantes en las sedes',
      'Se permite el consumo moderado si es un viernes en la tarde fuera de clase',
      'Se permite portar armas si el aprendiz manifiesta tener permiso verbal de un familiar',
      'Solo se prohíbe el alcohol si el aprendiz es menor de 16 años'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Muy bien! Los centros del SENA son territorios de paz, seguridad y convivencia pacífica protegidos para toda la comunidad.',
    errorDiagnosis: 'Ojo a la gravedad: El porte de armas o el ingreso/consumo de alcohol y sustancias psicoactivas está terminantemente prohibido sin excepciones (Art. 9).',
    officialRule: 'Art. 9: Queda terminantemente prohibido ingresar, comercializar o consumir alcohol o sustancias psicoactivas, así como portar armas de cualquier índole.'
  },
  {
    id: 15,
    sectionKey: 'cap3_deberes',
    sectionTitle: 'Capítulo III: Deberes y Prohibiciones',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 8 (Actualización de Datos)',
    question: '¿Por qué mantener los datos personales actualizados en SOFIA Plus y Zajuna es un deber fundamental del aprendiz (Art. 8)?',
    options: [
      'Para garantizar la cobertura legal de la ARL (riesgos laborales), recibir notificaciones formales de ley y emitir diplomas verídicos',
      'Para que el centro le envíe ofertas comerciales publicitarias de tarjetas de crédito',
      'Para que cualquier persona en internet pueda ver el número de teléfono del aprendiz',
      'Es un trámite sin ninguna validez legal que se puede omitir voluntariamente'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Correcto! Un correo o teléfono desactualizado puede impedir tu cobertura ante un accidente o dejar en firme una sanción por falta de notificación.',
    errorDiagnosis: 'Cuidado: Actualizar datos no es un capricho administrativo; asegura tu cobertura de riesgos laborales (ARL) y garantías de notificación en debido proceso (Art. 8).',
    officialRule: 'Art. 8: Es deber del aprendiz mantener permanentemente actualizados sus datos personales y de contacto en los sistemas de información institucionales.'
  },

  // -----------------------------------------------------------------------
  // SECCIÓN 4: CAPÍTULO IV - TRÁMITES ACADÉMICOS, NOVEDADES Y DESERCIÓN (Art. 18 - 30)
  // -----------------------------------------------------------------------
  {
    id: 16,
    sectionKey: 'cap4_tramites',
    sectionTitle: 'Capítulo IV: Trámites Académicos, Novedades y Etapas',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 18 (Novedad de Aplazamiento)',
    question: 'Según el Artículo 18, ¿por cuánto tiempo máximo puede un aprendiz solicitar el "Aplazamiento" justificado de su programa?',
    options: [
      'Hasta por tres (3) meses, prorrogables justificadamente por tres (3) meses adicionales (máximo 6 meses en total)',
      'Por un periodo de cinco (5) años sin necesidad de justificar causas',
      'Solo por 24 horas y no admite ninguna prórroga',
      'Hasta que el aprendiz cumpla 35 años de edad'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Excelente! El aplazamiento formal protege tus competencias aprobadas y te permite reintegrarte legalmente sin perder tu cupo.',
    errorDiagnosis: 'Confundiste el tiempo reglamentario. El Art. 18 estipula que el aplazamiento se concede hasta por 3 meses, prorrogables a 3 más (máximo 6 meses totales).',
    officialRule: 'Art. 18: El aplazamiento de la formación procede hasta por 3 meses, prorrogable justificadamente por un periodo igual por causas de fuerza mayor o salud.'
  },
  {
    id: 17,
    sectionKey: 'cap4_tramites',
    sectionTitle: 'Capítulo IV: Trámites Académicos, Novedades y Etapas',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 18 (Novedad de Traslado)',
    question: '¿Cuántas veces durante la totalidad de su programa formativo puede un aprendiz solicitar un "Traslado" (Art. 18)?',
    options: [
      'Máximo una (1) sola vez durante todo el programa de formación, previa justificación y sujeta a disponibilidad de cupo en la sede destino',
      'Tantas veces como desee, hasta 10 veces al año',
      'Tres veces en etapa lectiva y cinco veces en productiva',
      'El traslado está prohibido y nunca puede solicitarse en el SENA'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Acertado! La limitación a 1 traslado protege la coherencia curricular y la estabilidad organizativa de las fichas de formación.',
    errorDiagnosis: 'Atención a la regla: El traslado no es ilimitado. El Artículo 18 restringe el traslado a máximo una (1) vez en todo el programa, siempre que exista cupo disponible.',
    officialRule: 'Art. 18: El traslado de centro, jornada o modalidad se podrá solicitar y conceder por una (1) única vez a lo largo del programa formativo.'
  },
  {
    id: 18,
    sectionKey: 'cap4_tramites',
    sectionTitle: 'Capítulo IV: Trámites Académicos, Novedades y Etapas',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 30 (Causales de Deserción)',
    question: 'De acuerdo con el Artículo 30, ¿cuáles son los tiempos de inasistencia o inactividad que configuran causal de Deserción?',
    options: [
      'Inasistencia injustificada durante tres (3) días continuos en presencial, o inactividad continua por veinte (20) días en el LMS virtual (ZAJUNA)',
      'Llegar 10 minutos tarde a una sesión de taller',
      'No asistir un día sábado a una actividad de recreación voluntaria',
      'Inasistencia acumulada de 6 meses continuos'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Muy bien! Recordar estos tiempos (3 días presenciales o 20 días en virtualidad) te alerta para radicar excusas médicas a tiempo.',
    errorDiagnosis: 'Ojo con los plazos perentorios: 3 días continuos presenciales o 20 días de inactividad virtual sin justificación activan el proceso de deserción (Art. 30).',
    officialRule: 'Art. 30: Se configura deserción por inasistencia injustificada por 3 días continuos presenciales o inactividad por 20 días continuos en ambientes virtuales.'
  },
  {
    id: 19,
    sectionKey: 'cap4_tramites',
    sectionTitle: 'Capítulo IV: Trámites Académicos, Novedades y Etapas',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 18 (Retiro Voluntario vs. Aplazamiento)',
    question: '¿Cuál es la diferencia jurídica fundamental entre un "Retiro Voluntario" y un "Aplazamiento" (Art. 18)?',
    options: [
      'El aplazamiento reserva temporalmente el cupo para reintegrarse; el retiro voluntario desvincula de forma definitiva al aprendiz del programa',
      'El retiro voluntario implica una sanción penal de cárcel; el aplazamiento no',
      'Son idénticos y tienen los mismos efectos legales en la ficha',
      'El aplazamiento obliga a pagar una multa en dinero al centro de formación'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Exacto! Si tienes una dificultad temporal de trabajo o salud, solicita siempre Aplazamiento para no perder los resultados aprobados.',
    errorDiagnosis: 'Punto de confusión: El retiro voluntario da por terminada tu matrícula de manera definitiva. Si requieres pausar con derecho a retornar, el trámite es Aplazamiento (Art. 18).',
    officialRule: 'Art. 18: El retiro voluntario cancela definitivamente el vínculo formativo; el aplazamiento suspende temporalmente reservando el derecho a reintegro.'
  },
  {
    id: 20,
    sectionKey: 'cap4_tramites',
    sectionTitle: 'Capítulo IV: Trámites Académicos, Novedades y Etapas',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 26 (Alternativas de Etapa Productiva)',
    question: '¿Cuáles de las siguientes opciones corresponden a alternativas válidas para cumplir la "Etapa Productiva" en el SENA (Art. 26)?',
    options: [
      'Contrato de aprendizaje, vínculo laboral, proyecto productivo institucional, monitorías SENA y pasantías',
      'Trabajo informal sin convenio ni plan de concertación de actividades',
      'Pagar una prima en dinero a una empresa para que certifique horas sin asistir',
      'Asistir como oyente a clases teóricas de primer trimestre'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Brillante! El SENA ofrece un amplio abanico de modalidades productivas para que cada aprendiz aplique sus competencias en el sector real.',
    errorDiagnosis: 'La etapa productiva exige rigor técnico y seguimiento de un instructor. Solo son válidas las alternativas reguladas (contrato, proyecto, pasantía, vínculo, monitoría) (Art. 26).',
    officialRule: 'Art. 26: Son alternativas de etapa productiva: Contrato de aprendizaje, vínculo laboral, proyecto productivo, monitoría y pasantía institucional.'
  },

  // -----------------------------------------------------------------------
  // SECCIÓN 5: CAPÍTULO V - FALTAS, MEDIDAS FORMATIVAS, SANCIONES Y DEBIDO PROCESO (Art. 41 - 49)
  // -----------------------------------------------------------------------
  {
    id: 21,
    sectionKey: 'cap5_disciplinario',
    sectionTitle: 'Capítulo V: Faltas, Sanciones y Debido Proceso',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 41 y 42 (Tipificación y Calificación de Faltas)',
    question: 'Según los Artículos 41 y 42, ¿cómo se tipifican por su naturaleza y cómo se gradúan por su gravedad las faltas en el SENA?',
    options: [
      'Por su naturaleza son Académicas o Disciplinarias; y por su gravedad se califican como Leves, Graves o Gravísimas',
      'Por su naturaleza son Penales o Civiles; y se califican con multas de dinero',
      'Todas las faltas son consideradas automáticamente gravísimas sin excepción',
      'Se tipifican únicamente según el estado de ánimo de los compañeros de curso'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Totalmente acertado! Las faltas académicas se ligan a las evidencias del aprendizaje, mientras las disciplinarias a la convivencia y bienes del centro.',
    errorDiagnosis: 'Cuidado con la clasificación: Las faltas en el SENA son académicas o disciplinarias, y se gradúan técnicamente en leves, graves o gravísimas (Art. 41 y 42).',
    officialRule: 'Art. 41 y 42: Las faltas pueden ser de carácter académico o disciplinario, y se califican como leves, graves o gravísimas atendiendo a criterios objetivos.'
  },
  {
    id: 22,
    sectionKey: 'cap5_disciplinario',
    sectionTitle: 'Capítulo V: Faltas, Sanciones y Debido Proceso',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 46 (Medidas Formativas Preventivas)',
    question: 'De acuerdo con el Artículo 46, ¿cuáles son las medidas formativas y pedagógicas previas a la imposición de una sanción formal?',
    options: [
      'Llamado de atención escrito (hasta 2 por fase formativa) y Plan de Mejoramiento Académico o Disciplinario de máximo veinte (20) días',
      'Expulsión sumaria sin derecho a entregar trabajos pendientes',
      'Labores forzadas de limpieza nocturna sin supervisión pedagógica',
      'Retención de los documentos originales de identidad del aprendiz'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Excelente! El ADN del SENA es formativo: antes de sancionar, busca guiar y nivelar pedagógicamente al aprendiz para que logre sus competencias.',
    errorDiagnosis: 'Punto de confusión: El reglamento privilegia la pedagogía preventiva: llamados de atención escritos (hasta 2 por fase) y planes de mejoramiento de máximo 20 días (Art. 46).',
    officialRule: 'Art. 46: Medidas formativas: Llamado de atención escrito (máx. 2 por fase) y Plan de Mejoramiento con término perentorio de hasta 20 días para subsanar debilidades.'
  },
  {
    id: 23,
    sectionKey: 'cap5_disciplinario',
    sectionTitle: 'Capítulo V: Faltas, Sanciones y Debido Proceso',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 47 (Medidas Sancionatorias)',
    question: 'Según el Artículo 47, ¿cuáles son las dos medidas sancionatorias formales aplicables cuando no se superan las medidas formativas o ante faltas graves?',
    options: [
      'Condicionamiento de Matrícula (con pérdida temporal de incentivos) y Cancelación de Matrícula (con inhabilidad de seis meses)',
      'Multa económica del 10% del salario mínimo legal vigente',
      'Pérdida de la libreta militar o de la ciudadanía civil',
      'Prohibición perpetua y vitalicia de estudiar en cualquier entidad de Colombia'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Correcto! Solo el Subdirector de Centro, mediante resolución motivada y tras debido proceso, puede dictar estas medidas formales.',
    errorDiagnosis: 'Identificación del error: En el SENA no existen sanciones monetarias ni castigos perpetuos. Las sanciones son condicionamiento o cancelación con 6 meses de inhabilidad (Art. 47).',
    officialRule: 'Art. 47: Medidas sancionatorias: Condicionamiento de matrícula y Cancelación de matrícula con inhabilidad de seis (6) meses para matricularse en el SENA.'
  },
  {
    id: 24,
    sectionKey: 'cap5_disciplinario',
    sectionTitle: 'Capítulo V: Faltas, Sanciones y Debido Proceso',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 48 (Comité de Evaluación y Seguimiento)',
    question: '¿Qué naturaleza y función tiene el "Comité de Evaluación y Seguimiento" en el proceso disciplinario del SENA (Art. 48)?',
    options: [
      'Órgano colegiado consultivo e investigador que analiza pruebas, escucha descargos y emite un concepto motivado de recomendación al Subdirector',
      'Un tribunal penal militar con facultades de encarcelamiento',
      'Un grupo anónimo que sanciona sin levantar actas ni deliberar',
      'Una asociación privada de egresados ajena a la institución'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Muy bien! El comité reúne a instructores, coordinación, bienestar y al vocero de aprendices para garantizar un juicio técnico y neutral.',
    errorDiagnosis: 'Recuerda que el Comité no dicta la sanción final; es un cuerpo asesor que investiga, escucha al aprendiz y recomienda medidas fundamentadas al Subdirector (Art. 48).',
    officialRule: 'Art. 48: El Comité de Evaluación y Seguimiento analiza los casos, valora las evidencias, recibe los descargos y emite recomendación motivada.'
  },
  {
    id: 25,
    sectionKey: 'cap5_disciplinario',
    sectionTitle: 'Capítulo V: Faltas, Sanciones y Debido Proceso',
    articleReference: 'Acuerdo No. 0009 de 2024, Art. 49 (Garantía de Doble Instancia)',
    question: 'Ante la resolución emitida por el Subdirector de Centro (Primera Instancia), ¿ante qué autoridad se interpone el recurso de apelación (Segunda Instancia) según el Artículo 49?',
    options: [
      'Ante la Dirección Regional del SENA, garantizando plenamente la doble instancia constitucional',
      'Ante el celador o personal de seguridad privada del centro',
      'Ante la empresa donde el aprendiz realiza sus prácticas',
      'La decisión es irrevocable y no existe derecho a apelar ante nadie'
    ],
    correctAnswer: 0,
    positiveReinforcement: '¡Magistral! La doble instancia es el cierre del debido proceso: permite que la máxima autoridad regional del SENA revise la juridicidad del acto.',
    errorDiagnosis: 'Ojo con tus derechos: Jamás una resolución es inapelable. La primera instancia es la Subdirección del Centro y la apelación se desata ante la Dirección Regional (Art. 49).',
    officialRule: 'Art. 49: El recurso de apelación procede ante la Dirección Regional del SENA, en cumplimiento de la garantía constitucional de la doble instancia.'
  }
];
