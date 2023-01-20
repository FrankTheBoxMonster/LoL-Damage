var ImmunityTemplates = {
    PreApply: {
        ZeroDamage: DamageImmunityValue.Allowed,
        FullyShieldedDamage: DamageImmunityValue.Allowed,
        InvulnDamage: DamageImmunityValue.Ignored,
    },
    PostApply: {
        ZeroDamage: DamageImmunityValue.Ignored,
        FullyShieldedDamage: DamageImmunityValue.Ignored,
        InvulnDamage: DamageImmunityValue.Ignored,
    },
    OnHitNonDamage: {
        ZeroDamage: DamageImmunityValue.Allowed,
        FullyShieldedDamage: DamageImmunityValue.Allowed,
        InvulnDamage: DamageImmunityValue.Allowed,
    },
    Unknown: {
        ZeroDamage: DamageImmunityValue.Unknown,
        FullyShieldedDamage: DamageImmunityValue.Unknown,
        InvulnDamage: DamageImmunityValue.Unknown,
    },
    OnHitDamage: {
        ZeroDamage: DamageImmunityValue.Allowed,
        FullyShieldedDamage: DamageImmunityValue.Allowed,
        InvulnDamage: DamageImmunityValue.Irrelevant,
    },
    DamageMultiplier: {
        ZeroDamage: DamageImmunityValue.Irrelevant,
        FullyShieldedDamage: DamageImmunityValue.Allowed,
        InvulnDamage: DamageImmunityValue.Irrelevant,
    },
    NonZero: {
        ZeroDamage: DamageImmunityValue.Ignored,
        FullyShieldedDamage: DamageImmunityValue.Allowed,
        InvulnDamage: DamageImmunityValue.Ignored,
    },
}


var FunctionTemplates = {
    Unknown: function(data) {
        data.result = false;
        data.notes = "unknown";
    },
    AnyDamage: function(data) {
        data.result = true;
    },
    AnyPhysicalDamage: function(data) {
        data.result = (data.type == DamageType.Physical || data.type == DamageType.Varies);
    },
    AnyMagicDamage: function(data) {
        data.result = (data.type == DamageType.Magic || data.type == DamageType.Varies);
    },
    AnyTrueDamage: function(data) {
        data.result = (data.type == DamageType.True || data.type == DamageType.Varies);
    },
    
    AnyNonProcDamage: function(data) {
        data.result = (data.tags.Proc == false);
    },
    OnHit: function(data) {
        data.result = (data.properties.TriggerOnHitEvents == true);
    },
    SpellOrPet: function(data) {
        data.result = (data.tags.ActiveSpell == true || data.tags.Pet == true);
    },
    PetOrNonProc: function(data) {
        data.result = (data.tags.Proc == false || data.tags.Pet == true);
    },
    BasicAttackAndOnHit: function(data) {
        data.result = (data.tags.BasicAttack == true && data.properties.TriggerOnHitEvents == true);
    },
    NonPeriodic: function(data) {
        data.result = (data.tags.Periodic == false);
    },
}


var TriggerNotes = {
    NonDamageDebuffs: "additionally triggers from various debuffs regardless of damage"
}


