import { useRef, useState } from "react";

import { DKPhaseSelector } from "../../components/DKPhaseSelector";
import fairItems from "@lib/datasets/fairItems.json";

import { motion } from "framer-motion";
import { DKPhoshorIconsHelper } from "@lib/utils/DKPhosphorIconsHelper";

export const Scene02 = () => {
  const [playing, setPlaying] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isOnActivity, setIsOnActivity] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const swiperRef = useRef<any>(null);

  const videos = ["assets/videos/Scene02-1.mp4"];

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

  return (
    <div className="from-gradient-second-dark to-gradient-second-light relative flex h-dvh w-full items-center justify-center overflow-hidden bg-linear-to-b">
      {/* ======= CENA PRINCIPAL ======= */}
      <div className="absolute top-1/2 left-1/2 flex w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col gap-4">
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
        initial={{ y: "100%", opacity: 0 }}
        animate={exiting ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 flex h-fit w-2/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg"
      >
        {!isOnActivity && (
          <div className="rounded-lg bg-white p-2 text-center font-semibold shadow-md">
            Nina, chegou a feira! Escolha qual barraca Nina deve visitar:
          </div>
        )}

        <div className="relative flex h-full w-full items-center gap-5 overflow-hidden">
          {!isOnActivity && (
            <button
              className="bg-background flex h-fit w-fit rounded-full p-3 shadow-xl"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <DKPhoshorIconsHelper
                iconName="arrowFatLeft"
                iconColor="var(--foreground)"
                iconSize={28}
                iconWeight="fill"
              />
            </button>
          )}

          <DKPhaseSelector
            elements={fairItems}
            swiperRef={swiperRef}
            onActivityChange={setIsOnActivity}
          />

          {!isOnActivity && (
            <button
              className="bg-background flex h-fit w-fit rounded-full p-3 shadow-xl"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <DKPhoshorIconsHelper
                iconName="arrowFatRight"
                iconColor="var(--foreground)"
                iconSize={28}
                iconWeight="fill"
              />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2"></div>
      </motion.div>
    </div>
  );
};
