/**
 * Converts distance in light years (LY) to kilometers and formats it beautifully.
 * 1 Light Year = 9,460,730,472,580.8 kilometers
 */
export function formatKm(distanceLy: number): string {
  if (distanceLy === 0) return '0 km (Home Planet)';
  
  const km = distanceLy * 9460730472580.8;
  
  if (km < 0.001) {
    const meters = km * 1000;
    return `${meters.toFixed(3)} meters`;
  } else if (km < 1) {
    return `${(km * 1000).toFixed(1)} meters`;
  } else if (km < 1000000) {
    return `${km.toLocaleString(undefined, { maximumFractionDigits: 1 })} km`;
  } else if (km < 1e9) {
    return `${(km / 1e6).toFixed(2)} Million km`;
  } else if (km < 1e12) {
    return `${(km / 1e9).toFixed(2)} Billion km`;
  } else {
    // Standard scientific format but with nice super-scripts
    const expStr = km.toExponential(3); // e.g. "9.461e+12"
    const parts = expStr.split('e+');
    const base = parts[0];
    const power = parts[1];
    
    // Map power digits to superscripts
    const superscripts: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };
    const powerSup = power ? power.split('').map(char => superscripts[char] || char).join('') : '';
    
    return `${base} × 10${powerSup} km`;
  }
}
