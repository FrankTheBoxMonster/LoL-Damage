
var PropertyTemplate_InternalRaw = {
  ApplyLifesteal: false,
  EnableCallForHelp: false,
  RespectImmunity: false,
  RespectDodge: false,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: false,
  ApplyOmnivamp: false,
}

var PropertyTemplate_Raw = {
  ApplyLifesteal: false,
  EnableCallForHelp: false,
  RespectImmunity: true,
  RespectDodge: false,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: false,
  ApplyOmnivamp: false,
}

var PropertyTemplate_Attack = {
  ApplyLifesteal: true,
  EnableCallForHelp: true,
  RespectImmunity: true,
  RespectDodge: true,
  TriggerOnHitEvents: true,
  TriggerDamageEvents: true,
  ApplyOmnivamp: true,
}

var PropertyTemplate_Default = {
  ApplyLifesteal: false,
  EnableCallForHelp: false,
  RespectImmunity: true,
  RespectDodge: false,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: true,
  ApplyOmnivamp: true,
}

var PropertyTemplate_Default_WithLifesteal = {
  ApplyLifesteal: true,
  EnableCallForHelp: false,
  RespectImmunity: true,
  RespectDodge: false,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: true,
  ApplyOmnivamp: true,
}

var PropertyTemplate_Default_WithCallForHelp = {
  ApplyLifesteal: false,
  EnableCallForHelp: true,
  RespectImmunity: true,
  RespectDodge: false,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: true,
  ApplyOmnivamp: true,
}

var PropertyTemplate_Attack_NoOnHits = {
  ApplyLifesteal: true,
  EnableCallForHelp: true,
  RespectImmunity: true,
  RespectDodge: true,
  TriggerOnHitEvents: false,
  TriggerDamageEvents: true,
  ApplyOmnivamp: true,
}



