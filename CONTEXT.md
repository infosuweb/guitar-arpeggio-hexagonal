# Domain Glossary — guitar-arpeggio

## Pattern
A named set of semitone intervals from a root note that defines which fretboard positions are active. Encompasses arpeggios (maj, min7, dom7…), modes (dorian, phrygian…), and pentatonic scales (pent_maj, pent_min). **Not** a "chord type" — the UI label "Acorde" is a misnomer; the correct umbrella term is Pattern.

## Progression
An ordered sequence of Patterns (each with a root + type) that the user builds over time to form a musical idea. The current arpeggio list in the UI is the Progression. Patterns in a Progression are displayed simultaneously on the fretboard, each with a distinct color.

## Suggestion
One AI-generated candidate for the next Pattern to add to the Progression. A Suggestion carries a root, a type, and a short musical explanation. The UI presents several Suggestions at once so the user can choose. Accepting a Suggestion appends it to the Progression exactly as if the user had added it manually.

## Avoid Note
A note that falls outside the tonal center inferred from the current Progression. Displayed on the fretboard as a visual warning marker while AI Suggestions are visible. Disappears when the suggestion panel is dismissed. Avoid Notes are global to the Progression — they are not per-Suggestion.

## Fret Position
A single playable location on the fretboard: string (1–6) + fret (0–12) + note name. A Pattern over a root produces a set of Fret Positions.
