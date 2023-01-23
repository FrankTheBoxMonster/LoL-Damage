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
        data.canTrigger = false;
    },
    AnyDamage: function(data) {
        data.canTrigger = true;
    },
    AnyPhysicalDamage: function(data) {
        data.canTrigger = (data.type == DamageType.Physical || data.type == DamageType.Varies);
    },
    AnyMagicDamage: function(data) {
        data.canTrigger = (data.type == DamageType.Magic || data.type == DamageType.Varies);
    },
    AnyTrueDamage: function(data) {
        data.canTrigger = (data.type == DamageType.True || data.type == DamageType.Varies);
    },
    
    AnyNonProcDamage: function(data) {
        data.canTrigger = (data.tags.Proc == false);
    },
    OnHit: function(data) {
        data.canTrigger = (data.properties.TriggerOnHitEvents == true);
    },
    SpellOrPet: function(data) {
        data.canTrigger = (data.tags.ActiveSpell == true || data.tags.Pet == true);
    },
    PetOrNonProc: function(data) {
        data.canTrigger = (data.tags.Proc == false || data.tags.Pet == true);
    },
    BasicAttackAndOnHit: function(data) {
        data.canTrigger = (data.tags.BasicAttack == true && data.properties.TriggerOnHitEvents == true);
    },
    NonPeriodic: function(data) {
        data.canTrigger = (data.tags.Periodic == false);
    },
}


var TriggerNotes = {
    Unknown: "unknown trigger",
    NonDamageDebuffs: "additionally triggers from various debuffs regardless of damage"
}


var InterestTemplates = {
    AlwaysHigh: function(data) {  // assumed default, always show
        return false;
    },
    AlwaysLow: function(data) {  // always hide
        return true;
    },
    
    OnHit: function(data) {  // only show if the spell has BasicAttack or TriggerOnHitEvents, otherwise hide (also including Pet since some count as attacks)
        return (data.tags.BasicAttack == false && data.properties.TriggerOnHitEvents == false && data.tags.Pet == false);
    },
    OnlyShowIfFalse: function(data) {  // aka hide if true
        return (data.result == true);
    },
    OnlyShowIfTrue: function(data) {  // aka hide if false
        return (data.result == false);
    }
}


