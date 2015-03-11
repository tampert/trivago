/**
 * Created by Dirk Soentjens on 10/03/15.
 *
 * Redefine the content of the text fields in Photoshop CS6
 *
 */

function main() {
    //Check if a document is open
    if (!documents.length) return;

    // Remember current unit settings and then set units to // the value expected by this script
    var originalUnit = preferences.rulerUnits;
    preferences.rulerUnits = Units.PIXELS;

    try {
        //https://forums.adobe.com/message/2455288
        // link to desktop work
        // ~/Desktop/testing/creative_text.xml
        // It would be nice to have the XML file in the same directory as the script
        //~/Applications/Adobe%20Photoshop%20CS6/Presets/Scripts/trivago/
        var f = new File('~/Desktop/creative_text.xml');
        f.open('r');
        var xml = new XML( f.read() );
        alert(xml);
        f.close();
        // title node
        var title = xml.child(0);
        // subtitle node
        var subtitle = xml.child(1);
        //if(title == "")
          //  title = "no results";
        renameTitles(title);
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