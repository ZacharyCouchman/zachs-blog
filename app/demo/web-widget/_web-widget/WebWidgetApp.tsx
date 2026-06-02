'use client'
import './App.css';

interface Props {
  theme: string;
  title: string;
  onClose: () => void;
}
function WebWidgetApp({title, onClose}: Props) {
  return (
    <div className="widget" onClick={e => e.stopPropagation()}>
      <h2 className='widget-title'>{title}</h2>
      <button className='close' onClick={onClose}>x</button>

      <div>
        <p style={{marginTop: '8px'}}>It may not seem special, but this is actually a separate application running within the website that the parent can control.</p>
        <p style={{marginTop: '8px'}}>The mounting and unmounting of this application can be controlled as well.</p>
        <code style={{marginTop: '8px', color: 'darkorange'}}>window.webWidget.unmount();</code>

      </div>
    </div>
  )
}

export default WebWidgetApp