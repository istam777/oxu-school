import { eventMediaBySlug, getMediaOrFallback, newsMediaBySlug, teacherMediaByName } from "../data/contentMedia";

const categoryTranslations = {
  Campus: { uz: "Kampus", en: "Campus", ru: "Кампус" },
  Academics: { uz: "Akademik yo'nalish", en: "Academics", ru: "Академическое направление" },
  "Student Life": { uz: "O'quvchi hayoti", en: "Student Life", ru: "Жизнь учеников" },
  Achievements: { uz: "Yutuqlar", en: "Achievements", ru: "Достижения" },
  Admissions: { uz: "Qabul", en: "Admissions", ru: "Поступление" },
  Arts: { uz: "San'at", en: "Arts", ru: "Искусство" },
  Community: { uz: "Hamjamiyat", en: "Community", ru: "Сообщество" },
  Sports: { uz: "Sport", en: "Sports", ru: "Спорт" },
  Classroom: { uz: "Sinf hayoti", en: "Classroom", ru: "Учебный процесс" },
  Trips: { uz: "Safarlar", en: "Trips", ru: "Поездки" },
  Support: { uz: "Qo'llab-quvvatlash", en: "Support", ru: "Поддержка" },
  Communication: { uz: "Muloqot", en: "Communication", ru: "Коммуникация" },
};

const newsTranslations = {
  "steam-laboratoriya-ishga-tushdi": {
    title: {
      uz: "OSIYO maktabida yangi STEAM laboratoriyasi ishga tushdi",
      en: "A New STEAM Laboratory Opens at OSIYO",
      ru: "В школе OSIYO открылась новая STEAM-лаборатория",
    },
    summary: {
      uz: "Yangi laboratoriya robototexnika, dizayn fikrlash va tajriba asosidagi darslar uchun mo'ljallangan.",
      en: "The new lab is designed for robotics, design thinking, and hands-on learning.",
      ru: "Новая лаборатория предназначена для робототехники, дизайн-мышления и практических занятий.",
    },
    content: {
      uz: "Yangi STEAM laboratoriyasi o'quvchilarga fizika, texnologiya, muhandislik va san'atni uyg'unlashtirgan amaliy tajribalarni taqdim etadi. Laboratoriya zamonaviy qurilmalar, mini-fabrikatsiya zonasi va jamoaviy loyiha maydoniga ega.",
      en: "The new STEAM lab gives students practical experiences that connect physics, technology, engineering, and the arts. It includes modern equipment, a mini fabrication zone, and a collaborative project studio.",
      ru: "Новая STEAM-лаборатория дает ученикам практический опыт на стыке физики, технологий, инженерии и искусства. Пространство оснащено современным оборудованием, мини-зоной прототипирования и площадкой для командных проектов.",
    },
  },
  "xalqaro-debat-turniri": {
    title: {
      uz: "Ingliz tili haftaligi doirasida xalqaro debat turniri bo'lib o'tdi",
      en: "International Debate Tournament Held During English Week",
      ru: "В рамках недели английского языка прошел международный дебатный турнир",
    },
    summary: {
      uz: "Yuqori bosqich o'quvchilari muloqot, dalillash va yetakchilik ko'nikmalarini namoyish etdi.",
      en: "Upper school students demonstrated communication, argumentation, and leadership skills.",
      ru: "Ученики старших классов продемонстрировали навыки коммуникации, аргументации и лидерства.",
    },
    content: {
      uz: "Debat haftaligi davomida o'quvchilar dolzarb xalqaro mavzular yuzasidan jamoalar tarkibida chiqish qildi, xalqaro hakamlar bilan fikr almashdi va akademik nutq ko'nikmalarini mustahkamladi.",
      en: "During debate week, students presented global issues in teams, exchanged ideas with international judges, and strengthened their academic speaking skills.",
      ru: "Во время дебатной недели ученики выступали в командах по глобальным темам, общались с международными судьями и укрепляли навыки академической речи.",
    },
  },
  "kitobxonlik-marafoni": {
    title: {
      uz: "Boshlang'ich sinflarda kitobxonlik marafoni boshlandi",
      en: "Reading Marathon Begins in the Primary Grades",
      ru: "В начальных классах стартовал марафон чтения",
    },
    summary: {
      uz: "Ota-onalar va ustozlar ishtirokida bolalarda mutolaa madaniyatini rivojlantirishga qaratilgan loyiha yo'lga qo'yildi.",
      en: "A new project involving parents and teachers is helping children build a stronger reading culture.",
      ru: "Запущен проект с участием родителей и учителей, направленный на развитие культуры чтения у детей.",
    },
    content: {
      uz: "Marafon davomida har hafta tavsiya etilgan kitoblar bo'yicha uchrashuvlar, sahna ko'rinishlari va oilaviy kitob tanlovi o'tkaziladi.",
      en: "Throughout the marathon, students take part in weekly book discussions, staged readings, and family reading challenges.",
      ru: "В рамках марафона проходят еженедельные встречи по книгам, театрализованные чтения и семейные читательские конкурсы.",
    },
  },
  "matematika-olimpiadasi-golib": {
    title: {
      uz: "OSIYO jamoasi matematika olimpiadasida viloyat bosqichida g'olib bo'ldi",
      en: "OSIYO Team Wins the Regional Round of the Math Olympiad",
      ru: "Команда OSIYO победила на областном этапе математической олимпиады",
    },
    summary: {
      uz: "Maktab o'quvchilari kuchli natija qayd etib, respublika bosqichiga yo'llanma oldi.",
      en: "Students delivered outstanding results and secured a place in the national round.",
      ru: "Ученики показали сильные результаты и получили путевку на республиканский этап.",
    },
    content: {
      uz: "Olimpiadada qatnashgan o'quvchilar mantiqiy masalalar, algebra va geometriya bo'limlarida yuqori natijalarni qo'lga kiritdi. Ustozlar jamoasi bu natijani tizimli akademik tayyorgarlik samarasiga bog'lamoqda.",
      en: "Students achieved high scores in logic, algebra, and geometry. The teaching team credits the result to disciplined and consistent academic preparation.",
      ru: "Участники олимпиады показали высокие результаты по логике, алгебре и геометрии. Команда преподавателей связывает этот успех с системной академической подготовкой.",
    },
  },
};

