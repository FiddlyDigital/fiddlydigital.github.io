---
layout: fd_post
title:  "DBDoc Explanation"
date:   2017-05-12 00:00:00 +0000
category: article
excerptimage : img/dbdoc.png
comments: true
---

Following from my last video post, I wanted to dive more into DB Doc and explain a little more about it and how it came about. Also, lists!

### What is it?
DbDoc is a 2-part Documentation system for SqlServer.

* The 1st part is a Console Application that reads your SqlServer Database and outputs a Documentation Model
* The 2nd part is an Angular Application that reads the model and allows you to navigate your DB Schema in a quick and easy manner.

The system allows you to regularly generate rich, interactive Documentation for your SQLServer Databases.

![DbDocTableExample](/img/dbdoc1.png){:class="img-responsive"}

### Why make this?

I regularly work with incredibly large Databases that have grown *organically* over time.
Digging through the strata of different developers, coding styles and practices over multiple years, I quickly realised that I needed something that would:

* Allow me to quickly get up to speed on the shape and nuances of the Database
* Serve as a 'all-in-one' referance point for:
    * Development against the Database(s) in my .Net applications and services
    * Development and Administration of the DB itself
    * Guiding Refactoring efforts by clearly showing dependency links

I research existing documentation tools and ... quite honestly I ended up pretty frustrated.
All of them were some combination of either:

* Expensive
* Cumbersome to navigate
* Annoying to generate updated documentation
* Difficult to (re)deploy/redistribute
* Unsearchable!

Not one tool could give me the full-picture!

After that, It seemed like it was time to bring Database Documentation to a level where it could be an actual valuable referance to Developers and DBAs.
Web Applications have come an awfuly long way in the last few years. 
I felt like that I could to a lot better than awful CHM files, boring gray-on-gray designs and loosely coupled collections of html files.  

The idea was definitely not to replace Sql Management Studio in any way, but to write something that could work in tandem with it and overcome some of it's shortcomings.

I also wanted something that devs could use - without the need to have any access to the DB itself. 
I know for start-ups and smaller dev shops this might seem laughable, but in medium to large businesses it's quite common to have 'Dev' and 'DB' teams as entirely seperate (and often opposing!) groups.
Having a regularly-update, independant Database Referance allows the Dev teams to work with greater autonomy from the DB team.

One-man dev shops have as much a right to good database documentation as any Enterprise team - so I wanted to make something that was affordable for everyone.

![DbDocSearchExample](/img/dbdoc2.png){:class="img-responsive"}

### How far along is it?

It's currently in it's alpha stage, and is being actively developed.

When it's ready, the intention is to offer this system as a closed-source product; on a perpetual and/or subscription license basis.

### Features

Given a config file, it can interrogate your database and generate a verbose Database Documentation model.
The Angular application can quickly read in those model files and swiftly search through your Schema

#### Current

* Database Model Generator
    * Connect to given SQLServer Database(s)
    * Generate DB Documentation Model
    * Generate Manifest File(s) to group together models
    * Installer
* Database Model Navigator
    * Database
        * Properties / Extended Properties
        * Files
        * Tables
        * Views
        * Stored Procedures
        * Functions
        * Dependency Linking
    * Tables / Views
        * Properties / Extended Properties
        * Columns
        * Indexes
        * Triggers
        * Sql Script
        * Uses (Dependencies)
        * Used By (Dependents)
    * Stored Procedures / Functions
        * Properties / Extended Properties
        * Parameters
        * Sql Script
        * Uses (Dependencies)
        * Used By (Dependents) 

#### Future

* Database Model Generator
    * Expand Console options for greater flexibility and to better facilitate scheduled execution
    * Create an optional GUI (Forms/WPF/UWP)
    * Save/Load Database Profiles
    * Generation settings
        * Include/ Exclude certain objects or from certain schemas, etc...
    * Support for other DB Systems
        * Oracle
        * MySql/Maria DB
        * PostgreSQL
* Database Model Navigator
    * Database Content
        * Types
        * Full-text Catalogs
        * Roles
        * Schemas
        * Triggers
        * SQL Server Agent Jobs
    * Interaction
        * Dependency Trees / Graphs
        * Calendar Activity Timeline View to see when items where last created/modified
        * ERD Diagram Generation
        * Image/PDF export of Diagrams
        * Advanced Search e.g:
            * Find all columns of Type
            * All items with / without a description
            * All items create/modified within a certain timeframe
            * etc...
        * Better Mobile Compatability
    * Application
        * Electron Wrapper for use as a stand-alone Desktop Applicaiton
        * Cordova Wrapper for use on Ipads and Android Tablets

        
### What's next?


I've got a great roadmap to work from, but I'd love if I could get some guidance and feedback from the people who I hope one day will be using this.
No man is an island, and I'd really like to bring the wider community into the develop process.

> I need your help!

I'm looking for testers, feedback and good ideas that will help bring Database Documentation into the 21st Century.

I have a patreon set up to help fund and/or guide development.
The idea is that backers would gain insight into the development process and if they wanted - to help shape the featureset and functionality of future developments.

You can check that my patreon out [here][patreon]

### Summary

Thanks for reading so far!

Hopefuly DBDoc is something that interests you and if so - don't be afraid to get in touch!

I'm working hard to make regular progress updats on my Patreon, and semi-regular updates to my blog and instagram (see sidebar)

Let me know if there's anything that you'd like to see from this project?

[patreon]: https://www.patreon.com/fiddlydigital
[buildv010]: https://dbdoc-v0-1-0-philipgannon.c9users.io
