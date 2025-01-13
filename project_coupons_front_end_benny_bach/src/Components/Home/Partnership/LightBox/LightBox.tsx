import "./LightBox.css";

export function LightBox(): JSX.Element {
  return (
    <div className="LightBox">
      <div className="cube">
        <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
      </div>
      <div className="cube">
        <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
      </div>
      <div className="cube">
        <div style={{ "--x": -1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 0, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
        <div style={{ "--x": 1, "--y": 0 } as React.CSSProperties}>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
        </div>
      </div>
    </div>
  );
}
