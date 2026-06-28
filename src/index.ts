/**
 * guitar-arpeggio — pure-data representation of full guitar arpeggios.
 */

export {
  CHROMATIC,
  type Note,
  type ChordType,
  noteToIndex,
  indexToNote,
  transpose,
  chordNotes,
} from './notes.js';

export {
  type FretPosition,
  getArpeggio,
  ascending,
} from './fretboard.js';

import { ascending, getArpeggio } from './fretboard.js';

/**
 * Example usage. Run with `npx tsx src/index.ts` (or after building, node dist/index.js).
 *
 * A C major arpeggio contains only the notes C, E and G across the whole neck.
 */
function demo(): void {
  const cmaj = getArpeggio('C', 'maj');
  const playable = ascending(cmaj);

  console.log('C major arpeggio (ascending, low -> high):');
  for (const pos of playable) {
    console.log(`  string ${pos.string}, fret ${String(pos.fret).padStart(2)} -> ${pos.note}`);
  }

  const distinctNotes = [...new Set(cmaj.map((p) => p.note))].sort();
  console.log('Distinct notes:', distinctNotes.join(', '));
}

// Only run the demo when executed directly, not when imported.
if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}
