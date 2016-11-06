---
layout: fd_post
title:  "Having a gander at scope"
date:   2016-10-23 00:00:00 +0000
category: article
excerptimage : img/modules.jpg
comments: true
---

This is another post in my (somewhat haphazard) series on Ambient Music Generation. 
This time we'll look at starting to organise our code better...

## Intro

A part of the large restructuring I went through was to properly modularise my code, to better facilitate dependency managment.

Another thing I wanted to do was to move my module declarations out of the global scope - and I've got a simple trick for that here!
Lets take these 2 steps to success!

## Module Defintions

This part was easy. I wanted to move the app to use angular, and this was (partly) because it uses an extremely simple syntax to define modules and their contents.

We can first define our module, by giving it a name and telling angular it's dependencies.
In this example, we're not going to define a dependency, so we'll just leave the array blank....

{% highlight javascript %}
var app = angular.module('exampleModule', []);
{% endhighlight %}

After that, we can now put things in our module.
Lets add a Utilities [Factory][angular-factory] to our module:

{% highlight javascript %}
angular.module('exampleModule').factory('Utilities', Utilities);
{% endhighlight %}

We can then define our Utilities factory afterwards (using the [Revealing Module Pattern][revealing-module])

{% highlight javascript %}
function MusicUtilities() {
    function flatToSharp(note) {
        switch (note) {
            case 'Bb':
                return 'A#';
            case 'Db':
                return 'C#';
            case 'Eb':
                return 'D#';
            case 'Gb':
                return 'F#';
            case 'Ab':
                return 'G#';
            default:
                return note;
        }
    }
    
    return {
        flatToSharp: flatToSharp,
    };
};
{% endhighlight %}

Now anywhere we use our exampleModule, we'll be able to access our Utilities factory. Nice!

Depending on your chosen library, it's worth exploring your options in regards to Modules.
There's other generic varients like AMD, CommonJS, UMD, etc...
Take the time to do your due diligence and research what suits your situation best!

## Things get a bit IIFEy
Next, I wanted to get my modules out of the global scope. 
I've been burned before by other developers not doing this correctly, and nothing leaves a sour taste in your mouth like namespace collisions at 3am!

As such, I opted to use [Immediately Invoked Function Expressions (IIFE)][iife] declarations around all of my modules.
Again, this wasn't too difficult to implement at all!

The IIFE Syntax usually looks like this:

{% highlight javascript %}
(function () {

    // Your code
    
})();
{% endhighlight %}

If we wanted to wrap our exampleModule, we could do so like this:
{% highlight javascript %}
(function () {

    var app = angular.module('exampleModule', []);
    angular.module('exampleModule').factory('Utilities', Utilities);
    
    function MusicUtilities() {
        function flatToSharp(note) {
            switch (note) {
                case 'Bb':
                    return 'A#';
                case 'Db':
                    return 'C#';
                case 'Eb':
                    return 'D#';
                case 'Gb':
                    return 'F#';
                case 'Ab':
                    return 'G#';
                default:
                    return note;
            }
        }
        
        return {
            flatToSharp: flatToSharp,
        };
    };
    
})();
{% endhighlight %}

That wasn't too hard at all!

## Summary

I applied thse two simple steps to my entire application, making sure to populate the dependencies array correctly for each Module.

Although it doesn't seem like much, these allowed me to use [gulp][gulp] later to make a build of my application - building a correct dependency tree internally and making sure each module has what it needs when it's time to run!

You can see how I acheive that [here][ambient-musical-system] on the project's github!

[ambient-musical-system]: https://github.com/FiddlyDigital/ambientmusicalsystem
[angular-factory]: https://docs.angularjs.org/guide/providers
[revealing-module]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
[iife]: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
[gulp]: http://gulpjs.com/