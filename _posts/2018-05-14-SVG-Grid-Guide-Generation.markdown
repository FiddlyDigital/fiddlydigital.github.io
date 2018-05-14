---
layout: fd_post
title:  "SVG Grid Guide Generation"
date:   2018-05-14 00:00:00 +0000
category: article
excerptimage : img/digitaktonline.png
comments: true
---

I've always believed I was a much, MUCH stronger developer than designer. I held the belief that I hadn't an artistic bone in my body and that while I'm not old dog by any stretch of the imagination - I couldn't learn that kind of trick. 

After many years of frustration - I'd had it. Enough was enough. 'No' just wasn't an answer I wanted to accept anymore. #believe #achieve

![Digitakt Online]({{ "/img/digitaktonline.png"}})

## Getting Started

Inspired partly by Elekton's [Digitakt][digitakt] and it's Digital counterpart (pictured above), I wanted to delve into SVG application Layout. I needed to cross that bridge from good web design to a GREAT application. I didn't just want tips either - I wanted to know exactly what made or broke a good composition. So I hit the internet. And I hit it hard.

My long-winded voyage of discovery (which had many dead-ends and tangents) brought me to 2 very fantastic books that I cannot help but recommend to anyone interested in any sort of Design and Composition.

The first is a dual language (german and english) book by Joseph Muller-Brockmann called [Grid Systems][gridsystem1].

The second is by Kimberley Elam - also titled [Grid Systems][gridsystem2].

## Apps are like books, right?
Both of these books focus specifically on the layout of Typography. Honestly, it makes sense - The majority of the web is just words and shapes. Couldn't we easily apply the same principles of layout out of a Magazine to an Application? It would be better than the faux-physical-device schtick the designers have been trying to pull of. This is 2018 - flat design is in full swing in the 'material' design world. Lets just accept it and roll with it!

Any good layout needs a grid guide. I've always been a big fan of Inkscape but I felt its built-in tools for guidelines were always lacking.
 
A bit of searching online revealed that there are a great many tools for creating cool grids for Inkscape and Adobe Illustrator, but the majority didn't cater for rows as well as columns and I never really gelled with them.

SVG is just XML. The internet / DOM is (mostly) just XML. Why not just use some javascript to take some parameters and generate an xml that's a desirable grid of guides?

## Requirements
The requirements were quite simple:

Inputs:
* height and width
* horizontal and vertical margins
* horizontal and vertical gutters
* number of columns and/or rows
* flag for including center guides

Features:
* In browser grid rendering / visual aid
* presets of common sizes

Output:
* Inkscape friendly svg

## Getting my Hands Dirty
From the outset, I'd need to have 2 SVGs - one for the in-browser representation of the grid, and another that would be exported to load into inkscape. 
1-to-1 representation was going to be key here.

For the Visual Representation the structure didn't have to be complex - just a box and some colored lines. I opted to use a [VueJS Component][component], with the template being a set of Form controls and a simple SVG. The lines inside were bound to a [computed property][computedproperty] that returned the list of guides. The computed property automatically reacts to changes in the component's data property and re-evaluates. Change any of the inputs and the lines automatically re-drew themselves - nifty! A few numerical inputs later and I had a working grid on screen - gutters and all.

The exported version was a little tougher. Inkscape SVGs have a particular format - with many carryovers from it's [sodipodi][sodipodi] days. 
I didn't want to just use a string template / interpolation because string manipulation of XML is the Devil and not very flexible or maintainable. 

Instead, I opted to use the browsers built in [Document][document] object to make a new element in memory and then append all of the elements and attribute nodes required to build an Inkscape friendly file.
After a few false starts (viewbox values need to match svg document width and height, need to set document units to px, etc..) it all fell into place.

{% highlight javascript %}

function addAttrToEl(doc, el, name, value) {
    let attr = doc.createAttribute(name);
    attr.value = value;
    el.setAttributeNode(attr);
}

let doc = document.implementation.createDocument(null,null,null);
let svg = doc.createElement('svg');
addAttrToEl(doc, svg, 'width', 800);
addAttrToEl(doc, svg, 'height', 600);

{% endhighlight %}

The final piece of the puzzle was the download. Browser Security / Sandboxing is (understandably) pretty strict about letting javascript just force the download of any aul stuff. I remebered an old trick from my image manipulation days: you can set the href of an anchor tag to be a [Data Url][dataurl] and by then giving the tag a [download][download] attribute - any click would result in a download of the file. I needed to convert the XML to a DataUrl though... 

Thankfully, Browsers offer [XMLSerializer][xmlserializer], so it was actually quite easy to turn my XML doc into a string, attach a mime-type and call it a day.

{% highlight javascript %}

let svgEl = GenerateInkscapeSVG(this.height, this.width, guides);
let svgElasStr = new XMLSerializer().serializeToString(svgEl);
let fullSvgXML = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>${svgElasStr}`;
let dataUrl = `data:text/xml;charset=utf-8,${encodeURIComponent(fullSvgXML)}`;

// Next: to set the dataUrl as the HREF for our download link
{% endhighlight %}

That was it. We went from a distant dream to a functional prototype in a few scant hours.

![Svg Grid Guide Generator]({{ "/img/SvgGridGuideGenerator.png"}})

## Summary

In any normal story, that would be the end. A good tool was made, knowledge was discovered and used; gold stars and whisky all round...

However this tool looks *BASIC*. It was supposed to help me get better at design; it's ironic that it looks so terrible and unfinished.

Then it occurred to me:
> Why not use it's output as the basis of a better-looking V2?

Stay tuned!

[digitakt]: https://www.elektron.se/products/digitakt/
[gridsystem1]: https://www.amazon.com/Grid-Systems-Graphic-Design-Communication/dp/3721201450
[gridsystem2]: https://www.amazon.com/Grid-Systems-Principles-Organizing-Design/dp/1568984650
[sodipodi]: http://wiki.inkscape.org/wiki/index.php/SodiPodi
[document]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[dataurl]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
[download]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
[xmlserializer]: https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer
[component]: https://vuejs.org/v2/guide/components.html
[computedproperty]: https://vuejs.org/v2/guide/computed.html