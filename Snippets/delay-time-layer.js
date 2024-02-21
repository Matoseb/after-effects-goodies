const delay  = marker.key(1).time - thisLayer.inPoint;
const duration = key(2).time - key(1).time;

function modulo(num, mod) {
  return ((num % mod) + mod) % mod
}

modulo(value + delay, duration)