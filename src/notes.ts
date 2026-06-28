/**
 * Chromatic note logic based purely on modular arithmetic over the 12
 * chromatic notes. No per-chord hardcoded tables.
 */

/** The 12 chromatic notes, using sharps as the canonical spelling. */
export const CHROMATIC = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

/** A note name (sharp spelling). */
export type Note = (typeof CHROMATIC)[number];

/** Supported chord qualities. */
export type ChordType = 'maj' | 'min' | 'maj7' | 'min7' | 'dom7' | 'dim';

/**
 * Semitone intervals (from the root) that define each chord quality.
 * This is the only "theory" data — pure interval recipes, not note tables.
 */
const CHORD_INTERVALS: Record<ChordType, readonly number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  dom7: [0, 4, 7, 10],
  dim: [0, 3, 6],
};

/** Map of accepted aliases (including flats) to canonical sharp names. */
const NOTE_ALIASES: Record<string, Note> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
};

/** Normalize a note string to its canonical chromatic index (0-11). */
export function noteToIndex(note: Note): number {
  const canonical = NOTE_ALIASES[note] ?? note;
  const index = CHROMATIC.indexOf(canonical as Note);
  if (index === -1) {
    throw new Error(`Unknown note: ${note}`);
  }
  return index;
}

/** Convert a chromatic index (any integer) back to a note name. */
export function indexToNote(index: number): Note {
  const normalized = ((index % 12) + 12) % 12;
  return CHROMATIC[normalized]!;
}

/** Transpose a note by a number of semitones. */
export function transpose(note: Note, semitones: number): Note {
  return indexToNote(noteToIndex(note) + semitones);
}

/** Return the set of note names that make up a chord. */
export function chordNotes(root: Note, type: ChordType): Note[] {
  return CHORD_INTERVALS[type].map((interval) => transpose(root, interval));
}
