"use client";
import { useEffect } from "react";
import "../_web-widget/WebWidgetMain";
import { WebWidget } from "../_web-widget/WebWidgetMain";

export default function WebWidgetDemo() {
  useEffect(() => {
    // Test by adding a new WebWidget to the window object
    window.webWidget = new WebWidget();
    window.webWidget.init();
  }, []);

  return (
    <div className="flex  max-w-7xl">
      <div className="p-4 flex flex-col gap-4 break-normal">
        <div className="underline cursor-pointer" onClick={() => history.back()}>&#8592; Back</div>
        <h1 className="my-4 text-2xl">Web Widget Demo</h1>
        <p>
          For demo purposes the WebWiget instance has been added onto the window
          object and initialised.
        </p>
        <p>To test it out open the developer console and run:</p>
        <code className="text-[darkorange] break-all">
          window.webWidget.init();
        </code>
        <code className="text-[darkorange] break-all">
          const actions = window.webWidget.mount();
        </code>
        <code className="text-[darkorange] break-all">
          actions.updateTitle(&#34;My Widget&#34;);
        </code>
        <div className="flex flex-wrap gap-4 items-center">
          <p>Or else open the widget by clicking </p>
          <button className="p-2 rounded-full bg-blue-400 dark:bg-blue-800" onClick={() => window.webWidget.mount()}>
            Open Widget
          </button>
          <button className="p-2 rounded-full bg-blue-400 dark:bg-blue-800" onClick={() => window.webWidget.mount('target')}>
            Open Widget at #target
          </button>
        </div>

        <p>Calling mount() without passing an element&apos;s id will automatically show the widget as a centered modal. If you want to mount to a specific DOM element, pass it&apos;s id into the mount function</p>
        <code className="text-[darkorange] break-all">
          window.webWidget.mount(&#39;target&#39;);
        </code>
        
        <div id="target">
          <p>target</p>
        </div>
      </div>
    </div>
  );
}
