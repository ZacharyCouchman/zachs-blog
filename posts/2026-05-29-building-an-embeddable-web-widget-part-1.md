---
layout: single
title: Building an embeddable web widget - Part 1
date: 2026-05-29
tags: ["browser", "embedabble", "widget"]
---
In this set of posts I want to explore the different parts to building an embeddable web widget, similar to what I worked on at Immutable while building the Checkout SDK + UI. I've split this into parts to cover different topics and concerns, this part will focus simply on a process to mount and unmount a 3rd party embeddable widget and provide a simlple developer experience to interacting with the widget.

## What is an embedabble web widget?
An embeddable web widget is nothing more than an application or piece of a website that can be included or embedded within another website. Some common examples of this are an embedded Youtube video or a Twitter Post. Content that is usually hosted on another website can be included in your website simply and easily.

Another product that makes use of this is Stripe Checkout for secure online payments processing. Stripe Elements is specifically the example I want to explore as this is a quite sophisticated product that does a lot of elegant work with embedded user interfaces.

## Why use them?
Embeddable web widgets are used to share functionality with others by providing a drop-in component rather than another developer having to build that widget from scratch. It enables other developers to use, build upon or customise the main workflow or functionality that you've built to suit their purposes.

## What does it look like under the hood?
[Demo](/demo/web-widget)

Here is a simple example of a React application that has been packaged so that the consuming application can create an instance of the widget and mount and unmount it programmatically. The choice of using React as a technology for web widgets can be debated and there are good reasons to use other technologies, but for simplicity and common understanding, I've used it here.

It may not seem special, but this is now a separate application running within the website that the parent can control.
However it is not sufficiently isolated and issues can arise with styles bleeding in from the parent site or out from the widget. The parent site can also access the full DOM tree of the widget at this stage as well which has security implications.
The idea is to package up some functionality and enable anyone to embed it and customise the style. Then instead of directly embedded the application, to instead embed an iframe which runs the widget and provides isolation.

```typescript
import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import WebWidgetApp from './WebWidgetApp' // The component to render
// other css imports

type Workflow = 'workflow-1' | 'workflow-2';
type WebWidgetParams = {
  theme?: string;
  title?: string;
  flow?: Workflow;
  closeOnOverlayClick?: boolean;
}
type WidgetActions = {
  updateTitle: (theme: string) => WidgetActions;
}
export class WebWidget {
  private root: Root | null;
  private actions: WidgetActions
  private params: WebWidgetParams | null;
  private initialised: boolean = false;

  constructor() {
    /** */
    this.root = null;
    this.params = null;
    this.actions = {
      updateTitle: this.updateTitle.bind(this)
    }
  }

  /** 
   * Initialise the web widget
   * could pass a public key here
   * which is used to fetch remote configuration
   */
  init(params?: WebWidgetParams) {
    if(this.initialised) return;

    // Set widget params using defaults if required
    const defaultParams:WebWidgetParams = {
      title: 'Web Widget',
      theme: 'dark',
      flow: 'workflow-1',
      closeOnOverlayClick: true
    }
    this.params = {
      ...defaultParams,
      ...params
    };

    const container = document.createElement('div');
    container.id = "web-widget-modal-anchor";
    document.getElementsByTagName('body')[0]!.appendChild(container);
    this.initialised = true;
  }  

  /** Use mount to render the WebWidget at a target DOM element */
  mount(targetId?:string) {
    if(!this.initialised) {
      console.warn('First call init() to initialise the widget');
      return;
    }
    if(this.root) return;

    let targetElement = null;
    if(targetId && targetId !== '') {
      targetElement = document.getElementById(targetId);
    }

    if(!targetElement) {
      // no target element specified, defaulting to centered modal
      const overlay = document.createElement('div');
      overlay.id = 'web-widget-overlay';
      overlay.style = 'position:absolute;inset: 0px;background-color:#FFFFFF11;display:flex;align-items:center;justify-content:center;';
      if(!this.params || this.params.closeOnOverlayClick) {
        overlay.addEventListener('click', () => this.unmount());
      }
      const widgetModalRoot = document.createElement('div');
      widgetModalRoot.id = 'widget-modal-root';
    
      overlay.appendChild(widgetModalRoot);
      document.getElementById('web-widget-modal-anchor')?.appendChild(overlay);
      this.root = createRoot(widgetModalRoot);
    } else {
      this.root = createRoot(targetElement);
    }
    
    this.render();

    // return a controller / actions object which allows caller to pass commands into the widget
    return this.actions;
  }

  unmount() {
    const overlay = document.getElementById('web-widget-overlay');
    overlay?.removeEventListener('click', () => this.unmount());
    overlay?.remove();
    this.root?.unmount();
    this.root = null;
  }

  private render() {
    if(!this.root) return;

    this.root.render(
      <StrictMode>
        <WebWidgetApp 
        title={this.params!.title!}
        theme={this.params!.theme!}
        onClose={() => this.unmount()}
        />
      </StrictMode>,
    )
  }

  private updateTitle(title: string) {
    this.params = {
      ...this.params!,
      title
    }
    this.render();
    return this.actions;
  }
}
```

## Demo

[Check out an example demo](/demo/web-widget)

## What's Next
The next part of the WebWidget demo is to provide sufficient isolation from the the parent site so that styles of the widget are not affected by the hosting site and vice versa. For that we will need to look into the Shadow DOM.