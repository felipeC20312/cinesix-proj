import {
  AtIcon,
  FileIcon,
  LassoIcon,
  DevicesIcon,
  CowboyHatIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  InstagramLogoIcon,
  ArrowFatRightIcon,
  ArrowFatLeftIcon,
} from "@phosphor-icons/react";

const ICON_MAP = {
  at: AtIcon,
  file: FileIcon,
  lasso: LassoIcon,
  devices: DevicesIcon,
  cowboyHat: CowboyHatIcon,
  facebookLogo: FacebookLogoIcon,
  linkedinLogo: LinkedinLogoIcon,
  arrowFatLeft: ArrowFatLeftIcon,
  arrowFatRight: ArrowFatRightIcon,
  instagramLogo: InstagramLogoIcon,
};

export type PhosphorIconMap = keyof typeof ICON_MAP;

interface PhosphorIconProps {
  iconName: keyof typeof ICON_MAP;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  iconWeight?: PhosphorWeight;
}

type PhosphorWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

export const DKPhoshorIconsHelper = ({
  iconName = "file",
  iconColor = "currentColor",
  iconWeight = "regular",
  iconSize = 24,
}: PhosphorIconProps) => {
  const IconComponent = ICON_MAP[iconName] ?? ICON_MAP.file;

  return (
    <IconComponent size={iconSize} color={iconColor} weight={iconWeight} />
  );
};
