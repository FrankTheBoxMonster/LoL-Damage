var issuesDisclaimer = document.createElement("p");
document.body.appendChild(issuesDisclaimer);
issuesDisclaimer.innerHTML = "<b>THIS SYSTEM IS A WORK IN PROGRESS.</b>  It does <b>NOT</b> claim to be perfect, <b>BUT</b> it should be pretty close.<br>This is all the result of human research.  We're usually pretty good, but there's always room for errors.  You should always test to confirm things before risking your ranked games.<br>If something seems missing, nonsensical, or wrong <b><i><u>AND YOU CAN PROVE IT</u></i></b> then please submit an issue <b><a href=https://github.com/FrankTheBoxMonster/LoL-Damage/issues/new>HERE</a></b> with details.";


var filterHeaderDiv = document.createElement("div");
document.body.appendChild(filterHeaderDiv);
filterHeaderDiv.style.marginTop = "-10px";
filterHeaderDiv.style.marginBottom = "-10px";

var clearFiltersButton = document.createElement("button");
filterHeaderDiv.appendChild(clearFiltersButton);
clearFiltersButton.innerHTML = "clear filters";
clearFiltersButton.onclick = ClearFilters;

var filterNameLabel = document.createElement("p");
filterHeaderDiv.appendChild(filterNameLabel);
filterNameLabel.innerHTML = "name:";
filterNameLabel.style.display = "inline-block";
filterNameLabel.style.marginLeft = "42px";
filterNameLabel.style.marginRight = "5px";

var filterNameInput = document.createElement("input");
filterHeaderDiv.appendChild(filterNameInput);
filterNameInput.type = "text";
filterNameInput.style.width = "280px";
filterNameInput.addEventListener("input", (event) => {
    UpdateFilters();
});


var totalCountLabel = document.createElement("p");
filterHeaderDiv.appendChild(totalCountLabel);
totalCountLabel.style.display = "inline-block";
totalCountLabel.style.marginLeft = "10px";
totalCountLabel.style.marginRight = "10px";

var copyLinkButton = document.createElement("button");
filterHeaderDiv.appendChild(copyLinkButton);
copyLinkButton.innerHTML = "copy filter URL";
copyLinkButton.onclick = CopyURL;



var filterTable = document.createElement("table");
document.body.appendChild(filterTable);

var damageTable = document.createElement("table");
document.body.appendChild(damageTable);




var filterTableHeader = filterTable.createTHead().insertRow(0);
filterTableHeader.insertCell().appendChild(document.createTextNode("categories"));
filterTableHeader.insertCell().appendChild(document.createTextNode("properties"));
filterTableHeader.insertCell().appendChild(document.createTextNode("tags"));
filterTableHeader.insertCell().appendChild(document.createTextNode("custom traits"));

var filterTableRow = filterTable.insertRow();
var categoriesFilterCell = filterTableRow.insertCell();
var propertiesFilterCell = filterTableRow.insertCell();
var tagsFilterCell = filterTableRow.insertCell();
var traitsFilterCell = filterTableRow.insertCell();

var damageFilterSettings = {
    categories: { },
    properties: { },
    tags: { },
    traits: { },
}

for(var property in DamageProperty) {
    damageFilterSettings.properties[property] = CreateFilterCheckbox(property, propertiesFilterCell);
}

for(var tag in DamageTag) {
    damageFilterSettings.tags[tag] = CreateFilterCheckbox(tag, tagsFilterCell);
}

for(var trait in DamageCustomTraits) {
    damageFilterSettings.traits[trait] = CreateFilterCheckbox(trait, traitsFilterCell);
}


var tableHeaderConfig = [
    { name: "name", width: "200px" },
    { name: "damage<br>type", width: "80px" },
    { name: "properties<br>enabled", width: "225px" },
    { name: "properties<br>disabled", width: "225px" },
    { name: "tags<br>enabled", width: "180px" },
    { name: "tags<br>disabled", width: "180px" },
    { name: "notes", width: "300px" },
    { name: "custom traits", width: "300px" },
];

var damageTableHeader = damageTable.createTHead().insertRow(0);
for(var headerConfig of tableHeaderConfig) {
    var headerCell = damageTableHeader.insertCell();
    headerCell.innerHTML = headerConfig.name;
    headerCell.style.width = headerConfig.width;
}


var DamageSourcesLookup = { };

for(var categoryName in DamageSources) {
    //damageFilterSettings.categories[categoryName] = CreateFilterCheckbox(categoryName, categoriesFilterCell);
    
    if(categoryName == "deprecated") {
        /*damageFilterSettings.categories[categoryName].indeterminate = false;
        damageFilterSettings.categories[categoryName].checked = false;*/
        continue;
    }
    
    damageFilterSettings.categories[categoryName] = CreateFilterCheckbox(categoryName, categoriesFilterCell);
    
    
    var category = DamageSources[categoryName];
    if(categoryName == "systems" || categoryName == "nonchampions") {
        BuildDamageRecordSet(categoryName, category, "");
    } else {
        for(var sourceName in category) {
            var source = category[sourceName];
            if(categoryName == "champions") {
                for(var spellName in source) {
                    var spell = source[spellName];
                    BuildDamageRecordSet(categoryName, spell, sourceName + " " + spellName + " ");
                }
            } else {
                BuildDamageRecordSet(categoryName, source, sourceName + " / ");
            }
        }
    }
}