var TagTemplate_Tagless = {
  AOE: false,
  Periodic: false,
  Indirect: false,
  BasicAttack: false,
  ActiveSpell: false,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_Attack = {
  AOE: false,
  Periodic: false,
  Indirect: false,
  BasicAttack: true,
  ActiveSpell: false,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_SingleSpell = {
  AOE: false,
  Periodic: false,
  Indirect: false,
  BasicAttack: false,
  ActiveSpell: true,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_Proc = {
  AOE: false,
  Periodic: false,
  Indirect: false,
  BasicAttack: false,
  ActiveSpell: false,
  Proc: true,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_AoeSpell = {
  AOE: true,
  Periodic: false,
  Indirect: false,
  BasicAttack: false,
  ActiveSpell: true,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_AoeDotSpell = {
  AOE: true,
  Periodic: true,
  Indirect: false,
  BasicAttack: false,
  ActiveSpell: true,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_AoeAttack = {
  AOE: true,
  Periodic: false,
  Indirect: false,
  BasicAttack: true,
  ActiveSpell: false,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}

var TagTemplate_AttackSpell = {
  AOE: false,
  Periodic: false,
  Indirect: false,
  BasicAttack: true,
  ActiveSpell: true,
  Proc: false,
  Pet: false,
  NonRedirectable: false,
  Item: false,
}



var DamageTemplate_InternalRaw = {
  properties: PropertyTemplate_InternalRaw,
  tags: TagTemplate_Tagless,
}

var DamageTemplate_Raw = {
  properties: PropertyTemplate_Raw,
  tags: TagTemplate_Tagless,
}

var DamageTemplate_Attack = {
  properties: PropertyTemplate_Attack,
  tags: TagTemplate_Attack,
}

var DamageTemplate_SingleNontargetedSpell = {
  properties: PropertyTemplate_Default,
  tags: TagTemplate_SingleSpell,
}

var DamageTemplate_Proc = {
  properties: PropertyTemplate_Default,
  tags: TagTemplate_Proc,
}

var DamageTemplate_AoeSpell = {
  properties: PropertyTemplate_Default,
  tags: TagTemplate_AoeSpell,
}

var DamageTemplate_Proc_WithLifesteal = {
  properties: PropertyTemplate_Default_WithLifesteal,
  tags: TagTemplate_Proc,
}

var DamageTemplate_SingleTargetedSpell = {
  properties: PropertyTemplate_Default_WithCallForHelp,
  tags: TagTemplate_SingleSpell,
}

var DamageTemplate_AoeDotSpell = {
  properties: PropertyTemplate_Default,
  tags: TagTemplate_AoeDotSpell,
}

var DamageTemplate_Attack_NoOnHits = {
  properties: PropertyTemplate_Attack_NoOnHits,
  tags: TagTemplate_Attack,
}

var DamageTemplate_AoeAttack = {
  properties: PropertyTemplate_Attack,
  tags: TagTemplate_AoeAttack,
}

var DamageTemplate_AoeSpell_WithCallForHelp = {
  properties: PropertyTemplate_Default_WithCallForHelp,
  tags: TagTemplate_AoeSpell,
}

var DamageTemplate_AttackSpell = {
  properties: PropertyTemplate_Attack,
  tags: TagTemplate_AttackSpell,
}



var DamageSources = {
  "systems": {
    "champion basic attack": {
      notes: "AP damage to structures modifies existing damage, including changing damage type, rather than creating a new instance",
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Red Buff dot": {
      damageType: DamageType.True,
      damageInfo: {
        properties: PropertyTemplate_Default,
        tags: {
          AOE: false,
          Periodic: true,
          Indirect: false,
          BasicAttack: false,
          ActiveSpell: false,
          Proc: true,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Ward or Trap kill": {
      notes: "plants don't die",
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Elder Buff dot": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_Proc,
    },
    "Elder Buff execute": {
      damageType: DamageType.True,
      damageInfo: {
        properties: {
          ApplyLifesteal: false,
          EnableCallForHelp: false,
          RespectImmunity: true,
          RespectDodge: false,
          TriggerOnHitEvents: false,
          TriggerDamageEvents: true,
          ApplyOmnivamp: false,
        },
        tags: TagTemplate_Tagless,
      },
    },
    "Herald camp eye pop": {
      damageType: DamageType.True,
      damageInfo: {
        properties: {
          ApplyLifesteal: false,
          EnableCallForHelp: false,
          RespectImmunity: true,
          RespectDodge: false,
          TriggerOnHitEvents: false,
          TriggerDamageEvents: false,
          ApplyOmnivamp: true,
        },
        tags: TagTemplate_Proc,
      },
    },
    "Herald merc eye pop": {
      damageType: DamageType.True,
      damageInfo: {
        properties: {
          ApplyLifesteal: false,
          EnableCallForHelp: false,
          RespectImmunity: true,
          RespectDodge: false,
          TriggerOnHitEvents: false,
          TriggerDamageEvents: false,
          ApplyOmnivamp: true,
        },
        tags: TagTemplate_Proc,
      },
    },
    "Infernal Soul target": {
      damageType: DamageType.Varies,
      damageInfo: {
        properties: PropertyTemplate_Default,
        tags: {
          AOE: true,
          Periodic: false,
          Indirect: false,
          BasicAttack: false,
          ActiveSpell: false,
          Proc: true,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Infernal Soul aoe": {
      damageType: DamageType.Varies,
      damageInfo: {
        properties: PropertyTemplate_Default,
        tags: {
          AOE: true,
          Periodic: false,
          Indirect: false,
          BasicAttack: false,
          ActiveSpell: false,
          Proc: true,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Hextech Soul target": {
      notes: "post apply, ignores practice dummy text",
      damageType: DamageType.True,
      damageInfo: DamageTemplate_Proc,
    },
    "Hextech Soul aoe": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_Proc,
    },
    "Practice Tool suicide": {
      notes: "counts as self damage",
      damageType: DamageType.True,
      damageInfo: {
        properties: {
          ApplyLifesteal: false,
          EnableCallForHelp: false,
          RespectImmunity: false,
          RespectDodge: false,
          TriggerOnHitEvents: false,
          TriggerDamageEvents: true,
          ApplyOmnivamp: false,
        },
        tags: TagTemplate_Tagless,
      },
    },
    "Chemtech Rift vision plant ward damage": {
      notes: "does register as damage from whoever triggered the plant, but can't be lethal\n\ndoes multiple instances of 1 true damage until the ward is left at 1 health\n\npreviously had issues where it would repeatedly trigger onhits on the ward if they were made invuln from Teleport, so it might still have some similarities to a regular attack as a result",
      damageType: DamageType.True,
      damageInfo: DamageTemplate_InternalRaw,
    },
  },
  "champions": {
    "Aatrox": {
      "P": {
        "bonus damage": {
          notes: "applies first outside of the main damage, so if this damage is lethal then the main attack, as well as its onhit procs, will be canceled",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Ahri": {
      "Q": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Akali": {
      "P": {
        "bonus damage": {
          notes: "applies first outside of the main damage, so if this damage is lethal then the main attack, as well as its onhit procs, will be canceled",
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "first cast target": {
          notes: "missing call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first cast aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Akshan": {
      "P": {
        "proc": {
          notes: "pre apply for attacks and E, post apply for Q and R",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "second attack": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on attack, and sometimes a second time onhit (for a total of up to x3 times when combined with main attack), depending on which effects have been bugfixed or not",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers some effects on each hit, but not all",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "R": {
        "champion": {
          notes: "missing call for help, but maybe fine given it can be blocked by those not targeted?",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_SingleSpell,
          },
        },
        "minion": {
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
        "turret": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_SingleSpell,
          },
        },
      },
    },
    "Alistar": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "E": {
        "tick": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "bonus damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Amumu": {
      "P": {
        "damage": {
          notes: "inherits parent tags, confirmed for AOE, Periodic, and ActiveSpell",
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Anivia": {
      "Q": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "unknowable due to not causing death, but we can guess based on other interactions and history\n\nno spell effects are ever applied, ruling out ActiveSpell and Pet\n\nNeeko P will pop off, despite not doing so for other CC, ruling out Indirect\n\nElectrocute into Black Shield to negate the CC will not trigger, confirming Proc\n\nAery will trigger, which means if it is Proc then it can't also be Periodic\n\nManamune into Black Shield to negate the CC will not trigger, which rules out BasicAttack\n\nNonRedirectable and Item would be nonsensical and can be excluded on that principle\n\nthis leaves AOE, which while plausible, is not typically seen on any Proc damage (there are a handful of exceptions, but they are all on modern effects), so it can likely be excluded by that principle",
          customTraits: {
            AlwaysZeroDamage: true,
          },
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Annie": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aura": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "onhit": {
          notes: "can be forced to non-zero by Zyra plants",
          customTraits: {
            AlwaysZeroDamage: true,
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Attack,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "attack": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Aphelios": {
      "Calibrum": {
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "followup attack": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "first mark": {
          notes: "order:  \"first mark start/apply --> followup attack start/apply --> second marks are missiles\"",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "second mark": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
        "R followup attack": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "R first mark": {
          notes: "same instance as the base mark damage",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "R second mark": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
      },
      "Severum": {
        "Q": {
          customTraits: {
            AttackEffectsSpell: "stacks Energized and Kraken on each hit but nothing else",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Gravitum": {
        "Q": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Infernum": {
        "attack target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack passthrough": {
          notes: "passthrough and cone plays a particle when hitting a turret but doesn't actually damage it",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "attack cone": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "runaan's target": {
          notes: "note that runaan's Infernum doesn't have passthrough damage",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeAttack,
        },
        "runaan's cone": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "followup attack": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "R splash target": {
          notes: "note that the increased initial damage is the same as the base instance",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "R splash aoe": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Crescendum": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: TagTemplate_Tagless,
          },
        },
        "Q attack": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "Q Infernum attack target": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "Q Infernum attack passthrough": {
          notes: "doesn't count as aoe",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "Q Infernum attack cone": {
          notes: "doesn't count as aoe",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "followup attack": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
    },
    "Ashe": {
      "Q": {
        "primary bolt": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "secondary bolt": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "runaan's primary bolt": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeAttack,
        },
        "runaan's secondary bolt": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: TagTemplate_AoeAttack,
          },
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "AurelionSol": {
      "Q": {
        "primary target": {
          notes: "applies third, if burst is applicable\n\nW amp applies to the same instance for everything except the percent damage (which doesn't apply it at all)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "secondary target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "burst flat damage": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "burst percent damage": {
          notes: "applies second",
          customTraits: {
            SometimesZeroDamage: "this damage will evaluate to zero if you have zero Stardust stacks",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "E": {
        "tick": {
          notes: "only targets in the center get executed, so this can still freely be lethal",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "execute": {
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
      },
      "R": {
        "standard damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "empowered main damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "empowered shockwave damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Azir": {
      "P": {
        "turret attacks": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "primary hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "secondary hits": {
          notes: "unnecessary call for help?  might not distinguish targeted vs untargeted hits since the damage only cares about the closest hit",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Bard": {
      "P": {
        "rank 1": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "rank 2": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "rank 3 target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "rank 3 aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "rank 4 target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "rank 4 aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          notes: "unknowable due to not causing death, but we can guess",
          customTraits: {
            AlwaysZeroDamage: true,
          },
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Tagless,
          },
        },
      },
    },
    "Belveth": {
      "Q": {
        "target": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "aoe": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on each hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "R": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
        "active": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Blitzcrank": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "onhit": {
          notes: "added in 12.19 rework",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "R": {
        "passive": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Brand": {
      "P": {
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          notes: "both initial target and bounces, missing call for help for target",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Braum": {
      "P": {
        "attack proc": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "spell proc": {
          notes: "is post apply, so if Q is lethal then this damage is skipped",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "cooldown proc": {
          notes: "pre apply, this one only occurs from attacks, not spells",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Caitlyn": {
      "P": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "W hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "P bonus damage": {
          notes: "post apply",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "P attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "intercepted": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Camille": {
      "Q": {
        "first hit": {
          notes: "sheen interaction?",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "second hit physical": {
          notes: "by level 16, the true damage conversion reaches 100%, causing the physical damage to still be dealt but with a value of 0, which causes spell effects such as Luden's to stop working (Liandry's and Rylai's are fine, and Luden's remains fine for Q1)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "second hit true": {
          notes: "pre apply",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "second hit true sheen": {
          notes: "order:  \"Q2 physical starts --> Q2 true sheen start/apply --> Q2 true main start/apply --> Q2 physical apply\" (if sheen conversion is lethal then the main true damage will be canceled while the physical damage will not) (note that since even at 100% conversion the physical damage is still dealt, still wrapping the true damage, this can still be triggered even then, resulting in very low damage attacks)",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
      },
      "W": {
        "inner": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "outer bonus damage": {
          notes: "applies second",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Cassiopeia": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          notes: "empowered damage is the same instance",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Chogath": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "champion": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "minion": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Corki": {
      "P": {
        "physical": {
          notes: "starts first, but then magic part starts within it, so magic part actually applies first, and either part being lethal will not cancel the other, unless the physical part's onhit procs are lethal, in which case the magic part will be canceled",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "W": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "physical": {
          notes: "applies first each tick",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "magic": {
          notes: "applies second each tick",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "small rocket": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "big rocket": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Darius": {
      "P": {
        "damage": {
          notes: "doesn't count as periodic",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "inner": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "outer": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "R": {
        "damage": {
          notes: "note that Darius E does not actually do damage (no turret aggro, unlike similar effects)",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Diana": {
      "P": {
        "target": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "DrMundo": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Draven": {
      "Q": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "execute": {
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
      },
    },
    "Ekko": {
      "P": {
        "damage": {
          notes: "pre apply for attacks, post apply for spells?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "physical": {
          notes: "applies first",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "magic": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Elise": {
      "P": {
        "spider onhit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "spider pets": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "HumanQ": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "HumanW": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "SpiderQ": {
        "damage": {
          notes: "call for help and onhit proc are from a separate instance handled first, dying to onhit proc denies the Q damage, onhit proc respects dodge",
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Evelynn": {
      "Q": {
        "initial hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "recasts": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "proc": {
          notes: "post apply from attack, pre apply before spells (lethal attack damage will cancel the proc damage, lethal proc damage will cancel the spell damage)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "W": {
        "monster damage": {
          notes: "pre apply within attack, pre apply before spells (lethal W on attacks won't cancel attack damage, lethal W on spells will cancel spell damage)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
        "empowered target": {
          notes: "missing call for help and respect dodge",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
        "empowered aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "execute": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Ezreal": {
      "Q": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "W": {
        "damage": {
          notes: "also has a 0 damage instance on apply for call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Fiddlesticks": {
      "Q": {
        "fear": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "empowered": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "tick": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "missing health": {
          notes: "consists solely of the missing health damage, dealt after the last flat damage tick",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          notes: "doesn't count as periodic",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Fiora": {
      "P": {
        "damage": {
          notes: "pre apply for attacks",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "W": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "R": {
        "damage": {
          notes: "literally just P x4",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Fizz": {
      "Q": {
        "physical": {
          notes: "applies first",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "magic": {
          notes: "applies second",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "W": {
        "active onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
        "passive dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "timeout": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Galio": {
      "P": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Gangplank": {
      "P": {
        "damage": {
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "attack": {
          notes: "note that the champion bonus damage and Spellblade proc are all considered the same instance here",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "explosion chain": {
          notes: "the damage triggering the primary barrel is reapplied to secondary barrels within an explosion chain",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_InternalRaw,
        },
      },
      "R": {
        "base": {
          notes: "never counts as periodic (only Death's Daughter makes sense to do this)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "death's daughter": {
          notes: "applies before the third tick of the first wave",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "fire at will": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "raise morale": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Garen": {
      "Q": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "primary": {
          notes: "applies after secondary ticks",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "secondary": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Gnar": {
      "MiniQ": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "MiniW": {
        "onhit": {
          notes: "pre apply for attacks, applies first for Mini Q/E",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "MiniE": {
        "damage": {
          notes: "only the first jump does damage, unless transitioning into a Mega landing",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "MegaQ": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "MegaW": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "MegaE": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "no wall hit": {
          notes: "deals damage when the knockback ends, unless the target is immune to the knockback, in which case it is dealt instantly instead",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Gragas": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "target": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Graves": {
      "P": {
        "attack first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on the first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack secondary hits": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "ward kill": {
          notes: "targeting a ward seems to create one fewer colliding bullet in exchange for being able to hit the ward?",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "line minion": {
          notes: "doesn't count as AOE",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "line champion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "cone aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Gwen": {
      "P": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first hit outer": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first hit inner true": {
          notes: "order:  \"Q true start/apply --> Q remaining magic start/apply --> P start/apply\" (any one of these being lethal will cancel the remaining instances)",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first hit inner magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first hit inner P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "second hit outer": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit inner true": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit inner magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit inner P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "last hit outer": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "last hit inner true": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "last hit inner magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "last hit inner P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "execute": {
          notes: "deals damage equal to \"999 - damage already dealt\"",
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "onhit": {
          notes: "pre apply, applies after the P onhit",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "R": {
        "first cast": {
          notes: "order:  \"R start/apply --> P start/apply\"",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first cast P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "second cast first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast first hit P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "second cast second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast second hit P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "third cast first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "third cast first hit P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "third cast second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "third cast second hit P": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Hecarim": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Heimerdinger": {
      "Q": {
        "attack": {
          notes: "triggers call for help with a 0 damage instance",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "beam": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "Q attack": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "Q beam": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "W": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "E": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Illaoi": {
      "P": {
        "tentacle slam": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "leap main damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "leap bonus damage": {
          notes: "applies second",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "melee main damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "melee bonus damage": {
          notes: "applies second",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "redirect": {
          notes: "doesn't inherit any tags",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Irelia": {
      "P": {
        "onhit": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "champion": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "initial target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "initial aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall hit": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Ivern": {
      "P": {
        "collection": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_InternalRaw,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "proc": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "knockup": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Janna": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Jarvan": {
      "P": {
        "proc": {
          notes: "is post apply, if the triggering attack is lethal then this damage is canceled",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "aoe": {
          notes: "call for help here doesn't really matter since you'd have to target a champion in the first place",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
    },
    "Jax": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "proc": {
          notes: "pre apply for attacks, post apply for Q",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          notes: "all bonus damage is applied to the main instance",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "passive": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Jayce": {
      "HammerQ": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
      "HammerW": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "HammerE": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "HammerR": {
        "bonus damage": {
          notes: "post apply (Cannon shred is also post apply, second attack benefits rather than the first)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "CannonQ": {
        "standard": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "empowered": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "CannonW": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
    },
    "Jhin": {
      "P": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Jinx": {
      "Q": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          notes: "not AOE",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
        "runaan's target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeAttack,
        },
        "runaan's aoe": {
          notes: "doesn't inherit AOE",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Kaisa": {
      "P": {
        "onhit first stack": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "onhit second stack": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "proc": {
          notes: "one damage instance per stack application (equal to base + per stack bonus), with W triggering multiple separate stack applications in succession",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "evolved first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "evolved second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "W": {
        "damage": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "first stack": {
          notes: "stacks are applied as individual damage instances",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "second stack": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "proc": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "proc then stack": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "evolved": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Kalista": {
      "P": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "main hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "passthrough kill": {
          notes: "never counts as aoe (given how rare this mechanic is, probably best it doesn't)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "passthrough hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "self proc": {
          notes: "not sure if this is actually pre apply or what, pretty sure it actually triggers on attack rather than on hit to at least some extent",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "ally proc": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "main hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "delayed attack hit": {
          notes: "applies after the delayed attack",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Karma": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "Q first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "first hit": {
          notes: "does a 0 damage instance for call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Karthus": {
      "Q": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Kassadin": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "passive": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active bonus damage": {
          notes: "passive does not seem to apply on the active attack",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Katarina": {
      "P": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "Q": {
        "target": {
          notes: "no call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
      },
      "R": {
        "magic": {
          notes: "applies first each tick",
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on each hit",
          },
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeDotSpell,
          },
        },
        "physical": {
          notes: "applies second each tick\n\nalways dealt even if zero, as seen by Phage healing + Luden's + Trundle Q reduction to undo the Phage bonus AD, which will not double refund Luden's cd due to zero damage, but will still trigger Phage",
          customTraits: {
            SometimesZeroDamage: "this damage will evaluate to zero if you have zero bonus AD",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Kayle": {
      "P": {
        "wave target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wave aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active physical": {
          notes: "applies first",
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "active magic": {
          notes: "applies second, can be 0 but always applies, denying spell effects that ignore 0 damage but allowing others through",
          customTraits: {
            SometimesZeroDamage: "this damage evaluates to zero against full health targets",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "evolved physical target": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "evolved magic target": {
          customTraits: {
            SometimesZeroDamage: "this damage evaluates to zero against full health targets",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "evolved physical aoe": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeAttack,
        },
        "evolved magic aoe": {
          customTraits: {
            SometimesZeroDamage: "this damage evaluates to zero against full health targets",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Kayn": {
      "Q": {
        "default first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "default second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "red first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "red second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "blue first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "blue second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "default": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "red": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "blue": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "default": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "red": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "blue": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "P": {
        "blue proc": {
          notes: "post apply, doesn't inherit AOE",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Kennen": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "passive": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Khazix": {
      "P": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "isolated": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "evolved": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "evolved isolated": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "evolved": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "evolved": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Kindred": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Kled": {
      "MountedQ": {
        "champion first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "minion passthrough": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "DismountedQ": {
        "champion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "bonus damage": {
          notes: "post apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
      },
      "E": {
        "first cast champion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first cast minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second cast champion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          notes: "cannot easily check in practice tool, but probably the same as main target (other similar effects such as Caitlyn R and Akshan R have been)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Kogmaw": {
      "P": {
        "damage": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "proc": {
          notes: "is post apply, if the triggering attack is lethal then this damage is canceled",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Ksante": {
      "P": {
        "normal proc": {
          notes: "post apply, if the triggering attack is lethal then this damage is canceled",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "KSante": {
      "P": {
        "ult proc true": {
          notes: "post apply, if the triggering attack is lethal then this damage is canceled\n\nthe 35% amp to the attack is part of the attack itself",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "bonus damage during ult is the same instance as the main damage",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "nowall hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "wall hit": {
          notes: "dealt as a separate instance after the main damage\n\n12.23b possible bug?  the wall exit damage is just the wall base damage directly, rather than factoring in the 20% tAD or only dealing the difference from the nowall damage which is always dealt in full regardless of walls",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "LeBlanc": {
      "Q": {
        "first hit": {
          notes: "note that clone does not seem to do any damage at all, rather than dealing zero damage (no turret aggro)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "second hit": {
          notes: "is post apply, if the triggering damage is lethal then this damage is canceled",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "Q first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "Q second hit": {
          notes: "is post apply, if the triggering damage is lethal then this damage is canceled",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "W": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "E first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "E second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "LeeSin": {
      "Q": {
        "first cast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second cast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "first cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          notes: "missing call for help",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Leona": {
      "P": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "bonus damage": {
          notes: "post apply, if the triggering damage is lethal then this damage will be canceled",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Lillia": {
      "P": {
        "damage": {
          notes: "all of her spells are AOE, so this is technically AOE as well, yet isn't tagged for it",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "true": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "outer": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "sweetspot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "wakeup": {
          notes: "post apply, should probably be AOE too, if it wasn't for being a detonated mark?  popping this also applies passive dot (this is also significantly different in tags from Zoe's sleep, but it also works significantly differently, as in this case the wakeup *is* the damage from this spell with no other alternative, while for Zoe the wakeup damage is always based on the damage the spell already did prior)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Lissandra": {
      "P": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "line": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "cone": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          notes: "does a 0 damage instance for call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Lucian": {
      "P": {
        "attack": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "ally buff proc": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "target": {
          notes: "missing call for help?",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Lulu": {
      "P": {
        "bonus damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first bolt hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second bolt hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Lux": {
      "P": {
        "damage": {
          notes: "pre apply for attacks, applies before R",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Malphite": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "aoe": {
          notes: "pre apply, also applies to the first hit's main target as well as all further hits' main targets, triggers Tear if it hits something despite not applying spell effects (likely linked to the W cast via the onhit buff rather than the attack triggering it?)",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "target": {
          notes: "post apply, if the main attack or aoe are lethal then this damage is canceled, triggers Tear if it hits something despite not applying spell effects (likely linked to the W cast via the onhit buff rather than the attack triggering it?) (can isolate it from the aoe damage if the target leaves the aoe during the windup)",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Attack,
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Malzahar": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "tick": {
          notes: "does a 0 damage instance for call for help (only on initial cast, not bounces or refreshes)",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "minion execute": {
          notes: "if the tick damage would leave a minion below the execute threshold, then it will add the execute threshold to the damage, as part of the same instance",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "target": {
          notes: "this seems to deal its first tick before the aoe deals its first tick",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Maokai": {
      "Q": {
        "line": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "missing call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "no brush aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "front": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "back": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "MasterYi": {
      "P": {
        "attack": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "main hit": {
          notes: "missing call for help?",
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
        "repeat hit": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "E": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "MissFortune": {
      "P": {
        "damage": {
          notes: "applies before attacks, pre apply for Q?",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
      },
      "Q": {
        "first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "second hit": {
          notes: "unnecessary call for help?",
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Mordekaiser": {
      "P": {
        "onhit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "Q": {
        "single": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          notes: "note that R damage cannot be lethal (not sure if it's even damage in the first place)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Morgana": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Nami": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "targeted hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "bounce hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          notes: "post-apply for both attack and spell, doesn't inherit AOE",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Nasus": {
      "Q": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Nautilus": {
      "P": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "target apply": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "target dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "aoe apply": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "aoe dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Neeko": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Nidalee": {
      "HumanQ": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "HumanW": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "CougarQ": {
        "attack": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "CougarW": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "CougarE": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Nilah": {
      "Q": {
        "spell": {
          notes: "unnecessary call for help, applies lifesteal in addition to the champion damage healing",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
        "attack target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "attack minion execute": {
          notes: "minions that would be left at <= 20 health are executed (take damage equal to remaining health, ignoring armor?), and this damage counts as non-aoe spell damage regardless of target, can apply to primary target as well, only ever applies vs lane minions?",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          notes: "missing call for help",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q": {
          notes: "unnecessary call for help",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Nocturne": {
      "P": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "initial": {
          notes: "does a 0 damage instance for call for help",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "recast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Nunu": {
      "P": {
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_AoeAttack,
          },
        },
      },
      "Q": {
        "minion": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "champion": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "missiles": {
          notes: "never counts as periodic (unlike Taliyah Q)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Olaf": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Orianna": {
      "P": {
        "onhit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Ornn": {
      "P": {
        "attack bonus damage": {
          notes: "pre apply for everything",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "doesn't count as periodic?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "dash hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Pantheon": {
      "Q": {
        "ranged target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "ranged aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "melee target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "melee aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "P primary hit": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "P secondary hits": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "E": {
        "dot": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "recast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Poppy": {
      "P": {
        "damage": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "uncharged hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "charged hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Pyke": {
      "Q": {
        "melee": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "ranged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "minion": {
          notes: "can't kill a champion without it triggering an execute since the physical damage is always half of the execute threshold",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "execute": {
          notes: "unnecessary call for help",
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
      },
    },
    "Qiyana": {
      "P": {
        "bonus damage": {
          notes: "pre apply for all cases",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "base primary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "base secondary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall primary hit": {
          notes: "execute damage is the same instance",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall secondary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "wall lollipop": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush primary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush secondary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush lollipop": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "river primary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "river secondary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "river lollipop": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "onhit": {
          notes: "pre apply, applies after P proc, both for all cases",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "Q": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "E": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "wall": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "brush": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "river": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Quinn": {
      "P": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "R": {
        "recast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Rakan": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Rammus": {
      "P": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "reflect": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "impact": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "impact empowered": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "Q": {
          notes: "applies second",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Reksai": {
      "UnburrowedQ": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "UnburrowedE": {
        "physical": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "true": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "BurrowedQ": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "BurrowedW": {
        "target": {
          notes: "is not an attack",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Rell": {
      "P": {
        "onhit": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "attack bonus damage": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Renata": {
      "P": {
        "self proc": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "ally proc": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "bleed": {
          notes: "was theorized that this might be a case of EnableKill=0 but it actually still uses EnableKill=1",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Raw,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Renekton": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "default first hit": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "default second hit": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "empowered first hit": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "empowered second hit": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "empowered third hit": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "E": {
        "first cast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Rengar": {
      "P": {
        "attack": {
          customTraits: {
            EmpoweredAttack: true,
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "attack": {
          notes: "passive leap and stacks make no difference, ult bonus damage is considered the same instance as the triggering attack (benefits from lifesteal but not crit)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "attack": {
          customTraits: {
            EmpoweredAttack: true,
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
    },
    "Riven": {
      "P": {
        "proc": {
          notes: "post apply, if the triggering damage is lethal then this damage will be canceled (this is probably why the crit interaction stopped working, since it no longer counts as the same damage instance)",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "recast": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Rumble": {
      "P": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Ryze": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "Q target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "Q aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Samira": {
      "Taunt": {
        "damage": {
          notes: "god bless health cost caps",
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: false,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
      },
      "P": {
        "primary tick": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "secondary ticks": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "proc": {
          notes: "post apply, but applies after the first tick of melee P attack",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "ranged": {
          notes: "unnecessary call for help\n\nhow does the reduced lifesteal efficiency work?  can they specify efficiency per damage instance or is there some extra manual modification going on?",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_SingleSpell,
          },
        },
        "melee": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "W": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          notes: "missing call for help?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "R": {
        "damage": {
          notes: "unnecessary call for help?  the only other way it resembles an attack rather than a spell is applying lifesteal",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeDotSpell,
          },
        },
      },
    },
    "Sejuani": {
      "P": {
        "bonus damage": {
          notes: "pre apply for attacks, post apply for spells?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          notes: "counts as an AOE spell instead of targeted, yet still applies call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
      "R": {
        "melee": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "ranged target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "ranged aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Senna": {
      "P": {
        "onhit": {
          notes: "pre apply for attacks and Q, doesn't inherit AOE",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
        "proc": {
          notes: "is percent current health, so can never be lethal on its own, but Elixir of Sorcery will trigger pre apply on all damage, so with a proper setup you can make it become lethal\n\npre apply for attacks and Q (before the onhit, so no damage loss), post apply for W and R (the spell damage will apply first and reduce the resulting current health damage)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
        "soul pickup attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "soul pickup Q target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "soul pickup Q aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "soul pickup R": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "target champion": {
          notes: "no call for help?  also distinguishes the target from the AOE, unlike Lucian Q?  this is likely why PTA is able to work nicely on her too",
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first champion hit",
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
        "aoe champion": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "target minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe minion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "ward kill": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "soul pickup": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "target turret": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe turret": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Seraphine": {
      "P": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "fourth hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "echo": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "echo": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Sett": {
      "P": {
        "first attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "first attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "W": {
        "physical": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "true": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Shaco": {
      "P": {
        "attack front": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack back": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "attack front": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack back": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "W": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "aoe": {
          notes: "doesn't count as aoe",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "front": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "back": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "execute front": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "execute back": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "R": {
        "attack front": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "attack back": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "pop": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "box target": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "box aoe": {
          notes: "doesn't count as aoe",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Shen": {
      "Q": {
        "bonus damage": {
          notes: "pre apply, counts as periodic for some reason",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Shyvana": {
      "HumanQ": {
        "first hit": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second hit": {
          notes: "only second hit counts as spell for some reason (only 0.5s Luden's refund)",
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "DragonQ": {
        "first hit target": {
          notes: "if the main target is at 1 PTA stack, then it'll trigger PTA on that target, otherwise it'll bounce around until a random aoe target other than the main target is left with 1 PTA stack, implying either the second aoe hit never applies PTA, or the main target is special cased when on 1 stack to always apply the remaining 2 stacks instantly, bork passive proc will trigger on an aoe target if they are at two bork stacks before triggering on a main target at one bork stack, implying that PTA is probably just special cased when the target is at 1 PTA stack",
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "first hit aoe": {
          notes: "never counts as aoe, so PTA can be bounced around a lot",
          customTraits: {
            EmpoweredAttack: true,
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "second hit target": {
          customTraits: {
            EmpoweredAttack: true,
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "second hit aoe": {
          notes: "never counts as aoe, so PTA can be bounced around a lot",
          customTraits: {
            EmpoweredAttack: true,
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "W": {
        "onhit target": {
          notes: "pre apply, for some reason counts as an aoe spell instead of a proc",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "onhit aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoedot first tick": {
          notes: "only first tick counts as aoe",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "aoedot later ticks": {
          notes: "doesn't count as aoe but does count as periodic",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "HumanE": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "DragonE": {
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Singed": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Sion": {
      "P": {
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "uncharged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "charged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "post knockback": {
          notes: "Smite \"storage\" mechanic just changes the value of this damage and is otherwise identical, which makes the true damage reducible since it is getting converted to magic damage\n\nor perhaps the Smite damage only triggers if the damage would be lethal?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "uncharged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "charged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "leap collision": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "leap aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Sivir": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          notes: "minion execute just adds on to the main damage and is not a separate instance",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Skarner": {
      "Q": {
        "initial damage": {
          notes: "applies first",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "bonus damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "proc": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "R": {
        "first hit physical": {
          notes: "applies first",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "first hit magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "second hit physical": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "second hit magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Sona": {
      "P": {
        "bonus damage": {
          notes: "applies before main damage",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Soraka": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Swain": {
      "Q": {
        "primary hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "secondary hit": {
          notes: "damage is summed with the first hit weighted higher, but then evenly split between the number of hits and dealt as individual instances, with no concern for which may actually be lethal, which can cause some to be skipped (could theoretically be solved with a disgusting recursive pre apply nesting)",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "dot": {
          notes: "doesn't count as periodic",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Sylas": {
      "P": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeAttack,
          },
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "missing call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Syndra": {
      "Q": {
        "default": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "default": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "evolved magic": {
          notes: "applies first",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "evolved true": {
          notes: "applies second",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "Q": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "first hit": {
          notes: "never counts as periodic and always applies call for help",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "seventh hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "execute": {
          notes: "added in 12.19 rework\n\nonly triggers if the R damage would not already be lethal and if the damage leaves them below the threshold",
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
      },
    },
    "TahmKench": {
      "P": {
        "damage": {
          notes: "pre apply for attacks, post apply for Q",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Taliyah": {
      "Q": {
        "first cast first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first cast repeat hits": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "second cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "initial damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "detonation first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "detonation second hits": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Talon": {
      "P": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "Q": {
        "ranged": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "melee": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Taric": {
      "P": {
        "bonus damage": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Teemo": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "E": {
        "onhit": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: true,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Thresh": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "E": {
        "passive": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Tristana": {
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "passive": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "active application": {
          notes: "zero damage instance to trigger turret aggro, unknowable due to not causing death, but we can guess, deals physical damage (applies a stack of Black Cleaver, unlike similar effects) (does not trigger minion call for help, although you're expected to be attacking the target immediately afterwards anyways)",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Tagless,
          },
        },
        "active target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "active aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          notes: "aoe only applies knockback, no damage",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Trundle": {
      "Q": {
        "attack": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "damage": {
          notes: "unknowable due to not causing death, but we can guess",
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Tagless,
          },
        },
      },
      "R": {
        "initial": {
          notes: "does a 0 damage instance for call for help",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "dot": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: false,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
    },
    "Tryndamere": {
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "TwistedFate": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "onhit": {
          notes: "can be forced to non-zero by Zyra plants",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "blue": {
          notes: "onhit proc and call for help is a separate damage instance",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_SingleSpell,
          },
        },
        "red target": {
          notes: "onhit proc and call for help is a separate damage instance",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_AoeSpell,
          },
        },
        "red aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "gold": {
          notes: "onhit proc and call for help is a separate damage instance",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default_WithLifesteal,
            tags: TagTemplate_SingleSpell,
          },
        },
      },
      "E": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Twitch": {
      "P": {
        "damage": {
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: true,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "physical": {
          notes: "applies first, if lethal then cancels the second",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          notes: "never counts as AOE regardless of first vs second hit or targeted vs untargeted hit, yet is still special cased to apply PTA only to a targeted hit",
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
    },
    "Udyr": {
      "Q": {
        "temporary onhit": {
          notes: "the flat bonus damage gained for X seconds on activation, pre apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
        "permanent onhit": {
          notes: "the percent health damage gained for the next two attacks, pre apply",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: true,
              Proc: true,
              Pet: false,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "lightning first target first hit": {
          notes: "pre apply, note that the ordering is rather inconsistent with these effects due to buff orders, base Q typically triggers temporary before permanent, but the recast can cause the permanent to become first instead",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "lightning first target second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "lightning second target first hit": {
          notes: "final hit on an isolated target does a cosmetic crit",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "lightning second target second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "attack": {
          notes: "only the next two attacks",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "E": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "R": {
        "aoedot": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "storm attack target": {
          notes: "damaging enemies within the storm if it is still active",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "storm attack aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "proximity attack target": {
          notes: "damaging enemies around Udyr if the storm has timed out, pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "proximity attack aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "empowered bonus damage": {
          notes: "the bonus damage is the same instance as the normal damage",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Urgot": {
      "P": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on each attack",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "initial hit": {
          notes: "main damage is normally not allowed to be lethal, but aram damage modifiers can circumvent this and allow for lethal hits",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "execute": {
          notes: "unnecessary call for help\n\nis also affected by aram damage modifiers?  unsure how the failsafes might work there but there's no known situations where someone just doesn't execute",
          damageType: DamageType.True,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
      },
    },
    "Varus": {
      "Q": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "onhit": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "proc": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "active": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          notes: "probably shouldn't count as aoe given how rare an aoe proc is?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Vayne": {
      "Q": {
        "main attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "bonus damage": {
          notes: "post apply, if the main attack is lethal then this damage is canceled",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: TagTemplate_Proc,
          },
        },
      },
      "W": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "initial hit": {
          notes: "does a 0 damage instance for call for help (technically a relic from when E didn't do damage initially so that it could still draw turret aggro)",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "wall hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Veigar": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
    },
    "Velkoz": {
      "P": {
        "proc": {
          notes: "post apply, doesn't inherit AOE",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "initial missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "split missiles": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "first hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
        "true": {
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
    },
    "Vex": {
      "P": {
        "proc": {
          notes: "pre apply for attacks, applies first for spells",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "slow hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "fast hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "missile minion passthrough": {
          notes: "doesn't count as AOE",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "missile champion hit": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "recast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Vi": {
      "Q": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "bonus damage": {
          notes: "pre apply for attacks, applies first for Q",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "target": {
          notes: "deals a 0 damage instance post apply to trigger spell effects, works for Liandry's and Rylai's but not for Luden's",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Viego": {
      "P": {
        "soul pickup": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "bork passive": {
          notes: "pre apply, actually has minimum damage unlike actual bork",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
        "mark hit 1": {
          customTraits: {
            EmpoweredAttack: true,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "mark hit 2": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "mark hit possession": {
          notes: "applies after bork passive?  if so then no damage loss",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "active": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "target": {
          customTraits: {
            AttackEffectsSpell: false,
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Viktor": {
      "Q": {
        "spell": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "attack": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
      },
      "E": {
        "basic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "empowered initial": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "empowered secondary": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "initial": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "secondary": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Vladimir": {
      "Q": {
        "default": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "empowered": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeDotSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Volibear": {
      "P": {
        "target": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
        "aoe": {
          notes: "doesn't count as AOE",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "attack melee": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
        "attack leap": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
      },
      "W": {
        "default": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
        "empowered": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on hit",
          },
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: true,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AttackSpell,
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "champion": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "turret": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Warwick": {
      "P": {
        "damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on cast start",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AttackSpell,
        },
      },
      "R": {
        "onhit tick": {
          notes: "dealt on ticks 1 / 3 / 5 out of six total ticks, equal to 2/9ths of the total damage",
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on each hit (x3 total)",
          },
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "spell tick": {
          notes: "dealt on ticks 2 / 4 / 6 out of six total ticks, equal to 1/9th of the total damage",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: TagTemplate_AttackSpell,
          },
        },
      },
    },
    "Wukong": {
      "Q": {
        "main damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "bonus damage": {
          notes: "post apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "Q main damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "Q bonus damage": {
          notes: "post apply",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
        "R": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Xayah": {
      "P": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "Q": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          notes: "prior to 12.23, this damage was actually tagless, but was given Proc to allow it to amp from the new Navori passive",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
        "runaan's": {
          notes: "does not inherit AOE from Runaan's",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          notes: "does a zero instance to each target 0.5 after damaging to trigger turret call for help so they can still aggro despite being untargetable while dealing damage\n\nhowever, this damage as a common conflation with having the call for help property set, which isn't actually used by turret call for help, but is used by minions\n\nas a result, Xayah will always come out of ult into full minion aggro",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Xerath": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "XinZhao": {
      "P": {
        "attack bonus damage": {
          notes: "post apply for both attacks and W",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Proc,
          },
        },
      },
      "Q": {
        "attacks": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "W": {
        "first hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first hit P bonus damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
        "second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second hit P bonus damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
        "aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell_WithCallForHelp,
        },
      },
      "R": {
        "target": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "aoe": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Yasuo": {
      "Q": {
        "primary target": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "secondary target": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "Q primary target": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "Q secondary target": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Yone": {
      "P": {
        "first attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second attack physical": {
          notes: "starts first, but then magic part starts within it, so magic part actually applies first, and either part being lethal will not cancel the other, unless the physical part's onhit procs are lethal, in which case the magic part will be canceled",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second attack magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
      },
      "Q": {
        "primary target": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "secondary target": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_AoeSpell,
          },
        },
      },
      "W": {
        "physical": {
          notes: "applies first, if lethal then cancels the magic part",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          notes: "doesn't inherit AOE",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "physical": {
          notes: "applies first, if lethal then cancels the magic part",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "magic": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Yorick": {
      "Q": {
        "attack": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AttackSpell,
        },
        "ghoul attack": {
          notes: "still applies call for help after 12.16 changes",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "W": {
        "damage": {
          notes: "unknowable due to not causing death, but we can guess",
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Tagless,
          },
        },
      },
      "E": {
        "cast": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "ghoul leap": {
          notes: "no longer applies call for help after 12.16",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: true,
              EnableCallForHelp: false,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "ghoul empowered attack": {
          notes: "still applies call for help after 12.16 changes",
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "R": {
        "maiden attack": {
          notes: "still applies call for help after 12.16 changes",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Attack_NoOnHits,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: true,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "maiden proc": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Yuumi": {
      "Q": {
        "unattached": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "unattached empowered": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "attached": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "attached empowered": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Zac": {
      "P": {
        "redirect damage": {
          notes: "originates from the enemy attacking the blob",
          damageType: DamageType.True,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "attack first target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "attack second target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleTargetedSpell,
        },
        "attack slam targets": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "attack slam aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Zed": {
      "P": {
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "primary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "secondary hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "Q": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "E": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "pop": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
      },
    },
    "Zeri": {
      "P": {
        "uncharged": {
          notes: "impossible for this to be lethal due to the execute threshold always being x6 this value, however it is almost certainly identical to the charged version",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "charged": {
          notes: "no call for help?",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "execute": {
          notes: "charged attacks do not check for the execute (or perhaps just deal so much to already be over the threshold anyways?)",
          damageType: DamageType.Magic,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: false,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: false,
            },
            tags: TagTemplate_Tagless,
          },
        },
        "ward kill": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Attack,
        },
      },
      "Q": {
        "first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "second hit": {
          notes: "seems that only the first hit gets truly dodged, all other hits simply don't deal damage if they would be dodged rather than fully counting as a dodge (no floating text, only one Jax E damage stack)\n\nshould the dodge wear off after the first hit, then repeat hits will do damage as normal, but still without the onhit proc",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
      },
      "W": {
        "target": {
          notes: "changed to physical in 12.23",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "aoe": {
          notes: "changed to physical in 12.23",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "E": {
        "first target first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "first target second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "second target first hit": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Attack,
          },
        },
        "second target second hit": {
          notes: "doesn't trigger dodge despite all other hits doing so?\n\nin practice, this seems to be handled the same as any other hits",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
        "onhit": {
          notes: "added in 12.23",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc_WithLifesteal,
        },
      },
      "R": {
        "active": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "bounce physical": {
          notes: "applies second",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
        "Q first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "Q second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "E first target first hit": {
          customTraits: {
            AttackEffectsSpell: "triggers attack effects on first target hit",
          },
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack,
        },
        "E first target second hit": {
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Attack_NoOnHits,
        },
        "E second target first hit": {
          damageType: DamageType.Physical,
          damageInfo: {
            properties: {
              ApplyLifesteal: false,
              EnableCallForHelp: true,
              RespectImmunity: true,
              RespectDodge: true,
              TriggerOnHitEvents: false,
              TriggerDamageEvents: true,
              ApplyOmnivamp: true,
            },
            tags: TagTemplate_Attack,
          },
        },
        "E second target second hit": {
          notes: "doesn't trigger dodge despite all other hits doing so?\n\nin practice, this seems to be handled the same as any other hits",
          damageType: DamageType.Physical,
          damageInfo: DamageTemplate_Proc,
        },
      },
    },
    "Ziggs": {
      "P": {
        "damage": {
          notes: "post apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "turret execute": {
          notes: "ignores turrets that are invuln",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_InternalRaw,
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Zilean": {
      "Q": {
        "application": {
          notes: "unknowable due to not causing death, but we can guess",
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: TagTemplate_Tagless,
          },
        },
        "detonation": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
    "Zoe": {
      "P": {
        "bonus damage": {
          notes: "pre apply",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "Q": {
        "first cast target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "first cast aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast target": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
        "second cast aoe": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "proc": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "P proc": {
          notes: "applies second, causes the W missile to be instant instead",
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_Proc,
        },
      },
      "E": {
        "missile": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "pickup": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_SingleNontargetedSpell,
        },
        "wakeup": {
          notes: "pre apply, doesn't inherit parent tags, seems to try to cap to \"current health when drowsy ends and sleep starts\" - 1, but damage that doesn't trigger a wakeup such as Sunfire or minions can drop below this, forcing it to be lethal",
          damageType: DamageType.True,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: true,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: false,
              NonRedirectable: true,
              Item: false,
            },
          },
        },
      },
    },
    "Zyra": {
      "Q": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "W": {
        "Q": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
        "E": {
          damageType: DamageType.Magic,
          damageInfo: {
            properties: PropertyTemplate_Default,
            tags: {
              AOE: false,
              Periodic: false,
              Indirect: false,
              BasicAttack: false,
              ActiveSpell: false,
              Proc: true,
              Pet: true,
              NonRedirectable: false,
              Item: false,
            },
          },
        },
      },
      "E": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
      "R": {
        "damage": {
          damageType: DamageType.Magic,
          damageInfo: DamageTemplate_AoeSpell,
        },
      },
    },
  },
  "deprecated": {
    "Chilling Smite": {
      "champion": {
        notes: "removed in 12.22",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Challenging Smite": {
      "dot": {
        notes: "removed in 12.22",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Jungle Talisman": {
      "burn": {
        notes: "removed in 12.22",
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Sunfire Aegis": {
      "burn proc": {
        notes: "removed in 12.22",
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Turbo Chemtank": {
      "proc": {
        notes: "removed in 12.22",
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Frostfire Gauntlet": {
      "proc": {
        notes: "removed in 12.22",
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Riftmaker": {
      "damage": {
        notes: "both true and non-true damage are dealt as a separate instance, doesn't inherit AOE\n\nas of 12.23, the damage always multiplies onto the existing instance unless it has to convert it to true damage (i.e. if the initial is already true then it gets amped directly, otherwise it's a separate instance)",
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Udyr_old Q dot": {
      damageType: DamageType.Physical,
      damageInfo: {
        properties: PropertyTemplate_Default,
        tags: {
          AOE: false,
          Periodic: true,
          Indirect: true,
          BasicAttack: false,
          ActiveSpell: true,
          Proc: false,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Udyr_old Q pop": {
      notes: "unsure about this one, hard to check, little reason for it to be different though given that it's just a \"jump forward\" of all remaining ticks",
      damageType: DamageType.Physical,
      damageInfo: {
        properties: PropertyTemplate_Default,
        tags: {
          AOE: false,
          Periodic: true,
          Indirect: true,
          BasicAttack: false,
          ActiveSpell: true,
          Proc: false,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Udyr_old R dot": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeDotSpell,
    },
    "Udyr_old R target": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Udyr_old R aoe": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Syndra Q evolved": {
      notes: "removed in 12.19 rework",
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Zeri R onhit": {
      notes: "pre apply\n\nremoved in 12.23",
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_Proc,
    },
    "Zeri R bounce magic": {
      notes: "applies first\n\nremoved in 12.23",
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_Proc,
    },
    "AurelionSol_old P": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "AurelionSol_old P minion execute": {
      notes: "post-apply, triggers if minions are left with <=25 health",
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_Proc,
    },
    "AurelionSol_old Q": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "AurelionSol_old W": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "AurelionSol_old R": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
  },
  "items": {
    "Corrupting Potion": {
      "burn": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Elixir of Sorcery": {
      "proc": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Starting Item": {
      "minion onhit": {
        notes: "Tear of the Goddess, Doran's Ring, Doran's Shield",
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Support Item": {
      "minion execute": {
        notes: "Relic Shield, Steel Shoulderguards",
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Jungle Pet": {
      "attacks": {
        notes: "note that despite having the ActiveSpell tag, it also lacks the TriggerDamageEvents property, which means that no spell effects can be triggered since nothing will be able to listen for them",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Raw,
          tags: TagTemplate_AoeSpell,
        },
      },
    },
    "Scorchclaw": {
      "burn": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Sheen": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Bami's Cinder": {
      "damage": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Bramble Vest": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Hextech Alternator": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_SingleNontargetedSpell,
      },
    },
    "Ironspike Whip": {
      "active": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Kircheis Shard": {
      "proc": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Noonquiver": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Rageknife": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Recurve Bow": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Tiamat": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Ardent Censer": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Blade of the Ruined King": {
      "onhit": {
        notes: "after the bork purchase order fixes, the health value is calculated from the start of the damage chain, but can still be ordered to trigger after other effects such as Nashor's, allowing it to be lethal",
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
      "proc": {
        notes: "this is just for the three-hit proc with a cooldown, onhit no longer has a minimum damage so it can never realistically be lethal",
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Collector": {
      "execute": {
        damageType: DamageType.True,
        damageInfo: {
          properties: {
            ApplyLifesteal: false,
            EnableCallForHelp: true,
            RespectImmunity: true,
            RespectDodge: false,
            TriggerOnHitEvents: false,
            TriggerDamageEvents: true,
            ApplyOmnivamp: false,
          },
          tags: TagTemplate_Tagless,
        },
      },
    },
    "Deadman's Plate": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Death's Dance": {
      "bleed": {
        notes: "doesn't inherit AOE",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Demonic Embrace": {
      "burn": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Essence Reaver": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Guinsoo's Rageblade": {
      "phantom hit": {
        notes: "can be forced to 1 by Gangplank barrels, but is not allowed to be lethal, even by enemies\n\nwill attempt to trigger vs Zyra plants, but result in no damage, confirming BasicAttack=0?\n\nwill not trigger Ocean Soul healing or Challenging Smite dot, despite Ignite application doing both, confirming Proc=1?\n\ncan also be forced to non-zero by Nidalee traps (and possibly others), but still cannot be lethal (might have EnableKill=0?)\n\nattempts to deal 1 to Yorick W but the damage gets redistributed elsewhere so no death is triggered with this damage despite the floating text",
        customTraits: {
          AlwaysZeroDamage: true,
        },
        damageType: DamageType.Magic,
        damageInfo: {
          properties: {
            ApplyLifesteal: false,
            EnableCallForHelp: false,
            RespectImmunity: false,
            RespectDodge: false,
            TriggerOnHitEvents: true,
            TriggerDamageEvents: true,
            ApplyOmnivamp: false,
          },
          tags: TagTemplate_Proc,
        },
      },
      "onhit": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Horizon Focus": {
      "proc post-disable": {
        notes: "for when damage occurs after a disable, causing a separate proc to still happen but to respect the triggering damage type, applies before the main damage which is normal for procs but inconsistent with the other Horizon Focus case) (note that Evenshroud in this case is still just a direct amp)",
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
      "proc pre-disable": {
        notes: "for when damage occurs before a disable, causing an apology proc to make up for the late disable, formerly respecting the triggering damage type but at some point being changed to always be magic, also since its obviously triggering after the first damage has resolved, if the first instance is lethal then this damage will be canceled) (note that Evenshroud in this case does not apply any extra damage at all",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Knight's Vow": {
      "redirect": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Lich Bane": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Muramana": {
      "attack proc": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
      "spell proc": {
        notes: "post apply, ignores practice dummy text, doesn't inherit AOE",
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Nashor's Tooth": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Rapid Firecannon": {
      "proc": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Ravenous Hydra": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Redemption": {
      "active": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Runaan's Hurricane": {
      "bolt": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_AoeAttack,
      },
    },
    "Serpent's Fang": {
      "damage": {
        notes: "due to being based on shield damage, we can't normally make this lethal since not enough amps exist to make it overkill the shield\n\nhowever, it *is* damage, so we can use effects such as Night Harvester that proc on any damage dealt to trigger before the Serpent's damage, which can then remove the shield and allow the Serpent's damage to be lethal\n\nthere seems to be some sort of capping mechanic here, possibly to prevent this exact situation of overkilling the shield, but unsure how it works (math doesn't make sense)",
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Shadowflame": {
      "proc": {
        notes: "doesn't inherit AOE",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Stormrazor": {
      "proc": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Sunfire Aegis": {
      "aura": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Thornmail": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Titanic Hydra": {
      "target": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
      "aoe": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Umbral Glaive": {
      "ward damage": {
        notes: "applies first, requires the ward being at <=2 health to be lethal, if lethal then the triggering attack will not be reduced to 1 due to the ward buff falling off, but it will still not benefit from lifesteal or ovamp",
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Raw,
      },
    },
    "Wit's End": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Zeke's Convergence": {
      "damage": {
        notes: "spell proc, unsure about attack proc but probably the same?",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Divine Sunderer": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Duskblade of Draktharr": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Eclipse": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Everfrost": {
      "active": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Galeforce": {
      "active": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Goredrinker": {
      "active": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Heartsteel": {
      "proc": {
        notes: "pre apply",
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default_WithLifesteal,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: true,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Hextech Rocketbelt": {
      "damage": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Iceborn Gauntlet": {
      "proc": {
        notes: "added in 12.22",
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
    "Imperial Mandate": {
      "mark": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Jak'Sho, The Protean": {
      "drain": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Kraken Slayer": {
      "proc": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Liandry's Anguish": {
      "burn": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Luden's Tempest": {
      "target": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
      "aoe": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Night Harvester": {
      "proc": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Prowler's Claw": {
      "active": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Riftmaker": {
      "damage": {
        notes: "as of 12.23, the damage always multiplies onto the existing instance unless it has to convert it to true damage (i.e. if the initial is already true then it gets amped directly, otherwise it's a separate instance)\n\npre-apply, doesn't inherit AOE",
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Stridebreaker": {
      "active": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Trinity Force": {
      "proc": {
        damageType: DamageType.Physical,
        damageInfo: DamageTemplate_Proc_WithLifesteal,
      },
    },
  },
  "nonchampions": {
    "fountain turret champion": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_InternalRaw,
    },
    "fountain turret minion": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_Raw,
    },
    "turret basic attack": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Cloud Drake": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Mountain Drake target": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Mountain Drake aoe": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Infernal Drake target": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Infernal Drake aoe": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Ocean Drake": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Elder Dragon target": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Elder Dragon aoe": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Hextech Drake target": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Hextech Drake aoe": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Herald camp charge attack": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Herald camp swipe attack": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Herald merc turret charge": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "Herald merc attacks": {
      notes: "ignores champions, might be able to taunt/berserk it",
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Herald merc onhit bonus damage": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Proc,
    },
    "Herald merc swipe attack": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Herald camp basic attack": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Herald merc champion charge": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Gromp basic attack": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_Attack,
    },
    "Baron melee physical front": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Baron melee physical back": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Baron ranged physical front": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_Attack,
    },
    "Baron ranged physical back": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Baron ranged magic": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_Proc,
    },
    "Baron knockup": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Baron puddle": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Baron stream": {
      damageType: DamageType.Magic,
      damageInfo: DamageTemplate_AoeSpell,
    },
    "Baron cannon minion target": {
      damageType: DamageType.Physical,
      damageInfo: {
        properties: PropertyTemplate_Attack,
        tags: {
          AOE: true,
          Periodic: false,
          Indirect: false,
          BasicAttack: false,
          ActiveSpell: true,
          Proc: true,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "Baron cannon minion aoe": {
      damageType: DamageType.Physical,
      damageInfo: {
        properties: PropertyTemplate_Attack,
        tags: {
          AOE: true,
          Periodic: false,
          Indirect: false,
          BasicAttack: false,
          ActiveSpell: true,
          Proc: true,
          Pet: false,
          NonRedirectable: false,
          Item: false,
        },
      },
    },
    "minion last hit forgiveness": {
      damageType: DamageType.True,
      damageInfo: DamageTemplate_Raw,
    },
    "Chemtech Drake": {
      damageType: DamageType.Physical,
      damageInfo: DamageTemplate_SingleNontargetedSpell,
    },
    "anti counter jungle camp suicide": {
      damageType: DamageType.True,
      damageInfo: {
        properties: {
          ApplyLifesteal: false,
          EnableCallForHelp: false,
          RespectImmunity: false,
          RespectDodge: false,
          TriggerOnHitEvents: false,
          TriggerDamageEvents: true,
          ApplyOmnivamp: false,
        },
        tags: TagTemplate_Tagless,
      },
    },
  },
  "runes": {
    "Press the Attack": {
      "proc": {
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Electrocute": {
      "damage": {
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Predator": {
      "damage": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Dark Harvest": {
      "damage": {
        notes: "post apply, ignores practice dummy text",
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Cheap Shot": {
      "damage": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Aery": {
      "damage": {
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Arcane Comet": {
      "damage": {
        damageType: DamageType.Varies,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Scorch": {
      "damage": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: true,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Grasp of the Undying": {
      "damage": {
        damageType: DamageType.Magic,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Aftershock": {
      "damage": {
        damageType: DamageType.Magic,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: true,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Demolish": {
      "damage": {
        damageType: DamageType.Physical,
        damageInfo: {
          properties: {
            ApplyLifesteal: false,
            EnableCallForHelp: false,
            RespectImmunity: false,
            RespectDodge: false,
            TriggerOnHitEvents: false,
            TriggerDamageEvents: true,
            ApplyOmnivamp: true,
          },
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: true,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Shield Bash": {
      "damage": {
        damageType: DamageType.Varies,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "First Strike": {
      "damage": {
        notes: "doesn't inherit AOE",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: true,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: false,
          },
        },
      },
    },
    "Minion Dematerializer": {
      "damage": {
        damageType: DamageType.True,
        damageInfo: {
          properties: {
            ApplyLifesteal: false,
            EnableCallForHelp: false,
            RespectImmunity: false,
            RespectDodge: false,
            TriggerOnHitEvents: false,
            TriggerDamageEvents: true,
            ApplyOmnivamp: false,
          },
          tags: TagTemplate_Tagless,
        },
      },
    },
  },
  "summoners": {
    "Ignite": {
      "application": {
        notes: "will trigger various effects otherwise confirmed to require Proc=0\n\nwill reset Teemo W, confirming Periodic=0 (normally zero damage is fine)",
        customTraits: {
          AlwaysZeroDamage: true,
        },
        damageType: DamageType.True,
        damageInfo: {
          properties: {
            ApplyLifesteal: false,
            EnableCallForHelp: true,
            RespectImmunity: false,
            RespectDodge: false,
            TriggerOnHitEvents: false,
            TriggerDamageEvents: true,
            ApplyOmnivamp: false,
          },
          tags: TagTemplate_Tagless,
        },
      },
      "tick": {
        notes: "uses a zero damage instance to apply call for help",
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: true,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: false,
            Proc: true,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Smite": {
      "damage": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
    },
    "Unleashed Smite": {
      "monster": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
      "champion": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Primal Smite": {
      "monster target": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
      "monster aoe": {
        damageType: DamageType.True,
        damageInfo: DamageTemplate_Proc,
      },
      "champion": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Mark": {
      "damage": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
    "Dash": {
      "damage": {
        damageType: DamageType.True,
        damageInfo: {
          properties: PropertyTemplate_Default,
          tags: {
            AOE: false,
            Periodic: false,
            Indirect: false,
            BasicAttack: false,
            ActiveSpell: true,
            Proc: false,
            Pet: false,
            NonRedirectable: false,
            Item: true,
          },
        },
      },
    },
  },
}
