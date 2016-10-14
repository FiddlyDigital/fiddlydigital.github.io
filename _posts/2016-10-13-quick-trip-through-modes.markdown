---
layout: fd_post
title:  "A quick trip through Modes"
date:   2016-10-13 00:00:00 +0000
category: article
excerptimage : img/visualisation2.png
comments: true
---

This is another post in my (somewhat haphazard) series on Ambient Music Generation. This time we'll look at how to implement [Musical Modes][musical-modes] in our Musical System so we can make it sound better!

After tweaking the parameters for a while, I noticed that 90% of reloads ended up in harsh noise or some form of distortion and speaker protesting.
Straining my memory back to my days as wee recorder-toting primary-schooler, I was inspired to do a quick bit of research on Scales - and as such [Musical Modes][musical-modes].

You can find the full source for my version [here][ambient-musical-system]

## Modes
Musical Modes are effectively notes organised in scales, and typically have some characteristic behaviours.
They can be used to invoke certain kinds of feelings. 
Each mode has it's own set of intervals and chords that contribute to it's unique sound.

By randomly picking a Mode and a Base-Note, I could control (to a degree) what notes to use within the layers of the Ambient Music system - thus giving the sound a more cohesive (and less terrible!) feeling.

## The practical applicaiton

The first step was to move my Note-related code to it's own module.
After re-organising the code into the new module, I took a moment to survey where we where.

We already had the list of 12 possible notes in an array. (Remember C# = Db, etc... - just in case you were wondering where the flat notes where!)
Under that I added a list o the Musical Modes that I wanted to support.
To keep things simple, I'm sticking with the 7 'Modern' Modes....

{% highlight javascript %}
var OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var MODES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
{% endhighlight %}

In our array above, a half-step is increasing the index by 1, and a whole-step is by 2.

For example:

* C -> C# is a half step
* C -> D is a whole step
* D -> E is a whole step, etc...

Having a little dig through the wikipedia page for Modes, we can see that the notes in a Mode are determined by a sequence of Full and Half Steps from the base note.
Easy! So for the Ionian Mode, the sequence (from our base note) is Full-Full-Half-Full-Full-Full-Half

For example:
* Given the base note of C - we end up with C-D-E-F-G-A-B-C.

I then used a switch statement to supply the Full/Half patterns..... 

{% highlight javascript %}
function getNotesInMode(baseNote, mode){
    var pattern = '';
    switch(mode){
        case 'Ionian':
            pattern = 'FFHFFFH';
            break;
        case 'Dorian':
            pattern = 'FHFFFHF';
            break;
        case 'Phrygian':
            pattern = 'HFFFHFF';
            break;
        case 'Lydian':
            pattern = 'FFFHFFH';
            break;
        case 'Mixolydian':
            pattern = 'FFHFFHF';
            break;
        case 'Aeolian':
            pattern = 'FHFFHFF';
            break;
        case 'Locrian':
            pattern = 'HFFHFFF';
            break;
    }

    return getNotesFromSteps(baseNote, pattern);
}
{% endhighlight %}

.....to a function that would 'gather' the notes in a given Mode.
{% highlight javascript %}
function getNotesFromSteps(baseNote, stepPattern){
    // (F)ull / (H)alf
    var notes = [baseNote];
    var placeHolder = baseNote;

    for(var i = 0; i< stepPattern.length; i++){
        switch(stepPattern.charAt(i)){
            case 'F':
                placeHolder = getNextWholeStep(placeHolder);
                break;
            case 'H':
                placeHolder = getNextHalfStep(placeHolder);
                break;
        }

        notes.push(placeHolder);
    }

    return notes;
}
{% endhighlight %}

'getNextWholeStep' and 'getNextHalfStep' are just wrappers around another function called 'travelForwardThroughNotes'.
This used used to run through our OCTAVE array and pull out notes given a certain number of half-steps from a base note.

{% highlight javascript %}
var noteIdx = OCTAVE.indexOf(note);

if (noteIdx > -1) {
    noteIdx += steps;

    if (noteIdx >= OCTAVE.length) {
        noteIdx = noteIdx - OCTAVE.length;
    }

    return OCTAVE[noteIdx];
}
{% endhighlight %}

You could probably imagine some other uses for this function!
For example:

* Getting the perfect Fifth of a note (+7 half-steps)
* Getting the perfect Fourth (+5 half-steps)
* Getting the Minor key equivalent of a Major Key (-3 half-steps)

And with those three examples - we've effectively able to traverse forwards and backwards to the [Circle of Fifths][circle-of-fifths] =)

![Circle Of Fifths](/img/circle-of-fifths.png){:class="img-responsive"}

## Summary
By limiting the note choice to only the notes that would appear within a random Musical Mode, I'm now able to impose some form of order on the Notes used in the System's layers.
The overall sound is more coherant - but still retains a large degree of randomness.

In future, I'd like to add some 'Bass' accompaniment layer to the system. 
I can imagine some kind of sustained pads sound cycling between the base-note and it's fifth would yield to a fuller sound!

You can find the full source for my version [here][ambient-musical-system]

[musical-modes]: https://en.wikipedia.org/wiki/Mode_(music)
[ambient-musical-system]: https://github.com/FiddlyDigital/ambientmusicalsystem
[circle-of-fifths]: https://en.wikipedia.org/wiki/Circle_of_fifths