function BuildDamageRecordSet(category, records, namePrefix) {
    for(var recordName in records) {
        var record = records[recordName]
        var row = damageTable.insertRow();
        row.damageRecord = record;
        
        record.category = category;
        record.fullName = namePrefix + recordName;
        DamageSourcesLookup[record.fullName] = record;
        
        
        var nameCell = row.insertCell();
        record.showTriggersCheckbox = document.createElement("input");
        record.showTriggersCheckbox.type = "checkbox";
        record.showTriggersCheckbox.style.marginLeft = "0px";
        record.showTriggersCheckbox.checked = false;
        record.showTriggersCheckbox.indeterminate = true;
        record.showTriggersCheckbox.damageRecord = record;
        nameCell.appendChild(record.showTriggersCheckbox);
        
        var nameText = document.createTextNode(record.fullName);
        nameCell.appendChild(nameText);
        
        
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
        record.notes = record.notes ?? "";
        notesCell.innerHTML = record.notes;
        
        
        record.customTraits = record.customTraits ?? {};
        
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
        
        
        
        record.triggersRow = damageTable.insertRow();
        record.triggersRow.style.display = "none";
        
        record.allowedTriggersCell = record.triggersRow.insertCell();
        record.allowedTriggersCell.colSpan = 4;
        record.allowedTriggersCell.style.verticalAlign = "top";
        
        record.ignoredTriggersCell = record.triggersRow.insertCell();
        record.ignoredTriggersCell.colSpan = 4;
        record.ignoredTriggersCell.style.verticalAlign = "top";
        
        record.showTriggersCheckbox.clickCount = 0;
        record.showTriggersCheckbox.addEventListener("change", (event) => {
            var record = event.currentTarget.damageRecord;
            record.showTriggersCheckbox.clickCount++;
            if(record.showTriggersCheckbox.clickCount % 2 == 1) {
                record.showTriggersCheckbox.checked = true;
                record.showTriggersCheckbox.indeterminate = false;
                record.triggersRow.style.display = "";
            } else {
                record.showTriggersCheckbox.indeterminate = true;
                record.triggersRow.style.display = "none";
            }
            
            if(record.allowedTriggers == undefined) {
                CheckTriggers(record);
            }
        });
    }
}


function BuildPropertiesTagsCell(row, keys, match) {
    var cell = row.insertCell();
    
    var string = "";
    for(var key in keys) {
        var value = keys[key];
        if(value == match) {
            if(string != "") {
                string += "<br>";
            }
            
            string += key + " = " + value;
        }
    }
    
    if(string == "") {
        string = "None";
    }
    
    cell.innerHTML = string;
    
    return cell;
}



