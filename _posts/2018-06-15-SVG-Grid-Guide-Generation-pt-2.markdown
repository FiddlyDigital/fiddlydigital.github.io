---
layout: fd_post
title:  "SVG Grid Guide Generation - Iteration 2"
date:   2018-07-29 00:00:00 +0000
category: article
excerptimage : img/round-grid.jpg
comments: true
---

When we last left off - it was gold stars and whiskey all round. We had our first Iteration of a Grid Generation Tool for SVG Guidelines - making future designs a cinch! 
However, our tool looked like rubbish - which is ironic for an application that was built to help me be a better designer. The code was a little sketchy in places too, and that just would not stand. It was time to roll up our sleeves and start refining our previous work!

Roll on Iteration 2!

![Svg Grid Guide Generator]({{ "/img/round-grid.jpg"}})

## Compatability

User testing began and it took all of 2 minutes to realise this solution wouldn't work with Adobe Illustrator. That inkscape-specific-XML just wasn't going to work here at all. Sodipodi roots be damned - there was just no point making a tool an SVG related tool that wouldn't work with illustrator too.  

Much to my dismay, testing with just the guidelines really wasn't working out too well either. 
For small sets it was fine, but ask for too many columns or rows and it just looked like a big criss-crossy mess.

Reportedly, the worse part was that it was all or nothing; There was no way to turn on/off certain sections of the grid. 
Without some context, it was easy to get confused by which line meant what. The lines labels didn't help either - they ended making things more complicated, rather than less.

I needed a new take on this approach.

Digging through both tools, it quickly struck me that both Inkscape and Illustrator have have the ability to modify and hide/show layers. Wouldn't it be better to move out guidelines to layers and call it a day? That would fullfill our new user requirements based on their feedback of the first alpha build.

## New Requirements

Iteration 2 wasn't going to be a drastic improvement on Iteration 1. 
Let's define the improvements we're going to make:

Inputs:
* Toggle for optional rendering of GuideLines, CenterLines, Margins
    * Maybe a user doesn't want everything at once? Lets give them the choice... 

Features:
* Some way to give context between guidelines.

Outputs:
* Svg Compatible with both Illustrator and Inkscape
    * Individual grid items on differant layers so they can be individually shown/hidden
    * All grid layers in a single layer-group so all can be shown/hidden at once. 

And with that it was quite simple - time to get to work!

## Layers of Love
SVG doesn't specifically support the notion of layers or even Z-Index - but it does have groups, which is close enough!

Groups are rendered in order of appearance in an SVG - so the first in the tree will always be the 'bottom-most' while the last will always be the 'top-most'.
Groups can even contain other groups, so we could divide our grid elements up by type and the End-user could then turn on/off individual elements as they saw fit. Too easy!

Example Output:
{% highlight xml %}
<svg>
    <g id="Grid">
        <g id="Rectangles"></g>
        <g id="GuideLines"></g>
        <g id="CenterLines"></g>
    </g>
</svg>
{% endhighlight %}

This worked great in Illustrator, but just didn't register with Inkscape. Initial googling didn't turn up anything concrete, so I resorted to some good 'ol detective work.
I created some sample svgs in Inkscape with a variety of layers, and when inspecting the source I was able to suss out 2 very important attributes:

* inkscape:label="Layer Name"
* inkscape:groupmode="layer"

This was the only metadata needed by Inkscape to pick up on my layers like Illustrator does.
A quick splash of javascript later and all my groups had 2 new attributes to wow their buddies with:

Example Output:
{% highlight xml %}
<svg>
    <g id="Grid" inkscape:label="Grid" inkscape:groupmode="layer">
        <g id="Rectangles" inkscape:label="Rectangles" inkscape:groupmode="layer"></g>
        <g id="GuideLines" inkscape:label="GuideLines" inkscape:groupmode="layer"></g>
        <g id="CenterLines" inkscape:label="CenterLines" inkscape:groupmode="layer"></g>
    </g>
</svg>
{% endhighlight %}

Things were now taking shape!

## Lines of Love
As previously mentioned, Lines alone just were not enough. Too many and it got messy. Not enough and the grids became effectively useless. 
No amount of line color-coding was going to solve it.

After some research and prototyping, I settled on the idea of using rectangles of the same dimensions of the guidlines and with semi-transparent backgrounds. 
Users could then customise the opacity and color/pattern of these rectangles.

Upon rendering they would overlap, creating a cool 'stacked' transparency effect that gives great context to the space between each set of lines.

{% highlight xml %}
<rect x="0" y="0" width="45" height="540" style="fill:#FF0000;fill-opacity:0.10;"/>
{% endhighlight %}

I opted not to add a stroke to the Rect, as that would already be covered by our existing criss-crossing guidelines.

## 2 -> 1

With Inkscape out of the way, I then didn't have to worry about having 2 seperate XMLs - one standard and the other with the required Inkscape metadata.

This greatly simplified my approach, as I could now generate 1 SVG that could both be rendered in the browser with ease, and also be used by Inkscape and Adobe Illustrator without issue. This was a really great win for reducing the (admittently little) technical debt we were starting to acrue.

## Speaking of Technical Debt...

Remember: At every step in your development interations, always schedule some time for clean-up and refactoring. 
Just like camp-grounds, you always should leave your code-base a little cleaner than when you found it.

Even if it's just a case of doing a once-over with a code-formatter/linter or taking some time to rename variables - every little counts!
The rush to deploy is always strong, but don't try to put the cart before the horse. Every little step you take to keep your house in other facilitates further iterations and later deploys.

Do your due diligence!

## Summary

And there it was: Iteration 2.
* Code Refactored -> Technical Debt reduced
* Simplified Rendering -> now only 1 method instead of 2.
* Smaller output -> much fewer sodipodi/inkscape related metadata/artifacts
* Generated SVGs now compatible with the 2 most used Vector Graphic tools.

Functionality wise, this was shaping up! 
Here's a wee screenshot to whet your appetite!

![Svg Grid Guide Generator]({{ "/img/SvgGridGuideGenerator2.png"}})

Visually, it still looks like an 'Intro to HTML' project from mid 2000's.

I'm currently working with my test users and jotting down notes for iteration 3. Stay tuned for more!

[digitakt]: https://www.elektron.se/products/digitakt/