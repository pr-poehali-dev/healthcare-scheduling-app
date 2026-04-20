import { useState } from "react";
import Icon from "@/components/ui/icon";

type AnyIcon = Parameters<typeof Icon>[0]["name"];

type Page = "home" | "doctors" | "booking" | "payments" | "reviews" | "notifications" | "about";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8a1c6246-528a-43be-950c-4adb13f336be/files/efbbe7ad-b509-4ec1-878d-20d839ed521a.jpg";

const doctors = [
  {
    id: 1,
    name: "Светлана Алексеевна Морозова",
    specialty: "Кардиолог",
    experience: "18 лет",
    rating: 4.9,
    reviews: 234,
    price: "3 200 ₽",
    emoji: "🫀",
    tags: ["УЗИ сердца", "ЭКГ", "Холтер"],
    desc: "Специалист по диагностике и лечению заболеваний сердечно-сосудистой системы. Кандидат медицинских наук.",
  },
  {
    id: 2,
    name: "Андрей Викторович Петров",
    specialty: "Невролог",
    experience: "12 лет",
    rating: 4.8,
    reviews: 189,
    price: "2 800 ₽",
    emoji: "🧠",
    tags: ["Головные боли", "Остеохондроз", "ЭЭГ"],
    desc: "Опытный невролог, специализирующийся на лечении мигрени, вертеброгенных болей и нейропатий.",
  },
  {
    id: 3,
    name: "Елена Дмитриевна Соколова",
    specialty: "Терапевт",
    experience: "9 лет",
    rating: 4.7,
    reviews: 312,
    price: "2 200 ₽",
    emoji: "🩺",
    tags: ["Диспансеризация", "ОРВИ", "Справки"],
    desc: "Врач общей практики. Проводит профилактические осмотры, лечение простудных и хронических заболеваний.",
  },
  {
    id: 4,
    name: "Михаил Игоревич Захаров",
    specialty: "Ортопед",
    experience: "15 лет",
    rating: 4.9,
    reviews: 156,
    price: "3 500 ₽",
    emoji: "🦴",
    tags: ["Суставы", "Позвоночник", "Травмы"],
    desc: "Хирург-ортопед с опытом эндопротезирования суставов и лечения травм опорно-двигательного аппарата.",
  },
  {
    id: 5,
    name: "Ирина Сергеевна Волкова",
    specialty: "Дерматолог",
    experience: "11 лет",
    rating: 4.8,
    reviews: 278,
    price: "2 600 ₽",
    emoji: "✨",
    tags: ["Косметология", "Дерматит", "Акне"],
    desc: "Специалист по дерматовенерологии и косметологии. Лечение кожных заболеваний, удаление новообразований.",
  },
  {
    id: 6,
    name: "Дмитрий Павлович Лебедев",
    specialty: "Офтальмолог",
    experience: "20 лет",
    rating: 5.0,
    reviews: 198,
    price: "2 900 ₽",
    emoji: "👁️",
    tags: ["Зрение", "Глаукома", "Катаракта"],
    desc: "Врач высшей категории. Диагностика и лечение заболеваний глаз, подбор очков и контактных линз.",
  },
];

const specialties = ["Все", "Кардиолог", "Невролог", "Терапевт", "Ортопед", "Дерматолог", "Офтальмолог"];

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

const payments = [
  { id: 1, date: "15 апр 2026", doctor: "Соколова Е.Д.", specialty: "Терапевт", amount: "2 200 ₽", status: "Оплачено", statusColor: "text-teal-600 bg-teal-50" },
  { id: 2, date: "8 апр 2026", doctor: "Морозова С.А.", specialty: "Кардиолог", amount: "3 200 ₽", status: "Оплачено", statusColor: "text-teal-600 bg-teal-50" },
  { id: 3, date: "1 апр 2026", doctor: "Петров А.В.", specialty: "Невролог", amount: "2 800 ₽", status: "Оплачено", statusColor: "text-teal-600 bg-teal-50" },
  { id: 4, date: "22 мар 2026", doctor: "Захаров М.И.", specialty: "Ортопед", amount: "3 500 ₽", status: "Оплачено", statusColor: "text-teal-600 bg-teal-50" },
];

