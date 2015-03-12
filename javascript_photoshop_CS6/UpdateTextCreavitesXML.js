/**
 * Created by Dirk Soentjens on 11/03/15.
 * This script will update all the text fields with content given in the XML field that is needed
 */

var allTextLayers = [];
var theLayers = collectAllLayers(app.activeDocument, 0);

// first iterate thru the whole file and grap all the layers
function collectAllLayers (theParent, level)
{
    for (var m = theParent.layers.length - 1; m >= 0; m--)
    {
        var theLayer = theParent.layers[m];

        if(theLayer.kind == LayerKind.TEXT)
            allTextLayers.push(theLayer);

        if (theLayer.typename != "ArtLayer")
        {
            // new group
            collectAllLayers(theLayer, level + 1)
        }
    }
}

function updateText(newText){
    var layerLength = allTextLayers.length;
    for(var i=0;i<layerLength;i++) {
        for (var a = 0; a < layerLength; a++) {
            if ((allTextLayers[i].name.toString() == "title_" + a.toString())) {
                allTextLayers[i].textItem.contents = newText;
            }
        }
    }
}

function updateSubTitles(newText){
    var layerLength = allTextLayers.length;
    for(var i=0;i<layerLength;i++) {
        for (var a = 0; a < layerLength; a++) {
            if ((allTextLayers[i].name.toString() == "subtitle_" + a.toString())) {
                allTextLayers[i].textItem.contents = newText;
            }
        }
    }
}

function main() {
    //Check if a document is open
    if (!documents.length) return;

    var originalUnit = preferences.rulerUnits;
    preferences.rulerUnits = Units.PIXELS;

    try {
        var f = new File('~/Desktop/creative_text.xml');
        f.open('r');
        var xml = new XML( f.read() );
        f.close();
        var title = xml.child(0);
        var subtitle = xml.child(1);
        updateText(title);
        updateSubTitles(subtitle)
    }
    catch (e) {

    }
    preferences.rulerUnits = originalUnit;
}

main();