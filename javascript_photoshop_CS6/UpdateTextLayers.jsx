﻿/** * Created by Dirk Soentjens on 11/03/15. * This script will update all the text fields with content given in the XML field that is needed * Because the Photoshop script engine can't handle recursion very well the script is very slow * if there are a lot of layerSets */var allTextLayers = [];var theLayers = collectAllLayers(app.activeDocument);// first iterate thru the whole file and grap all the layersfunction collectAllLayers (theParent){    var len = theParent.layers.length,          layerSets = [theParent];              while (layerSets.length > 0) {        $.writeln("Number of layer sets: " + layerSets.length);        var currentSet = layerSets.shift();        var subSets = collectLayersIn(currentSet);        layerSets = layerSets.concat(subSets);    }}function collectLayersIn(parent) {    var result = [];    for (var m = parent.layers.length - 1; m >= 0; m--)    {        var theLayer = parent.layers[m];        if (theLayer.kind == LayerKind.TEXT)            allTextLayers.push(theLayer);        $.writeln("Layer type name: " + theLayer.typename);        $.writeln();        if (theLayer.typename === "LayerSet")        {            // new group            result.push(theLayer);        }    }    return result;}function updateText(nameTextField, newText){    var layerLength = allTextLayers.length;    for(var i=0;i<layerLength;i++) {        for (var a = 0; a < layerLength; a++) {            if ((allTextLayers[i].name.toString() == nameTextField+ a.toString())) {                allTextLayers[i].textItem.contents = newText;            }        }    }}function main() {    //Check if a document is open    if (!documents.length) return;        $.writeln ("hallo I am here");    var originalUnit = preferences.rulerUnits;    preferences.rulerUnits = Units.PIXELS;    try {        var f = new File('~/Desktop/creative_text.xml');        f.open('r');        var xml = new XML( f.read() );        f.close();        var title = xml.child(0);        var subtitle = xml.child(1);        updateText("title_" ,title);        updateText("subtitle_" ,subtitle)    }    catch (e) {    }    preferences.rulerUnits = originalUnit;}main();