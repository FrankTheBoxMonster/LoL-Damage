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
            if(damageRecord.category == "nonchampions") {
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