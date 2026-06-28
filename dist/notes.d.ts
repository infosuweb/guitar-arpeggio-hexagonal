/**
 * Chromatic note logic based purely on modular arithmetic over the 12
 * chromatic notes. No per-chord hardcoded tables.
 */
/** The 12 chromatic notes, using sharps as the canonical spelling. */
export declare const CHROMATIC: readonly ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
/** A note name (sharp spelling). */
export type Note = (typeof CHROMATIC)[number];
/** Supported chord qualities. */
export type ChordType = 'maj' | 'min' | 'maj7' | 'min7' | 'dom7' | 'dim';
/** Normalize a note string to its canonical chromatic index (0-11). */
export declare function noteToIndex(note: Note): number;
/** Convert a chromatic index (any integer) back to a note name. */
export declare function indexToNote(index: number): Note;
/** Transpose a note by a number of semitones. */
export declare function transpose(note: Note, semitones: number): Note;
/** Return the set of note names that make up a chord. */
export declare function chordNotes(root: Note, type: ChordType): Note[];
