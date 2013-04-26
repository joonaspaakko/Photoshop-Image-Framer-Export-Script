## Image Framer Export Script

![Image Framer Export Script](IFET.png)

The script along with the .psd template will make it easy to make frames for: [Image Framer jQuery Plugin](https://github.com/joonaspaakko/Image-Framer-jquery-plugin)

You only need to make top and bottom texture for the frame and the template & sript will help you to export all 4 frame sizes to separate folders in a **snap!**

Depending on how long it takes for you to create the frame texture, it takes approximately 4 minutes to download the script package and create a frame with the script & template.


**It should be noted that the .psd template also works with [slicy](http://macrabbit.com/slicy/).**

## How to use the script

1. Put `Image Framer Export.jsx` into: `{Photoshop_root}\Presets\Scripts\Image Framer Export.jsx`
  * If photoshop is already running, restart it.
  * **Alternatively** you could skip this part entirely and at list item #5, just use `File > Scripts > Browse...` and find the script where ever you put it.
2. Open `Image Framer Export Template.psd` in photoshop.
3. Double click `Edit frame image` smart object to edit the contents.
4. Create your frame texture and save the .psb file.
5. Get back to `Image Framer Export Template.psd` and run the script `File > Scripts > Image Framer Export.jsx`.
6. You will be asked to insert your desired frame name ( You can use the frame with the plugin like this: frameType: "yourFrame" ).
7. The script will `beep` when the exporting is complete.
8. You'll find the files/folders next to the `Image Framer Export Template.psd`. You will need to put them in `{your_website_root}/imageframer/frames/`

**The script was tested in Photoshop cs 3 and cs 6 in Mac.**
