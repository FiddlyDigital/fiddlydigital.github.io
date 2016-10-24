---
layout: fd_post
title:  "Javascript - Joining the Big Leagues!"
date:   2016-10-23 00:00:00 +0000
category: article
excerptimage : img/sneakpeek.png
comments: true
---

This is another post in my (somewhat haphazard) series on Ambient Music Generation. 
This time we'll look at starting to organise our code better and figuring out our next steps.

## Intro

After some testing and tweaking, I realised I was happy with my Proof of concept and felt confident stepping it up.
I have a list of features that I wanted to implment that is a long as my arm, and I was pretty excited to get cracking!

The intention is to develop an application in an environment where we can expand on it and deploy it confidently.
In order to reach that level, there's a few things I wanted to do:

* Use a linting tool to enforce code quality 
* Seperate the application styling out and using a CSS preprocessor
* Convert the existing code to be used with an Application Framework so there was a clear and stable infrastucture for expansion
* Dependency Managment and Injection
* Be able to bundle all files together into a build
* Be able to easily perform other tasks, like real-time sync and refresh with Browser and IDE in my development environment.

This allows us to develop at a more serious level, as well as produce builds for production environments.
In short - taking the app from a loose proof-of-concept to real Web-Application.

We're aiming for the Big leagues!

## Decision Time

To acheive my above goals, I need to make some decisions.
These would drastically affect all future development of the application, and I weighed up my options as follows:

### Application Framework

Does it matter which framework? 
Yes, and No!
Your choice of framework should factor in the type of application that are building, as well as your own strengths.

The important part is picking something that adds structure to your application and allows you to extend in a clean and logical way.
If you're happy working in a given framework - just stick with it!

I'm quite strong in Angular 1+ (I use it in my day job) and Angular is a Data-Driven Framework - perfect for the features I wanted to implement later on.
It didn't make sense for me to transition to Angular2 as I'm not as familiar with the conventions, and the other frameworks that I'm comfortable using didn't seem to fit with the type of application that we are writing here.

### Style System

Coin Toss - [Less][less] or [Sass][sass]?

I wanted to keep my styling System as [DRY - (Don't Repeat Yourself)][dry] as possible, and LESS allowed me to do this with very little effort.
SASS is more powerful, but I felt like I'd be needlessly using it when LESS would suffice.

Remember: KISS - Keep it Simple, Stupid!

### Templating System

Plain Old HTML! While I'm a fan of [Pug/Jade][pugjs] (and to a lesser extent, [HAML][haml]), I didn't plan on having a lot of nested templates.
I feel like maybe I'm letting some people down here, but I really didn't see a need to shoe-horn something in where I didn't think it would fit.

I'm open to changing this in the future - it wouldn't be that difficult to transition to a templating system if there was a need too!

### Task Runner

#### Why Use one?
Task Runners super-charge your javascript development ;)

They allow you to run scripts in defined sequences. 
Rather than use cobbled-together systems of Bash/Batch scripts, TaskRunners give you a (javascript!) way to run scripts that pre-process your code and can do anything from running test suites to packaging your code for deployment.

#### Options
There's 3 Main options out there for JS task runners:


* [Grunt][grunt]
* [Gulp][gulp]
* NPM [(No really!)][npm-task]


I've heard of other Developers using ANT, and all sorts too - to me that seems overkill but again it's whatever works for you.
Gulp made most sense for what I wanted and seems to be a common standard, so documentation was plentiful.

Gulp also gave me the most value for money (timewise!), and really ticked most of my functionality boxes:


* Linting (Via ESLint)
* Minified, Obfuscated builds (via Uglify)
* Dependency Management When Building (via Bower)
* Template Caching (via angularTemplatecache)
* Browser/Source Synchronisation (via BrowserSync)

All of that power from a single free tool - not bad at all!

## Summary

Well, that was a bit of a ramble, wasn't it?

The point was to show that to build quality applications, you need to research and think carefully before making decisions.

I also wanted to share a bit about my own insight into the process of taking an app from POC to Product.

### So What's Next?

In future posts, I plan on expanding upon:

* Using Gulp to create a powerful Build-System
* Converting our code from Plain Old Javascript to Angular
* touching upon how we'll proceed with the next version of our application!


Exciting times are ahead!


As always, You can find the source for the application [here][ambient-musical-system].


[ambient-musical-system]: https://github.com/FiddlyDigital/ambientmusicalsystem
[pugjs]: https://pugjs.org
[haml]: http://haml.info/
[less]: http://lesscss.org/
[sass]: http://sass-lang.com/
[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[npm-task]: http://blog.teamtreehouse.com/use-npm-task-runner