var TriggerTemplates = {
    UnknownOutgoing: {
        Immunity: ImmunityTemplates.Unknown,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.AlwaysLow,
        GeneralNotes: TriggerNotes.Unknown,
        Function: FunctionTemplates.Unknown,
    },
    UnknownIncoming: {
        Immunity: ImmunityTemplates.Unknown,
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.AlwaysLow,
        GeneralNotes: TriggerNotes.Unknown,
        Function: FunctionTemplates.Unknown,
    },
    
    DealAnyNonProcDamage: {
        Immunity: ImmunityTemplates.PreApply,
        Event: DamageEvent.UnknownOutgoing,
        Function: FunctionTemplates.AnyNonProcDamage,
    },
    DealAnyDamagePreApply: {
        Immunity: ImmunityTemplates.PreApply,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyDamage,
    },
    TakeAnyDamagePreApply: {
        Immunity: ImmunityTemplates.PreApply,
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyDamage,
    },
    DealAnyDamagePostApply: {
        Immunity: ImmunityTemplates.PostApply,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyDamage,
    },
    TakeAnyDamagePostApply: {
        Immunity: ImmunityTemplates.PostApply,
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyDamage,
    },
    DealSpellEffects: {
        Immunity: ImmunityTemplates.PreApply,
        Event: DamageEvent.UnknownOutgoing,
        Function: FunctionTemplates.SpellOrPet,
    },
    DealOnHitNonDamage: {
        Immunity: ImmunityTemplates.OnHitNonDamage,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.OnHit,
        Function: FunctionTemplates.OnHit,
    },
    DealOnHitDamage: {
        Immunity: ImmunityTemplates.OnHitDamage,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.OnHit,
        Function: FunctionTemplates.OnHit,
    },
    
    
    Electrocute: {
        Immunity: ImmunityTemplates.PreApply,
        Event: DamageEvent.UnknownOutgoing,
        GeneralNotes: TriggerNotes.NonDamageDebuffs,
        Function: FunctionTemplates.PetOrNonProc,
    },
    Thornmail: {
        Immunity: ImmunityTemplates.OnHitNonDamage,
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.OnHit,
        Function: FunctionTemplates.BasicAttackAndOnHit,
    },
    ExecutionersCalling: {
        Immunity: ImmunityTemplates.PostApply,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyPhysicalDamage,
    },
    OblivionOrb: {
        Immunity: ImmunityTemplates.PostApply,
        Event: DamageEvent.UnknownOutgoing,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyMagicDamage,
    },
    WardensMail: {
        Immunity: {
            ZeroDamage: DamageImmunityValue.Allowed,
            FullyShieldedDamage: DamageImmunityValue.Ignored,
            InvulnDamage: DamageImmunityValue.Irrelevant,
        },
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.OnHit,
        Function: FunctionTemplates.BasicAttackAndOnHit,
    },
    CatalystPassive: {
        Immunity: {
            ZeroDamage: DamageImmunityValue.Irrelevant,
            FullyShieldedDamage: DamageImmunityValue.Allowed,
            InvulnDamage: DamageImmunityValue.Ignored,
        },
        Event: DamageEvent.UnknownIncoming,
        LowInterest: InterestTemplates.AlwaysLow,
        Function: FunctionTemplates.AnyDamage,
    },
    SleepWakeup: {
        Immunity: ImmunityTemplates.NonZero,
        Event: DamageEvent.UnknownIncoming,
        GeneralNotes: "does not wake on any damage from minions, but can be woken by monsters or the enemy team (if sleeping a monster), with the wakeup damage always being attributed to the person who applied the sleep\nadditionally does not wake if the post-mitigation pre-shielding damage dealt is <= 10 (at all levels, ranks, and AP values, might be unintended that it doesn't ever scale)",
        Function: function(data) {
            var hasValid = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true || data.tags.Pet == true);
            var hasInvalid = (data.tags.Periodic == true || data.tags.Indirect == true);
            
            data.canTrigger = (hasValid == true && hasInvalid == false);
            if(hasValid == true && data.tags.Periodic == false && data.tags.Indirect == true) {
                data.specialNotes = "would normally trigger a wakeup, but doesn't due to being tagged as Indirect";
            }
            
            if(data.name == "Lucian R damage") {
                data.canTrigger = false;
                data.specialNotes = "special case, Lucian R is tagged as Periodic yet still triggers wakeup unlike other spells, possibly because it's seen more like a bunch of single target skillshots rather than an applied dot or something that might accidentally trigger wakeup, yet still counts as Periodic for other effects";
            }
        }
    },
}