var TriggerTemplates = {
    Unknown: {
        Immunity: ImmunityTemplates.Unknown,
        Function: FunctionTemplates.Unknown,
    },
    AnyNonProcDamage: {
        Immunity: ImmunityTemplates.PreApply,
        Function: FunctionTemplates.AnyNonProcDamage,
    },
    AnyDamagePreApply: {
        Immunity: ImmunityTemplates.PreApply,
        Function: FunctionTemplates.AnyDamage,
    },
    AnyDamagePostApply: {
        Immunity: ImmunityTemplates.PostApply,
        Function: FunctionTemplates.AnyDamage,
    },
    Electrocute: {
        Immunity: ImmunityTemplates.PreApply,
        Notes: TriggerNotes.NonDamageDebuffs,
        Function: FunctionTemplates.PetOrNonProc,
    },
    SpellEffects: {
        Immunity: ImmunityTemplates.PreApply,
        Function: FunctionTemplates.SpellOrPet,
    },
    OnHitNonDamage: {
        Immunity: ImmunityTemplates.OnHitNonDamage,
        Function: FunctionTemplates.OnHit,
    },
    Thornmail: {
        Immunity: ImmunityTemplates.OnHitNonDamage,
        Function: FunctionTemplates.BasicAttackAndOnHit,
    },
    ExecutionersCalling: {
        Immunity: ImmunityTemplates.PostApply,
        Function: FunctionTemplates.AnyPhysicalDamage,
    },
    OblivionOrb: {
        Immunity: ImmunityTemplates.PostApply,
        Function: FunctionTemplates.AnyMagicDamage,
    },
    OnHitDamage: {
        Immunity: ImmunityTemplates.OnHitDamage,
        Function: FunctionTemplates.OnHit,
    },
    WardensMail: {
        Immunity: {
            ZeroDamage: DamageImmunityValue.Allowed,
            FullyShieldedDamage: DamageImmunityValue.Ignored,
            InvulnDamage: DamageImmunityValue.Irrelevant,
        },
        Function: FunctionTemplates.BasicAttackAndOnHit,
    },
    CatalystPassive: {
        Immunity: {
            ZeroDamage: DamageImmunityValue.Irrelevant,
            FullyShieldedDamage: DamageImmunityValue.Allowed,
            InvulnDamage: DamageImmunityValue.Ignored,
        },
        Function: FunctionTemplates.AnyDamage,
    },
    SleepWakeup: {
        Immunity: ImmunityTemplates.NonZero,
        Notes: "does not wake on any damage from minions, but can be woken by monsters or the enemy team (if sleeping a monster), with the wakeup damage always being attributed to the person who applied the sleep\nadditionally does not wake if the post-mitigation pre-shielding damage dealt is <= 10 (at all levels, ranks, and AP values, might be unintended that it doesn't ever scale)",
        Function: function(data) {
            var hasValid = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true || data.tags.Pet == true);
            var hasInvalid = (data.tags.Periodic == true || data.tags.Indirect == true);
            
            data.result = (hasValid == true && hasInvalid == false);
            if(hasValid == true && data.tags.Periodic == false && data.tags.Indirect == true) {
                data.notes = "would normally trigger a wakeup, but doesn't due to being tagged as Indirect";
            }
            
            if(data.name == "Lucian R damage") {
                data.result = false;
                data.notes = "special case, tagged as Periodic yet still triggers wakeup unlike other spells, possibly because it's seen more like a bunch of single target skillshots rather than an applied dot or something that might accidentally trigger wakeup, yet still counts as Periodic for other effects";
            }
        }
    },
}





