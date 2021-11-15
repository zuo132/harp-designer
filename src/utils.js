export const stringX = (index, stringSpacing) => {
  return index * stringSpacing + 500;
};

export const stringY = (index, scale) => {
  return 600 - index * scale;
};

export function getQBezierValue(t, p1, p2, p3) {
  var iT = 1 - t;
  return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

export const calculateTension = (length, frequency, diameter, p = 1.14) => {
  const mu = (diameter / 2) ** 2 * Math.PI * p * 100;
  return (2 * length * frequency) ** 2 * mu;
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

export const addNoteName = (strings, tuning = 'C Major') => {
  const cMajorNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const eFlatMajorNotes = ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'];
  const aFlatMajorNotes = ['C', 'C#', 'D#', 'F', 'G', 'G#', 'A#'];

  const notes =
    tuning === 'C Major'
      ? cMajorNotes
      : tuning === 'E Flat Major'
      ? eFlatMajorNotes
      : aFlatMajorNotes;

  const stringsWithNoteName = strings.map((string, index) => {
    const note = notes[index % 7] + (2 + Math.floor(index / 7));
    return { ...string, note, frequency: getFrequency(note) };
  });

  return stringsWithNoteName;
};
