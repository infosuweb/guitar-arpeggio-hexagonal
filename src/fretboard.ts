/**
 * Fretboard logic for a standard 6-string guitar in EADGBE tuning.
 */

import {
  type ChordType,
  type Note,
  chordNotes,
  noteToIndex,
  transpose,
} from './notes.js';

/**
 * A single playable position on the fretboard.
 * - string: 1-6, where 1 is the high E (1st string) and 6 is the low E (6th).
 * - fret: 0 (open) up to maxFret.
 */
export interface FretPosition {
  string: 1 | 2 | 3 | 4 | 5 | 6;
  fret: number;
  note: Note;
}

/**
 * Open-string notes, indexed so that position 0 is the 6th string (low E)
 * and position 5 is the 1st string (high E). Standard tuning: E A D G B E.
 */
const OPEN_STRINGS_LOW_TO_HIGH: readonly Note[] = [
  'E', // 6th string (lowest pitch)
  'A', // 5th string
  'D', // 4th string
  'G', // 3rd string
  'B', // 2nd string
  'E', // 1st string (highest pitch)
];

/** Number of the string (1-6) given its low-to-high index (0-5). */
function stringNumberFromIndex(lowToHighIndex: number): FretPosition['string'] {
  return (6 - lowToHighIndex) as FretPosition['string'];
}

/**
 * Absolute pitch of a position, measured in semitones above the lowest
 * possible open note (the low E). Used for ordering grave -> agudo.
 */
function absolutePitch(position: FretPosition): number {
  const lowToHighIndex = 6 - position.string;
  // Octave offset: each string's open pitch relative to the low E.
  // Standard tuning semitone offsets from low E: 0, 5, 10, 15, 19, 24.
  const OPEN_OFFSETS = [0, 5, 10, 15, 19, 24];
  return OPEN_OFFSETS[lowToHighIndex]! + position.fret;
}

/**
 * Return every fretboard position (across all 6 strings, frets 0..maxFret)
 * whose note belongs to the given chord.
 */
export function getArpeggio(
  root: Note,
  type: ChordType,
  maxFret = 12,
): FretPosition[] {
  const chordIndices = new Set(
    chordNotes(root, type).map((n) => noteToIndex(n)),
  );

  const positions: FretPosition[] = [];

  for (let lowToHigh = 0; lowToHigh < OPEN_STRINGS_LOW_TO_HIGH.length; lowToHigh++) {
    const openNote = OPEN_STRINGS_LOW_TO_HIGH[lowToHigh]!;
    for (let fret = 0; fret <= maxFret; fret++) {
      const note = transpose(openNote, fret);
      if (chordIndices.has(noteToIndex(note))) {
        positions.push({
          string: stringNumberFromIndex(lowToHigh),
          fret,
          note,
        });
      }
    }
  }

  return positions;
}

/**
 * Sort an arpeggio by real pitch (low -> high) so it can be played
 * ascending across the fretboard.
 */
export function ascending(positions: FretPosition[]): FretPosition[] {
  return [...positions].sort((a, b) => absolutePitch(a) - absolutePitch(b));
}
