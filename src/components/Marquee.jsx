import CurvedLoop from './CurvedLoop';

export function Marquee() {
  return (
    <CurvedLoop
      marqueeText="FRONT END ✦ WEB DEVELOPMENT ✦ UI/UX ✦ REACT & TYPESCRIPT ✦ DESIGN SYSTEMS ✦ FULL STACK ✦"
      speed={1.5}
      curveAmount={0} // 0 = Perfectly straight sideways line
      direction="left"
      interactive={true} // Click & drag left/right to throw velocity and flip direction
    />
  );
}

export { CurvedLoop };
export default Marquee;
