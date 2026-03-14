# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A D&D 5.5e (2024 rules) character sheet built with vanilla HTML/CSS/JS -- no frameworks, no build step, no ES modules. Works from `file://` or any static server.

## How to run

Open `index.html` directly in a browser, or serve locally:
```
python3 -m http.server
```

## Architecture

**Script loading order matters.** All JS files are loaded via classic `<script>` tags in `index.html` (lines 355-373). Every function and constant is a global. The load order is: data (srd.js) -> core (constants, helpers, state, calculations, dice) -> systems (conditions, rest) -> views -> app.js (entry point, must be last).

**State is a single global `char` object** (`js/core/state.js`). It is created by `createDefaultCharacter()` and persisted to `localStorage` under the key `dnd55e_character`. Roll history is stored separately under `dnd55e_character_rolls`.

**Initialization flow** (`js/app.js`): `DOMContentLoaded` -> `init()` -> `load()` (hydrate state from localStorage) -> `setupHeaderCombos()` -> `setupEvents()` -> `initUI()` (render all sections + `updateCalculated()`).

## Key patterns

**DOM construction:** Use `el(tag, attrs, children)` and `clearChildren(parent)` from `js/core/helpers.js`. Never use `innerHTML`. The `el()` helper handles `className`, `textContent`, `on*` event listeners, and `data*` attributes via its attrs object.

**Views are render functions** that clear their container and rebuild from `char` state (e.g., `renderWeapons()`, `renderSaves()`, `renderSpells()`). Each view file corresponds to a panel in the UI.

**`save()` must be called after any `char` mutation.** It writes the full `char` object to localStorage.

**`updateCalculated()`** cascades derived values: proficiency bonus, saving throws, skills, passives, initiative, spell DC/attack, weapon bonuses, and carry capacity. Call it after changes to level, abilities, or proficiencies.

**ComboBox** (`createComboBox()` in helpers.js): A dropdown component that supports both selection from a list and free text input. Used for class, race, background, and weapon name fields. Supports grouped options via `groupBy`, keyboard navigation, and auto-positioning.

**Conditions system** (`js/systems/conditions.js`): `CONDITION_DEFS` declares effects declaratively (advantage/disadvantage on specific roll types, attack/save/damage bonuses, damage resistance). Active conditions are stored in `char.activeConditions[]` as string keys. The functions `getConditionAdvantage()`, `getConditionAttackMods()`, `getConditionSaveMods()`, and `getConditionDamageBonus()` aggregate effects from all active conditions and are called automatically during rolls.

**Dice rolls** go through `rollCheck()` for d20 rolls (attacks, saves, checks) and `rollWeaponDamage()` for damage. Both integrate with the conditions system and log results via `addToLog()`.

**Class resources** use `maxFormula` strings (e.g., `'level'`, `'profBonus'`, `'chaMod'`, `'layOnHands'`, `'rageUses'`) resolved by `getResourceMax()` in calculations.js. Each resource tracks `restoreOn: 'short'|'long'`.

## Data

SRD reference data lives in `js/data/srd.js`: `CLASS_DATA`, `RACE_DATA`, `BACKGROUND_DATA`, `WEAPON_DATA`. These power ComboBox dropdowns and auto-fill when a user selects an option.

## Design system

CSS variables are defined in `css/theme.css`. Dark fantasy aesthetic: deep brown/black backgrounds, gold accents (`--gold: #c9a84c`). Typography: Cinzel for display/headers (`--font-display`), EB Garamond for body text (`--font-body`). Three CSS files: `theme.css` (variables + base), `layout.css` (grid + panels), `components.css` (inputs, buttons, dice tray, conditions).
