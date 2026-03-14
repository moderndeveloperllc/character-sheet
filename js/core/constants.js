/* ═══════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════ */
const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const ABILITY_NAMES = {
  str: 'Strength', dex: 'Dexterity', con: 'Constitution',
  int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma'
};
const ABILITY_SHORT = {
  str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA'
};

const SKILLS = [
  { name: 'Acrobatics', key: 'acrobatics', ability: 'dex' },
  { name: 'Animal Handling', key: 'animalHandling', ability: 'wis' },
  { name: 'Arcana', key: 'arcana', ability: 'int' },
  { name: 'Athletics', key: 'athletics', ability: 'str' },
  { name: 'Deception', key: 'deception', ability: 'cha' },
  { name: 'History', key: 'history', ability: 'int' },
  { name: 'Insight', key: 'insight', ability: 'wis' },
  { name: 'Intimidation', key: 'intimidation', ability: 'cha' },
  { name: 'Investigation', key: 'investigation', ability: 'int' },
  { name: 'Medicine', key: 'medicine', ability: 'wis' },
  { name: 'Nature', key: 'nature', ability: 'int' },
  { name: 'Perception', key: 'perception', ability: 'wis' },
  { name: 'Performance', key: 'performance', ability: 'cha' },
  { name: 'Persuasion', key: 'persuasion', ability: 'cha' },
  { name: 'Religion', key: 'religion', ability: 'int' },
  { name: 'Sleight of Hand', key: 'sleightOfHand', ability: 'dex' },
  { name: 'Stealth', key: 'stealth', ability: 'dex' },
  { name: 'Survival', key: 'survival', ability: 'wis' },
];

const SPELL_SCHOOLS = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment',
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
];

const DAMAGE_TYPES = [
  'Slashing', 'Piercing', 'Bludgeoning', 'Fire', 'Cold', 'Lightning',
  'Thunder', 'Poison', 'Acid', 'Necrotic', 'Radiant', 'Force', 'Psychic'
];

const CURRENCIES = [
  { key: 'cp', label: 'CP' },
  { key: 'sp', label: 'SP' },
  { key: 'ep', label: 'EP' },
  { key: 'gp', label: 'GP' },
  { key: 'pp', label: 'PP' },
];

const STORAGE_KEY = 'dnd55e_character';
