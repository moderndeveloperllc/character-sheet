# D&D 5.5e Character Sheet

A fully-featured, offline-capable D&D 5.5e (2024 rules) character sheet built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies. Open the file and play.

![Dark fantasy themed character sheet with gold accents](https://img.shields.io/badge/D%26D-5.5e-c9a84c?style=for-the-badge&labelColor=1a1613)

## Features

**Character Management**
- Full character sheet: abilities, saves, skills, combat stats, HP, spells, equipment, and backstory
- Auto-calculated everything: modifiers, proficiency bonus, AC (class-aware unarmored defense), initiative, spell save DC, spell attack bonus, weapon bonuses, carrying capacity
- Spell slots auto-populate based on class and level (full casters, half-casters, and Warlock Pact Magic)
- localStorage persistence with JSON import/export for backup and sharing

**Data-Driven Dropdowns**
- 12 classes with subclasses and class resource trackers
- 10 races with traits and speed
- 15 backgrounds with skill proficiencies
- 35 SRD weapons with damage, type, and properties
- 274 SRD spells (cantrips through 9th level) filtered by your class and available spell levels
- All dropdowns accept free text for homebrew content

**Combat & Conditions**
- 12 toggleable conditions: Raging, Blessed, Hex, Hunter's Mark, Hasted, Frightened, Poisoned, and more
- Conditions automatically modify dice rolls, weapon damage, and advantage/disadvantage
- Class resources with pip trackers: Rage uses, Ki Points, Sorcery Points, Bardic Inspiration, etc.
- Short Rest and Long Rest buttons with proper resource recovery

**Dice Roller**
- Fixed bottom tray with d4, d6, d8, d10, d12, d20, d100
- Advantage/Disadvantage toggle affecting all d20 rolls
- Manual dice input (e.g., `2d8+5`)
- Roll log with labeled entries from skill checks, saves, and attacks
- Full-screen dramatic overlay for Natural 20s and Natural 1s

**Design**
- Dark fantasy aesthetic optimized for laptop/tablet use at the gaming table
- Cinzel display typography with EB Garamond body text
- Gold accent system with custom-styled checkboxes, dropdowns, and pip trackers
- Responsive layout that adapts to smaller screens

## Quick Start

Open `index.html` in your browser. That's it. Works from the filesystem with no server needed.

For development with live reload, serve locally:

```
python3 -m http.server
```

Then open `http://localhost:8000`.

## Project Structure

```
index.html              App shell and HTML structure
css/
  theme.css             CSS variables, fonts, base styles
  layout.css            Grid layout, panels, responsive breakpoints
  components.css        All component styles
js/
  data/srd.js           SRD reference data (classes, races, backgrounds, weapons, spells)
  core/
    constants.js        Shared constants (abilities, skills, spell schools)
    helpers.js          DOM helpers (el, clearChildren, createComboBox, createSelect)
    state.js            Character state, localStorage persistence
    calculations.js     All derived stat calculations
    dice.js             Dice rolling engine, roll log, overlay
  systems/
    conditions.js       Buff/debuff definitions and effect engine
    rest.js             Short rest and long rest logic
  views/                One file per UI section (header, abilities, combat, weapons, etc.)
  app.js                Initialization, event wiring, update cascade
```

Scripts load via classic `<script>` tags in dependency order. All functions are globals. No ES modules, no bundler.

## License

MIT
