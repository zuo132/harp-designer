export const stringX = (index, stringSpacing) => {
  return index * stringSpacing + 200;
};

export const stringY = (index, scale, height = 600) => {
  return height + 100 - index * scale;
};

export function getQBezierValue(t, p1, p2, p3) {
  var iT = 1 - t;
  return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

export const calculateTension = (frequency, length, diameter, p = 1.14, linearMassDensity = 0) => {
  const mu = linearMassDensity ? linearMassDensity : (diameter / 2) ** 2 * Math.PI * p * 1000;
  return ((2 * length * frequency) ** 2 * mu) / 9.807;
};

export const calculateFrequency = (length, tension, diameter, p = 1.14, linearMassDensity = 0) => {
  const mu = linearMassDensity ? linearMassDensity : (diameter / 2) ** 2 * Math.PI * p * 1000;
  return Math.sqrt((tension * 9.807) / mu) / (2 * length);
};

export const calculateLength = (frequency, tension, diameter, p = 1.14, linearMassDensity = 0) => {
  const mu = linearMassDensity ? linearMassDensity : (diameter / 2) ** 2 * Math.PI * p * 1000;

  return Math.sqrt((tension * 9.807) / mu) / (2 * frequency);
};

export const calculateDiameter = (frequency, length, tension, p = 1.14) => {
  return Math.sqrt((tension * 9.807) / ((2 * length * frequency) ** 2 * (Math.PI * p * 1000))) * 2;
};

export const inchToMeter = (value) => {
  return (value * 2.54) / 100;
};

export const getFrequency = function (note) {
  const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  let octave, keyNumber;

  if (note.length === 3) {
    octave = note.charAt(2);
  } else {
    octave = note.charAt(1);
  }

  keyNumber = notes.indexOf(note.slice(0, -1));

  if (keyNumber < 3) {
    keyNumber = keyNumber + 12 + (octave - 1) * 12 + 1;
  } else {
    keyNumber = keyNumber + (octave - 1) * 12 + 1;
  }

  // Return frequency of note
  return 440 * Math.pow(2, (keyNumber - 49) / 12);
};

export const getNoteNamesInScale = (scale) => {
  const cMajorNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const eFlatMajorNotes = ['A#', 'C', 'D', 'D#', 'F', 'G', 'G#'];
  const aFlatMajorNotes = ['A#', 'C', 'C#', 'D#', 'F', 'G', 'G#'];

  return scale === 'C Major'
    ? cMajorNotes
    : scale === 'E Flat Major'
    ? eFlatMajorNotes
    : aFlatMajorNotes;
};

export const addNoteName = (strings, lowestNote = 'C2', tuning = 'C Major') => {
  const notes = getNoteNamesInScale(tuning);

  const lowestNoteName = lowestNote.charAt(0);
  const lowestNoteNumber = parseInt(lowestNote.charAt(lowestNote.length - 1));
  const offset = lowestNoteName.charCodeAt(0) - 'A'.charCodeAt(0);

  const stringsWithNoteName = strings.map((string, index) => {
    const note =
      notes[(index + offset) % 7] + (lowestNoteNumber + Math.floor((index + offset) / 7));
    return { ...string, note, frequency: getFrequency(note) };
  });

  return stringsWithNoteName;
};

export const calculateTensileStress = (length, width, tension) => {
  return tension / (length * width);
};

export const calculateStraightPillarCrossSectionArea = (diameter) => {
  return (diameter / 1000 / 2) ** 2 * Math.PI;
};

export const calculateDPillarCrossSectionArea = (width, thickness) => {
  return (width / 1000) * (thickness / 1000);
};

// Takes angle in degrees
export const calculateYOffset = (angle, stringSpacing) => {
  const radians = (angle * Math.PI) / 180;
  return stringSpacing * Math.tan(radians);
};