const eventTranslations = {
  "open-house-day": {
    title: {
      uz: "Ochiq eshiklar kuni",
      en: "Open House Day",
      ru: "День открытых дверей",
    },
    summary: {
      uz: "Ota-onalar va mehmonlar uchun maktab bo'ylab tanishtiruv kuni.",
      en: "An introduction day for families and guests to explore the school.",
      ru: "Знакомительный день для родителей и гостей школы.",
    },
    description: {
      uz: "Ochiq eshiklar kuni doirasida kampus bo'ylab tanishtiruv, namunaviy darslar, rahbariyat bilan uchrashuv va qabul bo'yicha maslahatlar tashkil etiladi.",
      en: "The event includes a campus tour, demo lessons, a leadership meeting, and admissions consultations.",
      ru: "В программу входят экскурсия по кампусу, демонстрационные уроки, встреча с руководством и консультации по поступлению.",
    },
    location: {
      uz: "OSIYO asosiy kampusi",
      en: "OSIYO Main Campus",
      ru: "Главный кампус OSIYO",
    },
  },
  "spring-arts-festival": {
    title: {
      uz: "Bahorgi san'at festivali",
      en: "Spring Arts Festival",
      ru: "Весенний фестиваль искусств",
    },
    summary: {
      uz: "Musiqa, teatr va tasviriy san'at bo'yicha o'quvchilar ijodiy chiqishlari.",
      en: "Student performances in music, theatre, and visual arts.",
      ru: "Творческие выступления учеников по музыке, театру и изобразительному искусству.",
    },
    description: {
      uz: "Festival sahna ko'rinishlari, orkestr chiqishi, galereya ko'rgazmasi va ota-onalar uchun mehmon zonasi bilan boyitiladi.",
      en: "The festival features stage productions, an orchestra performance, a gallery exhibition, and a parent lounge.",
      ru: "Фестиваль включает сценические постановки, выступление оркестра, выставку галереи и зону для родителей.",
    },
    location: {
      uz: "Katta majlis zali",
      en: "Grand Hall",
      ru: "Большой зал",
    },
  },
  "stem-innovation-challenge": {
    title: {
      uz: "STEM innovatsiyalar tanlovi",
      en: "STEM Innovation Challenge",
      ru: "STEM Innovation Challenge",
    },
    summary: {
      uz: "O'rta va yuqori bosqich o'quvchilari jamoaviy loyihalar himoyasi bilan qatnashadi.",
      en: "Middle and high school students present collaborative innovation projects.",
      ru: "Ученики средней и старшей школы представляют командные инновационные проекты.",
    },
    description: {
      uz: "O'quvchilar real hayot muammolariga texnologik va ijtimoiy yechimlar taklif qilib, ekspertlar oldida taqdimot qiladi.",
      en: "Students propose technological and social solutions to real-world challenges and present them to an expert panel.",
      ru: "Ученики предлагают технологические и социальные решения реальных проблем и защищают их перед экспертным жюри.",
    },
    location: {
      uz: "STEAM laboratoriyasi",
      en: "STEAM Lab",
      ru: "STEAM-лаборатория",
    },
  },
  "parent-partnership-forum": {
    title: {
      uz: "Ota-onalar hamkorlik forumi",
      en: "Parent Partnership Forum",
      ru: "Форум партнерства с родителями",
    },
    summary: {
      uz: "Ota-onalar bilan ta'lim sifati, farzand rivoji va muloqot bo'yicha uchrashuv.",
      en: "A forum with parents focused on learning quality, student growth, and communication.",
      ru: "Встреча с родителями, посвященная качеству обучения, развитию ребенка и коммуникации.",
    },
    description: {
      uz: "Forum maktab va oila hamkorligini kuchaytirish, baholash tizimi hamda o'quvchi farovonligi bo'yicha ochiq muloqot maydonidir.",
      en: "The forum creates open dialogue around school-family partnership, assessment, and student wellbeing.",
      ru: "Форум создает открытую площадку для диалога о партнерстве школы и семьи, системе оценивания и благополучии учеников.",
    },
    location: {
      uz: "Konferensiya xonasi",
      en: "Conference Room",
      ru: "Конференц-зал",
    },
  },
};

