var urlMarker = "/LoL-Damage";
var baseUrl = document.URL.substring(0, document.URL.indexOf(urlMarker) + urlMarker.length);

var issuesDisclaimer = CreateAndAppendElement("p");
issuesDisclaimer.innerHTML = "<b>THIS SYSTEM IS A WORK IN PROGRESS.</b>  It does <b>NOT</b> claim to be perfect, <b>BUT</b> it should be pretty close.<br>This is all the result of human research.  We're usually pretty good, but with a couple hundred thousand unique interactions possible, there's always room for errors.  You should always test to confirm things before risking your ranked games.<br>If something seems missing, nonsensical, or wrong <b><i><u>AND YOU CAN PROVE IT</u></i></b> then please submit an issue <b><a href=https://github.com/FrankTheBoxMonster/LoL-Damage/issues/new>HERE</a></b> with details.";

var sourcesTriggersLinks = CreateAndAppendElement("p");
sourcesTriggersLinks.innerHTML = "<b><a href=" + baseUrl + "/sources.html>click here to view by sources</a>, or <a href=" + baseUrl + "/triggers.html>click here to view by triggers</a></b>";



function BuildHomePage() {
    BuildSourcesPage();
}

function CreateAndAppendElement(type, parent) {
    if(parent == null) {
        parent = document.body;
    }
    
    var element = document.createElement(type);
    parent.appendChild(element);
    
    return element;
}

function CreateAndAppendTextNode(text, parent) {
    if(parent == null) {
        parent = document.body;
    }
    
    var element = document.createTextNode(text);
    parent.appendChild(element);
    
    return element;
}




var filterSettings = null;
var filterNameInput = null;
var totalCountLabel = null;
var filterDelegates = null;

function BuildFilters(filterData) {
    var filterHeaderDiv = CreateAndAppendElement("div");
    filterHeaderDiv.style.marginTop = "-10px";
    filterHeaderDiv.style.marginBottom = "-10px";
    
    var clearFiltersButton = CreateAndAppendElement("button", filterHeaderDiv);
    clearFiltersButton.innerHTML = "clear filters";
    clearFiltersButton.onclick = ClearFilters;
    
    var filterNameLabel = CreateAndAppendElement("p", filterHeaderDiv);
    filterNameLabel.innerHTML = "name:";
    filterNameLabel.style.display = "inline-block";
    filterNameLabel.style.marginLeft = "42px";
    filterNameLabel.style.marginRight = "5px";
    
    filterNameInput = CreateAndAppendElement("input", filterHeaderDiv);
    filterNameInput.type = "text";
    filterNameInput.style.width = "280px";
    filterNameInput.addEventListener("input", (event) => {
        UpdateFilters();
    });
    
    
    totalCountLabel = CreateAndAppendElement("p", filterHeaderDiv);
    totalCountLabel.style.display = "inline-block";
    totalCountLabel.style.marginLeft = "10px";
    totalCountLabel.style.marginRight = "10px";
    
    var copyLinkButton = CreateAndAppendElement("button", filterHeaderDiv);
    copyLinkButton.innerHTML = "copy filter URL";
    copyLinkButton.onclick = CopyURL;
    
    
    
    
    filterSettings = { };
    filterDelegates = { };
    
    var filterTable = CreateAndAppendElement("table");
    var filterTableHeader = filterTable.createTHead().insertRow(0);
    var filterTableRow = filterTable.insertRow();
    for(var filter of filterData.filters) {
        CreateAndAppendTextNode(filter.displayName ?? filter.name, filterTableHeader.insertCell());
        var filterCell = filterTableRow.insertCell();
        
        filterDelegates[filter.name] = filter.filterDelegate;
        
        var filterGroup = { };
        filterSettings[filter.name] = filterGroup;
        
        for(var option in filter.options) {
            var optionName = filter.options[option];
            if(filter.nameDelegate != null) {
                optionName = filter.nameDelegate(option);
            }
            
            filterGroup[optionName] = CreateFilterCheckbox(optionName, filterCell);
        }
    }
}

function CreateFilterCheckbox(name, parentCell) {
    var checkbox = CreateAndAppendElement("input", parentCell);
    checkbox.type = "checkbox";
    checkbox.style.marginLeft = "0px";
    
    CreateAndAppendTextNode(name, parentCell);
    CreateAndAppendElement("br", parentCell);
    
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


function CreateFoldout(record, parent) {
    var foldout = CreateAndAppendElement("input", parent);
    foldout.type = "checkbox";
    foldout.className = "foldout";
    foldout.style.marginLeft = "0px";
    foldout.checked = false;
    foldout.indeterminate = true;
    foldout.damageRecord = record;
    
    return foldout;
}




var damageTable = null;

function BuildTable(tableData) {
    damageTable = CreateAndAppendElement("table");
    
    var damageTableHeader = damageTable.createTHead().insertRow(0);
    for(var headerConfig of tableData.headers) {
        var headerCell = damageTableHeader.insertCell();
        headerCell.innerHTML = headerConfig.name;
        headerCell.style.width = headerConfig.width;
    }
}


function BuildPropertiesTagsCell(row, keys, match) {
    var cell = row.insertCell();
    
    var string = "";
    for(var key in keys) {
        var value = keys[key];
        if(value == match || match == null) {
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


function BuildTriggersToggle(record, allowedColSpan, ignoredColSpan, delegate) {
    record.triggersRow = damageTable.insertRow();
    record.triggersRow.style.display = "none";
    
    record.allowedTriggersCell = record.triggersRow.insertCell();
    record.allowedTriggersCell.colSpan = allowedColSpan;
    record.allowedTriggersCell.style.verticalAlign = "top";
    
    record.ignoredTriggersCell = record.triggersRow.insertCell();
    record.ignoredTriggersCell.colSpan = ignoredColSpan;
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
            delegate(record);
        }
    });
}




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
    
    for(var group in filterSettings) {
        for(var name in filterSettings[group]) {
            var checkbox = filterSettings[group][name];
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
    var dummy = CreateAndAppendElement("input");
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
            for(var group in filterSettings) {
                for(var name in filterSettings[group]) {
                    if(name == paramName) {
                        var checkbox = filterSettings[group][name];
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




function ClearFilters() {
    filterNameInput.value = "";
    
    for(var group in filterSettings) {
        for(var name in filterSettings[group]) {
            var filter = filterSettings[group][name];
            filter.indeterminate = true;
            filter.clickCount = 0;
        }
    }
    
    UpdateFilters();
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
        var totalFilter = nameFilter;
        for(var filterName in filterDelegates) {
            var filter = UpdateFilterGroup(record, filterSettings[filterName], filterDelegates[filterName]);
            totalFilter &= filter;
        }
        
        
        if(totalFilter == true) {
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

function UpdateFilterGroup(record, filters, checkFilterCallback) {
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
                    show = checkFilterCallback(record, name, show, true);
                } else {
                    show = checkFilterCallback(record, name, show, false);
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


function Clone(object) {
    var result = { };
    for(var key of Object.keys(object)) {
        result[key] = object[key];
    }
    
    return result;
}