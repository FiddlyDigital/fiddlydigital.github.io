---
layout: fd_post
title:  "Randomised Ambient Music System"
date:   2016-10-11 00:00:00 +0000
category: article
excerptimage : img/visualisation.png
comments: true
---

A couple of months ago, while searching for wedding music, I came across the music of [Philip Glass][philip-glass] - specifically, Glassworks.
I was incredibly impressed by the minimalistic sound and the harmonic progressions, but how incredibly accessible it was.

Around the same time I was experimenting with ambient soundscapes on my bass, as well as schooling myself on the WebAudio API.

After delving a little futher into HOW Mr.Glass composed, I was completely taken back.
He was developing systems for the generation of music, instead of focusing on the actual composition.
The system itself composes the music, and the Composer takes the role of 'Caretaker' or 'Gardener', instead of 'Director'.

As a software developer, this picqued my interest. 
Developing systems (in another context) is pretty much what I do. 
So, it was with great delight that I discovered the extremely enlightening post by [Tero Parviainen][Tero-Parviainen-Post] that both Described Mr.Glass's technique, and offered insight into how to develop a similiar system.
Unfortunately it was a few months before I could actually follow through his tutorial (I did mention 'wedding' in the first paragraph!).

Finally though, I managed to get around to it.


* I made the following modifications:
His example was in ES6, but I modified my version to be ES5. 
I'm still working on learning the ES6 syntax and wouldn't be confident making all of the changes I'd like to make without have a 110% grasp of the syntax and subteleties.
* I added totaly randomisation in terms of the chosen instrument, the amount of layers, and the layer length and delay.
By this simple modification, we have an almost totally random system - each refresh will bring a new Musical experience and tone!
* I added a simple Visualisation. This gives some visual context to the music being played, and also added a much need graphical element.
* I (tried!) to convert it to the [UMD Module format][UMD-Module-Format].
I'm increasingly become more involved in building and packaging of javascript applications - I needed a common way to use these modules without custom/specific solutions, or worrying!

I learned some excellent concepts from his walkthrough, some I'd like to run through with you now:

## Fetch API

First we needed a way to load samples, and this is where the [Fetch API][Fetch-API] comes into place.
I was worried I'd have to import Jquery or fight with XMLHttpRequest - but it seems a replacement for these has sprung up while I've been focused on other things!
Fetch also returns a promise instead of just calling a callback - which is much more satisfactory to use!
Here's an example of how it works:

{% highlight javascript %}
function fetchSample(samplePath) {
    return fetch(encodeURIComponent(samplePath))
        .then(function(response) {
            return response.arrayBuffer();
        })
        .then(function(arrayBuffer) {
            return audioContext.decodeAudioData(arrayBuffer)
        });
}
{% endhighlight %}

The simplicity of this technique really made me smile - the Browser environment has really come a long way!

## Convolver Node
I was familiar with how Reverb worked as an effect in the audio world, but it took a little bit of research do do it correctly in the musical system.

The [Convolver Node][convolver-node] works like any other Web Audio node - you connect it in your series of nodes - leading your chain towards the AudioContext's Destination.
However, the key differance with this specific is that you also need to provide it with a sample of impulse response - this is used to shape the convolution of the input audio and as such the 'shape' of the reverb!
Nifty stuff!

Again, the Fetch Api and Promises made this so unbelieveably easy:

{% highlight javascript %}
// see above example
fetchSample('impulse_response/AirportTerminal.wav')
    .then(function(convolverBuffer) {
        var convolver = audioContext.createConvolver();                         
        convolver.buffer = convolverBuffer;
        convolver.connect(audioContext.destination);
    });
{% endhighlight %}

## Audio Visualisation
The last change I made was adding an visualisation of the audio.
A blank web-page on it's own would be boring, so I felt it was necessary to add some sort of Waveform visualisation.

Web Audio has a built-in [Analyser Node][analyser-node] that got me halfway there, and the HTML5 Canvas element brought my the rest of the way.

By polling for the Frequency Data of the Audio that passes through this node, we can draw the waveform directly onto the canvas.
This turned out to be much simpler than I imagined it would be:

{% highlight javascript %}
var dataArray = new Uint8Array(analyser.frequencyBinCount);

function drawFrame() {
    analyser.getByteTimeDomainData(dataArray); // we now have the waveform data at this point in time

    // Visualisation styling
    canvasCtx.fillStyle = 'rgb(38, 127, 57)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = 'rgb(256,256,256)';
    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / analyser.frequencyBinCount;
    var x = 0;

    // Place points
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    // Draw the Waveform
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

    // Start the Drawing process again
    requestAnimationFrame(drawFrame)
}
{% endhighlight %}

## Summary
These three techniques really brought the whole project together, and turned what could have been a daunting experience into a simple and enjoyable one.

Going forward, I'd like to add the following:


* Control over number of layers
* Control over instrument per layer
* Eq / filtering, etc..
* More Complex Visualisations. The current on is reather simple, and I'd like to add something more graphically impressive.
* The ability to choose 'Moods' or musical 'flavors'. Currently the system is totally random, but I think the ability to have some choice in terms of Progressions types or perhaps particular scales (or scale combinations) would really bring it tot he next level in terms of creating  truly enjoyable ambient music.

You can find the source for my version [here][ambient-musical-system]

[philip-glass]: https://en.wikipedia.org/wiki/Philip_Glass
[Tero-Parviainen-Post]: http://teropa.info/blog/2016/07/28/javascript-systems-music.html
[Fetch-API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[UMD-Module-Format]: https://github.com/umdjs/umdjs
[convolver-node]: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createConvolver
[analyser-node]: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
[ambient-musical-system]: https://github.com/FiddlyDigital/ambientmusicalsystem