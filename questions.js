const questions = [

/* ===== BLOK 0: ISM-FAMILYA ===== */

{
  id: 1,
  block: "demographic",
  type: "open_text",
  text: {
    uz: "Ism sharifingizni yozing (Ixtiyoriy)",
    uz_cyrl: "Исм шарифингизни ёзинг (Ихтиёрий)",
    ru: "Напишите ваше имя и фамилию (необязательно)",
    en: "Write your name and surname (optional)"
  },
  options: {
    uz: ["O'tkazib yuboraman"],
    uz_cyrl: ["Ўтказиб юборамам"],
    ru: ["Пропустить"],
    en: ["Skip"]
  },
  index: false
},

{
  id: 15,
  block: "profile",
  type: "single_choice",
  text: {
    uz: "Siz qayerda ishlaysiz?",
    uz_cyrl: "Сиз қаерда ишлайсиз?",
    ru: "Где вы работаете?",
    en: "Where do you work?"
  },
  options: {
    uz: [
      "\"Navoiyuran\" Davlat korxonasida",
      "\"Nurliqum mining\" MChJda",
      "Tog' kon sanoati va geologiya vazirligida",
      "Uranga taluqli sohada ishlayman",
      "Men uran sohasida ishlamayman."
    ],
    uz_cyrl: [
      "\"Навоийуран\" давлат корхонасида",
      "\"Нурлиқум майнинг\" МЧЖда",
      "Тоғ-кон саноати ва геология вазирлигида",
      "Уранга тааллуқли соҳада ишлайман",
      "Мен уран соҳасида ишламайман."
    ],
    ru: [
      "В государственном предприятии \"Навоийуран\"",
      "В ООО \"Nurliqum mining\"",
      "В Министерстве горнодобывающей промышленности и геологии",
      "Работаю в сфере, связанной с ураном",
      "Я не работаю в урановой отрасли."
    ],
    en: [
      "At \"Navoiyuran\" State Enterprise",
      "At \"Nurliqum mining\" LLC",
      "At the Ministry of Mining Industry and Geology",
      "I work in a uranium-related field",
      "I do not work in the uranium sector."
    ]
  },
  resultsExcludeOptions: [
    "Men uran sohasida ishlamayman.",
    "Мен уран соҳасида ишламайман.",
    "Я не работаю в урановой отрасли.",
    "I do not work in the uranium sector."
  ],
  index: false
},

{
  id: 16,
  block: "profile",
  type: "single_choice",
  text: {
    uz: "Lavozimingiz darajasi qanaqa?",
    uz_cyrl: "Лавозимингиз даражаси қанақа?",
    ru: "Какой уровень вашей должности?",
    en: "What is your position level?"
  },
  options: {
    uz: [
      "Yuqori boshqaruvda (Kuzatuv kengashi, C yoki C-1)",
      "O'rta boshqaruvda (C-2, Director)",
      "Quyi boshqaruvda (Boshqarma, bo'lim boshlig'i)",
      "Mutaxassis lavozimida (Bosh mutaxassis, etakchi, boshlang'ich darajadagi mutaxassis/injiner)",
      "Ishchi/xizmat ko'rsatishda"
    ],
    uz_cyrl: [
      "Юқори бошқарувда (Кузатув кенгаши, C ёки C-1)",
      "Ўрта бошқарувда (C-2, Director)",
      "Қуйи бошқарувда (Бошқарма, бўлим бошлиғи)",
      "Мутахассис лавозимида (Бош, этакчи, бошланғич даражали мутахассис/инжинер)",
      "Ишчи/хизмат кўрсатишда"
    ],
    ru: [
      "Высшее руководство (Наблюдательный совет, C или C-1)",
      "Среднее руководство (C-2, Директор)",
      "Низшее руководство (Управление, начальник отдела)",
      "Специалист (Ведущий, главный, специалист/инженер начального уровня)",
      "Рабочий/обслуживающий персонал"
    ],
    en: [
      "Senior management (Board of directors, C or C-1)",
      "Middle management (C-2, Director)",
      "Lower management (Department, division head)",
      "Specialist (Lead, senior, entry-level specialist/engineer)",
      "Worker/service staff"
    ]
  },
  index: false
},

/* ===== BLOK I: PROFIL ===== */

{
  id: 2,
  block: "profile",
  type: "single_choice",
  text: {
    uz: "Uran sohasi bilan qo'shganda umumiy ish tajribangiz?",
    uz_cyrl: "Уран соҳасини ҳам ҳисобга олганда умумий иш тажрибангиз?",
    ru: "Каков ваш общий трудовой стаж с учётом сферы урана?",
    en: "What is your total work experience, including the uranium sector?"
  },
  options: {
    uz: ["0–5 yil", "6–10 yil", "11–20 yil", "20 yildan ortiq"],
    uz_cyrl: ["0–5 йил", "6–10 йил", "11–20 йил", "20 йилдан ортиқ"],
    ru: ["0–5 лет", "6–10 лет", "11–20 лет", "Более 20 лет"],
    en: ["0–5 years", "6–10 years", "11–20 years", "More than 20 years"]
  },
  index: false
},

/* ===== BLOK II: TEXNOLOGIYA QABULI ===== */

{
  id: 3,
  block: "technology",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellekt texnik xizmat samaradorligini oshiradi deb o‘ylaysizmi?",
    uz_cyrl: "Уран соҳасида сунъий интеллект техник хизмат самарадорлигини оширади деб ўйлайсизми?",
    ru: "Считаете ли вы, что искусственный интеллект повышает эффективность технического обслуживания?",
    en: "Do you think artificial intelligence improves the efficiency of technical maintenance?"
  },
  options: {
    uz: [
      "Ha, albatta oshiradi",
      "Menimcha yo‘q",
      "Bilmadim, lekin sinab ko‘rish kerak",
      "Mening fikrim quyidagicha"
    ],
    uz_cyrl: [
      "Ҳа, албатта оширади",
      "Менимча йўқ",
      "Билмадим, лекин синаб кўриш керак",
      "Менинг фикрим қуйидагича:"
    ],
    ru: [
      "Да, безусловно повышает",
      "Скорее нет",
      "Не уверен(а), но стоит попробовать",
      "По моему мнению:"
    ],
    en: [
      "Yes, it definitely improves efficiency",
      "I don’t think so",
      "I’m not sure, but it’s worth trying",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: false
},

{
  id: 4,
  block: "technology",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellekt qarorlariga qanchalik ishonasiz?",
    uz_cyrl: "Уран соҳасида сунъий интеллект қарорларига қанчалик ишонасиз?",
    ru: "Насколько вы доверяете решениям, принимаемым искусственным интеллектом?",
    en: "How much do you trust decisions made by artificial intelligence?"
  },
  options: {
    uz: [
      "Men 100% ishonaman",
      "80% Sun'iy Intellekt, 20% inson qayta ko‘rib chiqishi kerak",
      "50% Sun'iy Intellekt, 50% inson qarori bo‘lishi kerak",
      "Men juda kam ishonaman, chunki bu uran!"
    ],
    uz_cyrl: [
      "Мен 100% ишонаман",
      "80% Sun'iy Intellekt, 20% инсон қайта кўриб чиқиши керак",
      "50% Sun'iy Intellekt, 50% инсон қарори бўлиши керак",
      "Мен жуда кам ишонаман, чунки бу уран!"
    ],
    ru: [
      "Я доверяю решениям ИИ на 100%",
      "Я доверяю ИИ на 80%, но 20% должен проверять человек",
      "Решения должны быть на 50% ИИ и на 50% человеком",
      "Я доверяю ИИ очень мало, так как речь идёт об уране"
    ],
    en: [
      "I trust Sun'iy Intellekt decisions 100%",
      "I trust Sun'iy Intellekt 80%, but 20% should be reviewed by humans",
      "Decisions should be 50% Sun'iy Intellekt and 50% human",
      "I trust Sun'iy Intellekt very little, because this involves uranium"
    ]
  },
  index: false
},

/* ===== BLOK III: YETAKCHILIK ===== */

{
  id: 5,
  block: "leadership",
  type: "single_choice",
  text: {
    uz: "Rahbariyat Uran sohasida sun'iy intellektni joriy etish maqsadini aniq tushuntirdimi?",
    uz_cyrl: "Раҳбарият Уран соҳасида сунъiy интеллектни жорий этиш мақсадини аниқ тушунтирдими?",
    ru: "Чётко ли руководство объяснило цели внедрения искусственного интеллекта?",
    en: "Did management clearly explain the objectives of implementing artificial intelligence?"
  },
  options: {
    uz: [
      "Rahbariyat aniq tushuntirib berdi",
      "Tushuntirdi, lekin yana ko‘proq tushuntirishi kerak",
      "Bu haqida xabarim yo‘q, lekin bu juda muhim",
      "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Раҳbarият аниқ тушuntirib berdi",
      "Tушунтирди, lekin yana ko‘proқ tushuntirishi kerak",
      "Bu haqida xabarim yo‘q, lekin bu juda muhim",
      "Менing fikрим қуйidagiicha:"
    ],
    ru: [
      "Да, руководство чётко всё объяснило",
      "Объяснили, но требуется более подробное разъяснение",
      "Я не был(а) проинформирован(а), но это очень важно",
      "По моему мнению:"
    ],
    en: [
      "Yes, management explained it clearly",
      "It was explained, but more clarification is needed",
      "I was not informed, but this is very important",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: true
},

{
  id: 6,
  block: "leadership",
  type: "single_choice",
  text: {
    uz: "Rahbarlar Uran sohasida sun'iy intellekt orqali xarajatlar kamayishini tushuntirdimi?",
    uz_cyrl: "Раҳbarлар Uran sohasida sun'iy intellekt orqali xarajatlar kamayishini tushuntirdimi?",
    ru: "Объяснило ли руководство, как ИИ поможет сократить затраты?",
    en: "Did management explain how artificial intelligence would reduce costs?"
  },
  options: {
    uz: [
      "Ha, bunga qo‘shilaman",
      "Qisman qo‘shilaman",
      "Masalaning ikkinchi tomoni ham bor, yaxshilab o‘ylash kerak",
      "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Ҳа, bунга qo‘shilaman",
      "Қisman qo‘shilaman",
      "Мasalaning ikkinchi tomoni ham bor, yaxshilab o‘ylash kerak",
      "Менing fikrim қуйidagiicha:"
    ],
    ru: [
      "Да, я с этим согласен(на)",
      "Частично согласен(на)",
      "Есть и другая сторона, это нужно тщательно продумать",
      "По моему мнению:"
    ],
    en: [
      "Yes, I agree with this",
      "I partially agree",
      "There is another side to this that needs careful consideration",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: true
},

{
  id: 7,
  block: "leadership",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellekt joriy etishda mutaxassislar fikri inobatga olinadi deb o‘ylaysizmi?",
    uz_cyrl: "Уran sohasida sun'iy intellekt joriy etishda mutaxassislar fikri inobatga olinadi deb o‘ylaysizmi?",
    ru: "Считаете ли вы, что мнение специалистов учитывается при внедрении ИИ?",
    en: "Do you think experts’ opinions are taken into account when implementing AI?"
  },
  options: {
    uz: [
      "Albatta olinadi, doim shunday bo‘lgan",
      "Bunday bo‘ladi deb o‘ylamayman",
      "Bu jarayonda mening fikrim muhim emas deb hisoblayman",
      "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Алbatta olinadi, doim shunday bo‘lgan",
      "Bunday bo‘ladi deb o‘ylamayman",
      "Bu jarayonda mening fikrim muhim emas deb hisoblayman",
      "Менing fikrim қуйidagiicha:"
    ],
    ru: [
      "Да, мнение специалистов всегда учитывается",
      "Я не думаю, что это так",
      "Я считаю, что моё мнение в этом процессе не важно",
      "По моему мнению:"
    ],
    en: [
      "Yes, experts’ opinions are always considered",
      "I do not think this is the case",
      "I believe my opinion is not important in this process",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: true
},

/* ===== BLOK IV: QARSHILIK ===== */

{
  id: 8,
  block: "resistance",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellekt ish o‘rnimga xavf soladi deb o‘ylaysizmi?",
    uz_cyrl: "Уran sohasida sun'iy intellekt ish o‘rnimga xavf soladi deb o‘ylaysizmi?",
    ru: "Считаете ли вы, что искусственный интеллект угрожает вашему рабочему месту?",
    en: "Do you think artificial intelligence threatens your job?"
  },
  options: {
    uz: [
      "Ha, ish o‘rnimni yo‘qotishim mumkin deb o‘ylayman",
      "Uran sohasida sun'iy intellekt bilan birga ishlayman, yangi vazifalar yuklanadi",
      "Uran sohasida sun'iy intellekt baribir meni to‘liq almashtira olmaydi",
       "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Ҳа, иш o‘rnimni yo‘qotishim mumkin deb o‘ylayman",
      "Уran sohasida sun'iy intellekt bilan birga ishlayman, yangi vazifalar yuklanadi",
      "Уran sohasida sun'iy intellekt baribir meni to‘liq almashtira olmaydi",
      "Менing fikrim қуйdagiicha:"
    ],
    ru: [
      "Да, я считаю, что могу потерять работу",
      "Я буду работать вместе с ИИ, появятся новые задачи",
      "ИИ не сможет полностью меня заменить",
      "По моему мнению:"
    ],
    en: [
      "Yes, I think I might lose my job",
      "I will work alongside Sun'iy Intellekt and take on new tasks",
      "Sun'iy Intellekt will not be able to fully replace me",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: true
},

{
  id: 9,
  block: "resistance",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellekt xato qilsa, javobgarlik noaniq deb hisoblaysizmi?",
    uz_cyrl: "Уran sohasida sun'iy intellekt xato qilsa, javobgarlik noaniq deb hisoblaysizmi?",
    ru: "Считаете ли вы, что в случае ошибки ИИ ответственность будет неясной?",
    en: "Do you think accountability is unclear if artificial intelligence makes a mistake?"
  },
  options: {
    uz: ["Qo‘shilaman", "Qisman qo‘shilaman", "Qo‘shilmayman", "Mening o‘ylashimcha (izoh qoldiraman)"],
    uz_cyrl: ["Қўshilaman", "Қисman qo‘shilaman", "Қўshilmayman", "Менing fikrim қуйdagiicha:"],
    ru: ["Согласен(на)", "Частично согласен(на)", "Не согласен(на)", "По моему мнению:"],
    en: ["I agree", "I partially agree", "I disagree", "In my opinion:"]
  },
  open_option: true,
  index: true
},

{
  id: 10,
  block: "resistance",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellektga ishonish psixologik jihatdan qiyin deb hisoblaysizmi?",
    uz_cyrl: "Уran sohasida sun'iy intellektga ishonish psixologik jihatdan qiyin deb hisoblaysizmi?",
    ru: "Считаете ли вы, что психологически сложно доверять искусственному интеллекту?",
    en: "Do you find it psychologically difficult to trust artificial intelligence?"
  },
  options: {
    uz: [
      "Ha, ayniqsa bizning avlod uchun qiyin",
      "Yo‘q, smartfonlarga ham o‘rganib ketdik",
      "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Ҳа, ayniqsa bizning avlod uchun qiyin",
      "Йўқ, smartfonlarga ham o‘rganib ketdik",
      "Менing fikrim қуйdagiicha:"
    ],
    ru: [
      "Да, особенно для нашего поколения",
      "Нет, мы ведь привыкли и к смартфонам",
      "По моему мнению:"
    ],
    en: [
      "Yes, especially for our generation",
      "No, we got used to smartphones as well",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: true
},

/* ===== BLOK V: TAYYORLIK VA MADANIYAT ===== */

{
  id: 11,
  block: "readiness",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellektdan foydalanish bo‘yicha yetarli trening berildimi?",
    uz_cyrl: "Уran sohasida sun'iy intellektdan foydalanish bo‘yicha yetarli trening berildimi?",
    ru: "Было ли предоставлено достаточное обучение по использованию ИИ?",
    en: "Was sufficient training provided on how to use artificial intelligence?"
  },
  options: {
    uz: [
      "Mening bilimlarim yetarli, trening shart emas",
      "Bu trening yetarli emas, yana trening kerak",
      "Trening tashkil etilganini eshitmadim"
    ],
    uz_cyrl: [
      "Менing bilimlarim yetarli, trening shart emas",
      "Бу тренинг yetarli emas, yana trening kerak",
      "Тренинг tashkil etilganini eshitmadim"
    ],
    ru: [
      "Моих знаний достаточно, обучение не требуется",
      "Этого обучения недостаточно, требуется дополнительное обучение",
      "Я не слышал(а) о проведении обучения"
    ],
    en: [
      "My knowledge is sufficient; training is not necessary",
      "The training is insufficient; more training is needed",
      "I was not aware that any training was provided"
    ]
  },
  index: true
},

{
  id: 12,
  block: "readiness",
  type: "single_choice",
  text: {
    uz: "Rahbarlar raqamli texnologiyalarni tushunadi deb o‘ylaysizmi?",
    uz_cyrl: "Раҳbarlar raqamli texnologiyalarni tushunadi deb o‘ylaysizmi?",
    ru: "Считаете ли вы, что руководство понимает цифровые технологии?",
    en: "Do you think management understands digital technologies?"
  },
  options: {
    uz: [
      "Rahbarlarning aksariyati tushunmaydi",
      "Rahbarlar bu sohada juda yaxshi",
      "Ayrimlari yaxshi, qolganlarini o‘qitish kerak"
    ],
    uz_cyrl: [
      "Раҳbarlarning aksariyati tushunmaydi",
      "Раҳbarlar bu sohada juda yaxshi",
      "Айримlari yaxshi, qolganlarini o‘qitish kerak"
    ],
    ru: [
      "Большинство руководителей не понимают эти технологии",
      "Руководство хорошо разбирается в этой области",
      "Некоторые понимают, но остальных нужно обучать"
    ],
    en: [
      "Most managers do not understand these technologies",
      "Management understands these technologies very well",
      "Some understand them, but others need further training"
    ]
  },
  index: true
},

{
  id: 13,
  block: "culture",
  type: "single_choice",
  text: {
    uz: "Oldingi innovatsiyalar korxonada muvaffaqiyatli bo‘lgan deb hisoblaysizmi?",
    uz_cyrl: "Олдинги innovatsiyalar korxonada muvaffaqiyatli bo‘lgan deb hisoblaysizmi?",
    ru: "Считаете ли вы, что предыдущие инновации в компании были successful?",
    en: "Do you think previous innovations in the company were successful?"
  },
  options: {
    uz: ["Ha, bunga qo‘shilaman", "Yo‘q, qo‘shilmayadman", "Bizda deyarli innovatsiyalar bo‘lmagan"],
    uz_cyrl: ["Ҳа, bунға qo‘шilaman", "Йўқ, qo‘шilmayman", "Bizda deyarli innovatsiyalar bo‘lmagan"],
    ru: ["Да, я согласен(на)", "Нет, не согласен(на)", "В компании практически не было инноваций"],
    en: ["Yes, I agree", "No, I disagree", "There have been almost no innovations in the company"]
  },
  index: false
},

{
  id: 14,
  block: "validation",
  type: "single_choice",
  text: {
    uz: "Uran sohasida sun'iy intellektni muvaffaqiyatli joriy etish asosan rahbariyatga bog‘liq deb o‘ylaysizmi?",
    uz_cyrl: "Уran sohasida sun'iy intellektni muvaffaqiyatli joriy etish asosan rahbariyatga bog‘liq deb o‘ylaysizmi?",
    ru: "Считаете ли вы, что успешное внедрение ИИ в основном зависит от руководства?",
    en: "Do you think successful implementation of artificial intelligence mainly depends on management?"
  },
  options: {
    uz: [
      "Ha, bunga qo‘shilaman",
      "Yo‘q, ko‘proq xodimlarga bog‘liq",
      "Mening fikrim quyidagicha:"
    ],
    uz_cyrl: [
      "Ҳа, bунға qo‘шilaman",
      "Йўқ, ko‘proқ xodimlarga bog‘liq",
      "Менing fikrim қуйdagiicha:"
    ],
    ru: [
      "Да, я согласен(на)",
      "Нет, это в большей степени зависит от сотрудников",
      "По моему мнению:"
    ],
    en: [
      "Yes, I agree",
      "No, it depends more on employees",
      "In my opinion:"
    ]
  },
  open_option: true,
  index: false
}

];
