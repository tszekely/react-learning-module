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

## 10.0 - General Requirements

1. Use a Flux (or Redux if you're brave enough to learn it on your own) architecture
2. Implement loading states where necessary (ex. when there is a pending request following an action) by adding a "loading" class to buttons

## 10.1 - Build system & Architecture

1. Set up a (preferably webpack) build system for your project
2. Convert the HTML templates to JSX and render the App using React; don't mind interactions for now, just make sure you split everything into components as needed.

## 10.2 - Basic interactions

1. Make the navigation menu expandable
2. Make the playlist expandable as in the [Audio player example](http://tutorialzine.com/2015/03/html5-music-player/) when at least a track is loaded; the tracklist can be empty for now 

*Tip: make the playlist expandable, then add the condition to make it expandable only when at least a track is loaded*

## 10.3 - Routing

1. Create 3 routes for the application:
  - `/browse` - showing the list of all tracks (`04-all-tracks.html`)
  - `/playlists` - showing the list of all playlists (`05-playlists.html`)
  - `/playlists/<playlist_id>` - showing the currently playing track & playlist (`index.html`)
2. The main route (`/`) should redirect to `/browse`
3. Any wrong route should be handled (redirect to `/browse` or create a 404 page, it's up to you)

*Tip: the lists can be filled with dummy data, we'll start using the Soundcloud API in the next part*

## 10.4 - Browse Tracks

Implement the `04-all-tracks.html` view with the following functionalities:

1. The list should display any feed of tracks (the default track list coming from the SC API, a chart, a user's tracks, etc.)
2. The list should be paginated with 30 items, with either infinite scroll or a "Load more" button at the bottom
3. The user should be able to search for tracks using the search bar at the top; searching for tracks should display the results in the list below and emptying the search input should reset the feed to the initial one (https://developers.soundcloud.com/docs#search)

## 10.5 - Create playlists / Add track to playlist

The playlist picture should be the first track's picture (or whatever Soundcloud assigns)

1. From the track browsing list, the user should be able to click on the + button which should open up the "Add to playlist" modal (`06-add-playlist-modal.html`)
2. If there is no playlist available, the user should be required to enter a playlist name (`06-add-playlist-modal.html`), otherwise he should be able to select which playlist to add the track to (`06-add-track-modal.html`) but still be able to create a new playlist
3. The playlist data should be stored in your SC account (https://developers.soundcloud.com/docs#creating-sets)

## 10.6 - Make the tracks playable

1. The user should be able to play tracks:
  - From the browse tracks view by clicking on the track
    - If there is no playlist available or currently playing, create a temporary one named "Now Playing" with the track and play it
    - If there's an active playlist, insert the track after the CURRENTLY PLAYING track and start it
  - From the expanded playlist (`02-playlist-expanded.html`), by clicking the track
2. The user should be able to pause and stop tracks
3. The user should be able to skip tracks; skipping to previous track from the first one in the playlist should play the last track in the playlist and viceversa
4. The user should be able to enable shuffle (playing songs in random order) and repeat track

## 10.7 - Manipulate playlists

In addition to playing tracks, the user should be able to:

1. Play playlists by clicking on them (replacing the currently playing one)
2. Delete playlists by clicking the remove button
3. Remove tracks from playlists from the expanded playlist by clicking on the remove button
4. Search for tracks in the expanded playlist (internally, in the full title (ex. Drake - Hotline Bling should be found by the following queries: drake - hot, hotline, bling, etc.)
5. If it's a "Now playing playlist", an add button should appear next to its name (`07-save-now-playing.html`) and clicking it should open the "Create playlist modal" with the "Create new playlist" option selected and the select disabled. Entering a name and saving it should behave like 10.5.2

# 10.8 - Manipulate tracks in playlists

1. Remove tracks from playlist from the expanded playlist by clicking on the remove button
2. Rearrange tracks in playlist by drag & drop


