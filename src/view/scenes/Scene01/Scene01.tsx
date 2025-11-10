import { useRef, useState } from "react";
import DKActionButton from "../../components/DKActioButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Scene01 = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [exiting, setExiting] = useState(false);

  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = ["assets/videos/Scene01-1.mp4", "assets/videos/Scene01-2.mp4"];

  const hdlEnded = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo((prev) => prev + 1);
    } else {
      setExiting(true);
    }
  };

  const hdlReset = () => {
    setCurrentVideo(0);
    setExiting(false);
  };

  const hdlPlayPause = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const hdlChangeScene = (targetScene: string) => {
    setExiting(false);
    navigate(targetScene);
  };

  const hdlMenu = () => {};

  return (
    <div className="from-primary to-primary-light relative flex h-dvh w-full items-center justify-center overflow-hidden bg-gradient-to-b">
      {/* ======= CENA PRINCIPAL ======= */}
      <div className="absolute top-1/2 left-1/2 flex w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col gap-4">
        <div className="hidden w-full justify-between">
          <div className="flex rounded-lg bg-white px-4 py-1 font-medium">
            Casa da Fulana
          </div>
          <div className="flex justify-end gap-4">
            <DKActionButton onClick={hdlReset}>Reiniciar</DKActionButton>
            <DKActionButton onClick={hdlPlayPause}>
              {playing ? "Pausar" : "Continuar"}
            </DKActionButton>
            <DKActionButton onClick={hdlMenu}>Menu</DKActionButton>
          </div>
        </div>

        <div className="bg-background aspect-video h-11/12 overflow-hidden rounded-2xl border-6 border-white md:h-auto md:w-full">
          <video
            key={currentVideo}
            ref={videoRef}
            className="w-full rounded-lg"
            muted
            autoPlay
            onEnded={hdlEnded}
          >
            <source src={videos[currentVideo]} />
          </video>

          <div className="absolute bottom-6 left-0 flex w-full justify-center gap-3 md:hidden">
            <button
              onClick={hdlReset}
              className="rounded-md bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm"
            >
              Reiniciar
            </button>
            <button
              onClick={hdlPlayPause}
              className="rounded-md bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm"
            >
              {playing ? "Pausar" : "Continuar"}
            </button>
          </div>
        </div>
      </div>

      {/* ======= CENA DEPOIS DA SAÍDA ======= */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex h-[200px] w-1/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg"
        initial={{ y: "100%", opacity: 0 }}
        animate={exiting ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div>Fulana, está saindo de casa, escolha o próximo destino:</div>

        <div className="flex flex-col gap-4">
          <DKActionButton
            onClick={() => {
              hdlChangeScene("/scene01");
            }}
          >
            <div className="relative w-full">
              <img
                src="/assets/imgs/bg_corredor.svg"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 right-0 z-10 h-full w-full bg-black/70" />
            </div>
          </DKActionButton>

          <DKActionButton
            onClick={() => {
              hdlChangeScene("/scene02");
            }}
          >
            <div className="relative w-full">
              <img
                src="/assets/imgs/bg_corredor.svg"
                className="h-full w-full object-cover"
              />
            </div>
          </DKActionButton>
        </div>
      </motion.div>
    </div>
  );
};