var DamageTriggers = {
    "summoners": {
        
    },
    
    "runes": {
        "Press the Attack": TriggerTemplates.Unknown,
        "Lethal Tempo": TriggerTemplates.Unknown,
        "Fleet Footwork": TriggerTemplates.Unknown,
        "Conqueror": {
            Immunity: ImmunityTemplates.PreApply,
            Notes: "only triggers once per 5s per cast instance",
            Function: function(data) {
                data.result = ((data.properties.TriggerOnHitEvents == true || data.tags.BasicAttack == false) && (data.tags.Proc == false || data.tags.Pet == true));
            }
        },
        "Presence of Mind": TriggerTemplates.AnyDamagePreApply,
        "Electrocute": TriggerTemplates.Electrocute,
        "Predator": {
            Immunity: ImmunityTemplates.PreApply,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Dark Harvest": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.PetOrNonProc,
        },
        "Hail of Blades": TriggerTemplates.Unknown,
        "Cheap Shot": {
            Immunity: ImmunityTemplates.NonZero,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Taste of Blood": TriggerTemplates.AnyDamagePreApply,
        "Sudden Impact": TriggerTemplates.AnyDamagePreApply,
        "Summon Aery": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.Proc == false || data.tags.Periodic == false);
                
                if(data.name == "Elder Buff dot") {
                    data.result = false;
                    data.notes = "special case to fix Elder infinite Aery by making Elder not apply from Aery rather than making Aery not apply from Elder (could have just made Elder dot Periodic but it is not)";
                }
            }
        },
        "Arcane Comet": {
            Immunity: ImmunityTemplates.NonZero,
            Notes: "both proc and refund",
            Function: function(data) {
                FunctionTemplates.SpellOrPet(data);
                if(data.result == true) {
                    data.notes = "";
                    
                    if(data.tags.Periodic == true) {
                        data.notes += "Periodic:  5% refund";
                    } else if(data.tags.AOE == true) {
                        data.notes += "AOE:  10% refund";
                    } else if(data.tags.Pet == true) {
                        data.notes += "Pet:  10% refund";
                    } else {
                        data.notes += "single target:  20% refund";
                    }
                }
            }
        },
        "Phase Rush": TriggerTemplates.Electrocute,
        "Manaflow Band": {
            Immunity: ImmunityTemplates.PreApply,
            Notes: TriggerNotes.NonDamageDebuffs,
            Function: FunctionTemplates.SpellOrPet,
        },
        "Scorch": TriggerTemplates.AnyNonProcDamage,
        "Grasp of the Undying": TriggerTemplates.OnHitNonDamage,
        "Demolish": TriggerTemplates.OnHitNonDamage,
        "Font of Life": {
            Immunity: ImmunityTemplates.Unknown,
            Function: FunctionTemplates.OnHit,
        },
        "Shield Bash": TriggerTemplates.OnHitNonDamage,
        "Second Wind": TriggerTemplates.AnyDamagePostApply,
        "Bone Plating": TriggerTemplates.Unknown,
        "First Strike": TriggerTemplates.AnyDamagePreApply,
    },
    
    "items": {
        "Cull": TriggerTemplates.OnHitNonDamage,
        "Starting Item onhit": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Irrelevant,
            },
            Function: FunctionTemplates.OnHit,
        },
        "Doran's Ring regen": TriggerTemplates.AnyDamagePreApply,
        "Doran's Shield regen": TriggerTemplates.AnyDamagePostApply,
        "Jungle pet attacks": TriggerTemplates.Unknown,
        "Scorchclaw passive": TriggerTemplates.AnyNonProcDamage,
        "Guardian's Horn regen": TriggerTemplates.Unknown,
        "Ultbook Attack-Smite": TriggerTemplates.Unknown,
        "Support Item execute": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Ignored,
            },
            Notes: "the execute itself does not go through invuln, and the damage does not consume a charge on its own, it only assists in killing the minion, with any confirmed minion kills consuming a charge",
            Function: FunctionTemplates.OnHit,
        },
        "Support Item poke": {
            Immunity: ImmunityTemplates.NonZero,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Tear stacking": {
            Immunity: ImmunityTemplates.PreApply,
            Notes: TriggerNotes.NonDamageDebuffs,
            Function: function(data) {
                data.result = (data.tags.ActiveSpell == true);
            }
        },
        
        "Corrupting Potion": {
            Immunity: ImmunityTemplates.PostApply,
            Function: function(data) {
                data.result = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true);
            }
        },
        "Elixir of Sorcery (champion)": TriggerTemplates.AnyDamagePreApply,
        "Elixir of Sorcery (turret)": {
            Immunity: ImmunityTemplates.OnHitDamage,
            Function: function(data) {
                data.result = (data.tags.Pet == false && (data.tags.ActiveSpell == true || data.properties.TriggerOnHitEvents == true));
            }
        },
        
        "Plated Steelcaps": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: function(data) {
                data.result = (data.tags.BasicAttack == true && data.tags.ActiveSpell == false && data.tags.Pet == false);
                if(data.tags.BasicAttack == true && data.tags.ActiveSpell == true) {
                    data.notes = "bugged to not be reduced";
                }
            }
        },
        
        "Sheen": TriggerTemplates.OnHitNonDamage,
        "Bramble Vest": TriggerTemplates.Thornmail,
        "Catalyst of Aeons": TriggerTemplates.CatalystPassive,
        "Executioner's Calling": TriggerTemplates.ExecutionersCalling,
        "Hearthbound Axe": TriggerTemplates.OnHitNonDamage,
        "Hextech Alternator": TriggerTemplates.AnyDamagePreApply,
        "Kircheis Shard": TriggerTemplates.Unknown,
        "Noonquiver": {
            Immunity: ImmunityTemplates.OnHitDamage,
            Function: FunctionTemplates.BasicAttackAndOnHit,
        },
        "OblivionOrb": TriggerTemplates.OblivionOrb,
        "Phage": {
            Immunity: ImmunityTemplates.PreApply,
            Function: FunctionTemplates.AnyPhysicalDamage,
        },
        "Rageknife": TriggerTemplates.OnHitDamage,
        "Recurve Bow": TriggerTemplates.OnHitDamage,
        "Spectre's Cowl": TriggerTemplates.AnyDamagePostApply,
        "Tiamat": TriggerTemplates.OnHitNonDamage,
        "Warden's Mail": TriggerTemplates.WardensMail,
        
        "Abyssal Mask": TriggerTemplates.CatalystPassive,
        "Ardent Censer": TriggerTemplates.OnHitDamage,
        "Blade of the Ruined King stacks/proc": TriggerTemplates.OnHitNonDamage,
        "Chempunk Chainsword": TriggerTemplates.ExecutionersCalling,
        "Chemtech Putrifier passive": TriggerTemplates.OblivionOrb,
        "Chemtech Putrifier proc": TriggerTemplates.AnyDamagePostApply,
        "Cosmic Drive": {
            Immunity: ImmunityTemplates.NonZero,
            Function: function(data) {
                data.result = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true);
            }
        },
        "Dead Man's Plate": TriggerTemplates.OnHitNonDamage,
        "Demonic Embrace": TriggerTemplates.SpellEffects,
        "Essence Reaver": TriggerTemplates.OnHitNonDamage,
        "Force of Nature stacking": TriggerTemplates.Unknown,
        "Force of Nature reduction": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: FunctionTemplates.AnyMagicDamage,
        },
        "Frozen Heart": TriggerTemplates.WardensMail,
        "Gargoyle Stoneplate": TriggerTemplates.AnyDamagePreApply,
        "Guinsoo's Rageblade stacks/onhit": TriggerTemplates.Unknown,
        "Horizon Focus": TriggerTemplates.Unknown,
        "Hullbreaker": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: function(data) {
                data.result = (data.tags.BasicAttack == true && data.tags.Proc == false);
            }
        },
        "Knight's Vow": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Notes: "old Knight's Vow also redirected true damage, which required Zoe E wakeup to use the NonRedirectable tag to prevent being double reduced since its damage is based on the E's initial hit which was already reduced, however new Knight's Vow doesn't redirect true damage so the NonRedirectable tag is now pointless",
            Function: function(data) {
                data.result = (data.type != DamageType.True && data.tags.NonRedirectable == false);
            }
        },
        "Lich Bane": TriggerTemplates.OnHitNonDamage,
        "Manamune": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.ActiveSpell == true || (data.tags.BasicAttack == true && data.tags.Pet == false));
            }
        },
        "Morellonomicon": TriggerTemplates.OblivionOrb,
        "Mortal Reminder passive": TriggerTemplates.ExecutionersCalling,
        "Mortal Reminder stacking": TriggerTemplates.Unknown,
        "Muramana": {
            Immunity:  ImmunityTemplates.OnHitDamage,
            Function: function(data) {
                data.result = ((data.tags.ActiveSpell == true || data.properties.TriggerOnHitEvents == true) && data.tags.Proc == false);
            }
        },
        "Nashor's Tooth": TriggerTemplates.OnHitNonDamage,
        "Navori Quickblades": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Notes: "only PQWER slots work, no summoners / items / runes\nunclear if pet amps are intentional or not, as all pets in practice also have the intended tags",
            Function: function(data) {
                var validSlot = (data.category == "champions");
                data.result = ((data.tags.ActiveSpell == true || data.tags.Proc == true) && validSlot == true);
                
                if(data.name == "Teemo E dot") {
                    data.notes = "Teemo E dot had its Proc tag removed to allow it to trigger old Jungle Talisman burn, which ignored Proc damage.  As a result, it is now unable to benefit from new Navori amp.  Jungle Talisman is no longer a thing, so the workaround there could be undone to fix the Navori issue.  The onhit part of Teemo E is still Proc and is amped already.";
                }
            }
        },
        "Phantom Dancer": TriggerTemplates.Unknown,
        "Randuin's Omen (Rock Solid)": TriggerTemplates.WardensMail,
        "Randuin's Omen (crit reduction)": TriggerTemplates.Unknown,
        "Rapid Firecannon": TriggerTemplates.Unknown,
        "Ravenous Hydra": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = ((data.tags.ActiveSpell == true || data.tags.Pet == true || (data.tags.BasicAttack == true && data.properties.TriggerOnHitEvents == true)) && data.tags.Item == false);
            }
        },
        "Runaan's Hurricane": TriggerTemplates.Unknown,
        "Rylai's Crystal Scepter": TriggerTemplates.SpellEffects,
        "Serpent's Fang": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Allowed,
                InvulnDamage: DamageImmunityValue.Allowed,
            },
            Notes: "shields still show text for taking damage if marked while invuln, however no actual damage is dealt, losing the ability to cut the shield if initially marked while invuln",
            Function: FunctionTemplates.AnyDamage,
        },
        "Serylda's Grudge": TriggerTemplates.SpellEffects,
        "Shadowflame": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: FunctionTemplates.AnyMagicDamage,
        },
        "The Collector": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.AnyDamage,
        },
        "Thornmail": TriggerTemplates.Thornmail,
        "Titanic Hydra": TriggerTemplates.OnHitNonDamage,
        "Winter's Approach": TriggerTemplates.Unknown,
        "Wit's End": TriggerTemplates.OnHitNonDamage,
        "Zeke's Convergence": {
            Immunity: ImmunityTemplates.Unknown,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        
        "Crown of the Shattered Queen": {
            Immunity: ImmunityTemplates.NonZero,
            Function: FunctionTemplates.AnyDamage,
        },
        "Divine Sunderer": TriggerTemplates.OnHitNonDamage,
        "Duskblade of Draktharr": TriggerTemplates.OnHitNonDamage,
        "Eclipse": TriggerTemplates.AnyNonProcDamage,
        "Evenshroud": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Irrelevant,
                FullyShieldedDamage: DamageImmunityValue.Ignored,
                InvulnDamage: DamageImmunityValue.Irrelevant,
            },
            Function: FunctionTemplates.AnyDamage,
        },
        "Heartsteel": TriggerTemplates.OnHitNonDamage,
        "Iceborn Gauntlet": TriggerTemplates.OnHitNonDamage,
        "Imperial Mandate detonate": TriggerTemplates.AnyDamagePreApply,
        "Kraken Slayer": TriggerTemplates.Unknown,
        "Liandry's Anguish": TriggerTemplates.SpellEffects,
        "Luden's Echo proc/refund": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.SpellOrPet,
        },
        "Night Harvester": TriggerTemplates.AnyDamagePreApply,
        "Prowler's Claw": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: FunctionTemplates.AnyDamage,
        },
        "Riftmaker amp": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: FunctionTemplates.AnyDamage,
        },
        "Rod of Ages": TriggerTemplates.CatalystPassive,
        "Trinity Force stacks/proc": TriggerTemplates.OnHitNonDamage,
    },
    
    "systems": {
        "Red Buff dot": {
            Immunity: ImmunityTemplates.PreApply,
            Function: FunctionTemplates.OnHit,
        },
        "Hextech Dragon Soul proc": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.BasicAttack == true || data.tags.ActiveSpell == true || data.tags.Pet == true);
            }
        },
        "Infernal Dragon Soul proc": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.BasicAttack == true || data.tags.ActiveSpell == true);
            }
        },
        "Ocean Dragon Soul healing": TriggerTemplates.AnyNonProcDamage,
        "Mountain Dragon Soul refresh": TriggerTemplates.AnyDamagePreApply,
        "Elder Dragon buff": {
            Immunity: ImmunityTemplates.NonZero,
            Function: FunctionTemplates.AnyDamage,
        },
        "Ward / Trap / Plant damage": TriggerTemplates.Unknown,
        "Herald Eye pop": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Allowed,
            },
            Function: FunctionTemplates.OnHit,
        },
        "in combat": TriggerTemplates.AnyDamagePreApply,
    },
    
    "champions": {
        "Aatrox E vamp": {
            Immunity: ImmunityTemplates.Unknown,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Jax E aoe reduction": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Function: function(data) {
                data.result = (data.tags.AOE == true);
            }
        },
        "Lillia R sleep wakeup": TriggerTemplates.SleepWakeup,
        "MissFortune W reset": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Neeko P reset": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.Indirect == false);
            }
        },
        "Teemo P reset": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Teemo W reset": {
            Immunity: ImmunityTemplates.PreApply,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Zoe E sleep wakeup": TriggerTemplates.SleepWakeup,
    },
    
    "deprecated": {
        "Challenging Smite dot": TriggerTemplates.AnyNonProcDamage,
        
        "Jungle Talisman burn": {
            Immunity: ImmunityTemplates.PostApply,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        
        "Navori Quickblades (old)": TriggerTemplates.Unknown,
        
        "Frostfire Gauntlet": TriggerTemplates.OnHitNonDamage,
        "Sunfire Aegis": TriggerTemplates.OnHitNonDamage,
        "Turbo Chemtank": {
            Immunity: ImmunityTemplates.PreApply,
            Function: function(data) {
                data.result = (data.tags.BasicAttack == true);
            }
        },
    },
}




