import { useEffect, useRef, useState, type ReactNode } from "react";
import { difficultyColor, levels, type Choice, type Level, type Mockup } from "./data/levels";

type Screen = "home" | "simulation" | "feedback";

function ShieldIcon({ check = false }: { check?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4.5 40 11v11.4c0 9.7-6.6 17.6-16 21.1-9.4-3.5-16-11.4-16-21.1V11l16-6.5Z"
        fill="currentColor"
      />
      {check ? (
        <path
          d="m16.2 24.2 5.1 5.2 10.8-11"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d="M24 15v11m0 6.5h.01" stroke="white" strokeWidth="4" strokeLinecap="round" />
      )}
    </svg>
  );
}

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={left ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.2 3.5 11 8.7l-2.3 2c1.2 2.4 2.8 4 5.2 5.2l2-2.3 5.1 2.8c-.5 2.8-2.2 4.1-4.5 4.1-6.8 0-13-6.2-13-13 0-2.2 1.4-3.7 4.7-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.6" fill="currentColor" />
      <path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" fill="currentColor" />
    </svg>
  );
}

function Header({ screen, level, onHome }: { screen: Screen; level: Level; onHome: () => void }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={onHome} aria-label="Voltar para o início">
          <span className="brand-icon">
            <ShieldIcon check />
          </span>
          <span>Simulador Anti-Golpe</span>
        </button>
        {screen !== "home" && (
          <div
            className="progress-wrap"
            aria-label={`Nível ${level.id}, ${screen === "simulation" ? "etapa 1 de 2" : "etapa 2 de 2"}`}
          >
            <span className="progress-label">Nível {level.id}</span>
            <span className="progress-track" aria-hidden="true">
              <span
                className={screen === "feedback" ? "progress-fill complete" : "progress-fill"}
              />
            </span>
            <span className="progress-step">{screen === "simulation" ? "1 de 2" : "2 de 2"}</span>
          </div>
        )}
        <span className="header-note">Ambiente de treino seguro</span>
      </div>
    </header>
  );
}

function HomeScreen({ onStart }: { onStart: (index: number) => void }) {
  return (
    <main className="home-main">
      <section className="hero" aria-labelledby="home-title">
        <span className="eyebrow">
          <span className="eyebrow-icon">
            <ShieldIcon check />
          </span>
          Aprenda com segurança
        </span>
        <h1 id="home-title">Treino Anti-Golpe</h1>
        <p>
          Pratique situações do dia a dia e aprenda a se proteger de golpes digitais.
          <strong> Escolha um nível para começar.</strong>
        </p>
      </section>

      <section className="level-grid" aria-label="Níveis de treinamento">
        {levels.map((level, index) => (
          <article
            className={`level-card level-${difficultyColor[level.difficulty]}`}
            key={level.id}
          >
            <div className="level-card-top">
              <span className="level-number" aria-hidden="true">
                {level.id}
              </span>
              <span className="difficulty">{level.difficulty}</span>
            </div>
            <p className="level-label">Nível {level.id}</p>
            <h2>{level.title}</h2>
            <p className="level-description">{level.description}</p>
            <button
              className="primary-button card-button"
              onClick={() => onStart(index)}
              aria-label={`Começar Nível ${level.id}: ${level.title}`}
            >
              Começar
              <ArrowIcon />
            </button>
          </article>
        ))}
      </section>

      <aside className="reassurance">
        <span className="reassurance-icon">
          <ShieldIcon check />
        </span>
        <div>
          <strong>Pode praticar sem medo</strong>
          <p>Este é um ambiente seguro. Nenhuma ação aqui movimenta dinheiro ou dados reais.</p>
        </div>
      </aside>
    </main>
  );
}

