/**
 * Created by Dirk Soentjens on 10/03/15.
 *
 * Redefine the strings in textfields
 *
 */

function main() {
    //Check if a document is open
    if (!documents.length) return;

    // Remember current unit settings and then set units to // the value expected by this script
    var originalUnit = preferences.rulerUnits;
    preferences.rulerUnits = Units.PIXELS;

    try {
        renameTitles("koe of kip");

    }
    catch (e) {

    }
    // Everything went Ok. Restore ruler units
    preferences.rulerUnits = originalUnit;
}


main();


function changeTextByLayerAndPrompt(layerName){
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    if(layer.kind == LayerKind.TEXT){
        layer.textItem.contents = prompt("change text into", layer.textItem.contents);
    }
}

//http://stackoverflow.com/questions/1287868/using-javascript-scripting-in-adobe-photoshop-how-to-change-the-contents-of-the
function changeTextByLayerName(layerName,newText){
    var layer = doc.layers.getByName(layerName);
    if(layer.kind == LayerKind.TEXT) layer.textItem.contents = newText;
}

function renameTitles(newTitle){
    var doc = app.activeDocument;
    var layerLength = doc.artLayers.length;
    for(var i=0;i<layerLength;i++){
        var layer = doc.artLayers[i];
        for(var a = 0; a < layerLength;a++){
            // all layers names that with the name title_0 till ..title_x will get the newTitle string
            if((layer.name.toString() ==  "title_" + a.toString()) && (layer.kind == LayerKind.TEXT)){
                layer.textItem.contents = newTitle;
            }
        }
    }
}