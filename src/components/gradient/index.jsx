function Gradients() {
    return (
      <svg style={{ height: 0, width: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="gradientColors1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1BE985" />
            <stop offset="100%" stopColor="#00B774" />
          </linearGradient>

          <linearGradient id="gradientColors2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1BE985" />
            <stop offset="100%" stopColor="#00A5B8" />
          </linearGradient>

          <linearGradient id="gradientColors3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1BE985" />
            <stop offset="100%" stopColor="#A0D411" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  
  export default Gradients;