function PhoneFrame({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="phone" role="img" aria-label={label}>
      <div className="phone-speaker" aria-hidden="true" />
      <div className={dark ? "phone-screen phone-screen-dark" : "phone-screen"}>
        <div className="phone-status" aria-hidden="true">
          <span>09:42</span>
          <div className="status-icons">
            <span>●●●</span>
            <svg viewBox="0 0 22 12">
              <path d="M1 10c5-6 15-6 20 0M5 10c3-3 9-3 12 0M9.5 10c1-1 2-1 3 0" />
            </svg>
            <span className="battery" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function WhatsAppMockup({
  mockup,
  label,
}: {
  mockup: Extract<Mockup, { kind: "whatsapp" }>;
  label: string;
}) {
  return (
    <PhoneFrame label={label}>
      <div className="chat-header">
        <span className="back-chevron">
          <ArrowIcon left />
        </span>
        {"photo" in mockup.avatar ? (
          <img src={mockup.avatar.photo} alt="" />
        ) : (
          <span className="chat-avatar" style={{ background: mockup.avatar.color }}>
            {mockup.avatar.initials}
          </span>
        )}
        <div>
          <strong>{mockup.name}</strong>
          <span>{mockup.subtitle}</span>
        </div>
        <svg className="video-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 10 21 6v12l-6-4v-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <rect x="3" y="5" width="12" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <HandsetIcon className="phone-icon" />
      </div>
      <div className="chat-area">
        <span className="date-chip">HOJE</span>
        {mockup.audio ? (
          <>
            <div className="message message-audio">
              <div className="audio-player">
                <span className="audio-play">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="audio-wave">
                  {[6, 12, 18, 9, 22, 14, 7, 19, 11, 24, 15, 8, 17, 10, 20, 13, 6, 16, 9, 12].map(
                    (height, index) => (
                      <i key={index} style={{ height }} />
                    ),
                  )}
                </span>
              </div>
              <span>
                {mockup.audio.duration} · {mockup.time}
              </span>
            </div>
            <div className="audio-transcript">
              <strong>Transcrição do áudio</strong>
              <p>{mockup.audio.transcript}</p>
            </div>
          </>
        ) : (
          <div className="message">
            <p>{mockup.message}</p>
            {mockup.attachment && (
              <div className="chat-attachment">
                <span className="attachment-icon">PDF</span>
                <span>
                  <strong>{mockup.attachment.name}</strong>
                  <small>{mockup.attachment.detail}</small>
                </span>
              </div>
            )}
            <span>{mockup.time}</span>
          </div>
        )}
      </div>
      <div className="chat-input" aria-hidden="true">
        <span>Mensagem</span>
        <span className="chat-send">›</span>
      </div>
    </PhoneFrame>
  );
}

function SmsMockup({ mockup, label }: { mockup: Extract<Mockup, { kind: "sms" }>; label: string }) {
  return (
    <PhoneFrame label={label}>
      <div className="sms-header">
        <span className="sms-back">
          <ArrowIcon left />
        </span>
        <span className="sms-avatar">
          <PersonIcon />
        </span>
        <strong>{mockup.sender}</strong>
        <span>Mensagem de texto · SMS</span>
      </div>
      <div className="sms-area">
        <span className="sms-date">{mockup.time}</span>
        <div className="sms-bubble">
          <p>{mockup.message}</p>
        </div>
        <span className="sms-meta">Entregue</span>
      </div>
      <div className="sms-input" aria-hidden="true">
        <span>Mensagem de texto</span>
        <span className="sms-send">↑</span>
      </div>
    </PhoneFrame>
  );
}

function CallMockup({
  mockup,
  label,
}: {
  mockup: Extract<Mockup, { kind: "call" }>;
  label: string;
}) {
  return (
    <PhoneFrame dark label={label}>
      <div className="call-screen">
        <div className="call-caller">
          <span className="call-status">Chamada de voz · {mockup.duration}</span>
          <span className="call-avatar" aria-hidden="true">
            {mockup.icon === "bank" ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5 12 4l9 5.5H3Z" fill="currentColor" />
                <path
                  d="M5.5 11v6M9.8 11v6M14.2 11v6M18.5 11v6M3.5 19.5h17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect x="3.5" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
                <rect x="16.5" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
                <path
                  d="M18.5 19c0 1.5-2 2.5-5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          <strong>{mockup.caller}</strong>
          <span>{mockup.number}</span>
        </div>
        <div className="call-bubble">
          <span className="call-speaking">
            <i aria-hidden="true" />
            Falando agora
          </span>
          <p>{mockup.speech}</p>
        </div>
        <div className="call-actions" aria-hidden="true">
          <span className="call-button">
            <svg viewBox="0 0 24 24" fill="none">
              <rect
                x="9"
                y="3"
                width="6"
                height="11"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="call-button call-end">
            <HandsetIcon />
          </span>
          <span className="call-button">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4v-5Z" fill="currentColor" />
              <path
                d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SceneMockup({
  mockup,
  label,
}: {
  mockup: Extract<Mockup, { kind: "scene" }>;
  label: string;
}) {
  return (
    <div className="scene" role="img" aria-label={label}>
      <div className="scene-speaker">
        <span className="scene-avatar">
          <PersonIcon />
        </span>
        <span>
          <strong>{mockup.speaker}</strong>
          <small>{mockup.role}</small>
        </span>
      </div>
      <div className="scene-bubble">
        <p>{mockup.speech}</p>
      </div>

      {mockup.scene === "machine" ? (
        <div className="terminal" aria-hidden="true">
          <div className="terminal-screen">
            <span className="terminal-title">CRÉDITO</span>
            <span className="terminal-value">R$ 1.8_ _,00</span>
            <svg className="terminal-crack" viewBox="0 0 160 70" fill="none">
              <path
                d="M92 0 80 22l-22 6 14 12-26 30M80 22l26 8 12 22 26 6M72 40l38 4"
                stroke="#2a3a2a"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <div className="terminal-keys">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "×", "0", "✓"].map((key) => (
              <span key={key} className={key === "×" ? "key-cancel" : key === "✓" ? "key-ok" : ""}>
                {key}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="atm" aria-hidden="true">
          <div className="atm-screen">
            <span>BANCO 24 HORAS</span>
            <strong>Digite sua senha</strong>
            <span className="atm-dots">● ● ● ○</span>
          </div>
          <div className="atm-body">
            <span className="atm-slot" />
            <div className="atm-keys">
              {Array.from({ length: 12 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WifiIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 9a14 14 0 0 1 19 0M5.8 12.4a9.2 9.2 0 0 1 12.4 0M9 15.8a4.5 4.5 0 0 1 6 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19" r="1.6" fill="currentColor" />
    </svg>
  );
}

function WifiMockup({
  mockup,
  label,
}: {
  mockup: Extract<Mockup, { kind: "wifi" }>;
  label: string;
}) {
  return (
    <PhoneFrame label={label}>
      <div className="wifi-screen">
        <div className="wifi-title">
          <span className="sms-back">
            <ArrowIcon left />
          </span>
          <strong>Wi-Fi</strong>
        </div>
        <div className="wifi-toggle-row">
          <span>Usar Wi-Fi</span>
          <span className="wifi-toggle" />
        </div>
        <span className="wifi-section">Redes disponíveis · {mockup.place}</span>
        <ul className="wifi-list">
          {mockup.networks.map((network) => (
            <li key={network.name}>
              <span className="wifi-icon">
                <WifiIcon />
              </span>
              <span className="wifi-name">
                <strong>{network.name}</strong>
                <small>
                  <i aria-hidden="true">!</i>
                  {network.note} · rede aberta
                </small>
              </span>
            </li>
          ))}
        </ul>
        <div className="wifi-context">
          <span className="wifi-context-label">Situação</span>
          <p>{mockup.context}</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function LevelMockup({ level }: { level: Level }) {
  const { mockup, mockupLabel } = level;
  switch (mockup.kind) {
    case "whatsapp":
      return <WhatsAppMockup mockup={mockup} label={mockupLabel} />;
    case "sms":
      return <SmsMockup mockup={mockup} label={mockupLabel} />;
    case "call":
      return <CallMockup mockup={mockup} label={mockupLabel} />;
    case "scene":
      return <SceneMockup mockup={mockup} label={mockupLabel} />;
    case "wifi":
      return <WifiMockup mockup={mockup} label={mockupLabel} />;
  }
}

function SimulationScreen({
  level,
  onChoose,
  onHome,
}: {
  level: Level;
  onChoose: (choice: Choice) => void;
  onHome: () => void;
}) {
  return (
    <main className="simulation-main">
      <button className="back-button" onClick={onHome}>
        <ArrowIcon left />
        Voltar aos níveis
      </button>
      <div className="simulation-heading">
        <div>
          <span className="section-kicker">{level.kicker}</span>
          <h1>{level.heading}</h1>
          <p>{level.intro}</p>
        </div>
        <span className="tip-badge">Não tenha pressa para responder</span>
      </div>
      <div className="simulation-layout">
        <section className="phone-panel" aria-label="Simulação">
          <LevelMockup level={level} />
          <p className="simulation-caption">
            <span aria-hidden="true">i</span>
            Esta é apenas uma simulação. Nada aqui é real.
          </p>
        </section>
        <section className="question-panel" aria-labelledby="question-title">
          <span className="question-count">Sua decisão</span>
          <h2 id="question-title">{level.question}</h2>
          <p>Escolha a atitude que você tomaria. Você poderá tentar novamente.</p>
          <div className="choice-list">
            {level.choices.map((choice, index) => (
              <button key={choice.label} className="choice-button" onClick={() => onChoose(choice)}>
                <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                <span>{choice.label}</span>
                <ArrowIcon />
              </button>
            ))}
          </div>
          <div className="thinking-tip">
            <strong>Antes de escolher, pense:</strong>
            <span>{level.tip}</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeedbackScreen({
  level,
  choice,
  isLastLevel,
  onRetry,
  onNext,
}: {
  level: Level;
  choice: Choice;
  isLastLevel: boolean;
  onRetry: () => void;
  onNext: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const result = choice.partial
    ? {
        className: "feedback-success",
        label: "Acerto, com um alerta",
        title: "Boa noção de risco, mas atenção!",
      }
    : choice.correct
      ? {
          className: "feedback-success",
          label: "Resposta segura",
          title: "Muito bem! Você se protegeu.",
        }
      : {
          className: "feedback-alert",
          label: "Atenção: essa escolha é arriscada",
          title: "Cuidado! Pode ser um golpe.",
        };

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="feedback-main">
      <section className={`feedback-card ${result.className}`} aria-live="polite">
        <div className="result-icon">
          <ShieldIcon check={choice.correct && !choice.partial} />
        </div>
        <span className="result-label">{result.label}</span>
        <h1 ref={headingRef} tabIndex={-1}>
          {choice.title ?? result.title}
        </h1>
        <p className="result-explanation">{choice.feedback}</p>

        <div className="warning-signs">
          <h2>{level.signsTitle}</h2>
          <div className="signs-grid">
            {level.signs.map((sign) => (
              <div key={sign.title}>
                <span className="sign-icon" aria-hidden="true">
                  {sign.icon}
                </span>
                <p>
                  <strong>{sign.title}</strong>
                  {sign.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="golden-rule">
          <span className="golden-icon">
            <ShieldIcon check />
          </span>
          <div>
            <span>Regra de Ouro</span>
            <strong>{level.goldenRule}</strong>
          </div>
        </div>

        <div className="feedback-actions">
          <button className="secondary-button" onClick={onRetry}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5v5h5M5.5 16a8 8 0 1 0 .1-8.2L4 10"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tentar Novamente
          </button>
          <button className="primary-button" onClick={onNext}>
            {isLastLevel ? "Concluir Treino" : "Próximo Nível"}
            <ArrowIcon />
          </button>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice>(levels[0].choices[0]);
  const level = levels[levelIndex];
  const isLastLevel = levelIndex === levels.length - 1;

  const navigate = (nextScreen: Screen) => {
    setScreen(nextScreen);
    window.scrollTo({ top: 0 });
  };

  const startLevel = (index: number) => {
    setLevelIndex(index);
    navigate("simulation");
  };

  return (
    <div className="app-shell">
      <Header screen={screen} level={level} onHome={() => navigate("home")} />
      {screen === "home" && <HomeScreen onStart={startLevel} />}
      {screen === "simulation" && (
        <SimulationScreen
          key={level.id}
          level={level}
          onHome={() => navigate("home")}
          onChoose={(choice) => {
            setSelectedChoice(choice);
            navigate("feedback");
          }}
        />
      )}
      {screen === "feedback" && (
        <FeedbackScreen
          level={level}
          choice={selectedChoice}
          isLastLevel={isLastLevel}
          onRetry={() => navigate("simulation")}
          onNext={() => (isLastLevel ? navigate("home") : startLevel(levelIndex + 1))}
        />
      )}
    </div>
  );
}