const teacherTranslations = {
  "Dilafruz Qodirova": {
    role: {
      uz: "Direktor",
      en: "Principal",
      ru: "Директор",
    },
    bio: {
      uz: "20 yildan ortiq ta'lim boshqaruvi tajribasiga ega, xalqaro maktablar rivoji bo'yicha ekspert.",
      en: "An education leader with more than 20 years of experience and deep expertise in international school development.",
      ru: "Эксперт по развитию международных школ с более чем 20-летним опытом в управлении образованием.",
    },
  },
  "James Walker": {
    role: {
      uz: "Akademik direktor",
      en: "Academic Director",
      ru: "Академический директор",
    },
    bio: {
      uz: "Aniq fanlar va izlanishga asoslangan ta'lim yo'nalishidagi xalqaro dasturlarga rahbarlik qiladi.",
      en: "Leads international programs focused on STEM and inquiry-based learning.",
      ru: "Руководит международными программами в области STEM и inquiry-based learning.",
    },
  },
  "Saida Ergasheva": {
    role: {
      uz: "Boshlang'ich ta'lim rahbari",
      en: "Head of Primary Education",
      ru: "Руководитель начального образования",
    },
    bio: {
      uz: "Boshlang'ich bosqichda differensial ta'lim va ijtimoiy-emotsional yondashuvlarni olib boradi.",
      en: "Supports the primary phase through differentiated instruction and social-emotional learning practices.",
      ru: "Развивает начальное образование через дифференцированный подход и социально-эмоциональное обучение.",
    },
  },
  "Anton Petrovskiy": {
    role: {
      uz: "Matematika o'qituvchisi",
      en: "Mathematics Teacher",
      ru: "Преподаватель математики",
    },
    bio: {
      uz: "Olimpiada tayyorgarligi va analitik tafakkur ko'nikmalarini rivojlantirishga ixtisoslashgan.",
      en: "Specializes in olympiad preparation and the development of analytical thinking.",
      ru: "Специализируется на подготовке к олимпиадам и развитии аналитического мышления.",
    },
  },
  "Malika Tursunova": {
    role: {
      uz: "Ingliz tili bo'limi yetakchisi",
      en: "Head of English Department",
      ru: "Руководитель отдела английского языка",
    },
    bio: {
      uz: "IELTS, akademik yozuv va xalqaro muloqot dasturlarini yuritadi.",
      en: "Leads IELTS, academic writing, and global communication pathways.",
      ru: "Курирует программы IELTS, academic writing и global communication.",
    },
  },
  "Otabek Rasulov": {
    role: {
      uz: "Psixolog va o'quvchilarni qo'llab-quvvatlash koordinatori",
      en: "Psychologist and Student Support Coordinator",
      ru: "Психолог и координатор поддержки учеников",
    },
    bio: {
      uz: "O'quvchilar farovonligi, moslashuvi va motivatsiyasi bo'yicha individual dasturlar olib boradi.",
      en: "Designs individualized wellbeing, adjustment, and motivation support for students.",
      ru: "Ведет индивидуальные программы по благополучию, адаптации и мотивации учеников.",
    },
  },
};

