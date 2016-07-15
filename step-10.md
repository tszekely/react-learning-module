---
layout: default
title: Step 10 - SoundPlayer App DIY | React Learning Module
---

# Step 10 - SoundPlayer App DIY

In the last step of the React Learning Module, you'll create a music player with the ability to search for tracks, add/remove tracks to playlist, creating/removing serveral playlists and searching for tracks using the [SoundCloud API](https://developers.soundcloud.com/).

In this step, no code will be provided: just the specifications and some tips which *might* help you do things right.

What I provide, though, is the [HTML Templates](https://github.com/tszekely/soundplayer-react-html) for the App, so you don't have to worry about writing HTML/CSS code: just translating the HTML to JSX and doing the React/JS stuff.

If you need to get an idea about how interactions should work, head to the original [Audio player example](http://tutorialzine.com/2015/03/html5-music-player/), but keep in mind that ours will be quite different (tracks come from SoundCloud, not our own mp3 files, for example).

Now clone the [HTML Templates](https://github.com/tszekely/soundplayer-react-html) repo and let's start hacking.

**Note: The SoundCloud API requires you to have an account and to register an app. If you don't have an account, create one and [register an app](http://soundcloud.com/you/apps/new).**

## 10.1 - Build system & Architecture

1. Set up a (preferably webpack) build system for your project
2. Convert the HTML templates to JSX and render the App using React; don't mind interactions for now, just make sure you split everything into components as needed.

## 10.2 - Basic interactions

1. Make the navigation menu expandable
2. Make the playlist expandable as in the [Audio player example](http://tutorialzine.com/2015/03/html5-music-player/) when at least a track is loaded; the tracklist can be empty for now

## 10.3 - Routing

1. Create 3 routes for the application:
  - `/browse` - showing the list of all tracks (`04-all-tracks.html`)
  - `/playlists` - showing the list of all playlists (`05-playlists.html`)
  - `/playlists/<playlist_id>` - showing the currently playing track & playlist (`index.html`)
2. The main route (`/`) should redirect to `/browse`
3. Any wrong route should be handled (redirect to `/browse` or create a 404 page, it's up to you)
