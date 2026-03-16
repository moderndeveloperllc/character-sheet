/**
 * D&D 5.5e (2024) SRD Data
 * All data constants for classes, races, backgrounds, and weapons.
 */

// ---------------------------------------------------------------------------
// CLASS_DATA
// ---------------------------------------------------------------------------
const CLASS_DATA = {
  barbarian: {
    name: 'Barbarian',
    hitDie: 12,
    saves: ['str', 'con'],
    spellcasting: null, casterType: null,
    unarmoredAC: ['dex', 'con'],
    subclasses: ['Path of the Berserker', 'Path of the Wild Heart', 'Path of the World Tree', 'Path of the Zealot'],
    skillChoices: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    features: 'Rage, Unarmored Defense, Reckless Attack, Danger Sense, Primal Knowledge, Extra Attack, Fast Movement, Feral Instinct, Brutal Strike, Relentless Rage, Primal Champion',
    resources: [
      { name: 'Rage', maxFormula: 'rageUses', restoreOn: 'long' }
    ]
  },

  bard: {
    name: 'Bard',
    hitDie: 8,
    saves: ['dex', 'cha'],
    spellcasting: 'cha', casterType: 'full',
    subclasses: ['College of Dance', 'College of Glamour', 'College of Lore', 'College of Valor'],
    skillChoices: null,
    features: 'Bardic Inspiration, Spellcasting, Expertise, Jack of All Trades, Font of Inspiration, Countercharm, Superior Inspiration',
    resources: [
      { name: 'Bardic Inspiration', maxFormula: 'chaMod', restoreOn: 'short' }
    ]
  },

  cleric: {
    name: 'Cleric',
    hitDie: 8,
    saves: ['wis', 'cha'],
    spellcasting: 'wis', casterType: 'full',
    subclasses: ['Life Domain', 'Light Domain', 'Trickery Domain', 'War Domain'],
    skillChoices: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    features: 'Spellcasting, Channel Divinity, Turn Undead, Divine Intervention, Blessed Strikes, Greater Divine Intervention',
    resources: [
      { name: 'Channel Divinity', maxFormula: 1, restoreOn: 'short' }
    ]
  },

  druid: {
    name: 'Druid',
    hitDie: 8,
    saves: ['int', 'wis'],
    spellcasting: 'wis', casterType: 'full',
    subclasses: ['Circle of the Land', 'Circle of the Moon', 'Circle of the Sea', 'Circle of the Stars'],
    skillChoices: ['animalHandling', 'arcana', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
    features: 'Spellcasting, Druidic, Wild Shape, Wild Companion, Elemental Fury, Beast Spells, Archdruid',
    resources: [
      { name: 'Wild Shape', maxFormula: 2, restoreOn: 'short' }
    ]
  },

  fighter: {
    name: 'Fighter',
    hitDie: 10,
    saves: ['str', 'con'],
    spellcasting: null, casterType: null,
    subclasses: ['Battle Master', 'Champion', 'Eldritch Knight', 'Psi Warrior'],
    skillChoices: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
    features: 'Fighting Style, Second Wind, Action Surge, Extra Attack, Indomitable, Tactical Master, Studied Attacks',
    resources: [
      { name: 'Action Surge', maxFormula: 1, restoreOn: 'short' },
      { name: 'Second Wind', maxFormula: 1, restoreOn: 'short' }
    ]
  },

  monk: {
    name: 'Monk',
    hitDie: 8,
    saves: ['str', 'dex'],
    spellcasting: null, casterType: null,
    unarmoredAC: ['dex', 'wis'],
    subclasses: ['Warrior of Mercy', 'Warrior of Shadow', 'Warrior of the Elements', 'Warrior of the Open Hand'],
    skillChoices: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
    features: 'Martial Arts, Unarmored Defense, Ki, Unarmored Movement, Deflect Missiles, Slow Fall, Extra Attack, Stunning Strike, Evasion, Stillness of Mind, Perfect Self',
    resources: [
      { name: 'Ki Points', maxFormula: 'level', restoreOn: 'short' }
    ]
  },

  paladin: {
    name: 'Paladin',
    hitDie: 10,
    saves: ['wis', 'cha'],
    spellcasting: 'cha', casterType: 'half',
    subclasses: ['Oath of Devotion', 'Oath of Glory', 'Oath of the Ancients', 'Oath of Vengeance'],
    skillChoices: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
    features: 'Divine Sense, Lay on Hands, Fighting Style, Spellcasting, Divine Smite, Channel Divinity, Extra Attack, Aura of Protection, Aura of Courage',
    resources: [
      { name: 'Lay on Hands', maxFormula: 'layOnHands', restoreOn: 'long' },
      { name: 'Channel Divinity', maxFormula: 1, restoreOn: 'short' }
    ]
  },

  ranger: {
    name: 'Ranger',
    hitDie: 10,
    saves: ['str', 'dex'],
    spellcasting: 'wis', casterType: 'half',
    subclasses: ['Beast Master', 'Fey Wanderer', 'Gloom Stalker', 'Hunter'],
    skillChoices: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
    features: 'Favored Enemy, Deft Explorer, Fighting Style, Spellcasting, Primal Awareness, Extra Attack, Roving, Tireless, Vanish, Feral Senses, Foe Slayer',
    resources: [
      { name: 'Favored Foe', maxFormula: 'profBonus', restoreOn: 'long' }
    ]
  },

  rogue: {
    name: 'Rogue',
    hitDie: 8,
    saves: ['dex', 'int'],
    spellcasting: null, casterType: null,
    subclasses: ['Arcane Trickster', 'Assassin', 'Soulknife', 'Thief'],
    skillChoices: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleightOfHand', 'stealth'],
    features: 'Expertise, Sneak Attack, Thieves Cant, Cunning Action, Uncanny Dodge, Evasion, Reliable Talent, Blindsense, Slippery Mind, Elusive, Stroke of Luck',
    resources: []
  },

  sorcerer: {
    name: 'Sorcerer',
    hitDie: 6,
    saves: ['con', 'cha'],
    spellcasting: 'cha', casterType: 'full',
    subclasses: ['Aberrant Sorcery', 'Clockwork Sorcery', 'Draconic Sorcery', 'Wild Magic Sorcery'],
    skillChoices: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
    features: 'Spellcasting, Font of Magic, Sorcery Points, Metamagic, Sorcerous Restoration',
    resources: [
      { name: 'Sorcery Points', maxFormula: 'level', restoreOn: 'long' }
    ]
  },

  warlock: {
    name: 'Warlock',
    hitDie: 8,
    saves: ['wis', 'cha'],
    spellcasting: 'cha', casterType: 'pact',
    subclasses: ['Archfey Patron', 'Celestial Patron', 'Fiend Patron', 'Great Old One Patron'],
    skillChoices: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
    features: 'Pact Magic, Eldritch Invocations, Pact Boon, Mystic Arcanum, Eldritch Master',
    resources: []
  },

  wizard: {
    name: 'Wizard',
    hitDie: 6,
    saves: ['int', 'wis'],
    spellcasting: 'int', casterType: 'full',
    subclasses: ['Abjurer', 'Diviner', 'Evoker', 'Illusionist'],
    skillChoices: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
    features: 'Spellcasting, Arcane Recovery, Spell Mastery, Signature Spells',
    resources: [
      { name: 'Arcane Recovery', maxFormula: 1, restoreOn: 'long' }
    ]
  }
};

// ---------------------------------------------------------------------------
// SPELL SLOT PROGRESSION (full caster table, indexed by level 1-20)
// ---------------------------------------------------------------------------
const SPELL_SLOT_TABLE = {
  //        1  2  3  4  5  6  7  8  9
  1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

// Warlock Pact Magic: [numSlots, slotLevel]
const PACT_MAGIC_TABLE = {
  1: [1, 1], 2: [2, 1], 3: [2, 2], 4: [2, 2], 5: [2, 3],
  6: [2, 3], 7: [2, 4], 8: [2, 4], 9: [2, 5], 10: [2, 5],
  11: [3, 5], 12: [3, 5], 13: [3, 5], 14: [3, 5], 15: [3, 5],
  16: [3, 5], 17: [4, 5], 18: [4, 5], 19: [4, 5], 20: [4, 5],
};

// ---------------------------------------------------------------------------
// RACE_DATA
// ---------------------------------------------------------------------------
const RACE_DATA = {
  human: {
    name: 'Human',
    speed: 30,
    size: 'Medium',
    traits: 'Resourceful (gain Heroic Inspiration at the start of each long rest), Skillful (gain proficiency in one skill of your choice), Versatile (gain an Origin feat of your choice)'
  },

  elf: {
    name: 'Elf',
    speed: 30,
    size: 'Medium',
    traits: 'Darkvision (60 ft), Keen Senses (proficiency in Perception), Fey Ancestry (advantage on saves against Charmed, immune to magical sleep), Trance (4-hour long rest, remain semiconscious)'
  },

  dwarf: {
    name: 'Dwarf',
    speed: 30,
    size: 'Medium',
    traits: 'Darkvision (120 ft), Dwarven Resilience (resistance to Poison damage, advantage on saves against Poisoned), Dwarven Toughness (hit point maximum increases by 1 per level), Stonecunning (tremorsense 60 ft for 10 minutes, proficiency bonus per long rest)'
  },

  halfling: {
    name: 'Halfling',
    speed: 30,
    size: 'Small',
    traits: 'Brave (advantage on saves against Frightened), Halfling Nimbleness (move through the space of any creature of a size larger than yours), Luck (reroll a 1 on a d20 for attack rolls, ability checks, or saving throws), Naturally Stealthy (can hide behind a creature at least one size larger)'
  },

  gnome: {
    name: 'Gnome',
    speed: 30,
    size: 'Small',
    traits: 'Darkvision (60 ft), Gnomish Cunning (advantage on Intelligence, Wisdom, and Charisma saving throws), Gnomish Lineage (choose Forest Gnome for Minor Illusion and Speak with Small Beasts, or Rock Gnome for Mending and Tinker)'
  },

  orc: {
    name: 'Orc',
    speed: 30,
    size: 'Medium',
    traits: 'Darkvision (120 ft), Adrenaline Rush (Dash as a bonus action, gain temporary hit points equal to proficiency bonus, proficiency bonus uses per long rest), Relentless Endurance (drop to 1 HP instead of 0 once per long rest)'
  },

  tiefling: {
    name: 'Tiefling',
    speed: 30,
    size: 'Medium or Small',
    traits: 'Darkvision (60 ft), Fiendish Legacy (choose Abyssal for poison resistance and Poison Spray/Ray of Sickness, Chthonic for necrotic resistance and Chill Touch/False Life, or Infernal for fire resistance and Thaumaturgy/Hellish Rebuke), Otherworldly Presence (know Thaumaturgy cantrip)'
  },

  dragonborn: {
    name: 'Dragonborn',
    speed: 30,
    size: 'Medium',
    traits: 'Draconic Ancestry (choose a dragon type for damage resistance and breath weapon damage type), Breath Weapon (exhale destructive energy in a 15 ft cone or 30 ft line, Constitution save, proficiency bonus uses per long rest), Damage Resistance (resistance to damage type associated with ancestry), Darkvision (60 ft)'
  },

  goliath: {
    name: 'Goliath',
    speed: 35,
    size: 'Medium',
    traits: 'Large Form (advantage on Strength checks, count as Large for carrying capacity), Giant Ancestry (choose Cloud for use of Misty Step, Fire for fire resistance and added fire damage, Frost for cold resistance and added cold damage, Hill for resistance to being knocked prone and Shillelagh, Stone for AC bonus and Blade Ward, or Storm for lightning resistance and Thunderwave), Powerful Build (count as one size larger for carrying capacity and push/drag/lift)'
  },

  aasimar: {
    name: 'Aasimar',
    speed: 30,
    size: 'Medium or Small',
    traits: 'Celestial Resistance (resistance to Necrotic and Radiant damage), Darkvision (60 ft), Healing Hands (restore hit points equal to proficiency bonus as an action, once per long rest), Light Bearer (know the Light cantrip), Celestial Revelation (at 3rd level, choose Heavenly Wings, Inner Radiance, or Necrotic Shroud transformation once per long rest)'
  }
};

// ---------------------------------------------------------------------------
// BACKGROUND_DATA
// ---------------------------------------------------------------------------
const BACKGROUND_DATA = {
  acolyte: {
    name: 'Acolyte',
    skills: ['insight', 'religion'],
    feat: 'Magic Initiate (Cleric)',
    description: 'You devoted yourself to service in a temple, learning sacred rites and providing sacrifices to the gods.'
  },

  charlatan: {
    name: 'Charlatan',
    skills: ['deception', 'sleightOfHand'],
    feat: 'Skilled',
    description: 'You learned to bend the truth and exploit the confidence of others through deception and misdirection.'
  },

  criminal: {
    name: 'Criminal',
    skills: ['sleightOfHand', 'stealth'],
    feat: 'Alert',
    description: 'You learned to survive on the streets by breaking the law, developing skills in stealth and subterfuge.'
  },

  entertainer: {
    name: 'Entertainer',
    skills: ['acrobatics', 'performance'],
    feat: 'Musician',
    description: 'You spent your early years performing before audiences, honing your craft as a musician, dancer, or actor.'
  },

  farmer: {
    name: 'Farmer',
    skills: ['animalHandling', 'nature'],
    feat: 'Tough',
    description: 'You grew up working the land, tending crops and livestock, and learning the rhythms of nature.'
  },

  guard: {
    name: 'Guard',
    skills: ['athletics', 'perception'],
    feat: 'Alert',
    description: 'You served as a guard, keeping watch over a settlement, caravan, or important location.'
  },

  guide: {
    name: 'Guide',
    skills: ['stealth', 'survival'],
    feat: 'Magic Initiate (Druid)',
    description: 'You spent your formative years navigating the wilderness, learning the ways of the wild as a trailblazer and pathfinder.'
  },

  hermit: {
    name: 'Hermit',
    skills: ['medicine', 'religion'],
    feat: 'Healer',
    description: 'You spent years in seclusion, studying, meditating, or surviving alone in a remote area.'
  },

  merchant: {
    name: 'Merchant',
    skills: ['animalHandling', 'persuasion'],
    feat: 'Lucky',
    description: 'You earned a living trading goods between settlements, learning to negotiate and appraise wares.'
  },

  noble: {
    name: 'Noble',
    skills: ['history', 'persuasion'],
    feat: 'Skilled',
    description: 'You were raised among the aristocracy, educated in etiquette, heraldry, and the duties of privilege.'
  },

  sage: {
    name: 'Sage',
    skills: ['arcana', 'history'],
    feat: 'Magic Initiate (Wizard)',
    description: 'You spent your formative years studying lore, poring over ancient texts and learning the secrets of the multiverse.'
  },

  sailor: {
    name: 'Sailor',
    skills: ['athletics', 'perception'],
    feat: 'Tavern Brawler',
    description: 'You spent your youth aboard a vessel, learning to navigate the seas and survive storms and pirates.'
  },

  scribe: {
    name: 'Scribe',
    skills: ['investigation', 'perception'],
    feat: 'Skilled',
    description: 'You spent years recording knowledge, copying manuscripts, and cataloging information for an institution.'
  },

  soldier: {
    name: 'Soldier',
    skills: ['athletics', 'intimidation'],
    feat: 'Savage Attacker',
    description: 'You served in a military force, learning discipline, tactics, and the art of warfare.'
  },

  wayfarer: {
    name: 'Wayfarer',
    skills: ['insight', 'stealth'],
    feat: 'Lucky',
    description: 'You grew up on the road, traveling from place to place, learning to survive by your wits and charm.'
  }
};

// ---------------------------------------------------------------------------
// WEAPON_DATA
// ---------------------------------------------------------------------------
const WEAPON_DATA = {
  // ---- Simple Melee Weapons ----
  club: {
    name: 'Club',
    damageDice: '1d4',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['light'],
    category: 'Simple Melee',
    weight: 2
  },

  dagger: {
    name: 'Dagger',
    damageDice: '1d4',
    damageType: 'piercing',
    ability: 'finesse',
    properties: ['finesse', 'light', 'thrown (20/60)'],
    category: 'Simple Melee',
    weight: 1
  },

  greatclub: {
    name: 'Greatclub',
    damageDice: '1d8',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['two-handed'],
    category: 'Simple Melee',
    weight: 10
  },

  handaxe: {
    name: 'Handaxe',
    damageDice: '1d6',
    damageType: 'slashing',
    ability: 'str',
    properties: ['light', 'thrown (20/60)'],
    category: 'Simple Melee',
    weight: 2
  },

  javelin: {
    name: 'Javelin',
    damageDice: '1d6',
    damageType: 'piercing',
    ability: 'str',
    properties: ['thrown (30/120)'],
    category: 'Simple Melee',
    weight: 2
  },

  lightHammer: {
    name: 'Light Hammer',
    damageDice: '1d4',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['light', 'thrown (20/60)'],
    category: 'Simple Melee',
    weight: 2
  },

  mace: {
    name: 'Mace',
    damageDice: '1d6',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: [],
    category: 'Simple Melee',
    weight: 4
  },

  quarterstaff: {
    name: 'Quarterstaff',
    damageDice: '1d6',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['versatile (1d8)'],
    category: 'Simple Melee',
    weight: 4
  },

  sickle: {
    name: 'Sickle',
    damageDice: '1d4',
    damageType: 'slashing',
    ability: 'str',
    properties: ['light'],
    category: 'Simple Melee',
    weight: 2
  },

  spear: {
    name: 'Spear',
    damageDice: '1d6',
    damageType: 'piercing',
    ability: 'str',
    properties: ['thrown (20/60)', 'versatile (1d8)'],
    category: 'Simple Melee',
    weight: 3
  },

  // ---- Simple Ranged Weapons ----
  lightCrossbow: {
    name: 'Light Crossbow',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'dex',
    properties: ['ammunition (80/320)', 'loading', 'two-handed'],
    category: 'Simple Ranged',
    weight: 5
  },

  dart: {
    name: 'Dart',
    damageDice: '1d4',
    damageType: 'piercing',
    ability: 'finesse',
    properties: ['finesse', 'thrown (20/60)'],
    category: 'Simple Ranged',
    weight: 0.25
  },

  shortbow: {
    name: 'Shortbow',
    damageDice: '1d6',
    damageType: 'piercing',
    ability: 'dex',
    properties: ['ammunition (80/320)', 'two-handed'],
    category: 'Simple Ranged',
    weight: 2
  },

  sling: {
    name: 'Sling',
    damageDice: '1d4',
    damageType: 'bludgeoning',
    ability: 'dex',
    properties: ['ammunition (30/120)'],
    category: 'Simple Ranged',
    weight: 0
  },

  // ---- Martial Melee Weapons ----
  battleaxe: {
    name: 'Battleaxe',
    damageDice: '1d8',
    damageType: 'slashing',
    ability: 'str',
    properties: ['versatile (1d10)'],
    category: 'Martial Melee',
    weight: 4
  },

  flail: {
    name: 'Flail',
    damageDice: '1d8',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: [],
    category: 'Martial Melee',
    weight: 2
  },

  glaive: {
    name: 'Glaive',
    damageDice: '1d10',
    damageType: 'slashing',
    ability: 'str',
    properties: ['heavy', 'reach', 'two-handed'],
    category: 'Martial Melee',
    weight: 6
  },

  greataxe: {
    name: 'Greataxe',
    damageDice: '1d12',
    damageType: 'slashing',
    ability: 'str',
    properties: ['heavy', 'two-handed'],
    category: 'Martial Melee',
    weight: 7
  },

  greatsword: {
    name: 'Greatsword',
    damageDice: '2d6',
    damageType: 'slashing',
    ability: 'str',
    properties: ['heavy', 'two-handed'],
    category: 'Martial Melee',
    weight: 6
  },

  halberd: {
    name: 'Halberd',
    damageDice: '1d10',
    damageType: 'slashing',
    ability: 'str',
    properties: ['heavy', 'reach', 'two-handed'],
    category: 'Martial Melee',
    weight: 6
  },

  lance: {
    name: 'Lance',
    damageDice: '1d10',
    damageType: 'piercing',
    ability: 'str',
    properties: ['heavy', 'reach'],
    category: 'Martial Melee',
    weight: 6
  },

  longsword: {
    name: 'Longsword',
    damageDice: '1d8',
    damageType: 'slashing',
    ability: 'str',
    properties: ['versatile (1d10)'],
    category: 'Martial Melee',
    weight: 3
  },

  maul: {
    name: 'Maul',
    damageDice: '2d6',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['heavy', 'two-handed'],
    category: 'Martial Melee',
    weight: 10
  },

  morningstar: {
    name: 'Morningstar',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'str',
    properties: [],
    category: 'Martial Melee',
    weight: 4
  },

  pike: {
    name: 'Pike',
    damageDice: '1d10',
    damageType: 'piercing',
    ability: 'str',
    properties: ['heavy', 'reach', 'two-handed'],
    category: 'Martial Melee',
    weight: 18
  },

  rapier: {
    name: 'Rapier',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'finesse',
    properties: ['finesse'],
    category: 'Martial Melee',
    weight: 2
  },

  scimitar: {
    name: 'Scimitar',
    damageDice: '1d6',
    damageType: 'slashing',
    ability: 'finesse',
    properties: ['finesse', 'light'],
    category: 'Martial Melee',
    weight: 3
  },

  shortsword: {
    name: 'Shortsword',
    damageDice: '1d6',
    damageType: 'piercing',
    ability: 'finesse',
    properties: ['finesse', 'light'],
    category: 'Martial Melee',
    weight: 2
  },

  trident: {
    name: 'Trident',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'str',
    properties: ['thrown (20/60)', 'versatile (1d10)'],
    category: 'Martial Melee',
    weight: 4
  },

  warPick: {
    name: 'War Pick',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'str',
    properties: ['versatile (1d10)'],
    category: 'Martial Melee',
    weight: 2
  },

  warhammer: {
    name: 'Warhammer',
    damageDice: '1d8',
    damageType: 'bludgeoning',
    ability: 'str',
    properties: ['versatile (1d10)'],
    category: 'Martial Melee',
    weight: 2
  },

  whip: {
    name: 'Whip',
    damageDice: '1d4',
    damageType: 'slashing',
    ability: 'finesse',
    properties: ['finesse', 'reach'],
    category: 'Martial Melee',
    weight: 3
  },

  // ---- Martial Ranged Weapons ----
  handCrossbow: {
    name: 'Hand Crossbow',
    damageDice: '1d6',
    damageType: 'piercing',
    ability: 'dex',
    properties: ['ammunition (30/120)', 'light', 'loading'],
    category: 'Martial Ranged',
    weight: 3
  },

  heavyCrossbow: {
    name: 'Heavy Crossbow',
    damageDice: '1d10',
    damageType: 'piercing',
    ability: 'dex',
    properties: ['ammunition (100/400)', 'heavy', 'loading', 'two-handed'],
    category: 'Martial Ranged',
    weight: 18
  },

  longbow: {
    name: 'Longbow',
    damageDice: '1d8',
    damageType: 'piercing',
    ability: 'dex',
    properties: ['ammunition (150/600)', 'heavy', 'two-handed'],
    category: 'Martial Ranged',
    weight: 2
  }
};

// ---------------------------------------------------------------------------
// SPELL_DATA
// ---------------------------------------------------------------------------
const SPELL_DATA = {
  // ---- Cantrips (Level 0) ----
  // attack: 'ranged'|'melee' = spell attack roll; save: ability = save-based; damage/damageType = dice & type
  acidSplash: { name: 'Acid Splash', level: 0, school: 'Conjuration', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '1d6', damageType: 'Acid' },
  bladeWard: { name: 'Blade Ward', level: 0, school: 'Abjuration', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  chillTouch: { name: 'Chill Touch', level: 0, school: 'Necromancy', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false, attack: 'ranged', damage: '1d8', damageType: 'Necrotic' },
  dancingLights: { name: 'Dancing Lights', level: 0, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  druidcraft: { name: 'Druidcraft', level: 0, school: 'Transmutation', classes: ['druid'], concentration: false },
  eldritchBlast: { name: 'Eldritch Blast', level: 0, school: 'Evocation', classes: ['warlock'], concentration: false, attack: 'ranged', damage: '1d10', damageType: 'Force' },
  fireBolt: { name: 'Fire Bolt', level: 0, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, attack: 'ranged', damage: '1d10', damageType: 'Fire' },
  friends: { name: 'Friends', level: 0, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  guidance: { name: 'Guidance', level: 0, school: 'Divination', classes: ['cleric', 'druid'], concentration: true },
  light: { name: 'Light', level: 0, school: 'Evocation', classes: ['bard', 'cleric', 'sorcerer', 'wizard'], concentration: false },
  mageHand: { name: 'Mage Hand', level: 0, school: 'Conjuration', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  mending: { name: 'Mending', level: 0, school: 'Transmutation', classes: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'], concentration: false },
  message: { name: 'Message', level: 0, school: 'Transmutation', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  minorIllusion: { name: 'Minor Illusion', level: 0, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  poisonSpray: { name: 'Poison Spray', level: 0, school: 'Conjuration', classes: ['druid', 'sorcerer', 'warlock', 'wizard'], concentration: false, save: 'con', damage: '1d12', damageType: 'Poison' },
  prestidigitation: { name: 'Prestidigitation', level: 0, school: 'Transmutation', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  produceFlame: { name: 'Produce Flame', level: 0, school: 'Conjuration', classes: ['druid'], concentration: false, attack: 'ranged', damage: '1d8', damageType: 'Fire' },
  rayOfFrost: { name: 'Ray of Frost', level: 0, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, attack: 'ranged', damage: '1d8', damageType: 'Cold' },
  resistance: { name: 'Resistance', level: 0, school: 'Abjuration', classes: ['cleric', 'druid'], concentration: true },
  sacredFlame: { name: 'Sacred Flame', level: 0, school: 'Evocation', classes: ['cleric'], concentration: false, save: 'dex', damage: '1d8', damageType: 'Radiant' },
  shillelagh: { name: 'Shillelagh', level: 0, school: 'Transmutation', classes: ['druid'], concentration: false },
  shockingGrasp: { name: 'Shocking Grasp', level: 0, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, attack: 'melee', damage: '1d8', damageType: 'Lightning' },
  spareTheDying: { name: 'Spare the Dying', level: 0, school: 'Necromancy', classes: ['cleric'], concentration: false },
  thaumaturgy: { name: 'Thaumaturgy', level: 0, school: 'Transmutation', classes: ['cleric'], concentration: false },
  thornWhip: { name: 'Thorn Whip', level: 0, school: 'Transmutation', classes: ['druid'], concentration: false, attack: 'melee', damage: '1d6', damageType: 'Piercing' },
  trueStrike: { name: 'True Strike', level: 0, school: 'Divination', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false, attack: 'melee', damage: '1d6', damageType: 'Force' },
  viciousMockery: { name: 'Vicious Mockery', level: 0, school: 'Enchantment', classes: ['bard'], concentration: false, save: 'wis', damage: '1d4', damageType: 'Psychic' },

  // ---- 1st Level Spells ----
  alarm: { name: 'Alarm', level: 1, school: 'Abjuration', classes: ['ranger', 'wizard'], concentration: false, ritual: true },
  animalFriendship: { name: 'Animal Friendship', level: 1, school: 'Enchantment', classes: ['bard', 'druid', 'ranger'], concentration: false },
  armorOfAgathys: { name: 'Armor of Agathys', level: 1, school: 'Abjuration', classes: ['warlock'], concentration: false },
  bane: { name: 'Bane', level: 1, school: 'Enchantment', classes: ['bard', 'cleric'], concentration: true },
  bless: { name: 'Bless', level: 1, school: 'Enchantment', classes: ['cleric', 'paladin'], concentration: true },
  burningHands: { name: 'Burning Hands', level: 1, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '3d6', damageType: 'Fire' },
  charmPerson: { name: 'Charm Person', level: 1, school: 'Enchantment', classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  chromaticOrb: { name: 'Chromatic Orb', level: 1, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, attack: 'ranged', damage: '3d8', damageType: 'Acid' },
  colorSpray: { name: 'Color Spray', level: 1, school: 'Illusion', classes: ['sorcerer', 'wizard'], concentration: false },
  command: { name: 'Command', level: 1, school: 'Enchantment', classes: ['cleric', 'paladin'], concentration: false },
  compelledDuel: { name: 'Compelled Duel', level: 1, school: 'Enchantment', classes: ['paladin'], concentration: true },
  comprehendLanguages: { name: 'Comprehend Languages', level: 1, school: 'Divination', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false, ritual: true },
  createOrDestroyWater: { name: 'Create or Destroy Water', level: 1, school: 'Transmutation', classes: ['cleric', 'druid'], concentration: false },
  cureWounds: { name: 'Cure Wounds', level: 1, school: 'Evocation', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'], concentration: false },
  detectEvilAndGood: { name: 'Detect Evil and Good', level: 1, school: 'Divination', classes: ['cleric', 'paladin'], concentration: true },
  detectMagic: { name: 'Detect Magic', level: 1, school: 'Divination', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard'], concentration: true, ritual: true },
  detectPoisonAndDisease: { name: 'Detect Poison and Disease', level: 1, school: 'Divination', classes: ['cleric', 'druid', 'paladin', 'ranger'], concentration: true, ritual: true },
  disguiseSelf: { name: 'Disguise Self', level: 1, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  dissonantWhispers: { name: 'Dissonant Whispers', level: 1, school: 'Enchantment', classes: ['bard'], concentration: false, save: 'wis', damage: '3d6', damageType: 'Psychic' },
  divineFavor: { name: 'Divine Favor', level: 1, school: 'Evocation', classes: ['paladin'], concentration: true },
  ensnaringStrike: { name: 'Ensnaring Strike', level: 1, school: 'Conjuration', classes: ['ranger'], concentration: true },
  entangle: { name: 'Entangle', level: 1, school: 'Conjuration', classes: ['druid'], concentration: true },
  expeditiousRetreat: { name: 'Expeditious Retreat', level: 1, school: 'Transmutation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true },
  faerieFire: { name: 'Faerie Fire', level: 1, school: 'Evocation', classes: ['bard', 'druid'], concentration: true },
  falseLife: { name: 'False Life', level: 1, school: 'Necromancy', classes: ['sorcerer', 'wizard'], concentration: false },
  featherFall: { name: 'Feather Fall', level: 1, school: 'Transmutation', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  findFamiliar: { name: 'Find Familiar', level: 1, school: 'Conjuration', classes: ['wizard'], concentration: false, ritual: true },
  fogCloud: { name: 'Fog Cloud', level: 1, school: 'Conjuration', classes: ['druid', 'ranger', 'sorcerer', 'wizard'], concentration: true },
  goodberry: { name: 'Goodberry', level: 1, school: 'Transmutation', classes: ['druid', 'ranger'], concentration: false },
  grease: { name: 'Grease', level: 1, school: 'Conjuration', classes: ['wizard'], concentration: false },
  guidingBolt: { name: 'Guiding Bolt', level: 1, school: 'Evocation', classes: ['cleric'], concentration: false, attack: 'ranged', damage: '4d6', damageType: 'Radiant' },
  hailOfThorns: { name: 'Hail of Thorns', level: 1, school: 'Conjuration', classes: ['ranger'], concentration: true },
  healingWord: { name: 'Healing Word', level: 1, school: 'Evocation', classes: ['bard', 'cleric', 'druid'], concentration: false },
  hellishRebuke: { name: 'Hellish Rebuke', level: 1, school: 'Evocation', classes: ['warlock'], concentration: false, save: 'dex', damage: '2d10', damageType: 'Fire' },
  heroism: { name: 'Heroism', level: 1, school: 'Enchantment', classes: ['bard', 'paladin'], concentration: true },
  hex: { name: 'Hex', level: 1, school: 'Enchantment', classes: ['warlock'], concentration: true },
  huntersMark: { name: "Hunter's Mark", level: 1, school: 'Divination', classes: ['ranger'], concentration: true },
  identify: { name: 'Identify', level: 1, school: 'Divination', classes: ['bard', 'wizard'], concentration: false, ritual: true },
  illusoryScript: { name: 'Illusory Script', level: 1, school: 'Illusion', classes: ['bard', 'warlock', 'wizard'], concentration: false, ritual: true },
  inflictWounds: { name: 'Inflict Wounds', level: 1, school: 'Necromancy', classes: ['cleric'], concentration: false, attack: 'melee', damage: '3d10', damageType: 'Necrotic' },
  jump: { name: 'Jump', level: 1, school: 'Transmutation', classes: ['druid', 'ranger', 'sorcerer', 'wizard'], concentration: false },
  longstrider: { name: 'Longstrider', level: 1, school: 'Transmutation', classes: ['bard', 'druid', 'ranger', 'wizard'], concentration: false },
  mageArmor: { name: 'Mage Armor', level: 1, school: 'Abjuration', classes: ['sorcerer', 'wizard'], concentration: false },
  magicMissile: { name: 'Magic Missile', level: 1, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, damage: '1d4+1', damageType: 'Force', missiles: 3 },
  protectionFromEvilAndGood: { name: 'Protection from Evil and Good', level: 1, school: 'Abjuration', classes: ['cleric', 'druid', 'paladin', 'warlock', 'wizard'], concentration: true },
  purifyFoodAndDrink: { name: 'Purify Food and Drink', level: 1, school: 'Transmutation', classes: ['cleric', 'druid', 'paladin'], concentration: false, ritual: true },
  sanctuary: { name: 'Sanctuary', level: 1, school: 'Abjuration', classes: ['cleric'], concentration: false },
  shield: { name: 'Shield', level: 1, school: 'Abjuration', classes: ['sorcerer', 'wizard'], concentration: false },
  shieldOfFaith: { name: 'Shield of Faith', level: 1, school: 'Abjuration', classes: ['cleric', 'paladin'], concentration: true },
  silentImage: { name: 'Silent Image', level: 1, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  sleep: { name: 'Sleep', level: 1, school: 'Enchantment', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  speakWithAnimals: { name: 'Speak with Animals', level: 1, school: 'Divination', classes: ['bard', 'druid', 'ranger'], concentration: false, ritual: true },
  thunderwave: { name: 'Thunderwave', level: 1, school: 'Evocation', classes: ['bard', 'druid', 'sorcerer', 'wizard'], concentration: false, save: 'con', damage: '2d8', damageType: 'Thunder' },
  unseenServant: { name: 'Unseen Servant', level: 1, school: 'Conjuration', classes: ['bard', 'warlock', 'wizard'], concentration: false, ritual: true },
  witchBolt: { name: 'Witch Bolt', level: 1, school: 'Evocation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true, attack: 'ranged', damage: '1d12', damageType: 'Lightning' },
  wrathfulSmite: { name: 'Wrathful Smite', level: 1, school: 'Evocation', classes: ['paladin'], concentration: true },

  // ---- 2nd Level Spells ----
  aid: { name: 'Aid', level: 2, school: 'Abjuration', classes: ['bard', 'cleric', 'paladin', 'ranger'], concentration: false },
  alterSelf: { name: 'Alter Self', level: 2, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: true },
  animalMessenger: { name: 'Animal Messenger', level: 2, school: 'Enchantment', classes: ['bard', 'druid', 'ranger'], concentration: false, ritual: true },
  augury: { name: 'Augury', level: 2, school: 'Divination', classes: ['cleric', 'druid', 'wizard'], concentration: false, ritual: true },
  barkskin: { name: 'Barkskin', level: 2, school: 'Transmutation', classes: ['druid', 'ranger'], concentration: true },
  blindnessDeafness: { name: 'Blindness/Deafness', level: 2, school: 'Necromancy', classes: ['bard', 'cleric', 'sorcerer', 'wizard'], concentration: false },
  blur: { name: 'Blur', level: 2, school: 'Illusion', classes: ['sorcerer', 'wizard'], concentration: true },
  brandingSmite: { name: 'Branding Smite', level: 2, school: 'Evocation', classes: ['paladin'], concentration: true },
  calmEmotions: { name: 'Calm Emotions', level: 2, school: 'Enchantment', classes: ['bard', 'cleric'], concentration: true },
  cloudOfDaggers: { name: 'Cloud of Daggers', level: 2, school: 'Conjuration', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true, damage: '4d4', damageType: 'Slashing' },
  continualFlame: { name: 'Continual Flame', level: 2, school: 'Evocation', classes: ['cleric', 'wizard'], concentration: false },
  crownOfMadness: { name: 'Crown of Madness', level: 2, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  darkness: { name: 'Darkness', level: 2, school: 'Evocation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true },
  darkvision: { name: 'Darkvision', level: 2, school: 'Transmutation', classes: ['druid', 'ranger', 'sorcerer', 'wizard'], concentration: false },
  detectThoughts: { name: 'Detect Thoughts', level: 2, school: 'Divination', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  enhanceAbility: { name: 'Enhance Ability', level: 2, school: 'Transmutation', classes: ['bard', 'cleric', 'druid', 'ranger', 'sorcerer', 'wizard'], concentration: true },
  enlargeReduce: { name: 'Enlarge/Reduce', level: 2, school: 'Transmutation', classes: ['bard', 'druid', 'sorcerer', 'wizard'], concentration: true },
  enthrall: { name: 'Enthrall', level: 2, school: 'Enchantment', classes: ['bard', 'warlock'], concentration: false },
  findSteed: { name: 'Find Steed', level: 2, school: 'Conjuration', classes: ['paladin'], concentration: false },
  findTraps: { name: 'Find Traps', level: 2, school: 'Divination', classes: ['cleric', 'druid', 'ranger'], concentration: false },
  flameBlade: { name: 'Flame Blade', level: 2, school: 'Evocation', classes: ['druid'], concentration: true, attack: 'melee', damage: '3d6', damageType: 'Fire' },
  flamingSphere: { name: 'Flaming Sphere', level: 2, school: 'Conjuration', classes: ['druid', 'sorcerer', 'wizard'], concentration: true, save: 'dex', damage: '2d6', damageType: 'Fire' },
  gentleRepose: { name: 'Gentle Repose', level: 2, school: 'Necromancy', classes: ['cleric', 'paladin', 'wizard'], concentration: false, ritual: true },
  gustOfWind: { name: 'Gust of Wind', level: 2, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: true },
  heatMetal: { name: 'Heat Metal', level: 2, school: 'Transmutation', classes: ['bard', 'druid'], concentration: true, damage: '2d8', damageType: 'Fire' },
  holdPerson: { name: 'Hold Person', level: 2, school: 'Enchantment', classes: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  invisibility: { name: 'Invisibility', level: 2, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  knock: { name: 'Knock', level: 2, school: 'Transmutation', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  lesserRestoration: { name: 'Lesser Restoration', level: 2, school: 'Abjuration', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'], concentration: false },
  levitate: { name: 'Levitate', level: 2, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: true },
  locateAnimalsOrPlants: { name: 'Locate Animals or Plants', level: 2, school: 'Divination', classes: ['bard', 'druid', 'ranger'], concentration: false, ritual: true },
  locateObject: { name: 'Locate Object', level: 2, school: 'Divination', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'], concentration: true },
  magicMouth: { name: 'Magic Mouth', level: 2, school: 'Illusion', classes: ['bard', 'wizard'], concentration: false, ritual: true },
  magicWeapon: { name: 'Magic Weapon', level: 2, school: 'Transmutation', classes: ['paladin', 'ranger', 'sorcerer', 'wizard'], concentration: true },
  melfsAcidArrow: { name: "Melf's Acid Arrow", level: 2, school: 'Evocation', classes: ['wizard'], concentration: false, attack: 'ranged', damage: '4d4', damageType: 'Acid' },
  mirrorImage: { name: 'Mirror Image', level: 2, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  mistyStep: { name: 'Misty Step', level: 2, school: 'Conjuration', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false },
  moonbeam: { name: 'Moonbeam', level: 2, school: 'Evocation', classes: ['druid'], concentration: true, save: 'con', damage: '2d10', damageType: 'Radiant' },
  passWithoutTrace: { name: 'Pass without Trace', level: 2, school: 'Abjuration', classes: ['druid', 'ranger'], concentration: true },
  phantasmalForce: { name: 'Phantasmal Force', level: 2, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  prayerOfHealing: { name: 'Prayer of Healing', level: 2, school: 'Evocation', classes: ['cleric', 'paladin'], concentration: false },
  protectionFromPoison: { name: 'Protection from Poison', level: 2, school: 'Abjuration', classes: ['cleric', 'druid', 'paladin', 'ranger'], concentration: false },
  rayOfEnfeeblement: { name: 'Ray of Enfeeblement', level: 2, school: 'Necromancy', classes: ['warlock', 'wizard'], concentration: true, attack: 'ranged' },
  scorchingRay: { name: 'Scorching Ray', level: 2, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, attack: 'ranged', damage: '2d6', damageType: 'Fire' },
  seeInvisibility: { name: 'See Invisibility', level: 2, school: 'Divination', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  shatter: { name: 'Shatter', level: 2, school: 'Evocation', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false, save: 'con', damage: '3d8', damageType: 'Thunder' },
  silence: { name: 'Silence', level: 2, school: 'Illusion', classes: ['bard', 'cleric', 'ranger'], concentration: true, ritual: true },
  spiderClimb: { name: 'Spider Climb', level: 2, school: 'Transmutation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true },
  spikeGrowth: { name: 'Spike Growth', level: 2, school: 'Transmutation', classes: ['druid', 'ranger'], concentration: true },
  spiritualWeapon: { name: 'Spiritual Weapon', level: 2, school: 'Evocation', classes: ['cleric'], concentration: false, attack: 'melee', damage: '1d8', damageType: 'Force' },
  suggestion: { name: 'Suggestion', level: 2, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  wardingBond: { name: 'Warding Bond', level: 2, school: 'Abjuration', classes: ['cleric', 'paladin'], concentration: false },
  web: { name: 'Web', level: 2, school: 'Conjuration', classes: ['sorcerer', 'wizard'], concentration: true },
  zoneOfTruth: { name: 'Zone of Truth', level: 2, school: 'Enchantment', classes: ['bard', 'cleric', 'paladin'], concentration: false },

  // ---- 3rd Level Spells ----
  animateDead: { name: 'Animate Dead', level: 3, school: 'Necromancy', classes: ['cleric', 'wizard'], concentration: false },
  auraOfVitality: { name: 'Aura of Vitality', level: 3, school: 'Evocation', classes: ['cleric', 'druid', 'paladin'], concentration: true },
  beaconOfHope: { name: 'Beacon of Hope', level: 3, school: 'Abjuration', classes: ['cleric'], concentration: true },
  bestowCurse: { name: 'Bestow Curse', level: 3, school: 'Necromancy', classes: ['bard', 'cleric', 'wizard'], concentration: true },
  blink: { name: 'Blink', level: 3, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: false },
  callLightning: { name: 'Call Lightning', level: 3, school: 'Conjuration', classes: ['druid'], concentration: true, save: 'dex', damage: '3d10', damageType: 'Lightning' },
  clairvoyance: { name: 'Clairvoyance', level: 3, school: 'Divination', classes: ['bard', 'cleric', 'sorcerer', 'wizard'], concentration: true },
  conjureAnimals: { name: 'Conjure Animals', level: 3, school: 'Conjuration', classes: ['druid', 'ranger'], concentration: true },
  conjureBarrage: { name: 'Conjure Barrage', level: 3, school: 'Conjuration', classes: ['ranger'], concentration: false, save: 'dex', damage: '3d8', damageType: 'Slashing' },
  counterspell: { name: 'Counterspell', level: 3, school: 'Abjuration', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false },
  createFoodAndWater: { name: 'Create Food and Water', level: 3, school: 'Conjuration', classes: ['cleric', 'paladin'], concentration: false },
  crusadersMantle: { name: "Crusader's Mantle", level: 3, school: 'Evocation', classes: ['paladin'], concentration: true },
  daylight: { name: 'Daylight', level: 3, school: 'Evocation', classes: ['cleric', 'druid', 'paladin', 'ranger', 'sorcerer'], concentration: false },
  dispelMagic: { name: 'Dispel Magic', level: 3, school: 'Abjuration', classes: ['bard', 'cleric', 'druid', 'paladin', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  elementalWeapon: { name: 'Elemental Weapon', level: 3, school: 'Transmutation', classes: ['druid', 'paladin', 'ranger'], concentration: true },
  fear: { name: 'Fear', level: 3, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  feignDeath: { name: 'Feign Death', level: 3, school: 'Necromancy', classes: ['bard', 'cleric', 'druid', 'wizard'], concentration: false, ritual: true },
  fireball: { name: 'Fireball', level: 3, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '8d6', damageType: 'Fire' },
  fly: { name: 'Fly', level: 3, school: 'Transmutation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true },
  gaseousForm: { name: 'Gaseous Form', level: 3, school: 'Transmutation', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true },
  glyphOfWarding: { name: 'Glyph of Warding', level: 3, school: 'Abjuration', classes: ['bard', 'cleric', 'wizard'], concentration: false },
  haste: { name: 'Haste', level: 3, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: true },
  hungerOfHadar: { name: 'Hunger of Hadar', level: 3, school: 'Conjuration', classes: ['warlock'], concentration: true, save: 'dex', damage: '2d6', damageType: 'Cold' },
  hypnoticPattern: { name: 'Hypnotic Pattern', level: 3, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  leomundsTinyHut: { name: "Leomund's Tiny Hut", level: 3, school: 'Evocation', classes: ['bard', 'wizard'], concentration: false, ritual: true },
  lightningBolt: { name: 'Lightning Bolt', level: 3, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '8d6', damageType: 'Lightning' },
  magicCircle: { name: 'Magic Circle', level: 3, school: 'Abjuration', classes: ['cleric', 'paladin', 'warlock', 'wizard'], concentration: false },
  majorImage: { name: 'Major Image', level: 3, school: 'Illusion', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  massHealingWord: { name: 'Mass Healing Word', level: 3, school: 'Evocation', classes: ['bard', 'cleric'], concentration: false },
  meldIntoStone: { name: 'Meld into Stone', level: 3, school: 'Transmutation', classes: ['cleric', 'druid'], concentration: false, ritual: true },
  nondetection: { name: 'Nondetection', level: 3, school: 'Abjuration', classes: ['bard', 'ranger', 'wizard'], concentration: false },
  phantomSteed: { name: 'Phantom Steed', level: 3, school: 'Illusion', classes: ['wizard'], concentration: false, ritual: true },
  plantGrowth: { name: 'Plant Growth', level: 3, school: 'Transmutation', classes: ['bard', 'druid', 'ranger'], concentration: false },
  protectionFromEnergy: { name: 'Protection from Energy', level: 3, school: 'Abjuration', classes: ['cleric', 'druid', 'ranger', 'sorcerer', 'wizard'], concentration: true },
  removeCurse: { name: 'Remove Curse', level: 3, school: 'Abjuration', classes: ['cleric', 'paladin', 'warlock', 'wizard'], concentration: false },
  revivify: { name: 'Revivify', level: 3, school: 'Necromancy', classes: ['cleric', 'druid', 'paladin', 'ranger'], concentration: false },
  sending: { name: 'Sending', level: 3, school: 'Evocation', classes: ['bard', 'cleric', 'wizard'], concentration: false },
  sleetStorm: { name: 'Sleet Storm', level: 3, school: 'Conjuration', classes: ['druid', 'sorcerer', 'wizard'], concentration: true },
  slow: { name: 'Slow', level: 3, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: true },
  speakWithDead: { name: 'Speak with Dead', level: 3, school: 'Necromancy', classes: ['bard', 'cleric', 'wizard'], concentration: false },
  speakWithPlants: { name: 'Speak with Plants', level: 3, school: 'Transmutation', classes: ['bard', 'druid', 'ranger'], concentration: false },
  spiritGuardians: { name: 'Spirit Guardians', level: 3, school: 'Conjuration', classes: ['cleric'], concentration: true, save: 'wis', damage: '3d8', damageType: 'Radiant' },
  stinkingCloud: { name: 'Stinking Cloud', level: 3, school: 'Conjuration', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  tongues: { name: 'Tongues', level: 3, school: 'Divination', classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  vampiricTouch: { name: 'Vampiric Touch', level: 3, school: 'Necromancy', classes: ['sorcerer', 'warlock', 'wizard'], concentration: true, attack: 'melee', damage: '3d6', damageType: 'Necrotic' },
  waterBreathing: { name: 'Water Breathing', level: 3, school: 'Transmutation', classes: ['druid', 'ranger', 'sorcerer', 'wizard'], concentration: false, ritual: true },
  waterWalk: { name: 'Water Walk', level: 3, school: 'Transmutation', classes: ['cleric', 'druid', 'ranger', 'sorcerer'], concentration: false, ritual: true },
  windWall: { name: 'Wind Wall', level: 3, school: 'Evocation', classes: ['druid', 'ranger'], concentration: true },

  // ---- 4th Level Spells ----
  banishment: { name: 'Banishment', level: 4, school: 'Abjuration', classes: ['cleric', 'paladin', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  blight: { name: 'Blight', level: 4, school: 'Necromancy', classes: ['druid', 'sorcerer', 'warlock', 'wizard'], concentration: false, save: 'con', damage: '8d8', damageType: 'Necrotic' },
  compulsion: { name: 'Compulsion', level: 4, school: 'Enchantment', classes: ['bard'], concentration: true },
  confusion: { name: 'Confusion', level: 4, school: 'Enchantment', classes: ['bard', 'druid', 'sorcerer', 'wizard'], concentration: true },
  conjureMinorElementals: { name: 'Conjure Minor Elementals', level: 4, school: 'Conjuration', classes: ['druid', 'wizard'], concentration: true },
  conjureWoodlandBeings: { name: 'Conjure Woodland Beings', level: 4, school: 'Conjuration', classes: ['druid', 'ranger'], concentration: true },
  controlWater: { name: 'Control Water', level: 4, school: 'Transmutation', classes: ['cleric', 'druid', 'wizard'], concentration: true },
  deathWard: { name: 'Death Ward', level: 4, school: 'Abjuration', classes: ['cleric', 'paladin'], concentration: false },
  dimensionDoor: { name: 'Dimension Door', level: 4, school: 'Conjuration', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  divinationSpell: { name: 'Divination', level: 4, school: 'Divination', classes: ['cleric', 'druid', 'wizard'], concentration: false, ritual: true },
  dominateBeast: { name: 'Dominate Beast', level: 4, school: 'Enchantment', classes: ['druid', 'ranger', 'sorcerer'], concentration: true },
  evardsBlackTentacles: { name: "Evard's Black Tentacles", level: 4, school: 'Conjuration', classes: ['wizard'], concentration: true },
  fabricate: { name: 'Fabricate', level: 4, school: 'Transmutation', classes: ['wizard'], concentration: false },
  fireShield: { name: 'Fire Shield', level: 4, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: false },
  freedomOfMovement: { name: 'Freedom of Movement', level: 4, school: 'Abjuration', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'], concentration: false },
  greaterInvisibility: { name: 'Greater Invisibility', level: 4, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  guardianOfFaith: { name: 'Guardian of Faith', level: 4, school: 'Conjuration', classes: ['cleric', 'paladin'], concentration: false },
  iceStorm: { name: 'Ice Storm', level: 4, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '2d8', damageType: 'Bludgeoning' },
  locateCreature: { name: 'Locate Creature', level: 4, school: 'Divination', classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'], concentration: true },
  otilukesResilientSphere: { name: "Otiluke's Resilient Sphere", level: 4, school: 'Evocation', classes: ['wizard'], concentration: true },
  phantasmalKiller: { name: 'Phantasmal Killer', level: 4, school: 'Illusion', classes: ['bard', 'wizard'], concentration: true, save: 'wis', damage: '4d10', damageType: 'Psychic' },
  polymorph: { name: 'Polymorph', level: 4, school: 'Transmutation', classes: ['bard', 'druid', 'sorcerer', 'wizard'], concentration: true },
  staggeringSmite: { name: 'Staggering Smite', level: 4, school: 'Evocation', classes: ['paladin'], concentration: true },
  stoneskin: { name: 'Stoneskin', level: 4, school: 'Abjuration', classes: ['druid', 'ranger', 'sorcerer', 'wizard'], concentration: true },
  wallOfFire: { name: 'Wall of Fire', level: 4, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: true, save: 'dex', damage: '5d8', damageType: 'Fire' },

  // ---- 5th Level Spells ----
  animateObjects: { name: 'Animate Objects', level: 5, school: 'Transmutation', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  antilifeShell: { name: 'Antilife Shell', level: 5, school: 'Abjuration', classes: ['druid'], concentration: true },
  awaken: { name: 'Awaken', level: 5, school: 'Transmutation', classes: ['bard', 'druid'], concentration: false },
  banishingSmite: { name: 'Banishing Smite', level: 5, school: 'Abjuration', classes: ['paladin'], concentration: true },
  bigbysHand: { name: "Bigby's Hand", level: 5, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: true },
  cloudkill: { name: 'Cloudkill', level: 5, school: 'Conjuration', classes: ['sorcerer', 'wizard'], concentration: true, save: 'con', damage: '5d8', damageType: 'Poison' },
  commune: { name: 'Commune', level: 5, school: 'Divination', classes: ['cleric'], concentration: false, ritual: true },
  communeWithNature: { name: 'Commune with Nature', level: 5, school: 'Divination', classes: ['druid', 'ranger'], concentration: false, ritual: true },
  coneOfCold: { name: 'Cone of Cold', level: 5, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: false, save: 'con', damage: '8d8', damageType: 'Cold' },
  conjureElemental: { name: 'Conjure Elemental', level: 5, school: 'Conjuration', classes: ['druid', 'wizard'], concentration: true },
  contactOtherPlane: { name: 'Contact Other Plane', level: 5, school: 'Divination', classes: ['warlock', 'wizard'], concentration: false, ritual: true },
  contagion: { name: 'Contagion', level: 5, school: 'Necromancy', classes: ['cleric', 'druid'], concentration: false },
  destructiveWave: { name: 'Destructive Wave', level: 5, school: 'Evocation', classes: ['paladin'], concentration: false, save: 'con', damage: '5d6', damageType: 'Thunder' },
  dispelEvilAndGood: { name: 'Dispel Evil and Good', level: 5, school: 'Abjuration', classes: ['cleric', 'paladin'], concentration: true },
  dominatePerson: { name: 'Dominate Person', level: 5, school: 'Enchantment', classes: ['bard', 'sorcerer', 'wizard'], concentration: true },
  dream: { name: 'Dream', level: 5, school: 'Illusion', classes: ['bard', 'warlock', 'wizard'], concentration: false },
  flameStrike: { name: 'Flame Strike', level: 5, school: 'Evocation', classes: ['cleric'], concentration: false, save: 'dex', damage: '4d6', damageType: 'Fire' },
  geas: { name: 'Geas', level: 5, school: 'Enchantment', classes: ['bard', 'cleric', 'druid', 'paladin', 'wizard'], concentration: false },
  greaterRestoration: { name: 'Greater Restoration', level: 5, school: 'Abjuration', classes: ['bard', 'cleric', 'druid'], concentration: false },
  hallow: { name: 'Hallow', level: 5, school: 'Abjuration', classes: ['cleric'], concentration: false },
  holdMonster: { name: 'Hold Monster', level: 5, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  insectPlague: { name: 'Insect Plague', level: 5, school: 'Conjuration', classes: ['cleric', 'druid', 'sorcerer'], concentration: true, save: 'con', damage: '4d10', damageType: 'Piercing' },
  legendLore: { name: 'Legend Lore', level: 5, school: 'Divination', classes: ['bard', 'cleric', 'wizard'], concentration: false },
  massCureWounds: { name: 'Mass Cure Wounds', level: 5, school: 'Evocation', classes: ['bard', 'cleric', 'druid'], concentration: false },
  mislead: { name: 'Mislead', level: 5, school: 'Illusion', classes: ['bard', 'wizard'], concentration: true },
  modifyMemory: { name: 'Modify Memory', level: 5, school: 'Enchantment', classes: ['bard', 'wizard'], concentration: true },
  passwall: { name: 'Passwall', level: 5, school: 'Transmutation', classes: ['wizard'], concentration: false },
  planarBinding: { name: 'Planar Binding', level: 5, school: 'Abjuration', classes: ['bard', 'cleric', 'druid', 'wizard'], concentration: false },
  raiseDead: { name: 'Raise Dead', level: 5, school: 'Necromancy', classes: ['bard', 'cleric', 'paladin'], concentration: false },
  scrying: { name: 'Scrying', level: 5, school: 'Divination', classes: ['bard', 'cleric', 'druid', 'warlock', 'wizard'], concentration: true },
  seeming: { name: 'Seeming', level: 5, school: 'Illusion', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },
  telekinesis: { name: 'Telekinesis', level: 5, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: true },
  telepathicBond: { name: 'Telepathic Bond', level: 5, school: 'Divination', classes: ['bard', 'wizard'], concentration: false, ritual: true },
  teleportationCircle: { name: 'Teleportation Circle', level: 5, school: 'Conjuration', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  treeStride: { name: 'Tree Stride', level: 5, school: 'Conjuration', classes: ['druid', 'ranger'], concentration: true },
  wallOfForce: { name: 'Wall of Force', level: 5, school: 'Evocation', classes: ['wizard'], concentration: true },
  wallOfStone: { name: 'Wall of Stone', level: 5, school: 'Evocation', classes: ['druid', 'sorcerer', 'wizard'], concentration: true },

  // ---- 6th Level Spells ----
  bladeBarrier: { name: 'Blade Barrier', level: 6, school: 'Evocation', classes: ['cleric'], concentration: true },
  chainLightning: { name: 'Chain Lightning', level: 6, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '10d8', damageType: 'Lightning' },
  circleOfDeath: { name: 'Circle of Death', level: 6, school: 'Necromancy', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false, save: 'con', damage: '8d6', damageType: 'Necrotic' },
  conjureFey: { name: 'Conjure Fey', level: 6, school: 'Conjuration', classes: ['druid', 'warlock'], concentration: true },
  contingency: { name: 'Contingency', level: 6, school: 'Evocation', classes: ['wizard'], concentration: false },
  createUndead: { name: 'Create Undead', level: 6, school: 'Necromancy', classes: ['cleric', 'warlock', 'wizard'], concentration: false },
  disintegrate: { name: 'Disintegrate', level: 6, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '10d6+40', damageType: 'Force' },
  eyebite: { name: 'Eyebite', level: 6, school: 'Necromancy', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  findThePath: { name: 'Find the Path', level: 6, school: 'Divination', classes: ['bard', 'cleric', 'druid'], concentration: true },
  globeOfInvulnerability: { name: 'Globe of Invulnerability', level: 6, school: 'Abjuration', classes: ['sorcerer', 'wizard'], concentration: true },
  harm: { name: 'Harm', level: 6, school: 'Necromancy', classes: ['cleric'], concentration: false, save: 'con', damage: '14d6', damageType: 'Necrotic' },
  heal: { name: 'Heal', level: 6, school: 'Evocation', classes: ['cleric', 'druid'], concentration: false },
  heroesFeast: { name: "Heroes' Feast", level: 6, school: 'Conjuration', classes: ['bard', 'cleric', 'druid'], concentration: false },
  massSuggestion: { name: 'Mass Suggestion', level: 6, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  ottosIrresistibleDance: { name: "Otto's Irresistible Dance", level: 6, school: 'Enchantment', classes: ['bard', 'wizard'], concentration: true },
  planarAlly: { name: 'Planar Ally', level: 6, school: 'Conjuration', classes: ['cleric'], concentration: false },
  sunbeam: { name: 'Sunbeam', level: 6, school: 'Evocation', classes: ['cleric', 'druid', 'sorcerer', 'wizard'], concentration: true, save: 'con', damage: '6d8', damageType: 'Radiant' },
  transportViaPlants: { name: 'Transport via Plants', level: 6, school: 'Conjuration', classes: ['druid'], concentration: false },
  trueSeeing: { name: 'True Seeing', level: 6, school: 'Divination', classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  wallOfIce: { name: 'Wall of Ice', level: 6, school: 'Evocation', classes: ['wizard'], concentration: true },
  wallOfThorns: { name: 'Wall of Thorns', level: 6, school: 'Conjuration', classes: ['druid'], concentration: true },
  wordOfRecall: { name: 'Word of Recall', level: 6, school: 'Conjuration', classes: ['cleric'], concentration: false },

  // ---- 7th Level Spells ----
  conjureCelestial: { name: 'Conjure Celestial', level: 7, school: 'Conjuration', classes: ['cleric'], concentration: true },
  delayedBlastFireball: { name: 'Delayed Blast Fireball', level: 7, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: true, save: 'dex', damage: '12d6', damageType: 'Fire' },
  divineWord: { name: 'Divine Word', level: 7, school: 'Evocation', classes: ['cleric'], concentration: false },
  etherealness: { name: 'Etherealness', level: 7, school: 'Transmutation', classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  fingerOfDeath: { name: 'Finger of Death', level: 7, school: 'Necromancy', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false, save: 'con', damage: '7d8+30', damageType: 'Necrotic' },
  fireStorm: { name: 'Fire Storm', level: 7, school: 'Evocation', classes: ['cleric', 'druid', 'sorcerer'], concentration: false, save: 'dex', damage: '7d10', damageType: 'Fire' },
  forcecage: { name: 'Forcecage', level: 7, school: 'Evocation', classes: ['bard', 'warlock', 'wizard'], concentration: false },
  mirageArcane: { name: 'Mirage Arcane', level: 7, school: 'Illusion', classes: ['bard', 'druid', 'wizard'], concentration: false },
  mordenkainensSword: { name: "Mordenkainen's Sword", level: 7, school: 'Evocation', classes: ['bard', 'wizard'], concentration: true },
  planeShift: { name: 'Plane Shift', level: 7, school: 'Conjuration', classes: ['cleric', 'druid', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  prismaticSpray: { name: 'Prismatic Spray', level: 7, school: 'Evocation', classes: ['bard', 'sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '10d6', damageType: 'Fire' },
  projectImage: { name: 'Project Image', level: 7, school: 'Illusion', classes: ['bard', 'wizard'], concentration: true },
  regenerate: { name: 'Regenerate', level: 7, school: 'Transmutation', classes: ['bard', 'cleric', 'druid'], concentration: false },
  resurrection: { name: 'Resurrection', level: 7, school: 'Necromancy', classes: ['bard', 'cleric'], concentration: false },
  reverseGravity: { name: 'Reverse Gravity', level: 7, school: 'Transmutation', classes: ['druid', 'sorcerer', 'wizard'], concentration: true },
  sequester: { name: 'Sequester', level: 7, school: 'Transmutation', classes: ['wizard'], concentration: false },
  simulacrum: { name: 'Simulacrum', level: 7, school: 'Illusion', classes: ['wizard'], concentration: false },
  symbolSpell: { name: 'Symbol', level: 7, school: 'Abjuration', classes: ['bard', 'cleric', 'druid', 'wizard'], concentration: false },
  teleport: { name: 'Teleport', level: 7, school: 'Conjuration', classes: ['bard', 'sorcerer', 'wizard'], concentration: false },

  // ---- 8th Level Spells ----
  animalShapes: { name: 'Animal Shapes', level: 8, school: 'Transmutation', classes: ['druid'], concentration: true },
  antimagicField: { name: 'Antimagic Field', level: 8, school: 'Abjuration', classes: ['cleric', 'wizard'], concentration: true },
  antipathySympathy: { name: 'Antipathy/Sympathy', level: 8, school: 'Enchantment', classes: ['bard', 'druid', 'wizard'], concentration: false },
  clone: { name: 'Clone', level: 8, school: 'Necromancy', classes: ['wizard'], concentration: false },
  controlWeather: { name: 'Control Weather', level: 8, school: 'Transmutation', classes: ['cleric', 'druid', 'wizard'], concentration: true },
  demiplane: { name: 'Demiplane', level: 8, school: 'Conjuration', classes: ['sorcerer', 'warlock', 'wizard'], concentration: false },
  dominateMonster: { name: 'Dominate Monster', level: 8, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  earthquake: { name: 'Earthquake', level: 8, school: 'Evocation', classes: ['cleric', 'druid', 'sorcerer'], concentration: true, save: 'dex' },
  feeblemind: { name: 'Feeblemind', level: 8, school: 'Enchantment', classes: ['bard', 'druid', 'warlock', 'wizard'], concentration: false },
  glibness: { name: 'Glibness', level: 8, school: 'Enchantment', classes: ['bard', 'warlock'], concentration: false },
  holyAura: { name: 'Holy Aura', level: 8, school: 'Abjuration', classes: ['cleric'], concentration: true },
  incendiaryCloud: { name: 'Incendiary Cloud', level: 8, school: 'Conjuration', classes: ['druid', 'sorcerer', 'wizard'], concentration: true, save: 'dex', damage: '10d8', damageType: 'Fire' },
  maze: { name: 'Maze', level: 8, school: 'Conjuration', classes: ['wizard'], concentration: true },
  mindBlank: { name: 'Mind Blank', level: 8, school: 'Abjuration', classes: ['bard', 'wizard'], concentration: false },
  powerWordStun: { name: 'Power Word Stun', level: 8, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  sunburst: { name: 'Sunburst', level: 8, school: 'Evocation', classes: ['cleric', 'druid', 'sorcerer', 'wizard'], concentration: false, save: 'con', damage: '12d6', damageType: 'Radiant' },
  telepathy: { name: 'Telepathy', level: 8, school: 'Divination', classes: ['wizard'], concentration: false },
  tsunami: { name: 'Tsunami', level: 8, school: 'Conjuration', classes: ['druid'], concentration: true },

  // ---- 9th Level Spells ----
  astralProjection: { name: 'Astral Projection', level: 9, school: 'Necromancy', classes: ['cleric', 'warlock', 'wizard'], concentration: false },
  foresight: { name: 'Foresight', level: 9, school: 'Divination', classes: ['bard', 'druid', 'warlock', 'wizard'], concentration: false },
  gate: { name: 'Gate', level: 9, school: 'Conjuration', classes: ['cleric', 'sorcerer', 'warlock', 'wizard'], concentration: true },
  imprisonment: { name: 'Imprisonment', level: 9, school: 'Abjuration', classes: ['warlock', 'wizard'], concentration: false },
  massHeal: { name: 'Mass Heal', level: 9, school: 'Evocation', classes: ['cleric'], concentration: false },
  meteorSwarm: { name: 'Meteor Swarm', level: 9, school: 'Evocation', classes: ['sorcerer', 'wizard'], concentration: false, save: 'dex', damage: '40d6', damageType: 'Fire' },
  powerWordHeal: { name: 'Power Word Heal', level: 9, school: 'Enchantment', classes: ['bard', 'cleric'], concentration: false },
  powerWordKill: { name: 'Power Word Kill', level: 9, school: 'Enchantment', classes: ['bard', 'sorcerer', 'warlock', 'wizard'], concentration: false },
  prismaticWall: { name: 'Prismatic Wall', level: 9, school: 'Abjuration', classes: ['wizard'], concentration: false },
  shapechange: { name: 'Shapechange', level: 9, school: 'Transmutation', classes: ['druid', 'wizard'], concentration: true },
  stormOfVengeance: { name: 'Storm of Vengeance', level: 9, school: 'Evocation', classes: ['druid'], concentration: true },
  timeStop: { name: 'Time Stop', level: 9, school: 'Transmutation', classes: ['sorcerer', 'wizard'], concentration: false },
  truePolymorph: { name: 'True Polymorph', level: 9, school: 'Transmutation', classes: ['bard', 'warlock', 'wizard'], concentration: true },
  trueResurrection: { name: 'True Resurrection', level: 9, school: 'Necromancy', classes: ['cleric', 'druid'], concentration: false },
  weird: { name: 'Weird', level: 9, school: 'Illusion', classes: ['warlock', 'wizard'], concentration: true },
  wish: { name: 'Wish', level: 9, school: 'Conjuration', classes: ['sorcerer', 'wizard'], concentration: false }
};