const faqTranslations = {
  1: {
    question: {
      uz: "Maktabda ta'lim qaysi tillarda olib boriladi?",
      en: "Which languages are used in the school program?",
      ru: "На каких языках ведется обучение в школе?",
    },
    answer: {
      uz: "Ta'lim dasturi o'zbek, ingliz va rus tillarini qo'llab-quvvatlaydi. Asosiy akademik yo'nalishlarda ingliz tili integratsiyasi kuchli olib boriladi.",
      en: "The program supports Uzbek, English, and Russian. English integration is especially strong across the main academic pathways.",
      ru: "Программа поддерживает узбекский, английский и русский языки. В основных академических направлениях особенно сильна интеграция английского языка.",
    },
  },
  2: {
    question: {
      uz: "Qabul jarayoni necha bosqichdan iborat?",
      en: "How many stages are included in the admissions process?",
      ru: "Сколько этапов включает процесс поступления?",
    },
    answer: {
      uz: "Ariza topshirish, dastlabki suhbat, diagnostik baholash va yakuniy qaror bosqichlari mavjud.",
      en: "It includes application submission, an initial meeting, diagnostic assessment, and the final decision stage.",
      ru: "Он включает подачу заявки, первичную встречу, диагностическую оценку и этап итогового решения.",
    },
  },
  3: {
    question: {
      uz: "Transport xizmati mavjudmi?",
      en: "Is transportation service available?",
      ru: "Предоставляется ли транспорт?",
    },
    answer: {
      uz: "Ha, ayrim hududlar bo'yicha xavfsiz va kuzatuvli transport xizmati yo'lga qo'yilgan.",
      en: "Yes, safe and monitored transportation is available for selected areas.",
      ru: "Да, для некоторых районов организован безопасный транспорт с системой контроля.",
    },
  },
  4: {
    question: {
      uz: "To'garaklar va sport mashg'ulotlari qaysi kunlari bo'ladi?",
      en: "On which days are clubs and sports sessions held?",
      ru: "В какие дни проходят кружки и спортивные занятия?",
    },
    answer: {
      uz: "Darsdan keyingi klublar va sport mashg'ulotlari haftalik jadval asosida o'tkaziladi.",
      en: "After-school clubs and sports sessions are scheduled weekly.",
      ru: "Внеурочные кружки и спортивные занятия проводятся по еженедельному расписанию.",
    },
  },
  5: {
    question: {
      uz: "Ota-onalar bilan aloqa qanday yo'lga qo'yiladi?",
      en: "How does the school communicate with parents?",
      ru: "Как выстроена коммуникация с родителями?",
    },
    answer: {
      uz: "Ota-onalar portali, haftalik hisobotlar, individual uchrashuvlar va mavzuli forumlar orqali muntazam aloqa qilinadi.",
      en: "Communication is maintained through the parent portal, weekly reports, one-on-one meetings, and themed forums.",
      ru: "Связь поддерживается через родительский портал, еженедельные отчеты, индивидуальные встречи и тематические форумы.",
    },
  },
  6: {
    question: {
      uz: "Maktabda psixologik yordam xizmati bormi?",
      en: "Does the school offer psychological support services?",
      ru: "Есть ли в школе служба психологической поддержки?",
    },
    answer: {
      uz: "Ha, o'quvchilarni qo'llab-quvvatlash markazida psixolog, maslahatchi va farovonlik koordinatori faoliyat yuritadi.",
      en: "Yes, the student support center includes a psychologist, counselor, and wellbeing coordinator.",
      ru: "Да, в центре поддержки учеников работают психолог, counselor и wellbeing coordinator.",
    },
  },
};

