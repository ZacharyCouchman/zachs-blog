'use client'
import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import WebWidgetApp from './WebWidgetApp'

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