function UpdateFilters() {
    var filterPassCount = 0;
    var filterNameLower = filterNameInput.value.toLowerCase();
    
    for(var row of damageTable.rows) {
        var record = row.damageRecord;
        if(row.damageRecord == null) {
            continue;
        }
        
        
        var nameFilter = (record.fullName.toLowerCase().includes(filterNameLower) == true);
        
        var categoryFilter = UpdateFilterGroup(damageFilterSettings.categories,
            (name, show, filter) => {
                if(show == null) {
                    if(GetFilter(damageFilterSettings.categories[record.category]) == DamageFilter.Enabled) {
                        show = true;
                    } else if(GetFilter(damageFilterSettings.categories[record.category]) == DamageFilter.Disabled) {
                        show = false;
                    } else {
                        // if we have an enable, then default to hide, else default to show (mixing is indeterminate)
                        
                        for(var category in damageFilterSettings.categories) {
                            var categoryFilter = GetFilter(damageFilterSettings.categories[category]);
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
        );
        
        var propertyFilter = UpdateFilterGroup(damageFilterSettings.properties,
            (name, show, filter) => {
                return (show ?? true) && (record.damageInfo.properties[name] == filter);
            }
        );
        
        var tagFilter = UpdateFilterGroup(damageFilterSettings.tags,
            (name, show, filter) => {
                return (show ?? true) && (record.damageInfo.tags[name] == filter);
            }
        );
        
        var traitFilter = UpdateFilterGroup(damageFilterSettings.traits,
            (name, show, filter) => {
                var trait = record.customTraits[name];
                var pass = false;
                if(filter == true) {
                    pass = (trait !== false && trait != undefined);
                } else {
                    pass = (trait === false);
                }
                
                return (show ?? true) && pass;
            }
        );
        
        
        var show = (nameFilter == true && categoryFilter == true && propertyFilter == true && tagFilter == true && traitFilter == true);
        if(show == true) {
            row.style.display = "";
            filterPassCount++;
            
            if(record.showTriggersCheckbox.checked == true) {
                record.triggersRow.style.display = "";
            } else {
                record.triggersRow.style.display = "none";
            }
        } else {
            row.style.display = "none";
            record.triggersRow.style.display = "none";
        }
    }
    
    totalCountLabel.innerHTML = "record count:  " + filterPassCount;
}

function UpdateFilterGroup(filters, checkFilterCallback) {
    var hasFilter = false;
    for(var filter in filters) {
        if(GetFilter(filters[filter]) != DamageFilter.Irrelevant) {
            hasFilter = true;
            break;
        }
    }
    
    
    var show = null;
    if(hasFilter == true) {
        for(var name in filters) {
            var filter = GetFilter(filters[name]);
            if(filter != DamageFilter.Irrelevant) {
                if(filter == DamageFilter.Enabled) {
                    show = checkFilterCallback(name, show, true);
                } else {
                    show = checkFilterCallback(name, show, false);
                }
            }
        }
    }
    
    
    if(show == null) {
        show = true;
    } else if(show.categories != null) {
        show = show.categories.enabled ?? true;
    }
    
    return show;
}

function CreateFilterCheckbox(name, parentCell) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginLeft = "0px";
    parentCell.appendChild(checkbox);
    
    var text = document.createTextNode(name);
    parentCell.appendChild(text);
    
    parentCell.appendChild(document.createElement("br"));
    
    checkbox.indeterminate = true;
    checkbox.clickCount = 0;
    checkbox.addEventListener("change", (event) => {
        checkbox.clickCount++;
        if(checkbox.clickCount % 3 == 1) {
            checkbox.checked = true;
            checkbox.indeterminate = false;
        } else if(checkbox.clickCount % 3 == 2) {
            checkbox.checked = false;
            checkbox.indeterminate = false;
        } else {
            checkbox.indeterminate = true;
        }
        UpdateFilters();
    });
    
    return checkbox;
}

function GetFilter(checkbox) {
    var result = DamageFilter.Irrelevant;
    
    if(checkbox.indeterminate == false) {
        if(checkbox.checked == true) {
            result = DamageFilter.Enabled;
        } else {
            result = DamageFilter.Disabled;
        }
    }
    
    return result;
}

function ClearFilters() {
    filterNameInput.value = "";
    
    for(var group in damageFilterSettings) {
        for(var name in damageFilterSettings[group]) {
            var filter = damageFilterSettings[group][name];
            filter.indeterminate = true;
            filter.clickCount = 0;
        }
    }
    
    /*damageFilterSettings.categories["deprecated"].indeterminate = false;
    damageFilterSettings.categories["deprecated"].checked = false;*/
    
    UpdateFilters();
}

UpdateFilters();


function CopyURL() {
    var url = document.URL;
    var trim = document.URL.indexOf("?");
    if(trim >= 0) {
        url = url.substring(0, trim);
    }
    
    var params = "";
    if(filterNameInput.value != "") {
        params += "?name=" + filterNameInput.value;
    }
    
    for(var group in damageFilterSettings) {
        for(var name in damageFilterSettings[group]) {
            var checkbox = damageFilterSettings[group][name];
            var filter = GetFilter(checkbox);
            if(filter != DamageFilter.Irrelevant) {
                if(params != "") {
                    params += "&";
                } else {
                    params += "?";
                }
                
                params += name + "=" + checkbox.checked;
            }
        }
    }
    
    url += encodeURI(params);
    
    // there's no direct clipboard API so we have to do this instead
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function ReadURL() {
    ClearFilters();
    
    var url = document.URL;
    var trim = url.indexOf("?");
    if(trim < 0) {
        return;
    }
    
    var paramsString = url.substring(trim + 1);
    paramsString = decodeURI(paramsString);
    var params = paramsString.split("&");
    
    for(var param of params) {
        var split = param.split("=");
        var paramName = split[0];
        var paramValue = split[1];
        
        if(paramName == "name") {
            filterNameInput.value = paramValue;
        } else {
            for(var group in damageFilterSettings) {
                for(var name in damageFilterSettings[group]) {
                    if(name == paramName) {
                        var checkbox = damageFilterSettings[group][name];
                        checkbox.checked = (paramValue == "true");
                        checkbox.indeterminate = false;
                        
                        if(checkbox.checked == true) {
                            checkbox.clickCount = 1;
                        } else {
                            checkbox.clickCount = 2;
                        }
                    }
                }
            }
        }
    }
    
    UpdateFilters();
}

ReadURL();




var testDamagePaths = [
    "Ashe Q secondary bolt",
    "Anivia W damage",
    "Kayle E active magic",
];

testDamagePaths = Object.keys(DamageSourcesLookup);

function CheckAllTriggers() {
    for(var path of testDamagePaths) {
        var damageRecord = DamageSourcesLookup[path];
        CheckTriggers(damageRecord);
    }
}

//CheckAllTriggers();