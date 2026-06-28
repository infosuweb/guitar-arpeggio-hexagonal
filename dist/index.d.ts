/**
 * guitar-arpeggio — pure-data representation of full guitar arpeggios.
 */
export { CHROMATIC, type Note, type ChordType, noteToIndex, indexToNote, transpose, chordNotes, } from './notes.js';
export { type FretPosition, getArpeggio, ascending, } from './fretboard.js';
