# PROJECT_STATE.md

# Jujutsu Sorcerer Life Simulator

Version: Prototype v0.2
Status: Pre-Production / Foundation Phase
Last Updated: July 2026

---

# Project Summary

Jujutsu Sorcerer Life Simulator is a single-player, text-based life simulation RPG set in the universe of Jujutsu Kaisen.

The player creates an original sorcerer and lives through the Jujutsu world from student life to death, making decisions that shape relationships, abilities, philosophy, reputation, and history.

The project is heavily inspired by:

* The Fenomeno
* Football Manager
* Persona
* Crusader Kings
* RimWorld
* Roguelite games

The objective is not simply becoming the strongest sorcerer.

The objective is:

"Become the greatest sorcerer in history and leave a legacy that survives after your death."

---

# Current Development Stage

The project currently exists as an early playable prototype.

The prototype successfully demonstrates:

* Character creation
* Basic progression
* Calendar flow
* Simple missions
* Saving
* Historical records
* Permadeath

However, it does not yet represent the intended game experience.

The current prototype should be considered:

"A technical skeleton rather than a complete game."

Estimated Progress:

Technical Foundation:
35%

Gameplay Systems:
20%

JJK Identity:
25%

Long-Term Vision:
20%

Overall Project Completion:
Approximately 20-25%

---

# Current Architecture

Current implementation is primarily:

Single HTML file
Embedded CSS
Embedded JavaScript
Menu-based interface

This approach was acceptable for rapid prototyping.

However, it is not scalable for the long-term project.

The codebase will eventually require:

Modular systems
Data separation
Event organization
Save management
File structure refactoring

No major feature implementation should occur before architecture stabilization.

---

##################################################

# CURRENTLY IMPLEMENTED

##################################################

# Character Creation

Implemented:

* Character name
* Attribute generation
* Clan selection
* Origin selection

Status:
Functional

Needs:
More meaningful choices
Better lore integration
Improved balance

---

# Origins

Implemented:

* Heavenly Restriction
* Sukuna Vessel
* Genius
* Late Awakener
* Abnormal Reserves

Status:
Functional

Problem:

Origins mostly function as stat modifiers.

Desired State:

Origins should fundamentally alter gameplay and generate unique runs.

Priority:
High

---

# Calendar

Implemented:

* Morning
* Afternoon
* Night

Status:
Functional

Problem:

Actions currently have limited consequences.

Desired State:

Every time period should create opportunity costs and meaningful decisions.

Priority:
High

---

# Missions

Implemented:

* Mission generation
* Threat values
* Rewards
* Mission outcomes

Status:
Functional

Problems:

Generic encounters
Minimal decision making
Little preparation
Limited consequences

Desired State:

Missions should generate stories rather than random fights.

Priority:
Critical

---

# Combat

Implemented:

* Basic calculations
* Success and failure states

Status:
Functional

Problems:

Mostly numerical comparison.

Does not feel like Jujutsu Kaisen combat.

Desired State:

Combat based on:

Information
Preparation
Adaptation
Creativity
Sacrifice
Decision making

Priority:
Critical

---

# Saving

Implemented:

* Save functionality
* Character persistence

Status:
Functional

Priority:
Low

Needs:

Better structure
Versioning support
Long-term compatibility

---

# Historical Records

Implemented:

* Basic records
* Cause of death
* Highest values

Status:
Functional

Problem:

Records are shallow.

Desired State:

Historical records become one of the game's primary motivations.

Priority:
Medium

---

##################################################

# KNOWN BUGS

##################################################

# Critical Bug

Victory followed by death.

Observed:

Player receives:

"You won."

Immediately followed by:

"You died."

Likely Causes:

* Incorrect mission resolution order
* Delayed damage calculations
* Unsynchronized state updates
* Improper death handling

Priority:
Critical

---

# Design Issue

Strength functioning as health.

Observed:

Strength currently affects:

Physical power
Durability
Death threshold

Problems:

Weak builds become impossible.

Training strength directly improves survivability.

Does not reflect JJK.

Priority:
Critical

Desired Solution:

Separate:

Attributes
Health
Stamina
Cursed Energy
Injuries

---

##################################################

# SYSTEMS MISSING

##################################################

The following systems are not yet implemented.

---

# Health System

Status:
Missing

Priority:
Critical

---

# Injury System

Status:
Missing

Priority:
Critical

Examples:

Broken limbs
Scars
Critical wounds
Burned CE pathways