var DamageTriggers = {
    "summoners": {
        
    },
    
    "runes": {
        "Press the Attack amp": TriggerTemplates.UnknownIncoming,
        "Conqueror": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: "only triggers once per 5s per cast instance",
            Function: function(data) {
                data.canTrigger = ((data.properties.TriggerOnHitEvents == true || data.tags.BasicAttack == false) && (data.tags.Proc == false || data.tags.Pet == true));
            }
        },
        "Presence of Mind": TriggerTemplates.DealAnyDamagePreApply,
        "Electrocute": TriggerTemplates.Electrocute,
        "Predator": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Dark Harvest": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownOutgoing,  // is this actually OnDeal or is it OnTake?
            Function: FunctionTemplates.PetOrNonProc,
        },
        "Cheap Shot": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Taste of Blood": TriggerTemplates.DealAnyDamagePreApply,
        "Sudden Impact": TriggerTemplates.DealAnyDamagePreApply,
        "Summon Aery": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.Proc == false || data.tags.Periodic == false);
                
                if(data.name == "Elder Buff dot") {
                    data.canTrigger = false;
                    data.specialNotes = "special case to fix Elder infinite Aery by making Elder not apply from Aery rather than making Aery not apply from Elder (could have just made Elder dot Periodic but it is not)";
                }
            }
        },
        "Arcane Comet": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: "both proc and refund",
            Function: function(data) {
                FunctionTemplates.SpellOrPet(data);
                
                if(data.canTrigger == true) {
                    data.specialNotes = "";
                    
                    if(data.tags.Periodic == true) {
                        data.specialNotes += "Periodic:  5% refund";
                    } else if(data.tags.AOE == true) {
                        data.specialNotes += "AOE:  10% refund";
                    } else if(data.tags.Pet == true) {
                        data.specialNotes += "Pet:  10% refund";
                    } else {
                        data.specialNotes += "single target:  20% refund";
                    }
                }
            }
        },
        "Phase Rush": TriggerTemplates.Electrocute,
        "Manaflow Band": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: TriggerNotes.NonDamageDebuffs,
            Function: FunctionTemplates.SpellOrPet,
        },
        "Scorch": TriggerTemplates.DealAnyNonProcDamage,
        "Second Wind": TriggerTemplates.TakeAnyDamagePostApply,
        "Bone Plating": TriggerTemplates.UnknownIncoming,
        "First Strike": TriggerTemplates.DealAnyDamagePreApply,
    },
    
    "items": {
        "Doran's Ring regen": TriggerTemplates.DealAnyDamagePreApply,
        "Doran's Shield regen": TriggerTemplates.TakeAnyDamagePostApply,
        "Jungle pet attacks": TriggerTemplates.UnknownOutgoing,
        "Scorchclaw passive": TriggerTemplates.DealAnyNonProcDamage,
        "Guardian's Horn regen": TriggerTemplates.UnknownIncoming,
        "Ultbook Attack-Smite": TriggerTemplates.UnknownOutgoing,
        "Support Item poke": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        "Tear stacking": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: TriggerNotes.NonDamageDebuffs,
            Function: function(data) {
                data.canTrigger = (data.tags.ActiveSpell == true);
            }
        },
        
        "Corrupting Potion": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true);
            }
        },
        "Elixir of Sorcery (champion)": TriggerTemplates.DealAnyDamagePreApply,
        "Elixir of Sorcery (turret)": {
            Immunity: ImmunityTemplates.OnHitDamage,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.Pet == false && (data.tags.ActiveSpell == true || data.properties.TriggerOnHitEvents == true));
            }
        },
        
        "Catalyst of Aeons": TriggerTemplates.CatalystPassive,
        "Executioner's Calling": TriggerTemplates.ExecutionersCalling,
        "Hextech Alternator": TriggerTemplates.DealAnyDamagePreApply,
        "OblivionOrb": TriggerTemplates.OblivionOrb,
        "Phage": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyPhysicalDamage,
        },
        "Spectre's Cowl": TriggerTemplates.TakeAnyDamagePostApply,
        
        "Abyssal Mask": TriggerTemplates.CatalystPassive,
        "Chempunk Chainsword": TriggerTemplates.ExecutionersCalling,
        "Chemtech Putrifier passive": TriggerTemplates.OblivionOrb,
        "Chemtech Putrifier proc": TriggerTemplates.DealAnyDamagePostApply,
        "Cosmic Drive": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.ActiveSpell == true || data.tags.BasicAttack == true);
            }
        },
        "Demonic Embrace": TriggerTemplates.DealSpellEffects,
        "Force of Nature stacking": TriggerTemplates.UnknownIncoming,
        "Force of Nature reduction": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyMagicDamage,
        },
        "Gargoyle Stoneplate": TriggerTemplates.TakeAnyDamagePreApply,
        "Horizon Focus": TriggerTemplates.UnknownOutgoing,
        "Knight's Vow": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.OnlyShowIfFalse,
            GeneralNotes: "old Knight's Vow also redirected true damage, which required Zoe E wakeup to use the NonRedirectable tag to prevent being double reduced since its damage is based on the E's initial hit which was already reduced, however new Knight's Vow doesn't redirect true damage so the NonRedirectable tag is now pointless",
            Function: function(data) {
                data.canTrigger = (data.type != DamageType.True && data.tags.NonRedirectable == false);
            }
        },
        "Manamune": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.ActiveSpell == true || (data.tags.BasicAttack == true && data.tags.Pet == false));
            }
        },
        "Morellonomicon": TriggerTemplates.OblivionOrb,
        "Mortal Reminder passive": TriggerTemplates.ExecutionersCalling,
        "Muramana": {
            Immunity:  ImmunityTemplates.OnHitDamage,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = ((data.tags.ActiveSpell == true || data.properties.TriggerOnHitEvents == true) && data.tags.Proc == false);
            }
        },
        "Navori Quickblades amp": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: "only PQWER slots work, no summoners / items / runes\nunclear if pet amps are intentional or not, as all pets in practice also have the intended tags\nempowered attacks only work if they would apply spell effects",
            Function: function(data) {
                var validSlot = (data.category == "champions");
                data.canTrigger = ((data.tags.ActiveSpell == true || data.tags.Proc == true) && validSlot == true);
                
                if(data.name == "Teemo E dot") {
                    data.specialNotes = "Teemo E dot had its Proc tag removed to allow it to trigger old Jungle Talisman burn, which ignored Proc damage.  As a result, it is now unable to benefit from new Navori amp.  Jungle Talisman is no longer a thing, so the workaround there could be undone to fix the Navori issue.  The onhit part of Teemo E is still Proc and is amped already.";
                }
            }
        },
        "Ravenous Hydra": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = ((data.tags.ActiveSpell == true || data.tags.Pet == true || (data.tags.BasicAttack == true && data.properties.TriggerOnHitEvents == true)) && data.tags.Item == false);
            }
        },
        "Rylai's Crystal Scepter": TriggerTemplates.DealSpellEffects,
        "Serpent's Fang": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Allowed,
                InvulnDamage: DamageImmunityValue.Allowed,
            },
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            GeneralNotes: "shields still show text for taking damage if marked while invuln, however no actual damage is dealt, losing the ability to cut the shield if initially marked while invuln",
            Function: FunctionTemplates.AnyDamage,
        },
        "Serylda's Grudge": TriggerTemplates.DealSpellEffects,
        "Shadowflame": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyMagicDamage,
        },
        "The Collector": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Zeke's Convergence": {
            Immunity: ImmunityTemplates.Unknown,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        
        "Crown of the Shattered Queen": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Eclipse": TriggerTemplates.DealAnyNonProcDamage,
        "Evenshroud": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Irrelevant,
                FullyShieldedDamage: DamageImmunityValue.Ignored,
                InvulnDamage: DamageImmunityValue.Irrelevant,
            },
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Imperial Mandate detonate": TriggerTemplates.TakeAnyDamagePreApply,
        "Liandry's Anguish": TriggerTemplates.DealSpellEffects,
        "Luden's Echo proc/refund": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.SpellOrPet,
        },
        "Night Harvester": TriggerTemplates.DealAnyDamagePreApply,
        "Prowler's Claw": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Riftmaker amp": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Rod of Ages": TriggerTemplates.CatalystPassive,
    },
    
    "systems": {
        "Hextech Dragon Soul proc": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true || data.tags.ActiveSpell == true || data.tags.Pet == true);
            }
        },
        "Infernal Dragon Soul proc": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true || data.tags.ActiveSpell == true);
            }
        },
        "Ocean Dragon Soul healing": TriggerTemplates.DealAnyNonProcDamage,
        "Mountain Dragon Soul refresh": TriggerTemplates.TakeAnyDamagePreApply,
        "Elder Dragon buff": {
            Immunity: ImmunityTemplates.NonZero,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.AlwaysLow,
            Function: FunctionTemplates.AnyDamage,
        },
        "Ward / Trap / Plant damage": TriggerTemplates.UnknownIncoming,
        "in combat (outgoing)": TriggerTemplates.DealAnyDamagePreApply,
        "in combat (incoming)": TriggerTemplates.TakeAnyDamagePreApply,
    },
    
    "onhits (runes)": {
        "Press the Attack stacks": TriggerTemplates.UnknownOutgoing,
        "Grasp of the Undying": TriggerTemplates.DealOnHitNonDamage,
        "Demolish": TriggerTemplates.DealOnHitNonDamage,
        "Font of Life": {
            Immunity: ImmunityTemplates.Unknown,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.OnHit,
            Function: FunctionTemplates.OnHit,
        },
        "Shield Bash": TriggerTemplates.DealOnHitNonDamage,
    },
    "onhits (items)": {        
        "Cull": TriggerTemplates.DealOnHitNonDamage,
        "Starting Item onhit": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Irrelevant,
            },
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            Function: FunctionTemplates.OnHit,
        },
        "Support Item execute": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Ignored,
            },
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            GeneralNotes: "the execute itself does not go through invuln, and the damage does not consume a charge on its own, it only assists in killing the minion, with any confirmed minion kills consuming a charge",
            Function: FunctionTemplates.OnHit,
        },
        
        "Plated Steelcaps": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.OnHit,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true && data.tags.ActiveSpell == false && data.tags.Pet == false);
                if(data.tags.BasicAttack == true && data.tags.ActiveSpell == true) {
                    data.specialNotes = "bugged to not be reduced";
                }
            }
        },
        
        "Sheen": TriggerTemplates.DealOnHitNonDamage,
        "Bramble Vest": TriggerTemplates.Thornmail,
        "Hearthbound Axe": TriggerTemplates.DealOnHitNonDamage,
        "Noonquiver": {
            Immunity: ImmunityTemplates.OnHitDamage,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            Function: FunctionTemplates.BasicAttackAndOnHit,
        },
        "Rageknife": TriggerTemplates.DealOnHitDamage,
        "Recurve Bow": TriggerTemplates.DealOnHitDamage,
        "Tiamat": TriggerTemplates.DealOnHitNonDamage,
        "Warden's Mail": TriggerTemplates.WardensMail,
        
        "Ardent Censer": TriggerTemplates.DealOnHitDamage,
        "Blade of the Ruined King onhit": TriggerTemplates.DealOnHitNonDamage,
        "Blade of the Ruined King cooldown": TriggerTemplates.DealOnHitNonDamage,
        "Dead Man's Plate": TriggerTemplates.DealOnHitNonDamage,
        "Essence Reaver": TriggerTemplates.DealOnHitNonDamage,
        "Frozen Heart": TriggerTemplates.WardensMail,
        "Guinsoo's Rageblade onhit": TriggerTemplates.DealOnHitDamage,
        "Hullbreaker": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true && data.tags.Proc == false);
            }
        },
        "Lich Bane": TriggerTemplates.DealOnHitNonDamage,
        "Nashor's Tooth": TriggerTemplates.DealOnHitNonDamage,
        "Randuin's Omen (Rock Solid)": TriggerTemplates.WardensMail,
        "Randuin's Omen (crit reduction)": TriggerTemplates.UnknownIncoming,
        "Thornmail": TriggerTemplates.Thornmail,
        "Titanic Hydra": TriggerTemplates.DealOnHitNonDamage,
        "Winter's Approach": TriggerTemplates.UnknownOutgoing,
        "Wit's End": TriggerTemplates.DealOnHitNonDamage,
        
        "Divine Sunderer": TriggerTemplates.DealOnHitNonDamage,
        "Duskblade of Draktharr": TriggerTemplates.DealOnHitNonDamage,
        "Heartsteel": TriggerTemplates.DealOnHitNonDamage,
        "Iceborn Gauntlet": TriggerTemplates.DealOnHitNonDamage,
        "Trinity Force stacks/proc": TriggerTemplates.DealOnHitNonDamage,
    },
    "onhits (systems)": {
        "Red Buff dot": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            Function: FunctionTemplates.OnHit,
        },
        "Herald Eye pop": {
            Immunity: {
                ZeroDamage: DamageImmunityValue.Allowed,
                FullyShieldedDamage: DamageImmunityValue.Unknown,
                InvulnDamage: DamageImmunityValue.Allowed,
            },
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.OnHit,
            Function: FunctionTemplates.OnHit,
        },
    },
    
    "attack effects (runes)": {
        "Lethal Tempo": TriggerTemplates.UnknownOutgoing,
        "Fleet Footwork": TriggerTemplates.UnknownOutgoing,
        "Hail of Blades": TriggerTemplates.UnknownOutgoing,
    },
    "attack effects (items)": {
        "Kircheis Shard": TriggerTemplates.UnknownOutgoing,
        
        "Guinsoo's Rageblade phantom hit": TriggerTemplates.UnknownOutgoing,
        "Mortal Reminder stacking": TriggerTemplates.UnknownOutgoing,
        "Navori Quickblades refund": TriggerTemplates.UnknownOutgoing,
        "Phantom Dancer": TriggerTemplates.UnknownOutgoing,
        "Rapid Firecannon": TriggerTemplates.UnknownOutgoing,
        "Runaan's Hurricane": TriggerTemplates.UnknownOutgoing,
        "Stormrazor": TriggerTemplates.UnknownOutgoing,
        
        "Kraken Slayer": TriggerTemplates.UnknownOutgoing,
    },
    
    "champions": {
        "Aatrox E vamp": {
            Immunity: ImmunityTemplates.Unknown,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Jax E aoe reduction": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownIncoming,
            Function: function(data) {
                data.canTrigger = (data.tags.AOE == true);
            }
        },
        "Lillia R sleep wakeup": TriggerTemplates.SleepWakeup,
        "MissFortune W reset": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownIncoming,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Neeko P reset": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownIncoming,
            Function: function(data) {
                data.canTrigger = (data.tags.Indirect == false);
            }
        },
        "Teemo P reset": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownIncoming,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Teemo W reset": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownIncoming,
            Function: FunctionTemplates.NonPeriodic,
        },
        "Zoe E sleep wakeup": TriggerTemplates.SleepWakeup,
    },
    
    "deprecated": {
        "Challenging Smite dot": TriggerTemplates.DealAnyNonProcDamage,
        
        "Jungle Talisman burn": {
            Immunity: ImmunityTemplates.PostApply,
            Event: DamageEvent.UnknownOutgoing,
            Function: FunctionTemplates.AnyNonProcDamage,
        },
        
        "Navori Quickblades (old)": TriggerTemplates.UnknownOutgoing,
        
        "Frostfire Gauntlet": TriggerTemplates.DealOnHitNonDamage,
        "Sunfire Aegis": TriggerTemplates.DealOnHitNonDamage,
        "Turbo Chemtank": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            LowInterest: InterestTemplates.OnHit,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true);
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
    data.canTrigger = undefined;
    data.specialNotes = undefined;
}


