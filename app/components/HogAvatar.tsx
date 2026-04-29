import Image from "next/image";

type Props = {
  username: string;
  imageSrc?: string;
  size?: number;
  className?: string;
};

function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

export function HogAvatar({ username, imageSrc, size = 96, className = "" }: Props) {
  const hue = hashHue(username);
  const bg = `linear-gradient(135deg, hsl(${hue} 85% 78%), hsl(${(hue + 40) % 360} 80% 60%))`;

  if (imageSrc) {
    return (
      <div
        style={{ width: size, height: size, background: bg }}
        className={`relative overflow-hidden rounded-full ring-2 ring-white/70 dark:ring-black/30 ${className}`}
      >
        <Image
          src={imageSrc}
          alt={username}
          width={size}
          height={size}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    );
  }

  const spineColor = `hsl(${(hue + 200) % 360} 40% 22%)`;
  const bodyColor = `hsl(${(hue + 25) % 360} 40% 72%)`;
  const bellyColor = `hsl(${(hue + 30) % 360} 55% 86%)`;

  return (
    <div
      style={{ width: size, height: size, background: bg }}
      className={`relative overflow-hidden rounded-full ring-2 ring-white/70 dark:ring-black/30 ${className}`}
      aria-label={`${username} placeholder avatar`}
      role="img"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
      >
        {/* Body dome */}
        <ellipse cx="52" cy="62" rx="38" ry="28" fill={bodyColor} />
        {/* Spikes — triangles along the top of the dome */}
        <g fill={spineColor}>
          {Array.from({ length: 11 }).map((_, i) => {
            const t = i / 10;
            const cx = 20 + t * 64;
            const cy = 62 - Math.sin(t * Math.PI) * 28;
            const angle = (t - 0.5) * 140;
            return (
              <polygon
                key={i}
                points={`${cx - 3},${cy} ${cx + 3},${cy} ${cx},${cy - 10}`}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </g>
        {/* Face / snout */}
        <ellipse cx="22" cy="66" rx="14" ry="11" fill={bellyColor} />
        {/* Nose */}
        <circle cx="11" cy="66" r="3" fill="#2a1a1a" />
        {/* Eye */}
        <circle cx="22" cy="62" r="2" fill="#2a1a1a" />
        <circle cx="22.5" cy="61.5" r="0.7" fill="#fff" />
        {/* Feet */}
        <ellipse cx="34" cy="88" rx="5" ry="3" fill={spineColor} />
        <ellipse cx="62" cy="88" rx="5" ry="3" fill={spineColor} />
      </svg>
    </div>
  );
}
