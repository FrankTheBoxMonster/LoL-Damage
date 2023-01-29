function BuildTriggersPage() {
    var categories = Object.keys(DamageTriggers);
    
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
                name: "events",
                options: DamageEvent,
                nameDelegate: (option) => {
                    return option;
                },
                filterDelegate: (record, name, show, filter) => {
                    if(show == null) {
                        if(GetFilter(filterSettings.events[record.Event]) == DamageFilter.Enabled) {
                            show = true;
                        } else if(GetFilter(filterSettings.events[record.Event]) == DamageFilter.Disabled) {
                            show = false;
                        } else {
                            // if we have an enable, then default to hide, else default to show (mixing is indeterminate)
                            
                            for(var event in filterSettings.events) {
                                var categoryFilter = GetFilter(filterSettings.events[event]);
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
                name: "immunity",
                options: DamageImmunityFlag,
                filterDelegate: (record, name, show, filter) => {
                    var pass = false;
                    var immunity = record.Immunity[name];
                    if(immunity == DamageImmunityValue.Allowed) {
                        pass = (filter == true);
                    } else if(immunity == DamageImmunityValue.Unknown) {
                        pass = false;
                    } else {  // ignore or irrelevant
                        pass = (filter == false);
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
            { name: "event", width: "200px" },
            { name: "immunity", width: "250px" },
            { name: "general notes", width: "300px" },
            { name: "function", width: "776px" },
        ],
    };
    
    BuildTable(tableData);
    
    
    
    
    for(var categoryName in DamageTriggers) {
        var category = DamageTriggers[categoryName];
        for(var triggerName in category) {
            var trigger = category[triggerName];
            BuildTriggerRow(categoryName, trigger, triggerName);
        }
    }
    
    
    ReadURL();
}


function BuildTriggerRow(category, trigger, name) {
    var row = damageTable.insertRow();
    row.damageRecord = trigger;
    
    
    var nameCell = row.insertCell();
    trigger.showTriggersCheckbox = CreateFoldout(trigger, nameCell);
    CreateAndAppendTextNode(trigger.fullName, nameCell);
    
    
    var eventCell = row.insertCell();
    eventCell.innerHTML = trigger.Event.name;
    
    
    var immunityCell = BuildPropertiesTagsCell(row, trigger.Immunity);
    
    
    var notesCell = row.insertCell();
    notesCell.innerHTML = trigger.GeneralNotes;
    
    
    var functionCell = row.insertCell();
    functionCell.innerHTML = CleanTriggerFunctionString(trigger.Function.toString(), true);
    functionCell.style.backgroundColor = SyntaxHighlighting.Background;
    
    
    BuildTriggersToggle(trigger, 4, 1, CheckSourcesForTrigger);
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


function CheckTriggersForSource(damageRecord) {
    damageRecord.allowedTriggers = { };
    damageRecord.ignoredTriggers = { };
    
    var data = ExtractDamageTriggerData(damageRecord);
    
    for(var category in DamageTriggers) {
        damageRecord.allowedTriggers[category] = { };
        damageRecord.ignoredTriggers[category] = { };
        
        for(var triggerName in DamageTriggers[category]) {
            var trigger = DamageTriggers[category][triggerName];
            
            ProcessSourceTriggerCheck(damageRecord, damageRecord, trigger, data, trigger);
        }
    }
    
    ApplyTriggersToCells(damageRecord);
}

function ProcessSourceTriggerCheck(resultObject, damageRecord, trigger, data, referenceObject) {
    // champion sources do not care about outgoing champion triggers unless the champion matches
    //      - Lillia Q can't trigger Aatrox E, but can trigger Lillia P
    // champion sources always care about any non-champion triggers
    //      - Lillia Q can trigger items
    // champion sources always care about incoming champion triggers, regardless if the champion matches
    //      - Lillia Q can trigger MF W passive reset
    //      - MF can trigger another MF's W passive reset (e.g. blind pick)
    if(trigger.category == "champions" && damageRecord.category == "champions") {
        if(trigger.Event.eventType == DamageEventType.Outgoing) {
            var sourceChampionName = damageRecord.fullName.substring(0, damageRecord.fullName.indexOf(" "));
            var triggerChampionName = trigger.fullName.substring(0, trigger.fullName.indexOf(" "));
            
            if(sourceChampionName != triggerChampionName) {
                return;  // skip
            }
        }
    }
    
    // non-champions can't have items/runes/systems, so never show any outgoing triggers on them
    if(damageRecord.category == "nonchampions") {
        if(trigger.Event.eventType == DamageEventType.Outgoing) {
            return;  // skip
        }
    }
    
    
    ResetDamageTriggerData(data);
    trigger.Function(data);
    if(data.canTrigger == undefined) {
        window.alert("trigger failed to assign a result:  " + trigger.fullName);
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
    
    
    var string = referenceObject.fullName;
    
    if(fullNotes != "") {
        string += " <div class=\"tooltip\"><b>?</b><span class=\"tooltiptext\">" + fullNotes + "</span></div>";
    }
    
    
    
    if(isLowInterest == false) {
        if(data.canTrigger == true) {
            if(resultObject == null || resultObject.allowedTriggers == null || referenceObject == null || referenceObject.category == null || referenceObject.fullName == null || resultObject.allowedTriggers[referenceObject.category] == null) {
                var x = 0;
            }
            resultObject.allowedTriggers[referenceObject.category][referenceObject.fullName] = string;
        } else {
            resultObject.ignoredTriggers[referenceObject.category][referenceObject.fullName] = string;
        }
    }
    
    
    // need to still add to triggers page regardless of low interest
}

function ApplyTriggersToCells(damageRecord) {
    ApplyTriggersToCellsSet("ALLOWED TRIGGERS", damageRecord.allowedTriggersCell, damageRecord.allowedTriggers);
    ApplyTriggersToCellsSet("IGNORED TRIGGERS", damageRecord.ignoredTriggersCell, damageRecord.ignoredTriggers);
}

function ApplyTriggersToCellsSet(prefix, cell, triggers, maxColumnSize) {
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


function CheckSourcesForTrigger(trigger) {
    trigger.allowedTriggers = { };
    trigger.ignoredTriggers = { };
    
    for(var category in DamageSourcesByCategory) {
        trigger.allowedTriggers[category] = { };
        trigger.ignoredTriggers[category] = { };
        
        for(var sourceName in DamageSourcesByCategory[category]) {
            var damageRecord = DamageSourcesByCategory[category][sourceName];
            var data = ExtractDamageTriggerData(damageRecord);
            
            ProcessSourceTriggerCheck(trigger, damageRecord, trigger, data, damageRecord);
        }
    }
    
    ApplyTriggersToCells(trigger);
}



function CleanTriggerFunctionString(string, useHtml) {
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
    
    if(useHtml == true) {
        var spanPrefix = "<span style=\"color: ";
        var spanInfix = ";\">";
        var spanSuffix = "</span>";
        
        var keywords = [ "function", "true", "false", "if", "else", "var" ];
        var operatorRegex = /[\=\+\!\&\|\.\;\,\(\)\{\}]/g;  // need to do it this way so that we don't end up replacing the spans themselves
        var operatorReplacement = spanPrefix + SyntaxHighlighting.Operator + spanInfix + "$&" + spanSuffix;  // this special token will insert the matched string
        
        
        
        var splits = string.split("\"");
        string = "";
        var isInString = false;
        for(var split of splits) {
            if(isInString == true) {
                split = spanPrefix + SyntaxHighlighting.String + spanInfix + "\"" + split + "\"" + spanSuffix;
            } else {
                split = split.replaceAll(operatorRegex, operatorReplacement);
                
                for(var keyword of keywords) {
                    var style = spanPrefix + SyntaxHighlighting.Keyword + spanInfix;
                    var replace = style + keyword + spanSuffix;
                    split = split.replaceAll(keyword, replace);
                }
            }
            
            
            string += split;
            isInString = !isInString;
        }
        
        
        // need to do this after or the style quotes will get caught as splits
        string = spanPrefix + SyntaxHighlighting.Foreground + "; background-color: " + SyntaxHighlighting.Background + spanInfix + string + spanSuffix;
        
        
        string = string.replaceAll("\n", "<br>");
        string = string.replaceAll(" ".repeat(4), "&nbsp;".repeat(4));
        string = "<code>" + string + "</code>";
    }
    
    return string;
}


function PreProcessDamageTriggers() {
    delete DamageTriggers["deprecated"];
    
    for(var categoryName in DamageTriggers) {
        var category = DamageTriggers[categoryName];
        for(var triggerName in category) {
            var trigger = Clone(category[triggerName]);  // solve issues with using templates
            category[triggerName] = trigger;
            
            trigger.category = categoryName;
            trigger.fullName = triggerName;
            
            trigger.GeneralNotes = trigger.GeneralNotes ?? "";
        }
    }
}



PreProcessDamageTriggers();