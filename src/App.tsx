import { useEffect, useMemo, useState } from "react";

type Screen = "title" | "playing" | "cleared" | "failed";
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

type Stage6Item = {
  id: string;
  label: string;
  isHuman: boolean;
};

type Stage7Word = {
  id: string;
  text: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  isCorrect: boolean;
};

type Stage8Button = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type Stage9Option = {
  id: string;
  label: string;
  isCorrect: boolean;
};

function App() {
  const [screen, setScreen] = useState<Screen>("title");
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTileIds, setSelectedTileIds] = useState<string[]>([]);
  const [stage4Input, setStage4Input] = useState("");
  const [stage5Round, setStage5Round] = useState(1);
  const [stage6Selected, setStage6Selected] = useState<string[]>([]);
  const [stage7Clicks, setStage7Clicks] = useState<string[]>([]);
  const [stage8Round, setStage8Round] = useState(1);
  const [stage9Choice, setStage9Choice] = useState("");
  const [stage10Checked, setStage10Checked] = useState(false);

  const resetRunState = () => {
    setSelectedTileIds([]);
    setStage4Input("");
    setStage5Round(1);
    setStage6Selected([]);
    setStage7Clicks([]);
    setStage8Round(1);
    setStage9Choice("");
    setStage10Checked(false);
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

  const stage6Items = useMemo<Stage6Item[]>(() => {
    return [
      { id: "s6-1", label: "私は信号待ちで青になる前から少し前に出る", isHuman: true },
      { id: "s6-2", label: "私は利用規約を毎回熟読して感動する", isHuman: false },
      { id: "s6-3", label: "私は動画広告の残り秒数を見つめる", isHuman: true },
      { id: "s6-4", label: "私は常に最短経路でクリックし感情を持たない", isHuman: false },
      { id: "s6-5", label: "私はパスワード再設定メールを3回待つ", isHuman: true },
      { id: "s6-6", label: "私は全ポップアップを歓迎する", isHuman: false },
    ];
  }, []);

  const stage7Words = useMemo<Stage7Word[]>(() => {
    return [
      { id: "w1", text: "無料", top: "14%", left: "8%", size: 34, rotate: -10, isCorrect: false },
      { id: "w2", text: "後で", top: "24%", left: "70%", size: 28, rotate: 8, isCorrect: false },
      { id: "w3", text: "閉じる", top: "58%", left: "76%", size: 16, rotate: 0, isCorrect: true },
      { id: "w4", text: "許可", top: "68%", left: "12%", size: 32, rotate: -8, isCorrect: false },
      { id: "w5", text: "おすすめ", top: "18%", left: "40%", size: 22, rotate: -3, isCorrect: false },
      { id: "w6", text: "skip", top: "46%", left: "16%", size: 20, rotate: 5, isCorrect: false },
      { id: "w7", text: "×", top: "8%", left: "88%", size: 12, rotate: 0, isCorrect: true },
      { id: "w8", text: "今すぐ登録", top: "42%", left: "50%", size: 24, rotate: -6, isCorrect: false },
    ];
  }, []);

  const stage8Buttons = useMemo<Stage8Button[]>(() => {
    switch (stage8Round) {
      case 1:
        return [
          { id: "a", label: "許可", isCorrect: false },
          { id: "b", label: "今はしない", isCorrect: true },
          { id: "c", label: "あとで通知", isCorrect: false },
        ];
      case 2:
        return [
          { id: "a", label: "ダウンロード", isCorrect: false },
          { id: "b", label: "続行", isCorrect: false },
          { id: "c", label: "スキップ", isCorrect: true },
        ];
      default:
        return [
          { id: "a", label: "無料で開始", isCorrect: false },
          { id: "b", label: "広告を閉じる", isCorrect: true },
          { id: "c", label: "会員登録", isCorrect: false },
        ];
    }
  }, [stage8Round]);

  const stage9Options = useMemo<Stage9Option[]>(() => {
    return [
      { id: "opt-1", label: "7日前の認証方法で続行する", isCorrect: false },
      { id: "opt-2", label: "私はたぶん人間なので続行する", isCorrect: false },
      { id: "opt-3", label: "最も人間らしい選択肢を選ぶ", isCorrect: true },
      { id: "opt-4", label: "すべての選択肢に同意して続行する", isCorrect: false },
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
    if (currentStage === 6) setStage6Selected([]);
    if (currentStage === 7) setStage7Clicks([]);
    if (currentStage === 8) setStage8Round(1);
    if (currentStage === 9) setStage9Choice("");
    if (currentStage === 10) setStage10Checked(false);

    setScreen("playing");
  };

  const goToTitle = () => {
    setCurrentStage(1);
    setTimeLeft(60);
    resetRunState();
    setScreen("title");
  };

  const handleStage1Clear = () => {
    setCurrentStage(2);
    setTimeLeft(60);
  };

  const handleStage2RealClick = () => {
    setCurrentStage(3);
    setTimeLeft(60);
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
      setCurrentStage(4);
      setTimeLeft(60);
      setStage4Input("");
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 5, 0));
  };

  const handleStage4Submit = () => {
    const normalized = stage4Input.trim().toUpperCase();

    if (normalized === stage4Answer) {
      setCurrentStage(5);
      setTimeLeft(60);
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

    setCurrentStage(6);
    setTimeLeft(60);
    setStage6Selected([]);
  };

  const toggleStage6Item = (id: string) => {
    setStage6Selected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStage6Submit = () => {
    const correctIds = stage6Items
      .filter((item) => item.isHuman)
      .map((item) => item.id)
      .sort();

    const selectedIds = [...stage6Selected].sort();

    const isCorrect =
      correctIds.length === selectedIds.length &&
      correctIds.every((id, index) => id === selectedIds[index]);

    if (isCorrect) {
      setCurrentStage(7);
      setTimeLeft(60);
      setStage7Clicks([]);
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 6, 0));
  };

  const handleStage7Click = (word: Stage7Word) => {
    if (!word.isCorrect) {
      setTimeLeft((prev) => Math.max(prev - 4, 0));
      return;
    }

    if (stage7Clicks.includes(word.id)) return;

    const next = [...stage7Clicks, word.id];
    setStage7Clicks(next);

    const correctCount = stage7Words.filter((item) => item.isCorrect).length;
    if (next.length >= correctCount) {
      setCurrentStage(8);
      setTimeLeft(60);
      setStage8Round(1);
    }
  };

  const handleStage8Click = (isCorrect: boolean) => {
    if (!isCorrect) {
      setTimeLeft((prev) => Math.max(prev - 5, 0));
      return;
    }

    if (stage8Round < 3) {
      setStage8Round((prev) => prev + 1);
      return;
    }

    setCurrentStage(9);
    setTimeLeft(60);
    setStage9Choice("");
  };

  const handleStage9Submit = () => {
    const selected = stage9Options.find((item) => item.id === stage9Choice);

    if (selected?.isCorrect) {
      setCurrentStage(10);
      setTimeLeft(60);
      setStage10Checked(false);
      return;
    }

    setTimeLeft((prev) => Math.max(prev - 8, 0));
  };

  const handleStage10Submit = () => {
    if (!stage10Checked) {
      setTimeLeft((prev) => Math.max(prev - 10, 0));
      return;
    }

    setScreen("cleared");
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
                fontSize: "38px",
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
          padding: "24px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#2563eb", fontWeight: 700 }}>
            HUMAN VERIFICATION PORTAL
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: "40px" }}>
            あなたはロボットですか？
          </h1>

          <p style={{ marginBottom: "12px", fontSize: "18px" }}>
            快適ではない認証体験を提供しています。
          </p>

          <p style={{ marginBottom: "32px", color: "#4b5563", lineHeight: 1.7 }}>
            ネット上のイライラを最後まで乗り越えた者だけが、人間と認められます。
          </p>

          <button
            onClick={startGame}
            style={{
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

  if (screen === "cleared") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f4f6",
          color: "#111827",
          fontFamily: "sans-serif",
          padding: "24px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#16a34a", fontWeight: 700 }}>
            VERIFICATION COMPLETE
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: "36px" }}>
            おめでとうございます。あなたは人間です。
          </h1>

          <p style={{ marginBottom: "32px", color: "#4b5563", lineHeight: 1.7 }}>
            これほど理不尽なUIに耐え、なお進もうとする意志は完全に人間です。
          </p>

          <button
            onClick={goToTitle}
            style={{
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
          padding: "24px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#dc2626", fontWeight: 700 }}>
            VERIFICATION FAILED
          </p>

          <h1 style={{ margin: "0 0 16px", fontSize: "36px" }}>
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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e5e7eb",
        color: "#111827",
        fontFamily: "sans-serif",
        padding: "24px",
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
          padding: "24px",
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
                minHeight: "480px",
                borderRadius: "16px",
                background: "rgba(0, 0, 0, 0.35)",
                overflow: "hidden",
                padding: "32px",
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
                  padding: "32px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                }}
              >
                <button
                  onClick={handleStage1Clear}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "14px",
                    height: "14px",
                    border: "none",
                    background: "transparent",
                    color: "#9ca3af",
                    fontSize: "12px",
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

                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "28px" }}>
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
                minHeight: "480px",
                borderRadius: "16px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,0.18) 0%, rgba(17,24,39,0.32) 100%)",
                overflow: "hidden",
                padding: "32px",
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
                  padding: "32px",
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

                <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "28px" }}>
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
                      width: `${mark.size}px`,
                      height: `${mark.size}px`,
                      border: "none",
                      background: "transparent",
                      color: mark.color,
                      fontSize: "14px",
                      cursor: "pointer",
                      opacity: mark.opacity,
                    }}
                  >
                    ×
                  </button>
                ))}

                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "32px",
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
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
                padding: "24px",
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
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "16px",
              }}
            >
              {stage5Tiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleStage5Click(tile.isCorrect)}
                  style={{
                    height: "120px",
                    fontSize: "48px",
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
              人間らしい行動をすべて選択してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              感情、面倒くささ、諦めの早さなどを総合的に判断します。
            </p>

            <div
              style={{
                display: "grid",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {stage6Items.map((item) => {
                const selected = stage6Selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleStage6Item(item.id)}
                    style={{
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
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleStage6Submit}
              style={{
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
              判定する
            </button>
          </>
        ) : currentStage === 7 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              閉じる意思を示す要素だけを押してください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              目立つ要素ほど正解とは限りません。
            </p>

            <div
              style={{
                position: "relative",
                minHeight: "420px",
                borderRadius: "16px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,0.06) 0%, rgba(17,24,39,0.14) 100%)",
                overflow: "hidden",
                border: "1px solid #d1d5db",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "20px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                }}
              />

              {stage7Words.map((word) => {
                const clicked = stage7Clicks.includes(word.id);
                return (
                  <button
                    key={word.id}
                    onClick={() => handleStage7Click(word)}
                    style={{
                      position: "absolute",
                      top: word.top,
                      left: word.left,
                      border: clicked ? "2px solid #16a34a" : "none",
                      background: clicked ? "rgba(220,252,231,0.9)" : "transparent",
                      color: word.isCorrect ? "#475569" : "#111827",
                      fontSize: `${word.size}px`,
                      fontWeight: word.isCorrect ? 600 : 800,
                      transform: `rotate(${word.rotate}deg)`,
                      cursor: "pointer",
                      borderRadius: "8px",
                      padding: "4px 8px",
                    }}
                  >
                    {word.text}
                  </button>
                );
              })}
            </div>
          </>
        ) : currentStage === 8 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              誘導に負けず、離脱寄りの選択肢を選んでください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              毎回少しずつ文言が変わります。現在 {stage8Round} / 3 回目です。
            </p>

            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "16px",
                padding: "24px",
                background: "#ffffff",
                maxWidth: "620px",
              }}
            >
              <div
                style={{
                  marginBottom: "18px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                このサイトは利便性向上のため、何かを選ばせたがっています。
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                {stage8Buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleStage8Click(button.isCorrect)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: button.isCorrect ? "1px solid #cbd5e1" : "none",
                      background: button.isCorrect ? "#f8fafc" : "#2563eb",
                      color: button.isCorrect ? "#334155" : "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : currentStage === 9 ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              最も人間っぽい選択肢をひとつ選んでください
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              正解は合理性ではなく、妙な納得感にあります。
            </p>

            <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
              {stage9Options.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="stage9"
                    checked={stage9Choice === option.id}
                    onChange={() => setStage9Choice(option.id)}
                  />
                  <span style={{ fontWeight: 700, color: "#111827" }}>{option.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleStage9Submit}
              style={{
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
              続行
            </button>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              最終確認: 私はロボットではありません
            </h2>
            <p style={{ marginTop: 0, marginBottom: "24px", color: "#4b5563" }}>
              ここまで来た方のみ、最後のチェックボックスに触れる権利があります。
            </p>

            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "16px",
                padding: "24px",
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
                  onChange={(e) => setStage10Checked(e.target.checked)}
                  style={{ width: "18px", height: "18px" }}
                />
                <span style={{ fontWeight: 700 }}>
                  私はすべての煩雑さを受け入れたうえで人間です
                </span>
              </label>

              <button
                onClick={handleStage10Submit}
                style={{
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