---

# Relationship System

Status:
Missing

Priority:
Critical

Examples:

Friends
Rivals
Enemies
Mentors

---

# Social Link System

Status:
Missing

Priority:
Critical

Inspired by Persona.

---

# Mentor System

Status:
Partially Implemented

Mentor flavor exists.

Actual mechanics do not.

Priority:
High

---

# Reputation System

Status:
Missing

Priority:
High

Examples:

Student reputation
Teacher reputation
Clan reputation
Higher-Up reputation

---

# Clan Politics

Status:
Missing

Priority:
High

---

# Knowledge System

Status:
Missing

Priority:
High

Examples:

CE Theory
Barrier Theory
RCT Theory
Historical Knowledge

---

# Research System

Status:
Missing

Priority:
Medium

---

# Technique Mastery

Status:
Missing

Priority:
High

---

# Domains

Status:
Missing

Priority:
Medium

---

# Binding Vows

Status:
Missing

Priority:
Critical

This is one of the project's signature mechanics.

---

# Dynamic Timeline

Status:
Missing

Priority:
High

---

# Canon Events

Status:
Missing

Priority:
High

Examples:

Finger Bearers
Hidden Inventory
Shibuya Incident
Culling Game

---

# World Simulation

Status:
Missing

Priority:
Medium

---

# Legacy Between Runs

Status:
Missing

Priority:
Critical

---

# Titles System

Status:
Missing

Priority:
Medium

---

# Team Missions

Status:
Missing

Priority:
Medium

---

# Psychological System

Status:
Missing

Priority:
Medium

Examples:

Stress
Trauma
Confidence
Resolve

---

##################################################

# CURRENT DESIGN PROBLEMS

##################################################

Problem 1:

The game often feels like:

"Generic RPG with Jujutsu terminology."

Desired:

"A genuine simulation of living as a Jujutsu Sorcerer."

---

Problem 2:

Many systems are numerical rather than narrative.

Desired:

Systems that generate stories.

---

Problem 3:

Progression is mostly stat-based.

Desired:

Progression through:

Knowledge
Relationships
Experience
Understanding
Decisions

---

Problem 4:

Origins feel like stat packages.

Desired:

Origins fundamentally alter playthroughs.

---

Problem 5:

School life is underdeveloped.

Desired:

The player should genuinely feel like:

"I am a student at Jujutsu High."

---

##################################################

# CURRENT DEVELOPMENT PRIORITIES

##################################################

Priority 1
Foundation Stability

Tasks:

* Fix death bug
* Separate Health from Strength
* Implement injuries
* Refactor combat resolution
* Refactor mission resolution

Status:
Immediate

---

Priority 2
Architecture

Tasks:

* Create project structure
* Modularize systems
* Organize data
* Create save architecture

Status:
Immediate

---

Priority 3
Core Simulation

Tasks:

* Better calendar decisions
* Better missions
* Better training
* Better progression

Status:
After architecture

---

Priority 4
Life Systems

Tasks:

* Relationships
* Social Links
* Mentors
* Reputation
* School events

Status:
After simulation foundation

---

Priority 5
JJK Systems

Tasks:

* Knowledge
* Research
* Technique mastery
* Binding Vows
* Domains

Status:
Mid development

---

Priority 6
World Systems

Tasks:

* Dynamic timeline
* Canon events
* Politics
* Legacy
* Historical records

Status:
Late development

---

##################################################

# NON-GOALS

##################################################

This project is NOT trying to become:

* Open-world action game
* Multiplayer MMO
* Fighting game
* 3D combat simulator
* Graphics-focused experience

The project prioritizes:

Deep systems
Text
Menus
Choices
Simulation
Replayability
Emergent stories

---

##################################################

# DEFINITION OF SUCCESS

##################################################

The project succeeds when a player can:

Create a sorcerer.

Attend Jujutsu High.

Train.

Build relationships.

Take missions.

Develop philosophies.

Learn techniques.

Create Binding Vows.

Survive major incidents.

Leave records.

Die.

Become part of history.

Start another generation.

And every life feels like a unique story inside the world of Jujutsu Kaisen.

---

# CURRENT OBJECTIVE

Do not add major content.

Do not add large amounts of techniques.

Do not implement late-game systems.

Current objective:

Stabilize the foundation.

Create maintainable architecture.

Transform the prototype into a scalable simulation platform capable of supporting the long-term vision of Jujutsu Sorcerer Life Simulator.
