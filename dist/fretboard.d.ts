/**
 * Fretboard logic for a standard 6-string guitar in EADGBE tuning.
 */
import { type ChordType, type Note } from './notes.js';
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
 * Return every fretboard position (across all 6 strings, frets 0..maxFret)
 * whose note belongs to the given chord.
 */
export declare function getArpeggio(root: Note, type: ChordType, maxFret?: number): FretPosition[];
/**
 * Sort an arpeggio by real pitch (low -> high) so it can be played
 * ascending across the fretboard.
 */
export declare function ascending(positions: FretPosition[]): FretPosition[];
