---
layout: single
title: Dynamically loading JavaScript into the DOM
date: 2023-11-18
tags:
---
Recently at work my team was faced a problem with dynamically loading a JS script into the browser through our code and waiting for it to be loaded and ready to use. After trying a few different ways to detect and wait for this to be loaded, we did some research and found this simple solution which suited our needs.

## tl;dr

A great way we found to dynamically load a script and wait for it to be loaded was to listen to the scipt element's `load` event. In our example we check for the presence of the namespace on the window, and resolve a Promise.

## Our situation

We have an SDK which we build and release as an ES Module. This can be installed using npm and imported into your TS/JS project.

```js
import { ourSDK } from "@sample/sdk";
```

We also have another project which builds our widgets into a browser bundle, minifies the code and on load defines the result on the window object.

The SDK exposes a function which allows you to load our 'UI Widgets' so that you can embed them into your web application. This function is responsible for dynamically loading our widgets JS bundle from a CDN and adding it to the DOM. When this loads it returns you a class instance that allows you to create widgets.

What we needed to do was add the script, wait until it was loaded and then detect the namespace and object that the script added to the window.

## Adding the script dynamically

Here is the simplified code we used to add the script to the DOM.

<script src="https://gist.github.com/ZacharyCouchman/6da12b81c8b0f5382bbb39e61809802e.js"></script>

## Wait for it to finish loading and use the object

This was the difficult part that required some investigation. After adding the script we needed to wait for it to be loaded and run. We looked into a few different ways that this could be done before finding the simpler solution.

## Using the script element's load event

The simplest way we could achieve what we wanted was simply to add an event listener to our script element before we added it to the DOM. We tapped into the script's `load` event. When the load event is fired, we check for the presence of the namespace on the window and return a new instance of our class.

<script src="https://gist.github.com/ZacharyCouchman/d5df5f6e73a803471386f853de7960c2.js"></script>

One of the great things about this solution is that it will work with all different network speeds. We don't have to try to guess a time to wait or poll something to check it has been loaded. Once the script has finished loading and running, the `load` event is fired and we can go from there.

A further improvement to this could include checking for the presence of the script already in the DOM before loading it to prevent duplicates.

## Other methods we looked into

Other methods we looked at were, using a MutationObserver to detect when the script was added to the DOM and react to that. We set up the observer to react to child elements being added to the document head. This wasn't the best solution as even though we could react to the script tag being added, this event was firing before the javascript had loaded and run. So trying to access the required namespace on the window was happening before it had been created.

We also looked into creating a loop, which would periodically test if the namespace had been added to the window by checking that it was defined. This loop could be created with a setTimeout() and if not detected, would add another timeout. Again this solution has downsides due to:

- creating a whole heap of events which run sometime in the future
- having to guess the timeout duration and this not being configurable to a user's network speed

```javascript
function detectScriptLoaded() {
  if (window.ourNamespace != "undefined") {
    resolve(new ourNamepace.ourClass());
  } else {
    setTimeout(detectScriptLoaded(), 100);
  }
}
```
