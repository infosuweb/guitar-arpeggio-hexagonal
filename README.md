# guitar-arpeggio

Pure-data representation of a full guitar arpeggio across the fretboard. No UI,
no external dependencies, no music-theory libraries — all note logic is plain
modular arithmetic over the 12 chromatic notes.

A standard 6-string guitar in EADGBE tuning (6th → 1st) is assumed. A *full
arpeggio* is every position on the neck (up to a configurable max fret) whose
note belongs to the chord defined by a root + type.

## API

```ts
import { getArpeggio, ascending } from 'guitar-arpeggio';

type Note = 'C' | 'C#' | 'D' | ... | 'B';        // sharp spelling (flats accepted as input)
type ChordType = 'maj' | 'min' | 'maj7' | 'min7' | 'dom7' | 'dim';

interface FretPosition {
  string: 1 | 2 | 3 | 4 | 5 | 6;  // 1 = high E, 6 = low E
  fret: number;                    // 0 = open
  note: Note;
}

getArpeggio(root: Note, type: ChordType, maxFret = 12): FretPosition[];
ascending(positions: FretPosition[]): FretPosition[];  // sorted by real pitch, low → high
```

## Example

```ts
const cmaj = getArpeggio('C', 'maj');   // only C, E, G across the neck
for (const p of ascending(cmaj)) {
  console.log(`string ${p.string}, fret ${p.fret} -> ${p.note}`);
}
```

Output (C major, ascending):

```
string 6, fret  0 -> E
string 6, fret  3 -> G
string 6, fret  8 -> C
string 5, fret  3 -> C
...
string 1, fret 12 -> E
Distinct notes: C, E, G
```

## Develop

```bash
npm install
npx tsc --noEmit   # typecheck (strict)
npx tsx src/index.ts   # run the demo
```

## Web UI

Abre el diapasón interactivo en el navegador con un servidor HTTP local:

```bash
python3 -m http.server 3456
```

Luego visita **http://localhost:3456**
