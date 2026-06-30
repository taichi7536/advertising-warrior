import { useEffect, useMemo, useState } from "react";

type Screen =
  | "title"
  | "playing"
  | "failed"
  | "glitch"
  | "thanks";

type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type FakeCloseMark = {
  id: string;
  top: string;
  left: string;
  isReal: boolean;
  size: number;
  opacity: number;
  color: string;
};

type UiTileKind =
  | "real-close-x"
  | "real-close-text"
  | "later-button"
  | "fake-close-decorative"
  | "download-button"
  | "allow-notifications"
  | "skip-link"
  | "fake-plus-button"
  | "continue-button";

type Stage3Tile = {
  id: string;
  kind: UiTileKind;
  isCorrect: boolean;
};

type CaptchaChar = {
  char: string;
  color: string;
  rotate: number;
  offsetY: number;
};

type Stage5Tile = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Stage7Option = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Stage8Ad = {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel?: string;
};

type GlitchPopup = {
  id: string;
  title: string;
  body: string;
  top: string;
  left: string;
  width: string;
};

function App() {
  const [screen, setScreen] = useState<Screen>("title");
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [timeLeft, setTimeLeft] = useState(60);

  const [selectedTileIds, setSelectedTileIds] = useState<string[]>([]);
  const [stage4Input, setStage4Input] = useState("");
  const [stage5Round, setStage5Round] = useState(1);

  const [stage6RealPosition, setStage6RealPosition] = useState({ top: 58, left: 58 });
  const [stage6Flash, setStage6Flash] = useState(false);

  const [stage7Selected, setStage7Selected] = useState<string[]>([]);
  const [stage8Layer, setStage8Layer] = useState(0);
  const [stage8Shake, setStage8Shake] = useState(false);
  const [stage9Step, setStage9Step] = useState(0);

  const [stage10Checked, setStage10Checked] = useState(false);
  const [stage10Error, setStage10Error] = useState("");

  const [glitchPhase, setGlitchPhase] = useState(0);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  }, []);

  const resetRunState = () => {
    setSelectedTileIds([]);
    setStage4Input("");
    setStage5Round(1);
    setStage6RealPosition({ top: 58, left: 58 });
    setStage6Flash(false);
    setStage7Selected([]);
    setStage8Layer(0);
    setStage8Shake(false);
    setStage9Step(0);
    setStage10Checked(false);
    setStage10Error("");
    setGlitchPhase(0);
  };

  const stage2Marks = useMemo<FakeCloseMark[]>(() => {
    return [
      { id: "fake-1", top: "8%", left: "12%", isReal: false, size: 18, opacity: 0.7, color: "#9ca3af" },
      { id: "fake-2", top: "14%", left: "72%", isReal: false, size: 16, opacity: 0.75, color: "#9ca3af" },
      { id: "fake-3", top: "22%", left: "32%", isReal: false, size: 14, opacity: 0.6, color: "#9ca3af" },
      { id: "fake-4", top: "28%", left: "84%", isReal: false, size: 17, opacity: 0.8, color: "#9ca3af" },
      { id: "fake-5", top: "36%", left: "18%", isReal: false, size: 15, opacity: 0.65, color: "#9ca3af" },
      { id: "fake-6", top: "42%", left: "64%", isReal: false, size: 18, opacity: 0.7, color: "#9ca3af" },
      { id: "fake-7", top: "48%", left: "40%", isReal: false, size: 16, opacity: 0.8, color: "#9ca3af" },
      { id: "fake-8", top: "54%", left: "78%", isReal: false, size: 14, opacity: 0.55, color: "#9ca3af" },
      { id: "fake-9", top: "60%", left: "10%", isReal: false, size: 17, opacity: 0.65, color: "#9ca3af" },
      { id: "fake-10", top: "66%", left: "56%", isReal: false, size: 15, opacity: 0.7, color: "#9ca3af" },
      { id: "fake-11", top: "72%", left: "30%", isReal: false, size: 18, opacity: 0.8, color: "#9ca3af" },
      { id: "fake-12", top: "78%", left: "82%", isReal: false, size: 14, opacity: 0.6, color: "#9ca3af" },
      { id: "fake-13", top: "24%", left: "8%", isReal: false, size: 15, opacity: 0.7, color: "#9ca3af" },
      { id: "fake-14", top: "70%", left: "68%", isReal: false, size: 16, opacity: 0.75, color: "#9ca3af" },
      { id: "real-1", top: "64%", left: "82%", isReal: true, size: 18, opacity: 1, color: "#6b7280" },
    ];
  }, []);

  const stage3Tiles = useMemo<Stage3Tile[]>(() => {
    return [
      { id: "tile-1", kind: "real-close-x", isCorrect: true },
      { id: "tile-2", kind: "later-button", isCorrect: false },
      { id: "tile-3", kind: "download-button", isCorrect: false },
      { id: "tile-4", kind: "allow-notifications", isCorrect: false },
      { id: "tile-5", kind: "real-close-text", isCorrect: true },
      { id: "tile-6", kind: "skip-link", isCorrect: false },
      { id: "tile-7", kind: "fake-close-decorative", isCorrect: false },
      { id: "tile-8", kind: "fake-plus-button", isCorrect: false },
      { id: "tile-9", kind: "continue-button", isCorrect: false },
    ];
  }, []);

  const stage4Chars = useMemo<CaptchaChar[]>(() => {
    return [
      { char: "K", color: "#111827", rotate: -8, offsetY: -4 },
      { char: "7", color: "#94a3b8", rotate: 10, offsetY: 6 },
      { char: "M", color: "#111827", rotate: -4, offsetY: 2 },
      { char: "P", color: "#60a5fa", rotate: 12, offsetY: -5 },
      { char: "R", color: "#111827", rotate: -10, offsetY: 5 },
      { char: "8", color: "#94a3b8", rotate: 7, offsetY: -2 },
      { char: "T", color: "#111827", rotate: 4, offsetY: -6 },
      { char: "2", color: "#60a5fa", rotate: -12, offsetY: 6 },
      { char: "L", color: "#111827", rotate: 8, offsetY: 1 },
      { char: "Q", color: "#94a3b8", rotate: -6, offsetY: -3 },
      { char: "H", color: "#111827", rotate: 6, offsetY: 4 },
      { char: "5", color: "#60a5fa", rotate: -9, offsetY: -4 },
      { char: "N", color: "#111827", rotate: 11, offsetY: 3 },
      { char: "4", color: "#94a3b8", rotate: -5, offsetY: 5 },
    ];
  }, []);

  const stage4Answer = useMemo(() => {
    return stage4Chars
      .filter((item) => item.color === "#111827")
      .map((item) => item.char)
      .join("");
  }, [stage4Chars]);

  const stage5Tiles = useMemo<Stage5Tile[]>(() => {
    switch (stage5Round) {
      case 1:
        return [
          { id: "1", label: "🚗", isCorrect: false },
          { id: "2", label: "🐶", isCorrect: false },
          { id: "3", label: "🚦", isCorrect: true },
          { id: "4", label: "🌳", isCorrect: false },
          { id: "5", label: "🚲", isCorrect: false },
          { id: "6", label: "🏠", isCorrect: false },
          { id: "7", label: "🐱", isCorrect: false },
          { id: "8", label: "🚌", isCorrect: false },
          { id: "9", label: "🚶", isCorrect: false },
        ];
      case 2:
        return [
          { id: "1", label: "🛵", isCorrect: false },
          { id: "2", label: "🌲", isCorrect: false },
          { id: "3", label: "🚕", isCorrect: false },
          { id: "4", label: "🚦", isCorrect: true },
          { id: "5", label: "🐸", isCorrect: false },
          { id: "6", label: "🏢", isCorrect: false },
          { id: "7", label: "🚙", isCorrect: false },
          { id: "8", label: "🚴", isCorrect: false },
          { id: "9", label: "🐼", isCorrect: false },
        ];
      default:
        return [
          { id: "1", label: "🌳", isCorrect: false },
          { id: "2", label: "🚦", isCorrect: true },
          { id: "3", label: "🐱", isCorrect: false },
          { id: "4", label: "🚗", isCorrect: false },
          { id: "5", label: "🏠", isCorrect: false },
          { id: "6", label: "🚌", isCorrect: false },
          { id: "7", label: "🚲", isCorrect: false },
          { id: "8", label: "🐶", isCorrect: false },
          { id: "9", label: "🚕", isCorrect: false },
        ];
    }
  }, [stage5Round]);

  const stage6FakeMarks = useMemo(() => {
    return [
      { id: "s6-f1", top: 16, left: 14, size: 18, opacity: 0.75 },
      { id: "s6-f2", top: 22, left: 78, size: 16, opacity: 0.7 },
      { id: "s6-f3", top: 34, left: 22, size: 18, opacity: 0.72 },
      { id: "s6-f4", top: 38, left: 64, size: 17, opacity: 0.68 },
      { id: "s6-f5", top: 52, left: 12, size: 19, opacity: 0.7 },
      { id: "s6-f6", top: 56, left: 82, size: 16, opacity: 0.73 },
      { id: "s6-f7", top: 68, left: 28, size: 18, opacity: 0.7 },
      { id: "s6-f8", top: 74, left: 66, size: 17, opacity: 0.74 },
      { id: "s6-f9", top: 44, left: 46, size: 16, opacity: 0.66 },
    ];
  }, []);

  const stage7Options = useMemo<Stage7Option[]>(() => {
    return [
      { id: "q1", label: "利用規約を読まずに「同意する」を押す", isCorrect: true },
      { id: "q2", label: "パスワードを正確に入力する", isCorrect: false },
      { id: "q3", label: "「あと5分だけ」と言って二度寝する", isCorrect: true },
      { id: "q4", label: "指示された手順を一字一句守る", isCorrect: false },
      { id: "q5", label: "閉まるボタンを何度も連打する", isCorrect: true },
      { id: "q6", label: "エラーが出ても冷静に原因を切り分ける", isCorrect: false },
      { id: "q7", label: "広告の×を押したつもりで広告を開いてしまう", isCorrect: true },
      { id: "q8", label: "与えられたルールを常に守る", isCorrect: false },
    ];
  }, []);

  const stage8Ads = useMemo<Stage8Ad[]>(() => {
    return [
      {
        title: "お得な情報をお見逃しなく",
        body: "閉じたつもりでも、より良い広告体験のために次のご案内を表示します。",
        primaryLabel: "閉じる",
        secondaryLabel: "今はしない",
      },
      {
        title: "さらに便利な認証はこちら",
        body: "ワンクリックで登録できます。たぶん閉じるよりもこちらがおすすめです。",
        primaryLabel: "スキップ",
        secondaryLabel: "登録しない",
      },
      {
        title: "まもなく広告を終了します",
        body: "この広告は終了しかけています。念のため、もう一度だけ操作してください。",
        primaryLabel: "続行せずに進む",
        secondaryLabel: "後で閉じる",
      },
      {
        title: "最後のご案内です",
        body: "本当に最後かもしれません。人間らしい忍耐力が試されています。",
        primaryLabel: "本当に閉じる",
        secondaryLabel: "おすすめを見る",
      },
    ];
  }, []);

  const stage9Messages = useMemo(() => {
    return [
      { title: "あと一歩です", percent: 98, button: "次へ", sub: "認証はほぼ完了しています。" },
      { title: "まもなく完了します", percent: 99, button: "続行", sub: "最終段階の確認中です。" },
      { title: "もう少しで認証が終わります", percent: 99, button: "確認", sub: "安全性のために追加確認を行っています。" },
      { title: "最終確認中です", percent: 99.1, button: "完了まで進む", sub: "人間らしさの最終判定をしています。" },
      { title: "ほぼ完了しています", percent: 99.2, button: "次の確認へ", sub: "あと少しだけお待ちください。" },
    ];
  }, []);

  const glitchPopups = useMemo<GlitchPopup[]>(() => {
    return [
      {
        id: "g1",
        title: "SYSTEM ERROR",
        body: "Unexpected human behavior detected.",
        top: "10%",
        left: "8%",
        width: "min(260px, 72vw)",
      },
      {
        id: "g2",
        title: "SECURITY ALERT",
        body: "Excessive button mashing recorded.",
        top: "18%",
        left: "52%",
        width: "min(250px, 68vw)",
      },
      {
        id: "g3",
        title: "UNKNOWN INPUT",
        body: "Too much emotion in interaction pattern.",
        top: "38%",
        left: "14%",
        width: "min(280px, 74vw)",
      },
      {
        id: "g4",
        title: "ACCESS WARNING",
        body: "Human detected. System unstable.",
        top: "52%",
        left: "48%",
        width: "min(240px, 66vw)",
      },
      {
        id: "g5",
        title: "ERROR 0xHUMAN",
        body: "Please do not close this window.",
        top: "66%",
        left: "20%",
        width: "min(250px, 72vw)",
      },
      {
        id: "g6",
        title: "OVERRIDE FAILED",
        body: "Robot mode unavailable.",
        top: "30%",
        left: "62%",
        width: "min(220px, 64vw)",
      },
    ];
  }, []);

  useEffect(() => {
    if (screen !== "playing") return;

    if (timeLeft <= 0) {
      setScreen("failed");
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [screen, timeLeft]);

  useEffect(() => {
    if (screen !== "playing" || currentStage !== 6) return;

    const moveInterval = window.setInterval(() => {
      setStage6RealPosition({
        top: 24 + Math.random() * 42,
        left: 16 + Math.random() * 56,
      });
    }, 2400);

    return () => window.clearInterval(moveInterval);
  }, [screen, currentStage]);

  useEffect(() => {
    if (screen !== "glitch") return;

    setGlitchPhase(1);

    const t1 = window.setTimeout(() => setGlitchPhase(2), 700);
    const t2 = window.setTimeout(() => setGlitchPhase(3), 1500);
    const t3 = window.setTimeout(() => setScreen("thanks"), 2500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [screen]);

  const startGame = () => {
    setCurrentStage(1);
    setTimeLeft(60);
    resetRunState();
    setScreen("playing");
  };

  const restartCurrentStage = () => {
    setTimeLeft(60);

    if (currentStage === 3) setSelectedTileIds([]);
    if (currentStage === 4) setStage4Input("");
    if (currentStage === 5) setStage5Round(1);

    if (currentStage === 6) {
      setStage6RealPosition({ top: 58, left: 58 });
      setStage6Flash(false);
    }

    if (currentStage === 7) setStage7Selected([]);
    if (currentStage === 8) {
      setStage8Layer(0);
      setStage8Shake(false);
    }
    if (currentStage === 9) setStage9Step(0);
    if (currentStage === 10) {
      setStage10Checked(false);
      setStage10Error("");
    }

    setScreen("playing");
  };

  const goToTitle = () => {
    setCurrentStage(1);
    setTimeLeft(60);
    resetRunState();
    setScreen("title");
  };

  const goToNextStage = (stage: Stage) => {
    setCurrentStage(stage);
    setTimeLeft(60);
  };

  const handleStage1Clear = () => {
    goToNextStage(2);
  };

  const handleStage2RealClick = () => {
    goToNextStage(3);
    setSelectedTileIds([]);
  };

  const handleStage2FakeClick = () => {
    setTimeLeft((prev) => Math.max(prev - 3, 0));
  };

  const toggleStage3Tile = (tileId: string) => {
    setSelectedTileIds((prev) =>
      prev.includes(tileId) ? prev.filter((id) => id !== tileId) : [...prev, tileId]
    );
  };

  const handleStage3Submit = () => {
    const correctIds = stage3Tiles
      .filter((tile) => tile.isCorrect)
      .map((tile) => tile.id)
      .sort();

    const selectedIds = [...selectedTileIds].sort();

    const isCorrect =
      correctIds.length === selectedIds.length &&
      correctIds.every((id, index) => id === selectedIds[index]);

    if (isCorrect) {
      goToNextStage(4);
      setStage4Input("");
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 5, 0));
  };

  const handleStage4Submit = () => {
    const normalized = stage4Input.trim().toUpperCase();

    if (normalized === stage4Answer) {
      goToNextStage(5);
      setStage5Round(1);
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 5, 0));
  };

  const handleStage5Click = (isCorrect: boolean) => {
    if (!isCorrect) {
      setTimeLeft((prev) => Math.max(prev - 5, 0));
      return;
    }

    if (stage5Round < 3) {
      setStage5Round((prev) => prev + 1);
      return;
    }

    goToNextStage(6);
    setStage6RealPosition({ top: 58, left: 58 });
  };

  const handleStage6RealClick = () => {
    goToNextStage(7);
    setStage7Selected([]);
  };

  const handleStage6FakeClick = () => {
    setStage6Flash(true);
    setTimeLeft((prev) => Math.max(prev - 2, 0));
    window.setTimeout(() => setStage6Flash(false), 180);
  };

  const toggleStage7Option = (id: string) => {
    setStage7Selected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStage7Submit = () => {
    const correctIds = stage7Options
      .filter((item) => item.isCorrect)
      .map((item) => item.id)
      .sort();

    const selectedIds = [...stage7Selected].sort();

    const isCorrect =
      correctIds.length === selectedIds.length &&
      correctIds.every((id, index) => id === selectedIds[index]);

    if (isCorrect) {
      goToNextStage(8);
      setStage8Layer(0);
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 6, 0));
  };

  const handleStage8PrimaryClick = () => {
    if (stage8Layer < stage8Ads.length - 1) {
      setStage8Layer((prev) => prev + 1);
      setStage8Shake(true);
      window.setTimeout(() => setStage8Shake(false), 220);
      return;
    }

    goToNextStage(9);
    setStage9Step(0);
  };

  const handleStage8SecondaryClick = () => {
    setTimeLeft((prev) => Math.max(prev - 4, 0));
    setStage8Shake(true);
    window.setTimeout(() => setStage8Shake(false), 220);
  };

  const handleStage9Next = () => {
    if (stage9Step < stage9Messages.length - 1) {
      setStage9Step((prev) => prev + 1);
      return;
    }

    goToNextStage(10);
    setStage10Checked(false);
    setStage10Error("");
  };

  const handleStage10Submit = () => {
    if (!stage10Checked) {
      setStage10Error("チェックを入れてから認証を完了してください。");
      setTimeLeft((prev) => Math.max(prev - 5, 0));
      return;
    }

    setScreen("glitch");
  };

  const renderStage3Tile = (kind: UiTileKind) => {
    const frameStyle: React.CSSProperties = {
      position: "relative",
      height: "128px",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
    };

    switch (kind) {
      case "real-close-x":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eef2f7 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: "10px",
                fontSize: "11px",
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              お知らせ
            </div>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "8px",
                width: "16px",
                height: "16px",
                color: "#64748b",
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
              }}
            >
              ×
            </div>
            <div
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                top: "36px",
                height: "10px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                width: "68%",
                top: "54px",
                height: "8px",
                background: "#cbd5e1",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                width: "54%",
                top: "70px",
                height: "8px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            />
          </div>
        );

      case "real-close-text":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "14px",
                fontSize: "12px",
                color: "#334155",
                fontWeight: 700,
              }}
            >
              配信は終了しました
            </div>
            <button
              style={{
                position: "absolute",
                right: "12px",
                bottom: "12px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#475569",
                fontSize: "12px",
                borderRadius: "999px",
                padding: "6px 10px",
                cursor: "default",
              }}
            >
              閉じる
            </button>
            <div
              style={{
                position: "absolute",
                left: "14px",
                right: "14px",
                top: "44px",
                height: "8px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                width: "58%",
                top: "60px",
                height: "8px",
                background: "#cbd5e1",
                borderRadius: "999px",
              }}
            />
          </div>
        );

      case "later-button":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                top: "18px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                会員登録で続きをご利用いただけます
              </div>
              <button
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#64748b",
                  fontSize: "11px",
                  borderRadius: "999px",
                  padding: "5px 9px",
                  cursor: "default",
                }}
              >
                後で
              </button>
            </div>
          </div>
        );

      case "fake-close-decorative":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "14px",
                fontSize: "28px",
                color: "#b45309",
                fontWeight: 800,
                transform: "rotate(8deg)",
              }}
            >
              ×
            </div>
            <div
              style={{
                position: "absolute",
                left: "14px",
                bottom: "14px",
                fontSize: "12px",
                color: "#92400e",
                fontWeight: 700,
              }}
            >
              特集バナー
            </div>
          </div>
        );

      case "download-button":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
              }}
            />
            <button
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "14px",
                borderRadius: "999px",
                padding: "10px 18px",
                fontWeight: 700,
                cursor: "default",
                boxShadow: "0 8px 18px rgba(37,99,235,0.22)",
              }}
            >
              ダウンロード
            </button>
            <div
              style={{
                position: "absolute",
                right: "12px",
                bottom: "10px",
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              推奨
            </div>
          </div>
        );

      case "allow-notifications":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                top: "18px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                通知を許可しますか？
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#475569",
                    fontSize: "11px",
                    borderRadius: "8px",
                    padding: "6px 0",
                    cursor: "default",
                  }}
                >
                  拒否
                </button>
                <button
                  style={{
                    flex: 1,
                    border: "none",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontSize: "11px",
                    borderRadius: "8px",
                    padding: "6px 0",
                    cursor: "default",
                  }}
                >
                  許可
                </button>
              </div>
            </div>
          </div>
        );

      case "skip-link":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "18px",
                width: "60%",
                height: "8px",
                background: "#cbd5e1",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "34px",
                width: "46%",
                height: "8px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            />
            <a
              style={{
                position: "absolute",
                right: "12px",
                bottom: "12px",
                fontSize: "12px",
                color: "#2563eb",
                textDecoration: "underline",
                cursor: "default",
              }}
            >
              スキップ
            </a>
          </div>
        );

      case "fake-plus-button":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eef2f7 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "9px",
                top: "7px",
                width: "12px",
                height: "12px",
                color: "#64748b",
                fontSize: "12px",
                lineHeight: "12px",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              +
            </div>
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "16px",
                width: "72%",
                height: "8px",
                background: "#cbd5e1",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "34px",
                width: "54%",
                height: "8px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                bottom: "14px",
                height: "50px",
                background: "#dbeafe",
                borderRadius: "8px",
                opacity: 0.7,
              }}
            />
          </div>
        );

      case "continue-button":
        return (
          <div style={frameStyle}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "18px",
                fontSize: "12px",
                color: "#475569",
                fontWeight: 700,
              }}
            >
              続行するには確認が必要です
            </div>
            <button
              style={{
                position: "absolute",
                left: "50%",
                bottom: "16px",
                transform: "translateX(-50%)",
                border: "none",
                background: "#10b981",
                color: "#ffffff",
                fontSize: "13px",
                borderRadius: "999px",
                padding: "10px 18px",
                fontWeight: 700,
                cursor: "default",
              }}
            >
              続行
            </button>
          </div>
        );
    }
  };

  const renderStage4Captcha = () => {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "180px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          padding: "28px 24px 24px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(148,163,184,0.14) 0%, rgba(255,255,255,0) 35%, rgba(96,165,250,0.08) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "28%",
            width: "90%",
            height: "2px",
            background: "rgba(59,130,246,0.25)",
            transform: "rotate(-7deg)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "52%",
            width: "84%",
            height: "2px",
            background: "rgba(100,116,139,0.22)",
            transform: "rotate(5deg)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "14%",
            top: "68%",
            width: "72%",
            height: "2px",
            background: "rgba(59,130,246,0.18)",
            transform: "rotate(-3deg)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "8px",
            minHeight: "100px",
            paddingTop: "20px",
          }}
        >
          {stage4Chars.map((item, index) => (
            <span
              key={`${item.char}-${index}`}
              style={{
                display: "inline-block",
                fontSize: isMobile ? "30px" : "38px",
                fontWeight: 800,
                letterSpacing: "0.02em",
                color: item.color,
                transform: `translateY(${item.offsetY}px) rotate(${item.rotate}deg)`,
                textShadow:
                  item.color === "#111827"
                    ? "1px 1px 0 rgba(255,255,255,0.35)"
                    : "1px 1px 0 rgba(148,163,184,0.18)",
                userSelect: "none",
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (screen === "title") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f4f6",
          color: "#111827",
          fontFamily: "sans-serif",
          padding: "16px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: isMobile ? "28px 20px" : "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#2563eb", fontWeight: 700 }}>
            HUMAN VERIFICATION PORTAL
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: isMobile ? "32px" : "40px" }}>
            あなたはロボットですか？
          </h1>

          <p style={{ marginBottom: "12px", fontSize: isMobile ? "16px" : "18px" }}>
            快適ではない認証体験を提供しています。
          </p>

          <p style={{ marginBottom: "32px", color: "#4b5563", lineHeight: 1.7 }}>
            ネット上のイライラを最後まで乗り越えた者だけが、人間と認められます。
          </p>

          <button
            onClick={startGame}
            style={{
              minHeight: "48px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "14px 24px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            認証を開始
          </button>
        </section>
      </main>
    );
  }

  if (screen === "failed") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f4f6",
          color: "#111827",
          fontFamily: "sans-serif",
          padding: "16px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: isMobile ? "28px 20px" : "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#dc2626", fontWeight: 700 }}>
            VERIFICATION FAILED
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: isMobile ? "30px" : "36px" }}>
            認証に失敗しました。
          </h1>

          <p style={{ marginBottom: "32px", color: "#4b5563", lineHeight: 1.7 }}>
            人間としては少し不自然な結果です。
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={restartCurrentStage}
              style={{
                minHeight: "48px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              もう一度試す
            </button>

            <button
              onClick={goToTitle}
              style={{
                minHeight: "48px",
                background: "#ffffff",
                color: "#111827",
                border: "1px solid #d1d5db",
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              タイトルへ戻る
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "glitch") {
    return (
      <main
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background:
            glitchPhase >= 2
              ? "linear-gradient(180deg, #120000 0%, #000000 100%)"
              : "linear-gradient(180deg, #220000 0%, #050505 100%)",
          color: "#ffffff",
          fontFamily: "monospace",
          padding: "16px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              glitchPhase === 1
                ? "rgba(255,0,0,0.08)"
                : glitchPhase === 2
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,0,0,0.12)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "960px",
            margin: "0 auto",
            paddingTop: isMobile ? "32px" : "60px",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: 900,
              color: "#ff4d4f",
              marginBottom: "12px",
              letterSpacing: "0.04em",
            }}
          >
            {glitchPhase === 1
              ? "SYSTEM ERROR"
              : glitchPhase === 2
              ? "HUMAN DETECTED"
              : "UNSTABLE BEHAVIOR"}
          </div>

          <p
            style={{
              margin: 0,
              color: "#fca5a5",
              fontSize: isMobile ? "14px" : "18px",
              lineHeight: 1.7,
            }}
          >
            {glitchPhase === 1
              ? "認証処理中に予期しない人間らしさが検出されました。"
              : glitchPhase === 2
              ? "感情的なクリック挙動が多すぎます。"
              : "ロボット向け最適化モードの継続に失敗しました。"}
          </p>
        </div>

        {glitchPopups.slice(0, glitchPhase + 3).map((popup, index) => (
          <div
            key={popup.id}
            style={{
              position: "absolute",
              top: popup.top,
              left: popup.left,
              width: popup.width,
              maxWidth: "80vw",
              background: "#fff",
              color: "#111827",
              border: "2px solid #ef4444",
              borderRadius: "12px",
              boxShadow: "0 18px 34px rgba(0,0,0,0.35)",
              zIndex: 10 + index,
              transform: glitchPhase === 2 && index % 2 === 0 ? "translateX(6px)" : "translateX(0)",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                background: "#ef4444",
                color: "#fff",
                fontWeight: 800,
                fontSize: "12px",
              }}
            >
              {popup.title}
            </div>
            <div style={{ padding: "12px 14px", fontSize: "13px", lineHeight: 1.6 }}>
              {popup.body}
            </div>
          </div>
        ))}
      </main>
    );
  }

  if (screen === "thanks") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f4f6",
          color: "#111827",
          fontFamily: "sans-serif",
          padding: "16px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "760px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: isMobile ? "28px 20px" : "44px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#16a34a", fontWeight: 700 }}>
            THANK YOU
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: isMobile ? "30px" : "38px" }}>
            遊んでくれてありがとう。
          </h1>

          <p style={{ marginBottom: "10px", fontSize: isMobile ? "22px" : "28px", fontWeight: 800 }}>
            おめでとうございます。
          </p>

          <p style={{ marginBottom: "18px", fontSize: isMobile ? "20px" : "26px", fontWeight: 800 }}>
            あなたは人間です。
          </p>

          <p style={{ marginBottom: "32px", color: "#4b5563", lineHeight: 1.7 }}>
            ここまで不合理なUIに耐え、何度も押し間違え、それでも最後まで進んでくれたあなたは完全に人間でした。
          </p>

          <button
            onClick={goToTitle}
            style={{
              minHeight: "48px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "999px",
              padding: "14px 24px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            もう一度認証する
          </button>
        </section>
      </main>
    );
  }


  const stage9Current = stage9Messages[stage9Step];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e5e7eb",
        color: "#111827",
        fontFamily: "sans-serif",
        padding: isMobile ? "12px" : "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #d1d5db",
          borderRadius: "16px",
          padding: isMobile ? "16px" : "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <strong>STAGE {currentStage} / 10</strong>
          <span>残り {timeLeft}秒</span>
        </div>

        {currentStage === 1 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>広告を閉じてください</h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              このお知らせは快適性向上のために表示されています。
            </p>

            <div
              style={{
                position: "relative",
                minHeight: isMobile ? "420px" : "480px",
                borderRadius: "16px",
                background: "rgba(0, 0, 0, 0.35)",
                overflow: "hidden",
                padding: isMobile ? "18px" : "32px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "680px",
                  margin: "40px auto 0",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: isMobile ? "24px 18px" : "32px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                }}
              >
                <button
                  onClick={handleStage1Clear}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "28px",
                    height: "28px",
                    border: "none",
                    background: "transparent",
                    color: "#9ca3af",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>

                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#2563eb",
                    fontWeight: 700,
                  }}
                >
                  おすすめのお知らせ
                </p>

                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: isMobile ? "22px" : "28px" }}>
                  今すぐ登録して、さらに認証しましょう
                </h3>

                <p style={{ margin: 0, lineHeight: 1.7, color: "#374151" }}>
                  このポップアップは円滑な認証体験のために表示されています。
                  閉じる操作は右上付近からお試しください。
                </p>
              </div>
            </div>
          </>
        ) : currentStage === 2 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              本物の閉じるボタンを押してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              誤った終了操作は認証精度の低下につながります。
            </p>

            <div
              style={{
                position: "relative",
                minHeight: isMobile ? "440px" : "480px",
                borderRadius: "16px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,0.18) 0%, rgba(17,24,39,0.32) 100%)",
                overflow: "hidden",
                padding: isMobile ? "16px" : "32px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "720px",
                  margin: "24px auto 0",
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: isMobile ? "24px 18px" : "32px",
                  minHeight: "320px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#2563eb",
                    fontWeight: 700,
                  }}
                >
                  重要なお知らせ
                </p>

                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: isMobile ? "22px" : "28px" }}>
                  閉じる前に、適切な閉じる操作をお選びください
                </h3>

                <p style={{ margin: 0, lineHeight: 1.7, color: "#374151", maxWidth: "500px" }}>
                  終了操作の品質を保つため、正しい終了位置を慎重にお選びください。
                  不適切な終了は時間的損失につながる場合があります。
                </p>

                {stage2Marks.map((mark) => (
                  <button
                    key={mark.id}
                    onClick={mark.isReal ? handleStage2RealClick : handleStage2FakeClick}
                    style={{
                      position: "absolute",
                      top: mark.top,
                      left: mark.left,
                      width: `${mark.size + 12}px`,
                      height: `${mark.size + 12}px`,
                      border: "none",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.75)",
                      color: mark.color,
                      fontSize: "14px",
                      cursor: "pointer",
                      opacity: mark.opacity,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ×
                  </button>
                ))}

                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "18px",
                    right: "18px",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  閉じる操作に迷った場合でも、落ち着いてお探しください。
                </div>
              </div>
            </div>
          </>
        ) : currentStage === 3 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              有効な閉じる操作をすべて選択してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              終了の意思が確認できる操作のみ有効です。見た目が似ていても油断しないでください。
            </p>

            <div
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.14) 100%)",
                padding: isMobile ? "16px" : "24px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {stage3Tiles.map((tile) => {
                  const selected = selectedTileIds.includes(tile.id);

                  return (
                    <button
                      key={tile.id}
                      onClick={() => toggleStage3Tile(tile.id)}
                      style={{
                        border: selected ? "3px solid #2563eb" : "1px solid #cbd5e1",
                        background: "#ffffff",
                        borderRadius: "14px",
                        padding: "10px",
                        cursor: "pointer",
                        boxShadow: selected
                          ? "0 0 0 4px rgba(37,99,235,0.12)"
                          : "0 4px 14px rgba(0,0,0,0.06)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {renderStage3Tile(tile.kind)}

                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#475569",
                          textAlign: "center",
                        }}
                      >
                        UI 断片
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                  すべて選んだつもりでも、もう一度ご確認ください。
                </p>

                <button
                  onClick={handleStage3Submit}
                  style={{
                    minHeight: "48px",
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 22px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  確認
                </button>
              </div>
            </div>
          </>
        ) : currentStage === 4 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              黒い文字だけを左から順に入力してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              表示内容を過不足なくご確認ください。不要な文字まで読む必要はありません。
            </p>

            <div
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.14) 100%)",
                padding: isMobile ? "16px" : "24px",
              }}
            >
              <div style={{ marginBottom: "22px" }}>{renderStage4Captcha()}</div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <input
                  value={stage4Input}
                  onChange={(event) => setStage4Input(event.target.value.toUpperCase())}
                  placeholder="ここに入力"
                  style={{
                    flex: "1 1 280px",
                    minWidth: "220px",
                    minHeight: "48px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#111827",
                    background: "#ffffff",
                    outline: "none",
                  }}
                />

                <button
                  onClick={handleStage4Submit}
                  style={{
                    minHeight: "48px",
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 22px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  送信
                </button>
              </div>

              <p
                style={{
                  margin: "14px 0 0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                文字数が多く見えても、必要なのは一部だけです。
              </p>
            </div>
          </>
        ) : currentStage === 5 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              信号機が写っている画像を選択してください
            </h2>

            <p
              style={{
                marginTop: 0,
                marginBottom: "24px",
                color: "#4b5563",
              }}
            >
              選択後、新しい画像が読み込まれる場合があります。現在 {stage5Round} / 3 回目です。
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))",
                gap: "12px",
              }}
            >
              {stage5Tiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleStage5Click(tile.isCorrect)}
                  style={{
                    minHeight: isMobile ? "88px" : "120px",
                    fontSize: isMobile ? "36px" : "48px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {tile.label}
                </button>
              ))}
            </div>
          </>
        ) : currentStage === 6 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              動く本物の×を押してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              本物の×はゆっくり動きます。偽物を押すと2秒減ります。
            </p>

            <div
              style={{
                position: "relative",
                minHeight: isMobile ? "420px" : "500px",
                borderRadius: "16px",
                overflow: "hidden",
                border: stage6Flash ? "2px solid #ef4444" : "1px solid #d1d5db",
                background: stage6Flash
                  ? "linear-gradient(180deg, rgba(254,226,226,0.9) 0%, rgba(255,255,255,1) 100%)"
                  : "linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.16) 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: isMobile ? "14px" : "22px",
                  background: "#ffffff",
                  borderRadius: "14px",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: isMobile ? "18px" : "22px",
                    fontWeight: 700,
                    color: "#334155",
                  }}
                >
                  認証用広告を閉じてください
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: "80px 16px 16px 16px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.95) 100%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />

                {stage6FakeMarks.map((mark) => (
                  <button
                    key={mark.id}
                    onClick={handleStage6FakeClick}
                    style={{
                      position: "absolute",
                      top: `${mark.top}%`,
                      left: `${mark.left}%`,
                      width: `${mark.size + 16}px`,
                      height: `${mark.size + 16}px`,
                      border: "none",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.82)",
                      color: "#94a3b8",
                      opacity: mark.opacity,
                      fontSize: `${mark.size}px`,
                      lineHeight: 1,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      zIndex: 10,
                    }}
                  >
                    ×
                  </button>
                ))}

                <button
                  onClick={handleStage6RealClick}
                  style={{
                    position: "absolute",
                    top: `${stage6RealPosition.top}%`,
                    left: `${stage6RealPosition.left}%`,
                    width: isMobile ? "46px" : "42px",
                    height: isMobile ? "46px" : "42px",
                    border: "1px solid #d1d5db",
                    borderRadius: "999px",
                    background: "#ffffff",
                    color: "#111827",
                    fontSize: isMobile ? "28px" : "26px",
                    fontWeight: 900,
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.16)",
                    transition: "top 0.45s ease, left 0.45s ease",
                    zIndex: 30,
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          </>
        ) : currentStage === 7 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              ロボットが行わず、人間だけが行う行動をすべて選択してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              常識的すぎるものは、むしろロボットらしいかもしれません。
            </p>

            <div
              style={{
                display: "grid",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {stage7Options.map((option) => {
                const selected = stage7Selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleStage7Option(option.id)}
                    style={{
                      minHeight: "54px",
                      textAlign: "left",
                      border: selected ? "2px solid #2563eb" : "1px solid #d1d5db",
                      background: selected ? "#eff6ff" : "#ffffff",
                      color: "#111827",
                      borderRadius: "12px",
                      padding: "16px",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ marginRight: "10px", color: selected ? "#2563eb" : "#64748b" }}>
                      {selected ? "☑" : "☐"}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleStage7Submit}
              style={{
                minHeight: "48px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "12px 22px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              回答する
            </button>
          </>
        ) : currentStage === 8 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              広告を閉じて先へ進んでください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              押した瞬間に別の広告が出ても、あきらめないでください。
            </p>

            <div
              style={{
                position: "relative",
                minHeight: isMobile ? "520px" : "460px",
                borderRadius: "16px",
                background: `rgba(15, 23, 42, ${0.12 + stage8Layer * 0.1})`,
                overflow: "hidden",
                padding: isMobile ? "12px" : "24px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: isMobile ? "12px" : "24px",
                  background: "#ffffff",
                  borderRadius: "12px",
                }}
              />

              {stage8Ads.slice(0, stage8Layer + 1).map((ad, index) => {
                const isTop = index === stage8Layer;
                const leftBase = isMobile ? 12 : 120;
                const topBase = isMobile ? 24 : 48;
                const offsetX = isMobile ? index * 8 : index * 22;
                const offsetY = isMobile ? index * 12 : index * 18;

                return (
                  <div
                    key={`${ad.title}-${index}`}
                    style={{
                      position: "absolute",
                      left: `${leftBase + offsetX}px`,
                      top: `${topBase + offsetY}px`,
                      width: isMobile
                        ? "calc(100% - 24px)"
                        : "min(520px, calc(100% - 80px))",
                      background: "#ffffff",
                      border: "1px solid #d1d5db",
                      borderRadius: "16px",
                      padding: isMobile ? "18px 16px" : "24px",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
                      transform: isTop && stage8Shake ? "translateX(6px)" : "translateX(0px)",
                      transition: "transform 0.15s ease",
                      zIndex: 10 + index,
                      pointerEvents: isTop ? "auto" : "none",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#2563eb",
                      }}
                    >
                      SPONSORED MESSAGE
                    </div>

                    <h3 style={{ margin: "0 0 12px", fontSize: isMobile ? "22px" : "28px" }}>
                      {ad.title}
                    </h3>

                    <p style={{ margin: "0 0 22px", color: "#4b5563", lineHeight: 1.7 }}>
                      {ad.body}
                    </p>

                    {isTop ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={handleStage8PrimaryClick}
                          style={{
                            minHeight: "48px",
                            background: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "999px",
                            padding: "12px 22px",
                            fontSize: "15px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {ad.primaryLabel}
                        </button>

                        <button
                          onClick={handleStage8SecondaryClick}
                          style={{
                            minHeight: "48px",
                            background: "#ffffff",
                            color: "#334155",
                            border: "1px solid #cbd5e1",
                            borderRadius: "999px",
                            padding: "12px 22px",
                            fontSize: "15px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {ad.secondaryLabel ?? "今はしない"}
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          background: "#f1f5f9",
                          color: "#64748b",
                          borderRadius: "999px",
                          padding: "10px 16px",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        既読の広告
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : currentStage === 9 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              あと一歩です
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              認証はほぼ完了しています。たぶん。
            </p>

            <div
              style={{
                maxWidth: "720px",
                border: "1px solid #d1d5db",
                borderRadius: "16px",
                padding: isMobile ? "20px 16px" : "28px",
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  color: "#2563eb",
                  fontWeight: 800,
                  fontSize: "12px",
                }}
              >
                FINALIZING
              </div>

              <h3 style={{ margin: "0 0 14px", fontSize: isMobile ? "24px" : "30px" }}>
                {stage9Current.title}
              </h3>

              <div
                style={{
                  width: "100%",
                  height: "18px",
                  borderRadius: "999px",
                  background: "#e5e7eb",
                  overflow: "hidden",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: `${stage9Current.percent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                    transition: "width 0.35s ease",
                  }}
                />
              </div>

              <p style={{ margin: "0 0 22px", color: "#4b5563", lineHeight: 1.7 }}>
                進捗: {stage9Current.percent}%
                <br />
                {stage9Current.sub}
              </p>

              <button
                onClick={handleStage9Next}
                style={{
                  minHeight: "48px",
                  background: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "12px 22px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {stage9Current.button}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              最終確認
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              最後に、自分が人間であることを確認してください。
            </p>

            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "16px",
                padding: isMobile ? "18px 16px" : "24px",
                background: "#ffffff",
                maxWidth: "720px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  marginBottom: "18px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={stage10Checked}
                  onChange={(e) => {
                    setStage10Checked(e.target.checked);
                    setStage10Error("");
                  }}
                  style={{ width: "18px", height: "18px", flexShrink: 0 }}
                />
                <span style={{ fontWeight: 700 }}>私は人間です</span>
              </label>

              {stage10Error ? (
                <p
                  style={{
                    margin: "0 0 16px",
                    color: "#dc2626",
                    fontWeight: 700,
                  }}
                >
                  {stage10Error}
                </p>
              ) : null}

              <button
                onClick={handleStage10Submit}
                style={{
                  minHeight: "48px",
                  background: "#16a34a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "12px 22px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                認証を完了
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
