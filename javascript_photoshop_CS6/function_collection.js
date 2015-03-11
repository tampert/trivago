/**
 * Created by Dirk Soentjens on 11/03/15.
 */
function changeTextByLayerWithPrompt(layerName){
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