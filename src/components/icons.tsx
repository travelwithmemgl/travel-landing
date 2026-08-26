type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7m0 0H8m9 0v9" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6-7-7" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 20.5 3.9 12.6a5 5 0 0 1 7.1-7l1 1 1-1a5 5 0 1 1 7.1 7Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9Z" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.8A2.2 2.2 0 0 1 12 8.2c1.4 0 2.5.8 2.5 1.9M14.5 14.2c0 1.1-1.1 1.9-2.5 1.9a2.2 2.2 0 0 1-2.5-1.6" />
    </svg>
  );
}

export function GroupIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="8" r="3" />
      <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5.2a3 3 0 0 1 0 5.6" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.8h17M8.5 3.5v3M15.5 3.5v3" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-9m0 5h18v4m0-4v-2.5A2.5 2.5 0 0 0 18.5 9H10v5" />
      <circle cx="7" cy="11.5" r="1.8" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16.5v2m16-2v2M3 15.5h18m-16.6 0-1-4 1.9-4.4A2 2 0 0 1 7.1 6h9.8a2 2 0 0 1 1.8 1.1l1.9 4.4-1 4" />
      <path d="M6.5 12.5h2m7 0h2" />
    </svg>
  );
}

export function MealIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3v8a2.5 2.5 0 0 0 5 0V3M8.5 11v10M18 3c-1.5 1.4-2 3.2-2 5.5 0 1.6.7 2.5 2 2.5v10" />
    </svg>
  );
}

export function CrosshairIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Translate mark: a CJK-style glyph beside a Latin "A". */
export function TranslateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5.5h7.5M6.75 3.5v2M9.4 5.5c0 3.1-2.2 5.6-6.4 6.9M4.6 8.9c.9 1.9 2.6 3.3 4.8 4" />
      <path d="m12.2 20.5 4.15-9 4.15 9M13.9 17h5.1" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 13.5 3 11l18-6.5-6.5 18-2.5-7.5-1.5-1.5Z" />
    </svg>
  );
}

export function MountainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 19 6-11 4 7 2.5-4L21 19H3Z" />
      <path d="m9 8 1.6 2.9" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function PassportIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M9.5 16h5" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2L12 3.5Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.5 3.5h-2a2 2 0 0 0-2 2.2C4.2 13 11 19.8 18.3 20.5a2 2 0 0 0 2.2-2v-2a1.4 1.4 0 0 0-1.1-1.4l-2.6-.5a1.4 1.4 0 0 0-1.4.6l-.8 1.2a12 12 0 0 1-4.5-4.5l1.2-.8a1.4 1.4 0 0 0 .6-1.4l-.5-2.6a1.4 1.4 0 0 0-1.4-1.1Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M15.2 7.6h-1.3a2 2 0 0 0-2 2V21M9.6 13.2h4.8" />
    </svg>
  );
}
