var damageTable = null;


function BuildSourcesPage() {
    var categories = Object.keys(DamageSources);
    
    var filterData = {
        filters: [
            {
                name: "categories",
                options: categories,
                filterDelegate: (record, name, show, filter) => {
                    if(show == null) {
                        if(GetFilter(filterSettings.categories[record.category]) == DamageFilter.Enabled) {
                            show = true;
                        } else if(GetFilter(filterSettings.categories[record.category]) == DamageFilter.Disabled) {
                            show = false;
                        } else {
                            // if we have an enable, then default to hide, else default to show (mixing is indeterminate)
                            
                            for(var category in filterSettings.categories) {
                                var categoryFilter = GetFilter(filterSettings.categories[category]);
                                if(categoryFilter == DamageFilter.Enabled) {
                                    show = false;
                                    break;
                                } else if(categoryFilter == DamageFilter.Disabled) {
                                    show = true;
                                    break;
                                }
                            }
                        }
                    }
                    
                    return show;
                }
            },
            {
                name: "properties",
                options: DamageProperty,
                filterDelegate: (record, name, show, filter) => {
                    return (show ?? true) && (record.damageInfo.properties[name] == filter);
                }
            },
            {
                name: "tags",
                options: DamageTag,
                filterDelegate: (record, name, show, filter) => {
                    return (show ?? true) && (record.damageInfo.tags[name] == filter);
                }
            },
            {
                name: "traits",
                displayName: "custom traits",
                options: DamageCustomTraits,
                filterDelegate: (record, name, show, filter) => {
                    var trait = record.customTraits[name];
                    var pass = false;
                    if(filter == true) {
                        pass = (trait !== false && trait != undefined);
                    } else {
                        pass = (trait === false);
                    }
                    
                    return (show ?? true) && pass;
                }
            },
        ],
    };
    
    BuildFilters(filterData);
    
    
    
    
    var tableData = {
        headers: [
            { name: "name", width: "200px" },
            { name: "damage<br>type", width: "80px" },
            { name: "properties<br>enabled", width: "225px" },
            { name: "properties<br>disabled", width: "225px" },
            { name: "tags<br>enabled", width: "180px" },
            { name: "tags<br>disabled", width: "180px" },
            { name: "notes", width: "300px" },
            { name: "custom traits", width: "300px" },
        ],
    };
    
    BuildTable(tableData);
    
    
    
    
    for(var categoryName in DamageSourcesByCategory) {
        var category = DamageSourcesByCategory[categoryName];
        for(var sourceName in category) {
            BuildDamageRecord(category[sourceName]);
        }
    }
    
    
    ReadURL();
}




function BuildDamageRecord(record) {
    var row = damageTable.insertRow();
    row.damageRecord = record;
    
    
    var nameCell = row.insertCell();
    record.showTriggersCheckbox = CreateFoldout(record, nameCell);
    CreateAndAppendTextNode(record.fullName, nameCell);
    
    
    var damageTypeCell = row.insertCell();
    damageTypeCell.innerHTML = record.damageType;
    if(record.damageType == DamageType.Varies) {
        damageTypeCell.style.backgroundColor = Colors.Blue;
    }
    if(record.damageType == DamageType.Unknown) {
        damageTypeCell.style.backgroundColor = Colors.Red;
    }
    
    
    var properties = record.damageInfo.properties;
    var tags = record.damageInfo.tags;
    
    var propertiesEnabledCell = BuildPropertiesTagsCell(row, properties, true);
    var propertiesDisabledCell = BuildPropertiesTagsCell(row, properties, false);
    var tagsEnabledCell = BuildPropertiesTagsCell(row, tags, true);
    var tagsDisabledCell = BuildPropertiesTagsCell(row, tags, false);
    
    if(propertiesEnabledCell.innerHTML == "None") {
        propertiesEnabledCell.style.backgroundColor = Colors.Red;
    }
    
    if(tagsEnabledCell.innerHTML == "None") {
        tagsEnabledCell.style.backgroundColor = Colors.Red;
    }
    
    // if has Indirect, Pet, or NonRedirectable, or has BasicAttack paired with anything else
    if((tags.Indirect == true || tags.Pet == true || tags.NonRedirectable == true) || (tags.BasicAttack == true && tagsEnabledCell.innerHTML != "BasicAttack = true")) {
        tagsEnabledCell.style.backgroundColor = Colors.Green;
    }
    
    // if has BasicAttack disabled paired with ApplyLifesteal, EnableCallForHelp, RespectDodge, or TriggerOnHitEvents
    if(tags.BasicAttack == false && (properties.ApplyLifesteal == true || properties.EnableCallForHelp == true || properties.RespectDodge == true || properties.TriggerOnHitEvents == true)) {
        propertiesEnabledCell.style.backgroundColor = Colors.Green;
    }
    
    // if has ApplyOmnivamp, RespectImmunity, or TriggerDamageEvents disabled, or has BasicAttack paired with a disabled ApplyLifesteal, EnableCallForHelp, RespectDodge, or TriggerOnHitEvents
    if((properties.RespectImmunity == false || properties.TriggerDamageEvents == false || properties.ApplyOmnivamp == false) || (tags.BasicAttack == true && (properties.ApplyLifesteal == false || properties.EnableCallForHelp == false || properties.RespectDodge == false || properties.TriggerOnHitEvents == false))) {
        propertiesDisabledCell.style.backgroundColor = Colors.Red;
    }
    
    
    
    var notesCell = row.insertCell();
    notesCell.innerHTML = record.notes;
    
    
    var traitsText = "";
    for(var trait in record.customTraits) {
        var value = record.customTraits[trait];
        if(traitsText != "") {
            traitsText += "<br>";
        }
        
        traitsText += trait + " = ";
        if(value !== true && value !== false) {
            value = "\"" + value + "\"";
        }
        
        traitsText += value;
    }
    
    
    var traitsCell = row.insertCell();
    traitsCell.innerHTML = traitsText;
    if(traitsText != "") {
        traitsCell.style.backgroundColor = Colors.Blue;
    }
    
    
    
    BuildTriggersToggle(record, 4, 4, CheckTriggersForSource);
}



var DamageSourcesByCategory = { };
var DamageSourcesByName = { };

function PreProcessDamageSources() {
    delete DamageSources["deprecated"];
    
    for(var categoryName in DamageSources) {
        DamageSourcesByCategory[categoryName] = [ ];
        
        var category = DamageSources[categoryName];
        if(categoryName == "systems" || categoryName == "nonchampions") {
            PreProcessDamageRecordSet(categoryName, category, "");
        } else {
            for(var sourceName in category) {
                var source = category[sourceName];
                if(categoryName == "champions") {
                    for(var spellName in source) {
                        var spell = source[spellName];
                        PreProcessDamageRecordSet(categoryName, spell, sourceName + " " + spellName + " ");
                    }
                } else {
                    PreProcessDamageRecordSet(categoryName, source, sourceName + " ");
                }
            }
        }
    }
}

function PreProcessDamageRecordSet(category, records, namePrefix) {
    for(var recordName in records) {
        var record = Clone(records[recordName]);  // solve issues with using templates
        records[recordName] = record;
        
        
        DamageSourcesByCategory[category].push(record);
        
        record.category = category;
        record.fullName = namePrefix + recordName;
        DamageSourcesByName[record.fullName] = record;
        
        record.notes = record.notes ?? "";
        record.notes = record.notes.replaceAll("\n", "<br>");
        
        record.customTraits = record.customTraits ?? {};
    }
}



PreProcessDamageSources();