function ExtractDamageTriggerData(damageRecord) {
    var data = {
        name: damageRecord.fullName,
        category: damageRecord.category,
        type: damageRecord.damageType,
        properties: damageRecord.damageInfo.properties,
        tags: damageRecord.damageInfo.tags,
        customTraits: damageRecord.customTraits,
    };
    
    ResetDamageTriggerData(data);
    return data;
}

function ResetDamageTriggerData(data) {
    data.result = undefined;
    data.notes = undefined;
}


var checkTriggersDebug = false;
function CheckTriggers(damageRecord) {
    damageRecord.allowedTriggers = { };
    damageRecord.ignoredTriggers = { };
    
    var data = ExtractDamageTriggerData(damageRecord);
    
    var notesNewline = "\n    ";
    var log = "checking triggers for:  " + data.name;
    
    for(var category in DamageTriggers) {
        if(category == "deprecated") {
            continue;
        }
        
        for(var name in DamageTriggers[category]) {
            var trigger = DamageTriggers[category][name];
            
            ResetDamageTriggerData(data);
            trigger.Function(data);
            if(data.result == undefined) {
                window.alert("trigger failed to assign a result:  " + name);
            }
            
            var generalNotes = trigger.Notes ?? "";
            var specialNotes = data.notes ?? "";
            var immunityNotes = "";
            
            if(data.result == true) {
                if(trigger.Immunity.ZeroDamage == DamageImmunityValue.Ignored) {
                    var alwaysZeroDamage = data.customTraits.AlwaysZeroDamage;
                    var sometimesZeroDamage = data.customTraits.SometimesZeroDamage;
                    
                    if(alwaysZeroDamage == true || sometimesZeroDamage != undefined) {
                        if(alwaysZeroDamage == true) {
                            data.result = false;
                        }
                        
                        immunityNotes = "will not trigger on zero damage";
                        
                        if(sometimesZeroDamage != undefined) {
                            immunityNotes += " (" + sometimesZeroDamage + ")";
                        }
                    }
                }
                
                if(checkTriggersDebug == true) {
                    if(trigger.Immunity.FullyShieldedDamage == DamageImmunityValue.Ignored && data.result == true) {
                        if(immunityNotes != "") {
                            immunityNotes += "\n";
                        }
                        
                        immunityNotes += "will not trigger on fully shielded damage";
                    }
                    
                    if(trigger.Immunity.InvulnDamage == DamageImmunityValue.Ignored && data.result == true) {
                        if(immunityNotes != "") {
                            immunityNotes += "\n";
                        }
                        
                        immunityNotes += "will not trigger on invuln damage";
                    }
                }
            }
            
            
            var fullNotes = "";
            if(immunityNotes != "") {
                fullNotes += "<i>" + immunityNotes + "</i>";
            }
            
            if(generalNotes != "") {
                if(fullNotes != "") {
                    fullNotes += "\n";
                }
                
                fullNotes += generalNotes;
            }
            
            if(specialNotes != "") {
                if(fullNotes != "") {
                    fullNotes += "\n";
                }
                
                fullNotes += "<i>" + specialNotes + "</i>";
            }
            
            if(data.properties.TriggerDamageEvents == false) {
                data.result = false;
                fullNotes = "this damage does not trigger any other damage events";
            }
            
            
            if(checkTriggersDebug == false) {
                log = "";
            } else {
                log += "\n  ";
            }
            
            if(checkTriggersDebug == true) {
                log += name +  ":  " + data.result;
            } else {
                log += "<b>" + name + "</b>";
            }
            
            if(fullNotes != "") {
                log += "\n" + fullNotes;
            }
            
            
            log = log.replaceAll("\n", notesNewline);
            
            if(checkTriggersDebug == false) {
                if(data.result == true) {
                    damageRecord.allowedTriggers[name] = log;
                } else {
                    damageRecord.ignoredTriggers[name] = log;
                }
            }
        }
    }
    
    if(checkTriggersDebug == true) {
        console.log(log);
    } else {
        ApplyTriggersToCells("ALLOWED TRIGGERS", damageRecord.allowedTriggersCell, damageRecord.allowedTriggers);
        ApplyTriggersToCells("IGNORED TRIGGERS", damageRecord.ignoredTriggersCell, damageRecord.ignoredTriggers);
    }
}

function ApplyTriggersToCells(prefix, cell, triggers) {
    cell.innerHTML = "<b><u>" + prefix + ":</u></b>\n\n";
    for(var trigger in triggers) {
        if(cell.innerHTML != "") {
            cell.innerHTML += "\n";
        }
        
        cell.innerHTML += triggers[trigger];
    }
    
    cell.innerHTML = cell.innerHTML.replaceAll("\n", "<br>");
    cell.innerHTML = cell.innerHTML.replaceAll("    ", "&nbsp;&nbsp;&nbsp;&nbsp;");
}