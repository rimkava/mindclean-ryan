import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * MindClean – Enhanced Daily Mental Decluttering with Manual Category Selection
 * Warm, elegant design with flame motifs and dual modes: "Vider ma tête" & "Se confier"
 * - Manual category selection with visual category buttons
 * - Two input modes: practical mind dump vs personal confiding
 * - Warm color palette with elegant flame background elements
 * - 4 categories: À faire, À déléguer, Introspection, À oublier
 */

const THEME = {
  primary: "#DC2626", // warm red
  accent: "#F59E0B", // golden amber
  warm: "#FED7AA", // peach
  soft: "#FEF3C7", // soft yellow
};

const COLUMNS = [
  { key: "todo", label: "À faire", icon: "✅", color: "from-orange-400/20 to-red-500/60", bgColor: "bg-gradient-to-br from-orange-50 to-red-50" },
  { key: "delegate", label: "À déléguer", icon: "🤝", color: "from-amber-400/20 to-yellow-500/60", bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50" },
  { key: "introspect", label: "Introspection", icon: "🧘", color: "from-rose-400/20 to-pink-500/60", bgColor: "bg-gradient-to-br from-rose-50 to-pink-50" },
  { key: "forget", label: "À oublier", icon: "🗑️", color: "from-slate-400/20 to-gray-500/60", bgColor: "bg-gradient-to-br from-slate-50 to-gray-50" },
];

const MODES = [
  {
    key: "dump",
    label: "Vider ma tête",
    icon: "🧠",
    description: "Notez rapidement vos tâches et préoccupations quotidiennes",
    placeholder: "Exemples : Appeler le dentiste, Préparer la présentation, Acheter du pain...",
    color: "from-orange-500 to-red-600"
  },
  {
    key: "confide",
    label: "Se confier",
    icon: "💭",
    description: "Exprimez vos émotions et réflexions personnelles en toute intimité",
    placeholder: "Exemples : Je me sens stressé aujourd'hui, J'ai peur de ne pas être à la hauteur, Je suis fier de mes progrès...",
    color: "from-rose-500 to-pink-600"
  }
];

// Enhanced French classification
function classify(text, selectedCategory = null) {
  if (selectedCategory) return selectedCategory;
  
  const t = text.toLowerCase().trim();
  
  const todoKeywords = [
    "appeler", "faire", "payer", "acheter", "terminer", "envoyer", 
    "prendre rdv", "rappeler", "écrire", "préparer", "suivre", 
    "nettoyer", "répondre", "finir", "commencer", "organiser",
    "planifier", "réserver", "confirmer", "vérifier", "envoyer mail"
  ];
  
  const delegateKeywords = [
    "demander", "partager", "assigner", "transmettre", "envoyer à", 
    "prévenir", "faire faire", "donner à", "soumettre", "déléguer",
    "confier", "passer à", "dire à", "informer"
  ];
  
  const introspectKeywords = [
    "je me sens", "j'ai besoin", "je ressens", "j'ai peur", "je doute",
    "je suis fier", "je me demande", "pourquoi je", "j'aimerais être",
    "je me blâme", "je m'inquiète", "je regrette", "je réalise",
    "mes émotions", "mon état", "mes pensées", "ma confiance",
    "accepter", "pardonner", "grandir", "apprendre", "comprendre",
    "gratitude", "reconnaissance", "fierté", "vulnérabilité", "authenticité"
  ];

  // Priority: introspection → todo → delegate → forget
  if (introspectKeywords.some(k => t.includes(k))) return "introspect";
  if (todoKeywords.some(k => t.includes(k))) return "todo";
  if (delegateKeywords.some(k => t.includes(k))) return "delegate";
  
  return "forget";
}

const uid = () => Math.random().toString(36).slice(2, 9);

export default function MindCleanApp() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastDischargeDate, setLastDischargeDate] = useState(null);
  const [bubble, setBubble] = useState(null);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [currentMode, setCurrentMode] = useState("dump");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);



  const currentModeData = MODES.find(m => m.key === currentMode);
  const discharge = () => {
    const text = input.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }

    const col = classify(text, selectedCategory);
    const item = {
      id: uid(),
      text,
      col,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      mode: currentMode
    };

    setItems(prev => [item, ...prev]);
    setBubble({
      text,
      color: COLUMNS.find(c => c.key === col)?.color || "from-orange-400/20 to-red-500/60",
      icon: COLUMNS.find(c => c.key === col)?.icon || "💭"
    });
    setInput("");
    setSelectedCategory(null);
    inputRef.current?.focus();

    // Update streak
    const today = new Date().toDateString();
    if (lastDischargeDate !== today) {
      setStreak(s => (lastDischargeDate ? s + 1 : 1));
      setLastDischargeDate(today);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      discharge();
    }
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const moveItem = (id, newCol) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, col: newCol } : i
    ));
  };

    // Export function
  const exportText = () => {
    const date = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const currentModeItems = items.filter(i => i.mode === currentMode);
    let content = `🔥 MindClean - ${currentMode === 'dump' ? 'Vider ma tête' : 'Se confier'} - Export du ${date}\n`;
    content += `📊 Total: ${currentModeItems.length} éléments • Streak: ${streak} jour${streak > 1 ? 's' : ''}\n`;
    content += `${'='.repeat(50)}\n\n`;

    COLUMNS.forEach(col => {
      const colItems = items.filter(i => i.col === col.key && i.mode === currentMode);
      content += `${col.icon} ${col.label.toUpperCase()} (${colItems.length})\n`;
      content += `-${'-'.repeat(col.label.length + 10)}\n`;

      if (colItems.length === 0) {
        content += "• Aucun élément\n\n";
      } else {
        colItems.forEach(item => {
          const modeIcon = item.mode === 'confide' ? '💭' : '🧠';
          content += `• ${modeIcon} ${item.text}\n`;
        });
        content += "\n";
      }
    });

    content += `\n🔥 Généré par MindClean - Prenez soin de votre flamme intérieure ❤️`;
    return content;
  };

  const share = async () => {
    const text = exportText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "MindClean - Ma décharge mentale",
          text
        });
      } catch (e) {
        console.log('Share cancelled');
      }
    } else {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mindclean_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const weekStats = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateKey = date.toDateString();

      const dayItems = items.filter(item =>
        new Date(item.date).toDateString() === dateKey && item.mode === currentMode
      );

      return {
        label: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        count: dayItems.length,
        date: date
      };
    });

    const total = days.reduce((sum, day) => sum + day.count, 0);
    const maxCount = Math.max(...days.map(d => d.count), 1);

    return { days, total, maxCount };
  }, [items, currentMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 1000);
    if (input.length > 0) setIsTyping(true);
    return () => clearTimeout(timer);
  }, [input]);

  // Category selection buttons
  const CategorySelector = () => (
    <div className="mb-4">
      <p className="text-sm text-slate-600 mb-3">Choisissez une catégorie (optionnel) :</p>
      <div className="flex flex-wrap gap-2">
        {COLUMNS.map(col => (
          <button
            key={col.key}
            onClick={() => setSelectedCategory(selectedCategory === col.key ? null : col.key)}
            className={`px-4 py-2 rounded-2xl border-2 transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
              selectedCategory === col.key
                ? `border-orange-300 ${col.bgColor} shadow-md scale-105`
                : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/50'
            }`}
          >
            <span>{col.icon}</span>
            <span>{col.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Enhanced column component
  const Column = ({ col }) => {
    const columnItems = items.filter(i => i.col === col.key && i.mode === currentMode);

    // Debug: Afficher le nombre d'items par colonne et mode (uniquement en développement)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Column ${col.label} (${currentMode}): ${columnItems.length} items`);
    }

    return (
      <div className={`backdrop-blur-sm border-2 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 min-h-[320px] ${col.bgColor} border-orange-200/30`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-3xl shadow-lg bg-white/80 border-2 border-orange-200/50`}>
              <span className="text-2xl">{col.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">{col.label}</h3>
              <p className="text-sm text-slate-600">
                {columnItems.length} élément{columnItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${col.color} shadow-md`} />
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
          {columnItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              <div
                className="rounded-2xl border-2 border-white/50 bg-white/70 backdrop-blur-sm px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-200/70 hover:bg-white/90 relative cursor-pointer"
                onDoubleClick={() => removeItem(item.id)}
                title="Double-clic pour supprimer rapidement"
              >
                {/* Bouton de suppression rapide - toujours visible */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 border border-red-200 hover:border-red-300 flex items-center justify-center text-red-600 hover:text-red-700 transition-all duration-200 opacity-70 hover:opacity-100 shadow-sm"
                  title="Supprimer cette note"
                >
                  <span className="text-xs font-bold">✕</span>
                </button>

                <div className="flex items-start gap-3 pr-8">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-lg">
                      {item.mode === 'confide' ? '💭' : '🧠'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {item.text}
                    </p>
                    {item.mode === 'confide' && (
                      <div className="mt-2 text-xs text-rose-600 italic font-medium">
                        ❤️ Confidence personnelle
                      </div>
                    )}
                    {/* Indicateur de raccourcis de suppression */}
                    <div className="mt-2 text-xs text-slate-400 opacity-50 flex items-center gap-1">
                      <span>💡</span>
                      <span>Double-clic ou ✕ pour supprimer</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {COLUMNS.filter(c => c.key !== col.key).map(targetCol => (
                    <button
                      key={targetCol.key}
                      onClick={() => moveItem(item.id, targetCol.key)}
                      className="text-xs px-3 py-2 rounded-xl border-2 border-orange-200 bg-white/80 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 flex items-center gap-1 font-medium"
                    >
                      <span>{targetCol.icon}</span>
                      <span>{targetCol.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-xs px-3 py-2 rounded-xl border-2 border-red-200 text-red-600 bg-white/80 hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
          {columnItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 opacity-30">{col.icon}</div>
              <p className="text-sm text-slate-500 italic font-medium">
                {col.key === 'introspect' ? 'Espace pour vos réflexions' : 'Aucun élément'}
              </p>
              {col.key === 'introspect' && (
                <p className="text-xs text-rose-400 mt-2">
                  Exprimez vos émotions en toute bienveillance
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-red-50/50 to-pink-50/30 relative overflow-hidden">
      {/* Elegant flame background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main flame shapes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-t from-red-400 via-orange-300 to-yellow-200 rounded-full blur-3xl transform rotate-12" />
          <div className="absolute inset-4 bg-gradient-to-t from-orange-500 via-red-400 to-pink-300 rounded-full blur-2xl transform -rotate-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-400 via-rose-300 to-orange-200 rounded-full blur-3xl transform -rotate-12" />
        </div>
        
        {/* Subtle accent flames */}
        <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-gradient-to-t from-amber-300 to-yellow-200 rounded-full blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-gradient-to-t from-rose-300 to-pink-200 rounded-full blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b-2 border-orange-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-orange-500 via-red-500 to-pink-500 shadow-2xl flex items-center justify-center border-4 border-white">
                <span className="text-white font-bold text-2xl">🔥</span>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                MindClean
              </h1>
              <p className="text-sm text-slate-600 font-semibold">Libérez votre flamme intérieure</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/90 rounded-3xl border-2 border-orange-200 shadow-lg">
                <span className="text-sm text-slate-700 font-semibold">Streak</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {streak}
                  </span>
                  <span className="text-sm text-slate-600">jour{streak !== 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <button
                onClick={() => setReminderEnabled(v => !v)}
                className={`px-5 py-3 rounded-3xl border-2 shadow-lg transition-all duration-300 font-semibold ${
                  reminderEnabled 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 hover:from-orange-600 hover:to-red-600 shadow-orange-200' 
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm flex items-center gap-2">
                  {reminderEnabled ? <><span>🔔</span> Rappel activé</> : <><span>🔕</span> Rappel désactivé</>}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Mode selector */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm border-2 border-orange-200/50 rounded-3xl p-2 shadow-xl">
            <div className="flex">
              {MODES.map(mode => (
                <button
                  key={mode.key}
                  onClick={() => setCurrentMode(mode.key)}
                  className={`px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-bold text-lg ${
                    currentMode === mode.key
                      ? `bg-gradient-to-r ${mode.color} text-white shadow-lg`
                      : 'text-slate-600 hover:bg-orange-50/70'
                  }`}
                >
                  <span className="text-xl">{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main input card */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-3xl blur-xl" />
          <div className="relative bg-white/95 backdrop-blur-sm border-2 border-orange-200/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
                  <span className="text-4xl">{currentModeData.icon}</span>
                  {currentModeData.label}
                </h2>
                <p className="text-slate-700 text-lg font-medium max-w-2xl mx-auto">
                  {currentModeData.description}
                </p>
              </div>
              
              <CategorySelector />
              
              <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={currentModeData.placeholder}
                    className="w-full min-h-[140px] rounded-3xl border-2 border-orange-200/50 bg-white/90 px-6 py-5 text-slate-800 placeholder-slate-500 outline-none focus:ring-4 focus:ring-orange-200/50 focus:border-orange-300 transition-all duration-300 resize-none font-medium text-base"
                    style={{ fontSize: '16px' }}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm">
                      {isTyping && (
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                          <span className="text-slate-600 font-medium">En cours de saisie...</span>
                        </div>
                      )}
                      {selectedCategory && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-2xl border border-orange-200">
                          <span>{COLUMNS.find(c => c.key === selectedCategory)?.icon}</span>
                          <span className="text-xs font-semibold text-orange-800">
                            → {COLUMNS.find(c => c.key === selectedCategory)?.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Ctrl/Cmd + Entrée pour libérer rapidement
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 xl:w-56">
                  <button
                    onClick={discharge}
                    disabled={!input.trim()}
                    className="group relative rounded-3xl px-8 py-5 font-bold text-white shadow-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-orange-200 hover:scale-105 disabled:hover:scale-100 text-lg"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-2xl">🔥</span>
                      <span>Libérer</span>
                    </span>
                    <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  
                  <button
                    onClick={share}
                    disabled={items.filter(i => i.mode === currentMode).length === 0}
                    className="rounded-3xl px-8 py-5 font-bold border-2 border-orange-300 bg-white/90 hover:bg-orange-50 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg text-lg"
                  >
                    <span className="flex items-center justify-center gap-3 text-slate-700">
                      <span className="text-xl">📤</span>
                      <span>Partager</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bubble animation */}
        {bubble && (
          <div
            key={bubble.text + bubble.icon}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            style={{
              animation: 'bubbleFloat 2.5s ease-out forwards'
            }}
            onAnimationEnd={() => setBubble(null)}
          >
            <div className={`relative p-6 rounded-3xl bg-gradient-to-r ${bubble.color} backdrop-blur-sm border-2 border-white/30 shadow-2xl`}>
              <div className="text-3xl mb-2">{bubble.icon}</div>
              <div className="text-sm font-bold text-slate-800 max-w-[250px] truncate">
                {bubble.text}
              </div>
            </div>
          </div>
        )}

        {/* Columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          {COLUMNS.map(col => (
            <Column key={col.key} col={col} />
          ))}
        </div>

        {/* Statistics section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm border-2 border-orange-200/50 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <span>Votre semaine en flammes</span>
            </h3>
            <p className="text-slate-700 mb-8 text-lg">
              Cette semaine, vous avez libéré{' '}
              <span className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-xl">{weekStats.total}</span>{' '}
              pensées de votre esprit.
            </p>
            
            <div className="flex items-end justify-between gap-4 h-40 bg-gradient-to-t from-orange-50/50 to-transparent rounded-3xl p-6 border border-orange-100">
              {weekStats.days.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-1">
                  <div
                    className={`w-full rounded-t-2xl bg-gradient-to-t ${COLUMNS[i % 4].color} shadow-lg transition-all duration-500 hover:shadow-xl`}
                    style={{
                      height: `${Math.max(12, (day.count / weekStats.maxCount) * 100)}px`,
                      minHeight: '12px'
                    }}
                  />
                  <div className="text-sm font-bold text-slate-700">{day.label}</div>
                  <div className="text-xs text-slate-500 font-semibold">{day.count}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm border-2 border-orange-200/50 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <span>Inspiration du jour</span>
            </h3>
            <div className="space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {items.some(i => i.col === 'introspect')
                  ? "🔥 Chaque émotion exprimée est une flamme qui éclaire votre chemin intérieur."
                  : currentMode === 'confide'
                  ? "💭 Se confier, c'est donner de l'oxygène à sa flamme intérieure."
                  : "🧠 La régularité nourrit la flamme de la sérénité mentale."
                }
              </p>
              
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-5 border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-800">Flamme quotidienne</span>
                  <span className="font-bold text-2xl text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">{streak}</span>
                </div>
                <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-700 shadow-lg"
                    style={{ width: `${Math.min(100, (streak % 30) * (100/29))}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-3 font-medium">
                  Objectif : 30 jours pour une flamme éclatante
                </p>
              </div>

              {items.filter(i => i.col === 'introspect').length > 0 && (
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-5 border border-rose-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-rose-600 text-xl">🧘</span>
                    <span className="text-sm font-bold text-rose-800">Espace sacré</span>
                  </div>
                  <p className="text-xs text-rose-700 font-semibold">
                    {items.filter(i => i.col === 'introspect').length} moment{items.filter(i => i.col === 'introspect').length !== 1 ? 's' : ''} d'introspection cette semaine
                  </p>
                  <p className="text-xs text-rose-600 mt-2 italic">
                    "La flamme qui éclaire le mieux est celle qui brûle dans le cœur" 💖
                  </p>
                </div>
              )}

              {items.filter(i => i.mode === 'confide').length > 0 && (
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-5 border border-amber-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-amber-600 text-xl">💭</span>
                    <span className="text-sm font-bold text-amber-800">Confidences</span>
                  </div>
                  <p className="text-xs text-amber-700 font-semibold">
                    {items.filter(i => i.mode === 'confide').length} confidence{items.filter(i => i.mode === 'confide').length !== 1 ? 's' : ''} partagée{items.filter(i => i.mode === 'confide').length !== 1 ? 's' : ''} avec bienveillance
                  </p>
                  <p className="text-xs text-amber-600 mt-2 italic">
                    "Libérer ses pensées, c'est allumer sa propre lumière" ✨
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-orange-200/50 shadow-lg">
          <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">
            MindClean © {new Date().getFullYear()}
          </p>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            Prenez soin de votre flamme intérieure 🔥❤️
          </p>
        </div>
      </footer>


    </div>
  );
}