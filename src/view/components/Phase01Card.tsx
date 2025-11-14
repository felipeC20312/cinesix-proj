import { motion } from "motion/react";
import DKActionButton from "./DKActioButton";

interface Phase01CardProps {
  item: any;
  phase: number;
  showSignal: boolean;
  hdlSetPhase: (index: number) => void;
}

export const Phase01Card: React.FC<Phase01CardProps> = ({
  item,
  phase,
  showSignal,
  hdlSetPhase,
}) => {
  return (
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
      className="flex h-full w-full flex-col items-center gap-4 md:w-[50%]"
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-3">
        <figure className="flex w-full gap-3"></figure>
        <div className="border-background-darker flex aspect-square overflow-hidden rounded-xl border-3 p-2">
          {!showSignal ? (
            <img
              src={item.activity.at(0)?.itemImage}
              alt={item.activity.at(0)?.itemName}
              className="h-full w-full object-fill"
            />
          ) : (
            <img
              src={item.activity.at(0)?.itemSignal}
              alt={item.activity.at(0)?.itemName}
              className="h-full w-full object-fill"
            />
          )}
        </div>
        <p className="text-primary text-xl font-semibold">
          {item.activity.at(0)?.itemName}
        </p>
      </div>

      <DKActionButton
        className="bg-primary rounded-xl px-4 py-1 font-semibold"
        onClick={() => hdlSetPhase(phase + 1)}
      >
        <p className="text-background-light text-xl font-bold">Confirmar</p>
      </DKActionButton>
    </motion.div>
  );
};