function CheckTriggers(damageRecord) {
    damageRecord.allowedTriggers = { };
    damageRecord.ignoredTriggers = { };
    
    var data = ExtractDamageTriggerData(damageRecord);
    
    for(var category in DamageTriggers) {
        if(category == "deprecated") {
            continue;
        }
        
        damageRecord.allowedTriggers[category] = { };
        damageRecord.ignoredTriggers[category] = { };
        
        for(var triggerName in DamageTriggers[category]) {
            var trigger = DamageTriggers[category][triggerName];
            
            // champion sources do not care about outgoing champion triggers unless the champion matches
            //      - Lillia Q can't trigger Aatrox E, but can trigger Lillia P
            // champion sources always care about any non-champion triggers
            //      - Lillia Q can trigger items
            // champion sources always care about incoming champion triggers, regardless if the champion matches
            //      - Lillia Q can trigger MF W passive reset
            //      - MF can trigger another MF's W passive reset (e.g. blind pick)
            if(category == "champions" && damageRecord.category == "champions") {
                if(trigger.Event.eventType == DamageEventType.Outgoing) {
                    var sourceChampionName = damageRecord.fullName.substring(0, damageRecord.fullName.indexOf(" "));
                    var triggerChampionName = triggerName.substring(0, triggerName.indexOf(" "));
                    
                    if(sourceChampionName != triggerChampionName) {
                        continue;
                    }
                }
            }
            
            // non-champions can't have items/runes/systems, so never show any outgoing triggers on them
            if(damageRecord.category == "non-champions") {
                if(trigger.Event.eventType == DamageEventType.Outgoing) {
                    continue;
                }
            }
            
            
            ResetDamageTriggerData(data);
            trigger.Function(data);
            if(data.canTrigger == undefined) {
                window.alert("trigger failed to assign a result:  " + triggerName);
            }
            
            var generalNotes = trigger.GeneralNotes ?? "";
            var specialNotes = data.specialNotes ?? "";
            var immunityNotes = "";
            
            if(data.canTrigger == true) {
                if(trigger.Immunity.ZeroDamage == DamageImmunityValue.Ignored) {
                    var alwaysZeroDamage = data.customTraits.AlwaysZeroDamage;
                    var sometimesZeroDamage = data.customTraits.SometimesZeroDamage;
                    
                    if(alwaysZeroDamage == true || sometimesZeroDamage != undefined) {
                        if(alwaysZeroDamage == true) {
                            data.canTrigger = false;
                        }
                        
                        immunityNotes = "will not trigger on zero damage";
                        
                        if(sometimesZeroDamage != undefined) {
                            immunityNotes += " (" + sometimesZeroDamage + ")";
                        }
                    }
                }
                
                /*if(trigger.Immunity.FullyShieldedDamage == DamageImmunityValue.Ignored && data.canTrigger == true) {
                    if(immunityNotes != "") {
                        immunityNotes += "\n";
                    }
                    
                    immunityNotes += "will not trigger on fully shielded damage";
                }
                
                if(trigger.Immunity.InvulnDamage == DamageImmunityValue.Ignored && data.canTrigger == true) {
                    if(immunityNotes != "") {
                        immunityNotes += "\n";
                    }
                    
                    immunityNotes += "will not trigger on invuln damage";
                }*/
            }
            
            
            var lowInterestFunction = trigger.LowInterest ?? InterestTemplates.AlwaysHigh;
            var isLowInterest = lowInterestFunction(data);
            
            
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
                data.canTrigger = false;
                isLowInterest = false;  // override so that we explicitly acknowledge things like ignoring Trynd ult and similar otherwise-"all damage" things
                fullNotes = "this damage does not trigger any other damage events";
            }
            
            fullNotes = fullNotes.replaceAll("\n", "\n\n");
            
            
            var string = triggerName;
            
            if(fullNotes != "") {
                string += " <div class=\"tooltip\"><b>?</b><span class=\"tooltiptext\">" + fullNotes + "</span></div>";
            }
            
            
            
            if(isLowInterest == false) {
                if(data.canTrigger == true) {
                    damageRecord.allowedTriggers[category][triggerName] = string;
                } else {
                    damageRecord.ignoredTriggers[category][triggerName] = string;
                }
            }
            
            
            // need to still add to triggers page regardless of low interest
        }
    }
    
    ApplyTriggersToCells("ALLOWED TRIGGERS", damageRecord.allowedTriggersCell, damageRecord.allowedTriggers);
    ApplyTriggersToCells("IGNORED TRIGGERS", damageRecord.ignoredTriggersCell, damageRecord.ignoredTriggers);
}

