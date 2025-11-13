import type React from "react";
import { useEffect, useState } from "react";

import DKActionButton from "./DKActioButton";

import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";

interface DKPhaseSelectorProps {
  children?: React.ReactNode;
  elements: Array<{
    ownerPhoto: string;
    ownerName: string;
    name: string;
    tentImage: string;
    activity: Array<{
      itemName: string;
      itemImage: string;
      itemSignal: string;
      compareSignal: string;
    }>;
  }>;
  swiperRef?: React.MutableRefObject<any>;
  onActivityChange?: (isOn: boolean) => void;
}

export const DKPhaseSelector: React.FC<DKPhaseSelectorProps> = ({
  children,
  elements,
  swiperRef,
  onActivityChange,
}) => {
  const [phase, setPhase] = useState(0);
  const [activity, setActivity] = useState(0);
  const [showSignal, setShowSignal] = useState(false);
  const [isOnActivity, setIsOnActivity] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (onActivityChange) onActivityChange(isOnActivity);
  }, [isOnActivity]);

  const hdlSetPhase = (phaseId: number) => {
    if (phaseId <= elements.length) {
      setPhase(phaseId);
      setIsOnActivity(true);
    } else {
      setPhase(0);
      setIsOnActivity(false);
    }
  };

  const hdlSetActivity = (activityId: number) => {
    setActivity(activityId);
  };

  const hdlCompletePhase = () => {
    setIsCompleting(true);
    setPhase(3);
    setTimeout(() => {
      setPhase(0);
      setIsCompleting(false);
      setIsOnActivity(false);
    }, 3500);
  };

  const renderPhaseContent = (item: (typeof elements)[0], index: number) => {
    let phaseContent = null;

    if (!isOnActivity) {
      phaseContent = (
        <motion.div
          key="activity-card"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
          className="flex flex-col items-center gap-3 p-4"
        >
          <p className="bg-background w-fit rounded-xl px-4 py-1 font-semibold shadow-xl">
            Barraca de {item.name}
          </p>

          <div className="flex aspect-square w-4/5">
            <img src={item.tentImage} className="h-full w-full object-cover" />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <DKActionButton
              className="bg-primary rounded-xl px-4 py-1"
              onClick={() => {
                hdlSetActivity(index);
                hdlSetPhase(0);
              }}
            >
              <p className="text-background font-bold">Selecionar</p>
            </DKActionButton>
          </motion.div>
        </motion.div>
      );
    } else if (isOnActivity && activity === index) {
      if (phase === 3 && isCompleting) {
        phaseContent = (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="flex flex-col items-center"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-3">
                <p className="text-primary text-xl font-bold">
                  Fase Concluída!
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: 3,
                    ease: "linear",
                  }}
                  className="text-4xl"
                >
                  🎉
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      } else if (phase === 0) {
        const progressBars = Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full content-none ${
              i <= phase ? "bg-primary" : "bg-background-darker"
            }`}
          />
        ));

        phaseContent = (
          <motion.div
            key={`phase-${phase}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
            }}
            className="flex flex-col items-center"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-3">
                <figure className="flex w-full gap-3">{progressBars}</figure>
                <div>
                  <img
                    src={item.activity.at(index)?.itemImage}
                    alt={item.activity.at(index)?.itemName}
                    className="flex h-full w-full object-cover"
                  />
                  <img
                    src={item.activity.at(index)?.itemSignal}
                    alt="Signal"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p>{item.activity.at(index)?.itemName}</p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DKActionButton
                  className="rounded-xl px-4 py-1 font-semibold"
                  onClick={() => hdlSetPhase(phase + 1)}
                >
                  <p className="font-bold">Confirmar</p>
                </DKActionButton>
              </motion.div>
            </div>
          </motion.div>
        );
      } else if (phase === 1) {
        const progressBars = Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`shimmer h-2 flex-1 rounded-full content-none ${
              i <= phase ? "bg-primary" : "bg-background-darker"
            }`}
          />
        ));

        phaseContent = (
          <motion.div
            key={`phase-${phase}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
            }}
            className="flex flex-col items-center"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-3">
                <figure className="flex w-full gap-3">{progressBars}</figure>
                <div>
                  <img
                    src={item.activity.at(index)?.itemImage}
                    alt={item.activity.at(index)?.itemName}
                    className="flex h-full w-full object-cover"
                  />
                  <img
                    src={item.activity.at(index)?.itemSignal}
                    alt="Signal"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p>{item.activity.at(index)?.itemName}</p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DKActionButton
                  className="rounded-xl px-4 py-1 font-semibold"
                  onClick={() => hdlSetPhase(phase + 1)}
                >
                  <p className="font-bold">Confirmar</p>
                </DKActionButton>
              </motion.div>
            </div>
          </motion.div>
        );
      } else if (phase === 2) {
        const progressBars = Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full content-none ${
              i <= phase ? "bg-primary" : "bg-background-darker"
            }`}
          />
        ));

        phaseContent = (
          <motion.div
            key={`phase-${phase}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
            }}
            className="flex flex-col items-center"
          >
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white p-3">
                <figure className="flex w-full gap-3">{progressBars}</figure>
                <div>
                  <img
                    src={item.activity.at(index)?.itemImage}
                    alt={item.activity.at(index)?.itemName}
                    className="flex h-full w-full object-cover"
                  />
                  <img
                    src={item.activity.at(index)?.itemSignal}
                    alt="Signal"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p>{item.activity.at(index)?.itemName}</p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DKActionButton
                  className="rounded-xl px-4 py-1 font-semibold"
                  onClick={
                    phase === 2
                      ? hdlCompletePhase
                      : () => hdlSetPhase(phase + 1)
                  }
                >
                  <p className="font-bold">Confirmar</p>
                </DKActionButton>
              </motion.div>
            </div>
          </motion.div>
        );
      }
    }

    return phaseContent;
  };

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSwiper={(swiper) => {
        if (swiperRef) swiperRef.current = swiper;
      }}
      onSlideChange={() => {}}
      allowTouchMove={!isOnActivity}
    >
      {children
        ? children
        : elements.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <div className="border-primary-light flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full border-3 bg-white shadow-xl">
                    <img
                      src={item.ownerPhoto}
                      alt={item.ownerName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="w-full">
                    <AnimatePresence mode="wait">
                      {renderPhaseContent(item, index)}
                    </AnimatePresence>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
