---
layout: fd_post
title:  "My Tech Tree"
date:   2017-05-28 00:00:00 +0000
category: article
excerptimage : img/cssblur.jpeg
comments: true
---

For a developer there are always new tools and techniques you need to familiarise yourself with. Here's a system to stay up to date and not get overwhelmed by the technological tide!

### The "well-read" Programmer's Dilemma

Being a Developer is a continuous learning experience.
Unlike other jobs, you need to constantly try and stay ahead of the new technology trends, all while honing your existing skills.

New libraries, tools, frameworks, solutions and versions pop up every hour of every day. 
You need to filter the noise, and it's exhausting.
Evaluating everything new is a tough chore, and it's a hard choice to decide to skip things in case you end up being left behind!

A great example of this is the current fragmented state of the Javascript Community.
Picking a framework could mean new opening doors or shutting existing ones firmly. 
Evaluating each in-depth involves a ton of research, tutorials, discussion and codecasts in order to make sure you're making the right decision. 
You need to invest a lot of time to get up to speed!

Vocal proponents can make any choice seem like the right one early on, but it's only after some actual hands-on real-world experience that you see if the choices you've made are right for the work you are doing.

It's tough to make those kinds of career-defining decisions!

### The right tools for the Job

Before making those decisions, it's definitely worth taking the time to map out a Mental Model that describes the development world through YOUR eyes.
This model should consist of:

- The Types of problems you regularly solve
- Your Tech tree - a definitive list of the technologies and their features that you use

These 2 lists combined should be used as an aggressive guide to what skills and tools you should and shouldn't learn.

It might seem silly to take the time to write these down, but it definitely helps to keep you focused on your key areas and not get swept away with the next wave of trends!

#### What kind of Problem Solver are you?

It's easy to determine what kind of problems you solve. 
Take a moment to reflect on your last few projects and pay special attention to your requirement specs. 
What are the common parts of each project? 

- What's your Application's Target Audience?
- What are the Target Platforms?
- What are the Security Requirements?
- How does the Application interact with it's Environment? - e.g. File Manipulation, Hardware interaction - Sensors, Microphone, etc. 
- Does it access a Database? How often? Should it hit a caching layer first?
- Do you call any 3rd party APIs? Via which format(s) and Protocols? Is it rate limited? Do you always need to call them or can you cache?
- Is your UI Responsive or do you have differant views for differant device types? Is it Themable? Is it graphical or basic?
- Does it incorporate a search? How does that work - contains, phonetic, fuzzy, etc...?
- Do you need to push data to your client? Does that need to be real-time?

Asking yourself these kinds of questions will help you get to the bottom of just what you need from your Tech Tree.

#### What should your Tech Tree look like?

Your tech tree should be a declaration of the things you want to focus on. It should be as concise as you can make it without over-generalising. 

Take CSS as an example. 
You might be familiar with it and have a good grasp of the basics. But what parts of it do you regularly need to know? 
Typography? Animation? Positioning and layout? How important is Transforms and Rotation for you? What about esoteric cross-browser compatability hacks?

CSS is an extroardinarily deep topic, but you'll find the you don't need to know everything to get by.
Its definitely worth taking a good look at the things you DON'T use as well as the ones you do - to get a concise model.

### My Mental Model

I've taken the time to revise my mental model, and wanted to share it here. 
Hopefully it gives you a good insight into the type of work I do, and the tools I use in my everday life.

#### The Problems that I Solve:

- Creating rich, highly interactive applications for Web and Mobile
- Visualising complicated Datasets and allowing for their Interaction
- Consuming Larege DataSets from Restful APIs
- Making data available in a logical and secure fashion via Restful APIs
- Multi-Threaded / Parallel processing of data

#### My Tech Tree:

- Application Layers
    - Structure Layer - *HTML*
        - [Standard Elements][HTMLElements]
        - [Meta Tags][MetaTags]
        - Script/Style/Image asset loading and loading control

    - Styling Layer - *CSS*
        - Features
            - [Box Model][CSSBoxModel]
            - [Positioning][CSSPositioning]
            - [Typography][CSSTypography]
        - Libraries
            - [Bootstrap][Bootstrap]
            - [Material Design / MDLite][MDLite]

    - Behaviour Layer - *Javascript*
        - Language
            - ES5
            - ES6
        - Frameworks
            - [Angular JS][Angular1]
            - [VueJS2][VueJS]
        - Libraries
            - [Jquery][Jquery]
            - [ChartJS][ChartJS]
            - [D3][D3]
            - [DataTables][DataTables]
        - Build Systems
            - [GulpJs][GulpJs]
            - [Webpack][WebPack]
        - Package Managers
            - [NPM][NPM] - for Build System Dependencies
            - [Yarn][Yarn] or [Bower][Bower] for Front-End Dependencies 

    - Business Logic Layer - *C#*
        - Language
            - C# 6.0
        - Features / Libraries
            - [.Net 4.6+][net46]
            - [ASP.NET MVC][ASPNETMVC]
            - [ASP.NET WebAPI][ASPNETWebAPI]
            - [OData][OData]
            - [Entity Framework][EntityFramework]
            - [Breeze .Net][breezenet]
            - [MSMQ][MSMQ]
            - [SQLServer Management Objects][SMO]
            - [SQLServer Data Tools][SSDT]

    - Data Persistence Layer - *SQLServer*
        - Features
           - Stored Procedures
           - Functions
           - Triggers
           - SQL Jobs