function ApplyTriggersToCells(prefix, cell, triggers, maxColumnSize) {
    var text = "<div class=\"triggersContainer\">";
    text += "<div class=\"triggersHeader\"><b><u>" + prefix + ":</u></b>\n\n\n</div>";
    
    for(var category in triggers) {
        var perCategoryCount = Object.keys(triggers[category]).length;
        if(perCategoryCount == 0) {
            continue;
        }
        
        
        var perCategoryString = "<div class=\"triggersCategory\"><b><u>" + category.toUpperCase() + ":</u></b>\n";
        
        for(var trigger in triggers[category]) {
            perCategoryString += "\n" + triggers[category][trigger];
        }
        
        perCategoryString += "</div>";
        text += perCategoryString;
    }
    
    text += "</div>";
    
    text = text.replaceAll("\n", "<br>");
    text = text.replaceAll("    ", "&nbsp;&nbsp;&nbsp;&nbsp;");
    cell.innerHTML = text;
}



function CleanTriggerFunctionString(string) {
    // warning:  when working locally, these files will use \r\n line endings, but when running from github deploy, will be converted to \n line endings
    // this step will remove this complication
    string = string.replaceAll("\r", "");
    
    // fixing indentation issues as a result of storing in an object
    // need to find the indentation on the last closing brace in order to remove the correct amount regardless of object nesting level
    var lastLine = string.substring(string.lastIndexOf("\n") + 1);
    var spaceCount = lastLine.length - 1;  // remove one for the closing brace
    var spaces = " ".repeat(spaceCount);
    string = string.replaceAll("\n" + spaces, "\n");
    
    
    for(var functionTemplateName in FunctionTemplates) {
        var functionTemplate = FunctionTemplates[functionTemplateName];
        var functionTemplateCall = "FunctionTemplates." + functionTemplateName + "(data)";
        if(string.includes(functionTemplateCall) == true) {
            var functionTemplateString = CleanTriggerFunctionString(functionTemplate.toString());
            var functionTemplateSplits = functionTemplateString.split("\n");
            
            var functionTemplateReplace = "";
            for(var i = 1; i < functionTemplateSplits.length - 1; i++) {  // removing first and last to get only the function template body
                if(functionTemplateReplace != "") {
                    functionTemplateReplace += "\n";
                }
                
                functionTemplateReplace += functionTemplateSplits[i].trimStart();
            }
            
            string = string.replaceAll(functionTemplateCall, functionTemplateReplace);
        }
    }
    
    return string;
}

function TestTriggerFunctionString(category, name) {
    var trigger = DamageTriggers[category][name];
    var rawString = trigger.Function.toString();
    var cleanedString = CleanTriggerFunctionString(rawString);
    
    console.log(cleanedString);
}

TestTriggerFunctionString("items", "Rylai's Crystal Scepter");
TestTriggerFunctionString("runes", "Arcane Comet");