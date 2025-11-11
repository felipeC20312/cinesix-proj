import type React from "react";
import { useState } from "react";

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
    activity: Array<{
      itemName: string;
      itemImage: string;
      itemSignal: string;
      compareSignal: string;
    }>;
  }>;
}

export const DKPhaseSelector: React.FC<DKPhaseSelectorProps> = ({
  children,
  elements,
}) => {
  const [phase, setPhase] = useState(0);
  const [activity, setActivity] = useState(0);
  const [showSignal, setShowSignal] = useState(false);
  const [isOnActivity, setIsOnActivity] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const hdlSetPhase = (phaseId: number) => {
    if (phaseId <= elements.length) {
      setPhase(phaseId);
      setIsOnActivity(true);
    } else {
      setPhase(0);
      setIsOnActivity(false);
    }
  };

  const hdlShowSignal = () => {
    setShowSignal(!showSignal);
  };

  const hdlSetActivity = (activityId: number) => {
    setActivity(activityId);
  };

  const hdlCompletePhase = () => {
    setIsCompleting(true);
    setTimeout(() => {
      hdlSetPhase(0);
      setIsCompleting(false);
    }, 1500);
  };

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSwiper={() => {}}
      onSlideChange={() => {}}
      allowTouchMove={!isOnActivity}
    >
      {children
        ? children
        : elements.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <div className="border-background-darker flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full border-3 bg-white">
                    <img
                      src={item.ownerPhoto}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* ======= ACTIVITY SELECTOR ======= */}
                  <AnimatePresence mode="wait">
                    {!isOnActivity && (
                      <motion.div
                        key="activity-card"
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -30 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                          duration: 1,
                        }}
                        className="flex flex-col items-center"
                      >
                        <p className="bg-background w-fit rounded-xl px-4 py-1 font-semibold">
                          {item.name}
                        </p>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <DKActionButton
                            onClick={() => {
                              hdlSetActivity(index);
                              hdlSetPhase(0);
                            }}
                          >
                            Selecionar
                          </DKActionButton>
                        </motion.div>
                      </motion.div>
                    )}

                    <div className="w-full">
                      {isOnActivity && activity === index && (
                        <AnimatePresence mode="wait">
                          {/* ======= PHASE 01 ======= */}
                          {phase === 0 && (
                            <motion.div
                              key="phase-0"
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
                                  <figure className="flex w-full gap-3">
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-background-darker h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-background-darker h-2 flex-1 rounded-full content-none" />
                                  </figure>
                                  <div>
                                    <img
                                      src={item.activity.at(index)?.itemImage}
                                      className={`h-full w-full object-cover ${showSignal ? "flex" : "hidden"}`}
                                    />
                                    <img
                                      src={item.activity.at(index)?.itemSignal}
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
                                    onClick={() => hdlSetPhase(phase + 1)}
                                  >
                                    Confirmar
                                  </DKActionButton>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}

                          {/* ======= PHASE 02 ======= */}
                          {phase === 1 && (
                            <motion.div
                              key="phase-1"
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
                                  <figure className="flex w-full gap-3">
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-background-darker h-2 flex-1 rounded-full content-none" />
                                  </figure>
                                  <div>
                                    <img
                                      src={item.activity.at(index)?.itemImage}
                                      className={`h-full w-full object-cover ${showSignal ? "flex" : "hidden"}`}
                                    />
                                    <img
                                      src={item.activity.at(index)?.itemSignal}
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
                                    onClick={() => hdlSetPhase(phase + 1)}
                                  >
                                    Confirmar
                                  </DKActionButton>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}

                          {/* ======= PHASE 03 ======= */}
                          {phase === 2 && (
                            <motion.div
                              key="phase-2"
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
                                  <figure className="flex w-full gap-3">
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                    <div className="bg-primary h-2 flex-1 rounded-full content-none" />
                                  </figure>
                                  <div>
                                    <img
                                      src={item.activity.at(index)?.itemImage}
                                      className={`h-full w-full object-cover ${showSignal ? "flex" : "hidden"}`}
                                    />
                                    <img
                                      src={item.activity.at(index)?.itemSignal}
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
                                    onClick={() => hdlSetPhase(phase + 1)}
                                  >
                                    Confirmar
                                  </DKActionButton>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </AnimatePresence>
                </div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
