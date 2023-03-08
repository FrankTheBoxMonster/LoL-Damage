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
    },
    OnHitOrProc: function(data) {  // because Tabis are often questioned for reduing procs too
        return (InterestTemplates.OnHit(data) && data.tags.Proc == false);
    },
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
        LowInterest: InterestTemplates.OnHitOrProc,
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
        GeneralNotes: "does not wake on any damage from minions, but can be woken by monsters or the enemy team (if sleeping a monster), with the wakeup damage always being attributed to the person who applied the sleep\n\nadditionally does not wake if the post-mitigation pre-shielding damage dealt is <= 10 (at all levels, ranks, and AP values, might be unintended that it doesn't ever scale)",
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
        "Scorch": TriggerTemplates.DealSpellEffects,
        "Second Wind": TriggerTemplates.TakeAnyDamagePostApply,
        "Bone Plating": TriggerTemplates.UnknownIncoming,
        "First Strike": TriggerTemplates.DealAnyDamagePreApply,
    },
    
    "items": {
        "Doran's Ring regen": TriggerTemplates.DealAnyDamagePreApply,
        "Doran's Shield regen": TriggerTemplates.TakeAnyDamagePostApply,
        "Jungle pet attacks": TriggerTemplates.UnknownOutgoing,
        "Scorchclaw passive": {
            Immunity: ImmunityTemplates.PreApply,
            Event: DamageEvent.UnknownOutgoing,
            GeneralNotes: "prior to 13.3, was purely non-proc, meaning almost all pets couldn't trigger it due to also being proc",
            Function: FunctionTemplates.PetOrNonProc,
        },
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
            GeneralNotes: "only PQWER slots work, no summoners / items / runes\n\nunclear if pet amps are intentional or not, as all pets in practice also have the intended tags\n\nempowered attacks only work if they would apply spell effects",
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
            LowInterest: InterestTemplates.OnHitOrProc,
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true);
                if(data.canTrigger == true) {
                    if(data.tags.Proc == true) {
                        data.specialNotes = "prior to 13.5, would not have been reduced, but this might have been intentional";
                    } else if(data.tags.ActiveSpell == true) {
                        data.specialNotes = "prior to 13.5, was bugged to not be reduced, even though these effects were reduced prior to gaining spell effects";
                    }
                }
            }
        },
        "Plated Steelcaps (13.5 bugfix)": {
            Immunity: ImmunityTemplates.DamageMultiplier,
            Event: DamageEvent.UnknownIncoming,
            LowInterest: InterestTemplates.OnHitOrProc,
            GeneralNotes: "for this trigger, \"allowed\" means anything that was previously not being reduced, but will now be reduced with the 13.5 patch, anything else either was already reduced properly or is not supposed to be reduced in the first place in accordance with the real \"Plated Steelcaps\" trigger",
            Function: function(data) {
                data.canTrigger = (data.tags.BasicAttack == true && (data.tags.ActiveSpell == true || data.tags.Proc == true));
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
            LowInterest: InterestTemplates.OnHitOrProc,
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