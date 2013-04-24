// Image Frame Export
// The base of the plugin is Group export script by
// Damien van Holten: http://www.damienvanholten.com/blog/export-groups-to-files-photoshop/
// Modifications by Joonas Pääkkö
// https://github.com/joonaspaakko

/*

    <javascriptresource>
    <name>$$$/JavaScripts/ImageFrameExport/Menu=Image Frame Export/name>
    <category>Image Frame Export</category>
    <enableinfo>true</enableinfo>
    <eventid>94feff0a-8271-436f-8c59-d2105497d902</eventid>
    </javascriptresource>

*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

try {

    var doc = activeDocument;
    var oldPath = doc.path;

    // Prompt a dialog box asking user to insert frame name.
    myName = myInput();

    for( var groupIndex = 0 ; groupIndex < doc.layerSets.length; groupIndex++ ){

        activeDocument.activeLayer = activeDocument.layers.getByName( doc.layerSets[ groupIndex ].name );

        // Duplicate frame
        dupLayers();

        // Find @bounds layer
        var bounds = activeDocument.layerSets.getByName( doc.layerSets[ groupIndex ].name ).layers.getByName("@bounds");

        // Make bounds visible so that the trim area is determined by the bounds, assuming that nothing goes beyond the bounds.
        bounds.visible = true;

        // Woho needs that empty space anyways....?
        activeDocument.trim( TrimType.TRANSPARENT );

        // Bounds are hidden since we don't want those to be saved.
        bounds.visible = false;

        // The making of a new folder:
        var path1 = oldPath + "/" + myName + '-' +  doc.layerSets[ groupIndex ].name.substring( 0, doc.layerSets[ groupIndex ].name.indexOf('/') );
        var path2 = new Folder( path1 );
        if( !path2.exists ) { path2.create(); }

        // Get the document name...
        var docname = doc.layerSets[ groupIndex ].name.substring( doc.layerSets[ groupIndex ].name.indexOf('/'), doc.layerSets[ groupIndex ].name.indexOf('.') );

        // The full file path / extension
        var saveFile = File( path2 + docname + ".png" );

        // SAVE US ALL! ...or just this png...
        SavePNG( saveFile );

        // Close the document without asking questions...
        app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );

        // When the deed is done, say BEEP!
        if ( ( doc.layerSets.length - 1 ) == groupIndex ) {
            app.beep();
        }

    }

} // try end

catch( e ) {
    // remove comments below to see error for debugging
    alert( e );
}


function myInput() {

    // Dialog box...
    var myWindow = new Window ("dialog", "Image Framer Export");

    // Keeps things inline
    myWindow.orientation = "row";

    // Informational text
    myWindow.add ("statictext", undefined, "Frame name ( don't use spaces ):");

    // This is the box where the frame name is inserted
    var myText = myWindow.add ("edittext", undefined, "");
    myText.characters = 20;
    myText.active = true;

    // Export awaaay!
    myWindow.add ("button", undefined, "OK");
    if (myWindow.show () == 1) return myText.text;

}

function dupLayers() {

    var desc143 = new ActionDescriptor();
    var ref73 = new ActionReference();

    ref73.putClass( charIDToTypeID('Dcmn') );
    desc143.putReference( charIDToTypeID('null'), ref73 );
    desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name, activeDocument.name );

    var ref74 = new ActionReference();

    ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc143.putReference( charIDToTypeID('Usng'), ref74 );
    executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );

};
function SavePNG( saveFile ){

    var pngOpts = new ExportOptionsSaveForWeb;

    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false;
    pngOpts.transparency = true;
    pngOpts.interlaced = false;
    pngOpts.quality = 100;

    activeDocument.exportDocument( new File( saveFile ), ExportType.SAVEFORWEB,pngOpts );

}