- Development Environment
    - Dev Tools
        - Client Side Development
            - [VSCode][VSCode]
                - I like this much more than Atom/Brackets/Sublime
            - [Notepad++][Notepad++]
                - Great for opening huge files and data-wrangling with it's macros
        - ServerSide Development
            - [Visual Studio 2012/2015/2017][VisualStudio]
                - Créme de la Créme of IDEs!
        - Database
            - [SQL Management Studio][SMS]
                - The one and only!
            - [DbDoc][DBDoc]
                - Absolutely essential if you do *anything* with SQLServer!
    - Web Servers
        - [IIS][IIS]
    - Mobile Deployment Tools
        - [Cordova][Cordova]
            - Wraps my JS Front-Ends in Android/IOS Wrappers for Deployment to mobile Devices
    - Command Line
        - Windows Batch Files
    - Source Control
        - [GIT][GIT]
        - [SVN / Subversion][SVN]

#### Explanation

This isn't an exhaustive list - I certainly do much more than this! e.g. Salesforce/Apec Development, Web Sockets, WebAPI, use other JS Libs, etc..
However it does represent what I use the majority of the time.

While the tech I use may not be exactly cutting edge - they're all mature solutions and have been battle-tested over many years. 
I can put my confidence in these technologies and I have more than enough familiarity in them to know where to apply each tool in the correct situation. 

I regularly review tech blogs, news and subreddits to learn about / discuss new tools, so it's not often that I fall into ['Everything looks like a nail' syndrome][LawOftheInstrument]! 
The Model I have above helps me zero-in on what new technologies are (and are not!) suitable to integrate into my skillset and what can help me solve the types of problems that I'm tasked with solving.

### Summary

We've covered a strategy to help you filter through the barrage of new tools that are being written every day, and how to stay focused on your key areas so your skillset is as tight and in-depth as you need it to be.

Do you have any tips for learning new tools? let me know in the comments below!

[HTMLElements]: https://developer.mozilla.org/en/docs/Web/HTML/Element
[MetaTags]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
[CSSBoxModel]: http://cssreference.io/box-model/
[CSSPositioning]: http://cssreference.io/positioning/ 
[CSSTypography]: http://cssreference.io/typography/
[Bootstrap]: http://getbootstrap.com/
[MDLite]: https://getmdl.io/index.html
[Angular1]: https://angularjs.org/
[VueJS]: https://vuejs.org/
[Jquery]: https://jquery.com/
[ChartJS]: http://www.chartjs.org/
[D3]: https://d3js.org/
[DataTables]: https://datatables.net/
[GulpJs]: http://gulpjs.com/
[WebPack]: https://webpack.github.io/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/en/
[Bower]: https://bower.io/
[net46]: https://en.wikipedia.org/wiki/.NET_Framework_version_history#.NET_Framework_4.6
[ASPNETMVC]:https://www.asp.net/mvc
[ASPNETWebAPI]: https://www.asp.net/web-api
[OData]: https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/
[EntityFramework]: https://msdn.microsoft.com/en-us/library/aa937723(v=vs.113).aspx
[breezenet]: http://breeze.github.io/doc-net/
[MSMQ]: https://msdn.microsoft.com/en-us/library/ms711472(v=vs.85).aspx
[SMO]: https://msdn.microsoft.com/en-us/library/ms162169(v=sql.105).aspx
[SSDT]: https://msdn.microsoft.com/en-us/library/hh272686(v=vs.103).aspx
[VSCode]: https://code.visualstudio.com/
[Notepad++]: https://notepad-plus-plus.org/
[VisualStudio]: https://www.visualstudio.com/
[SMS]: https://docs.microsoft.com/en-us/sql/ssms/sql-server-management-studio-ssms
[DBDoc]: https://www.patreon.com/fiddlydigital
[IIS]: https://www.iis.net/
[Cordova]: https://cordova.apache.org/
[GIT]: https://git-scm.com/
[SVN]: https://subversion.apache.org/
[LawOftheInstrument]: https://en.wikipedia.org/wiki/Law_of_the_instrument