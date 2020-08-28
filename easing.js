function sineWaveMap(x, p) {

  const min = p.min || 0;
  const max = p.max || 1;
  const mapMin = p.mapMin || 0;
  const mapMax = p.mapMax || Math.PI;

  if (x < min) { x = min }
  if (x > max) { x = max }

  return sin(mapMin + (mapMax - mapMin) * (x - min) / (max - min))

}