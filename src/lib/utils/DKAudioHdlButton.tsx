import { useEffect, useRef, useState } from "react";
import { DKLucidIconsHelper } from "./DKLucidIconsHelper";
import { useNavigate } from "react-router-dom";

export default function DKAudioHdlButton({ src = "/musicas/tema.mp3" }) {
  const audioRef = useRef<any>(null);
  const [enabled, setEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = true;

    audio.play().catch(() => {});

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [src]);

  const hdlToggleAudio = () => {
    if (!enabled) {
      hdlPlayAudio();
    } else {
      hdlPauseAudio();
    }
  };

  const hdlPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 1;

    audio
      .play()
      .then(() => {
        setEnabled(true);
      })
      .catch(() => {
        console.warn("Ainda bloqueado, Capitão. Pode exigir outra interação.");
      });
  };

  const hdlPauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.muted = true;
    audio.volume = 0;

    setEnabled(false);
  };

  const hdlReset = () => {
    navigate("/");
  };

  return (
    <div className="absolute top-3 right-3 z-100 flex gap-3">
      <button
        onClick={hdlReset}
        className="bg-background hover:bg-background-dark border-background-darker rounded-lg border-2 px-2 py-2 text-sm transition-all"
      >
        <DKLucidIconsHelper
          iconName="rotateCcw"
          iconColor="var(--foreground)"
          iconSize={28}
        />
      </button>

      <button
        onClick={hdlToggleAudio}
        className="bg-background hover:bg-background-dark border-background-darker rounded-lg border-2 px-2 py-2 text-sm transition-all"
      >
        {enabled ? (
          <DKLucidIconsHelper
            iconName="volume2"
            iconColor="var(--foreground)"
            iconSize={28}
          />
        ) : (
          <DKLucidIconsHelper
            iconName="volumeX"
            iconColor="var(--foreground)"
            iconSize={28}
          />
        )}
      </button>
    </div>
  );
}
