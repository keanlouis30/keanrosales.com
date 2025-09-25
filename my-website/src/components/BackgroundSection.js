import LetterGlitch from './LetterGlitch';

const BackgroundSection = ({ children, className = '', ...props }) => (
<div
  className={`background-section ${className}`}
  {...props}
  style={{
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden'
  }}
>
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'brightness(0.35) saturate(0.7)',  // lower exposure and saturation
      transition: 'filter 0.3s',
    }}
    aria-hidden
  >
    <LetterGlitch
      glitchSpeed={50}
      centerVignette={true}
      outerVignette={false}
      smooth={true}
      glitchColors={['#182825', '#1f3c2f', '#264a3c']} // darker green tones
    />
  </div>
  <div style={{ position: 'relative', zIndex: 1 }}>
    {children}
  </div>
</div>
);

export default BackgroundSection;