const galleryTranslations = {
  "STEM laboratoriya mashg'uloti": {
    title: {
      uz: "STEM laboratoriya mashg'uloti",
      en: "STEM Laboratory Session",
      ru: "Занятие в STEAM-лаборатории",
    },
  },
  "Kutubxona va reading corner": {
    title: {
      uz: "Kutubxona va mutolaa burchagi",
      en: "Library and Reading Corner",
      ru: "Библиотека и reading corner",
    },
  },
  "San'at festivali sahnasi": {
    title: {
      uz: "San'at festivali sahnasi",
      en: "Arts Festival Stage",
      ru: "Сцена фестиваля искусств",
    },
  },
  "Football training session": {
    title: {
      uz: "Futbol mashg'uloti",
      en: "Football Training Session",
      ru: "Футбольная тренировка",
    },
  },
  "Primary classroom activity": {
    title: {
      uz: "Boshlang'ich sinf mashg'uloti",
      en: "Primary Classroom Activity",
      ru: "Занятие в начальном классе",
    },
  },
  "Leadership camp trip": {
    title: {
      uz: "Yetakchilik lageriga safar",
      en: "Leadership Camp Trip",
      ru: "Поездка в лидерский лагерь",
    },
  },
};

const settingTranslations = {
  school_name: {
    uz: "OSIYO XALQARO MAKTABI",
    en: "OSIYO INTERNATIONAL SCHOOL",
    ru: "МЕЖДУНАРОДНАЯ ШКОЛА OSIYO",
  },
  contact_address: {
    uz: "Toshkent shahri, Yunusobod tumani, Ma'rifat ko'chasi 12",
    en: "12 Ma'rifat Street, Yunusabad District, Tashkent",
    ru: "г. Ташкент, Юнусабадский район, улица Маърифат, 12",
  },
  announcement_text: {
    uz: "2026-2027 o'quv yili uchun qabul davom etmoqda. Erta ro'yxatdan o'tganlar uchun konsultatsiya bepul.",
    en: "Admissions for the 2026-2027 academic year are in progress. Early applicants receive a complimentary consultation.",
    ru: "Прием на 2026-2027 учебный год продолжается. Для ранних заявителей консультация предоставляется бесплатно.",
  },
  working_hours: {
    uz: "Dushanba - Juma, 08:30 - 17:30",
    en: "Monday - Friday, 08:30 - 17:30",
    ru: "Понедельник - Пятница, 08:30 - 17:30",
  },
};

function pickLocalized(value, language) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] ?? value.uz ?? "";
}

function translateCategory(value, language) {
  return pickLocalized(categoryTranslations[value], language) || value;
}

export function localizeNewsItem(item, language) {
  if (!item) return item;
  const translation = newsTranslations[item.slug];

  return {
    ...item,
    featuredImage: getMediaOrFallback(item.featuredImage, newsMediaBySlug[item.slug]),
    title: pickLocalized(translation?.title, language) || item.title,
    summary: pickLocalized(translation?.summary, language) || item.summary,
    content: pickLocalized(translation?.content, language) || item.content,
    category: translateCategory(item.category, language),
  };
}

export function localizeEventItem(item, language) {
  if (!item) return item;
  const translation = eventTranslations[item.slug];

  return {
    ...item,
    featuredImage: getMediaOrFallback(item.featuredImage, eventMediaBySlug[item.slug]),
    title: pickLocalized(translation?.title, language) || item.title,
    summary: pickLocalized(translation?.summary, language) || item.summary,
    description: pickLocalized(translation?.description, language) || item.description,
    category: translateCategory(item.category, language),
    location: pickLocalized(translation?.location, language) || item.location,
  };
}

export function localizeTeacherItem(item, language) {
  if (!item) return item;
  const translation = teacherTranslations[item.fullName];

  return {
    ...item,
    photoUrl: getMediaOrFallback(item.photoUrl, teacherMediaByName[item.fullName]),
    role: pickLocalized(translation?.role, language) || item.role,
    bio: pickLocalized(translation?.bio, language) || item.bio,
  };
}

export function localizeFaqItem(item, language) {
  if (!item) return item;
  const translation = faqTranslations[item.sortOrder];

  return {
    ...item,
    question: pickLocalized(translation?.question, language) || item.question,
    answer: pickLocalized(translation?.answer, language) || item.answer,
    category: translateCategory(item.category, language),
  };
}

export function localizeGalleryItem(item, language) {
  if (!item) return item;
  const translation = typeof item.title === "string" ? galleryTranslations[item.title] : null;

  return {
    ...item,
    title: pickLocalized(translation?.title, language) || item.title,
    category: typeof item.category === "string" ? translateCategory(item.category, language) : item.category,
    categoryKey: item.categoryKey || item.category,
  };
}

export function localizeSettingEntry(item, language) {
  if (!item) return item;
  const translation = settingTranslations[item.settingKey];

  return {
    ...item,
    settingValue: pickLocalized(translation, language) || item.settingValue,
  };
}
