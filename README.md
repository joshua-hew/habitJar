# HabitJar - iOS app

A habit app meant for focusing on building one really challenging habit, or breaking a stubborn one.

"Quote about one penny not making a person rich"

- from Atomic Habits by James Clear

## Tools & Technologies Used:

- React Native
- React Native Game Engine
- Matter.js
- Redux
- TypeScript
- Jest

# Dev Notes

- option for users when changing goal or timeperiod.
- change only for future occurences of habit. Or for past as well

- Look up studies on habit formation.
- https://jamesclear.com/new-habit
- Notification for when habit is well formed
  - Requires tracking streaks
    - daily, weekly, monthly, yearly?
    - positive streaks when habit is well formed
    - negative streaks when habit is in danger
      - if app only runs code when open, how count negative streaks?
- Notification for when habit is in danger of being undone
- Notification for when missing habit multiple times

# Todo (mvp):

Nov 6, Thursday

1. ~~calendar insert coin + tests~~
1. ~~calendar show coin count~~
1. ~~calendar remove coin + tests~~

Nov 8, Saturday

1. look up basic UI guideleines mobile
1. create habit screen
1. create habit reducer
1. home prompt user to create habit

Nov 9, Sunday

1. edit habit screen
1. edit habit change all
1. edit habit change evolve
1. edit habit delete

... 3 weeks left

1. stats screen
1. stats current streak
1. stats longest streak
1. journal screen
1. journal create
1. journal edit
1. home create jar
1. home create coin
1. home add coin
1. home undo ?
1. home calculate streak
1. home week sidebar
1. async storage.save habit
1. deploy test version

# Additional Features (polish)

- calendar view all months for year
- calendar addCoin uses current time for date selected?
- filled jar
- additional habits
- archive habits
- create habit create reminder
- edit create reminder
- edit change reminder
- edit delete reminder
- push notification well formed habit
- push notification when in danger of losing habit, suggest to scale down
- forgiveness coin

# 100 UI improvements

1. app prevent orientation change (statusbar moves)
1. create habit (?) help, tips modal
1. edit habit (?) change all, evolve
1. edit whenever editing, a modal pops up (edit habit, calendar, journal)
1. coin sound when land
1. home display current streak (daily | weekly | monthly | yearly)
1. animated +1 when coin hits jar
1. App UI have a reason behind UI decisions in future, basic guidelines of UI,
1. App UI interweave theme of app into UI?
1. coin icon - like webtoons icon
1. stats animation that ascends to total current coin count
1. calendar shows coin icon under days with activity
1. calendar modal show coin_icon x count
1. calendar modal text shake animation when user tries to remove 0th coin
1. calendar add habitColor to background of date header in modal
1. calendar display buttons horizontally in modal
1. calendar resize touchable opacity for calendar days
1. reshape calendar?
1. blur background of modal
1. splash screen
1. calendar highlights in lower opacity on active days not apart of current month
1. icon for stats screen
1. icon for calendar screen
1. icon for journal screen
1. fire icon for streak
1. filled jar animation / congratulations modal
1. rack for filled jars
1. home animated background
1. randomized motivational quotes
1. premium different jars
1. premium different coins
1. premium different background theme
1. premium dark mode

# Notes on mobile UI basics

- navigation should be intuitive
- experience / design should be the same across platforms ( mobile | web )
- allow for personalization
- good onboarding ( directions on init splashscreen )
- use established gestures
- targets' size should be finger appropriate
- thumb zone
- clear typographic hierarchy
- implement transitions and animations
- provide mobile and tactile feedback ( vibrate when add coin? | sound when coin hits jar? )