const reviewsList = [
  { id: 1, author: "Анна К.", doctor: "Морозова С.А.", date: "17 апр", rating: 5, text: "Великолепный специалист! Очень внимательно выслушала, назначила эффективное лечение. Чувствую себя значительно лучше." },
  { id: 2, author: "Игорь М.", doctor: "Захаров М.И.", date: "14 апр", rating: 5, text: "Михаил Игоревич — настоящий профессионал. После курса лечения боли в колене прошли полностью." },
  { id: 3, author: "Светлана Р.", doctor: "Волкова И.С.", date: "10 апр", rating: 4, text: "Хороший врач, дала подробные рекомендации по уходу за кожей. Назначенное лечение помогло быстро." },
  { id: 4, author: "Василий Т.", doctor: "Лебедев Д.П.", date: "7 апр", rating: 5, text: "Дмитрий Павлович обнаружил начальную стадию глаукомы, которую не заметили другие. Очень благодарен!" },
  { id: 5, author: "Наталья П.", doctor: "Петров А.В.", date: "3 апр", rating: 5, text: "Первый раз за долгое время нашла невролога, который реально помог с мигренями. Рекомендую всем." },
];

const notifications = [
  { id: 1, type: "reminder", title: "Приём завтра в 10:30", desc: "Терапевт Соколова Е.Д. — не забудьте взять результаты анализов", time: "Сегодня, 18:00", icon: "Clock", color: "bg-sky-50 border-sky-200 text-sky-700" },
  { id: 2, type: "promo", title: "Акция: Чекап организма", desc: "До 30 апреля комплексное обследование со скидкой 25%", time: "Вчера", icon: "Gift", color: "bg-teal-50 border-teal-200 text-teal-700" },
  { id: 3, type: "result", title: "Результаты анализов готовы", desc: "Общий анализ крови от 14 апреля доступен в личном кабинете", time: "14 апр", icon: "FileText", color: "bg-green-50 border-green-200 text-green-700" },
  { id: 4, type: "reminder", title: "Повторный приём через неделю", desc: "Кардиолог Морозова С.А. рекомендует плановый осмотр", time: "12 апр", icon: "CalendarCheck", color: "bg-sky-50 border-sky-200 text-sky-700" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const items: { id: Page; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "doctors", icon: "Stethoscope", label: "Врачи" },
    { id: "booking", icon: "CalendarPlus", label: "Запись" },
    { id: "payments", icon: "CreditCard", label: "Оплата" },
    { id: "reviews", icon: "Star", label: "Отзывы" },
    { id: "notifications", icon: "Bell", label: "Сообщения" },
    { id: "about", icon: "MapPin", label: "О центре" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setPage("home")}>
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center text-white text-sm font-bold">М</div>
          <span className="font-bold text-lg text-teal-800 hidden sm:block">МедЦентр</span>
        </div>
        <nav className="flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                ${page === item.id
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-teal-800 hover:bg-teal-50"
                }`}
            >
              <Icon name={item.icon as AnyIcon} size={18} />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const quickStats = [
    { icon: "Users", val: "47 врачей", label: "специалистов" },
    { icon: "Star", val: "4.9", label: "средний рейтинг" },
    { icon: "CalendarCheck", val: "12 000+", label: "приёмов в год" },
    { icon: "Clock", val: "8:00–21:00", label: "ежедневно" },
  ];

  const quickActions = [
    { icon: "CalendarPlus", label: "Записаться", sub: "к врачу онлайн", page: "booking" as Page, grad: "from-teal-500 to-teal-600" },
    { icon: "Stethoscope", label: "Врачи", sub: "каталог специалистов", page: "doctors" as Page, grad: "from-sky-500 to-sky-600" },
    { icon: "CreditCard", label: "Оплата", sub: "история и методы", page: "payments" as Page, grad: "from-teal-600 to-emerald-600" },
    { icon: "Bell", label: "Уведомления", sub: "напоминания", page: "notifications" as Page, grad: "from-sky-600 to-teal-600" },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[480px] flex items-center overflow-hidden rounded-3xl mb-8">
        <img src={HERO_IMAGE} alt="МедЦентр" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/60 to-transparent" />
        <div className="relative z-10 px-8 py-16 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-100 border border-teal-400/30 mb-4">
            Медицинский центр нового поколения
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Здоровье —<br />
            <span className="text-teal-300">ваш главный</span><br />
            приоритет
          </h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">
            Запись к врачу онлайн, квалифицированные специалисты и забота о вашем здоровье
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setPage("booking")} className="gradient-btn px-6 py-3 rounded-2xl font-semibold text-white shadow-lg">
              Записаться онлайн
            </button>
            <button onClick={() => setPage("doctors")} className="px-6 py-3 rounded-2xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-all">
              Наши врачи
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {quickStats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 text-center card-hover">
            <div className="w-10 h-10 gradient-btn rounded-xl flex items-center justify-center mx-auto mb-2">
              <Icon name={s.icon as AnyIcon} size={20} className="text-white" />
            </div>
            <div className="text-xl font-black text-teal-800">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-black text-teal-900 mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setPage(a.page)} className="glass rounded-2xl p-5 text-left card-hover group">
              <div className={`w-12 h-12 bg-gradient-to-br ${a.grad} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={a.icon as AnyIcon} size={22} className="text-white" />
              </div>
              <div className="font-bold text-teal-900">{a.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.sub}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-teal-900">Топ специалисты</h2>
          <button onClick={() => setPage("doctors")} className="text-teal-600 text-sm font-semibold hover:text-teal-800 transition-colors">
            Все врачи →
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {doctors.slice(0, 3).map((doc) => (
            <div key={doc.id} className="glass rounded-2xl p-5 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 glass-teal rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{doc.emoji}</div>
                <div>
                  <div className="font-bold text-teal-900 text-sm leading-tight">{doc.name}</div>
                  <div className="text-xs text-teal-600 font-medium mt-0.5">{doc.specialty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={doc.rating} />
                <span className="text-xs text-muted-foreground">{doc.rating} ({doc.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-800">{doc.price}</span>
                <button onClick={() => setPage("booking")} className="gradient-btn text-xs px-3 py-1.5 rounded-lg font-semibold">
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-teal rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-1">
          <Icon name="CalendarCheck" size={20} className="text-teal-600" />
          <span className="font-bold text-teal-900">Ближайший приём</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-teal-800 mt-1">Завтра, 10:30</div>
            <div className="text-sm text-teal-600">Терапевт · Соколова Елена Дмитриевна</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Кабинет 214</div>
            <button className="gradient-btn text-sm px-4 py-2 rounded-xl font-semibold mt-2">Подробнее</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function DoctorsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeSpec, setActiveSpec] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = doctors.filter((d) => {
    const matchSpec = activeSpec === "Все" || d.specialty === activeSpec;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">Наши специалисты</h1>
        <p className="text-muted-foreground">Выберите врача по специальности или найдите по имени</p>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по имени или специальности..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-2xl border border-border bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mb-6">
        {specialties.map((s) => (
          <button key={s} onClick={() => setActiveSpec(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeSpec === s ? "gradient-btn shadow-md" : "glass text-teal-800 hover:bg-teal-50"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <div key={doc.id} className="glass rounded-2xl p-5 card-hover flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-14 h-14 glass-teal rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">{doc.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-teal-900 text-sm leading-tight">{doc.name}</div>
                <div className="text-xs text-teal-600 font-semibold mt-0.5">{doc.specialty}</div>
                <div className="text-xs text-muted-foreground">Стаж: {doc.experience}</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">{doc.desc}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {doc.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={doc.rating} />
              <span className="text-xs font-semibold text-teal-700">{doc.rating}</span>
              <span className="text-xs text-muted-foreground">· {doc.reviews} отзывов</span>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div>
                <div className="text-xs text-muted-foreground">Стоимость приёма</div>
                <div className="font-black text-teal-800 text-lg">{doc.price}</div>
              </div>
              <button onClick={() => setPage("booking")} className="gradient-btn px-4 py-2 rounded-xl font-semibold text-sm">
                Записаться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);

  const filteredDocs = selectedSpec ? doctors.filter((d) => d.specialty === selectedSpec) : doctors;
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      label: d.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" }),
    };
  });

  if (booked) {
    return (
      <div className="animate-scale-in flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 gradient-btn rounded-full flex items-center justify-center mb-6 shadow-xl">
          <Icon name="Check" size={36} className="text-white" />
        </div>
        <h2 className="text-3xl font-black text-teal-900 mb-2">Запись подтверждена!</h2>
        <p className="text-muted-foreground mb-1">{selectedDoctorData?.specialty} · {selectedDoctorData?.name}</p>
        <p className="text-teal-700 font-bold text-xl mb-6">{selectedDate} в {selectedTime}</p>
        <p className="text-sm text-muted-foreground mb-8">Напоминание придёт за 2 часа до приёма</p>
        <button onClick={() => { setStep(1); setBooked(false); setSelectedSpec(""); setSelectedDoctor(null); setSelectedDate(""); setSelectedTime(""); }}
          className="gradient-btn px-8 py-3 rounded-2xl font-bold text-white shadow-lg">
          Записаться ещё раз
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">Запись на приём</h1>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step >= s ? "gradient-btn text-white shadow-md" : "bg-gray-100 text-gray-400"}`}>
                {step > s ? <Icon name="Check" size={14} /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? "text-teal-700" : "text-muted-foreground"}`}>
                {s === 1 ? "Врач" : s === 2 ? "Дата и время" : "Подтверждение"}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-teal-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <div className="mb-4">
            <label className="text-sm font-semibold text-teal-800 mb-2 block">Специальность</label>
            <div className="flex gap-2 flex-wrap">
              {specialties.slice(1).map((s) => (
                <button key={s} onClick={() => setSelectedSpec(s === selectedSpec ? "" : s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${selectedSpec === s ? "gradient-btn text-white shadow-md" : "glass text-teal-800 hover:bg-teal-50"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <button key={doc.id} onClick={() => setSelectedDoctor(doc.id)}
                className={`glass rounded-2xl p-4 text-left transition-all
                  ${selectedDoctor === doc.id ? "ring-2 ring-teal-500 shadow-lg" : "card-hover"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 glass-teal rounded-xl flex items-center justify-center text-2xl">{doc.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-teal-900 text-sm">{doc.name}</div>
                    <div className="text-xs text-teal-600">{doc.specialty} · {doc.experience}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarRating rating={doc.rating} />
                      <span className="text-xs text-muted-foreground">{doc.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-teal-800 text-sm">{doc.price}</div>
                    {selectedDoctor === doc.id && <Icon name="CheckCircle" size={18} className="text-teal-500 mt-1 ml-auto" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button disabled={!selectedDoctor} onClick={() => setStep(2)}
              className="gradient-btn px-8 py-3 rounded-2xl font-bold text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">
              Далее →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          {selectedDoctorData && (
            <div className="glass-teal rounded-2xl p-4 mb-5 flex items-center gap-3">
              <div className="text-3xl">{selectedDoctorData.emoji}</div>
              <div>
                <div className="font-bold text-teal-900">{selectedDoctorData.name}</div>
                <div className="text-sm text-teal-600">{selectedDoctorData.specialty} · {selectedDoctorData.price}</div>
              </div>
            </div>
          )}
          <div className="mb-5">
            <label className="text-sm font-semibold text-teal-800 mb-3 block">Выберите дату</label>
            <div className="flex gap-2 flex-wrap">
              {dates.map((d, i) => (
                <button key={i} onClick={() => setSelectedDate(d.label)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-center min-w-[80px]
                    ${selectedDate === d.label ? "gradient-btn text-white shadow-md" : "glass text-teal-800 hover:bg-teal-50"}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold text-teal-800 mb-3 block">Выберите время</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {timeSlots.map((t) => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all
                    ${selectedTime === t ? "gradient-btn text-white shadow-md" : "glass text-teal-800 hover:bg-teal-50"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-2xl font-semibold glass text-teal-800">← Назад</button>
            <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)}
              className="gradient-btn px-8 py-3 rounded-2xl font-bold text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">
              Далее →
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedDoctorData && (
        <div className="animate-fade-in max-w-md mx-auto">
          <div className="glass rounded-2xl p-6 mb-5">
            <h3 className="font-black text-teal-900 text-lg mb-4">Подтвердите запись</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Врач</span>
                <span className="font-semibold text-teal-900 text-right">{selectedDoctorData.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Специальность</span>
                <span className="font-semibold text-teal-900">{selectedDoctorData.specialty}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Дата</span>
                <span className="font-semibold text-teal-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Время</span>
                <span className="font-semibold text-teal-900">{selectedTime}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-teal-800">Стоимость</span>
                <span className="font-black text-teal-800 text-xl">{selectedDoctorData.price}</span>
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 mb-5">
            <div className="text-sm font-semibold text-teal-800 mb-2">Способ оплаты</div>
            <div className="flex gap-3">
              {["💳 Карта онлайн", "🏦 Наличные"].map((m) => (
                <button key={m} className="flex-1 py-2.5 rounded-xl text-sm font-medium glass-teal text-teal-800 hover:ring-2 hover:ring-teal-400 transition-all">
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-6 py-3 rounded-2xl font-semibold glass text-teal-800">← Назад</button>
            <button onClick={() => setBooked(true)}
              className="flex-1 gradient-btn py-3 rounded-2xl font-bold text-white shadow-lg text-center">
              Подтвердить запись
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentsPage() {
  const cards = [
    { type: "Visa", last4: "4521", color: "from-teal-500 to-sky-500" },
    { type: "Mastercard", last4: "8832", color: "from-sky-600 to-teal-600" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">Оплата</h1>
        <p className="text-muted-foreground">История платежей и привязанные карты</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-teal-800 mb-3">Мои карты</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="text-2xl mb-4">💳</div>
              <div className="font-mono text-lg font-bold tracking-widest">•••• •••• •••• {c.last4}</div>
              <div className="flex justify-between mt-3 text-sm text-white/80">
                <span>{c.type}</span>
                <span>Основная</span>
              </div>
            </div>
          ))}
          <button className="glass rounded-2xl p-5 flex items-center justify-center gap-3 card-hover border-2 border-dashed border-teal-200 text-teal-600 hover:border-teal-400 transition-all">
            <Icon name="Plus" size={20} />
            <span className="font-semibold">Добавить карту</span>
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-teal-800 mb-3">История платежей</h2>
        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 glass-teal rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Receipt" size={18} className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-teal-900 text-sm">{p.doctor}</div>
                <div className="text-xs text-muted-foreground">{p.specialty} · {p.date}</div>
              </div>
              <div className="text-right">
                <div className="font-black text-teal-800">{p.amount}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 glass-teal rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Потрачено в этом месяце</div>
            <div className="text-3xl font-black text-teal-800 mt-1">5 400 ₽</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Всего визитов</div>
            <div className="text-2xl font-black text-teal-600">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const filters = ["Все", "Кардиолог", "Невролог", "Ортопед", "Дерматолог", "Офтальмолог"];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">Отзывы</h1>
        <p className="text-muted-foreground">Реальные мнения наших пациентов</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { val: "4.9", label: "Средняя оценка", icon: "Star" },
          { val: "1 200+", label: "Отзывов", icon: "MessageSquare" },
          { val: "98%", label: "Рекомендуют", icon: "ThumbsUp" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 text-center">
            <Icon name={s.icon as AnyIcon} size={20} className="text-teal-500 mx-auto mb-1" />
            <div className="text-2xl font-black text-teal-800">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap mb-5">
        {filters.map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
              ${activeFilter === f ? "gradient-btn text-white shadow-md" : "glass text-teal-800 hover:bg-teal-50"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-4 mb-6">
        {reviewsList.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-btn rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {r.author[0]}
                </div>
                <div>
                  <div className="font-semibold text-teal-900 text-sm">{r.author}</div>
                  <div className="text-xs text-teal-600">{r.doctor}</div>
                </div>
              </div>
              <div className="text-right">
                <StarRating rating={r.rating} />
                <div className="text-xs text-muted-foreground mt-0.5">{r.date}</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
      <div className="glass-teal rounded-2xl p-5">
        <h3 className="font-bold text-teal-900 mb-3">Оставить отзыв</h3>
        <div className="flex gap-2 mb-3 text-2xl">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} className="hover:scale-125 transition-transform text-gray-300 hover:text-amber-400">★</button>
          ))}
        </div>
        <textarea
          placeholder="Поделитесь своими впечатлениями о приёме..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none transition-all"
        />
        <button className="gradient-btn mt-3 px-6 py-2.5 rounded-xl font-semibold text-white">
          Отправить отзыв
        </button>
      </div>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">Уведомления</h1>
        <p className="text-muted-foreground">Напоминания о приёмах и важные сообщения</p>
      </div>
      <div className="space-y-3 mb-6">
        {notifications.map((n) => (
          <div key={n.id} className={`rounded-2xl p-4 border card-hover flex gap-4 ${n.color}`}>
            <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
              <Icon name={n.icon as AnyIcon} size={18} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{n.title}</div>
              <div className="text-xs mt-0.5 opacity-80 leading-relaxed">{n.desc}</div>
              <div className="text-xs mt-1.5 opacity-60 font-medium">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-bold text-teal-900 mb-3">Настройки уведомлений</h3>
        <div className="space-y-3">
          {[
            "Напоминания о приёмах (за 2 часа)",
            "Результаты анализов",
            "Акции и специальные предложения",
            "Сообщения от врачей",
          ].map((label, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-teal-900">{label}</span>
              <div className="w-11 h-6 rounded-full bg-teal-500 relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-teal-900 mb-1">О медицинском центре</h1>
        <p className="text-muted-foreground">Современная клиника с заботой о каждом пациенте</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden mb-5">
        <div className="h-48 relative overflow-hidden">
          <img src={HERO_IMAGE} alt="Клиника" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-2xl font-black">МедЦентр</div>
            <div className="text-sm text-teal-200">Здоровье рядом с вами</div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            МедЦентр — современная многопрофильная клиника, основанная в 2010 году. Мы объединяем опытных специалистов, передовое оборудование и индивидуальный подход к каждому пациенту.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {[
          { icon: "MapPin", title: "Адрес", val: "ул. Здоровья, д. 15, Москва", sub: "м. Медицинская, 5 мин пешком" },
          { icon: "Phone", title: "Телефон", val: "+7 (495) 123-45-67", sub: "Без выходных, 8:00–21:00" },
          { icon: "Clock", title: "Часы работы", val: "Пн–Вс: 8:00–21:00", sub: "Экстренный приём круглосуточно" },
          { icon: "Mail", title: "Email", val: "info@medcenter.ru", sub: "Ответим в течение 2 часов" },
        ].map((c, i) => (
          <div key={i} className="glass rounded-2xl p-4 flex gap-3 card-hover">
            <div className="w-10 h-10 gradient-btn rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name={c.icon as AnyIcon} size={18} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{c.title}</div>
              <div className="font-bold text-teal-900 text-sm">{c.val}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-teal rounded-2xl p-5 mb-5">
        <h3 className="font-bold text-teal-900 mb-3">Наши преимущества</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "ShieldCheck", text: "Лицензия Минздрава" },
            { icon: "Microscope", text: "Собственная лаборатория" },
            { icon: "Zap", text: "Онлайн-запись 24/7" },
            { icon: "CreditCard", text: "Онлайн-оплата" },
            { icon: "FileText", text: "Электронные рецепты" },
            { icon: "Car", text: "Бесплатная парковка" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon name={a.icon as AnyIcon} size={16} className="text-teal-500 flex-shrink-0" />
              <span className="text-sm text-teal-900">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center">
          <div className="text-center">
            <Icon name="MapPin" size={40} className="text-teal-500 mx-auto mb-2" />
            <div className="text-teal-800 font-bold">ул. Здоровья, д. 15</div>
            <div className="text-teal-600 text-sm">Интерактивная карта</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const pageMap: Record<Page, JSX.Element> = {
    home: <HomePage setPage={setPage} />,
    doctors: <DoctorsPage setPage={setPage} />,
    booking: <BookingPage />,
    payments: <PaymentsPage />,
    reviews: <ReviewsPage />,
    notifications: <NotificationsPage />,
    about: <AboutPage />,
  };

  return (
    <div className="min-h-screen">
      <NavBar page={page} setPage={setPage} />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        {pageMap[page]}
      </main>
    </div>
  );
}