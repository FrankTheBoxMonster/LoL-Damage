const DamageType = {
    Physical: "Physical",
    Magic: "Magic",
    True: "True",
    Unknown: "Unknown",
    Varies: "Varies",
}

const DamageProperty = {
    ApplyLifesteal: "ApplyLifesteal",
    EnableCallForHelp: "EnableCallForHelp",
    RespectImmunity: "RespectImmunity",
    RespectDodge: "RespectDodge",
    TriggerOnHitEvents: "TriggerOnHitEvents",
    TriggerDamageEvents: "TriggerDamageEvents",
    ApplyOmnivamp: "ApplyOmnivamp",
}

const DamageTag = {
    AOE: "AOE",
    Periodic: "Periodic",
    Indirect: "Indirect",
    BasicAttack: "BasicAttack",
    ActiveSpell: "ActiveSpell",
    Proc: "Proc",
    Pet: "Pet",
    NonRedirectable: "NonRedirectable",
    Item: "Item",
}


const Colors = {
    Green:  "rgb(183, 225, 205)",
    Red:  "rgb(234, 153, 153)",
    Blue:  "rgb(164, 194, 244)",
}

const DamageFilter = {
    Enabled: "Enabled",
    Disabled: "Disabled",
    Irrelevant: "Irrelevant",
}


const DamageCustomTraits = {
    EmpoweredAttack: "EmpoweredAttack",
    SometimesZeroDamage: "SometimesZeroDamage",
    AlwaysZeroDamage: "AlwaysZeroDamage",
    NonZeroNonLethal: "NonZeroNonLethal",
    AttackEffectsSpell: "AttackEffectsSpell",
}


const DamageImmunityFlag = {
    ZeroDamage: "ZeroDamage",
    FullyShieldedDamage: "FullyShieldedDamage",
    InvulnDamage: "InvulnDamage",
}

const DamageImmunityValue = {
    Allowed: "Allowed",
    Ignored: "Ignored",
    Irrelevant: "Irrelevant",
    Unknown: "Unknown",
}

const DamageEventType = {
    Unknown: "Unknown",
    Outgoing: "Outgoing",
    Incoming: "Incoming",
}

const DamageEvent = {
    UnknownOutgoing: {
        name: "UnknownOutgoing",
        eventType: DamageEventType.Outgoing,
    },
    UnknownIncoming: {
        name: "UnknownIncoming",
        eventType: DamageEventType.Incoming,
    },
    
    OnDealHit: {
        name: "OnDealHit",
        eventType: DamageEventType.Outgoing,
    },
    OnTakeHit: {
        name: "OnTakeHit",
        eventType: DamageEventType.Incoming,
    },
    OnDealDamagePreMitigation: {
        name: "OnDealDamagePreMitigation",
        eventType: DamageEventType.Outgoing,
    },
    OnTakeDamagePreMitigation: {
        name: "OnTakeDamagePreMitigation",
        eventType: DamageEventType.Incoming,
    },
    OnDealDamagePreDrain: {
        name: "OnDealDamagePreDrain",
        eventType: DamageEventType.Outgoing,
    },
    OnTakeDamagePreDrain: {
        name: "OnTakeDamagePreDrain",
        eventType: DamageEventType.Incoming,
    },
    
    OnDrain: {
        name: "OnDrain",  // does this one actually exist?  is Aatrox E something else?  or is it just coincidentally ordered?  (interacts with Coup vs CutDown/LastStand identically to normal drains)
        eventType: DamageEventType.Outgoing,
    },
    
    OnDealDamagePreApply: {
        name: "OnDealDamagePreApply",
        eventType: DamageEventType.Outgoing,
    },
    OnTakeDamagePreApply: {
        name: "OnTakeDamagePreApply",
        eventType: DamageEventType.Incoming,
    },
    OnDealDamagePostApply: {
        name: "OnDealDamagePostApply",
        eventType: DamageEventType.Outgoing,
    },
    OnTakeDamagePostApply: {
        name: "OnTakeDamagePostApply",
        eventType: DamageEventType.Incoming,
    },
}