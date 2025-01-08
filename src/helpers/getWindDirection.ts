
export default function getWindDirection(degrees: number): string {
  const directions = [
    "North",           // 0° - 22.5°
    "North-East",      // 22.5° - 67.5°
    "East",            // 67.5° - 112.5°
    "South-East",      // 112.5° - 157.5°
    "South",           // 157.5° - 202.5°
    "South-West",      // 202.5° - 247.5°
    "West",            // 247.5° - 292.5°
    "North-West"       // 292.5° - 337.5°
  ];

  const normalizedDegrees = degrees % 360;
  const index = Math.round(normalizedDegrees / 45) % 8;
  return directions[index];
}